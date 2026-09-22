/**
 * Reusable Interactive Code Editor Component
 * Supports HTML + CSS dual editors, line numbers, live sandboxed preview,
 * localStorage persistence, Run/Reset/Copy controls, and beginner-friendly error handling.
 */

class InteractiveCodeEditor {
    constructor(options = {}) {
        this.container = typeof options.container === 'string' 
            ? document.querySelector(options.container) 
            : options.container;
            
        if (!this.container) {
            console.error('InteractiveCodeEditor: Container not found');
            return;
        }

        this.id = options.id || 'editor_' + Math.random().toString(36).substr(2, 9);
        this.initialHTML = options.html !== undefined ? options.html : '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>Start editing this code!</p>\n</body>\n</html>';
        this.initialCSS = options.css !== undefined ? options.css : '';
        this.showCSS = options.showCSS !== undefined ? options.showCSS : true;
        this.storageKey = `saved_code_${this.id}`;
        this.autoRun = options.autoRun !== undefined ? options.autoRun : true;

        this.onCheck = typeof options.onCheck === 'function' ? options.onCheck : null;
        this.hints = Array.isArray(options.hints) ? options.hints : [];
        this.currentHintIndex = 0;
        this.solutionHTML = options.solutionHTML || '';
        this.solutionCSS = options.solutionCSS || '';
        this.solutionExplanation = options.solutionExplanation || '';
        this.concept = options.concept || '';

        this.render();
        this.bindEvents();
        this.loadSavedCode();
        this.executeCode();
    }

