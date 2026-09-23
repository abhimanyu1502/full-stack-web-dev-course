/**
 * Redesigned Interactive Code Editor Component
 * Lightweight, zero-dependency, device-adaptive HTML & CSS sandbox.
 * Compatible with Phones (tabbed Code/Preview), Tablets, and Laptops (split dual-pane).
 */

class InteractiveCodeEditor {
    constructor(options = {}, extraOptions = {}) {
        let opts = options;
        if (options instanceof HTMLElement || typeof options === 'string') {
            opts = Object.assign({}, extraOptions, { container: options });
        }
        this.container = typeof opts.container === 'string'
            ? document.querySelector(opts.container)
            : opts.container;

        if (!this.container) {
            console.error('InteractiveCodeEditor: Container not found');
            return;
        }

        this.id = opts.id || 'editor_' + Math.random().toString(36).substring(2, 9);
        this.title = opts.title || 'Interactive Sandbox';
        this.initialHTML = opts.html !== undefined ? opts.html : (opts.starterHTML !== undefined ? opts.starterHTML : '<h1>Hello World</h1>\n<p>Start editing this code!</p>');
        this.initialCSS = opts.css !== undefined ? opts.css : (opts.starterCSS !== undefined ? opts.starterCSS : '');
        this.showCSS = opts.showCSS !== undefined ? opts.showCSS : (this.initialCSS.trim().length > 0);
        this.storageKey = `saved_code_${this.id}`;
        this.activeTab = 'html'; // 'html', 'css', or 'preview' (for mobile)

        this.render();
        this.bindEvents();
        this.loadSavedCode();
        this.executeCode();
    }

    escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    render() {
        this.container.classList.add('unified-editor-root');
        this.container.innerHTML = `
            <div class="editor-toolbar">
                <div class="editor-toolbar-title">
                    <span class="editor-tag">CODE SANDBOX</span>
                    <span class="editor-title-text">${this.escapeHTML(this.title)}</span>
                </div>
                <div class="editor-toolbar-actions">
                    <button type="button" class="btn-editor-action btn-copy" title="Copy code to clipboard">
                        📋 <span>Copy</span>
                    </button>
                    <button type="button" class="btn-editor-action btn-reset" title="Reset to initial code">
                        ⟳ <span>Reset</span>
                    </button>
                    <button type="button" class="btn-editor-action btn-run" title="Run code and update preview">
                        ▶ <span>Run</span>
                    </button>
                </div>
            </div>

            <!-- Mobile Viewport Tab Switcher -->
            <div class="editor-mobile-tabs" role="tablist" aria-label="Editor tabs">
                <button type="button" class="mobile-tab-btn active" data-tab="html" role="tab" aria-selected="true">
                    <span class="tab-dot html-dot"></span> HTML
                </button>
                ${this.showCSS ? `
                <button type="button" class="mobile-tab-btn" data-tab="css" role="tab" aria-selected="false">
                    <span class="tab-dot css-dot"></span> CSS
                </button>
                ` : ''}
                <button type="button" class="mobile-tab-btn" data-tab="preview" role="tab" aria-selected="false">
                    <span class="tab-dot live-dot"></span> Live Output 👁️
                </button>
            </div>

            <div class="editor-main-grid ${this.showCSS ? 'has-css-pane' : 'single-pane'}">
                <!-- HTML Code Pane -->
                <div class="editor-code-pane pane-html tab-content-active">
                    <div class="pane-header">
                        <span class="pane-title"><span class="lang-dot html-dot"></span> HTML</span>
                        <span class="pane-hint">index.html</span>
                    </div>
                    <div class="editor-textarea-wrapper">
                        <div class="line-numbers line-numbers-html" aria-hidden="true">1</div>
                        <textarea class="editor-textarea textarea-html" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-label="HTML Code Editor">${this.escapeHTML(this.initialHTML)}</textarea>
                    </div>
                </div>

                ${this.showCSS ? `
                <!-- CSS Code Pane -->
                <div class="editor-code-pane pane-css">
                    <div class="pane-header">
                        <span class="pane-title"><span class="lang-dot css-dot"></span> CSS</span>
                        <span class="pane-hint">style.css</span>
                    </div>
                    <div class="editor-textarea-wrapper">
                        <div class="line-numbers line-numbers-css" aria-hidden="true">1</div>
                        <textarea class="editor-textarea textarea-css" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-label="CSS Code Editor" placeholder="/* Write your CSS rules here */">${this.escapeHTML(this.initialCSS)}</textarea>
                    </div>
                </div>
                ` : ''}

                <!-- Live Preview Pane -->
                <div class="editor-preview-pane">
                    <div class="pane-header preview-header">
                        <span class="pane-title"><span class="lang-dot live-dot"></span> Live Output</span>
                        <span class="save-status-indicator">Auto-saved</span>
                    </div>
                    <div class="preview-iframe-wrapper">
                        <iframe class="preview-iframe" sandbox="allow-scripts allow-modals" title="Live Preview Output"></iframe>
                    </div>
                </div>
            </div>
        `;

        this.textareaHTML = this.container.querySelector('.textarea-html');
        this.linesHTML = this.container.querySelector('.line-numbers-html');
        this.textareaCSS = this.container.querySelector('.textarea-css');
        this.linesCSS = this.container.querySelector('.line-numbers-css');
        this.iframe = this.container.querySelector('.preview-iframe');
        this.btnRun = this.container.querySelector('.btn-run');
        this.btnReset = this.container.querySelector('.btn-reset');
        this.btnCopy = this.container.querySelector('.btn-copy');
        this.saveIndicator = this.container.querySelector('.save-status-indicator');
        this.mobileTabs = this.container.querySelectorAll('.mobile-tab-btn');
        this.paneHTML = this.container.querySelector('.pane-html');
        this.paneCSS = this.container.querySelector('.pane-css');
        this.panePreview = this.container.querySelector('.editor-preview-pane');
    }

