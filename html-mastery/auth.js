/**
 * AuthManager — Client-side Authentication Helper
 * Handles login, registration, logout, and session persistence.
 * Works with the local Node.js backend (server/index.js).
 *
 * Usage:
 *   window.AuthManager.login(email, password) → Promise<{success, user, error}>
 *   window.AuthManager.register(username, email, password) → Promise<{success, user, error}>
 *   window.AuthManager.logout()
 *   window.AuthManager.isLoggedIn() → boolean
 *   window.AuthManager.getToken() → string | null
 *   window.AuthManager.getCurrentUser() → object | null
 */

(function () {
    'use strict';

    const TOKEN_KEY   = 'auth_token';
    const USER_KEY    = 'auth_user';
    const API_BASE    = (function () {
        if (window.API_BASE) return window.API_BASE;
        const stored = localStorage.getItem('api_endpoint');
        if (stored) return stored.replace(/\/$/, '');
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            if (window.location.port !== '5000' && window.location.port !== '') {
                return `http://${window.location.hostname}:5000`;
            }
        }
        return '';
    })();

    const AuthManager = {
        // ─── Helpers ──────────────────────────────────────────────────────────
        getToken() {
            return localStorage.getItem(TOKEN_KEY) || null;
        },

        getCurrentUser() {
            try {
                const raw = localStorage.getItem(USER_KEY);
                return raw ? JSON.parse(raw) : null;
            } catch (_) { return null; }
        },

        isLoggedIn() {
            return !!this.getToken();
        },

        _persist(token, user) {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        },

        // ─── API Calls ────────────────────────────────────────────────────────
        async register(username, email, password) {
            try {
                const res = await fetch(`${API_BASE}/api/auth/register`, {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({ username, email, password })
                });
                const data = await res.json();
                if (!res.ok) return { success: false, error: data.error || 'Registration failed' };
                this._persist(data.token, data.user);
                this._syncProgressAfterAuth();
                this._dispatchAuthChange('login', data.user);
                return { success: true, user: data.user };
            } catch (err) {
                return { success: false, error: 'Could not connect to the server. Make sure it is running.' };
            }
        },

        async login(email, password) {
            try {
                const res = await fetch(`${API_BASE}/api/auth/login`, {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) return { success: false, error: data.error || 'Login failed' };
                this._persist(data.token, data.user);
                this._syncProgressAfterAuth();
                this._dispatchAuthChange('login', data.user);
                return { success: true, user: data.user };
            } catch (err) {
                return { success: false, error: 'Could not connect to the server. Make sure it is running.' };
            }
        },

        logout() {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            this._dispatchAuthChange('logout', null);
        },

        async fetchProfile() {
            const token = this.getToken();
            if (!token) return null;
            try {
                const res = await fetch(`${API_BASE}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) return null;
                return await res.json();
            } catch (_) { return null; }
        },

        // ─── Auto-sync local progress to server after login ───────────────────
        _syncProgressAfterAuth() {
            if (!window.cloudSync || !window.cloudSync.syncNow) return;
            setTimeout(() => {
                window.cloudSync.syncNow().catch(() => {});
            }, 1000);
        },

        // ─── Custom Events ────────────────────────────────────────────────────
        _dispatchAuthChange(type, user) {
            document.dispatchEvent(new CustomEvent('authChange', { detail: { type, user } }));
        }
    };

    window.AuthManager = AuthManager;

    // ─── Auto-inject user badge into site header on every page ────────────────
    document.addEventListener('DOMContentLoaded', () => {
        if (!AuthManager.isLoggedIn()) return;
        const user = AuthManager.getCurrentUser();
        if (!user) return;

        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        const displayName = user.username || user.email || 'Learner';
        const avatar = (user.profile && user.profile.avatar) ? user.profile.avatar : '💻';

        const badge = document.createElement('div');
        badge.className = 'user-session-badge';
        badge.id = 'user-session-badge';
        badge.innerHTML = `
            <a href="my-progress.html" class="user-badge-link" title="View your progress">
                <span class="user-badge-avatar">${avatar}</span>
                <span class="user-badge-name">${displayName}</span>
            </a>
            <button type="button" class="user-badge-logout" title="Sign out" id="auth-logout-btn">↩</button>
        `;

        headerActions.insertBefore(badge, headerActions.firstChild);

        document.getElementById('auth-logout-btn')?.addEventListener('click', () => {
            if (confirm('Sign out of your account?')) {
                AuthManager.logout();
                window.location.reload();
            }
        });
    });
})();
