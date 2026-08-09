import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/useSettingsStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { useQuranStore } from '../store/useQuranStore';
import { FaTimes, FaFont, FaLanguage, FaSlidersH } from 'react-icons/fa';

export default function SidebarRight() {
    const navigate = useNavigate();
    const { isRightOpen, closeRight } = useSidebarStore();
    const { currentSurahId, fetchAyahs } = useQuranStore();
    const {
        translationDb, setTranslationDb,
        showWordByWord, setShowWordByWord,
        wbwLanguage, setWbwLanguage,
        arabicFontSize, setArabicFontSize,
        translationFontSize, setTranslationFontSize,
        arabicFontFamily, setArabicFontFamily,
        banglaFontFamily, setBanglaFontFamily,
        theme, setTheme
    } = useSettingsStore();

    if (!isRightOpen) return null;

    const handleTranslationChange = (e) => {
        setTranslationDb(e.target.value);
        fetchAyahs(currentSurahId);
    };

    return (
        <aside className="fixed inset-y-0 right-0 z-1 w-80 bg-white dark:bg-gray-900 shadow-2xl flex flex-col mt-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
                <button onClick={closeRight} className="p-1 hover:bg-emerald-700 rounded text-emerald-200">
                    <FaTimes className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-lg">Quick Settings</h3>
                <div className="flex items-center space-x-2">
                    <FaSlidersH className="w-4 h-4 text-emerald-200" />
                </div>

            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-gray-800 dark:text-gray-200">
                {/* Translation Selection */}
                <div className="space-y-1">
                    <label className="flex items-center space-x-2 font-semibold text-emerald-900 dark:text-emerald-400 text-xs">
                        <FaLanguage className="w-3.5 h-3.5" />
                        <span>Translation</span>
                    </label>
                    <select
                        value={translationDb}
                        onChange={handleTranslationChange}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs"
                    >
                        <option value="bn_bayaan.db">Bayan Foundation (bn)</option>
                        <option value="bn_taisirul.db">Taisirul Quran (bn)</option>
                        <option value="bn_mujibur.db">Mujibur Rahman (bn)</option>
                        <option value="en_sahih.db">Sahih International (en)</option>
                    </select>
                </div>

                {/* Font Selectors (Arabic & Bangla) */}
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <label className="flex items-center space-x-2 font-semibold text-emerald-900 dark:text-emerald-400 text-xs">
                        <FaFont className="w-3.5 h-3.5" />
                        <span>Font Style Selector</span>
                    </label>

                    <div className="space-y-1">
                        <label className="text-[11px] text-gray-500">Arabic Font:</label>
                        <select
                            value={arabicFontFamily}
                            onChange={(e) => setArabicFontFamily(e.target.value)}
                            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-serif"
                        >
                            <option value="Kitab">Kitab (Default Uthmani)</option>
                            <option value="AmiriQuran">Amiri Quran</option>
                            <option value="MeQuran">Me Quran</option>
                            <option value="Lateef">Lateef</option>
                            <option value="NotoNaskhArabic">Noto Naskh Arabic</option>
                            <option value="NooreHidayat">Noore Hidayat</option>
                            <option value="NooreHira">Noore Hira</option>
                            <option value="NooreHuda">Noore Huda</option>
                            <option value="Qalam">Qalam</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] text-gray-500">Bangla Font:</label>
                        <select
                            value={banglaFontFamily}
                            onChange={(e) => setBanglaFontFamily(e.target.value)}
                            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs"
                        >
                            <option value="Kalpurush">Kalpurush (Default)</option>
                            <option value="AnekBangla">Anek Bangla</option>
                            <option value="Mina">Mina</option>
                            <option value="NotoSerifBengali">Noto Serif Bengali</option>
                        </select>
                    </div>
                </div>

                {/* Word by Word Settings */}
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-900 dark:text-emerald-400 text-xs">Word-by-Word</span>
                        <input
                            type="checkbox"
                            checked={showWordByWord}
                            onChange={(e) => setShowWordByWord(e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                    </div>

                    {showWordByWord && (
                        <div className="space-y-1">
                            <select
                                value={wbwLanguage}
                                onChange={(e) => setWbwLanguage(e.target.value)}
                                className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs"
                            >
                                <option value="bn">Bengali (বাংলা)</option>
                                <option value="en">English</option>
                                <option value="in">Indonesian</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Font Size Adjustments */}
                <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Arabic Size</span>
                            <span className="font-bold">{arabicFontSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="44"
                            value={arabicFontSize}
                            onChange={(e) => setArabicFontSize(parseInt(e.target.value, 10))}
                            className="w-full accent-emerald-600"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span>Translation Size</span>
                            <span className="font-bold">{translationFontSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="12"
                            max="26"
                            value={translationFontSize}
                            onChange={(e) => setTranslationFontSize(parseInt(e.target.value, 10))}
                            className="w-full accent-emerald-600"
                        />
                    </div>
                </div>

                {/* Theme Palette */}
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="font-semibold text-emerald-900 dark:text-emerald-400 text-xs">App Theme</span>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setTheme('emerald')}
                            className={`p-2 rounded-lg border text-xs font-medium text-center ${theme === 'emerald' ? 'border-emerald-600 bg-emerald-100 text-emerald-900 font-bold' : 'bg-gray-100'}`}
                        >
                            Emerald
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-2 rounded-lg border text-xs font-medium text-center ${theme === 'dark' ? 'border-emerald-500 bg-gray-800 text-white font-bold' : 'bg-gray-800 text-gray-300'}`}
                        >
                            Dark
                        </button>
                        <button
                            onClick={() => setTheme('sepia')}
                            className={`p-2 rounded-lg border text-xs font-medium text-center ${theme === 'sepia' ? 'border-amber-600 bg-amber-100 text-amber-900 font-bold' : 'bg-amber-50 text-amber-900'}`}
                        >
                            Sepia
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Button */}
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => { navigate('/settings'); closeRight(); }}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-2 text-xs"
                >
                    <span>All Settings Page (সেটিংস)</span>
                </button>
            </div>
        </aside>
    );
}
