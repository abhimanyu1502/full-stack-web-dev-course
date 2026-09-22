/**
 * Project-Based Learning Runner Engine v2
 * - 5-step milestone stepper with live code editor
 * - Export code as .html file download
 * - GitHub commit via PAT (stored in localStorage, never sent to our server)
 * - Cloud submission to backend /api/projects/submit
 * - LocalStorage persistence of code per project
 */

class ProjectRunner {
    constructor(containerId, projectData) {
        this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        this.project = projectData;
        this.currentStep = 1;
        this.completedSteps = new Set();

        // Restore code from localStorage if available
        const savedKey = `project_code_${this.project.id}`;
        const saved = this._loadCode(savedKey);
        this.userHtml = saved ? saved.html : (this.project.starterCode.html || '');
        this.userCss  = saved ? saved.css  : (this.project.starterCode.css  || '');

        this.init();
    }

    _loadCode(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (_) { return null; }
    }

    _saveCode() {
        try {
            localStorage.setItem(
                `project_code_${this.project.id}`,
                JSON.stringify({ html: this.userHtml, css: this.userCss })
            );
        } catch (_) {}
    }

    init() {
        if (!this.container || !this.project) return;
        this.render();
    }

    render() {
        const isProjectComplete = this.completedSteps.size === 5;
        const milestone = this.project.milestones.find(m => m.step === this.currentStep) || this.project.milestones[0];

        const stepperPillsHTML = this.project.milestones.map(m => {
            const isDone = this.completedSteps.has(m.step);
            const isActive = m.step === this.currentStep;
            return `
                <button type="button"
                        class="step-pill ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}"
                        data-step="${m.step}"
                        ${!isDone && m.step > this.completedSteps.size + 1 ? 'disabled' : ''}>
                    ${isDone ? '✓' : `Step ${m.step}`}
                </button>
            `;
        }).join('');

        const skillsHTML = this.project.skills.map(s => `<span class="skill-tag">✓ ${s}</span>`).join('');

        this.container.innerHTML = `
            <div class="project-runner-root">
                <!-- GitHub PAT Modal -->
                <div id="github-pat-modal" class="github-pat-modal hidden">
                    <div class="pat-modal-card">
                        <button type="button" class="pat-modal-close" id="pat-modal-close">✕</button>
                        <div class="pat-modal-header">
                            <span class="pat-modal-icon">🐙</span>
                            <h3>Commit to GitHub</h3>
                        </div>
                        <p class="pat-modal-desc">Enter your GitHub details below. Your token is stored only in your browser's <code>localStorage</code> and is never sent to our servers.</p>
                        <div class="pat-field-group">
                            <label for="pat-owner">GitHub Username / Org</label>
                            <input type="text" id="pat-owner" placeholder="e.g. abhim" autocomplete="off">
                        </div>
                        <div class="pat-field-group">
                            <label for="pat-repo">Repository Name</label>
                            <input type="text" id="pat-repo" placeholder="e.g. my-html-projects" autocomplete="off">
                        </div>
                        <div class="pat-field-group">
                            <label for="pat-token">Personal Access Token <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener" class="pat-token-link">Create one ↗</a></label>
                            <input type="password" id="pat-token" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" autocomplete="off">
                            <label class="pat-remember-row">
                                <input type="checkbox" id="pat-remember" checked> Remember settings in this browser
                            </label>
                        </div>
                        <div id="pat-feedback" class="pat-feedback hidden"></div>
                        <div class="pat-actions">
                            <button type="button" class="btn-pat-cancel" id="pat-cancel-btn">Cancel</button>
                            <button type="button" class="btn-pat-commit" id="pat-commit-btn">🚀 Commit File</button>
                        </div>
                    </div>
                </div>

                <!-- Project Header Banner -->
                <div class="project-header-banner">
                    <div class="proj-title-group">
                        <span class="proj-icon">${this.project.icon}</span>
                        <div>
                            <div class="proj-badge-row">
                                <span class="difficulty-badge">${this.project.difficulty}</span>
                                <span class="track-badge">${this.project.track.toUpperCase()} Project</span>
                            </div>
                            <h2>${this.project.title}</h2>
                        </div>
                    </div>
                </div>

                <!-- Objective & Requirements -->
                <div class="project-info-card">
                    <div class="proj-objective">
                        <strong>🎯 Objective:</strong> ${this.project.objective}
                    </div>
                    <div class="proj-requirements">
                        <strong>📋 Requirements:</strong>
                        <ul>${this.project.requirements.map(req => `<li>${req}</li>`).join('')}</ul>
                    </div>
                </div>

                <!-- 5-Step Progress Stepper Bar -->
                <div class="stepper-bar-container">
                    <div class="stepper-bar-title">Project Progress (5 Steps):</div>
                    <div class="stepper-pills-row">${stepperPillsHTML}</div>
                </div>

                ${isProjectComplete ? this.renderCompletionCardHTML(skillsHTML) : this.renderMilestoneWorkspaceHTML(milestone)}
            </div>
        `;

        this.attachEventListeners();
        if (!isProjectComplete) {
            this.mountLiveEditor();
        }
    }

