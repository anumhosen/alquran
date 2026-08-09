import { create } from "zustand";

const useThemeStore = create((set) => ({
    theme: "light",
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            const htmlEl = document.documentElement;

            // Update both class and data-theme for maximum compatibility
            if (newTheme === "dark") {
                htmlEl.classList.add("dark");
                htmlEl.setAttribute("data-theme", "dark");
            } else {
                htmlEl.classList.remove("dark");
                htmlEl.setAttribute("data-theme", "light");
            }

            // Persist to localStorage if needed
            localStorage.setItem("theme", newTheme);

            return { theme: newTheme };
        }),
    initializeTheme: () => {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

        const htmlEl = document.documentElement;
        if (initialTheme === "dark") {
            htmlEl.classList.add("dark");
            htmlEl.setAttribute("data-theme", "dark");
        } else {
            htmlEl.classList.remove("dark");
            htmlEl.setAttribute("data-theme", "light");
        }

        return set({ theme: initialTheme });
    },
}));

export default useThemeStore;
