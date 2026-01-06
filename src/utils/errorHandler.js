/**
 * Centralized error handler for API requests
 * Converts technical errors into user-friendly messages
 */

/**
 * Get user-friendly error message from axios error
 * @param {Error} error - Axios error object
 * @param {string} context - Optional context (e.g., 'login', 'registration')
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error, context = '') => {
    // Network error (no response from server)
    if (!error.response) {
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
            return 'The request took too long. Please check your connection and try again.';
        }
        return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    const status = error.response.status;
    const backendMessage = error.response?.data?.message;

    // Handle specific status codes
    switch (status) {
        case 400:
            // Bad request - use backend message if available and user-friendly
            if (backendMessage && isUserFriendly(backendMessage)) {
                return backendMessage;
            }
            return getContextualMessage(context, 'validation') || 'Please check your input and try again.';

        case 401:
            // Unauthorized - session expired
            return 'Your session has expired. Please log in again.';

        case 403:
            // Forbidden - no permission
            return "You don't have permission to perform this action.";

        case 404:
            // Not found
            return getContextualMessage(context, 'notFound') || 'The requested resource was not found. Please try again.';

        case 409:
            // Conflict - usually duplicate
            if (backendMessage && isUserFriendly(backendMessage)) {
                return backendMessage;
            }
            return 'This item already exists. Please try a different one.';

        case 422:
            // Validation error
            if (backendMessage && isUserFriendly(backendMessage)) {
                return backendMessage;
            }
            return 'Please check your input and try again.';

        case 429:
            // Too many requests
            return 'Too many requests. Please wait a moment and try again.';

        case 500:
        case 502:
        case 503:
            // Server errors
            return 'Something went wrong on our end. Please try again in a moment.';

        case 504:
            // Gateway timeout
            return 'The server took too long to respond. Please try again.';

        default:
            // Use backend message if available and user-friendly
            if (backendMessage && isUserFriendly(backendMessage)) {
                return backendMessage;
            }
            return 'An unexpected error occurred. Please try again.';
    }
};

/**
 * Check if a message is user-friendly (doesn't contain technical details)
 * @param {string} message - Message to check
 * @returns {boolean}
 */
const isUserFriendly = (message) => {
    if (!message || typeof message !== 'string') return false;

    // Reject messages with technical keywords
    const technicalKeywords = [
        'undefined',
        'null',
        'error:',
        'exception',
        'stack',
        'query',
        'database',
        'sql',
        'server',
        'internal',
        'validation failed',
        'cast to',
        'required field',
        'mongoose',
        'sequelize'
    ];

    const lowerMessage = message.toLowerCase();
    return !technicalKeywords.some(keyword => lowerMessage.includes(keyword));
};

/**
 * Get contextual error messages for specific scenarios
 * @param {string} context - Context identifier
 * @param {string} type - Error type
 * @returns {string|null}
 */
const getContextualMessage = (context, type) => {
    const messages = {
        login: {
            validation: 'Please enter a valid email and password.',
            notFound: 'Invalid email or password. Please try again.'
        },
        register: {
            validation: 'Please check all required fields and try again.',
            notFound: 'Registration failed. Please try again.'
        },
        forgotPassword: {
            validation: 'Please enter a valid email address.',
            notFound: 'We couldn\'t find an account with that email.'
        },
        withdrawal: {
            validation: 'Please check the withdrawal amount and UPI ID.',
            notFound: 'Withdrawal request not found.'
        },
        profile: {
            validation: 'Please check your profile information.',
            notFound: 'Profile not found. Please try refreshing the page.'
        }
    };

    return messages[context]?.[type] || null;
};

/**
 * Handle API errors with toast notifications
 * @param {Error} error - Axios error object
 * @param {Function} toast - Toast notification function
 * @param {string} context - Optional context
 * @param {string} fallbackMessage - Optional fallback message
 */
export const handleApiError = (error, toast, context = '', fallbackMessage = null) => {
    const message = fallbackMessage || getErrorMessage(error, context);
    if (toast && typeof toast.error === 'function') {
        toast.error(message);
    }
    console.error('API Error:', error);
};

export default {
    getErrorMessage,
    handleApiError
};
