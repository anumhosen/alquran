import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore, translationMetaMap, tafsirMetaMap } from '../store/useSettingsStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { useQuranStore } from '../store/useQuranStore';
import { FaTimes, FaFont, FaLanguage, FaSlidersH, FaBookOpen } from 'react-icons/fa';

export default function SidebarRight() {
    const navigate = useNavigate();
    const { isRightOpen, closeRight } = useSidebarStore();
    const { currentSurahId, fetchAyahs } = useQuranStore();
    const {
        selectedTranslations, toggleTranslation,
        tafsirDb, setTafsirDb,
        showWordByWord, setShowWordByWord,
        wbwLanguage, setWbwLanguage,
        arabicFontSize, setArabicFontSize,
        translationFontSize, setTranslationFontSize,
        arabicFontFamily, setArabicFontFamily,
        banglaFontFamily, setBanglaFontFamily,
        theme, setTheme
    } = useSettingsStore();

    if (!isRightOpen) return null;

    const handleTranslationToggle = (db) => {
        toggleTranslation(db);
        fetchAyahs(currentSurahId);
    };

    return (
        <aside className="fixed inset-y-0 right-0 z-10 w-80 bg-white dark:bg-gray-900 shadow-2xl flex flex-col mt-10 animate-in slide-in-from-right duration-200">
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
                {/* Multiple Translations Checkboxes */}
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 font-semibold text-emerald-900 dark:text-emerald-400 text-xs">
                        <FaLanguage className="w-3.5 h-3.5" />
                        <span>Select Translations (একাধিক নির্বাচনযোগ্য)</span>
                    </label>
                    <div className="space-y-1.5 bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700">
                        {Object.entries(translationMetaMap).map(([db, meta]) => {
                            const checked = selectedTranslations.includes(db);
                            return (
                                <label key={db} className="flex items-center justify-between text-xs cursor-pointer hover:text-emerald-700">
                                    <span>{meta.name}</span>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => handleTranslationToggle(db)}
                                        className="w-3.5 h-3.5 text-emerald-600 rounded"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Single Tafsir Selection */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <label className="flex items-center space-x-2 font-semibold text-emerald-900 dark:text-emerald-400 text-xs">
                        <FaBookOpen className="w-3.5 h-3.5" />
                        <span>Select Tafsir (একটি নির্বাচনযোগ্য)</span>
                    </label>
                    <select
                        value={tafsirDb}
                        onChange={(e) => setTafsirDb(e.target.value)}
                        className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs"
                    >
                        {Object.entries(tafsirMetaMap).map(([db, name]) => (
                            <option key={db} value={db}>{name}</option>
                        ))}
                    </select>
                </div>

                {/* Fonts */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <label className="flex items-center space-x-2 font-semibold text-emerald-900 dark:text-emerald-400 text-xs">
                        <FaFont className="w-3.5 h-3.5" />
                        <span>Font Selector</span>
                    </label>
                    <select value={arabicFontFamily} onChange={(e) => setArabicFontFamily(e.target.value)} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs font-serif">
                        <option value="Kitab">Kitab (Default Uthmani)</option>
                        <option value="AmiriQuran">Amiri Quran</option>
                        <option value="MeQuran">Me Quran</option>
                        <option value="Lateef">Lateef</option>
                        <option value="NotoNaskhArabic">Noto Naskh Arabic</option>
                    </select>
                    <select value={banglaFontFamily} onChange={(e) => setBanglaFontFamily(e.target.value)} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs">
                        <option value="Kalpurush">Kalpurush (Default)</option>
                        <option value="AnekBangla">Anek Bangla</option>
                        <option value="Mina">Mina</option>
                        <option value="NotoSerifBengali">Noto Serif Bengali</option>
                    </select>
                </div>

                {/* Word by Word */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-emerald-900 dark:text-emerald-400 text-xs">Word-by-Word</span>
                        <input type="checkbox" checked={showWordByWord} onChange={(e) => setShowWordByWord(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded" />
                    </div>
                    {showWordByWord && (
                        <select value={wbwLanguage} onChange={(e) => setWbwLanguage(e.target.value)} className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-xs">
                            <option value="bn">Bengali (বাংলা)</option>
                            <option value="en">English</option>
                            <option value="in">Indonesian</option>
                        </select>
                    )}
                </div>

                {/* Font Sizes */}
                <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        <div className="flex justify-between text-xs mb-1"><span>Arabic Size</span><span className="font-bold">{arabicFontSize}px</span></div>
                        <input type="range" min="20" max="44" value={arabicFontSize} onChange={(e) => setArabicFontSize(parseInt(e.target.value, 10))} className="w-full accent-emerald-600" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1"><span>Translation Size</span><span className="font-bold">{translationFontSize}px</span></div>
                        <input type="range" min="12" max="26" value={translationFontSize} onChange={(e) => setTranslationFontSize(parseInt(e.target.value, 10))} className="w-full accent-emerald-600" />
                    </div>
                </div>

                {/* App Theme */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="font-semibold text-emerald-900 dark:text-emerald-400 text-xs">App Theme</span>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => setTheme('emerald')} className={`p-2 rounded-lg border text-xs font-medium text-center ${theme === 'emerald' ? 'border-emerald-600 bg-emerald-100 text-emerald-900 font-bold' : 'bg-gray-100'}`}>Emerald</button>
                        <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg border text-xs font-medium text-center ${theme === 'dark' ? 'border-emerald-500 bg-gray-800 text-white font-bold' : 'bg-gray-800 text-gray-300'}`}>Dark</button>
                        <button onClick={() => setTheme('sepia')} className={`p-2 rounded-lg border text-xs font-medium text-center ${theme === 'sepia' ? 'border-amber-600 bg-amber-100 text-amber-900 font-bold' : 'bg-amber-50 text-amber-900'}`}>Sepia</button>
                    </div>
                </div>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <button onClick={() => { navigate('/settings'); closeRight(); }} className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow transition-colors text-xs">
                    <span>All Settings Page (সেটিংস)</span>
                </button>
            </div>
        </aside>
    );
}
