import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

const listenersMap = new Map();

export const tauriAPI = {
    DBOperation: async (query, dbName = 'ar_quran.db') => {
        try {
            const rows = await invoke('db_query', { dbName, query });
            return rows;
        } catch (err) {
            console.error(`DBOperation error (${dbName}):`, err);
            throw err;
        }
    },
    selectAudioFolder: async () => {
        try {
            return await invoke('select_audio_folder');
        } catch (err) {
            console.error('selectAudioFolder error:', err);
            return null;
        }
    },
    getDefaultAudioDir: async () => {
        try {
            return await invoke('get_default_audio_dir');
        } catch (err) {
            console.error('getDefaultAudioDir error:', err);
            return '';
        }
    },
    saveAudioFile: async (folderPath, filename, arrayBuffer) => {
        try {
            const data = Array.from(new Uint8Array(arrayBuffer));
            await invoke('save_audio_file', { folderPath, filename, data });
            return true;
        } catch (err) {
            console.error('saveAudioFile error:', err);
            return false;
        }
    },
    checkAudioFileExists: async (folderPath, filename) => {
        try {
            return await invoke('check_audio_file_exists', { folderPath, filename });
        } catch (err) {
            console.error('checkAudioFileExists error:', err);
            return false;
        }
    },
    minimize: async () => {
        try { await invoke('minimize_window'); } catch (err) { console.error(err); }
    },
    maximize: async () => {
        try { await invoke('toggle_maximize_window'); } catch (err) { console.error(err); }
    },
    close: async () => {
        try { await invoke('close_window'); } catch (err) { console.error(err); }
    },
    isMaximized: async () => {
        try { return await invoke('is_window_maximized'); } catch (err) { return false; }
    },
    onMaximizeChange: (callback) => {
        invoke('is_window_maximized').then((isMax) => callback(Boolean(isMax))).catch(() => { });
        let unlistenFn = null;
        listen('window:isMaximized', (event) => { callback(Boolean(event.payload)); }).then((unlisten) => {
            unlistenFn = unlisten;
            if (!listenersMap.has('window:isMaximized')) listenersMap.set('window:isMaximized', []);
            listenersMap.get('window:isMaximized').push(unlisten);
        });
        return () => { if (unlistenFn) unlistenFn(); };
    }
};

if (typeof window !== 'undefined') {
    window.tauriAPI = tauriAPI;
}
