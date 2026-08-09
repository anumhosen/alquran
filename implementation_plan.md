# Implementation Plan - Al Quran Desktop Application (Greentech Inspired)

Transform the existing Hisnul Muslim Tauri app into a feature-rich, modular **Al Quran Desktop Application** inspired by **Greentech Apps Foundation (GTAF)** Quran app. All codebase files will follow a strict **<200 lines per file** modular limit.

---

## User Review Required

> [!IMPORTANT]
> **File Deletion Safety Policy**: Per rules, no existing files will be deleted automatically by the agent. Instead, obsolete Hisnul Muslim files are documented under `TODO: Files for Review`, and a executable bash script `cleanup_obsolete_hisnul_files.sh` will be created in the repository root for manual execution by the user.

> [!NOTE]
> **Database Architecture**: SQLite databases in `src-tauri/assets/` (`ar_quran.db`, `bn_bayaan.db`, `en_sahih.db`, `words.db`, `corpus.db`, `qurantopics.db`, `bn_tafsir_kathir.db`, `bn_tafsirzakaria.db`, etc.) will be dynamically queried through an upgraded Rust `db_query(db_name, query)` Tauri command.

---

## Open Questions

None at present. Database schemas have been analyzed using Python tools (`words.db`, `corpus.db`, `ar_quran.db`, `sura_names.json`, etc.).

---

## Proposed Changes

### Rust Backend (`src-tauri`)

#### [MODIFY] [lib.rs](file:///d:/Development/TAURI/Al%20Quran/src-tauri/src/lib.rs)
- Update `db_query` command signature to `db_query(app_handle: AppHandle, db_name: Option<String>, query: String)`.
- Support opening any sqlite database in `assets/` (e.g. `ar_quran.db`, `words.db`, `corpus.db`, `bn_bayaan.db`, `en_sahih.db`, `qurantopics.db`, etc.).
- Ensure robust path resolution for Tauri dev mode and production bundled assets.

---

### React Stores & API (`src/store`, `src/utils`)

#### [MODIFY] [tauriAPI.js](file:///d:/Development/TAURI/Al%20Quran/src/utils/tauriAPI.js)
- Update `DBOperation(query, dbName)` to support targeted database queries.

#### [NEW] [useQuranStore.js](file:///d:/Development/TAURI/Al%20Quran/src/store/useQuranStore.js)
- Store active Surah (1-114), current Ayahs, word-by-word data, active Tafsir data, Surah metadata, search results, and loading states. Keep file <150 lines.

#### [NEW] [useBookmarkStore.js](file:///d:/Development/TAURI/Al%20Quran/src/store/useBookmarkStore.js)
- Store bookmarks, pinned Ayahs, last-read Surah & Ayah with localStorage persistence. Keep file <100 lines.

#### [MODIFY] [useSettingsStore.js](file:///d:/Development/TAURI/Al%20Quran/src/store/useSettingsStore.js)
- Store selected translation (`bn_bayaan`, `bn_taisirul`, `bn_mujibur`, `en_sahih`), active tafsir (`bn_tafsir_kathir`, `bn_tafsirzakaria`, `kathir`), word-by-word display preference (Bengali / English / Off), Arabic font size, translation font size, and reciter preference. Keep file <120 lines.

---

### UI Components (`src/components`)

#### [MODIFY] [Navbar.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/Navbar.jsx)
- GTAF-styled top navbar with Surah selector, quick jump, search input, settings toggle, theme toggle, and custom window title bar controls. (<160 lines)

#### [NEW] [SurahHeader.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/SurahHeader.jsx)
- Surah banner showing Surah Arabic name, English & Bengali title, Makki/Madani badge, verse count, and Bismillah calligraphic header. (<100 lines)

#### [NEW] [AyahCard.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/AyahCard.jsx)
- Individual Ayah card with Ayah badge (e.g. 2:255), play audio button, copy text, bookmark pin, toggle Tafsir modal, toggle Morphology modal, Arabic Uthmani text rendering, and active translation text. (<180 lines)

#### [NEW] [WordByWordView.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/WordByWordView.jsx)
- Stacked Arabic word & Bengali/English word-by-word rendering loaded from `words.db`. (<120 lines)

