# Walkthrough - Al Quran Desktop Application (Greentech Inspired)

Transformed the Hisnul Muslim application into a **Greentech Apps Foundation (GTAF)** inspired **Al Quran Desktop Application**. All files have been modularized and verified to strictly stay under **200 lines per file**.

---

## Accomplished Work

### 1. File Cleanup & Safety Policy
- Created [`cleanup_obsolete_hisnul_files.sh`](file:///d:/Development/TAURI/Al%20Quran/cleanup_obsolete_hisnul_files.sh) in the workspace root.
- Documented 12 obsolete Hisnul Muslim files under `TODO: Files for Review` so the user can execute the script manually.

### 2. Multi-Database Rust Backend
- Updated [`src-tauri/src/lib.rs`](file:///d:/Development/TAURI/Al%20Quran/src-tauri/src/lib.rs) to handle dynamic database switching (`db_name`) across SQLite asset databases:
  - `ar_quran.db` (Arabic text)
  - `words.db` (Word-by-Word Bengali/English/Indonesian data)
  - `corpus.db` (Grammar & word root morphology)
  - `bn_bayaan.db`, `bn_taisirul.db`, `bn_mujibur.db`, `en_sahih.db` (Translations)
  - `bn_tafsir_kathir.db`, `bn_tafsirzakaria.db`, `kathir.db` (Tafsir books)
  - `qurantopics.db` (Subjectwise topics)

### 3. State Management Stores
- [`useQuranStore.js`](file:///d:/Development/TAURI/Al%20Quran/src/store/useQuranStore.js): Manages active Surah, Ayah list, Word-by-Word data, Tafsir modal, Morphology modal, and audio state. (<150 lines)
- [`useSettingsStore.js`](file:///d:/Development/TAURI/Al%20Quran/src/store/useSettingsStore.js): Controls translation choice, tafsir choice, word-by-word preferences, typography sizes, audio reciter, and theme modes (`emerald`, `dark`, `sepia`). (<100 lines)
- [`useBookmarkStore.js`](file:///d:/Development/TAURI/Al%20Quran/src/store/useBookmarkStore.js): LocalStorage persistence for saved Ayahs and Last Read position. (<80 lines)
- [`useSidebarStore.js`](file:///d:/Development/TAURI/Al%20Quran/src/store/useSidebarStore.js): Drawer navigation states. (<25 lines)

### 4. Modular UI Components
- [`Navbar.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/Navbar.jsx): GTAF-styled top navbar with quick Surah jump, search button, bookmarks button, theme toggle, and window controls. (<150 lines)
- [`SurahHeader.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/SurahHeader.jsx): Calligraphic Bismillah banner with Makki/Madani info and Surah translation metadata. (<80 lines)
- [`AyahCard.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/AyahCard.jsx): Verse reader card with Uthmani Arabic text, action toolbar (Play, Bookmark, Copy, Tafsir), Word-by-Word view, and translation text. (<160 lines)
- [`WordByWordView.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/WordByWordView.jsx): Stacked Arabic word & translation pills with clickable grammar inspection. (<60 lines)
- [`TafsirModal.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/TafsirModal.jsx): Popup modal for reading detailed Tafsir with live book selector. (<120 lines)
- [`MorphologyModal.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/MorphologyModal.jsx): Popup modal showing word roots, verb forms, and POS details from `corpus.db`. (<110 lines)
- [`AudioPlayerBar.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/AudioPlayerBar.jsx): Bottom audio bar with continuous verse recitation, progress, and playback controls. (<130 lines)
- [`SidebarLeft.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/SidebarLeft.jsx): Navigation drawer with search-filterable Surah list. (<120 lines)
- [`SidebarRight.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/components/SidebarRight.jsx): Settings panel for customizing fonts, translations, word-by-word language, and themes. (<140 lines)

### 5. Pages
- [`Home.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/pages/Home.jsx): Main Quran reader page. (<50 lines)
- [`Search.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/pages/Search.jsx): Multi-lingual full-text search across Quran translations. (<130 lines)
- [`Bookmarks.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/pages/Bookmarks.jsx): Saved Ayahs & Last Read resume card. (<110 lines)
- [`TopicsPage.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/pages/TopicsPage.jsx): Subjectwise Quran topics browser. (<120 lines)
- [`About.jsx`](file:///d:/Development/TAURI/Al%20Quran/src/pages/About.jsx): Greentech Apps Foundation inspired About page. (<60 lines)

---

## TODO: Files for Review (Obsolete Hisnul Muslim Files)

The following 12 files belong to the old Hisnul Muslim app and are safe to be removed:
- `src/components/Category.jsx`
- `src/components/Chapters.jsx`
- `src/components/DuaCard.jsx`
- `src/components/DuaIndex.jsx`
- `src/components/DuaList.jsx`
- `src/components/Subcategory.jsx`
- `src/pages/Books.jsx`
- `src/pages/CategoryPage.jsx`
- `src/pages/Main.jsx`
- `src/store/useDuaStore.js`
- `src/store/useBookStore.js`
- `src/store/useIndexStore.js`

> [!TIP]
> Run `bash cleanup_obsolete_hisnul_files.sh` in the terminal to remove all 12 obsolete files at once.

---

## Verification Results

### Build Verification
- **Frontend Build**: Executed `npx vite build` - **SUCCESS** (0 errors, 73 modules compiled cleanly).
- **Line Count Audit**: Checked all files across `src` and `src-tauri/src` - **100% compliant** with the single file < 200 lines limit.
