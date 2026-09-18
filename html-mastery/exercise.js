/**
 * Reusable Exercise System
 * Comprehensive challenge framework supporting:
 * - Instructions & Objectives
 * - Difficulty Tiers (🟢 Easy, 🟡 Medium, 🔴 Hard)
 * - Starter & Editable code (integrated InteractiveCodeEditor)
 * - Live sandboxed execution
 * - Automated declarative test validation checklist
 * - 4-Level Progressive Hint System (integrated ProgressiveHintSystem)
 * - Solution reveal with code & explanation
 * - Completion tracking & XP rewards
 */

class ExerciseSystem {
    constructor(options = {}) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;

        if (!this.container) {
            console.warn('ExerciseSystem: Container element not found', options.container);
            return;
        }

        this.id = options.id || 'exercise_' + Math.random().toString(36).substr(2, 9);
        this.title = options.title || 'Practice Challenge';
        this.instructions = options.instructions || options.instruction || 'Complete the challenge requirements in the editor below.';
        this.difficulty = this.normalizeDifficulty(options.difficulty || 'Easy');
        this.baseXP = this.calculateBaseXP(this.difficulty);

        this.starterHTML = options.starterHTML !== undefined ? options.starterHTML : (options.starterCode || '<h1>Hello World</h1>\n<p>Start coding...</p>');
        this.starterCSS = options.starterCSS !== undefined ? options.starterCSS : '';
        this.showCSS = options.showCSS !== undefined ? options.showCSS : true;

        this.validationRules = Array.isArray(options.validationRules) ? options.validationRules : [];
        this.customValidation = typeof options.validation === 'function' ? options.validation : null;

        this.hints = Array.isArray(options.hints) ? options.hints : [];
        this.solutionHTML = options.solutionHTML !== undefined ? options.solutionHTML : (options.solution || '');
        this.solutionCSS = options.solutionCSS || '';
        this.solutionExplanation = options.solutionExplanation || options.explanation || 'Review the completed code above.';

        this.storageKey = `exercise_completed_${this.id}`;
        this.isCompleted = false;
        this.loadState();

        this.editor = null;
        this.hintSystem = null;
        this.validationResults = [];