#### [NEW] [TafsirModal.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/TafsirModal.jsx)
- Modal / drawer for reading detailed Tafsir (Ibn Kathir, Zakaria, Bayaan, Mokhtasar) fetched from selected Tafsir sqlite DB. (<150 lines)

#### [NEW] [MorphologyModal.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/MorphologyModal.jsx)
- Modal displaying Quranic grammar breakdown, word roots, and verb forms from `corpus.db`. (<140 lines)

#### [NEW] [AudioPlayerBar.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/AudioPlayerBar.jsx)
- Bottom audio player bar with play/pause, continuous recitation playback, reciter selector, and progress timeline. (<150 lines)

#### [MODIFY] [SidebarLeft.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/SidebarLeft.jsx)
- Left navigation drawer with tabs for Surah list, Juz list, Subjectwise Topics, Bookmarks, and Settings. (<160 lines)

#### [MODIFY] [SidebarRight.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/SidebarRight.jsx)
- Settings panel to configure fonts, translations, tafsir, word-by-word mode, and audio preferences. (<160 lines)

---

### Pages (`src/pages`)

#### [MODIFY] [App.jsx](file:///d:/Development/TAURI/Al%20Quran/src/App.jsx)
- Main application layout linking Top Navbar, Left Sidebar Drawer, Right Settings Drawer, Main Content routes, and Audio Player Bar. (<60 lines)

#### [MODIFY] [Home.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/Home.jsx)
- Main Quran reader page displaying active Surah header, Ayah cards list, pagination/infinite scroll, and quick jump controls. (<160 lines)

#### [MODIFY] [Search.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/Search.jsx)
- Quran search page with multi-lingual full-text search across Arabic, Bengali, and English translations. (<170 lines)

#### [MODIFY] [Bookmarks.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/Bookmarks.jsx)
- Saved Ayahs, pinned verses, and last-read tracker. (<140 lines)

#### [NEW] [TopicsPage.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/TopicsPage.jsx)
- Subjectwise Quran topics browser powered by `qurantopics.db`. (<150 lines)

#### [MODIFY] [About.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/About.jsx)
- Inspired by Greentech Apps Foundation app details, metadata, credit, and links. (<120 lines)

---

### Shell Scripts & Cleanup

#### [NEW] [cleanup_obsolete_hisnul_files.sh](file:///d:/Development/TAURI/Al%20Quran/cleanup_obsolete_hisnul_files.sh)
- Executable bash script provided for the user to remove obsolete Hisnul Muslim components safely.

---

## TODO: Files for Review (Obsolete Hisnul Muslim Files)

The following 12 files belong to the old Hisnul Muslim app and are no longer referenced in the Al Quran app. They can be removed by the user:

1. [Category.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/Category.jsx)
2. [Chapters.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/Chapters.jsx)
3. [DuaCard.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/DuaCard.jsx)
4. [DuaIndex.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/DuaIndex.jsx)
5. [DuaList.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/DuaList.jsx)
6. [Subcategory.jsx](file:///d:/Development/TAURI/Al%20Quran/src/components/Subcategory.jsx)
7. [Books.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/Books.jsx)
8. [CategoryPage.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/CategoryPage.jsx)
9. [Main.jsx](file:///d:/Development/TAURI/Al%20Quran/src/pages/Main.jsx)
10. [useDuaStore.js](file:///d:/Development/TAURI/Al%20Quran/src/store/useDuaStore.js)
11. [useBookStore.js](file:///d:/Development/TAURI/Al%20Quran/src/store/useBookStore.js)
12. [useIndexStore.js](file:///d:/Development/TAURI/Al%20Quran/src/store/useIndexStore.js)

---

## Verification Plan

### Automated Tests
- Run `npx vite build` to ensure the frontend compiles without TypeScript/JSX or bundling errors.
- Run Python script `scratch/check_db.py` to verify all SQLite database assets are readable and valid.

### Manual Verification
- Verify Surah list loading (Surah 1 to 114).
- Verify Arabic Quran text, Bengali translation, English translation, and Word-by-Word alignment.
- Verify Tafsir modal opens and loads text for Ayah.
- Verify Quranic Topics search and subjectwise listing.
- Verify Audio reciter playback.
- Verify Bookmark saving and Last Read restoration.
- Confirm all created/modified code files stay under **200 lines**.