    renderMilestoneWorkspaceHTML(milestone) {
        return `
            <div class="milestone-workspace">
                <!-- Current Step Details -->
                <div class="step-details-card">
                    <div class="step-card-header">
                        <span class="step-badge">Step ${milestone.step} of 5</span>
                        <h3>${milestone.title}</h3>
                    </div>
                    <p class="step-instructions">${milestone.instructions}</p>

                    <div id="milestone-hint-box" class="milestone-hint-box hidden">
                        <strong>💡 Step Hint:</strong>
                        <p id="milestone-hint-text"></p>
                    </div>

                    <div class="step-actions-row">
                        <button type="button" class="btn-show-step-hint" id="btn_step_hint">💡 Need Hint?</button>
                        <button type="button" class="btn-verify-step" id="btn_verify_step">Verify Step ${milestone.step} →</button>
                    </div>

                    <div id="step-feedback" class="step-feedback hidden"></div>
                </div>

                <!-- Export / GitHub Actions Bar -->
                <div class="project-export-bar">
                    <span class="export-bar-label">📦 Your Code:</span>
                    <div class="export-bar-actions">
                        <button type="button" class="btn-export-code" id="btn_export_html" title="Download your code as a .html file">
                            ⬇ Export .html
                        </button>
                        <button type="button" class="btn-github-commit" id="btn_github_commit" title="Commit your code to a GitHub repository">
                            🐙 Commit to GitHub
                        </button>
                        <button type="button" class="btn-cloud-submit" id="btn_cloud_submit" title="Submit your work to the platform gallery (requires login)">
                            ☁ Submit to Gallery
                        </button>
                    </div>
                </div>

                <!-- Live Editor Container -->
                <div id="project-editor-container" class="project-editor-container"></div>
            </div>
        `;
    }

    renderCompletionCardHTML(skillsHTML) {
        return `
            <div class="project-completion-card project-reveal-animation">
                <div class="completion-header">
                    <span class="completion-trophy">🏆</span>
                    <h2>Project Complete!</h2>
                    <p class="completion-subtext">Congratulations! You successfully built the <strong>${this.project.title}</strong> project across all 5 milestones.</p>
                </div>

                <div class="skills-practiced-box">
                    <h4>🛠️ Skills Practiced in this Project:</h4>
                    <div class="skills-tags-list">${skillsHTML}</div>
                </div>

                <!-- Export from completion screen too -->
                <div class="completion-export-bar">
                    <p class="completion-export-note">📁 Save your finished project:</p>
                    <div class="export-bar-actions">
                        <button type="button" class="btn-export-code" id="btn_export_html_done">⬇ Export .html</button>
                        <button type="button" class="btn-github-commit" id="btn_github_commit_done">🐙 Commit to GitHub</button>
                        <button type="button" class="btn-cloud-submit" id="btn_cloud_submit_done">☁ Submit to Gallery</button>
                    </div>
                </div>

                <div class="completion-actions">
                    <button type="button" class="btn-reset-project button secondary-button" id="btn_reset_proj">🔄 Restart Project</button>
                    <a href="projects.html" class="button primary-button">Select Next Project →</a>
                </div>
            </div>
        `;
    }

