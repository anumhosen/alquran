import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { FaFolder, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function AudioSettingsCard() {
    const {
        audioBasePath, setAudioBasePath,
        audioSourceMode, setAudioSourceMode,
        reciter, setReciter
    } = useSettingsStore();

    const isLocalPathSet = Boolean(audioBasePath && audioBasePath.trim());

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
            <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <FaFolder className="w-5 h-5 text-emerald-600" />
                <span>Audio Base Directory Selector</span>
            </h2>

            <div className="space-y-3">
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    Select or enter the base directory folder where audio recitations and timing databases are stored:
                    <ul className="list-disc list-inside text-xs text-gray-500 dark:text-gray-400 mt-1.5 space-y-1 font-mono">
                        <li>Audio Files: <span className="text-emerald-700 dark:text-emerald-400">&lt;selected_folder&gt;/audio/mishari_alafasy</span></li>
                        <li>Timing DB: <span className="text-emerald-700 dark:text-emerald-400">&lt;selected_folder&gt;/mishari_alafasy/mishari_alafasy.db</span></li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <input
                        type="text"
                        value={audioBasePath}
                        onChange={(e) => setAudioBasePath(e.target.value)}
                        placeholder="Enter absolute directory path (e.g. d:\Development\TAURI\Al Quran\src-tauri\assets)..."
                        className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        onClick={() => setAudioBasePath('d:/Development/TAURI/Al Quran/src-tauri/assets')}
                        className="px-4 py-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl hover:bg-emerald-200 transition-colors flex-shrink-0"
                    >
                        Use Assets Preset
                    </button>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-2 text-xs pt-1">
                    {isLocalPathSet ? (
                        <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-medium">
                            <FaCheckCircle className="w-3.5 h-3.5" />
                            <span>Directory configured: {audioBasePath}</span>
                        </span>
                    ) : (
                        <span className="flex items-center space-x-1 text-amber-600 font-medium">
                            <FaExclamationTriangle className="w-3.5 h-3.5" />
                            <span>No local path configured. Player will fallback to online CDN streams.</span>
                        </span>
                    )}
                </div>

                {/* Audio Source Mode & Reciter Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                            Audio Playback Source:
                        </label>
                        <select
                            value={audioSourceMode}
                            onChange={(e) => setAudioSourceMode(e.target.value)}
                            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                        >
                            <option value="local">Local Files (&lt;folder&gt;/audio/mishari_alafasy)</option>
                            <option value="online">Online CDN Stream (EveryAyah CDN)</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                            Audio Reciter:
                        </label>
                        <select
                            value={reciter}
                            onChange={(e) => setReciter(e.target.value)}
                            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                        >
                            <option value="mishari_alafasy">Mishari Rashid Al-Alafasy</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
