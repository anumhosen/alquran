import React from 'react';
import { useQuranStore } from '../store/useQuranStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { FaTimes, FaBookReader } from 'react-icons/fa';

export default function TafsirModal() {
    const { activeTafsirAyah, tafsirText, tafsirLoading, closeTafsir } = useQuranStore();
    const { tafsirDb, setTafsirDb } = useSettingsStore();

    if (!activeTafsirAyah) return null;

    const { sura, ayah } = activeTafsirAyah;

    const handleTafsirChange = (e) => {
        setTafsirDb(e.target.value);
        useQuranStore.getState().openTafsir(sura, ayah);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-emerald-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FaBookReader className="w-5 h-5 text-emerald-200" />
                        <h3 className="text-lg font-bold">
                            Tafsir - Surah {sura}, Ayah {ayah}
                        </h3>
                    </div>
                    <button 
                        onClick={closeTafsir}
                        className="p-1.5 hover:bg-emerald-700 rounded-lg text-emerald-200 hover:text-white transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Tafsir Source Selector */}
                <div className="p-3 bg-emerald-50 dark:bg-gray-900 border-b border-emerald-100 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        Select Tafsir Book:
                    </span>
                    <select
                        value={tafsirDb}
                        onChange={handleTafsirChange}
                        className="bg-white dark:bg-gray-800 border border-emerald-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="bn_tafsir_kathir.db">Tafsir Ibn Kathir (bn)</option>
                        <option value="bn_tafsirzakaria.db">Tafsir Abu Bakr Zakaria (bn)</option>
                        <option value="bn_tafsirbayaan.db">Tafsir Bayaan (bn)</option>
                        <option value="bn_mokhtasar.db">Al-Mokhtasar (bn)</option>
                        <option value="kathir.db">Tafsir Ibn Kathir (ar)</option>
                    </select>
                </div>

                {/* Tafsir Body Text */}
                <div className="p-6 overflow-y-auto flex-1 text-gray-800 dark:text-gray-200 leading-relaxed font-sans text-base">
                    {tafsirLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-emerald-600">
                            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                            <span>Loading Tafsir content...</span>
                        </div>
                    ) : (
                        <div className="whitespace-pre-line">
                            {tafsirText || 'No Tafsir text available for this verse.'}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 text-right">
                    <button
                        onClick={closeTafsir}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm rounded-lg font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
