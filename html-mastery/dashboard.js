/**
 * Dashboard.js — Active Learning Dashboard
 * Reads from window.progressSystem (progress.js singleton).
 * Manages: greeting, daily goal, progress bars, challenge of day,
 * next lesson, recently completed, bookmarks, saved code, focus mode.
 */

(function () {
    'use strict';

    // ─── Challenge Pool ───────────────────────────────────────────────────────
    // Daily challenges: seeded by date so everyone gets the same one per day.
    // Falls back gracefully if quiz-data.js is not loaded.
    const CHALLENGES = [
        { q: 'Build a responsive navigation bar using only HTML & CSS Flexbox.', topic: 'CSS Flexbox', url: 'css.html?topic=flexbox', difficulty: 'Intermediate' },
        { q: 'Create a personal bio card with a profile picture, name, and two-sentence description.', topic: 'HTML Structure', url: 'introduction.html', difficulty: 'Beginner' },
        { q: 'Build a 3-column CSS Grid layout that collapses to 1 column on mobile.', topic: 'CSS Grid', url: 'css.html?topic=grid', difficulty: 'Intermediate' },
        { q: 'Write a semantic HTML article with proper heading hierarchy (h1→h2→h3).', topic: 'Semantic HTML', url: 'semantic-html.html', difficulty: 'Beginner' },
        { q: 'Create a contact form with name, email, message fields, and a submit button.', topic: 'HTML Forms', url: 'forms.html', difficulty: 'Beginner' },
        { q: 'Style a pricing card with a highlight effect on hover using CSS transitions.', topic: 'CSS Transitions', url: 'css.html?topic=transitions', difficulty: 'Intermediate' },
        { q: 'Build a sticky header that stays at the top as the user scrolls.', topic: 'CSS Position', url: 'css.html?topic=position', difficulty: 'Intermediate' },
        { q: 'Create an accessible image gallery with proper alt text and figure elements.', topic: 'Accessibility', url: 'accessibility.html', difficulty: 'Beginner' },
        { q: 'Write a CSS-only dark mode toggle using a checkbox and the ~ sibling selector.', topic: 'CSS Advanced', url: 'css.html?topic=pseudo-classes', difficulty: 'Advanced' },
        { q: 'Build a responsive card layout: 4 cards per row on desktop, 1 on mobile.', topic: 'Responsive Design', url: 'css.html?topic=responsive-design', difficulty: 'Intermediate' },
        { q: 'Create a CSS loading spinner animation using @keyframes.', topic: 'CSS Animations', url: 'css.html?topic=animations', difficulty: 'Intermediate' },
        { q: 'Build a table listing 5 HTML elements with tag name, type, and description columns.', topic: 'HTML Tables', url: 'tables.html', difficulty: 'Beginner' },
        { q: 'Create a multi-step form with 3 fieldsets and a progress indicator.', topic: 'HTML Forms', url: 'forms.html', difficulty: 'Advanced' },
        { q: 'Style a blockquote to look like a pull-quote using CSS box-shadow and borders.', topic: 'CSS Styling', url: 'css.html?topic=borders', difficulty: 'Beginner' },
        { q: 'Build a CSS-only accordion (details/summary) with animated open/close.', topic: 'HTML Details', url: 'details-and-summary.html', difficulty: 'Intermediate' },
        { q: 'Create a hero section with a centered headline, subtext, and two CTA buttons.', topic: 'CSS Layout', url: 'css.html?topic=flexbox', difficulty: 'Beginner' },
        { q: 'Add ARIA labels to a navigation menu to make it fully screen-reader accessible.', topic: 'ARIA', url: 'aria.html', difficulty: 'Intermediate' },
        { q: 'Build a responsive image using the picture element with 3 different breakpoints.', topic: 'Responsive Images', url: 'responsive-images.html', difficulty: 'Intermediate' },
        { q: 'Create a CSS variable system with 5 custom color tokens and use them on a card.', topic: 'CSS Variables', url: 'css.html?topic=css-variables', difficulty: 'Beginner' },
        { q: 'Build a sidebar layout using CSS Grid with a fixed 260px sidebar and fluid main area.', topic: 'CSS Grid', url: 'css.html?topic=grid', difficulty: 'Advanced' },
        { q: 'Write a skip navigation link for keyboard accessibility at the top of a page.', topic: 'Accessibility', url: 'accessibility.html', difficulty: 'Beginner' },
        { q: 'Create a progress bar using only CSS that fills up based on a data-percent attribute.', topic: 'CSS', url: 'css.html?topic=pseudo-elements', difficulty: 'Intermediate' },
        { q: 'Build a breadcrumb navigation component using an ordered list and CSS.', topic: 'HTML Semantics', url: 'semantic-html.html', difficulty: 'Beginner' },
        { q: 'Create a notification badge (red circle with a number) using CSS positioning.', topic: 'CSS Position', url: 'css.html?topic=position', difficulty: 'Intermediate' },
        { q: 'Build an HTML email template with a 2-column layout using table-based layout.', topic: 'HTML Tables', url: 'tables.html', difficulty: 'Advanced' },
        { q: 'Style a select dropdown to match a custom design using CSS appearance property.', topic: 'Forms & CSS', url: 'select-and-dropdown.html', difficulty: 'Intermediate' },
        { q: 'Create a CSS tooltip that appears above an element on hover without JavaScript.', topic: 'CSS Advanced', url: 'css.html?topic=pseudo-elements', difficulty: 'Intermediate' },
        { q: 'Build a login form with proper labels, input types, and focus styles.', topic: 'HTML Forms', url: 'forms.html', difficulty: 'Beginner' },
        { q: 'Create a CSS-only star rating component using radio inputs and the ~ selector.', topic: 'CSS Advanced', url: 'css.html?topic=pseudo-classes', difficulty: 'Advanced' },
        { q: 'Build a timeline layout using Flexbox with alternating left/right entries.', topic: 'CSS Flexbox', url: 'css.html?topic=flexbox', difficulty: 'Advanced' },
    ];

    // Lesson descriptions for the "Recommended Next" widget
    const LESSON_DESCS = {
        'introduction': 'What HTML is, why it matters, and how browsers render pages.',
        'basic-html-document': 'DOCTYPE, html, head, body — the essential document skeleton.',
        'html-elements': 'Tags, elements, and the building blocks of every webpage.',
        'attributes': 'Add extra info to tags: href, src, id, class, style, and more.',
        'headings': 'h1–h6 hierarchy for structure, SEO, and accessibility.',
        'semantic-html': 'Use meaningful tags that describe their content to browsers and screen readers.',
        'forms': 'Create interactive forms with inputs, labels, and submit buttons.',
        'flexbox': 'One-dimensional layout — align items in rows or columns with ease.',
        'grid': 'Two-dimensional CSS layout for complex page structures.',
        'responsive-design': 'Build layouts that work on any screen size.',
        'media-queries': 'Apply different CSS rules at different viewport sizes.',
        'accessibility': 'Make your web pages usable for everyone, including people using assistive technology.',
    };

    // ─── Utility helpers ─────────────────────────────────────────────────────
    const $ = (id) => document.getElementById(id);
    const setText = (id, text) => { const el = $(id); if (el) el.textContent = text; };
    const setHTML = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };
    const show = (id) => { const el = $(id); if (el) el.classList.remove('hidden'); };
    const hide = (id) => { const el = $(id); if (el) el.classList.add('hidden'); };

    // Storage keys & safe wrappers
    const GOAL_KEY = 'db_daily_goal';
    const GOAL_DONE_KEY = 'db_goal_done_date';
    const FOCUS_KEY = 'db_focus_mode';
    const CHALLENGE_SKIP_KEY = 'db_challenge_skip';

    function safeGet(key, fallback = null) {
        try {
            return localStorage.getItem(key) ?? fallback;
        } catch (_) {
            return fallback;
        }
    }

    function safeSet(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (_) {
            // Storage quota or privacy sandbox blocked
        }
    }

    // ─── Greeting ─────────────────────────────────────────────────────────────
    function renderGreeting(p) {
        const hour = new Date().getHours();
        const timeGreet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
        const streak = p.data.streak.count;
        const name = p.data.name || '';

        let greetSuffix = name ? `, ${name}` : '';
        setText('db-greeting', `${timeGreet}${greetSuffix} 👋`);

        let subMsg;
        if (streak >= 7) {
            subMsg = `🔥 ${streak}-day streak! You're on fire. Keep the momentum going.`;
        } else if (streak >= 3) {
            subMsg = `Great consistency — ${streak} days in a row. Every lesson counts.`;
        } else if (p.data.completedLessons.length === 0) {
            subMsg = 'Ready to start your web development journey? Let\'s build something great.';
        } else {
            subMsg = 'Ready to keep building? Your learning journey continues here.';
        }
        setText('db-sub', subMsg);
    }

    // ─── Hero Stats (Streak + XP + Level bar) ─────────────────────────────────
    function renderHeroStats(p) {
        const lvl = p.getLevelInfo();
        setText('hero-streak', p.data.streak.count);
        setText('hero-xp', p.data.xp.toLocaleString());
        setText('hero-level', `XP · Lv.${lvl.level}`);
        setText('hero-level-title', `${lvl.icon} ${lvl.title}`);
        setText('hero-level-xp-text', `${lvl.xpInLevel.toLocaleString()} / ${lvl.xpNeeded.toLocaleString()} XP to next level`);

        // Animate the bar in after a short delay
        requestAnimationFrame(() => {
            setTimeout(() => {
                const fill = $('hero-level-fill');
                if (fill) fill.style.width = lvl.percent + '%';
            }, 120);
        });
    }

    // ─── Continue Learning ────────────────────────────────────────────────────
    function renderContinue(p) {
        const cur = p.data.currentLesson;
        if (!cur) return;
        setText('db-continue-lesson', cur.title);
        setText('db-continue-track', (cur.track === 'css' ? 'CSS' : 'HTML') + ' Track');
        const btn = $('db-continue-btn');
        if (btn) btn.href = cur.url;
    }

    // ─── Daily Goal ───────────────────────────────────────────────────────────
    function renderGoal() {
        const today = new Date().toISOString().split('T')[0];
        const savedGoal = safeGet(GOAL_KEY, 'Complete 1 lesson today');
        const doneDate = safeGet(GOAL_DONE_KEY);
        const isDone = doneDate === today;

        setText('db-goal-text', savedGoal);

        if (isDone) {
            hide('db-goal-display');
            show('db-goal-done-state');
        }

        // Edit button
        const editBtn = $('db-goal-edit-btn');
        if (editBtn) editBtn.addEventListener('click', () => {
            const form = $('db-goal-edit-form');
            const disp = $('db-goal-display');
            if (form && disp) {
                disp.classList.add('hidden');
                form.classList.remove('hidden');
                const inp = $('db-goal-input');
                if (inp) { inp.value = safeGet(GOAL_KEY, ''); inp.focus(); }
            }
        });

        // Save button
        const saveBtn = $('db-goal-save-btn');
        if (saveBtn) saveBtn.addEventListener('click', () => {
            const inp = $('db-goal-input');
            const val = inp ? inp.value.trim() : '';
            if (val) {
                safeSet(GOAL_KEY, val);
                setText('db-goal-text', val);
            }
            hide('db-goal-edit-form');
            show('db-goal-display');
        });

        // Done button
        const doneBtn = $('db-goal-done-btn');
        if (doneBtn) doneBtn.addEventListener('click', () => {
            safeSet(GOAL_DONE_KEY, today);
            hide('db-goal-display');
            hide('db-goal-edit-form');
            show('db-goal-done-state');
            // Award small XP for completing daily goal
            if (window.progressSystem) {
                window.progressSystem.addXP(10, 'Daily Goal Complete!');
            }
        });
    }

    // ─── Progress Bars ────────────────────────────────────────────────────────
    function renderProgress(p) {
        const html = p.getHTMLProgress();
        const css = p.getCSSProgress();
        const overall = p.getOverallProgress();

        setText('html-pct', html.percent + '%');
        setText('css-pct', css.percent + '%');
        setText('overall-pct', overall.percent + '%');
        setText('html-detail', `${html.completed} of ${html.total} lessons completed`);
        setText('css-detail', `${css.completed} of ${css.total} lessons completed`);
        setText('overall-detail', `${overall.completed} of ${overall.total} total lessons completed`);

        // Animate bars in
        requestAnimationFrame(() => {
            setTimeout(() => {
                const hf = $('html-fill');
                const cf = $('css-fill');
                const of = $('overall-fill');
                if (hf) hf.style.width = html.percent + '%';
                if (cf) cf.style.width = css.percent + '%';
                if (of) of.style.width = overall.percent + '%';
            }, 200);
        });
    }

    // ─── Challenge of the Day ─────────────────────────────────────────────────
    function getDayIndex() {
        // Same challenge for entire day; changes at midnight
        const skipStr = safeGet(CHALLENGE_SKIP_KEY, '0');
        const skipCount = parseInt(skipStr, 10) || 0;
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        return (dayOfYear + skipCount) % CHALLENGES.length;
    }

    function renderChallenge() {
        const idx = getDayIndex();
        const ch = CHALLENGES[idx];

        // Date label
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        setText('db-challenge-date', dateStr);
        setText('db-challenge-q', ch.q);
        setText('db-challenge-meta', `Topic: ${ch.topic} · ${ch.difficulty}`);

        const btn = $('db-challenge-btn');
        if (btn) btn.href = ch.url;

        // Skip button — rotates to next challenge
        const skipBtn = $('db-challenge-skip');
        if (skipBtn) skipBtn.addEventListener('click', () => {
            const cur = parseInt(safeGet(CHALLENGE_SKIP_KEY, '0'), 10);
            safeSet(CHALLENGE_SKIP_KEY, cur + 1);
            renderChallenge();
        });
    }

    // ─── Recommended Next Lesson ─────────────────────────────────────────────
    function renderNextLesson(p) {
        const next = p.getNextRecommendedLesson();
        if (!next || !next.title) return;

        const trackEl = $('db-next-track');
        if (trackEl) {
            trackEl.textContent = next.track || 'HTML';
            trackEl.className = 'db-next-track-badge db-next-track-' + (next.track || 'HTML').toLowerCase();
        }

        setText('db-next-title', next.title);
        const desc = LESSON_DESCS[next.id] || 'Continue building your web development skills.';
        setText('db-next-desc', desc);

        const btn = $('db-next-btn');
        if (btn) btn.href = next.url;
    }

    // ─── Recently Completed ───────────────────────────────────────────────────
    function renderRecentlyCompleted(p) {
        // Use progress.js method if available, otherwise fall back to manual lookup
        const recent = (typeof p.getRecentlyCompleted === 'function')
            ? p.getRecentlyCompleted(6)
            : (() => {
                const allTopics = [...(p.htmlTopics || []), ...(p.cssTopics || [])];
                return (p.data.completedLessons || []).slice(-6).reverse().map(id => allTopics.find(t => t.id === id)).filter(Boolean);
            })();

        const listEl = $('db-recent-list');
        if (!listEl) return;
        if (recent.length === 0) return; // keep the default empty state HTML

        listEl.innerHTML = recent.map(topic => `
            <li class="db-recent-item">
                <span class="db-recent-check">&#x2713;</span>
                <a href="${topic.url}" class="db-recent-link">${topic.title}</a>
            </li>
        `).join('');
    }

    // ─── Bookmarks ────────────────────────────────────────────────────────────
    function renderBookmarks(p) {
        const bookmarks = p.data.bookmarks || [];
        const container = $('db-bookmarks-list');
        if (!container) return;

        if (bookmarks.length === 0) {
            container.innerHTML = '<p class="db-empty-state">No bookmarks yet. Click <strong>&#x1F516;</strong> on any lesson to save it here.</p>';
            return;
        }

        container.innerHTML = bookmarks.map(b => `
            <div class="db-bookmark-chip">
                <a href="${b.url}" class="db-bookmark-link">
                    <span class="db-bm-icon">&#x1F516;</span>
                    <span>${b.title}</span>
                </a>
                <button class="db-bm-remove" data-id="${b.id}" aria-label="Remove bookmark" title="Remove">&#x2715;</button>
            </div>
        `).join('');

        // Remove bookmark buttons
        container.querySelectorAll('.db-bm-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const bm = bookmarks.find(b => b.id === id);
                if (bm) {
                    p.toggleBookmark(bm.id, bm.title, bm.url);
                    renderBookmarks(p);
                }
            });
        });
    }

    // ─── Saved Code ───────────────────────────────────────────────────────────
    function renderSavedCode(p) {
        const savedCode = p.data.savedCode || {};
        const keys = Object.keys(savedCode);
        const countEl = $('db-savedcode-count');
        if (countEl) countEl.textContent = `${keys.length} saved`;

        const toggle = $('db-savedcode-toggle');
        const body = $('db-savedcode-body');

        if (toggle && body) {
            toggle.addEventListener('click', () => {
                const isOpen = !body.classList.contains('hidden');
                body.classList.toggle('hidden', isOpen);
                toggle.setAttribute('aria-expanded', !isOpen);
                toggle.classList.toggle('db-toggle-open', !isOpen);
            });
        }

        const listEl = $('db-savedcode-list');
        if (!listEl) return;

        if (keys.length === 0) {
            listEl.innerHTML = '<p class="db-empty-state">No saved code yet. Write code in any exercise and click "Save Code".</p>';
            return;
        }

        const allTopics = [...(p.htmlTopics || []), ...(p.cssTopics || [])];

        listEl.innerHTML = keys.map(exId => {
            const code = savedCode[exId];
            const topic = allTopics.find(t => t.id === exId) || { title: exId, url: 'introduction.html' };
            const short = typeof code === 'string' ? code.slice(0, 280) : '';
            return `
                <div class="db-code-snippet">
                    <div class="db-code-snip-header">
                        <span class="db-code-snip-title">
                            <a href="${topic.url}">${topic.title}</a>
                        </span>
                        <button class="db-code-copy-btn" data-code="${encodeURIComponent(code || '')}" title="Copy code">Copy</button>
                    </div>
                    <pre class="db-code-pre"><code>${escapeHtml(short)}${code && code.length > 280 ? '\n...' : ''}</code></pre>
                </div>
            `;
        }).join('');

        // Copy buttons
        listEl.querySelectorAll('.db-code-copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = decodeURIComponent(btn.dataset.code || '');
                navigator.clipboard.writeText(code).then(() => {
                    btn.textContent = 'Copied!';
                    setTimeout(() => btn.textContent = 'Copy', 1800);
                }).catch(() => {
                    btn.textContent = 'Failed';
                });
            });
        });
    }

    function escapeHtml(str) {
        return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ─── Focus Mode ───────────────────────────────────────────────────────────
    function initFocusMode() {
        const isFocus = sessionStorage.getItem(FOCUS_KEY) === '1';
        if (isFocus) applyFocusMode(true);

        const btn = $('focus-mode-btn');
        if (btn) btn.addEventListener('click', () => {
            const current = sessionStorage.getItem(FOCUS_KEY) === '1';
            applyFocusMode(!current);
        });

        const exitBtn = $('db-exit-focus');
        if (exitBtn) exitBtn.addEventListener('click', () => applyFocusMode(false));
    }

    function applyFocusMode(on) {
        sessionStorage.setItem(FOCUS_KEY, on ? '1' : '0');
        document.body.classList.toggle('db-focus-mode', on);
        const hint = $('db-focus-hint');
        if (hint) hint.classList.toggle('hidden', !on);

        const btn = $('focus-mode-btn');
        if (btn) {
            btn.setAttribute('aria-pressed', on);
            btn.title = on ? 'Exit Focus Mode' : 'Focus Mode — hide distractions';
            btn.style.color = on ? 'var(--accent-color)' : '';
        }
    }

    // ─── Mount Dashboard Button in header (same as lesson pages) ─────────────
    function mountDashboardHeaderItems(p) {
        // Mount the XP pill if progress.js hasn't already
        if (p.mountDashboardButton) p.mountDashboardButton();
    }

    // ─── Init ─────────────────────────────────────────────────────────────────
    function init() {
        const p = window.progressSystem;
        if (!p) {
            console.warn('[Dashboard] progress.js not loaded yet, retrying...');
            setTimeout(init, 200);
            return;
        }

        renderGreeting(p);
        renderHeroStats(p);
        renderContinue(p);
        renderGoal();
        renderProgress(p);
        renderChallenge();
        renderNextLesson(p);
        renderRecentlyCompleted(p);
        renderBookmarks(p);
        renderSavedCode(p);
        initFocusMode();
        mountDashboardHeaderItems(p);
    }

    // Wait for DOM + progress.js
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
