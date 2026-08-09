import { create } from "zustand";

export const useSidebarStore = create((set, get) => ({
    isLeftOpen: false,
    isRightOpen: false,

    toggleLeft: () => set((state) => ({ isLeftOpen: !state.isLeftOpen, isRightOpen: false })),
    toggleRight: () => set((state) => ({ isRightOpen: !state.isRightOpen, isLeftOpen: false })),
    closeLeft: () => set({ isLeftOpen: false }),
    closeRight: () => set({ isRightOpen: false })
}));

export default useSidebarStore;
