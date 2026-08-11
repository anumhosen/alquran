import React from 'react';
import { FaHeart, FaGlobe, FaBookOpen, FaCode, FaEnvelope, FaFacebook, FaUserTie } from 'react-icons/fa';

export default function About() {
    return (
        <div className="w-full h-full overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6 py-2 md:py-6 px-2 md:px-6">
                {/* Hero Card */}
                <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="w-20 h-20 mx-auto flex items-center justify-center text-4xl font-serif mb-4">
                        <img src="icon.png" alt="Al Quran" />
                    </div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Al Quran Desktop</h1>
                    <p className="text-emerald-200 text-sm max-w-lg mx-auto leading-relaxed">
                        Inspired by and Data Sourced from <a href="https://gtaf.org" target="_blank" rel="noreferrer" className="font-bold text-white underline hover:text-emerald-300">Greentech Apps Foundation (GTAF)</a> Quranic App Resources.
                    </p>
                </div>

                {/* Developer Info Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center space-x-2">
                        <FaUserTie className="w-5 h-5 text-emerald-600" />
                        <span>Developer & Publisher Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <span className="font-semibold text-gray-500 block text-xs">Developer Name:</span>
                            <span className="font-bold text-emerald-950 dark:text-emerald-200 text-base">Anum Hosen</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-500 block text-xs">Institution:</span>
                            <span>Dept. of Physics, Jessore University of Science & Technology (JUST)</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-500 block text-xs">Email Address:</span>
                            <a href="mailto:anumhosen@gmail.com" className="text-emerald-700 dark:text-emerald-400 hover:underline">anumhosen@gmail.com</a>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-500 block text-xs">Social Profiles:</span>
                            <div className="flex items-center space-x-3 mt-1 text-xs font-medium">
                                <a href="https://www.facebook.com/anumhosen80/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-blue-600 hover:underline">
                                    <FaFacebook className="w-3.5 h-3.5" />
                                    <span>Facebook</span>
                                </a>
                                <a href="https://www.freelancer.com/u/anumhosen" target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-cyan-600 hover:underline">
                                    <FaGlobe className="w-3.5 h-3.5" />
                                    <span>Freelancer Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Greentech Apps Foundation Acknowledgment Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-3">
                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2">
                        <FaGlobe className="w-5 h-5 text-emerald-600" />
                        <span>Greentech Apps Foundation (GTAF) Reference</span>
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        Special gratitude to <a href="https://gtaf.org" target="_blank" rel="noreferrer" className="font-bold text-emerald-700 dark:text-emerald-400 underline">Greentech Apps Foundation (GTAF)</a> as their database beed used to build this app.
                    </p>
                </div>

                {/* App Features List Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2">
                        <FaBookOpen className="w-5 h-5 text-emerald-600" />
                        <span>Key App Capabilities</span>
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside leading-relaxed">
                        <li>Uthmani Arabic text with 9 custom font choices</li>
                        <li>Word-by-Word analysis (Bengali, English, Indonesian)</li>
                        <li>Multiple Bengali & English translations</li>
                        <li>Comprehensive Tafsir books (Ibn Kathir, Zakaria, etc.)</li>
                        <li>Quranic Grammar & Root Morphology</li>
                        <li>Subjectwise Quran Topics database browser</li>
                        <li>Real-time Audio & Word-by-Word Sync</li>
                        <li>Offline Audio Download Manager & Directory selector</li>
                    </ul>

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
