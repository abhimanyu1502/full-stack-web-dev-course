/**
 * Project-Based Learning Runner Engine
 * Manages 5-step milestone stepper, code editor sync, milestone validation,
 * progressive hints, and project completion state with skills practiced summary.
 */

class ProjectRunner {
    constructor(containerId, projectData) {
        this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        this.project = projectData;
        this.currentStep = 1;
        this.completedSteps = new Set();

        // Code state
        this.userHtml = this.project.starterCode.html || '';
        this.userCss = this.project.starterCode.css || '';

        this.init();
    }

    init() {
        if (!this.container || !this.project) return;
        this.render();
    }

    render() {
        const isProjectComplete = this.completedSteps.size === 5;
        const milestone = this.project.milestones.find(m => m.step === this.currentStep) || this.project.milestones[0];

        // Stepper HTML
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

        // Skills HTML
        const skillsHTML = this.project.skills.map(s => `
            <span class="skill-tag">✓ ${s}</span>
        `).join('');

        this.container.innerHTML = `
            <div class="project-runner-root">
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

                <!-- Objective & Requirements Accordion -->
                <div class="project-info-card">
                    <div class="proj-objective">
                        <strong>🎯 Objective:</strong> ${this.project.objective}
                    </div>
                    <div class="proj-requirements">
                        <strong>📋 Requirements:</strong>
                        <ul>
                            ${this.project.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- 5-Step Progress Stepper Bar -->
                <div class="stepper-bar-container">
                    <div class="stepper-bar-title">Project Progress (5 Steps):</div>
                    <div class="stepper-pills-row">
                        ${stepperPillsHTML}
                    </div>
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
                    <div class="skills-tags-list">
                        ${skillsHTML}
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

        if (window.InteractiveCodeEditor) {
            this.editorInstance = new window.InteractiveCodeEditor(editorContainer, {
                html: this.userHtml,
                css: this.userCss,
                hasCssPane: true,
                onChange: (html, css) => {
                    this.userHtml = html;
                    this.userCss = css;
                }
            });
        }
    }

    attachEventListeners() {
        // Step navigation clicks
        this.container.querySelectorAll('.step-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const stepNum = parseInt(e.currentTarget.getAttribute('data-step'), 10);
                if (stepNum && (this.completedSteps.has(stepNum) || stepNum === this.completedSteps.size + 1)) {
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
            verifyBtn.addEventListener('click', () => {
                this.verifyCurrentStep();
            });
        }

        // Restart project
        const resetBtn = this.container.querySelector('#btn_reset_proj');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.completedSteps.clear();
                this.currentStep = 1;
                this.userHtml = this.project.starterCode.html || '';
                this.userCss = this.project.starterCode.css || '';
                this.render();
            });
        }
    }

    verifyCurrentStep() {
        const milestone = this.project.milestones.find(m => m.step === this.currentStep);
        const feedbackEl = this.container.querySelector('#step-feedback');
        if (!milestone || !feedbackEl) return;

        // Run validation function
        const isValid = milestone.validation(this.userHtml, this.userCss);

        if (isValid) {
            this.completedSteps.add(this.currentStep);
            feedbackEl.className = 'step-feedback feedback-success';
            feedbackEl.innerHTML = `✅ <strong>Step ${this.currentStep} Verified!</strong> Great job following the milestone requirements.`;
            feedbackEl.classList.remove('hidden');

            setTimeout(() => {
                if (this.currentStep < 5) {
                    this.currentStep += 1;
                    this.render();
                } else {
                    // Project Complete!
                    if (window.progressSystem) {
                        window.progressSystem.completeProject(this.project.id, 300);
                    }
                    this.render();
                }
            }, 1200);
        } else {
            feedbackEl.className = 'step-feedback feedback-error';
            feedbackEl.innerHTML = `❌ <strong>Verification Incomplete:</strong> Your current code does not satisfy the requirements for Step ${this.currentStep}. Click "Need Hint?" for guidance.`;
            feedbackEl.classList.remove('hidden');
        }
    }
}

window.ProjectRunner = ProjectRunner;
