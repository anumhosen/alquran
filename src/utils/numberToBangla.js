// src/utils/numberToBangla.js

/**
 * Convert English digits to Bangla digits
 * @param {string|number} input - The number to convert
 * @returns {string} - Converted Bangla number string
 */
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

export function numberToBangla(input) {
    if (input == null) return '';
    return String(input).replace(/\d/g, (d) => BN_DIGITS[d]);
}
