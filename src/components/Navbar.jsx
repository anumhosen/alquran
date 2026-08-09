import { useNavigate } from 'react-router-dom';
import { useQuranStore } from '../store/useQuranStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useSidebarStore } from '../store/useSidebarStore';
import { tauriAPI } from '../utils/tauriAPI';
import { 
    FaSearch, FaBars, FaCog, FaMoon, FaSun 
} from 'react-icons/fa';
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';

export default function Navbar() {
    const navigate = useNavigate();
    const { surahList, currentSurahId, setCurrentSurah } = useQuranStore();
    const { theme, setTheme } = useSettingsStore();
    const { toggleLeft, toggleRight } = useSidebarStore();

    const handleSelectSurah = (e) => {
        const id = parseInt(e.target.value, 10);
        if (id) {
            setCurrentSurah(id);
            navigate('/main');
        }
    };

    const handleThemeToggle = () => {
        if (theme === 'emerald') setTheme('dark');
        else if (theme === 'dark') setTheme('sepia');
        else setTheme('emerald');
    };

    return (
        <nav className="h-10 bg-emerald-800 text-white flex items-center justify-between px-4 select-none shadow-md z-30 flex-shrink-0" data-tauri-drag-region>
            {/* Left section: Drawer Toggle & App Title */}
            <div className="flex items-center space-x-1">
                <button 
                    onClick={toggleLeft}
                    title="Navigation Menu"
                    className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                    <FaBars className="w-5 h-5 text-emerald-100" />
                </button>

                <div 
                    onClick={() => navigate('/')} 
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow">
                        <img src='icon.png' alt='আল কুরআন'/>
                    </div>
                    <span className="font-bold text-xl tracking-wide hidden sm:inline">আল কুরআন</span>
                </div>
            </div>

            {/* Middle section: Quick Surah Selector */}
            <div className="flex items-center space-x-2 max-w-md w-full mx-4">
                <select
                    value={currentSurahId}
                    onChange={handleSelectSurah}
                    className="bg-emerald-900/80 border border-emerald-600 text-emerald-100 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full cursor-pointer"
                >
                    {surahList.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.id}. {s.en} ({s.bn}) - {s.ar}
                        </option>
                    ))}
                </select>

                <button 
                    onClick={() => navigate('/search')}
                    title="Search Quran"
                    className="p-2 hover:bg-emerald-700 rounded-lg transition-colors flex-shrink-0"
                >
                    <FaSearch className="w-4 h-4 text-emerald-200" />
                </button>
            </div>

            {/* Right section: Theme & Settings & Window Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                    onClick={handleThemeToggle}
                    title={`Theme: ${theme}`}
                    className="p-2 hover:bg-emerald-700 rounded-lg text-emerald-200 transition-colors"
                >
                    {theme === 'dark' ? <FaSun className="w-4 h-4 text-amber-300" /> : <FaMoon className="w-4 h-4" />}
                </button>

                <button
                    onClick={toggleRight}
                    title="Settings"
                    className="p-2 hover:bg-emerald-700 rounded-lg text-emerald-200 transition-colors"
                >
                    <FaCog className="w-4 h-4" />
                </button>

                {/* Tauri Window Controls */}
                <div className="flex items-center space-x-1 pl-2 -mr-2 border-l border-emerald-700">
                    <button onClick={() => tauriAPI.minimize()} className="p-1.5 hover:bg-emerald-700 text-emerald-200 rounded">
                        <VscChromeMinimize className="w-4 h-4" />
                    </button>
                    <button onClick={() => tauriAPI.maximize()} className="p-1.5 hover:bg-emerald-700 text-emerald-200 rounded">
                        <VscChromeMaximize className="w-4 h-4" />
                    </button>
                    <button onClick={() => tauriAPI.close()} className="p-1.5 hover:bg-red-600 text-white rounded">
                        <VscChromeClose className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
