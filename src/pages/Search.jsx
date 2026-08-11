import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/useSettingsStore';
import { useQuranStore } from '../store/useQuranStore';
import { tauriAPI } from '../utils/tauriAPI';
import { FaSearch, FaSpinner, FaArrowRight } from 'react-icons/fa';

export default function Search() {
    const navigate = useNavigate();
    const { translationDb } = useSettingsStore();
    const { setCurrentSurah, surahList } = useQuranStore();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e?.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        setSearched(true);
        try {
            // Escaped query for SQLite LIKE
            const clean = query.trim().replace(/'/g, "''");
            const rows = await tauriAPI.DBOperation(
                `SELECT sura, ayah, text FROM verses WHERE text LIKE '%${clean}%' LIMIT 100`,
                translationDb
            );
            setResults(rows);
        } catch (err) {
            console.error('Search query error:', err);
            setResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleJumpToAyah = async (suraId, ayahId) => {
        await setCurrentSurah(suraId);
        navigate('/');
        setTimeout(() => {
            const el = document.getElementById(`ayah-${suraId}-${ayahId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='max-w-5xl py-2 md:py-6 px-2 md:px-6 space-y-6 mx-auto'>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center space-x-2">
                        <FaSearch className="w-5 h-5 text-emerald-600" />
                        <span>Search Al Quran</span>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Search keywords across the active translation database ({translationDb}).
                    </p>

                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter word or phrase in Bengali or English..."
                            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
                        />
                        <button
                            type="submit"
                            disabled={searching}
                            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium flex items-center space-x-2 shadow transition-colors disabled:opacity-50"
                        >
                            {searching ? <FaSpinner className="animate-spin w-4 h-4" /> : <FaSearch className="w-4 h-4" />}
                            <span>Search</span>
                        </button>
                    </form>
                </div>

                {/* Results section */}
                {searching ? (
                    <div className="text-center py-12 text-emerald-600">
                        <FaSpinner className="w-8 h-8 animate-spin mx-auto mb-2" />
                        <span>Searching Quran verses...</span>
                    </div>
                ) : searched ? (
                    <div className="space-y-4">
                        <div className="text-sm text-gray-500 font-medium">
                            Found {results.length} result(s) for "{query}"
                        </div>

                        {results.length > 0 ? (
                            results.map((r, idx) => {
                                const meta = surahList.find((s) => s.id === r.sura);
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleJumpToAyah(r.sura, r.ayah)}
                                        className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-emerald-100 dark:border-gray-700/60 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-sm text-emerald-800 dark:text-emerald-400">
                                                {meta?.en || `Surah ${r.sura}`} ({r.sura}:{r.ayah})
                                            </span>
                                            <span className="text-xs text-emerald-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                                                <span>Read Ayah</span>
                                                <FaArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                            {r.text}
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12 text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                                No verses found matching your query.
                            </div>
                        )}
                    </div>
                ) : null}
            </div></div>
    );
}
