import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuranStore } from '../store/useQuranStore';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { FaSearch, FaHistory, FaArrowRight, FaBookOpen } from 'react-icons/fa';

export default function Home() {
    const navigate = useNavigate();
    const { surahList, setCurrentSurah } = useQuranStore();
    const { lastRead } = useBookmarkStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'makki', 'madani'

    const handleSelectSurah = async (surahId) => {
        await setCurrentSurah(surahId);
        navigate('/main');
    };

    const filteredSurahs = surahList.filter((s) => {
        const matchesQuery =
            s.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.bn.includes(searchQuery) ||
            s.ar.includes(searchQuery) ||
            s.id.toString() === searchQuery.trim();

        if (!matchesQuery) return false;
        if (filterType === 'makki') return s.is_makki === 1;
        if (filterType === 'madani') return s.is_makki === 0;
        return true;
    });

    return (
        <div className="w-full h-full overflow-y-auto">
            <div className='max-w-5xl py-6 px-6 space-y-6 mx-auto'>
                {/* Last Read Quick Resume Banner */}
                {lastRead && (
                    <div
                        onClick={() => handleSelectSurah(lastRead.sura)}
                        className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between cursor-pointer hover:shadow-xl transition-all border border-emerald-700/50 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-emerald-200">
                                <FaHistory className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                                    Last Read Position
                                </div>
                                <div className="text-xl font-bold text-emerald-100">
                                    {lastRead.suraName || `Surah ${lastRead.sura}`}
                                </div>
                                <div className="text-xs text-emerald-300/80">
                                    Ayah {lastRead.sura}:{lastRead.ayah}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm font-semibold bg-emerald-700/60 px-4 py-2 rounded-xl group-hover:bg-emerald-600 transition-colors">
                            <span>Continue</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                )}

                {/* Header & Filter Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-emerald-100 dark:border-gray-800 shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
                            <FaBookOpen className="w-6 h-6 text-emerald-600" />
                            <span>All Surahs (১১৪ সূরা)</span>
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Select a Surah to start reading with translation, tafsir, and word-by-word analysis.
                        </p>
                    </div>

                    {/* Filter Tabs & Search */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative flex-1 min-w-[200px]">
                            <FaSearch className="absolute left-3 top-3 text-gray-400 w-3.5 h-3.5" />
                            <input
                                type="text"
                                placeholder="Search Surah..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs font-medium">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'all' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                All ({surahList.length})
                            </button>
                            <button
                                onClick={() => setFilterType('makki')}
                                className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'makki' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                Makki (মক্কী)
                            </button>
                            <button
                                onClick={() => setFilterType('madani')}
                                className={`px-3 py-1.5 rounded-lg transition-colors ${filterType === 'madani' ? 'bg-emerald-700 text-white font-bold' : 'text-gray-600 dark:text-gray-400'}`}
                            >
                                Madani (মাদানী)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Surah Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSurahs.map((s) => (
                        <div
                            key={s.id}
                            onClick={() => handleSelectSurah(s.id)}
                            className="group relative p-4 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-100 dark:border-gray-800 shadow-xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-3.5">
                                {/* Surah Number Diamond/Badge */}
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-md flex items-center justify-center border border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors -rotate-45">
                                    <div className='rotate-45'>
                                        {s.id}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                        {s.en}
                                    </h3>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {s.bn} • <span className="text-emerald-700 dark:text-emerald-400">{s.verse_count} Ayahs</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-serif text-xl font-bold text-emerald-800 dark:text-emerald-300">
                                    {s.ar}
                                </div>
                                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium border border-gray-200 dark:border-gray-700">
                                    {s.is_makki ? 'Makki' : 'Madani'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div></div>
        </div>
    );
}
