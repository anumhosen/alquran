import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { tauriAPI } from '../utils/tauriAPI';
import AudioDownloadManager from './AudioDownloadManager';
import { FaFolder, FaFolderOpen, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function AudioSettingsCard() {
    const {
        audioFolderPath, setAudioFolderPath,
        audioSourceMode, setAudioSourceMode,
        reciter, setReciter
    } = useSettingsStore();

    const handleBrowseFolder = async () => {
        const selected = await tauriAPI.selectAudioFolder();
        if (selected) {
            setAudioFolderPath(selected);
        }
    };

    const handleSetDefaultDir = async () => {
        const defaultDir = await tauriAPI.getDefaultAudioDir();
        if (defaultDir) {
            setAudioFolderPath(defaultDir);
        } else {
            setAudioFolderPath('d:/Development/TAURI/Al Quran/src-tauri/assets/audio/mishari_alafasy');
        }
    };

    const isLocalPathSet = Boolean(audioFolderPath && audioFolderPath.trim());

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-5">
            <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-300 flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                <FaFolder className="w-5 h-5 text-emerald-600" />
                <span>Audio Storage Directory Selector</span>
            </h2>

            <div className="space-y-4">
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    Choose the folder location where audio recitation MP3 files are saved:
                </div>

                {/* Folder Path Input & Open Dialog Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={audioFolderPath}
                        onChange={(e) => setAudioFolderPath(e.target.value)}
                        placeholder="Select or enter local audio folder path..."
                        className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        onClick={handleBrowseFolder}
                        className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-1.5 flex-shrink-0"
                    >
                        <FaFolderOpen className="w-4 h-4 text-emerald-200" />
                        <span>Browse Folder...</span>
                    </button>
                    <button
                        onClick={handleSetDefaultDir}
                        className="px-3 py-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl hover:bg-emerald-200 transition-colors flex-shrink-0"
                    >
                        Set Default Path
                    </button>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-2 text-xs pt-1">
                    {isLocalPathSet ? (
                        <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-medium">
                            <FaCheckCircle className="w-3.5 h-3.5" />
                            <span>Audio Folder Path: {audioFolderPath}</span>
                        </span>
                    ) : (
                        <span className="flex items-center space-x-1 text-amber-600 font-medium">
                            <FaExclamationTriangle className="w-3.5 h-3.5" />
                            <span>No audio folder selected. Player will fallback to online CDN streams.</span>
                        </span>
                    )}
                </div>

                {/* Audio Source Mode & Reciter Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                            Audio Playback Mode:
                        </label>
                        <select
                            value={audioSourceMode}
                            onChange={(e) => setAudioSourceMode(e.target.value)}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                        >
                            <option value="local">Local Files (Selected Audio Folder)</option>
                            <option value="online">Online CDN Stream (EveryAyah CDN)</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                            Reciter:
                        </label>
                        <select
                            value={reciter}
                            onChange={(e) => setReciter(e.target.value)}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm"
                        >
                            <option value="mishari_alafasy">Mishari Rashid Al-Alafasy</option>
                        </select>
                    </div>
                </div>

                {/* Audio Download Manager Component */}
                <AudioDownloadManager />
            </div>
        </div>
    );
}
