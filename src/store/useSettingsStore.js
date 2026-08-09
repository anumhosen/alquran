import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
    translationDb: localStorage.getItem('translationDb') || 'bn_bayaan.db',
    tafsirDb: localStorage.getItem('tafsirDb') || 'bn_tafsir_kathir.db',
    showWordByWord: JSON.parse(localStorage.getItem('showWordByWord') ?? 'true'),
    wbwLanguage: localStorage.getItem('wbwLanguage') || 'bn',
    arabicFontSize: parseInt(localStorage.getItem('arabicFontSize') || '28', 10),
    translationFontSize: parseInt(localStorage.getItem('translationFontSize') || '16', 10),
    arabicFontFamily: localStorage.getItem('arabicFontFamily') || 'Kitab',
    banglaFontFamily: localStorage.getItem('banglaFontFamily') || 'Kalpurush',
    reciter: localStorage.getItem('reciter') || 'mishari_alafasy',
    theme: localStorage.getItem('theme') || 'emerald',

    // Audio directory & mode settings
    audioBasePath: localStorage.getItem('audioBasePath') || 'd:/Development/TAURI/Al Quran/src-tauri/assets',
    audioSourceMode: localStorage.getItem('audioSourceMode') || 'local',
    autoScrollAyah: JSON.parse(localStorage.getItem('autoScrollAyah') ?? 'true'),

    setTranslationDb: (db) => {
        localStorage.setItem('translationDb', db);
        set({ translationDb: db });
    },
    setTafsirDb: (db) => {
        localStorage.setItem('tafsirDb', db);
        set({ tafsirDb: db });
    },
    setShowWordByWord: (show) => {
        localStorage.setItem('showWordByWord', JSON.stringify(show));
        set({ showWordByWord: show });
    },
    setWbwLanguage: (lang) => {
        localStorage.setItem('wbwLanguage', lang);
        set({ wbwLanguage: lang });
    },
    setArabicFontSize: (size) => {
        localStorage.setItem('arabicFontSize', size.toString());
        set({ arabicFontSize: size });
    },
    setTranslationFontSize: (size) => {
        localStorage.setItem('translationFontSize', size.toString());
        set({ translationFontSize: size });
    },
    setArabicFontFamily: (font) => {
        localStorage.setItem('arabicFontFamily', font);
        set({ arabicFontFamily: font });
    },
    setBanglaFontFamily: (font) => {
        localStorage.setItem('banglaFontFamily', font);
        set({ banglaFontFamily: font });
    },
    setReciter: (reciter) => {
        localStorage.setItem('reciter', reciter);
        set({ reciter });
    },
    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
        set({ theme });
    },
    setAudioBasePath: (path) => {
        localStorage.setItem('audioBasePath', path);
        set({ audioBasePath: path });
    },
    setAudioSourceMode: (mode) => {
        localStorage.setItem('audioSourceMode', mode);
        set({ audioSourceMode: mode });
    },
    setAutoScrollAyah: (enabled) => {
        localStorage.setItem('autoScrollAyah', JSON.stringify(enabled));
        set({ autoScrollAyah: enabled });
    }
}));
