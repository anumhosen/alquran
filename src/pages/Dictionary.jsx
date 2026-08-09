import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { tauriAPI } from '../utils/tauriAPI';
import { useQuranStore } from '../store/useQuranStore';
import ArabicKeyboard from '../components/ArabicKeyboard';
import { FaBook, FaKeyboard, FaSearch, FaSpinner, FaArrowRight } from 'react-icons/fa';

export default function Dictionary() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setCurrentSurah, surahList } = useQuranStore();

    const [query, setQuery] = useState(searchParams.get('q') || 'رحم');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [verbs, setVerbs] = useState([]);
    const [wordMatches, setWordMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (query) handleSearch();
    }, []);

    const handleSearch = async (searchWord = query) => {
        const term = searchWord.trim();
        if (!term) return;
        setLoading(true);
        setSearched(true);
        try {
            const clean = term.replace(/'/g, "''");

            // 1. Query root verb forms from corpus.db
            const verbRows = await tauriAPI.DBOperation(
                `SELECT root, verb_type, perfect, imperfect, imperative, active_participle, passive_participle, verbal_noun 
                 FROM verbs_with_six_forms WHERE root LIKE '%${clean}%' LIMIT 20`,
                'corpus.db'
            );
            setVerbs(verbRows);

            // 2. Query matching words from words.db
            const wordRows = await tauriAPI.DBOperation(
                `SELECT sura, ayah, word, bn, en, [in] as indo FROM allwords 
                 WHERE bn LIKE '%${clean}%' OR en LIKE '%${clean}%' OR sura = '${clean}' LIMIT 40`,
                'words.db'
            );
            setWordMatches(wordRows);
        } catch (err) {
            console.error('Dictionary search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyInput = (char) => setQuery((prev) => prev + char);
    const handleKeyDelete = () => setQuery((prev) => prev.slice(0, -1));
    const handleKeyClear = () => setQuery('');

    const handleJumpToAyah = async (suraId, ayahId) => {
        await setCurrentSurah(suraId);
        navigate('/main');
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='max-w-5xl mx-auto space-y-6 py-6'>
                {/* Header & Search Bar */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
                            <FaBook className="w-6 h-6 text-emerald-600" />
                            <span>Quran Dictionary (قاموس القرآن)</span>
                        </h2>
                        <button
                            onClick={() => setShowKeyboard(!showKeyboard)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${showKeyboard
                                ? 'bg-emerald-700 text-white'
                                : 'bg-emerald-100 dark:bg-gray-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200'
                                }`}
                        >
                            <FaKeyboard className="w-4 h-4" />
                            <span>{showKeyboard ? 'Hide Keyboard' : 'Arabic Keyboard'}</span>
                        </button>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Type Arabic root (e.g. رحم, كتب) or English/Bengali word..."
                            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-lg font-serif dir-rtl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium flex items-center space-x-2 shadow transition-colors"
                        >
                            {loading ? <FaSpinner className="animate-spin w-4 h-4" /> : <FaSearch className="w-4 h-4" />}
                            <span>Lookup</span>
                        </button>
                    </form>

                    {/* Show/Hideable On-screen Arabic Virtual Keyboard */}
                    {showKeyboard && (
                        <ArabicKeyboard
                            onInput={handleKeyInput}
                            onDelete={handleKeyDelete}
                            onClear={handleKeyClear}
                            onClose={() => setShowKeyboard(false)}
                        />
                    )}
                </div>

                {/* Results Section */}
                {loading ? (
                    <div className="text-center py-12 text-emerald-600">
                        <FaSpinner className="w-8 h-8 animate-spin mx-auto mb-2" />
                        <span>Searching dictionary...</span>
                    </div>
                ) : searched ? (
                    <div className="space-y-6">
                        {/* Root Verbs Section */}
                        {verbs.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-300 border-b border-emerald-200 dark:border-gray-800 pb-2">
                                    Root Verbs Breakdown ({verbs.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {verbs.map((v, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-100 dark:border-gray-800 shadow-sm space-y-2">
                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                                                <span className="text-xs text-emerald-600 font-bold uppercase">Root:</span>
                                                <span className="text-2xl font-serif font-bold text-emerald-800 dark:text-emerald-300">{v.root}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs font-serif pt-1">
                                                <div><span className="text-gray-400 font-sans">Perfect (الماضي):</span> <span className="font-bold text-base text-gray-800 dark:text-gray-200">{v.perfect || '—'}</span></div>
                                                <div><span className="text-gray-400 font-sans">Imperfect (المضارع):</span> <span className="font-bold text-base text-gray-800 dark:text-gray-200">{v.imperfect || '—'}</span></div>
                                                <div><span className="text-gray-400 font-sans">Imperative (الأمر):</span> <span className="font-bold text-base text-gray-800 dark:text-gray-200">{v.imperative || '—'}</span></div>
                                                <div><span className="text-gray-400 font-sans">Active Part.:</span> <span className="font-bold text-base text-gray-800 dark:text-gray-200">{v.active_participle || '—'}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Word Matches List */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-300 border-b border-emerald-200 dark:border-gray-800 pb-2">
                                Quranic Word Occurrences ({wordMatches.length})
                            </h3>
                            {wordMatches.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {wordMatches.map((w, idx) => {
                                        const meta = surahList.find((s) => s.id === w.sura);
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => handleJumpToAyah(w.sura, w.ayah)}
                                                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-emerald-100 dark:border-gray-800 hover:border-emerald-400 transition-all cursor-pointer flex justify-between items-center group"
                                            >
                                                <div>
                                                    <div className="font-bold text-sm text-emerald-800 dark:text-emerald-400">
                                                        {meta?.en || `Surah ${w.sura}`} ({w.sura}:{w.ayah})
                                                    </div>
                                                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">
                                                        BN: {w.bn || '—'}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        EN: {w.en || '—'}
                                                    </div>
                                                </div>
                                                <FaArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 bg-white dark:bg-gray-900 rounded-2xl">
                                    No word occurrences found for "{query}".
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
