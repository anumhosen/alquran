import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useQuranStore } from '../store/useQuranStore';
import AudioSettingsCard from '../components/AudioSettingsCard';
import { FaCog, FaLanguage, FaFont } from 'react-icons/fa';

export default function SettingsPage() {
    const { currentSurahId, fetchAyahs } = useQuranStore();
    const {
        translationDb, setTranslationDb,
        tafsirDb, setTafsirDb,
        arabicFontSize, setArabicFontSize,
        translationFontSize, setTranslationFontSize,
        theme, setTheme
    } = useSettingsStore();

    const handleTranslationChange = (e) => {
        setTranslationDb(e.target.value);
        fetchAyahs(currentSurahId);
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='max-w-5xl py-6 space-y-6 mx-auto'>
                {/* Title Header */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800">
                    <h1 className="text-2xl font-bold text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
                        <FaCog className="w-6 h-6 text-emerald-600" />
                        <span>Application Settings & Preferences</span>
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Configure audio storage directories, recitation reciters, translations, tafsirs, typography, and visual themes.
                    </p>
                </div>

                {/* Audio Storage Directory & Path Card */}
                <AudioSettingsCard />

                {/* Reader & Translation Settings Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
                    <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <FaLanguage className="w-5 h-5 text-emerald-600" />
                        <span>Translations & Tafsirs</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <label className="font-semibold text-gray-700 dark:text-gray-300">Quran Translation:</label>
                            <select
                                value={translationDb}
                                onChange={handleTranslationChange}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl"
                            >
                                <option value="bn_bayaan.db">Bayan Foundation (Bengali)</option>
                                <option value="bn_taisirul.db">Taisirul Quran (Bengali)</option>
                                <option value="bn_mujibur.db">Mujibur Rahman (Bengali)</option>
                                <option value="bn_fmazid.db">Fozlur Mazid (Bengali)</option>
                                <option value="en_sahih.db">Sahih International (English)</option>
                                <option value="quran_indo.db">Indonesian Translation</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="font-semibold text-gray-700 dark:text-gray-300">Tafsir Book:</label>
                            <select
                                value={tafsirDb}
                                onChange={(e) => setTafsirDb(e.target.value)}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl"
                            >
                                <option value="bn_tafsir_kathir.db">Tafsir Ibn Kathir (Bengali)</option>
                                <option value="bn_tafsirzakaria.db">Tafsir Abu Bakr Zakaria (Bengali)</option>
                                <option value="bn_tafsirbayaan.db">Tafsir Bayaan (Bengali)</option>
                                <option value="bn_mokhtasar.db">Al-Mokhtasar (Bengali)</option>
                                <option value="kathir.db">Tafsir Ibn Kathir (Arabic)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Typography & Appearance Theme Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
                    <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                        <FaFont className="w-5 h-5 text-emerald-600" />
                        <span>Typography & Appearance Theme</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Arabic Font Size</span>
                                    <span>{arabicFontSize}px</span>
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
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Translation Font Size</span>
                                    <span>{translationFontSize}px</span>
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

                        <div className="space-y-2">
                            <label className="font-semibold text-gray-700 dark:text-gray-300 block">Theme Palette:</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setTheme('emerald')}
                                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${theme === 'emerald' ? 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-xs' : 'bg-gray-100 dark:bg-gray-800'}`}
                                >
                                    Emerald
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${theme === 'dark' ? 'border-emerald-500 bg-gray-800 text-white shadow-xs' : 'bg-gray-800 text-gray-300'}`}
                                >
                                    Dark
                                </button>
                                <button
                                    onClick={() => setTheme('sepia')}
                                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${theme === 'sepia' ? 'border-amber-600 bg-amber-100 text-amber-900 shadow-xs' : 'bg-amber-50 text-amber-900'}`}
                                >
                                    Sepia
                                </button>
                            </div>
                        </div>
                    </div>
                </div></div>
        </div>
    );
}
