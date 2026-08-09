import React from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useQuranStore } from '../store/useQuranStore';

export default function WordByWordView({ words, sura, ayah }) {
    const { wbwLanguage, arabicFontSize, arabicFontFamily, banglaFontFamily } = useSettingsStore();
    const { activeWordTiming, openMorphology } = useQuranStore();

    if (!words || words.length === 0) return null;

    return (
        <div className="dir-rtl flex flex-wrap justify-start items-start gap-x-4 gap-y-6 my-6 p-4 bg-emerald-50/20 dark:bg-gray-800/30 rounded-2xl border border-emerald-100/60 dark:border-gray-800">
            {words.map((w, idx) => {
                const translation = wbwLanguage === 'en' ? w.en : (wbwLanguage === 'in' ? w.indo : w.bn);
                const arabicWord = w.arabic || w.ar1 || w.text || '';
                const isHighlighted = activeWordTiming &&
                    activeWordTiming.sura === sura &&
                    activeWordTiming.ayah === ayah &&
                    activeWordTiming.word === w.word;

                return (
                    <div
                        key={idx}
                        onClick={() => openMorphology(sura, ayah, w.word)}
                        className={`group flex flex-col items-center justify-start border-b border-gray-300 dark:border-gray-600 text-center cursor-pointer px-2 py-1 hover:scale-105 ${
                            isHighlighted && 'bg-emerald-200 dark:bg-gray-600'}`}
                        title="Click to view word grammar & morphology"
                    >
                        {/* Concatenated Arabic Word */}
                        <span 
                            className='text-emerald-950 dark:text-emerald-200 font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 py-1'
                            style={{ fontSize: `${Math.max(24, arabicFontSize - 2)}px`, fontFamily: arabicFontFamily }}
                        >
                            {arabicWord}
                        </span>

                        {/* Word Translation */}
                        <span 
                            className="text-xs sm:text-sm leading-tight text-center text-gray-800 dark:text-gray-300 font-normal"
                            style={{ fontFamily: wbwLanguage === 'bn' ? banglaFontFamily : 'inherit' }}
                        >
                            {translation || '—'}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
