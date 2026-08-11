import { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useQuranStore } from '../store/useQuranStore';
import { tauriAPI } from '../utils/tauriAPI';
import { FaCloudDownloadAlt, FaSpinner, FaCheckCircle, FaPause } from 'react-icons/fa';

export default function AudioDownloadManager() {
    const { audioFolderPath } = useSettingsStore();
    const { surahList } = useQuranStore();
    const [downloading, setDownloading] = useState(false);
    const [currentDownloadSura, setCurrentDownloadSura] = useState(null);
    const [downloadedCount, setDownloadedCount] = useState(0);
    const [cancelRequested, setCancelRequested] = useState(false);

    const padNumber = (num) => String(num).padStart(3, '0');

    useEffect(() => {
        checkExistingDownloads();
    }, [audioFolderPath]);

    const checkExistingDownloads = async () => {
        if (!audioFolderPath) return;
        let count = 0;
        for (let i = 1; i <= 114; i++) {
            const filename = `${padNumber(i)}.mp3`;
            const exists = await tauriAPI.checkAudioFileExists(audioFolderPath, filename);
            if (exists) count++;
        }
        setDownloadedCount(count);
    };

    const handleDownloadAll = async () => {
        if (downloading) {
            setCancelRequested(true);
            return;
        }

        setDownloading(true);
        setCancelRequested(false);

        for (let i = 1; i <= 114; i++) {
            if (cancelRequested) break;
            const filename = `${padNumber(i)}.mp3`;
            const exists = await tauriAPI.checkAudioFileExists(audioFolderPath, filename);

            if (!exists) {
                setCurrentDownloadSura(i);
                try {
                    const downloadUrl = `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${padNumber(i)}.mp3`;
                    const resp = await fetch(downloadUrl);
                    if (resp.ok) {
                        const buffer = await resp.arrayBuffer();
                        await tauriAPI.saveAudioFile(audioFolderPath, filename, buffer);
                    }
                } catch (e) {
                    console.warn(`Failed downloading Surah ${i}:`, e);
                }
            }
            await checkExistingDownloads();
        }

        setDownloading(false);
        setCurrentDownloadSura(null);
        setCancelRequested(false);
    };

    const percent = Math.round((downloadedCount / 114) * 100);

    return (
        <div className="bg-emerald-50/50 dark:bg-gray-800/50 rounded-2xl p-5 border border-emerald-200/60 dark:border-gray-700/60 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FaCloudDownloadAlt className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-300">
                        Audio Download Manager (QuranicAudio CDN)
                    </h3>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {downloadedCount} / 114 Surahs
                </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>{downloading ? `Downloading Surah ${currentDownloadSura} of 114...` : 'Local Audio Files Status'}</span>
                    <span className="font-bold">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
                <button
                    onClick={handleDownloadAll}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow transition-all ${
                        downloading
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                >
                    {downloading ? (
                        <>
                            <FaPause className="w-3.5 h-3.5" />
                            <span>Pause Download</span>
                        </>
                    ) : (
                        <>
                            <FaCloudDownloadAlt className="w-4 h-4" />
                            <span>{downloadedCount === 114 ? 'Re-Download All (১১৪ সূরা)' : 'Download All Full Surahs (QuranicAudio)'}</span>
                        </>
                    )}
                </button>

                {downloadedCount === 114 && (
                    <span className="flex items-center space-x-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                        <FaCheckCircle className="w-3.5 h-3.5" />
                        <span>All 114 Surahs Downloaded Offline</span>
                    </span>
                )}
            </div>
        </div>
    );
}
