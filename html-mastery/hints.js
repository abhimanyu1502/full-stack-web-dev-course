/**
 * Reusable Progressive Hint System
 * Provides multi-step structured guidance without prematurely revealing answers:
 * - Hint 1: Conceptual explanation
 * - Hint 2: Narrowed concept focus
 * - Hint 3: Relevant HTML tag / CSS property identifier
 * - Hint 4: Partial code / implementation guidance
 * - Level 5: Solution reveal with complete code & explanation
 *
 * Supports XP tracking, step progress bar, code copying, and local storage persistence.
 */

class ProgressiveHintSystem {
    constructor(options = {}) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;

        if (!this.container) {
            console.warn('ProgressiveHintSystem: Container not found', options.container);
            return;
        }

        this.id = options.id || 'challenge_' + Math.random().toString(36).substr(2, 9);
        this.challenge = options.challenge || {};
        this.hints = Array.isArray(this.challenge.hints) && this.challenge.hints.length > 0
            ? this.challenge.hints
            : this.generateDefaultHints();

        this.maxHints = this.hints.length;
        this.baseXP = options.baseXP || 100;
        this.storageKey = `hints_progress_${this.id}`;

        // Callbacks
        this.onRevealSolution = options.onRevealSolution || null;
        this.onHintUnlocked = options.onHintUnlocked || null;

        // Current state (0 = no hints revealed, 1..4 = hints revealed, 5 = solution revealed)
        this.currentLevel = 0;
        this.loadState();

