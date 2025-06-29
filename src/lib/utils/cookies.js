/**
 * Utility functions for handling cookies
 */

/**
 * Get a cookie value by name
 * @param {string} name - The name of the cookie
 * @returns {string|null} - The cookie value or null if not found
 */
export function getCookie(name) {
    if (typeof document === 'undefined') {
        return null; // SSR safe
    }
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    
    return null;
}

/**
 * Set a cookie
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {number} days - Number of days until expiration (optional)
 * @param {string} path - Cookie path (optional, defaults to '/')
 */
export function setCookie(name, value, days = 30, path = '/') {
    if (typeof document === 'undefined') {
        return; // SSR safe
    }
    
    let expires = '';
    if (days) {
        const date = new Date();
        // Set cookie to expire far in the future (e.g., 100 years)
        date.setFullYear(date.getFullYear() + 100);
        expires = `; expires=${date.toUTCString()}`;
    }
    
    document.cookie = `${name}=${value}${expires}; path=${path}`;
}

/**
 * Delete a cookie
 * @param {string} name - The name of the cookie to delete
 * @param {string} path - Cookie path (optional, defaults to '/')
 */
export function deleteCookie(name, path = '/') {
    if (typeof document === 'undefined') {
        return; // SSR safe
    }
    
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}