    render() {
        this.container.classList.add('unified-editor-root');
        this.container.innerHTML = `
            <div class="editor-toolbar">
                <div class="editor-toolbar-title">
                    <span class="editor-tag">SANDBOX</span>
                    <span>Interactive Workspace</span>
                </div>
                <div class="editor-toolbar-actions">
                    <button type="button" class="btn-editor-action btn-copy" title="Copy code to clipboard">
                        📋 Copy
                    </button>
                    <button type="button" class="btn-editor-action btn-reset" title="Reset to original code">
                        ⟳ Reset
                    </button>
                    <button type="button" class="btn-editor-action btn-check" title="Check solution and validate code">
                        ✓ Check
                    </button>
                    <button type="button" class="btn-editor-action btn-run" title="Run code">
                        ▶ Run
                    </button>
                </div>
            </div>

            <div class="editor-main-grid ${this.showCSS ? 'has-css-pane' : 'single-pane'}">
                <!-- Top Left: HTML Editor -->
                <div class="editor-code-pane pane-html">
                    <div class="pane-header">
                        <span class="pane-title"><span class="lang-dot html-dot"></span> HTML</span>
                        <span class="pane-hint">index.html</span>
                    </div>
                    <div class="editor-textarea-wrapper">
                        <div class="line-numbers line-numbers-html" aria-hidden="true">1</div>
                        <textarea class="editor-textarea textarea-html" spellcheck="false" aria-label="HTML Code Editor">${this.escapeHTML(this.initialHTML)}</textarea>
                    </div>
                </div>

                <!-- Top Right: Live Preview -->
                <div class="editor-preview-pane">
                    <div class="pane-header preview-header">
                        <span class="pane-title"><span class="lang-dot live-dot"></span> Live Output</span>
                        <span class="save-status-indicator" style="font-size:0.75rem; color:var(--text-muted); opacity:0.8;">Auto-saved</span>
                    </div>
                    <iframe class="preview-iframe" sandbox="allow-scripts allow-modals" title="Live Preview Output"></iframe>
                </div>

                ${this.showCSS ? `
                <!-- Bottom Row: CSS Editor -->
                <div class="editor-code-pane pane-css">
                    <div class="pane-header">
                        <span class="pane-title"><span class="lang-dot css-dot"></span> CSS</span>
                        <span class="pane-hint">style.css</span>
                    </div>
                    <div class="editor-textarea-wrapper">
                        <div class="line-numbers line-numbers-css" aria-hidden="true">1</div>
                        <textarea class="editor-textarea textarea-css" spellcheck="false" aria-label="CSS Code Editor" placeholder="/* Write your CSS rules here */">${this.escapeHTML(this.initialCSS)}</textarea>
                    </div>
                </div>
                ` : ''}
            </div>

            <!-- Integrated Learning Assistant Bar -->
            <div class="editor-ai-assistant-section">
                <div class="editor-ai-header">
                    <div class="editor-ai-title">
                        <span class="ai-assistant-icon">🤖</span>
                        <strong>Learning Assistant</strong>
                    </div>
                    <span class="editor-ai-badge">Uses current code context</span>
                </div>
                <div class="editor-ai-actions">
                    <button type="button" class="btn-ai-action btn-ai-hint">💡 Give me a hint</button>
                    <button type="button" class="btn-ai-action btn-ai-review">🔍 Review my code</button>
                    <button type="button" class="btn-ai-action btn-ai-error">❓ Explain my error</button>
                    <button type="button" class="btn-ai-action btn-ai-concept">🧠 Explain this concept</button>
                    <button type="button" class="btn-ai-action btn-ai-show-answer">👁️ Show answer</button>
                </div>
                <div class="editor-ai-response-panel hidden">
                    <div class="editor-ai-response-content"></div>
                    <button type="button" class="btn-dismiss-ai-response">✕ Close</button>
                </div>
            </div>
        `;

        this.textareaHTML = this.container.querySelector('.textarea-html');
        this.linesHTML = this.container.querySelector('.line-numbers-html');
        this.textareaCSS = this.container.querySelector('.textarea-css');
        this.linesCSS = this.container.querySelector('.line-numbers-css');
        this.iframe = this.container.querySelector('.preview-iframe');
        this.btnRun = this.container.querySelector('.btn-run');
        this.btnCheck = this.container.querySelector('.btn-check');
        this.btnReset = this.container.querySelector('.btn-reset');
        this.btnCopy = this.container.querySelector('.btn-copy');
        this.saveIndicator = this.container.querySelector('.save-status-indicator');

        // AI Assistant Elements
        this.aiResponsePanel = this.container.querySelector('.editor-ai-response-panel');
        this.aiResponseContent = this.container.querySelector('.editor-ai-response-content');
        this.btnDismissAi = this.container.querySelector('.btn-dismiss-ai-response');
        this.btnAiHint = this.container.querySelector('.btn-ai-hint');
        this.btnAiReview = this.container.querySelector('.btn-ai-review');
        this.btnAiError = this.container.querySelector('.btn-ai-error');
        this.btnAiConcept = this.container.querySelector('.btn-ai-concept');
        this.btnAiShowAnswer = this.container.querySelector('.btn-ai-show-answer');
    }

