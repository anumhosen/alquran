import { useNavigate } from 'react-router-dom';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { useQuranStore } from '../store/useQuranStore';
import { FaBookmark, FaHistory, FaTrash, FaArrowRight } from 'react-icons/fa';

export default function Bookmarks() {
    const navigate = useNavigate();
    const { bookmarks, lastRead, removeBookmark } = useBookmarkStore();
    const { setCurrentSurah } = useQuranStore();

    const handleJump = async (suraId, ayahId) => {
        await setCurrentSurah(suraId);
        navigate('/');
        setTimeout(() => {
            const el = document.getElementById(`ayah-${suraId}-${ayahId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

    return (
        <div className="w-full overflow-y-auto">
            <div className='max-w-5xl mx-auto py-2 md:py-6 px-2 md:px-6 space-y-6'>
                {/* Last Read Box */}
                {lastRead && (
                    <div className="bg-linear-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
                                <FaHistory className="w-3.5 h-3.5" />
                                <span>Continue Reading (Last Read)</span>
                            </div>
                            <h3 className="text-2xl font-bold">
                                {lastRead.suraName || `Surah ${lastRead.sura}`}
                            </h3>
                            <p className="text-sm text-emerald-200 mt-1">
                                Surah {lastRead.sura}, Ayah {lastRead.ayah}
                            </p>
                        </div>

                        <button
                            onClick={() => handleJump(lastRead.sura, lastRead.ayah)}
                            className="px-5 py-2.5 bg-white text-emerald-900 font-bold rounded-xl shadow hover:bg-emerald-50 transition-colors flex items-center space-x-2 text-sm"
                        >
                            <span>Resume</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}

                {/* Bookmarks Section */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-emerald-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-4 flex items-center space-x-2">
                        <FaBookmark className="w-5 h-5 text-amber-500" />
                        <span>Saved Bookmarks ({bookmarks.length})</span>
                    </h3>

                    {bookmarks.length > 0 ? (
                        <div className="space-y-3">
                            {bookmarks.map((b) => (
                                <div
                                    key={`${b.sura}-${b.ayah}`}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 hover:border-emerald-400 transition-all"
                                >
                                    <div
                                        onClick={() => handleJump(b.sura, b.ayah)}
                                        className="flex-1 cursor-pointer"
                                    >
                                        <div className="font-bold text-gray-800 dark:text-gray-200">
                                            {b.suraName || `Surah ${b.sura}`}
                                        </div>
                                        <div className="text-xs text-emerald-700 dark:text-emerald-400">
                                            Ayah {b.sura}:{b.ayah}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleJump(b.sura, b.ayah)}
                                            className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-lg hover:bg-emerald-200"
                                        >
                                            Go to Ayah
                                        </button>
                                        <button
                                            onClick={() => removeBookmark(b.sura, b.ayah)}
                                            title="Remove bookmark"
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                        >
                                            <FaTrash className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No saved bookmarks yet. Click the bookmark icon on any Ayah to save it here.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
