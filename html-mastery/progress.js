/**
 * Student Progress & Gamification System
 * Manages localStorage persistence, schema migration, XP rewards, streak tracking,
 * badge achievements, current lesson bookmarking, saved code, and interactive dashboard UI.
 */

class StudentProgressSystem {
    constructor() {
        this.storageKey = 'student_progress_data_v1';
        this.data = this.loadProgress();

        // Topic lists for progression calculation
        this.htmlTopics = [
            { id: 'introduction', title: '1. Introduction to HTML', url: 'introduction.html' },
            { id: 'basic-html-document', title: '2. Basic HTML Document', url: 'basic-html-document.html' },
            { id: 'html-elements', title: '3. HTML Elements', url: 'html-elements.html' },
            { id: 'attributes', title: '4. Attributes', url: 'attributes.html' },
            { id: 'headings', title: '5. Headings', url: 'headings.html' },
            { id: 'paragraphs-and-basic-text', title: '6. Paragraphs & Text', url: 'paragraphs-and-basic-text.html' },
            { id: 'text-formatting', title: '7. Text Formatting', url: 'text-formatting.html' },
            { id: 'links', title: '8. Links', url: 'links.html' },
            { id: 'buttons-and-links', title: '9. Buttons & Links', url: 'buttons-and-links.html' },
            { id: 'images', title: '10. Images', url: 'images.html' },
            { id: 'lists', title: '11. Lists', url: 'lists.html' },
            { id: 'div-span', title: '12. div & span', url: 'div-span.html' },
            { id: 'semantic-html', title: '13. Semantic HTML', url: 'semantic-html.html' },
            { id: 'tables', title: '14. Tables', url: 'tables.html' },
            { id: 'forms', title: '15. Forms', url: 'forms.html' },
            { id: 'input-types', title: '16. Input Types', url: 'input-types.html' },
            { id: 'textarea', title: '17. Textarea', url: 'textarea.html' },
            { id: 'select-and-dropdown', title: '18. Select & Dropdown', url: 'select-and-dropdown.html' },
            { id: 'form-validation', title: '19. Form Validation', url: 'form-validation.html' },
            { id: 'get-post', title: '20. GET vs POST', url: 'get-post.html' },
            { id: 'audio-and-video', title: '21. Audio & Video', url: 'audio-and-video.html' },
            { id: 'iframe', title: '22. Iframe', url: 'iframe.html' },
            { id: 'figure-and-figcaption', title: '23. Figure & Figcaption', url: 'figure-and-figcaption.html' },
            { id: 'head-section-and-metadata', title: '24. Metadata', url: 'head-section-and-metadata.html' },
            { id: 'open-graph', title: '25. Open Graph', url: 'open-graph.html' },
            { id: 'css-and-javascript-integration', title: '26. CSS & JS Integration', url: 'css-and-javascript-integration.html' },
            { id: 'id-class-and-data', title: '27. id, class, data-*', url: 'id-class-and-data.html' },
            { id: 'accessibility', title: '28. Accessibility', url: 'accessibility.html' },
            { id: 'aria', title: '29. ARIA Attributes', url: 'aria.html' },
            { id: 'responsive-images', title: '30. Responsive Images', url: 'responsive-images.html' },
            { id: 'picture', title: '31. Picture Element', url: 'picture.html' },
            { id: 'lazy-loading', title: '32. Lazy Loading', url: 'lazy-loading.html' },
            { id: 'html-entities', title: '33. HTML Entities', url: 'html-entities.html' },
            { id: 'global-attributes', title: '34. Global Attributes', url: 'global-attributes.html' },
            { id: 'details-and-summary', title: '35. Details & Summary', url: 'details-and-summary.html' },
            { id: 'dialog', title: '36. Dialog Modal', url: 'dialog.html' },
            { id: 'template', title: '37. HTML Template', url: 'template.html' },
            { id: 'svg', title: '38. SVG Graphics', url: 'svg.html' },
            { id: 'canvas', title: '39. HTML Canvas', url: 'canvas.html' },
            { id: 'web-components', title: '40. Web Components', url: 'web-components.html' },
            { id: 'shadow-dom', title: '41. Shadow DOM', url: 'shadow-dom.html' },
            { id: 'script-loading', title: '42. Script Loading', url: 'script-loading.html' },
            { id: 'dom', title: '43. The DOM', url: 'dom.html' },
            { id: 'http-and-html', title: '44. HTTP Protocol', url: 'http-and-html.html' },
            { id: 'browser-rendering', title: '45. Browser Rendering', url: 'browser-rendering.html' },
            { id: 'seo', title: '46. SEO Basics', url: 'seo.html' },
            { id: 'security-basics', title: '47. Web Security', url: 'security-basics.html' },
            { id: 'html-debugging', title: '48. HTML Debugging', url: 'html-debugging.html' },
            { id: 'professional-html-checklist', title: '49. HTML Checklist', url: 'professional-html-checklist.html' },
            { id: 'practice-project', title: '50. Practice Project', url: 'practice-project.html' },
            { id: 'practice-answer', title: '51. Practice Solution', url: 'practice-answer.html' },
            { id: 'questions-and-answers', title: '52. HTML Q&A', url: 'questions-and-answers.html' }
        ];

        this.cssTopics = [
            { id: 'what-is-css', title: '1. What is CSS?', url: 'css.html?topic=what-is-css' },
            { id: 'css-syntax', title: '2. CSS Syntax', url: 'css.html?topic=css-syntax' },
            { id: 'ways-to-add-css', title: '3. Ways to Add CSS', url: 'css.html?topic=ways-to-add-css' },
            { id: 'element-selectors', title: '4. Element Selectors', url: 'css.html?topic=element-selectors' },
            { id: 'class-selectors', title: '5. Class Selectors', url: 'css.html?topic=class-selectors' },
            { id: 'id-selectors', title: '6. ID Selectors', url: 'css.html?topic=id-selectors' },
            { id: 'grouping-selectors', title: '7. Grouping Selectors', url: 'css.html?topic=grouping-selectors' },
            { id: 'combinators', title: '8. CSS Combinators', url: 'css.html?topic=combinators' },
            { id: 'specificity', title: '9. CSS Specificity & The Cascade', url: 'css.html?topic=specificity' },
            { id: 'inheritance', title: '10. CSS Inheritance', url: 'css.html?topic=inheritance' },
            { id: 'colors', title: '11. Colors in CSS', url: 'css.html?topic=colors' },
            { id: 'css-units', title: '12. CSS Units', url: 'css.html?topic=css-units' },
            { id: 'font-properties', title: '13. Font Properties', url: 'css.html?topic=font-properties' },
            { id: 'text-properties', title: '14. Text Properties', url: 'css.html?topic=text-properties' },
            { id: 'web-fonts', title: '15. Web Fonts (Google Fonts)', url: 'css.html?topic=web-fonts' },
            { id: 'css-box-model', title: '16. The CSS Box Model', url: 'css.html?topic=css-box-model' },
            { id: 'box-sizing', title: '17. box-sizing: border-box', url: 'css.html?topic=box-sizing' },
            { id: 'margin', title: '18. Margin & Margin Collapsing', url: 'css.html?topic=margin' },
            { id: 'padding', title: '19. Padding & Spacing', url: 'css.html?topic=padding' },
            { id: 'borders', title: '20. Borders & Border-Radius', url: 'css.html?topic=borders' },
            { id: 'width-and-height', title: '21. Width, Height & Min/Max Constraints', url: 'css.html?topic=width-and-height' },
            { id: 'backgrounds', title: '22. CSS Backgrounds', url: 'css.html?topic=backgrounds' },
            { id: 'gradients', title: '23. CSS Gradients', url: 'css.html?topic=gradients' },
            { id: 'shadows', title: '24. Box Shadow & Text Shadow', url: 'css.html?topic=shadows' },
            { id: 'display', title: '25. The display Property', url: 'css.html?topic=display' },
            { id: 'position', title: '26. CSS Positioning', url: 'css.html?topic=position' },
            { id: 'z-index', title: '27. z-index & Stacking Context', url: 'css.html?topic=z-index' },
            { id: 'overflow', title: '28. The overflow Property', url: 'css.html?topic=overflow' },
            { id: 'flexbox-introduction', title: '29. Flexbox Introduction', url: 'css.html?topic=flexbox-introduction' },
            { id: 'justify-content-align-items', title: '30. justify-content & align-items', url: 'css.html?topic=justify-content-align-items' },
            { id: 'flex-direction-wrap-gap', title: '31. flex-direction, flex-wrap & gap', url: 'css.html?topic=flex-direction-wrap-gap' },
            { id: 'grid-introduction', title: '32. CSS Grid Introduction', url: 'css.html?topic=grid-introduction' },
            { id: 'grid-template-columns', title: '33. Grid Columns, Rows & minmax()', url: 'css.html?topic=grid-template-columns' },
            { id: 'grid-placement', title: '34. Grid Placement & Spanning', url: 'css.html?topic=grid-placement' },
            { id: 'responsive-design', title: '35. Responsive Web Design Principles', url: 'css.html?topic=responsive-design' },
            { id: 'media-queries', title: '36. Media Queries', url: 'css.html?topic=media-queries' },
            { id: 'pseudo-classes', title: '37. Pseudo-classes', url: 'css.html?topic=pseudo-classes' },
            { id: 'pseudo-elements', title: '38. Pseudo-elements', url: 'css.html?topic=pseudo-elements' },
            { id: 'transitions', title: '39. CSS Transitions', url: 'css.html?topic=transitions' },
            { id: 'transform', title: '40. CSS Transforms', url: 'css.html?topic=transform' },
            { id: 'css-animations', title: '41. Keyframe Animations', url: 'css.html?topic=css-animations' },
            { id: 'css-variables', title: '42. CSS Custom Properties (Variables)', url: 'css.html?topic=css-variables' },
            { id: 'css-functions', title: '43. CSS Functions (calc, min, max, clamp)', url: 'css.html?topic=css-functions' },
            { id: 'advanced-selectors', title: '44. Advanced Selectors (:is, :where, :has, [attr])', url: 'css.html?topic=advanced-selectors' },
            { id: 'styling-buttons', title: '45. Styling Buttons & Interactive States', url: 'css.html?topic=styling-buttons' },
            { id: 'styling-forms', title: '46. Styling Forms & Inputs', url: 'css.html?topic=styling-forms' },
            { id: 'navbar-project', title: '47. Project: Responsive Navigation Bar', url: 'css.html?topic=navbar-project' },
            { id: 'card-project', title: '48. Project: Product & Profile Card', url: 'css.html?topic=card-project' },
            { id: 'capstone-project', title: '49. 🏆 Capstone: Full Responsive Landing Page', url: 'css.html?topic=capstone-project' }
        ];

        this.badgeDefinitions = [
            { id: 'first_lesson', name: 'First Lesson', icon: '🏁', description: 'Completed your first lesson topic' },
            { id: 'html_builder', name: 'HTML Builder', icon: '🧱', description: 'Completed 10 HTML topics' },
            { id: 'forms_explorer', name: 'Forms Explorer', icon: '📝', description: 'Mastered HTML forms & input elements' },
            { id: 'semantic_html', name: 'Semantic HTML', icon: '🏷️', description: 'Explored semantic document layout' },
            { id: 'css_explorer', name: 'CSS Explorer', icon: '🎨', description: 'Completed 5 CSS topics' },
            { id: 'box_model_master', name: 'Box Model Master', icon: '📦', description: 'Mastered margin, padding, & border sizing' },
            { id: 'flexbox_explorer', name: 'Flexbox Explorer', icon: '↔️', description: 'Mastered 1D layout flex alignment' },
            { id: 'grid_master', name: 'Grid Master', icon: '▦', description: 'Mastered 2D CSS grid templates' },
            { id: 'responsive_builder', name: 'Responsive Builder', icon: '📱', description: 'Built adaptable layouts with media queries' },
            { id: 'project_builder', name: 'Project Builder', icon: '🚀', description: 'Completed a full practice project' }
        ];

        this.updateDailyStreak();
        this.checkBadges();
    }

