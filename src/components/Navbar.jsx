import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../store/useSidebarStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { tauriAPI } from '../utils/tauriAPI';
import { FaBars, FaMoon, FaSun, FaCog } from 'react-icons/fa';
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc';

export default function Navbar() {
    const navigate = useNavigate();
    const { toggleLeft, toggleRight } = useSidebarStore();
    const { theme, setTheme } = useSettingsStore();
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const unlisten = tauriAPI.onMaximizeChange((maximized) => {
            setIsMaximized(maximized);
        });
        return () => unlisten();
    }, []);

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
                    <span className="font-bold text-xl tracking-wide hidden md:inline">আল কুরআন</span>
                </div>
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
                    <button onClick={() => tauriAPI.minimize()} title="Minimize" className="p-1.5 hover:bg-emerald-700 text-emerald-200 rounded">
                        <VscChromeMinimize className="w-4 h-4" />
                    </button>
                    <button onClick={() => tauriAPI.maximize()} title={isMaximized ? "Restore" : "Maximize"} className="p-1.5 hover:bg-emerald-700 text-emerald-200 rounded">
                        {isMaximized ? <VscChromeRestore className="w-4 h-4" /> : <VscChromeMaximize className="w-4 h-4" />}
                    </button>
                    <button onClick={() => tauriAPI.close()} title="Close" className="p-1.5 hover:bg-red-600 text-white rounded">
                        <VscChromeClose className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