        this.render();
    }

    normalizeDifficulty(diff) {
        const lower = (diff || '').toString().toLowerCase().trim();
        if (lower.includes('hard') || lower.includes('advanced')) return 'Hard';
        if (lower.includes('med') || lower.includes('intermediate')) return 'Medium';
        return 'Easy';
    }

    calculateBaseXP(difficulty) {
        if (difficulty === 'Hard') return 200;
        if (difficulty === 'Medium') return 150;
        return 100;
    }

    getDifficultyBadge(difficulty) {
        if (difficulty === 'Hard') {
            return `<span class="difficulty-badge badge-hard" title="Hard Challenge · Advanced Concepts">🔴 Hard</span>`;
        }
        if (difficulty === 'Medium') {
            return `<span class="difficulty-badge badge-medium" title="Medium Challenge · Intermediate Concepts">🟡 Medium</span>`;
        }
        return `<span class="difficulty-badge badge-easy" title="Easy Challenge · Beginner Fundamentals">🟢 Easy</span>`;
    }

    loadState() {
        try {
            this.isCompleted = localStorage.getItem(this.storageKey) === 'true';
        } catch (e) {
            this.isCompleted = false;
        }
    }

    saveState(passed) {
        try {
            localStorage.setItem(this.storageKey, passed ? 'true' : 'false');
            this.isCompleted = passed;
        } catch (e) {
            // LocalStorage might be disabled
        }
    }

    render() {
        this.container.classList.add('exercise-system-root');
        this.container.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-title-group">
                    <span class="exercise-icon">🧪</span>
                    <h2 class="exercise-title">${this.escapeHTML(this.title)}</h2>
                    ${this.getDifficultyBadge(this.difficulty)}
                </div>
                <div class="exercise-status-badge ${this.isCompleted ? 'status-completed' : 'status-pending'}">
                    ${this.isCompleted ? '✅ Challenge Completed' : '⏳ Challenge In Progress'}
                </div>
            </div>

            <!-- Task Instructions -->
            <div class="card practice-card exercise-instruction-card">
                <div class="card-icon">🎯</div>
                <div class="card-content">
                    <strong>Task Objectives:</strong>
                    <div class="instruction-body">${this.instructions}</div>
                </div>
            </div>

            <!-- Live Code Editor Sandbox Container -->
            <div class="exercise-editor-wrapper" id="editor_wrapper_${this.id}"></div>

            <!-- Validation Action Toolbar -->
            <div class="exercise-validation-bar" role="group" aria-label="Solution validation controls">
                <button type="button" class="btn-check-exercise" id="btn_check_${this.id}"
                    aria-label="Check your solution against the requirements">
                    <span aria-hidden="true">✓</span> Check Solution
                </button>
                <span class="validation-summary-status" id="status_${this.id}" aria-live="polite" aria-atomic="true"></span>
            </div>

            <!-- Validation Checklist Panel -->
            <div class="validation-checklist-panel" id="checklist_panel_${this.id}" style="${this.validationRules.length > 0 || this.customValidation ? '' : 'display: none;'}">
                <h4 class="checklist-title">📋 Requirement Checklist:</h4>
                <ul class="checklist-items" id="checklist_items_${this.id}">
                    ${this.renderInitialChecklist()}
                </ul>
            </div>

            <!-- Progressive Hint System Container -->
            <div class="exercise-hints-wrapper" id="hints_wrapper_${this.id}"></div>
        `;

        this.initEditor();
        this.initHints();
        this.bindEvents();
    }

    renderInitialChecklist() {
        if (this.validationRules.length === 0) {
            return `<li class="rule-item rule-pending"><span>⏳</span> Apply the required styles or markup and click <strong>Check Solution</strong>.</li>`;
        }
        return this.validationRules.map(rule => `
            <li class="rule-item rule-pending" data-rule-id="${rule.id || ''}">
                <span class="rule-icon">⏳</span>
                <span class="rule-text">${this.escapeHTML(rule.label || rule.message || 'Requirement')}</span>
            </li>
        `).join('');
    }

    initEditor() {
        const editorContainer = this.container.querySelector(`#editor_wrapper_${this.id}`);
        if (!editorContainer) return;

        const checkEditorLib = () => {
            if (typeof InteractiveCodeEditor !== 'undefined') {
                this.editor = new InteractiveCodeEditor({
                    container: editorContainer,
                    id: `editor_instance_${this.id}`,
                    html: this.starterHTML,
                    css: this.starterCSS,
                    showCSS: this.showCSS,
                    autoRun: true,
                    hints: this.hints,
                    solutionHTML: this.solutionHTML,
                    solutionCSS: this.solutionCSS,
                    solutionExplanation: this.solutionExplanation,
                    concept: this.title,
                    onCheck: () => this.checkSolution()
                });
            } else {
                setTimeout(checkEditorLib, 40);
            }
        };
        checkEditorLib();
    }

    initHints() {
        const hintsContainer = this.container.querySelector(`#hints_wrapper_${this.id}`);
        if (!hintsContainer) return;

        const checkHintsLib = () => {
            if (typeof ProgressiveHintSystem !== 'undefined') {
                this.hintSystem = new ProgressiveHintSystem({
                    container: hintsContainer,
                    id: `hints_instance_${this.id}`,
                    challenge: {
                        title: this.title,
                        instructions: this.instructions,
                        hints: this.hints,
                        solutionHTML: this.solutionHTML,
                        solutionCSS: this.solutionCSS,
                        solutionExplanation: this.solutionExplanation
                    },
                    baseXP: this.baseXP
                });
            } else {
                setTimeout(checkHintsLib, 40);
            }
        };
        checkHintsLib();
    }

    bindEvents() {
        const checkBtn = this.container.querySelector(`#btn_check_${this.id}`);
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.runValidation();
            });
        }
    }

    runValidation() {
        const htmlCode = this.editor && this.editor.textareaHTML ? this.editor.textareaHTML.value : '';
        const cssCode = this.editor && this.editor.textareaCSS ? this.editor.textareaCSS.value : '';
        
        const checklistItems = this.container.querySelector(`#checklist_items_${this.id}`);
        const statusEl = this.container.querySelector(`#status_${this.id}`);
        const statusBadge = this.container.querySelector('.exercise-status-badge');

        let allPassed = true;
        let renderedChecklistHTML = '';

        if (this.validationRules.length > 0) {
            this.validationRules.forEach(rule => {
                let passed = false;
                try {
                    passed = !!rule.test(htmlCode, cssCode);
                } catch (e) {
                    passed = false;
                }

                if (!passed) allPassed = false;

                renderedChecklistHTML += `
                    <li class="rule-item ${passed ? 'rule-passed' : 'rule-failed'}">
                        <span class="rule-icon">${passed ? '✅' : '❌'}</span>
                        <span class="rule-text">${this.escapeHTML(rule.label || rule.message || 'Requirement')}</span>
                    </li>
                `;
            });
            if (checklistItems) {
                checklistItems.innerHTML = renderedChecklistHTML;
            }
        } else if (this.customValidation) {
            try {
                const res = this.customValidation(htmlCode, cssCode);
                allPassed = !!(res && (res.passed || res === true));
                const message = (res && res.message) ? res.message : (allPassed ? 'All validation checks passed!' : 'One or more requirements are not met.');
                if (checklistItems) {
                    checklistItems.innerHTML = `
                        <li class="rule-item ${allPassed ? 'rule-passed' : 'rule-failed'}">
                            <span class="rule-icon">${allPassed ? '✅' : '❌'}</span>
                            <span class="rule-text">${this.escapeHTML(message)}</span>
                        </li>
                    `;
                }
            } catch (e) {
                allPassed = false;
            }
        } else if (this.solutionCSS.trim()) {
            // Default smart CSS substring validator
            const userCSS = cssCode.replace(/\s+/g, '').toLowerCase();
            const solutionCSSLines = this.solutionCSS.split(';');
            for (let line of solutionCSSLines) {
                let cleanLine = line.replace(/\{|\}|\s+|\/\*.*?\*\//g, '').toLowerCase();
                if (cleanLine && cleanLine.includes(':') && !userCSS.includes(cleanLine)) {
                    allPassed = false;
                    break;
                }
            }
            if (checklistItems) {
                checklistItems.innerHTML = `
                    <li class="rule-item ${allPassed ? 'rule-passed' : 'rule-failed'}">
                        <span class="rule-icon">${allPassed ? '✅' : '❌'}</span>
                        <span class="rule-text">${allPassed ? 'Styles match the challenge criteria!' : 'Styles do not match the target properties yet.'}</span>
                    </li>
                `;
            }
        }

        if (allPassed) {
            if (statusEl) {
                statusEl.innerHTML = `<span style="color:#16a34a; font-weight:700;">🎉 Awesome! All criteria satisfied (+${this.baseXP} XP)</span>`;
            }
            if (statusBadge) {
                statusBadge.className = 'exercise-status-badge status-completed';
                statusBadge.textContent = '✅ Challenge Completed';
            }
            this.saveState(true);
            if (window.progressSystem) {
                window.progressSystem.completeExercise(this.id, this.baseXP);
                window.progressSystem.saveCode(this.id, htmlCode);
            }
            // Move focus to status so screen readers announce it
            if (statusEl) setTimeout(() => statusEl.focus && statusEl.focus(), 100);
        } else {
            if (statusEl) {
                statusEl.innerHTML = `<span style="color:#dc2626; font-weight:600;">❌ Not quite matching yet. Review the checklist above!</span>`;
            }
            this.saveState(false);
            // Move focus to checklist so keyboard users can read results
            if (checklistItems) setTimeout(() => { checklistItems.setAttribute('tabindex', '-1'); checklistItems.focus(); }, 100);
        }
    }

    escapeHTML(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

// Export globally
window.ExerciseSystem = ExerciseSystem;
