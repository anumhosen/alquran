import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useQuranStore } from '../store/useQuranStore';
import { useBookmarkStore } from '../store/useBookmarkStore';
import WordByWordView from './WordByWordView';
import { FaPlay, FaPause, FaBookmark, FaRegBookmark, FaBookOpen, FaCopy, FaCheck } from 'react-icons/fa';

export default function AyahCard({ ayahData }) {
    const { arabicFontSize, translationFontSize, showWordByWord, arabicFontFamily, banglaFontFamily } = useSettingsStore();
    const { openTafsir, currentSurahMeta, audioState, setAudioState } = useQuranStore();
    const { addBookmark, removeBookmark, isBookmarked, setLastRead } = useBookmarkStore();
    const [copied, setCopied] = React.useState(false);

    const { sura, ayah, arabicText, translationText, words } = ayahData;
    const bookmarked = isBookmarked(sura, ayah);
    const isPlayingCurrent = audioState.isPlaying && audioState.sura === sura && audioState.currentAyah === ayah;

    const handleCopy = () => {
        const textToCopy = `${arabicText}\n${translationText} (Surah ${currentSurahMeta?.en || sura} ${sura}:${ayah})`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBookmarkToggle = () => {
        if (bookmarked) {
            removeBookmark(sura, ayah);
        } else {
            addBookmark(sura, ayah, currentSurahMeta?.en || `Surah ${sura}`);
        }
    };

    const handlePlayAudio = () => {
        setLastRead(sura, ayah, currentSurahMeta?.en || `Surah ${sura}`);
        if (isPlayingCurrent) {
            setAudioState({ isPlaying: false });
        } else {
            setAudioState({ isPlaying: true, sura, currentAyah: ayah });
        }
    };

    return (
        <div 
            id={`ayah-${sura}-${ayah}`}
            className={`p-6 mb-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md border transition-all ${
                isPlayingCurrent 
                    ? 'border-emerald-500 ring-2 ring-emerald-400/30 dark:border-emerald-500' 
                    : 'border-emerald-100 dark:border-gray-700/70 hover:border-emerald-300'
            }`}
        >
            {/* Header bar of the Ayah Card */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-gray-700">
                {/* Ayah Badge */}
                <div className="flex items-center space-x-2">
                    <span className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center justify-center border border-emerald-300 dark:border-emerald-700">
                        {sura}:{ayah}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Ayah {ayah}
                    </span>
                </div>

                {/* Ayah Action Buttons */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                        onClick={handlePlayAudio}
                        title={isPlayingCurrent ? "Pause Recitation" : "Play Recitation"}
                        className={`p-2 rounded-lg transition-colors ${
                            isPlayingCurrent 
                                ? 'bg-emerald-600 text-white' 
                                : 'bg-emerald-50 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                        }`}
                    >
                        {isPlayingCurrent ? <FaPause className="w-3.5 h-3.5" /> : <FaPlay className="w-3.5 h-3.5" />}
                    </button>

                    <button
                        onClick={handleBookmarkToggle}
                        title={bookmarked ? "Remove Bookmark" : "Bookmark Ayah"}
                        className="p-2 rounded-lg bg-emerald-50 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                    >
                        {bookmarked ? <FaBookmark className="w-3.5 h-3.5 text-amber-500" /> : <FaRegBookmark className="w-3.5 h-3.5" />}
                    </button>

                    <button
                        onClick={() => openTafsir(sura, ayah)}
                        title="Read Tafsir"
                        className="p-2 rounded-lg bg-emerald-50 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                    >
                        <FaBookOpen className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={handleCopy}
                        title="Copy Ayah & Translation"
                        className="p-2 rounded-lg bg-emerald-50 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                    >
                        {copied ? <FaCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FaCopy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            </div>

            {/* Main Arabic Verses Text */}
            <div 
                className="text-right leading-loose text-emerald-950 dark:text-emerald-100 mb-4 dir-rtl"
                style={{ fontSize: `${arabicFontSize}px`, fontFamily: arabicFontFamily, lineHeight: 2.2 }}
            >
                {arabicText}
            </div>

            {/* Optional Word-by-Word View */}
            {showWordByWord && words && words.length > 0 && (
                <WordByWordView words={words} sura={sura} ayah={ayah} />
            )}

            {/* Translation Text */}
            <div 
                className="text-gray-800 dark:text-gray-200 leading-relaxed pt-2 border-t border-dashed border-emerald-100 dark:border-gray-700"
                style={{ fontSize: `${translationFontSize}px`, fontFamily: banglaFontFamily }}
            >
                {translationText}
            </div>
        </div>
    );
}
