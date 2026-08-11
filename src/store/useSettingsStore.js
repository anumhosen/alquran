import { create } from 'zustand';

const defaultTranslations = ['bn_bayaan.db'];

const getStoredTranslations = () => {
    try {
        const stored = localStorage.getItem('selectedTranslations');
        if (stored) return JSON.parse(stored);
    } catch (e) { }
    return defaultTranslations;
};

export const useSettingsStore = create((set) => ({
    selectedTranslations: getStoredTranslations(),
    tafsirDb: localStorage.getItem('tafsirDb') || 'bn_tafsir_kathir.db',
    showWordByWord: JSON.parse(localStorage.getItem('showWordByWord') ?? 'true'),
    wbwLanguage: localStorage.getItem('wbwLanguage') || 'bn',
    arabicFontSize: parseInt(localStorage.getItem('arabicFontSize') || '28', 10),
    translationFontSize: parseInt(localStorage.getItem('translationFontSize') || '16', 10),
    arabicFontFamily: localStorage.getItem('arabicFontFamily') || 'Kitab',
    banglaFontFamily: localStorage.getItem('banglaFontFamily') || 'Kalpurush',
    reciter: localStorage.getItem('reciter') || 'mishari_alafasy',
    theme: localStorage.getItem('theme') || 'emerald',

    audioFolderPath: localStorage.getItem('audioFolderPath') || 'd:/Development/TAURI/Al Quran/src-tauri/assets/audio/mishari_alafasy',
    audioSourceMode: localStorage.getItem('audioSourceMode') || 'local',
    autoScrollAyah: JSON.parse(localStorage.getItem('autoScrollAyah') ?? 'true'),

    setSelectedTranslations: (list) => {
        const newList = list.length > 0 ? list : ['bn_bayaan.db'];
        localStorage.setItem('selectedTranslations', JSON.stringify(newList));
        set({ selectedTranslations: newList });
    },
    toggleTranslation: (db) => set((state) => {
        const exists = state.selectedTranslations.includes(db);
        let updated = [];
        if (exists) {
            updated = state.selectedTranslations.filter((d) => d !== db);
            if (updated.length === 0) updated = ['bn_bayaan.db'];
        } else {
            updated = [...state.selectedTranslations, db];
        }
        localStorage.setItem('selectedTranslations', JSON.stringify(updated));
        return { selectedTranslations: updated };
    }),
    setTafsirDb: (db) => { localStorage.setItem('tafsirDb', db); set({ tafsirDb: db }); },
    setShowWordByWord: (show) => { localStorage.setItem('showWordByWord', JSON.stringify(show)); set({ showWordByWord: show }); },
    setWbwLanguage: (lang) => { localStorage.setItem('wbwLanguage', lang); set({ wbwLanguage: lang }); },
    setArabicFontSize: (size) => { localStorage.setItem('arabicFontSize', size.toString()); set({ arabicFontSize: size }); },
    setTranslationFontSize: (size) => { localStorage.setItem('translationFontSize', size.toString()); set({ translationFontSize: size }); },
    setArabicFontFamily: (font) => { localStorage.setItem('arabicFontFamily', font); set({ arabicFontFamily: font }); },
    setBanglaFontFamily: (font) => { localStorage.setItem('banglaFontFamily', font); set({ banglaFontFamily: font }); },
    setReciter: (reciter) => { localStorage.setItem('reciter', reciter); set({ reciter }); },
    setTheme: (theme) => { localStorage.setItem('theme', theme); set({ theme }); },
    setAudioFolderPath: (path) => { localStorage.setItem('audioFolderPath', path); set({ audioFolderPath: path }); },
    setAudioSourceMode: (mode) => { localStorage.setItem('audioSourceMode', mode); set({ audioSourceMode: mode }); },
    setAutoScrollAyah: (enabled) => { localStorage.setItem('autoScrollAyah', JSON.stringify(enabled)); set({ autoScrollAyah: enabled }); }
}));

export const translationMetaMap = {
    'bn_bayaan.db': { name: 'বায়ান ফাউন্ডেশন', lang: 'bn' },
    'bn_taisirul.db': { name: 'তাইসিরুল কুরআন', lang: 'bn' },
    'bn_mujibur.db': { name: 'মুজিবুর রহমান', lang: 'bn' },
    'bn_fozlur.db': { name: 'ফজলুর রহমান', lang: 'bn' },
    'bn_taqi.db': { name: 'তাকী ওসমানী', lang: 'bn' },
    'bn_mkhan.db': { name: 'মুহিউদ্দীন খান', lang: 'bn' },
    'en_sahih.db': { name: 'Sahih International', lang: 'en' },
    'quran_indo.db': { name: 'Indonesian', lang: 'in' }
};

export const tafsirMetaMap = {
    'bn_tafsir_kathir.db': 'তাফসীর ইবনে কাছীর (বাংলা)',
    'bn_tafsirzakaria.db': 'তাফসীর আবু বকর জাকারিয়া (বাংলা)',
    'kathir.db': 'তাফসীর ইবনে কাছীর (আরবি)',
    'bn_fmazid.db': 'তাফসীর ফজলুর মজিদ (বাংলা)',
    'bn_tafsirbayaan.db': 'তাফসীরে বয়ান (বাংলা)',
    'bn_mokhtasar.db': 'আল-মুখতাসার (বাংলা)'
};
