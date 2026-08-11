import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarStore } from '../store/useSidebarStore';
import {
    FaTimes, FaHome, FaBookOpen, FaSearch, FaBookmark,
    FaLayerGroup, FaBook, FaCog, FaInfoCircle
} from 'react-icons/fa';

export default function SidebarLeft() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLeftOpen, closeLeft } = useSidebarStore();

    if (!isLeftOpen) return null;

    const navItems = [
        { path: '/', label: 'Home (১১৪ সূরা)', icon: FaHome },
        { path: '/main', label: 'Quran Reader (পড়া)', icon: FaBookOpen },
        { path: '/search', label: 'Quran Search (অনুসন্ধান)', icon: FaSearch },
        { path: '/bookmarks', label: 'Bookmarks (সংরক্ষিত)', icon: FaBookmark },
        { path: '/topics', label: 'Subject Topics (বিষয়ভিত্তিক)', icon: FaLayerGroup },
        { path: '/dictionary', label: 'Dictionary (অভিধান)', icon: FaBook },
        { path: '/settings', label: 'Settings (সেটিংস)', icon: FaCog },
        { path: '/about', label: 'About App (সম্পর্কে)', icon: FaInfoCircle },
    ];

    const handleNavigate = (path) => {
        navigate(path);
        closeLeft();
    };

    return (
        <aside className="fixed inset-y-0 left-0 z-10 w-80 bg-white dark:bg-gray-900 shadow-2xl flex flex-col mt-10 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs">
                        <img src='icon.png' alt='আল কুরআন' />
                    </div>
                </div>
                <h3 className="font-bold text-lg">App Navigation</h3>
                <button onClick={closeLeft} className="p-1 hover:bg-emerald-700 rounded text-emerald-200">
                    <FaTimes className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation Items List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive
                                ? 'bg-emerald-700 text-white font-bold shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-700'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