    mountLiveEditor() {
        const editorContainer = document.getElementById('project-editor-container');
        if (!editorContainer) return;

        editorContainer.innerHTML = '';
        const milestone = this.project.milestones.find(m => m.step === this.currentStep) || this.project.milestones[0];

        try {
            if (window.InteractiveCodeEditor) {
                this.editorInstance = new window.InteractiveCodeEditor(editorContainer, {
                    id: `proj_${this.project.id}`,
                    html: this.userHtml,
                    css: this.userCss,
                    hasCssPane: true,
                    showCSS: true,
                    concept: this.project.title,
                    hints: milestone.hints || [],
                    onCheck: () => {
                        this.verifyCurrentStep();
                    },
                    onChange: (html, css) => {
                        this.userHtml = html;
                        this.userCss = css;
                        this._saveCode();
                    }
                });
                return;
            }
        } catch (err) {
            console.error('Error mounting InteractiveCodeEditor:', err);
        }

        this._mountFallbackEditor(editorContainer);
    }

    _mountFallbackEditor(container) {
        container.innerHTML = `
            <div class="project-fallback-editor" style="margin-top:1rem; padding:1.25rem; background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                    <h4 style="margin:0;">💻 Interactive Workspace</h4>
                    <button type="button" class="button primary-button" id="btn_run_fallback" style="padding:0.4rem 0.9rem; font-size:0.85rem;">▶ Run & Preview</button>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
                    <div>
                        <label style="display:block; font-weight:600; font-size:0.82rem; margin-bottom:0.35rem; color:var(--text-secondary);">HTML (index.html)</label>
                        <textarea id="fallback_html" style="width:100%; height:240px; font-family:var(--font-mono, monospace); font-size:0.88rem; padding:0.75rem; background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-color); border-radius:8px; resize:vertical;" spellcheck="false"></textarea>
                    </div>
                    <div>
                        <label style="display:block; font-weight:600; font-size:0.82rem; margin-bottom:0.35rem; color:var(--text-secondary);">CSS (style.css)</label>
                        <textarea id="fallback_css" style="width:100%; height:240px; font-family:var(--font-mono, monospace); font-size:0.88rem; padding:0.75rem; background:var(--bg-primary); color:var(--text-primary); border:1px solid var(--border-color); border-radius:8px; resize:vertical;" spellcheck="false"></textarea>
                    </div>
                </div>
                <div style="margin-top:1rem;">
                    <label style="display:block; font-weight:600; font-size:0.82rem; margin-bottom:0.35rem; color:var(--text-secondary);">Live Output Preview</label>
                    <iframe id="fallback_iframe" style="width:100%; height:300px; border:1px solid var(--border-color); border-radius:8px; background:#ffffff;" sandbox="allow-scripts allow-modals"></iframe>
                </div>
            </div>
        `;
        const htmlTa = container.querySelector('#fallback_html');
        const cssTa = container.querySelector('#fallback_css');
        const iframe = container.querySelector('#fallback_iframe');
        const runBtn = container.querySelector('#btn_run_fallback');

        htmlTa.value = this.userHtml;
        cssTa.value = this.userCss;

        const updatePreview = () => {
            this.userHtml = htmlTa.value;
            this.userCss = cssTa.value;
            this._saveCode();
            iframe.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${this.userCss}</style></head><body>${this.userHtml}</body></html>`;
        };

        htmlTa.addEventListener('input', updatePreview);
        cssTa.addEventListener('input', updatePreview);
        if (runBtn) runBtn.addEventListener('click', updatePreview);
        updatePreview();
    }

    attachEventListeners() {
        // Step navigation clicks
        this.container.querySelectorAll('.step-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stepNum = parseInt(e.currentTarget.getAttribute('data-step'), 10);
                if (stepNum && (this.completedSteps.has(stepNum) || stepNum === this.completedSteps.size + 1)) {
                    // Sync code before stepping
                    if (this.editorInstance && typeof this.editorInstance.getHTML === 'function') {
                        this.userHtml = this.editorInstance.getHTML();
                        this.userCss = this.editorInstance.getCSS();
                        this._saveCode();
                    }
                    this.currentStep = stepNum;
                    this.render();
                }
            });
        });

        // Show Hint
        const hintBtn = this.container.querySelector('#btn_step_hint');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => {
                const milestone = this.project.milestones.find(m => m.step === this.currentStep);
                const hintBox = this.container.querySelector('#milestone-hint-box');
                const hintText = this.container.querySelector('#milestone-hint-text');
                if (milestone && milestone.hints && milestone.hints.length > 0) {
                    hintText.textContent = milestone.hints.join(' ');
                    hintBox.classList.remove('hidden');
                }
            });
        }

        // Verify Step
        const verifyBtn = this.container.querySelector('#btn_verify_step');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.verifyCurrentStep());
        }

        // Restart project
        const resetBtn = this.container.querySelector('#btn_reset_proj');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.completedSteps.clear();
                this.currentStep = 1;
                this.userHtml = this.project.starterCode.html || '';
                this.userCss  = this.project.starterCode.css  || '';
                this._saveCode();
                this.render();
            });
        }

        // Export buttons (both in workspace and on completion screen)
        ['btn_export_html', 'btn_export_html_done'].forEach(id => {
            const btn = this.container.querySelector(`#${id}`);
            if (btn) btn.addEventListener('click', () => this.exportAsHTML());
        });

