import { useState, useEffect } from 'react';
import { useQuranStore } from '../store/useQuranStore';
import SurahHeader from '../components/SurahHeader';
import AyahCard from '../components/AyahCard';
import SurahIndexPanel from '../components/SurahIndexPanel';
import { FaBookOpen, FaSpinner, FaList, FaPlay, FaPause } from 'react-icons/fa';

export default function Main() {
    const { currentSurahId, ayahs, loading, setCurrentSurah, audioState, setAudioState } = useQuranStore();
    const [showIndex, setShowIndex] = useState(false);

    const isPlayingCurrent = audioState.isPlaying && audioState.sura === currentSurahId;

    useEffect(() => {
        if (!ayahs || ayahs.length === 0) {
            setCurrentSurah(currentSurahId);
        }
    }, [currentSurahId]);

    const handleQuickPlayToggle = () => {
        if (isPlayingCurrent) {
            setAudioState({ isPlaying: false });
        } else {
            setAudioState({
                isPlaying: true,
                sura: currentSurahId,
                currentAyah: audioState.currentAyah || 1
            });
        }
    };

    return (
        <div className="w-full h-full relative">

            {/* Top-Left FaList Icon Toggle Button */}
            {!showIndex && <div className="absolute left-6 top-6">
                <button
                    onClick={() => setShowIndex(!showIndex)}
                    title={showIndex ? "Hide Surah Index" : "Show Surah Index"}
                    className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md transition-transform active:scale-95 flex items-center space-x-2"
                >
                    <FaList className="w-4 h-4 text-emerald-200" />
                </button>
            </div>}

            <div className={`flex gap-6 h-full w-full transition-all duration-300 overflow-hidden`}>
                {/* Embedded Rounded Surah Index Panel */}
                <div className='my-6 ml-6'>
                    <SurahIndexPanel isOpen={showIndex} onClose={() => setShowIndex(false)} />
                </div>
                {/* Main Quran Content Area */}
                <div className='h-full w-full overflow-y-auto'>
                    <div className='min-w-0 max-w-5xl space-y-6 py-6 pr-6 mx-auto'>
                        <SurahHeader />

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-emerald-600 dark:text-emerald-400">
                                <FaSpinner className="w-10 h-10 animate-spin mb-4" />
                                <p className="text-lg font-medium">Loading Quran verses...</p>
                            </div>
                        ) : ayahs && ayahs.length > 0 ? (
                            <div className="space-y-4">
                                {ayahs.map((ayahData) => (
                                    <AyahCard key={`${ayahData.sura}-${ayahData.ayah}`} ayahData={ayahData} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                <FaBookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-emerald-600" />
                                <p>No verses loaded. Please select a Surah from the index.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Floating Quick Play Button in Bottom Right Corner */}
            <button
                onClick={handleQuickPlayToggle}
                title={isPlayingCurrent ? "Pause Audio Recitation" : "Play Surah Recitation"}
                className={`fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-95 ${isPlayingCurrent
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-400/40 animate-pulse'
                    : 'bg-emerald-700 hover:bg-emerald-600 text-white hover:scale-105'
                    }`}
            >
                {isPlayingCurrent ? (
                    <FaPause className="w-5 h-5" />
                ) : (
                    <FaPlay className="w-5 h-5 pl-0.5" />
                )}
            </button>
        </div>
    );
}
