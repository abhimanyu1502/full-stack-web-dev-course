/**
 * Lightweight Quiz Engine
 * Comprehensive quiz system supporting:
 * - Question types: multiple-choice, true-false, code-output, identify-error
 * - Rich question format: title, code block, options, correct index, detailed explanations
 * - LocalStorage persistence: score, attempts count, high scores, completion status
 * - Control buttons: [Submit Answer], [Next Question], [Retry Quiz]
 * - Detailed feedback (e.g. "Correct. justify-content controls distribution along the Flexbox main axis.")
 */

class QuizEngine {
    constructor(options = {}) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;

        if (!this.container) {
            console.warn('QuizEngine: Container not found', options.container);
            return;
        }

        this.id = options.id || 'quiz_' + Math.random().toString(36).substr(2, 9);
        this.title = options.title || 'Knowledge Checkpoint';
        this.description = options.description || 'Test your knowledge to reinforce what you have learned.';
        this.questions = Array.isArray(options.questions) ? options.questions : [];

        if (this.questions.length === 0) {
            console.warn('QuizEngine: No questions provided for quiz', this.id);
            return;
        }

        this.storageKey = `quiz_engine_state_${this.id}`;

        // Local state
        this.currentIndex = 0;
        this.score = 0;
        this.selectedOption = null;
        this.isAnswered = false;
        this.attempts = 0;
        this.completed = false;
        this.bestScore = 0;
        this.history = []; // records per question { selected, isCorrect }

