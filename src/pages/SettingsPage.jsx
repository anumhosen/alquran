import React from 'react';
import { useSettingsStore, translationMetaMap, tafsirMetaMap } from '../store/useSettingsStore';
import { useQuranStore } from '../store/useQuranStore';
import AudioSettingsCard from '../components/AudioSettingsCard';
import { FaCog, FaLanguage, FaFont, FaBookOpen } from 'react-icons/fa';

export default function SettingsPage() {
    const { currentSurahId, fetchAyahs } = useQuranStore();
    const {
        selectedTranslations, toggleTranslation,
        tafsirDb, setTafsirDb,
        arabicFontSize, setArabicFontSize,
        translationFontSize, setTranslationFontSize,
        theme, setTheme
    } = useSettingsStore();

    const handleTranslationToggle = (db) => {
        toggleTranslation(db);
        fetchAyahs(currentSurahId);
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="max-w-5xl py-2 md:py-6 px-2 md:px-6 space-y-6 mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800">
                    <h1 className="text-2xl font-bold text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
                        <FaCog className="w-6 h-6 text-emerald-600" />
                        <span>Application Settings & Preferences</span>
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Configure multiple active translations, active tafsir book, audio storage folder, fonts, and themes.
                    </p>
                </div>

                <AudioSettingsCard />

                {/* Reader Translations & Tafsir Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-5">
                    <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <FaLanguage className="w-5 h-5 text-emerald-600" />
                        <span>Translations & Tafsir Settings</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        {/* Multiple Translations */}
                        <div className="space-y-2">
                            <label className="font-semibold text-gray-800 dark:text-gray-200 block">
                                Quran Translations (একাধিক নির্বাচন করা যাবে):
                            </label>
                            <div className="space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                                {Object.entries(translationMetaMap).map(([db, meta]) => {
                                    const checked = selectedTranslations.includes(db);
                                    return (
                                        <label key={db} className="flex items-center justify-between p-1.5 rounded hover:bg-emerald-50 dark:hover:bg-gray-700/60 cursor-pointer">
                                            <span className="font-medium text-xs text-gray-800 dark:text-gray-200">{meta.name}</span>
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => handleTranslationToggle(db)}
                                                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Single Tafsir Selection */}
                        <div className="space-y-2">
                            <label className="font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-1.5">
                                <FaBookOpen className="w-4 h-4 text-emerald-600" />
                                <span>Active Tafsir Book (একটি নির্বাচনযোগ্য):</span>
                            </label>
                            <select
                                value={tafsirDb}
                                onChange={(e) => setTafsirDb(e.target.value)}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                            >
                                {Object.entries(tafsirMetaMap).map(([db, name]) => (
                                    <option key={db} value={db}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Typography & Theme */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
                    <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <FaFont className="w-5 h-5 text-emerald-600" />
                        <span>Typography & Theme</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Arabic Font Size</span>
                                    <span>{arabicFontSize}px</span>
                                </div>
                                <input type="range" min="20" max="44" value={arabicFontSize} onChange={(e) => setArabicFontSize(parseInt(e.target.value, 10))} className="w-full accent-emerald-600" />
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Translation Font Size</span>
                                    <span>{translationFontSize}px</span>
                                </div>
                                <input type="range" min="12" max="26" value={translationFontSize} onChange={(e) => setTranslationFontSize(parseInt(e.target.value, 10))} className="w-full accent-emerald-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-semibold text-gray-700 dark:text-gray-300 block">Theme Palette:</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => setTheme('emerald')} className={`p-3 rounded-xl border text-xs font-bold ${theme === 'emerald' ? 'border-emerald-600 bg-emerald-100 text-emerald-900' : 'bg-gray-100 dark:bg-gray-800'}`}>Emerald</button>
                                <button onClick={() => setTheme('dark')} className={`p-3 rounded-xl border text-xs font-bold ${theme === 'dark' ? 'border-emerald-500 bg-gray-800 text-white' : 'bg-gray-800 text-gray-300'}`}>Dark</button>
                                <button onClick={() => setTheme('sepia')} className={`p-3 rounded-xl border text-xs font-bold ${theme === 'sepia' ? 'border-amber-600 bg-amber-100 text-amber-900' : 'bg-amber-50 text-amber-900'}`}>Sepia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