    bindEvents() {
        // Run code button
        this.btnRun.addEventListener('click', () => {
            this.executeCode();
            this.saveCodeLocally();
        });

        // Check button
        if (this.btnCheck) {
            this.btnCheck.addEventListener('click', () => {
                this.executeCode();
                this.saveCodeLocally();
                if (typeof this.onCheck === 'function') {
                    this.onCheck();
                } else {
                    const errors = this.validateSyntax(this.textareaHTML.value, this.textareaCSS ? this.textareaCSS.value : '');
                    if (errors.length === 0) {
                        this.showAiFeedback('✅ <strong>Syntax Check Passed!</strong> Your code structure has no syntax errors.', 'success');
                    } else {
                        this.showAiFeedback(`⚠️ <strong>Syntax Notice:</strong> Found ${errors.length} issue(s). Click "Explain my error" for step-by-step guidance.`, 'warning');
                    }
                }
            });
        }

        // Reset code button
        this.btnReset.addEventListener('click', () => {
            if (confirm('Reset editor back to initial code?')) {
                this.textareaHTML.value = this.initialHTML;
                if (this.showCSS && this.textareaCSS) this.textareaCSS.value = this.initialCSS;
                this.updateLineNumbers(this.textareaHTML, this.linesHTML);
                if (this.showCSS && this.textareaCSS) this.updateLineNumbers(this.textareaCSS, this.linesCSS);
                this.saveCodeLocally();
                this.executeCode();
            }
        });


        // Copy button
        this.btnCopy.addEventListener('click', () => {
            const html = this.textareaHTML.value;
            const css = (this.showCSS && this.textareaCSS) ? this.textareaCSS.value : '';
            let fullText = html;
            if (this.showCSS && css.trim()) {
                fullText = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}`;
            }

            navigator.clipboard.writeText(fullText).then(() => {
                const originalText = this.btnCopy.innerHTML;
                this.btnCopy.innerHTML = '✅ Copied!';
                setTimeout(() => {
                    this.btnCopy.innerHTML = originalText;
                }, 2000);
            }).catch(() => {
                alert('Copied to clipboard');
            });
        });

        // ==========================================
        // 🤖 Learning Assistant Integrated Actions
        // ==========================================

        // 1. "Give me a hint" -> Give only a hint
        if (this.btnAiHint) {
            this.btnAiHint.addEventListener('click', async () => {
                this.showAiFeedback('<p class="ai-loading">🤖 Thinking of a progressive hint...</p>');
                
                // If the exercise provided curated progressive hints, cycle through them
                if (this.hints && this.hints.length > 0) {
                    const hintText = this.hints[this.currentHintIndex % this.hints.length];
                    const hintNum = (this.currentHintIndex % this.hints.length) + 1;
                    this.currentHintIndex++;
                    this.showAiFeedback(`
                        <div class="ai-hint-callout">
                            <div class="ai-callout-header">
                                <span class="ai-badge-hint">💡 Hint ${hintNum} of ${this.hints.length}</span>
                                <span class="ai-tutor-tag">Progressive Guidance</span>
                            </div>
                            <p class="ai-hint-body">${this.escapeHTML(hintText)}</p>
                            <small class="ai-pedagogy-tip">Try applying this hint in your code before asking for the next one.</small>
                        </div>
                    `);
                    return;
                }

                // Otherwise request progressive hint from client service with current code
                if (window.aiAssistantClient) {
                    const res = await window.aiAssistantClient.generateProgressiveHints(this.concept || 'Layout or styling challenge');
                    this.showAiFeedback(`
                        <div class="ai-hint-callout">
                            <div class="ai-callout-header">
                                <span class="ai-badge-hint">💡 Step Hint</span>
                                <span class="ai-tutor-tag">Concept Focus</span>
                            </div>
                            <p class="ai-hint-body">${res.hint1 || res.hint2 || 'Focus on the parent element layout and display mode.'}</p>
                            <small class="ai-pedagogy-tip">Think about which element should be the flex/grid container.</small>
                        </div>
                    `);
                }
            });
        }

        // 2. "Review my code" -> Explain strengths and problems
        if (this.btnAiReview) {
            this.btnAiReview.addEventListener('click', async () => {
                this.showAiFeedback('<p class="ai-loading">🔍 Reviewing your code structure...</p>');
                const html = this.textareaHTML ? this.textareaHTML.value : '';
                const css = this.textareaCSS ? this.textareaCSS.value : '';

                if (window.aiAssistantClient) {
                    const res = await window.aiAssistantClient.reviewCode(html, css);
                    this.showAiFeedback(`
                        <div class="ai-review-callout">
                            <div class="ai-callout-header">
                                <span class="ai-badge-review">🔍 Code Review</span>
                                <span class="ai-tutor-tag">Pedagogical Feedback</span>
                            </div>
                            <div class="ai-review-section">
                                <strong class="review-label-strength">🌟 Strengths:</strong>
                                <ul>${(res.strengths || ['Good initial code setup']).map(s => `<li>${this.escapeHTML(s)}</li>`).join('')}</ul>
                            </div>
                            <div class="ai-review-section">
                                <strong class="review-label-problem">⚠️ Problems:</strong>
                                <ul>${(res.problems || ['No critical problems found']).map(p => `<li>${this.escapeHTML(p)}</li>`).join('')}</ul>
                            </div>
                            <div class="ai-review-section">
                                <strong class="review-label-suggestion">💡 Suggestions:</strong>
                                <ul>${(res.suggestions || ['Test responsiveness across screen sizes']).map(s => `<li>${this.escapeHTML(s)}</li>`).join('')}</ul>
                            </div>
                        </div>
                    `);
                }
            });
        }

        // 3. "Explain my error" -> Explain error and debugging approach
        if (this.btnAiError) {
            this.btnAiError.addEventListener('click', async () => {
                this.showAiFeedback('<p class="ai-loading">❓ Analyzing errors and debugging approach...</p>');
                const html = this.textareaHTML ? this.textareaHTML.value : '';
                const css = this.textareaCSS ? this.textareaCSS.value : '';
                const syntaxErrors = this.validateSyntax(html, css);

                let errorSummary = syntaxErrors.length > 0
                    ? syntaxErrors.map(e => `${e.source}: ${e.message} (Line ${e.line})`).join('\n')
                    : 'Check for layout overflow, unclosed elements, or uncentered boxes';

                if (window.aiAssistantClient) {
                    const res = await window.aiAssistantClient.explainError(errorSummary);
                    this.showAiFeedback(`
                        <div class="ai-error-callout">
                            <div class="ai-callout-header">
                                <span class="ai-badge-error">❓ Error & Debugging Guide</span>
                            </div>
                            <div class="ai-error-body" style="white-space: pre-line; line-height: 1.55;">
                                ${this.escapeHTML(res.explanation || '')}
                            </div>
                        </div>
                    `);
                }
            });
        }

        // 4. "Explain this concept" -> Explain fundamental concept
        if (this.btnAiConcept) {
            this.btnAiConcept.addEventListener('click', async () => {
                this.showAiFeedback('<p class="ai-loading">🧠 Formulating concept explanation...</p>');
                const query = `Explain the core concept of ${this.concept || document.title || 'this topic'} in simple beginner terms.`;

                if (window.aiAssistantClient) {
                    const res = await window.aiAssistantClient.askTutor(query);
                    this.showAiFeedback(`
                        <div class="ai-concept-callout">
                            <div class="ai-callout-header">
                                <span class="ai-badge-concept">🧠 Concept Breakdown</span>
                            </div>
                            <div class="ai-concept-body" style="white-space: pre-line; line-height: 1.6;">
                                ${this.escapeHTML(res.response || 'HTML defines structure, CSS controls presentation.')}
                            </div>
                        </div>
                    `);
                }
            });
        }

        // 5. "Show answer" -> Only provide full answer after explicit request (avoids copy-paste learning)
        if (this.btnAiShowAnswer) {
            this.btnAiShowAnswer.addEventListener('click', () => {
                this.showAiFeedback(`
                    <div class="ai-answer-confirm-box">
                        <h4>⚠️ Reveal Solution?</h4>
                        <p>Figuring out challenges on your own builds long-term programming mastery. Are you sure you want to reveal the answer now?</p>
                        <div class="ai-confirm-actions">
                            <button type="button" class="btn-confirm-reveal button primary-button">Yes, reveal answer</button>
                            <button type="button" class="btn-cancel-reveal button secondary-button">Keep trying</button>
                        </div>
                    </div>
                `);

                const revealBtn = this.aiResponseContent.querySelector('.btn-confirm-reveal');
                const cancelBtn = this.aiResponseContent.querySelector('.btn-cancel-reveal');

                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        this.hideAiFeedback();
                    });
                }

                if (revealBtn) {
                    revealBtn.addEventListener('click', () => {
                        const solHtml = this.solutionHTML || '<!-- Review target challenge solution -->';
                        const solCss = this.solutionCSS || '';
                        const explanation = this.solutionExplanation || 'Review the completed markup and styles above.';

                        this.showAiFeedback(`
                            <div class="ai-solution-callout">
                                <div class="ai-callout-header">
                                    <span class="ai-badge-solution">🏆 Verified Solution</span>
                                    <span class="ai-tutor-tag">Explicit Request</span>
                                </div>
                                <div class="ai-solution-code">
                                    <strong>HTML:</strong>
                                    <pre><code>${this.escapeHTML(solHtml)}</code></pre>
                                    ${solCss ? `<strong>CSS:</strong><pre><code>${this.escapeHTML(solCss)}</code></pre>` : ''}
                                </div>
                                <div class="ai-solution-explanation">
                                    <strong>Why this works:</strong>
                                    <p>${this.escapeHTML(explanation)}</p>
                                </div>
                                <small class="ai-pedagogy-tip">⚠️ To build muscle memory, type this code into your editor manually rather than copy-pasting!</small>
                            </div>
                        `);
                    });
                }
            });
        }

        // Dismiss AI response panel
        if (this.btnDismissAi) {
            this.btnDismissAi.addEventListener('click', () => {
                this.hideAiFeedback();
            });
        }


        // Line numbers & Tab indentation for HTML
        this.setupTextarea(this.textareaHTML, this.linesHTML);

        // Line numbers & Tab indentation for CSS
        if (this.textareaCSS) {
            this.setupTextarea(this.textareaCSS, this.linesCSS);
        }
    }

    setupTextarea(textarea, lineNumbersElem) {
        if (!textarea) return;

        const syncLines = () => {
            this.updateLineNumbers(textarea, lineNumbersElem);
        };

        // Tab key handling (2 spaces)
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 2;
                syncLines();
            }
        });

        // Auto-run debounce and input syncing
        let debounceTimer;
        textarea.addEventListener('input', () => {
            syncLines();
            this.saveCodeLocally();
            if (this.autoRun) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => this.executeCode(), 400);
            }
        });

        // Sync scroll between line numbers and textarea
        textarea.addEventListener('scroll', () => {
            if (lineNumbersElem) {
                lineNumbersElem.scrollTop = textarea.scrollTop;
            }
        }, { passive: true });

        // Initial line numbers
        syncLines();
    }

    updateLineNumbers(textarea, lineNumbersElem) {
        if (!textarea || !lineNumbersElem) return;
        const lineCount = textarea.value.split('\n').length;
        let linesStr = '';
        for (let i = 1; i <= Math.max(lineCount, 1); i++) {
            linesStr += i + '\n';
        }
        lineNumbersElem.textContent = linesStr;
    }

    executeCode() {
        const htmlCode = this.textareaHTML ? this.textareaHTML.value : '';
        const cssCode = (this.showCSS && this.textareaCSS) ? this.textareaCSS.value : '';

        const errors = this.validateSyntax(htmlCode, cssCode);

        if (errors.length > 0) {
            const errorHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                            margin: 0;
                            padding: 1.25rem;
                            background-color: #fff1f2;
                            color: #9f1239;
                        }
                        .error-card {
                            background: #ffffff;
                            border: 1px solid #fecdd3;
                            border-left: 5px solid #e11d48;
                            border-radius: 8px;
                            padding: 16px 20px;
                            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                        }
                        h3 {
                            margin-top: 0;
                            color: #be123c;
                            font-size: 1.05rem;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        }
                        .error-item {
                            background: #fff1f2;
                            border-radius: 4px;
                            padding: 8px 12px;
                            margin: 8px 0;
                            font-family: monospace;
                            font-size: 0.9rem;
                        }
                        p { margin-bottom: 0; font-size: 0.85rem; color: #4c0519; opacity: 0.85; }
                    </style>
                </head>
                <body>
                    <div class="error-card">
                        <h3>❌ Syntax Notice</h3>
                        ${errors.map(err => `<div class="error-item"><strong>${err.source}:</strong> ${err.message} (Line ${err.line})</div>`).join('')}
                        <p>💡 Fix the issue above to view your rendered webpage.</p>
                    </div>
                </body>
                </html>
            `;
            this.iframe.srcdoc = errorHtml;
            return;
        }

        // Render full document securely
        let combinedSource = htmlCode;
        if (this.showCSS && cssCode.trim()) {
            if (combinedSource.includes('</head>')) {
                combinedSource = combinedSource.replace('</head>', `<style>\n${cssCode}\n</style></head>`);
            } else if (combinedSource.includes('<html>')) {
                combinedSource = combinedSource.replace('<html>', `<html><head><style>\n${cssCode}\n</style></head>`);
            } else {
                combinedSource = `<style>\n${cssCode}\n</style>\n${combinedSource}`;
            }
        }

        this.iframe.srcdoc = combinedSource;
    }

    validateSyntax(html, css) {
        const errorList = [];

        // HTMLHint Validation
        if (typeof HTMLHint !== 'undefined' && html.trim()) {
            try {
                const results = HTMLHint.verify(html, {
                    "tag-pair": true,
                    "tagname-lowercase": true,
                    "id-unique": true,
                    "src-not-empty": true
                });
                results.filter(m => m.type === 'error').forEach(err => {
                    errorList.push({ source: 'HTML Error', line: err.line, message: err.message });
                });
            } catch (e) {
                // Ignore parsing engine anomalies
            }
        }

        // CSSLint Validation
        if (this.showCSS && typeof CSSLint !== 'undefined' && css.trim()) {
            try {
                const cssResults = CSSLint.verify(css);
                cssResults.messages.filter(m => m.type === 'error' || (m.message && m.message.includes('Expected'))).forEach(err => {
                    errorList.push({ source: 'CSS Error', line: err.line || 1, message: err.message });
                });
            } catch (e) {
                // Ignore parsing engine anomalies
            }
        }

        return errorList;
    }

    saveCodeLocally() {
        try {
            const data = {
                html: this.textareaHTML ? this.textareaHTML.value : '',
                css: (this.showCSS && this.textareaCSS) ? this.textareaCSS.value : '',
                updatedAt: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            if (this.saveIndicator) {
                this.saveIndicator.textContent = 'Saved';
                setTimeout(() => {
                    if (this.saveIndicator) this.saveIndicator.textContent = 'Auto-saved';
                }, 1500);
            }
        } catch (e) {
            // LocalStorage quota or access exception handling
        }
    }

    loadSavedCode() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.html !== undefined && this.textareaHTML) {
                    this.textareaHTML.value = parsed.html;
                    this.updateLineNumbers(this.textareaHTML, this.linesHTML);
                }
                if (this.showCSS && parsed.css !== undefined && this.textareaCSS) {
                    this.textareaCSS.value = parsed.css;
                    this.updateLineNumbers(this.textareaCSS, this.linesCSS);
                }
            }
        } catch (e) {
            // Ignore corrupted local storage
        }
    }

    showAiFeedback(htmlContent, type = 'info') {
        if (!this.aiResponsePanel || !this.aiResponseContent) return;
        this.aiResponseContent.innerHTML = htmlContent;
        this.aiResponsePanel.className = `editor-ai-response-panel panel-${type}`;
        this.aiResponsePanel.classList.remove('hidden');
    }

    hideAiFeedback() {
        if (this.aiResponsePanel) {
            this.aiResponsePanel.classList.add('hidden');
        }
    }

    escapeHTML(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

// Global initialization helper
window.InteractiveCodeEditor = InteractiveCodeEditor;

