import React from 'react';
import { useQuranStore } from '../store/useQuranStore';

export default function SurahHeader() {
    const { currentSurahMeta } = useQuranStore();

    if (!currentSurahMeta) return null;

    const showBismillah = currentSurahMeta.id !== 9 && currentSurahMeta.id !== 1;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 mb-6 shadow-xl border border-emerald-700/50">
            {/* Background Arabic watermark pattern */}
            <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl font-serif pointer-events-none select-none">
                {currentSurahMeta.ar}
            </div>

            <div className="relative z-10 text-center">
                <div className="flex justify-center items-center space-x-3 mb-2">
                    <span className="bg-emerald-700/60 text-emerald-200 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/30">
                        Surah {currentSurahMeta.id}
                    </span>
                    <span className="bg-emerald-700/60 text-emerald-200 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/30">
                        {currentSurahMeta.is_makki ? 'Makki (মক্কী)' : 'Madani (মাদানী)'}
                    </span>
                    <span className="bg-emerald-700/60 text-emerald-200 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/30">
                        {currentSurahMeta.verse_count} Ayahs
                    </span>
                </div>

                <h1 className="text-4xl font-bold font-serif text-emerald-100 mb-1">
                    {currentSurahMeta.ar}
                </h1>
                <h2 className="text-xl font-semibold text-emerald-200 tracking-wide">
                    {currentSurahMeta.en} • <span className="font-normal text-emerald-300">{currentSurahMeta.bn}</span>
                </h2>
                <p className="text-sm text-emerald-300/80 italic mt-1">
                    "{currentSurahMeta.m_en}" ({currentSurahMeta.m_bn})
                </p>

                {showBismillah && (
                    <div className="mt-5 pt-4 border-t border-emerald-700/50 flex justify-center">
                        <div className="font-serif text-3xl text-amber-200 tracking-widest leading-loose">
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
