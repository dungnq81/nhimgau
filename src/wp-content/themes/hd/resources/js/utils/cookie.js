// utils/cookie.js

/**
 * CookieService: Provides methods to get, set, and delete browser cookies.
 * Uses the native Cookie Store API if available, with fallback to document.cookie.
 */
export default class CookieService {
    /**
     * Get the value of a cookie by name.
     *
     * @param {string} name - The name of the cookie.
     * @returns {Promise<string>} - Resolves to the cookie value, or empty string if not found.
     */
    static async get(name) {
        if (window.cookieStore) {
            const entry = await window.cookieStore.get(name);
            return entry?.value || '';
        }

        // Fallback document.cookie
        const pattern = new RegExp(
            `(^|;)\\s*${encodeURIComponent(name)}\\s*=\\s*([^;]+)`
        );
        const match = document.cookie.match(pattern);
        return match ? decodeURIComponent(match[2]) : '';
    }

    /**
     * Set a cookie with the specified name and value.
     *
     * @param {string} name - The cookie name.
     * @param {string} value - The cookie value.
     * @param {Object} [options] - Optional settings.
     * @param {number} [options.days=365] - Days until expiration.
     * @param {string} [options.path='/'] - Cookie path.
     * @param {boolean} [options.secure=true] - Whether the cookie is secure.
     * @param {string} [options.sameSite='Lax'] - SameSite attribute ('Lax', 'Strict', 'None').
     * @returns {Promise<void>}
     */
    static async set(name, value, {days = 365, path = '/', secure = true, sameSite = 'Lax'} = {}) {
        if (window.cookieStore) {
            const opts = { name, value, path, sameSite };
            if (days) {
                const expires = new Date(Date.now() + days * 864e5);
                opts.expires = expires;
            }
            if (secure) opts.secure = true;
            return window.cookieStore.set(opts);
        }

        // Fallback document.cookie
        let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)};path=${path};SameSite=${sameSite}`;
        if (days) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            cookieStr += `;expires=${expires}`;
        }
        if (secure) {
            cookieStr += ';secure';
        }
        document.cookie = cookieStr;
    }

    /**
     * Delete a cookie by name.
     * @param {string} name - The cookie name.
     * @param {Object} [options] - Optional settings.
     * @param {string} [options.path='/'] - Cookie path.
     * @param {string} [options.sameSite='Lax'] - SameSite attribute.
     * @returns {Promise<void>}
     */
    static async delete(name, {path = '/', sameSite = 'Lax'} = {}) {
        if (window.cookieStore) {
            return window.cookieStore.delete(name, { path, sameSite });
        }

        // Set an expiration date in the past to remove the cookie
        document.cookie = `${encodeURIComponent(name)}=;path=${path};expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=${sameSite}`;
    }
}