        // GitHub Commit buttons
        ['btn_github_commit', 'btn_github_commit_done'].forEach(id => {
            const btn = this.container.querySelector(`#${id}`);
            if (btn) btn.addEventListener('click', () => this.openGitHubModal());
        });

        // Cloud Submit buttons
        ['btn_cloud_submit', 'btn_cloud_submit_done'].forEach(id => {
            const btn = this.container.querySelector(`#${id}`);
            if (btn) btn.addEventListener('click', () => this.submitToGallery(btn));
        });

        // GitHub PAT modal controls
        this._attachModalListeners();
    }

    _attachModalListeners() {
        const modal = this.container.querySelector('#github-pat-modal');
        if (!modal) return;

        const closeBtn  = modal.querySelector('#pat-modal-close');
        const cancelBtn = modal.querySelector('#pat-cancel-btn');
        const commitBtn = modal.querySelector('#pat-commit-btn');

        if (closeBtn)  closeBtn.addEventListener('click',  () => modal.classList.add('hidden'));
        if (cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });

        if (commitBtn) {
            commitBtn.addEventListener('click', () => this._doGitHubCommit(modal));
        }

        // Pre-fill from localStorage
        const stored = this._loadGitHubSettings();
        if (stored) {
            const ownerEl = modal.querySelector('#pat-owner');
            const repoEl  = modal.querySelector('#pat-repo');
            const tokenEl = modal.querySelector('#pat-token');
            if (ownerEl) ownerEl.value = stored.owner || '';
            if (repoEl)  repoEl.value  = stored.repo  || '';
            if (tokenEl) tokenEl.value = stored.token || '';
        }
    }

    _loadGitHubSettings() {
        try {
            const raw = localStorage.getItem('github_commit_settings');
            return raw ? JSON.parse(raw) : null;
        } catch (_) { return null; }
    }

    _saveGitHubSettings(owner, repo, token) {
        try {
            localStorage.setItem('github_commit_settings', JSON.stringify({ owner, repo, token }));
        } catch (_) {}
    }

    // ─── Export as HTML file ───────────────────────────────────────────────────
    exportAsHTML() {
        const combined = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.project.title}</title>
  <style>