        this.render();
    }

    generateDefaultHints() {
        return [
            "Think about the core concept and how the structure or style connects to the user goal.",
            "Identify the specific HTML elements or CSS selectors required for this task.",
            "Check the exact tag names, attributes, or CSS properties used in the code examples above.",
            "Write the syntax step by step, ensuring opening/closing tags or brackets match."
        ];
    }

    loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved !== null) {
                const parsed = parseInt(saved, 10);
                if (!isNaN(parsed) && parsed >= 0 && parsed <= this.maxHints + 1) {
                    this.currentLevel = parsed;
                }
            }
        } catch (e) {
            // LocalStorage might be disabled
        }
    }

    saveState() {
        try {
            localStorage.setItem(this.storageKey, this.currentLevel.toString());
        } catch (e) {
            // LocalStorage might be disabled
        }
    }

    calculateXP() {
        // Base 100 XP.
        // -10 XP for each hint used (down to 60 XP for 4 hints).
        // -20 XP if solution revealed (down to minimum 40 XP).
        if (this.currentLevel === 0) return this.baseXP;
        if (this.currentLevel > this.maxHints) {
            return Math.max(35, this.baseXP - (this.maxHints * 10) - 25);
        }
        return Math.max(50, this.baseXP - (this.currentLevel * 10));
    }

    getHintLabel(index) {
        const labels = [
            '💡 Hint 1 · Conceptual Clue',
            '🎯 Hint 2 · Focus Area',
            '🏷️ Hint 3 · Tag & Property Identifier',
            '🧩 Hint 4 · Implementation Guidance'
        ];
        return labels[index] || `💡 Hint ${index + 1}`;
    }

    render() {
        this.container.classList.add('progressive-hint-root');
        
        const isSolutionUnlocked = this.currentLevel > this.maxHints;
        const currentXP = this.calculateXP();
        const progressPercent = Math.min(100, Math.round((this.currentLevel / (this.maxHints + 1)) * 100));

        let progressLabel = '0 of ' + this.maxHints + ' Hints';
        if (isSolutionUnlocked) {
            progressLabel = 'Answer Revealed';
        } else if (this.currentLevel > 0) {
            progressLabel = `Hint ${this.currentLevel} of ${this.maxHints}`;
        }

        let html = `
            <div class="hint-header">
                <div class="hint-title-group">
                    <span class="hint-icon">💡</span>
                    <h3 class="hint-title">Need Help?</h3>
                    <span class="hint-step-pill ${isSolutionUnlocked ? 'pill-solution' : ''}">${progressLabel}</span>
                </div>
                <div class="hint-xp-badge" title="XP earned upon completing this challenge">
                    <span class="xp-star">⭐</span>
                    <span class="xp-amount">${currentXP} XP</span>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="hint-progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
                <div class="hint-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>

            <!-- Hints Display Container -->
            <div class="hint-cards-list">
        `;

        // Render revealed hints
        for (let i = 0; i < this.currentLevel && i < this.maxHints; i++) {
            const hintText = this.hints[i];
            html += `
                <div class="hint-card hint-card-level-${i + 1} hint-reveal-animation">
                    <div class="hint-card-header">
                        <strong>${this.getHintLabel(i)}</strong>
                        <span class="hint-number-tag">Step ${i + 1}/${this.maxHints}</span>
                    </div>
                    <div class="hint-card-body">
                        <p>${this.formatHintText(hintText)}</p>
                    </div>
                </div>
            `;
        }

        // Render solution if unlocked
        if (isSolutionUnlocked) {
            const solExplanation = this.challenge.solutionExplanation || this.challenge.explanation || 'Review the solution code below and notice how the tags and CSS rules work together.';
            const solHTML = this.challenge.solutionHTML || (typeof this.challenge.solution === 'string' ? this.challenge.solution : '');
            const solCSS = this.challenge.solutionCSS || '';

            html += `
                <div class="solution-card hint-reveal-animation">
                    <div class="solution-card-header">
                        <div class="solution-title">
                            <span>✅</span>
                            <strong>Official Solution & Explanation</strong>
                        </div>
                        <button type="button" class="btn-copy-solution" title="Copy solution code to clipboard">
                            📋 Copy Solution
                        </button>
                    </div>
                    <div class="solution-explanation">
                        <p>${solExplanation}</p>
                    </div>
                    ${solHTML ? `
                        <div class="solution-code-block">
                            <span class="code-lang-label">HTML</span>
                            <pre><code>${this.escapeHTML(solHTML)}</code></pre>
                        </div>
                    ` : ''}
                    ${solCSS ? `
                        <div class="solution-code-block" style="margin-top: 10px;">
                            <span class="code-lang-label">CSS</span>
                            <pre><code>${this.escapeHTML(solCSS)}</code></pre>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        html += `</div>`; // .hint-cards-list

        // Action Toolbar
        html += `
            <div class="hint-actions-toolbar">
        `;

        if (this.currentLevel < this.maxHints) {
            const nextHintNum = this.currentLevel + 1;
            html += `
                <button type="button" class="btn-show-next-hint">
                    <span>💡</span> Show Hint ${nextHintNum}
                </button>
            `;
        } else if (this.currentLevel === this.maxHints && !isSolutionUnlocked) {
            html += `
                <button type="button" class="btn-reveal-answer">
                    <span>🔓</span> Reveal Answer & Explanation
                </button>
            `;
        }

        if (this.currentLevel > 0) {
            html += `
                <button type="button" class="btn-reset-hints" title="Hide hints to try again">
                    ⟳ Reset Hints
                </button>
            `;
        }

        html += `</div>`; // .hint-actions-toolbar

        this.container.innerHTML = html;
        this.bindEvents();
    }

    bindEvents() {
        const btnNextHint = this.container.querySelector('.btn-show-next-hint');
        if (btnNextHint) {
            btnNextHint.addEventListener('click', () => {
                this.currentLevel++;
                this.saveState();
                if (typeof this.onHintUnlocked === 'function') {
                    this.onHintUnlocked(this.currentLevel);
                }
                this.render();
            });
        }

        const btnRevealAnswer = this.container.querySelector('.btn-reveal-answer');
        if (btnRevealAnswer) {
            btnRevealAnswer.addEventListener('click', () => {
                this.currentLevel = this.maxHints + 1;
                this.saveState();
                if (typeof this.onRevealSolution === 'function') {
                    this.onRevealSolution(this.challenge);
                }
                this.render();
            });
        }

        const btnReset = this.container.querySelector('.btn-reset-hints');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                this.currentLevel = 0;
                this.saveState();
                this.render();
            });
        }

        const btnCopySolution = this.container.querySelector('.btn-copy-solution');
        if (btnCopySolution) {
            btnCopySolution.addEventListener('click', () => {
                const solHTML = this.challenge.solutionHTML || (typeof this.challenge.solution === 'string' ? this.challenge.solution : '');
                const solCSS = this.challenge.solutionCSS || '';
                let textToCopy = solHTML;
                if (solCSS.trim()) {
                    textToCopy = (solHTML ? `<!-- HTML -->\n${solHTML}\n\n` : '') + `/* CSS */\n${solCSS}`;
                }

                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btnCopySolution.innerHTML;
                    btnCopySolution.innerHTML = '✅ Copied!';
                    setTimeout(() => {
                        btnCopySolution.innerHTML = originalText;
                    }, 2000);
                }).catch(() => {
                    alert('Copied solution to clipboard');
                });
            });
        }
    }

    formatHintText(text) {
        if (!text) return '';
        // Convert `code` ticks to <code> tags safely
        return text.replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    escapeHTML(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

// Export globally
window.ProgressiveHintSystem = ProgressiveHintSystem;
