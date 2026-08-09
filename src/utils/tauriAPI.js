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
    minimize: async () => {
        try {
            await invoke('minimize_window');
        } catch (err) {
            console.error('Minimize error:', err);
        }
    },
    maximize: async () => {
        try {
            await invoke('toggle_maximize_window');
        } catch (err) {
            console.error('Maximize error:', err);
        }
    },
    close: async () => {
        try {
            await invoke('close_window');
        } catch (err) {
            console.error('Close error:', err);
        }
    },
    isMaximized: async () => {
        try {
            return await invoke('is_window_maximized');
        } catch (err) {
            console.error('isMaximized error:', err);
            return false;
        }
    },
    onMaximizeChange: (callback) => {
        invoke('is_window_maximized').then((isMax) => callback(Boolean(isMax))).catch(() => { });

        let unlistenFn = null;
        listen('window:isMaximized', (event) => {
            callback(Boolean(event.payload));
        }).then((unlisten) => {
            unlistenFn = unlisten;
            if (!listenersMap.has('window:isMaximized')) {
                listenersMap.set('window:isMaximized', []);
            }
            listenersMap.get('window:isMaximized').push(unlisten);
        });

        return () => {
            if (unlistenFn) unlistenFn();
        };
    }
};

if (typeof window !== 'undefined') {
    window.tauriAPI = tauriAPI;
}