${this.userCss}
  </style>
</head>
<body>
${this.userHtml}
</body>
</html>`;

        const blob = new Blob([combined], { type: 'text/html' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `${this.project.id.replace(/[^a-z0-9]/gi, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ─── GitHub Commit Modal ───────────────────────────────────────────────────
    openGitHubModal() {
        const modal = this.container.querySelector('#github-pat-modal');
        if (modal) {
            modal.classList.remove('hidden');
            const feedback = modal.querySelector('#pat-feedback');
            if (feedback) feedback.classList.add('hidden');
        }
    }

    async _doGitHubCommit(modal) {
        const owner    = modal.querySelector('#pat-owner')?.value.trim();
        const repo     = modal.querySelector('#pat-repo')?.value.trim();
        const token    = modal.querySelector('#pat-token')?.value.trim();
        const remember = modal.querySelector('#pat-remember')?.checked;
        const feedback = modal.querySelector('#pat-feedback');
        const commitBtn = modal.querySelector('#pat-commit-btn');

        if (!owner || !repo || !token) {
            this._showPatFeedback(feedback, 'error', '⚠ Please fill in all fields before committing.');
            return;
        }

        if (remember) this._saveGitHubSettings(owner, repo, token);

        const filename = `${this.project.id.replace(/[^a-z0-9]/gi, '-')}.html`;
        const combined = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.project.title}</title>
  <style>
${this.userCss}
  </style>
</head>
<body>
${this.userHtml}
</body>
</html>`;

        const contentBase64 = btoa(unescape(encodeURIComponent(combined)));
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;

        commitBtn.disabled = true;
        commitBtn.textContent = 'Committing…';
        this._showPatFeedback(feedback, 'info', '⏳ Connecting to GitHub…');

        try {
            // Check if file already exists (to get its SHA for update)
            let sha = null;
            const getRes = await fetch(apiUrl, {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json'
                }
            });
            if (getRes.ok) {
                const existing = await getRes.json();
                sha = existing.sha;
            }

            const body = {
                message: `📁 Add ${this.project.title} — via HTML & CSS Mastery`,
                content: contentBase64
            };
            if (sha) body.sha = sha;

            const putRes = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (putRes.ok) {
                const data = await putRes.json();
                const fileUrl = data.content?.html_url || `https://github.com/${owner}/${repo}`;
                this._showPatFeedback(feedback, 'success',
                    `✅ Committed! <a href="${fileUrl}" target="_blank" rel="noopener">View on GitHub ↗</a>`);
                commitBtn.textContent = '✓ Committed!';
            } else {
                const err = await putRes.json();
                this._showPatFeedback(feedback, 'error', `❌ GitHub Error: ${err.message || putRes.statusText}`);
                commitBtn.disabled = false;
                commitBtn.textContent = '🚀 Commit File';
            }
        } catch (err) {
            this._showPatFeedback(feedback, 'error', `❌ Network error: ${err.message}`);
            commitBtn.disabled = false;
            commitBtn.textContent = '🚀 Commit File';
        }
    }

    _showPatFeedback(el, type, message) {
        if (!el) return;
        el.className = `pat-feedback pat-feedback-${type}`;
        el.innerHTML = message;
        el.classList.remove('hidden');
    }

    // ─── Cloud Gallery Submit ──────────────────────────────────────────────────
    async submitToGallery(btn) {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            const goLogin = confirm('📢 You need to be logged in to submit to the gallery. Go to the login page?');
            if (goLogin) window.location.href = 'login.html';
            return;
        }

        btn.disabled = true;
        btn.textContent = '☁ Submitting…';

        const apiBase = (window.API_BASE || localStorage.getItem('api_endpoint') || (
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '5000' && window.location.port !== ''
                ? `http://${window.location.hostname}:5000`
                : ''
        )).replace(/\/$/, '');

        try {
            const res = await fetch(`${apiBase}/api/projects/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    projectId: this.project.id,
                    title: this.project.title,
                    htmlCode: this.userHtml,
                    cssCode: this.userCss
                })
            });

            if (res.ok) {
                btn.textContent = '✅ Submitted!';
                setTimeout(() => { btn.disabled = false; btn.textContent = '☁ Submit to Gallery'; }, 3000);
            } else {
                const data = await res.json();
                alert('Submission failed: ' + (data.error || 'Unknown error'));
                btn.disabled = false;
                btn.textContent = '☁ Submit to Gallery';
            }
        } catch (_) {
            alert('Network error. Make sure the local server is running (node server/index.js).');
            btn.disabled = false;
            btn.textContent = '☁ Submit to Gallery';
        }
    }

    // ─── Step Verification ────────────────────────────────────────────────────
    verifyCurrentStep() {
        const milestone = this.project.milestones.find(m => m.step === this.currentStep);
        const feedbackEl = this.container.querySelector('#step-feedback');
        if (!milestone || !feedbackEl) return;

        // Sync latest code from active editor
        if (this.editorInstance) {
            if (typeof this.editorInstance.getHTML === 'function') {
                this.userHtml = this.editorInstance.getHTML();
                this.userCss  = this.editorInstance.getCSS();
            } else if (this.editorInstance.textareaHTML) {
                this.userHtml = this.editorInstance.textareaHTML.value;
                this.userCss  = this.editorInstance.textareaCSS ? this.editorInstance.textareaCSS.value : '';
            }
        } else {
            const htmlTa = this.container.querySelector('#fallback_html');
            const cssTa = this.container.querySelector('#fallback_css');
            if (htmlTa) this.userHtml = htmlTa.value;
            if (cssTa)  this.userCss  = cssTa.value;
        }
        this._saveCode();

        const isValid = milestone.validation(this.userHtml, this.userCss);

        if (isValid) {
            this.completedSteps.add(this.currentStep);
            feedbackEl.className = 'step-feedback feedback-success';
            feedbackEl.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
                    <div>
                        <span>🎉</span> <strong>Step ${this.currentStep} Verified!</strong> Milestone requirements passed.
                    </div>
                    <span style="font-size:0.85rem; font-weight:600; opacity:0.95;">+50 XP • Advancing...</span>
                </div>
            `;
            feedbackEl.classList.remove('hidden');

            if (window.progressSystem && window.progressSystem.addXP) {
                window.progressSystem.addXP(50);
            }

            setTimeout(() => {
                if (this.currentStep < 5) {
                    this.currentStep += 1;
                    this.render();
                    const targetCard = this.container.querySelector('.step-details-card');
                    if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    if (window.progressSystem) {
                        window.progressSystem.completeProject(this.project.id, 300);
                    }
                    this.render();
                }
            }, 1200);
        } else {
            feedbackEl.className = 'step-feedback feedback-error';
            const hintPrompt = (milestone.hints && milestone.hints.length > 0)
                ? `<div style="margin-top:0.4rem; font-size:0.85rem; opacity:0.95;">💡 <strong>Quick Hint:</strong> ${this._escapeHTML(milestone.hints[0])}</div>`
                : '';
            feedbackEl.innerHTML = `
                <div>
                    <div><span>❌</span> <strong>Verification Incomplete for Step ${this.currentStep}:</strong></div>
                    <div style="margin-top:0.3rem; font-size:0.88rem; color:var(--text-secondary);">${this._escapeHTML(milestone.instructions)}</div>
                    ${hintPrompt}
                </div>
            `;
            feedbackEl.classList.remove('hidden');
        }
    }

    _escapeHTML(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

window.ProjectRunner = ProjectRunner;
