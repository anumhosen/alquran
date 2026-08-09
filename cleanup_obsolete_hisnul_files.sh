#!/usr/bin/env bash
# Cleanup script for obsolete Hisnul Muslim files
# User can execute this script manually if they wish to remove unused Hisnul Muslim files.

echo "Cleaning up obsolete Hisnul Muslim files..."

rm -f src/components/Category.jsx
rm -f src/components/Chapters.jsx
rm -f src/components/DuaCard.jsx
rm -f src/components/DuaIndex.jsx
rm -f src/components/DuaList.jsx
rm -f src/components/Subcategory.jsx
rm -f src/pages/Books.jsx
rm -f src/pages/CategoryPage.jsx
rm -f src/pages/Main.jsx
rm -f src/store/useDuaStore.js
rm -f src/store/useBookStore.js
rm -f src/store/useIndexStore.js

echo "Cleanup complete! Obsolete files removed."
