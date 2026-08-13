import React, { useEffect, useRef, useState } from 'react';
import { convertFileSrc } from '@tauri-apps/api/core';
import { useQuranStore } from '../store/useQuranStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaHdd, FaGlobe } from 'react-icons/fa';

export default function AudioPlayerBar() {
    const { audioState, setAudioState, currentSurahMeta, updateActiveWordHighlight, timingsByAyah } = useQuranStore();
    const { reciter, audioFolderPath, audioSourceMode } = useSettingsStore();
    const audioRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [useFallbackOnline, setUseFallbackOnline] = useState(false);

    const { isPlaying, sura, currentAyah } = audioState;
    const padNumber = (num) => String(num).padStart(3, '0');

    const getAudioUrl = (s, a) => {
        if (!useFallbackOnline && audioSourceMode === 'local' && audioFolderPath) {
            const cleanPath = audioFolderPath.replace(/\\/g, '/');
            const fullPath = `${cleanPath}/${padNumber(s)}.mp3`;
            try {
                return convertFileSrc(fullPath);
            } catch (e) {
                console.warn('convertFileSrc error:', e);
            }
        }
        return `https://everyayah.com/data/Alafasy_128kbps/${padNumber(s)}${padNumber(a)}.mp3`;
    };

    useEffect(() => {
        setUseFallbackOnline(false);
    }, [sura, currentAyah, audioSourceMode, audioFolderPath]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            const isLocalFull = audioSourceMode === 'local' && !useFallbackOnline;
            if (isLocalFull && timingsByAyah && timingsByAyah[currentAyah]) {
                const ayahStartSec = timingsByAyah[currentAyah].ayahTimeMs / 1000;
                const curSec = audioRef.current.currentTime;
                if (Math.abs(curSec - ayahStartSec) > 3.0) {
                    audioRef.current.currentTime = ayahStartSec;
                }
            }
            audioRef.current.play().catch((err) => {
                console.warn('Audio playback error, falling back to online CDN:', err);
                if (!useFallbackOnline) setUseFallbackOnline(true);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, sura, currentAyah, useFallbackOnline]);

    const handleTimeUpdate = () => {
        if (audioRef.current && isPlaying) {
            const isSingleAyahAudio = useFallbackOnline || audioSourceMode === 'online';
            updateActiveWordHighlight(sura, audioRef.current.currentTime, isSingleAyahAudio);
        }
    };

    const handleAudioError = () => {
        if (!useFallbackOnline && audioSourceMode === 'local') {
            console.warn('Local audio file missing, switching to online CDN stream');
            setUseFallbackOnline(true);
        } else {
            setAudioState({ isPlaying: false });
        }
    };

    const handleEnded = () => {
        if (currentSurahMeta && currentAyah < currentSurahMeta.verse_count) {
            const nextAyah = currentAyah + 1;
            setAudioState({ currentAyah: nextAyah, isPlaying: true });
        } else {
            setAudioState({ isPlaying: false });
        }
    };

    const handleNext = () => {
        if (currentSurahMeta && currentAyah < currentSurahMeta.verse_count) {
            const nextAyah = currentAyah + 1;
            const timing = timingsByAyah[nextAyah];
            if (audioRef.current && timing && (audioSourceMode === 'local' && !useFallbackOnline)) {
                audioRef.current.currentTime = timing.ayahTimeMs / 1000;
            }
            setAudioState({ currentAyah: nextAyah, isPlaying: true });
        }
    };

    const handlePrev = () => {
        if (currentAyah > 1) {
            const prevAyah = currentAyah - 1;
            const timing = timingsByAyah[prevAyah];
            if (audioRef.current && timing && (audioSourceMode === 'local' && !useFallbackOnline)) {
                audioRef.current.currentTime = timing.ayahTimeMs / 1000;
            }
            setAudioState({ currentAyah: prevAyah, isPlaying: true });
        }
    };

    if (!sura || !currentAyah || !isPlaying) return null;

    const isLocalActive = audioSourceMode === 'local' && !useFallbackOnline;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/95 text-white backdrop-blur-md border-t border-emerald-700/60 shadow-2xl px-4 py-1 flex items-center justify-between">
            <audio
                ref={audioRef}
                src={getAudioUrl(sura, currentAyah)}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onError={handleAudioError}
                muted={muted}
            />

            {/* Now Playing Info */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-emerald-100 border border-emerald-500 shadow">
                    {sura}:{currentAyah}
                </div>
                <div className="hidden sm:block">
                    <div className="text-sm font-bold text-emerald-100 flex items-center space-x-1.5">
                        <span>{currentSurahMeta?.en || `Surah ${sura}`} ({sura}:{currentAyah})</span>
                    </div>
                    <div className="text-xs text-emerald-300 flex items-center space-x-1">
                        {isLocalActive ? <FaHdd className="w-3 h-3 text-emerald-400" /> : <FaGlobe className="w-3 h-3 text-cyan-300" />}
                        <span>{isLocalActive ? 'Local Surah File (Asset Protocol)' : 'Online Ayah CDN (EveryAyah)'} • Sync Active</span>
                    </div>
                </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={handlePrev}
                    disabled={currentAyah <= 1}
                    className="p-2 hover:bg-emerald-800 rounded-full text-emerald-200 disabled:opacity-40 transition-colors"
                >
                    <FaStepBackward className="w-4 h-4" />
                </button>

                <button
                    onClick={() => setAudioState({ isPlaying: !isPlaying })}
                    className="p-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-full shadow-lg transition-transform active:scale-95"
                >
                    {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4 pl-0.5" />}
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentSurahMeta && currentAyah >= currentSurahMeta.verse_count}
                    className="p-2 hover:bg-emerald-800 rounded-full text-emerald-200 disabled:opacity-40 transition-colors"
                >
                    <FaStepForward className="w-4 h-4" />
                </button>
            </div>

            {/* Mute button */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setMuted(!muted)}
                    className="p-2 hover:bg-emerald-800 rounded-lg text-emerald-200"
                >
                    {muted ? <FaVolumeMute className="w-4 h-4 text-red-400" /> : <FaVolumeUp className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
