/**
 * Reusable form validation utilities
 * Provides consistent validation rules across all forms
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    return null;
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePassword = (password) => {
    if (!password || password.trim() === '') {
        return 'Password is required';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return null;
};

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = (phone) => {
    if (!phone || phone.trim() === '') {
        return 'Phone number is required';
    }

    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');

    if (!/^\d{10}$/.test(cleanPhone)) {
        return 'Please enter a valid 10-digit phone number';
    }

    return null;
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateName = (name) => {
    if (!name || name.trim() === '') {
        return 'Name is required';
    }

    if (name.length < 2) {
        return 'Name must be at least 2 characters';
    }

    if (name.length > 100) {
        return 'Name must be less than 100 characters';
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return 'Name can only contain letters and spaces';
    }

    return null;
};

/**
 * Validate age
 * @param {number|string} age - Age to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateAge = (age) => {
    if (!age) {
        return 'Age is required';
    }

    const ageNum = parseInt(age);

    if (isNaN(ageNum)) {
        return 'Age must be a number';
    }

    if (ageNum < 16) {
        return 'You must be at least 16 years old';
    }

    if (ageNum > 100) {
        return 'Please enter a valid age';
    }

    return null;
};

/**
 * Validate college name
 * @param {string} collegeName - College name to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateCollegeName = (collegeName) => {
    if (!collegeName || collegeName.trim() === '') {
        return 'College/University name is required';
    }

    if (collegeName.length < 3) {
        return 'College name must be at least 3 characters';
    }

    return null;
};

/**
 * Validate UPI ID
 * @param {string} upiId - UPI ID to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateUpiId = (upiId) => {
    if (!upiId || upiId.trim() === '') {
        return 'UPI ID is required';
    }

    // UPI format: user@bank or phone number
    const upiRegex = /^[\w.-]+@[\w.-]+$|^\d{10}$/;
    if (!upiRegex.test(upiId)) {
        return 'Please enter a valid UPI ID (e.g., user@bank or 10-digit number)';
    }

    return null;
};

/**
 * Validate withdrawal amount
 * @param {number|string} amount - Amount to validate
 * @param {number} minAmount - Minimum allowed amount
 * @param {number} maxAmount - Maximum allowed amount (available points)
 * @returns {string|null} Error message or null if valid
 */
export const validateWithdrawalAmount = (amount, minAmount = 100, maxAmount) => {
    if (!amount) {
        return 'Amount is required';
    }

    const amountNum = parseFloat(amount);

    if (isNaN(amountNum)) {
        return 'Amount must be a number';
    }

    if (amountNum < minAmount) {
        return `Minimum withdrawal amount is ${minAmount} points`;
    }

    if (maxAmount && amountNum > maxAmount) {
        return `You only have ${maxAmount} points available`;
    }

    return null;
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateRequired = (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return `${fieldName} is required`;
    }
    return null;
};

/**
 * Validate OTP (6 digits)
 * @param {string} otp - OTP to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateOtp = (otp) => {
    if (!otp || otp.trim() === '') {
        return 'OTP is required';
    }

    if (!/^\d{6}$/.test(otp)) {
        return 'OTP must be 6 digits';
    }

    return null;
};

/**
 * Validate passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {string|null} Error message or null if valid
 */
export const validatePasswordsMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return null;
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @param {boolean} required - Whether the field is required
 * @returns {string|null} Error message or null if valid
 */
export const validateUrl = (url, required = false) => {
    if (!url || url.trim() === '') {
        return required ? 'URL is required' : null;
    }

    try {
        new URL(url);
        return null;
    } catch {
        return 'Please enter a valid URL';
    }
};

export default {
    validateEmail,
    validatePassword,
    validatePhone,
    validateName,
    validateAge,
    validateCollegeName,
    validateUpiId,
    validateWithdrawalAmount,
    validateRequired,
    validateOtp,
    validatePasswordsMatch,
    validateUrl
};
