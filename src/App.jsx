import { useEffect } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import TafsirModal from './components/TafsirModal';
import MorphologyModal from './components/MorphologyModal';
import AudioPlayerBar from './components/AudioPlayerBar';
import Home from './pages/Home';
import Main from './pages/Main';
import Search from './pages/Search';
import Bookmarks from './pages/Bookmarks';
import TopicsPage from './pages/TopicsPage';
import Dictionary from './pages/Dictionary';
import SettingsPage from './pages/SettingsPage';
import About from './pages/About';
import { useSettingsStore } from './store/useSettingsStore';
import './App.css';

function App() {
    const { theme } = useSettingsStore();

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('dark', 'sepia');
        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'sepia') {
            root.classList.add('sepia');
        }
    }, [theme]);

    return (
        <MemoryRouter>
            <div className="h-screen flex flex-col bg-emerald-50/30 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden font-sans">
                <Navbar />
                <div className="flex flex-1 overflow-hidden relative">
                    <SidebarLeft />
                    <main className="flex-1 overflow-hidden w-full">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/main" element={<Main />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/bookmarks" element={<Bookmarks />} />
                            <Route path="/topics" element={<TopicsPage />} />
                            <Route path="/dictionary" element={<Dictionary />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                    <SidebarRight />
                </div>
                <TafsirModal />
                <MorphologyModal />
                <AudioPlayerBar />
            </div>
        </MemoryRouter>
    );
}

export default App;
