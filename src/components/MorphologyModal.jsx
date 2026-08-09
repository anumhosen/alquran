import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuranStore } from '../store/useQuranStore';
import { FaTimes, FaBrain, FaBook } from 'react-icons/fa';

export default function MorphologyModal() {
    const navigate = useNavigate();
    const { activeMorphology, morphologyData, morphologyLoading, closeMorphology } = useQuranStore();

    if (!activeMorphology) return null;

    const { sura, ayah, word } = activeMorphology;

    const handleLookupDictionary = () => {
        const root = morphologyData?.root_ar || morphologyData?.lemma || '';
        closeMorphology();
        if (root) {
            navigate(`/dictionary?q=${encodeURIComponent(root)}`);
        } else {
            navigate('/dictionary');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-emerald-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FaBrain className="w-5 h-5 text-emerald-200" />
                        <h3 className="text-lg font-bold">
                            Word Grammar & Root (Surah {sura}:{ayah}, Word {word})
                        </h3>
                    </div>
                    <button onClick={closeMorphology} className="p-1.5 hover:bg-emerald-700 rounded-lg text-emerald-200">
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {morphologyLoading ? (
                        <div className="flex flex-col items-center justify-center py-8 text-emerald-600">
                            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <span>Fetching grammar breakdown...</span>
                        </div>
                    ) : morphologyData ? (
                        <div className="space-y-4">
                            {/* Word Root Box */}
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
                                <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Arabic Root (جذر):</span>
                                <span className="text-2xl font-serif font-bold text-emerald-700 dark:text-emerald-400">
                                    {morphologyData.root_ar || '—'}
                                </span>
                            </div>

                            {/* Lemma Box */}
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
                                <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Lemma Form (المفرد):</span>
                                <span className="text-xl font-serif text-emerald-800 dark:text-emerald-300">
                                    {morphologyData.lemma || '—'}
                                </span>
                            </div>

                            {/* Details table */}
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 space-y-2 border border-gray-200 dark:border-gray-700 text-sm">
                                <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                                    <span className="text-gray-500">Part of Speech:</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{morphologyData.pos1 || '—'}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                                    <span className="text-gray-500">Verb Type:</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{morphologyData.verb_type || '—'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Verb Form:</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{morphologyData.verf_form || '—'}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No morphology data available for this word in corpus database.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <button
                        onClick={handleLookupDictionary}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg font-medium flex items-center space-x-1.5 shadow"
                    >
                        <FaBook className="w-3.5 h-3.5" />
                        <span>Lookup in Dictionary</span>
                    </button>

                    <button
                        onClick={closeMorphology}
                        className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
