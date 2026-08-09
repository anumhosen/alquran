import React from 'react';
import { FaHeart, FaGlobe, FaBookOpen } from 'react-icons/fa';

export default function About() {
    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='max-w-5xl mx-auto space-y-6 py-6'>
                <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="w-20 h-20 mx-auto flex items-center justify-center text-4xl font-serif mb-4">
                        <img src='icon.png' alt='Al Quran' />
                    </div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Al Quran Desktop</h1>
                    <p className="text-emerald-200 text-sm max-w-md mx-auto">
                        Inspired by the magnificent <span className="font-semibold text-white">Greentech Apps Foundation</span> Quran app experience.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-md border border-emerald-100 dark:border-gray-800 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center space-x-2">
                            <FaBookOpen className="w-5 h-5 text-emerald-600" />
                            <span>Key Features</span>
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside leading-relaxed">
                            <li>Uthmani Arabic text with custom font sizing</li>
                            <li>Word-by-Word translation in Bengali, English, and Indonesian</li>
                            <li>Multiple Bengali & English translations (Bayan, Taisirul, Mujibur, Sahih)</li>
                            <li>Comprehensive Tafsirs (Ibn Kathir, Zakaria, Bayaan, Mokhtasar)</li>
                            <li>Quranic Grammar & Word Root Morphology</li>
                            <li>Subjectwise Quran Topics database browser</li>
                            <li>Full-text multi-lingual search engine</li>
                            <li>Recitation audio playback with verse auto-scroll</li>
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500">
                        <p className="flex items-center justify-center space-x-1">
                            <span>Made with</span>
                            <FaHeart className="w-3.5 h-3.5 text-red-500" />
                            <span>for Muslims worldwide.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
