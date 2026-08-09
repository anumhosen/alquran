import { useState } from 'react';
import { useQuranStore } from '../store/useQuranStore';
import { FaSearch, FaTimes, FaList } from 'react-icons/fa';

export default function SurahIndexPanel({ isOpen, onClose }) {
    const { surahList, currentSurahId, setCurrentSurah } = useQuranStore();
    const [filter, setFilter] = useState('');

    if (!isOpen) return null;

    const filtered = surahList.filter((s) =>
        s.en.toLowerCase().includes(filter.toLowerCase()) ||
        s.bn.includes(filter) ||
        s.id.toString() === filter.trim()
    );

    const handleSelect = (id) => {
        setCurrentSurah(id);
    };

    return (
        <aside className="w-80 bg-white dark:bg-gray-900 border border-emerald-100 dark:border-gray-800 shadow-md rounded-2xl flex flex-col h-[calc(100vh-88px)] sticky overflow-hidden flex-shrink-0 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-3.5 bg-emerald-800 text-white flex items-center justify-between">
                <div className="flex items-center p-1 space-x-2">
                    <FaList className="w-4 h-4 text-emerald-200" />
                </div>
                <h3 className="font-bold text-base">Surah Index (১১৪ সূরা)</h3>
                <button onClick={onClose} className="p-1 hover:bg-emerald-700 rounded text-emerald-200">
                    <FaTimes className="w-4 h-4" />
                </button>
            </div>

            {/* Filter Search */}
            <div className="p-2.5 border-b border-gray-100 dark:border-gray-800">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-2.5 text-gray-400 w-3.5 h-3.5" />
                    <input
                        type="text"
                        placeholder="Search Surah name or number..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            {/* Surah Items List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filtered.map((s) => (
                    <div
                        key={s.id}
                        onClick={() => handleSelect(s.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${s.id === currentSurahId
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-800 dark:text-gray-200'
                            }`}
                    >
                        <div className="flex items-center space-x-2.5">
                            <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-gray-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                                {s.id}
                            </span>
                            <div>
                                <div className="text-xs font-bold">{s.en}</div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400">{s.bn} • {s.verse_count} Ayahs</div>
                            </div>
                        </div>

                        <span className="font-serif text-base text-emerald-800 dark:text-emerald-400">
                            {s.ar}
                        </span>
                    </div>
                ))}
            </div>
        </aside>
    );
}
