import { create } from 'zustand';

export const useBookmarkStore = create((set, get) => ({
    bookmarks: JSON.parse(localStorage.getItem('quran_bookmarks') || '[]'),
    lastRead: JSON.parse(localStorage.getItem('quran_lastRead') || '{"sura": 1, "ayah": 1}'),

    addBookmark: (sura, ayah, suraName) => {
        const current = get().bookmarks;
        const exists = current.some((b) => b.sura === sura && b.ayah === ayah);
        if (!exists) {
            const updated = [{ sura, ayah, suraName, timestamp: Date.now() }, ...current];
            localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
            set({ bookmarks: updated });
        }
    },

    removeBookmark: (sura, ayah) => {
        const updated = get().bookmarks.filter((b) => !(b.sura === sura && b.ayah === ayah));
        localStorage.setItem('quran_bookmarks', JSON.stringify(updated));
        set({ bookmarks: updated });
    },

    isBookmarked: (sura, ayah) => {
        return get().bookmarks.some((b) => b.sura === sura && b.ayah === ayah);
    },

    setLastRead: (sura, ayah, suraName) => {
        const data = { sura, ayah, suraName, timestamp: Date.now() };
        localStorage.setItem('quran_lastRead', JSON.stringify(data));
        set({ lastRead: data });
    }
}));