    getInitialDefaults() {
        return {
            version: 1,
            completedLessons: [],
            completedExercises: [],
            completedQuizzes: [],
            completedProjects: [],
            quizScores: {},
            xp: 0,
            badges: [],
            currentLesson: { id: 'introduction', title: '1. Introduction to HTML', track: 'html', url: 'introduction.html' },
            savedCode: {},
            bookmarks: [],
            streak: { count: 1, lastVisit: new Date().toISOString().split('T')[0] },
            theme: 'light'
        };
    }

    loadProgress() {
        const defaults = this.getInitialDefaults();
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) {
                return this.migrateLegacyData(defaults);
            }
            const parsed = JSON.parse(raw);
            return {
                ...defaults,
                ...parsed,
                completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : defaults.completedLessons,
                completedExercises: Array.isArray(parsed.completedExercises) ? parsed.completedExercises : defaults.completedExercises,
                completedQuizzes: Array.isArray(parsed.completedQuizzes) ? parsed.completedQuizzes : defaults.completedQuizzes,
                completedProjects: Array.isArray(parsed.completedProjects) ? parsed.completedProjects : defaults.completedProjects,
                quizScores: typeof parsed.quizScores === 'object' && parsed.quizScores !== null ? parsed.quizScores : defaults.quizScores,
                savedCode: typeof parsed.savedCode === 'object' && parsed.savedCode !== null ? parsed.savedCode : defaults.savedCode,
                bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : defaults.bookmarks,
                badges: Array.isArray(parsed.badges) ? parsed.badges : defaults.badges,
                streak: typeof parsed.streak === 'object' && parsed.streak !== null ? parsed.streak : defaults.streak
            };
        } catch (e) {
            return defaults;
        }
    }

    migrateLegacyData(defaults) {
        const migrated = { ...defaults };
        try {
            const legacyTheme = localStorage.getItem('theme');
            if (legacyTheme) migrated.theme = legacyTheme;

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('exercise_completed_')) {
                    if (localStorage.getItem(key) === 'true') {
                        const exId = key.replace('exercise_completed_', '');
                        if (!migrated.completedExercises.includes(exId)) {
                            migrated.completedExercises.push(exId);
                            migrated.xp += 100;
                        }
                    }
                }
            }
            this.saveProgress(migrated);
        } catch (e) {
            // Ignore migration error fallback
        }
        return migrated;
    }

    saveProgress(data = this.data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            // LocalStorage disabled or quota exceeded
        }
    }

    updateDailyStreak() {
        const today = new Date().toISOString().split('T')[0];
        const last = this.data.streak.lastVisit;

        if (!last) {
            this.data.streak = { count: 1, lastVisit: today };
        } else if (last !== today) {
            const lastDate = new Date(last);
            const currentDate = new Date(today);
            const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                this.data.streak.count += 1;
            } else if (diffDays > 1) {
                this.data.streak.count = 1;
            }
            this.data.streak.lastVisit = today;
            this.saveProgress();
        }
    }

    getLevelInfo() {
        const xp = this.data.xp || 0;
        const levels = [
            { min: 0, max: 250, title: 'Novice Learner', icon: '🐣' },
            { min: 250, max: 650, title: 'Apprentice Builder', icon: '🧱' },
            { min: 650, max: 1200, title: 'Web Crafter', icon: '💻' },
            { min: 1200, max: 2000, title: 'Frontend Developer', icon: '🎨' },
            { min: 2000, max: 3500, title: 'Full Stack Architect', icon: '🚀' }
        ];

        let levelNum = 1;
        let currentInfo = levels[0];

        for (let i = 0; i < levels.length; i++) {
            if (xp >= levels[i].min) {
                levelNum = i + 1;
                currentInfo = levels[i];
            }
        }

        if (xp >= 3500) {
            levelNum = 5 + Math.floor((xp - 2000) / 1500);
        }

        const xpInLevel = xp - currentInfo.min;
        const xpNeeded = currentInfo.max - currentInfo.min;
        const percent = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

        return {
            level: levelNum,
            title: currentInfo.title,
            icon: currentInfo.icon,
            xpInLevel,
            xpNeeded,
            percent
        };
    }

    visitLesson(id, title, track, url) {
        if (!id) return;
        this.data.currentLesson = { id, title, track: track || 'html', url: url || `${id}.html` };

        // Deduplicated reward - award XP only on first visit to prevent infinite loops
        if (!this.data.completedLessons.includes(id)) {
            this.data.completedLessons.push(id);
            this.addXP(25, `Lesson Completed: ${title}`);
        } else {
            this.saveProgress();
        }
        this.checkBadges();
    }

    completeExercise(exerciseId, xpReward = 100) {
        if (!exerciseId) return;
        // Deduplicated reward - award XP only on first completion
        if (!this.data.completedExercises.includes(exerciseId)) {
            this.data.completedExercises.push(exerciseId);
            this.addXP(xpReward, 'Exercise Solved!');
            this.checkBadges();
        }
    }

    recordQuizScore(quizId, score, total) {
        if (!quizId) return;
        const percent = Math.round((score / total) * 100);
        const existing = this.data.quizScores[quizId];

        if (!existing || percent > existing.percent) {
            this.data.quizScores[quizId] = {
                score,
                total,
                percent,
                timestamp: Date.now()
            };
        }

        // Deduplicated quiz completion XP reward (only first pass >= 70%)
        if (percent >= 70 && !this.data.completedQuizzes.includes(quizId)) {
            this.data.completedQuizzes.push(quizId);
            this.addXP(150, 'Quiz Mastered!');
            this.checkBadges();
        } else {
            this.saveProgress();
        }
    }

    completeProject(projectId, xpReward = 300) {
        if (!projectId) return;
        // Deduplicated project completion reward
        if (!this.data.completedProjects.includes(projectId)) {
            this.data.completedProjects.push(projectId);
            this.addXP(xpReward, 'Project Completed!');
            this.checkBadges();
        }
    }

    saveCode(exerciseId, code) {
        if (!exerciseId) return;
        this.data.savedCode[exerciseId] = code;
        this.saveProgress();
    }

    toggleBookmark(id, title, url) {
        const idx = this.data.bookmarks.findIndex(b => b.id === id);
        if (idx >= 0) {
            this.data.bookmarks.splice(idx, 1);
        } else {
            this.data.bookmarks.push({ id, title, url });
        }
        this.saveProgress();
        return idx < 0; // returns true if added
    }

    isBookmarked(id) {
        return this.data.bookmarks.some(b => b.id === id);
    }

    addXP(amount, reason = '') {
        if (typeof amount === 'number' && amount > 0) {
            const oldLevel = this.getLevelInfo().level;
            this.data.xp += amount;
            this.saveProgress();
            
            const newLevelInfo = this.getLevelInfo();

            if (newLevelInfo.level > oldLevel) {
                this.showSubtleToast(`Level Up! Level ${newLevelInfo.level}`, `${newLevelInfo.icon} ${newLevelInfo.title}`, '🎉');
            } else if (reason) {
                this.showSubtleToast(`+${amount} XP Earned`, reason, '⭐');
            }

            this.updateHeaderPill();
        }
    }

    checkBadges() {
        const unlocked = new Set(this.data.badges);
        const newlyUnlocked = [];

        const htmlCompletedCount = this.data.completedLessons.filter(id => this.htmlTopics.some(t => t.id === id)).length;
        const cssCompletedCount = this.data.completedLessons.filter(id => this.cssTopics.some(t => t.id === id)).length;

        const badgeConditions = [
            { id: 'first_lesson', cond: this.data.completedLessons.length >= 1 },
            { id: 'html_builder', cond: htmlCompletedCount >= 10 },
            { id: 'forms_explorer', cond: this.data.completedLessons.includes('forms') || this.data.completedLessons.includes('input-types') || this.data.completedExercises.some(ex => ex.includes('form') || ex.includes('input')) },
            { id: 'semantic_html', cond: this.data.completedLessons.includes('semantic-html') || this.data.completedExercises.some(ex => ex.includes('semantic')) },
            { id: 'css_explorer', cond: cssCompletedCount >= 5 },
            { id: 'box_model_master', cond: this.data.completedLessons.includes('box-model') || this.data.completedLessons.includes('css-box-model') || this.data.completedExercises.some(ex => ex.includes('box')) },
            { id: 'flexbox_explorer', cond: this.data.completedLessons.includes('flexbox') || this.data.completedLessons.includes('flexbox-introduction') || this.data.completedExercises.some(ex => ex.includes('flex')) },
            { id: 'grid_master', cond: this.data.completedLessons.includes('grid') || this.data.completedLessons.includes('grid-introduction') || this.data.completedExercises.some(ex => ex.includes('grid')) },
            { id: 'responsive_builder', cond: this.data.completedLessons.includes('responsive-design') || this.data.completedLessons.includes('media-queries') || this.data.completedExercises.some(ex => ex.includes('responsive')) },
            { id: 'project_builder', cond: this.data.completedLessons.includes('practice-project') || this.data.completedLessons.includes('mini-projects') || this.data.completedLessons.includes('navbar-project') || this.data.completedLessons.includes('card-project') || this.data.completedLessons.includes('capstone-project') || this.data.completedProjects.length >= 1 }
        ];

        badgeConditions.forEach(b => {
            if (b.cond && !unlocked.has(b.id)) {
                unlocked.add(b.id);
                const badgeDef = this.badgeDefinitions.find(bd => bd.id === b.id);
                if (badgeDef) {
                    newlyUnlocked.push(badgeDef);
                }
            }
        });

        this.data.badges = Array.from(unlocked);
        this.saveProgress();

        newlyUnlocked.forEach(bd => {
            this.showSubtleToast(`Badge Unlocked!`, `${bd.icon} ${bd.name}`, '🏆');
        });
    }

    showSubtleToast(title, text, icon = '✨') {
        let container = document.getElementById('subtle-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'subtle-toast-container';
            container.className = 'subtle-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'subtle-toast';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <div class="toast-body">
                <strong class="toast-title">${title}</strong>
                <span class="toast-desc">${text}</span>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 400);
        }, 3200);
    }

    // Progression Statistics
    getHTMLProgress() {
        const completedHtml = this.htmlTopics.filter(t => this.data.completedLessons.includes(t.id)).length;
        const total = this.htmlTopics.length;
        const percent = Math.round((completedHtml / total) * 100);
        return { completed: completedHtml, total, percent };
    }

    getCSSProgress() {
        const completedCss = this.cssTopics.filter(t => this.data.completedLessons.includes(t.id)).length;
        const total = this.cssTopics.length;
        const percent = Math.round((completedCss / total) * 100);
        return { completed: completedCss, total, percent };
    }

    getOverallProgress() {
        const totalLessons = this.htmlTopics.length + this.cssTopics.length;
        const totalCompleted = this.data.completedLessons.length;
        const percent = Math.round((totalCompleted / totalLessons) * 100);
        return { completed: totalCompleted, total: totalLessons, percent };
    }

    getNextRecommendedLesson() {
        for (let t of this.htmlTopics) {
            if (!this.data.completedLessons.includes(t.id)) {
                return { ...t, track: 'HTML' };
            }
        }
        for (let t of this.cssTopics) {
            if (!this.data.completedLessons.includes(t.id)) {
                return { ...t, track: 'CSS' };
            }
        }
        return { title: 'All Lessons Mastered!', url: 'introduction.html', track: 'HTML' };
    }

    getRecentlyCompleted(limit = 6) {
        const allTopics = [...this.htmlTopics, ...this.cssTopics];
        const completed = this.data.completedLessons || [];
        return completed
            .slice(-limit)
            .reverse()
            .map(id => allTopics.find(t => t.id === id))
            .filter(Boolean);
    }

    renderAsciiBar(percent) {
        const totalBlocks = 16;
        const filledBlocks = Math.round((percent / 100) * totalBlocks);
        const emptyBlocks = totalBlocks - filledBlocks;
        return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks) + ` ${percent}%`;
    }

    // Renders the Dashboard Overlay / Modal
    renderDashboardModal() {
        let modal = document.getElementById('student-dashboard-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'student-dashboard-modal';
            modal.className = 'dashboard-modal-overlay';
            document.body.appendChild(modal);
        }

        const htmlProg = this.getHTMLProgress();
        const cssProg = this.getCSSProgress();
        const overallProg = this.getOverallProgress();
        const nextLesson = this.getNextRecommendedLesson();
        const currLesson = this.data.currentLesson;
        const lvl = this.getLevelInfo();

        const badgesHTML = this.badgeDefinitions.map(b => {
            const isUnlocked = this.data.badges.includes(b.id);
            return `
                <div class="badge-item ${isUnlocked ? 'badge-unlocked' : 'badge-locked'}" title="${b.description}">
                    <span class="badge-icon">${b.icon}</span>
                    <span class="badge-name">${b.name}</span>
                    <span class="badge-status">${isUnlocked ? 'Unlocked' : 'Locked'}</span>
                </div>
            `;
        }).join('');

        const bookmarksHTML = this.data.bookmarks.length > 0 ? this.data.bookmarks.map(b => `
            <a href="${b.url}" class="bookmark-chip">
                <span>🔖</span> ${b.title}
            </a>
        `).join('') : '<p class="no-bookmarks">No bookmarked lessons yet. Click the 🔖 icon on any lesson to save it!</p>';

        modal.innerHTML = `
            <div class="dashboard-modal-card">
                <div class="dashboard-modal-header">
                    <div class="dash-title-group">
                        <span class="dash-icon">📊</span>
                        <h2>Student Learning Dashboard</h2>
                    </div>
                    <button type="button" class="btn-close-dashboard" id="btn_close_dash">✕</button>
                </div>

                <!-- Level Banner -->
                <div class="dash-card level-banner-card">
                    <div class="level-header-row">
                        <div class="level-badge-title">
                            <span class="level-icon">${lvl.icon}</span>
                            <div>
                                <span class="level-num">Level ${lvl.level}</span>
                                <h3 class="level-title-name">${lvl.title}</h3>
                            </div>
                        </div>
                        <div class="level-xp-counter">
                            <strong>${this.data.xp.toLocaleString()} XP</strong>
                        </div>
                    </div>
                    <div class="dash-progress-track level-track">
                        <div class="dash-progress-fill level-fill" style="width:${lvl.percent}%;"></div>
                    </div>
                    <div class="level-sub-text">
                        <span>Level Progress: ${lvl.xpInLevel} / ${lvl.xpNeeded} XP</span>
                        <span>${lvl.percent}%</span>
                    </div>
                </div>

                <div class="dashboard-grid-summary">
                    <!-- Progress Card -->
                    <div class="dash-card progress-summary-card">
                        <h3>Curriculum Progress</h3>

                        <div class="progress-track-group">
                            <div class="track-label-row">
                                <strong>HTML Mastery</strong>
                                <span class="ascii-bar">${this.renderAsciiBar(htmlProg.percent)}</span>
                            </div>
                            <div class="dash-progress-track">
                                <div class="dash-progress-fill html-fill" style="width:${htmlProg.percent}%;"></div>
                            </div>
                        </div>

                        <div class="progress-track-group" style="margin-top: 1rem;">
                            <div class="track-label-row">
                                <strong>CSS Mastery</strong>
                                <span class="ascii-bar">${this.renderAsciiBar(cssProg.percent)}</span>
                            </div>
                            <div class="dash-progress-track">
                                <div class="dash-progress-fill css-fill" style="width:${cssProg.percent}%;"></div>
                            </div>
                        </div>

                        <div class="progress-track-group" style="margin-top: 1rem;">
                            <div class="track-label-row">
                                <strong>Overall Total Progress</strong>
                                <span>${overallProg.completed}/${overallProg.total} Lessons (${overallProg.percent}%)</span>
                            </div>
                            <div class="dash-progress-track">
                                <div class="dash-progress-fill overall-fill" style="width:${overallProg.percent}%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Card -->
                    <div class="dash-card stats-summary-card">
                        <h3>Gamification Stats</h3>
                        <div class="stats-mini-grid">
                            <div class="mini-stat-box">
                                <span class="stat-emoji">🔥</span>
                                <span class="stat-val">${this.data.streak.count} Days</span>
                                <span class="stat-name">Current Streak</span>
                            </div>
                            <div class="mini-stat-box">
                                <span class="stat-emoji">⭐</span>
                                <span class="stat-val">${this.data.xp.toLocaleString()} XP</span>
                                <span class="stat-name">Total XP</span>
                            </div>
                            <div class="mini-stat-box">
                                <span class="stat-emoji">🧪</span>
                                <span class="stat-val">${this.data.completedExercises.length}</span>
                                <span class="stat-name">Exercises Solved</span>
                            </div>
                            <div class="mini-stat-box">
                                <span class="stat-emoji">🏆</span>
                                <span class="stat-val">${this.data.badges.length} / ${this.badgeDefinitions.length}</span>
                                <span class="stat-name">Badges Unlocked</span>
                            </div>
                        </div>
                    </div>

                    <!-- Current & Next Navigation Card -->
                    <div class="dash-card nav-summary-card">
                        <h3>Lesson Navigator</h3>
                        <div class="nav-topic-box current-topic-box">
                            <span class="nav-tag">CURRENT LESSON</span>
                            <h4>${currLesson ? currLesson.title : '1. Introduction to HTML'}</h4>
                            <a href="${currLesson ? currLesson.url : 'introduction.html'}" class="btn-jump-lesson">Resume Lesson →</a>
                        </div>
                        <div class="nav-topic-box next-topic-box" style="margin-top:0.75rem;">
                            <span class="nav-tag tag-next">NEXT RECOMMENDED</span>
                            <h4>${nextLesson.title}</h4>
                            <a href="${nextLesson.url}" class="btn-jump-lesson btn-next-jump">Start Next →</a>
                        </div>
                    </div>

                    <!-- Achievements & Badges Card -->
                    <div class="dash-card badges-summary-card">
                        <h3>Achievements & Badges</h3>
                        <div class="badges-grid-container">
                            ${badgesHTML}
                        </div>
                    </div>
                </div>

                <!-- Bookmarks Footer -->
                <div class="dashboard-bookmarks-section">
                    <h4>🔖 Bookmarked Topics:</h4>
                    <div class="bookmarks-chips-list">
                        ${bookmarksHTML}
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');

        document.getElementById('btn_close_dash').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    updateHeaderPill() {
        const btn = document.getElementById('btn-open-dashboard');
        if (btn) {
            const lvl = this.getLevelInfo();
            const pill = btn.querySelector('.xp-pill');
            if (pill) {
                pill.textContent = `Lv.${lvl.level} · ${this.data.xp} XP`;
            }
        }
    }

    mountDashboardButton() {
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.getElementById('btn-open-dashboard')) {
            const lvl = this.getLevelInfo();
            const dashBtn = document.createElement('button');
            dashBtn.id = 'btn-open-dashboard';
            dashBtn.type = 'button';
            dashBtn.className = 'button secondary-button dash-trigger-btn';
            dashBtn.innerHTML = `📊 <span class="dash-btn-text">Dashboard</span> <span class="xp-pill">Lv.${lvl.level} · ${this.data.xp} XP</span>`;

            dashBtn.addEventListener('click', () => {
                this.renderDashboardModal();
            });

            headerActions.insertBefore(dashBtn, headerActions.firstChild);
        }
    }
}

// Instantiate global singleton
window.progressSystem = new StudentProgressSystem();
