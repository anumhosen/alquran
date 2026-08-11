import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tauriAPI } from '../utils/tauriAPI';
import { useQuranStore } from '../store/useQuranStore';
import { FaLayerGroup, FaSpinner, FaBookOpen } from 'react-icons/fa';

export default function TopicsPage() {
    const navigate = useNavigate();
    const { setCurrentSurah } = useQuranStore();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const rows = await tauriAPI.DBOperation(
                    `SELECT id, name, tags, is_featured, parent_topic, verses FROM topic ORDER BY id ASC LIMIT 100`,
                    'qurantopics.db'
                );
                setTopics(rows);
            } catch (err) {
                console.error('Failed to load topics:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTopics();
    }, []);

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
            <div className='max-w-5xl mx-auto space-y-6 py-2 md:py-6 px-2 md:px-6'>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center space-x-2">
                        <FaLayerGroup className="w-5 h-5 text-emerald-600" />
                        <span>Subjectwise Quran Topics</span>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Explore Quran verses organized by themes, concepts, and Islamic topics.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-emerald-600">
                        <FaSpinner className="w-8 h-8 animate-spin mb-2" />
                        <span>Loading Quran topics...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {topics.map((t) => (
                            <div
                                key={t.id}
                                onClick={() => setSelectedTopic(selectedTopic?.id === t.id ? null : t)}
                                className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-emerald-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer"
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                                        {t.id}
                                    </span>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200">
                                        {t.name}
                                    </h3>
                                </div>

                                {t.tags && (
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-3">
                                        Tags: {t.tags}
                                    </p>
                                )}

                                {selectedTopic?.id === t.id && t.verses && (
                                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
                                        <div className="text-xs font-semibold text-gray-500">Related Verses:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {t.verses.split(',').map((v, i) => {
                                                const parts = v.trim().split(':');
                                                if (parts.length < 2) return null;
                                                const [s, a] = parts.map(Number);
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleJumpToAyah(s, a);
                                                        }}
                                                        className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded-lg hover:bg-emerald-200 border border-emerald-200 dark:border-emerald-800"
                                                    >
                                                        {s}:{a}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