        this.loadState();
        this.render();
    }

    loadState() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (raw) {
                const data = JSON.parse(raw);
                this.attempts = typeof data.attempts === 'number' ? data.attempts : 0;
                this.completed = !!data.completed;
                this.bestScore = typeof data.bestScore === 'number' ? data.bestScore : 0;
            }
        } catch (e) {
            this.attempts = 0;
            this.completed = false;
            this.bestScore = 0;
        }
    }

    saveState() {
        try {
            const payload = {
                attempts: this.attempts,
                completed: this.completed,
                bestScore: this.bestScore,
                lastScore: this.score,
                timestamp: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(payload));
        } catch (e) {
            // LocalStorage might be disabled
        }
    }

    render() {
        this.container.classList.add('quiz-engine-root');
        if (this.currentIndex >= this.questions.length) {
            this.renderSummary();
        } else {
            this.renderQuestion();
        }
    }

    renderQuestion() {
        const q = this.questions[this.currentIndex];
        const questionNum = this.currentIndex + 1;
        const totalQ = this.questions.length;
        const progressPercent = Math.round((questionNum / totalQ) * 100);

        const typeBadge = this.getTypeBadge(q.type);

        let codeHTML = '';
        if (q.code) {
            codeHTML = `
                <div class="quiz-engine-code-block">
                    <div class="code-header">
                        <span class="language-label">${q.codeLanguage || 'HTML/CSS'}</span>
                    </div>
                    <pre><code>${this.escapeHTML(q.code)}</code></pre>
                </div>
            `;
        }

        let optionsHTML = '';
        if (Array.isArray(q.options)) {
            optionsHTML = q.options.map((opt, idx) => {
                let optStateClass = '';
                let ariaLabel = '';
                if (this.isAnswered) {
                    if (idx === q.correct) {
                        optStateClass = 'option-correct';
                        ariaLabel = `Option ${String.fromCharCode(65 + idx)}: ${opt} — Correct answer`;
                    } else if (idx === this.selectedOption) {
                        optStateClass = 'option-incorrect';
                        ariaLabel = `Option ${String.fromCharCode(65 + idx)}: ${opt} — Incorrect`;
                    } else {
                        ariaLabel = `Option ${String.fromCharCode(65 + idx)}: ${opt}`;
                    }
                } else if (this.selectedOption === idx) {
                    optStateClass = 'option-selected';
                    ariaLabel = `Option ${String.fromCharCode(65 + idx)}: ${opt} — Selected`;
                } else {
                    ariaLabel = `Option ${String.fromCharCode(65 + idx)}: ${opt}`;
                }

                const isChecked = this.selectedOption === idx ? 'checked' : '';
                const isDisabled = this.isAnswered ? 'disabled' : '';

                return `
                    <label class="quiz-engine-option ${optStateClass}">
                        <input type="radio" name="qe_opt_${this.id}_${this.currentIndex}" value="${idx}" ${isChecked} ${isDisabled} aria-label="${ariaLabel.replace(/"/g, '&quot;')}">
                        <span class="option-letter" aria-hidden="true">${String.fromCharCode(65 + idx)}.</span>
                        <span class="option-text">${this.formatOptionText(opt)}</span>
                    </label>
                `;
            }).join('');
        }

        let feedbackHTML = '';
        if (this.isAnswered) {
            const isCorrect = this.selectedOption === q.correct;
            const explanation = q.explanation || 'Review the topic details above for further clarification.';

            if (isCorrect) {
                feedbackHTML = `
                    <div class="quiz-engine-feedback feedback-correct">
                        <div class="feedback-title">✅ Correct</div>
                        <div class="feedback-body">${this.escapeHTML(explanation)}</div>
                    </div>
                `;
            } else {
                feedbackHTML = `
                    <div class="quiz-engine-feedback feedback-incorrect">
                        <div class="feedback-title">❌ Incorrect</div>
                        <div class="feedback-body">
                            ${this.escapeHTML(explanation)}
                        </div>
                    </div>
                `;
            }
        }

        const questionId = `qe_q_${this.id}_${this.currentIndex}`;
        const feedbackId = `qe_fb_${this.id}_${this.currentIndex}`;

        this.container.innerHTML = `
            <div class="quiz-engine-card" role="form" aria-label="${this.escapeHTML(this.title)} — Question ${questionNum} of ${totalQ}">
                <!-- Screen reader live region for answer feedback -->
                <div class="sr-live-region" role="status" aria-live="polite" id="${feedbackId}_sr"></div>

                <div class="quiz-engine-header">
                    <div class="quiz-title-group">
                        <span class="quiz-icon" aria-hidden="true">📝</span>
                        <div>
                            <h3 class="quiz-main-title" id="qe_title_${this.id}">${this.escapeHTML(this.title)}</h3>
                            <span class="quiz-subtitle">${this.escapeHTML(this.description)}</span>
                        </div>
                    </div>
                    <div class="quiz-stats-group" aria-label="Quiz statistics">
                        <span class="quiz-badge badge-attempts">Attempts: ${this.attempts}</span>
                        ${this.bestScore > 0 ? `<span class="quiz-badge badge-best">Best: ${this.bestScore}/${totalQ}</span>` : ''}
                    </div>
                </div>

                <!-- Progress Header -->
                <div class="quiz-progress-bar-container">
                    <div class="quiz-progress-meta">
                        <span>Question <strong>${questionNum}</strong> of <strong>${totalQ}</strong></span>
                        ${typeBadge}
                    </div>
                    <div class="quiz-progress-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100" aria-label="Quiz progress: question ${questionNum} of ${totalQ}">
                        <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
                    </div>
                </div>

                <!-- Question Content -->
                <div class="quiz-question-body">
                    <h4 class="question-text" id="${questionId}">${this.formatQuestionText(q.question)}</h4>
                    ${codeHTML}
                    <div class="quiz-options-list"
                         role="radiogroup"
                         aria-labelledby="${questionId}"
                         aria-required="true">
                        ${optionsHTML}
                    </div>
                    ${feedbackHTML ? `<div id="${feedbackId}" aria-live="assertive">${feedbackHTML}</div>` : ''}
                </div>

                <!-- Action Controls Toolbar -->
                <div class="quiz-engine-actions">
                    ${!this.isAnswered ? `
                        <button type="button" class="btn-quiz-action btn-submit-answer" id="qe_btn_submit_${this.id}"
                            ${this.selectedOption === null ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}>
                            Submit Answer
                        </button>
                    ` : ''}

                    ${this.isAnswered ? `
                        <button type="button" class="btn-quiz-action btn-next-question" id="qe_btn_next_${this.id}">
                            ${questionNum === totalQ ? 'Finish & See Results 🎉' : 'Next Question →'}
                        </button>
                    ` : ''}

                    <button type="button" class="btn-quiz-action btn-retry-quiz" id="qe_btn_retry_${this.id}"
                        aria-label="Restart quiz from the beginning">
                        ⟳ Retry Quiz
                    </button>
                </div>
            </div>
        `;

        this.bindQuestionEvents();
    }

    renderSummary() {
        const totalQ = this.questions.length;
        const percentage = Math.round((this.score / totalQ) * 100);
        const isPassed = percentage >= 70;

        // Update persistence
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
        }
        this.completed = true;
        this.saveState();

        if (window.progressSystem) {
            window.progressSystem.recordQuizScore(this.id, this.score, totalQ);
        }

        const questionsReview = this.questions.map((q, idx) => {
            const userAns = this.history[idx];
            const isCorrect = userAns && userAns.isCorrect;
            const userChoiceText = userAns && userAns.selected !== null ? q.options[userAns.selected] : 'No answer';
            const correctChoiceText = q.options[q.correct];

            return `
                <div class="summary-question-item ${isCorrect ? 'item-correct' : 'item-incorrect'}">
                    <div class="summary-question-header">
                        <span class="status-icon">${isCorrect ? '✅' : '❌'}</span>
                        <strong>Q${idx + 1}: ${this.formatQuestionText(q.question)}</strong>
                    </div>
                    ${q.code ? `<pre class="summary-code"><code>${this.escapeHTML(q.code)}</code></pre>` : ''}
                    <div class="summary-question-details">
                        <div><strong>Your Answer:</strong> <span class="${isCorrect ? 'text-correct' : 'text-incorrect'}">${this.escapeHTML(userChoiceText)}</span></div>
                        ${!isCorrect ? `<div><strong>Correct Answer:</strong> <span class="text-correct">${this.escapeHTML(correctChoiceText)}</span></div>` : ''}
                        <div class="summary-explanation"><strong>Explanation:</strong> ${this.escapeHTML(q.explanation)}</div>
                    </div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = `
            <div class="quiz-engine-card quiz-summary-card">
                <div class="summary-header ${isPassed ? 'passed' : 'failed'}">
                    <div class="summary-badge">${isPassed ? '🏆 QUIZ PASSED' : '📚 KEEP PRACTICING'}</div>
                    <h2>${isPassed ? 'Great Job! Module Mastered 🎉' : 'Quiz Completed'}</h2>
                    <div class="summary-score-display">
                        <span class="score-num">${this.score}</span>
                        <span class="score-total">/ ${totalQ}</span>
                        <span class="score-percent">(${percentage}%)</span>
                    </div>
                </div>

                <div class="summary-stats-grid">
                    <div class="stat-box">
                        <span class="stat-label">Total Questions</span>
                        <span class="stat-value">${totalQ}</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Correct Answers</span>
                        <span class="stat-value" style="color:#16a34a">${this.score}</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Attempts</span>
                        <span class="stat-value">${this.attempts}</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Best Score</span>
                        <span class="stat-value" style="color:#2563eb">${this.bestScore} / ${totalQ}</span>
                    </div>
                </div>

                <h4 class="review-title">📋 Question Breakdown & Explanations:</h4>
                <div class="summary-questions-list">
                    ${questionsReview}
                </div>

                <div class="quiz-engine-actions" style="margin-top: 2rem;">
                    <button type="button" class="btn-quiz-action btn-retry-quiz" id="qe_btn_retry_${this.id}">
                        ⟳ Retry Quiz
                    </button>
                </div>
            </div>
        `;

        this.bindSummaryEvents();
    }

    bindQuestionEvents() {
        const radios = this.container.querySelectorAll(`input[name="qe_opt_${this.id}_${this.currentIndex}"]`);
        const submitBtn = this.container.querySelector(`#qe_btn_submit_${this.id}`);
        const nextBtn = this.container.querySelector(`#qe_btn_next_${this.id}`);
        const retryBtn = this.container.querySelector(`#qe_btn_retry_${this.id}`);

        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (this.isAnswered) return;
                this.selectedOption = parseInt(e.target.value, 10);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.removeAttribute('aria-disabled');
                    submitBtn.setAttribute('aria-disabled', 'false');
                }
                // Highlight option UI
                this.container.querySelectorAll('.quiz-engine-option').forEach((optEl, i) => {
                    if (i === this.selectedOption) {
                        optEl.classList.add('option-selected');
                    } else {
                        optEl.classList.remove('option-selected');
                    }
                });
            });
        });

        // Keyboard: Enter on a selected option submits the answer
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isAnswered && this.selectedOption !== null && submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        });

        const doSubmit = () => {
            if (this.selectedOption === null || this.isAnswered) return;
            this.isAnswered = true;
            const q = this.questions[this.currentIndex];
            const isCorrect = this.selectedOption === q.correct;
            if (isCorrect) this.score++;
            this.history.push({ selected: this.selectedOption, isCorrect });
            this.render();
            // Announce result to screen readers via live region
            const srRegion = this.container.querySelector('[role="status"]');
            if (srRegion) {
                srRegion.textContent = isCorrect
                    ? `Correct. ${q.explanation || ''}`
                    : `Incorrect. The correct answer was: ${q.options[q.correct]}. ${q.explanation || ''}`;
            }
        };

        if (submitBtn) {
            submitBtn.addEventListener('click', doSubmit);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentIndex++;
                this.selectedOption = null;
                this.isAnswered = false;
                this.render();
                // Move focus to the first radio option for keyboard users
                const firstOpt = this.container.querySelector('input[type="radio"]');
                if (firstOpt) firstOpt.focus();
            });
        }

        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.resetQuiz();
            });
        }
    }

    bindSummaryEvents() {
        const retryBtn = this.container.querySelector(`#qe_btn_retry_${this.id}`);
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.resetQuiz();
            });
        }
    }

    resetQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.selectedOption = null;
        this.isAnswered = false;
        this.history = [];
        this.attempts++;
        this.saveState();
        this.render();
    }

    getTypeBadge(type) {
        switch (type) {
            case 'code-output':
                return `<span class="type-badge badge-code-output" title="Predict the output of the code snippet">💻 Code Output</span>`;
            case 'identify-error':
                return `<span class="type-badge badge-identify-error" title="Find the mistake in the code snippet">🔍 Identify Error</span>`;
            case 'true-false':
                return `<span class="type-badge badge-true-false" title="True or False statement">⚖️ True / False</span>`;
            case 'multiple-choice':
            default:
                return `<span class="type-badge badge-mcq" title="Multiple Choice Question">🎯 Multiple Choice</span>`;
        }
    }

    formatQuestionText(text) {
        if (!text) return '';
        return (text || '').replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    formatOptionText(text) {
        if (!text) return '';
        return (text || '').replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    escapeHTML(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

// Export globally
window.QuizEngine = QuizEngine;
