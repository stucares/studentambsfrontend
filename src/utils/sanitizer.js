/**
 * Input sanitization utilities
 * Cleans user inputs before sending to backend to prevent XSS and ensure data quality
 */

/**
 * Remove HTML tags and script content from string
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
const stripHtml = (str) => {
    if (typeof str !== 'string') return str;
    // Remove HTML tags and script content
    return str.replace(/<[^>]*>/g, '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * Sanitize a general string input
 * @param {string} str - String to sanitize
 * @returns {string} Trimmed and cleaned string
 */
export const sanitizeString = (str) => {
    if (!str || typeof str !== 'string') return '';

    // Trim whitespace
    let clean = str.trim();

    // Remove HTML tags
    clean = stripHtml(clean);

    // Remove null bytes
    clean = clean.replace(/\0/g, '');

    return clean;
};

/**
 * Sanitize email input
 * @param {string} email - Email to sanitize
 * @returns {string} Lowercase, trimmed email
 */
export const sanitizeEmail = (email) => {
    if (!email || typeof email !== 'string') return '';

    // Trim, lowercase, remove HTML
    return stripHtml(email.trim().toLowerCase());
};

/**
 * Sanitize phone number
 * @param {string} phone - Phone number to sanitize
 * @returns {string} Phone with only digits and allowed characters
 */
export const sanitizePhone = (phone) => {
    if (!phone || typeof phone !== 'string') return '';

    // Keep only digits, spaces, dashes, and plus sign
    return phone.trim().replace(/[^\d\s\-+]/g, '');
};

/**
 * Sanitize name input (letters and spaces only)
 * @param {string} name - Name to sanitize
 * @returns {string} Cleaned name
 */
export const sanitizeName = (name) => {
    if (!name || typeof name !== 'string') return '';

    // Trim, remove HTML, keep only letters and spaces
    let clean = sanitizeString(name);
    // Normalize multiple spaces to single space
    clean = clean.replace(/\s+/g, ' ');

    return clean;
};

/**
 * Sanitize URL input
 * @param {string} url - URL to sanitize
 * @returns {string} Trimmed URL
 */
export const sanitizeUrl = (url) => {
    if (!url || typeof url !== 'string') return '';

    // Trim whitespace
    let clean = url.trim();

    // Remove javascript: protocol (XSS prevention)
    if (clean.toLowerCase().startsWith('javascript:')) {
        return '';
    }

    return clean;
};

/**
 * Sanitize number input
 * @param {string|number} num - Number to sanitize
 * @returns {string} Cleaned number string
 */
export const sanitizeNumber = (num) => {
    if (num === null || num === undefined) return '';

    const str = String(num).trim();
    // Keep only digits, decimal point, and minus sign
    return str.replace(/[^\d.-]/g, '');
};

/**
 * Sanitize all fields in an object
 * @param {Object} obj - Object with fields to sanitize
 * @param {Object} typeMap - Optional map of field names to sanitization types
 * @returns {Object} New object with sanitized values
 */
export const sanitizeObject = (obj, typeMap = {}) => {
    if (!obj || typeof obj !== 'object') return obj;

    const sanitized = {};

    for (const [key, value] of Object.entries(obj)) {
        // Skip null/undefined
        if (value === null || value === undefined) {
            sanitized[key] = value;
            continue;
        }

        // Use type map if provided
        const type = typeMap[key];

        if (type === 'email') {
            sanitized[key] = sanitizeEmail(value);
        } else if (type === 'phone') {
            sanitized[key] = sanitizePhone(value);
        } else if (type === 'name') {
            sanitized[key] = sanitizeName(value);
        } else if (type === 'url') {
            sanitized[key] = sanitizeUrl(value);
        } else if (type === 'number') {
            sanitized[key] = sanitizeNumber(value);
        } else if (typeof value === 'string') {
            // Default: sanitize as string
            sanitized[key] = sanitizeString(value);
        } else {
            // Keep non-string values as-is (numbers, booleans, etc.)
            sanitized[key] = value;
        }
    }

    return sanitized;
};

/**
 * Sanitize form data before API submission
 * @param {Object} formData - Form data object
 * @param {Object} fieldTypes - Map of field names to their types
 * @returns {Object} Sanitized form data
 */
export const sanitizeFormData = (formData, fieldTypes = {}) => {
    return sanitizeObject(formData, fieldTypes);
};

export default {
    sanitizeString,
    sanitizeEmail,
    sanitizePhone,
    sanitizeName,
    sanitizeUrl,
    sanitizeNumber,
    sanitizeObject,
    sanitizeFormData
};
