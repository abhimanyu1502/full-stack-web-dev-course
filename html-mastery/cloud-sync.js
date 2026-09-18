/**
 * Fullstack Cloud Sync & Community Client
 * 
 * Provides seamless integration between frontend localStorage and the Node.js/SQLite backend:
 * - Backend server auto-detection
 * - Live cloud progress syncing & recovery
 * - User authentication & portfolio demo profiles
 * - Real-time SQLite community leaderboard
 */

(function () {
    'use strict';

    const API_BASE = window.location.origin.includes('http') ? window.location.origin : 'http://localhost:5000';
    let isServerAvailable = false;
    let currentUser = null;
    let syncToken = localStorage.getItem('html_mastery_auth_token') || null;

    // Inject minimal scoped styles for Cloud Sync modal & indicators
    const syncStyles = document.createElement('style');
    syncStyles.id = 'cloud-sync-styles';
    syncStyles.textContent = `
        .cloud-sync-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            font-size: 0.82rem;
            font-weight: 600;
            background: rgba(99, 102, 241, 0.12);
            color: #818cf8;
            border: 1px solid rgba(99, 102, 241, 0.3);
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        .cloud-sync-pill:hover {
            background: rgba(99, 102, 241, 0.22);
            border-color: rgba(99, 102, 241, 0.5);
            transform: translateY(-1px);
        }
        .cloud-sync-pill.online {
            background: rgba(16, 185, 129, 0.12);
            color: #34d399;
            border-color: rgba(16, 185, 129, 0.3);
        }
        .cloud-sync-pill.offline {
            background: rgba(148, 163, 184, 0.12);
            color: #94a3b8;
            border-color: rgba(148, 163, 184, 0.25);
        }
        .cloud-sync-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: currentColor;
            display: inline-block;
        }
        .cloud-sync-dot.pulse {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
            animation: cloudPulse 2s infinite;
        }
        @keyframes cloudPulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }
        .cloud-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
        }
        .cloud-modal-overlay.open {
            opacity: 1;
            pointer-events: auto;
        }
        .cloud-modal-box {
            background: var(--bg-card, #1e293b);
            color: var(--text-primary, #f8fafc);
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
            border-radius: 16px;
            max-width: 540px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            padding: 1.75rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            position: relative;
        }
        .cloud-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 1rem;
        }
        .cloud-modal-header h3 {
            margin: 0;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .cloud-close-btn {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            line-height: 1;
            opacity: 0.7;
        }
        .cloud-close-btn:hover { opacity: 1; }
        .cloud-tabs {
            display: flex;
            gap: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 0.5rem;
        }
        .cloud-tab-btn {
            background: none;
            border: none;
            color: var(--text-secondary, #94a3b8);
            padding: 0.5rem 1rem;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
        }
        .cloud-tab-btn.active {
            color: #818cf8;
            border-bottom-color: #818cf8;
        }
        .cloud-form-group {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            margin-bottom: 0.85rem;
        }
        .cloud-form-group label {
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--text-secondary, #94a3b8);
        }
        .cloud-form-input {
            background: rgba(0, 0, 0, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            padding: 0.6rem 0.85rem;
            color: inherit;
            font-size: 0.95rem;
        }
        .cloud-form-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        .cloud-actions-row {
            display: flex;
            gap: 0.75rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        .cloud-btn {
            flex: 1;
            padding: 0.65rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.9rem;
            border: none;
            transition: all 0.2s;
            text-align: center;
        }
        .cloud-btn-primary {
            background: #6366f1;
            color: #fff;
        }
        .cloud-btn-primary:hover { background: #4f46e5; }
        .cloud-btn-secondary {
            background: rgba(255, 255, 255, 0.08);
            color: inherit;
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .cloud-btn-secondary:hover { background: rgba(255, 255, 255, 0.14); }
        .cloud-leaderboard-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.65rem 0.85rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 8px;
            margin-bottom: 0.5rem;
        }
        .cloud-leaderboard-item.top-rank {
            border-color: rgba(245, 158, 11, 0.3);
            background: rgba(245, 158, 11, 0.05);
        }
    `;
    document.head.appendChild(syncStyles);

    // Main API helper
    async function apiRequest(endpoint, method = 'GET', data = null) {
        const headers = { 'Content-Type': 'application/json' };
        if (syncToken) {
            headers['Authorization'] = `Bearer ${syncToken}`;
        }
        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                method,
                headers,
                body: data ? JSON.stringify(data) : undefined
            });
            const json = await res.json();
            return { ok: res.ok, status: res.status, data: json };
        } catch (err) {
            return { ok: false, error: err.message };
        }
    }

    // Check backend health
    async function checkBackend() {
        try {
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 2000);
            const res = await fetch(`${API_BASE}/api/health`, { signal: ctrl.signal });
            clearTimeout(tid);
            if (res.ok) {
                isServerAvailable = true;
                updatePillUI('online', '🟢 SQLite Cloud Sync');
                if (syncToken) {
                    verifySession();
                }
                return true;
            }
        } catch (_) {
            // Server offline or running purely static
        }
        isServerAvailable = false;
        updatePillUI('offline', '💾 Local Mode (Offline)');
        return false;
    }

    async function verifySession() {
        const res = await apiRequest('/api/profile');
        if (res.ok && res.data.profile) {
            currentUser = res.data.profile;
            updatePillUI('online', `👤 ${currentUser.displayName || currentUser.username} (Synced)`);
        } else {
            syncToken = null;
            localStorage.removeItem('html_mastery_auth_token');
        }
    }

    function createPill() {
        const headerRight = document.querySelector('.header-right') || document.querySelector('header .header-content') || document.body;
        const pill = document.createElement('button');
        pill.id = 'cloud-sync-status-pill';
        pill.className = 'cloud-sync-pill';
        pill.setAttribute('aria-label', 'Cloud synchronization status and account');
        pill.innerHTML = `<span class="cloud-sync-dot"></span><span class="cloud-sync-label">Connecting...</span>`;
        pill.addEventListener('click', openSyncModal);

        if (headerRight.classList && headerRight.classList.contains('header-right')) {
            headerRight.insertBefore(pill, headerRight.firstChild);
        } else {
            pill.style.position = 'fixed';
            pill.style.bottom = '1rem';
            pill.style.left = '1rem';
            pill.style.zIndex = '9999';
            document.body.appendChild(pill);
        }
    }

    function updatePillUI(state, text) {
        const pill = document.getElementById('cloud-sync-status-pill');
        if (!pill) return;
        pill.className = `cloud-sync-pill ${state}`;
        const dot = pill.querySelector('.cloud-sync-dot');
        const label = pill.querySelector('.cloud-sync-label');
        if (dot) {
            dot.className = `cloud-sync-dot ${state === 'online' ? 'pulse' : ''}`;
        }
        if (label) {
            label.textContent = text;
        }
    }

    // Modal UI
    let modalEl = null;

    function buildModal() {
        if (modalEl) return modalEl;

        modalEl = document.createElement('div');
        modalEl.className = 'cloud-modal-overlay';
        modalEl.id = 'cloud-sync-modal';
        modalEl.innerHTML = `
            <div class="cloud-modal-box" role="dialog" aria-modal="true" aria-labelledby="cloud-modal-title">
                <div class="cloud-modal-header">
                    <h3 id="cloud-modal-title">☁️ Fullstack Cloud Sync & Hub</h3>
                    <button class="cloud-close-btn" id="cloud-modal-close" aria-label="Close modal">&times;</button>
                </div>

                <div class="cloud-tabs">
                    <button class="cloud-tab-btn active" data-tab="sync">Cloud Sync</button>
                    <button class="cloud-tab-btn" data-tab="leaderboard">Leaderboard</button>
                    <button class="cloud-tab-btn" data-tab="account">Account</button>
                </div>

                <div id="cloud-tab-content-sync" class="cloud-tab-content">
                    <p style="font-size:0.9rem; color:var(--text-secondary,#94a3b8); margin-top:0;">
                        Sync your XP, streaks, completed challenges, and saved code with our fullstack Node.js + SQLite backend.
                    </p>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:1rem; border-radius:10px; margin-bottom:1rem;">
                        <div style="font-weight:600; font-size:0.92rem; margin-bottom:0.25rem;">Backend Server Status</div>
                        <div id="cloud-server-desc" style="font-size:0.85rem; color:#34d399;">Checking connection...</div>
                    </div>

                    <div class="cloud-actions-row">
                        <button class="cloud-btn cloud-btn-primary" id="cloud-btn-push">⬆️ Push Local to Cloud</button>
                        <button class="cloud-btn cloud-btn-secondary" id="cloud-btn-pull">⬇️ Pull from Cloud</button>
                    </div>
                    <div id="cloud-sync-feedback" style="font-size:0.85rem; margin-top:0.75rem; text-align:center; min-height:1.2rem;"></div>
                </div>

                <div id="cloud-tab-content-leaderboard" class="cloud-tab-content" style="display:none;">
                    <p style="font-size:0.9rem; color:var(--text-secondary,#94a3b8); margin-top:0;">
                        Live top learners persisted directly in SQLite database:
                    </p>
                    <div id="cloud-leaderboard-list" style="max-height:280px; overflow-y:auto;">
                        <div style="text-align:center; padding:1.5rem; opacity:0.6;">Loading rankings...</div>
                    </div>
                </div>

                <div id="cloud-tab-content-account" class="cloud-tab-content" style="display:none;">
                    <div id="cloud-auth-view-guest">
                        <p style="font-size:0.9rem; color:var(--text-secondary,#94a3b8); margin-top:0;">
                            Create an account or login to save your portfolio progress permanently.
                        </p>
                        <div class="cloud-form-group">
                            <label for="cloud-input-user">Username</label>
                            <input class="cloud-form-input" id="cloud-input-user" type="text" placeholder="e.g. dev_learner" />
                        </div>
                        <div class="cloud-form-group">
                            <label for="cloud-input-pass">Password</label>
                            <input class="cloud-form-input" id="cloud-input-pass" type="password" placeholder="••••••••" />
                        </div>
                        <div class="cloud-actions-row">
                            <button class="cloud-btn cloud-btn-primary" id="cloud-btn-login">Sign In</button>
                            <button class="cloud-btn cloud-btn-secondary" id="cloud-btn-register">Register</button>
                            <button class="cloud-btn cloud-btn-secondary" id="cloud-btn-demo" style="border-color:#6366f1;">Demo Sign-In</button>
                        </div>
                    </div>

                    <div id="cloud-auth-view-logged" style="display:none;">
                        <div style="text-align:center; padding:1rem 0;">
                            <div style="font-size:3rem;" id="cloud-profile-avatar">👨‍💻</div>
                            <h4 style="margin:0.5rem 0 0.25rem;" id="cloud-profile-name">Learner</h4>
                            <div style="font-size:0.85rem; color:#818cf8;" id="cloud-profile-sub">Level 1 • 0 XP</div>
                        </div>
                        <div class="cloud-actions-row">
                            <button class="cloud-btn cloud-btn-secondary" id="cloud-btn-logout">Sign Out</button>
                        </div>
                    </div>
                    <div id="cloud-auth-feedback" style="font-size:0.85rem; margin-top:0.75rem; text-align:center;"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modalEl);

        // Bind tabs
        modalEl.querySelectorAll('.cloud-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modalEl.querySelectorAll('.cloud-tab-btn').forEach(b => b.classList.remove('active'));
                modalEl.querySelectorAll('.cloud-tab-content').forEach(c => c.style.display = 'none');
                btn.classList.add('active');
                const target = document.getElementById(`cloud-tab-content-${btn.dataset.tab}`);
                if (target) target.style.display = 'block';

                if (btn.dataset.tab === 'leaderboard') {
                    loadLeaderboard();
                }
            });
        });

        // Close handlers
        modalEl.querySelector('#cloud-modal-close').addEventListener('click', closeSyncModal);
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closeSyncModal();
        });

        // Push / Pull buttons
        modalEl.querySelector('#cloud-btn-push').addEventListener('click', handlePush);
        modalEl.querySelector('#cloud-btn-pull').addEventListener('click', handlePull);

        // Auth buttons
        modalEl.querySelector('#cloud-btn-login').addEventListener('click', () => handleAuth(false));
        modalEl.querySelector('#cloud-btn-register').addEventListener('click', () => handleAuth(true));
        modalEl.querySelector('#cloud-btn-demo').addEventListener('click', handleDemoLogin);
        modalEl.querySelector('#cloud-btn-logout').addEventListener('click', handleLogout);

        return modalEl;
    }

    function openSyncModal() {
        const modal = buildModal();
        refreshModalState();
        modal.classList.add('open');
    }

    function closeSyncModal() {
        if (modalEl) modalEl.classList.remove('open');
    }

    function refreshModalState() {
        const desc = document.getElementById('cloud-server-desc');
        if (desc) {
            if (isServerAvailable) {
                desc.innerHTML = `<span style="color:#34d399;">● Connected</span> — SQLite REST API active at <code>${API_BASE}</code>`;
            } else {
                desc.innerHTML = `<span style="color:#f87171;">● Offline</span> — Start backend via <code>npm start</code> or run on local port 5000.`;
            }
        }

        const guestView = document.getElementById('cloud-auth-view-guest');
        const loggedView = document.getElementById('cloud-auth-view-logged');

        if (currentUser) {
            if (guestView) guestView.style.display = 'none';
            if (loggedView) loggedView.style.display = 'block';
            const nameEl = document.getElementById('cloud-profile-name');
            const subEl = document.getElementById('cloud-profile-sub');
            const avatarEl = document.getElementById('cloud-profile-avatar');
            if (nameEl) nameEl.textContent = currentUser.displayName || currentUser.username;
            if (subEl) subEl.textContent = `Level ${currentUser.level || 1} • ${currentUser.xp || 0} XP • 🔥 ${currentUser.streakCount || 0} Streak`;
            if (avatarEl) avatarEl.textContent = currentUser.avatar || '👨‍💻';
        } else {
            if (guestView) guestView.style.display = 'block';
            if (loggedView) loggedView.style.display = 'none';
        }
    }

    async function handleAuth(isRegister) {
        const user = document.getElementById('cloud-input-user').value.trim();
        const pass = document.getElementById('cloud-input-pass').value.trim();
        const fb = document.getElementById('cloud-auth-feedback');

        if (!user || !pass) {
            if (fb) fb.innerHTML = '<span style="color:#f87171;">Please enter both username and password.</span>';
            return;
        }

        const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
        if (fb) fb.innerHTML = '<span style="color:#818cf8;">Authenticating...</span>';

        const res = await apiRequest(endpoint, 'POST', { username: user, password: pass });
        if (res.ok && res.data.token) {
            syncToken = res.data.token;
            currentUser = res.data.user;
            localStorage.setItem('html_mastery_auth_token', syncToken);
            if (fb) fb.innerHTML = `<span style="color:#34d399;">Welcome ${currentUser.displayName || currentUser.username}!</span>`;
            updatePillUI('online', `👤 ${currentUser.displayName || currentUser.username} (Synced)`);
            refreshModalState();
            // Automatically push local storage to new account
            handlePush();
        } else {
            if (fb) fb.innerHTML = `<span style="color:#f87171;">${res.data?.error || 'Authentication failed'}</span>`;
        }
    }

    async function handleDemoLogin() {
        document.getElementById('cloud-input-user').value = 'alex_frontend';
        document.getElementById('cloud-input-pass').value = 'demo1234';
        handleAuth(false);
    }

    function handleLogout() {
        syncToken = null;
        currentUser = null;
        localStorage.removeItem('html_mastery_auth_token');
        updatePillUI('online', '🟢 SQLite Cloud Sync');
        refreshModalState();
    }

    async function handlePush() {
        const fb = document.getElementById('cloud-sync-feedback');
        if (!isServerAvailable) {
            if (fb) fb.innerHTML = '<span style="color:#f87171;">Server offline. Run `npm start` first.</span>';
            return;
        }
        if (!syncToken) {
            if (fb) fb.innerHTML = '<span style="color:#fbbf24;">Tip: Sign in under "Account" tab to bind sync to your profile!</span>';
        }

        const payload = {
            xp: parseInt(localStorage.getItem('html_mastery_xp') || '0', 10),
            streak: parseInt(localStorage.getItem('html_mastery_streak') || '1', 10),
            completedTopics: JSON.parse(localStorage.getItem('completed_topics') || '[]'),
            bookmarks: JSON.parse(localStorage.getItem('html_mastery_bookmarks') || '[]'),
            savedCode: JSON.parse(localStorage.getItem('html_mastery_saved_code') || '{}'),
            quizScores: JSON.parse(localStorage.getItem('html_mastery_quiz_scores') || '{}')
        };

        if (fb) fb.innerHTML = '<span style="color:#818cf8;">Pushing state to SQLite database...</span>';
        const res = await apiRequest('/api/progress/sync', 'POST', payload);

        if (res.ok) {
            if (fb) fb.innerHTML = '<span style="color:#34d399;">✅ Synced successfully to SQLite database!</span>';
        } else {
            if (fb) fb.innerHTML = `<span style="color:#f87171;">Sync failed: ${res.data?.error || res.error || 'Server error'}</span>`;
        }
    }

    async function handlePull() {
        const fb = document.getElementById('cloud-sync-feedback');
        if (!isServerAvailable) {
            if (fb) fb.innerHTML = '<span style="color:#f87171;">Server offline. Run `npm start` first.</span>';
            return;
        }
        if (!syncToken) {
            if (fb) fb.innerHTML = '<span style="color:#fbbf24;">Please log in under the "Account" tab to pull your cloud data.</span>';
            return;
        }

        if (fb) fb.innerHTML = '<span style="color:#818cf8;">Pulling latest progress from cloud...</span>';
        const res = await apiRequest('/api/progress');

        if (res.ok && res.data.progress) {
            const p = res.data.progress;
            if (p.completedTopics) localStorage.setItem('completed_topics', JSON.stringify(p.completedTopics));
            if (p.xp) localStorage.setItem('html_mastery_xp', p.xp.toString());
            if (p.streak) localStorage.setItem('html_mastery_streak', p.streak.toString());
            if (p.bookmarks) localStorage.setItem('html_mastery_bookmarks', JSON.stringify(p.bookmarks));
            if (p.savedCode) localStorage.setItem('html_mastery_saved_code', JSON.stringify(p.savedCode));

            if (fb) fb.innerHTML = '<span style="color:#34d399;">✅ Progress restored! Reloading dashboard...</span>';
            setTimeout(() => window.location.reload(), 1200);
        } else {
            if (fb) fb.innerHTML = `<span style="color:#f87171;">Pull failed: ${res.data?.error || 'No saved cloud data found'}</span>`;
        }
    }

    async function loadLeaderboard() {
        const list = document.getElementById('cloud-leaderboard-list');
        if (!list) return;

        if (!isServerAvailable) {
            list.innerHTML = '<div style="padding:1.5rem; text-align:center; color:#94a3b8;">Start the backend (<code>npm start</code>) to view the live SQLite leaderboard.</div>';
            return;
        }

        list.innerHTML = '<div style="padding:1.5rem; text-align:center; opacity:0.6;">Loading rankings...</div>';
        const res = await apiRequest('/api/leaderboard');

        if (res.ok && Array.isArray(res.data.leaderboard)) {
            const rows = res.data.leaderboard.map((u, i) => {
                const rankMedal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
                const isTop = i < 3 ? 'top-rank' : '';
                return `
                    <div class="cloud-leaderboard-item ${isTop}">
                        <div style="display:flex; align-items:center; gap:0.75rem;">
                            <span style="font-weight:700; font-size:1.1rem; width:28px;">${rankMedal}</span>
                            <span style="font-size:1.3rem;">${u.avatar || '👨‍💻'}</span>
                            <div>
                                <div style="font-weight:600; font-size:0.92rem;">${u.display_name || u.username}</div>
                                <div style="font-size:0.75rem; color:var(--text-secondary,#94a3b8);">${u.bio || 'Active Learner'}</div>
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-weight:700; color:#fbbf24; font-size:0.95rem;">${u.xp || 0} XP</div>
                            <div style="font-size:0.75rem; color:#818cf8;">Level ${u.level || 1} • 🔥 ${u.streak_count || 1}</div>
                        </div>
                    </div>
                `;
            }).join('');
            list.innerHTML = rows || '<div style="text-align:center; padding:1.5rem;">No learners yet. Be the first!</div>';
        } else {
            list.innerHTML = '<div style="padding:1rem; text-align:center; color:#f87171;">Could not retrieve leaderboard.</div>';
        }
    }

    // Initialize when DOM is ready
    function init() {
        createPill();
        checkBackend();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose client API for other scripts
    window.CloudSync = {
        checkBackend,
        apiRequest,
        push: handlePush,
        pull: handlePull,
        openModal: openSyncModal
    };
})();