    bindEvents() {
        // Run code button
        if (this.btnRun) {
            this.btnRun.addEventListener('click', () => {
                this.executeCode();
                this.saveCodeLocally();
                this.flashIndicator('Saved & Updated');
            });
        }

        // Reset code button
        if (this.btnReset) {
            this.btnReset.addEventListener('click', () => {
                if (confirm('Reset code to initial template?')) {
                    this.textareaHTML.value = this.initialHTML;
                    if (this.showCSS && this.textareaCSS) {
                        this.textareaCSS.value = this.initialCSS;
                    }
                    this.updateLineNumbers(this.textareaHTML, this.linesHTML);
                    if (this.showCSS && this.textareaCSS) {
                        this.updateLineNumbers(this.textareaCSS, this.linesCSS);
                    }
                    this.saveCodeLocally();
                    this.executeCode();
                    this.flashIndicator('Reset to default');
                }
            });
        }

        // Copy button
        if (this.btnCopy) {
            this.btnCopy.addEventListener('click', () => {
                const html = this.textareaHTML ? this.textareaHTML.value : '';
                const css = (this.showCSS && this.textareaCSS) ? this.textareaCSS.value : '';
                let fullText = html;
                if (this.showCSS && css.trim()) {
                    fullText = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}`;
                }

                navigator.clipboard.writeText(fullText).then(() => {
                    const span = this.btnCopy.querySelector('span');
                    if (span) span.textContent = 'Copied!';
                    setTimeout(() => {
                        if (span) span.textContent = 'Copy';
                    }, 2000);
                }).catch(() => {
                    // Fallback
                    const textarea = document.createElement('textarea');
                    textarea.value = fullText;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    const span = this.btnCopy.querySelector('span');
                    if (span) span.textContent = 'Copied!';
                    setTimeout(() => {
                        if (span) span.textContent = 'Copy';
                    }, 2000);
                });
            });
        }

        // Mobile Tab Switcher
        if (this.mobileTabs) {
            this.mobileTabs.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetTab = btn.dataset.tab;
                    this.mobileTabs.forEach(b => {
                        b.classList.toggle('active', b === btn);
                        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
                    });

                    // Hide all panes on mobile and show only active
                    if (this.paneHTML) this.paneHTML.classList.toggle('mobile-pane-active', targetTab === 'html');
                    if (this.paneCSS) this.paneCSS.classList.toggle('mobile-pane-active', targetTab === 'css');
                    if (this.panePreview) this.panePreview.classList.toggle('mobile-pane-active', targetTab === 'preview');

                    if (targetTab === 'preview') {
                        this.executeCode();
                    }
                });
            });

            // Set initial mobile active pane
            if (this.paneHTML) this.paneHTML.classList.add('mobile-pane-active');
        }

        // Textarea typing events & auto-run debounce
        let debounceTimer;
        const onCodeChange = (textarea, linesEl) => {
            this.updateLineNumbers(textarea, linesEl);
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.executeCode();
                this.saveCodeLocally();
            }, 600);
        };

        if (this.textareaHTML) {
            this.textareaHTML.addEventListener('input', () => onCodeChange(this.textareaHTML, this.linesHTML));
            this.textareaHTML.addEventListener('scroll', () => {
                if (this.linesHTML) this.linesHTML.scrollTop = this.textareaHTML.scrollTop;
            });
            this.bindKeyShortcuts(this.textareaHTML);
            this.updateLineNumbers(this.textareaHTML, this.linesHTML);
        }

        if (this.showCSS && this.textareaCSS) {
            this.textareaCSS.addEventListener('input', () => onCodeChange(this.textareaCSS, this.linesCSS));
            this.textareaCSS.addEventListener('scroll', () => {
                if (this.linesCSS) this.linesCSS.scrollTop = this.textareaCSS.scrollTop;
            });
            this.bindKeyShortcuts(this.textareaCSS);
            this.updateLineNumbers(this.textareaCSS, this.linesCSS);
        }
    }

    bindKeyShortcuts(textarea) {
        textarea.addEventListener('keydown', (e) => {
            // Tab key indents by 2 spaces
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 2;
                textarea.dispatchEvent(new Event('input'));
            }
            // Ctrl/Cmd + Enter runs code
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.executeCode();
                this.saveCodeLocally();
                this.flashIndicator('Executed');
            }
        });
    }

    updateLineNumbers(textarea, linesEl) {
        if (!textarea || !linesEl) return;
        const lineCount = (textarea.value.match(/\n/g) || []).length + 1;
        let linesStr = '';
        for (let i = 1; i <= lineCount; i++) {
            linesStr += i + '\n';
        }
        linesEl.textContent = linesStr;
    }

    executeCode() {
        if (!this.iframe) return;
        const html = this.textareaHTML ? this.textareaHTML.value : '';
        const css = (this.showCSS && this.textareaCSS) ? this.textareaCSS.value : '';

        // Check if html already contains <html>/<body> tags
        let combined = '';
        if (html.toLowerCase().includes('<html') || html.toLowerCase().includes('<!doctype')) {
            if (css.trim()) {
                // Inject css into existing head
                if (html.toLowerCase().includes('</head>')) {
                    combined = html.replace(/<\/head>/i, `<style>${css}</style></head>`);
                } else {
                    combined = `<style>${css}</style>` + html;
                }
            } else {
                combined = html;
            }
        } else {
            combined = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 1.25rem;
      margin: 0;
      color: #1a202c;
      background-color: #ffffff;
      line-height: 1.6;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
        }

        try {
            this.iframe.srcdoc = combined;
        } catch (e) {
            console.error('Editor iframe render error:', e);
        }
    }

    saveCodeLocally() {
        try {
            const data = {
                html: this.textareaHTML ? this.textareaHTML.value : '',
                css: (this.showCSS && this.textareaCSS) ? this.textareaCSS.value : '',
                updatedAt: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (_) {}
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
                if (parsed.css !== undefined && this.showCSS && this.textareaCSS) {
                    this.textareaCSS.value = parsed.css;
                    this.updateLineNumbers(this.textareaCSS, this.linesCSS);
                }
            }
        } catch (_) {}
    }

    flashIndicator(msg) {
        if (!this.saveIndicator) return;
        this.saveIndicator.textContent = msg;
        this.saveIndicator.style.opacity = '1';
        setTimeout(() => {
            this.saveIndicator.textContent = 'Auto-saved';
        }, 1800);
    }
}

// Global exposure
window.InteractiveCodeEditor = InteractiveCodeEditor;
window.LiveCodeEditor = InteractiveCodeEditor;
