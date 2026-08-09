import { create } from 'zustand';
import suraData from '../../src-tauri/assets/sura_names.json';
import { tauriAPI } from '../utils/tauriAPI';
import { useSettingsStore } from './useSettingsStore';

export const useQuranStore = create((set, get) => ({
    surahList: suraData,
    currentSurahId: 1,
    currentSurahMeta: suraData[0],
    ayahs: [],
    loading: false,
    timingsByAyah: {},
    activeWordTiming: null, // { sura, ayah, word }

    // Modal & Drawer states
    activeTafsirAyah: null,
    tafsirText: '',
    tafsirLoading: false,
    activeMorphology: null,
    morphologyData: null,
    morphologyLoading: false,
    activeTab: 'surah',
    audioState: { isPlaying: false, currentAyah: 1, sura: 1 },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setCurrentSurah: async (surahId) => {
        const meta = suraData.find((s) => s.id === Number(surahId)) || suraData[0];
        set({ currentSurahId: Number(surahId), currentSurahMeta: meta, activeWordTiming: null });
        await get().fetchAyahs(Number(surahId));
    },

    fetchAyahs: async (surahId) => {
        set({ loading: true });
        try {
            const translationDb = useSettingsStore.getState().translationDb;
            
            // 1. Fetch Arabic verses
            const arRows = await tauriAPI.DBOperation(
                `SELECT sura, ayah, text FROM verses WHERE sura = ${surahId} ORDER BY ayah ASC`,
                'ar_quran.db'
            );

            // 2. Fetch Translation verses
            let trRows = [];
            try {
                trRows = await tauriAPI.DBOperation(
                    `SELECT sura, ayah, text FROM verses WHERE sura = ${surahId} ORDER BY ayah ASC`,
                    translationDb
                );
            } catch (e) { console.warn('Translation fetch warning:', e); }

            // 3. Fetch Word-by-word data
            let wordRows = [];
            try {
                wordRows = await tauriAPI.DBOperation(
                    `SELECT sura, ayah, word, bn, en, [in] as indo FROM allwords WHERE sura = ${surahId} ORDER BY ayah ASC, word ASC`,
                    'words.db'
                );
            } catch (e) { console.warn('Word by word fetch warning:', e); }

            // 4. Fetch Corpus segments
            let corpusRows = [];
            try {
                corpusRows = await tauriAPI.DBOperation(
                    `SELECT surah as sura, ayah, word, ar1, ar2, ar3, ar4, ar5 FROM corpus WHERE surah = ${surahId} ORDER BY ayah ASC, word ASC`,
                    'corpus.db'
                );
            } catch (e) { console.warn('Corpus fetch warning:', e); }

            // 5. Fetch Audio timings from mishari_alafasy.db
            const timingMap = {};
            try {
                const audioDb = `${useSettingsStore.getState().reciter}/${useSettingsStore.getState().reciter}.db`;
                const timingRows = await tauriAPI.DBOperation(
                    `SELECT sura, ayah, time, words FROM timings WHERE sura = ${surahId}`,
                    audioDb
                );
                timingRows.forEach((t) => {
                    const parsedWords = (t.words || '').split(',').map((w) => {
                        const [wIdx, sMs, eMs] = w.split(':').map(Number);
                        return { word: wIdx, startMs: sMs, endMs: eMs };
                    });
                    timingMap[t.ayah] = { ayahTimeMs: t.time, words: parsedWords };
                });
            } catch (e) { console.warn('Timings fetch warning:', e); }

            // Map corpus Arabic words by `${ayah}-${word}`
            const corpusMap = {};
            corpusRows.forEach((c) => {
                const arConcat = [c.ar1, c.ar2, c.ar3, c.ar4, c.ar5].filter(Boolean).join('');
                corpusMap[`${c.ayah}-${c.word}`] = arConcat;
            });

            // Group words by ayah
            const wordsByAyah = {};
            wordRows.forEach((w) => {
                if (!wordsByAyah[w.ayah]) wordsByAyah[w.ayah] = [];
                const arConcat = corpusMap[`${w.ayah}-${w.word}`] || '';
                wordsByAyah[w.ayah].push({ ...w, arabic: arConcat });
            });

            // Map translations by ayah
            const trByAyah = {};
            trRows.forEach((t) => { trByAyah[t.ayah] = t.text; });

            const combined = arRows.map((ar) => ({
                sura: ar.sura,
                ayah: ar.ayah,
                arabicText: ar.text,
                translationText: trByAyah[ar.ayah] || '',
                words: wordsByAyah[ar.ayah] || []
            }));

            set({ ayahs: combined, timingsByAyah: timingMap, loading: false });
        } catch (err) {
            console.error('Failed to load ayahs:', err);
            set({ loading: false });
        }
    },

    updateActiveWordHighlight: (sura, ayah, currentAudioSec, isSingleAyahAudio) => {
        const timingData = get().timingsByAyah[ayah];
        if (!timingData || !timingData.words) {
            set({ activeWordTiming: null });
            return;
        }

        const currentMs = currentAudioSec * 1000;
        const targetMs = isSingleAyahAudio ? timingData.ayahTimeMs + currentMs : currentMs;

        const match = timingData.words.find(
            (w) => targetMs >= w.startMs && targetMs <= w.endMs
        );

        if (match) {
            set({ activeWordTiming: { sura, ayah, word: match.word } });
        } else {
            set({ activeWordTiming: null });
        }
    },

    openTafsir: async (sura, ayah) => {
        const tafsirDb = useSettingsStore.getState().tafsirDb;
        set({ activeTafsirAyah: { sura, ayah }, tafsirLoading: true, tafsirText: '' });
        try {
            const rows = await tauriAPI.DBOperation(
                `SELECT text FROM verses WHERE sura = ${sura} AND ayah = ${ayah}`,
                tafsirDb
            );
            set({ tafsirText: rows.length > 0 ? rows[0].text : 'Tafsir not found.', tafsirLoading: false });
        } catch (e) { set({ tafsirText: 'Error loading tafsir.', tafsirLoading: false }); }
    },
    closeTafsir: () => set({ activeTafsirAyah: null, tafsirText: '' }),

    openMorphology: async (sura, ayah, word) => {
        set({ activeMorphology: { sura, ayah, word }, morphologyLoading: true });
        try {
            const rows = await tauriAPI.DBOperation(
                `SELECT * FROM corpus WHERE surah = ${sura} AND ayah = ${ayah} AND word = ${word}`,
                'corpus.db'
            );
            set({ morphologyData: rows.length > 0 ? rows[0] : null, morphologyLoading: false });
        } catch (e) { set({ morphologyLoading: false }); }
    },
    closeMorphology: () => set({ activeMorphology: null, morphologyData: null }),

    setAudioState: (state) => set((prev) => ({
        audioState: { ...prev.audioState, ...state },
        activeWordTiming: state.isPlaying === false ? null : prev.activeWordTiming
    }))
}));
