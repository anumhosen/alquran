import React from 'react';
import { FaBackspace, FaTimes } from 'react-icons/fa';

export default function ArabicKeyboard({ onInput, onDelete, onClear, onClose }) {
    const row1 = ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'];
    const row2 = ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'];
    const row3 = ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'];
    const harakat = ['َ', 'ُ', 'ِ', 'ً', 'ٌ', 'ٍ', 'ْ', 'ّ', 'ٰ', 'ٱ'];

    return (
        <div className="bg-emerald-900/95 text-white p-3 rounded-2xl shadow-2xl border border-emerald-700/80 backdrop-blur-md space-y-2 select-none dir-rtl animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-2 pb-1 border-b border-emerald-700/60 text-xs font-semibold text-emerald-200 dir-ltr">
                <span>On-Screen Arabic Keyboard (لوحة المفاتيح العربية)</span>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-emerald-800 rounded-lg text-emerald-300 hover:text-white"
                >
                    <FaTimes className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Row 1 */}
            <div className="flex justify-center gap-1">
                {row1.map((char) => (
                    <button
                        key={char}
                        onClick={() => onInput(char)}
                        className="w-8 h-9 sm:w-10 sm:h-10 bg-emerald-800/80 hover:bg-emerald-600 rounded-lg text-lg font-serif font-bold text-emerald-100 shadow-xs active:scale-95 transition-transform flex items-center justify-center border border-emerald-700"
                    >
                        {char}
                    </button>
                ))}
            </div>

            {/* Row 2 */}
            <div className="flex justify-center gap-1">
                {row2.map((char) => (
                    <button
                        key={char}
                        onClick={() => onInput(char)}
                        className="w-8 h-9 sm:w-10 sm:h-10 bg-emerald-800/80 hover:bg-emerald-600 rounded-lg text-lg font-serif font-bold text-emerald-100 shadow-xs active:scale-95 transition-transform flex items-center justify-center border border-emerald-700"
                    >
                        {char}
                    </button>
                ))}
            </div>

            {/* Row 3 */}
            <div className="flex justify-center gap-1">
                {row3.map((char) => (
                    <button
                        key={char}
                        onClick={() => onInput(char)}
                        className="w-8 h-9 sm:w-10 sm:h-10 bg-emerald-800/80 hover:bg-emerald-600 rounded-lg text-lg font-serif font-bold text-emerald-100 shadow-xs active:scale-95 transition-transform flex items-center justify-center border border-emerald-700"
                    >
                        {char}
                    </button>
                ))}
            </div>

            {/* Harakat Row */}
            <div className="flex justify-center gap-1 pt-1 border-t border-emerald-800/60">
                {harakat.map((char) => (
                    <button
                        key={char}
                        onClick={() => onInput(char)}
                        className="w-7 h-8 sm:w-9 sm:h-9 bg-emerald-950/80 hover:bg-emerald-700 rounded-lg text-base font-serif font-bold text-amber-200 shadow-xs active:scale-95 transition-transform flex items-center justify-center border border-emerald-800"
                    >
                        {char}
                    </button>
                ))}
            </div>

            {/* Action Control Row */}
            <div className="flex justify-between items-center gap-2 pt-1 dir-ltr">
                <button
                    onClick={onClear}
                    className="px-3 py-1.5 bg-red-800/80 hover:bg-red-700 rounded-lg text-xs font-semibold text-white shadow-xs"
                >
                    Clear All
                </button>
                <button
                    onClick={() => onInput(' ')}
                    className="flex-1 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-xs font-semibold text-emerald-200 shadow-xs text-center"
                >
                    Space Bar (مسافة)
                </button>
                <button
                    onClick={onDelete}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-xs font-semibold text-emerald-200 shadow-xs flex items-center space-x-1"
                >
                    <FaBackspace className="w-3.5 h-3.5" />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
}
