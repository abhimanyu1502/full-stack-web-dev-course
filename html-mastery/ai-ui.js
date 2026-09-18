/**
 * AI Learning Assistant UI Drawer Component
 * Supports all 6 educational modes:
 * 1. AI Tutor (Contextual Q&A)
 * 2. AI Code Reviewer (Strengths, Problems, Suggestions, Learning Recommendations)
 * 3. AI Hint Generator (Progressive 4-tier hints)
 * 4. AI Error Explainer (Beginner-friendly error translations)
 * 5. AI Exercise Generator (Dynamic challenge generator)
 * 6. AI Project Mentor (Milestone project planning)
 */

class AIAssistantUI {
    constructor() {
        this.activeTab = 'tutor';
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createLauncher();
        this.createDrawer();
        this.attachEvents();
    }

    createLauncher() {
        if (document.getElementById('btn-ai-launcher')) return;

        const btn = document.createElement('button');
        btn.id = 'btn-ai-launcher';
        btn.type = 'button';
        btn.className = 'ai-launcher-btn';
        btn.innerHTML = `<span class="ai-launcher-icon">🤖</span> <span class="ai-launcher-label">AI Tutor</span>`;
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            this.toggleDrawer();
        });
    }

    createDrawer() {
        if (document.getElementById('ai-assistant-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'ai-assistant-modal';
        modal.className = 'ai-assistant-modal';
        modal.innerHTML = `
            <div class="ai-modal-card">
                <div class="ai-modal-header">
                    <div class="ai-title-group">
                        <span class="ai-header-icon">🤖</span>
                        <div>
                            <h3>AI Learning Assistant</h3>
                            <span class="ai-subtitle">Pedagogical Tutor & Code Mentor</span>
                        </div>
                    </div>
                    <button type="button" class="btn-close-ai" id="btn_close_ai">✕</button>
                </div>

                <!-- Mode Tabs -->
                <div class="ai-tabs-bar">
                    <button type="button" class="ai-tab-btn active" data-tab="tutor">🎓 Tutor</button>
                    <button type="button" class="ai-tab-btn" data-tab="reviewer">🔍 Code Review</button>
                    <button type="button" class="ai-tab-btn" data-tab="hints">💡 Hints</button>
                    <button type="button" class="ai-tab-btn" data-tab="error">⚠️ Error Explainer</button>
                    <button type="button" class="ai-tab-btn" data-tab="exercise">🧪 Exercise Gen</button>
                    <button type="button" class="ai-tab-btn" data-tab="mentor">🗺️ Project Mentor</button>
                </div>

                <!-- Drawer Body Panels -->
                <div class="ai-panels-container">
                    <!-- Tab 1: Tutor -->
                    <div class="ai-panel active" id="panel_tutor">
                        <div class="ai-chat-history" id="tutor_chat_history">
                            <div class="ai-chat-bubble ai-bubble">
                                <span class="ai-bubble-badge">AI Tutor</span>
                                <p>Hi! I'm your AI Web Development Tutor. Ask me anything about HTML & CSS (e.g. <em>"Why isn't my div centered?"</em> or <em>"How does flexbox gap work?"</em>). I'll guide you step-by-step!</p>
                            </div>
                        </div>
                        <form class="ai-chat-input-row" id="form_tutor_ask">
                            <input type="text" id="input_tutor_query" placeholder="Ask a question (e.g. Why isn't my div centered?)..." required>
                            <button type="submit" class="button primary-button">Ask Tutor</button>
                        </form>
                    </div>

                    <!-- Tab 2: Code Reviewer -->
                    <div class="ai-panel" id="panel_reviewer">
                        <p class="panel-intro">Click below to receive a friendly code review of your currently active HTML and CSS editor code.</p>
                        <button type="button" class="button primary-button" id="btn_run_review">🔍 Review My Code</button>
                        <div id="review_results" class="review-results-box hidden"></div>
                    </div>

                    <!-- Tab 3: Hint Generator -->
                    <div class="ai-panel" id="panel_hints">
                        <p class="panel-intro">Stuck on a problem? Enter your task objective to generate 4 progressive hints without spoiling the final answer.</p>
                        <form id="form_generate_hints">
                            <input type="text" id="input_hint_task" placeholder="What are you trying to build or fix?..." required>
                            <button type="submit" class="button primary-button" style="margin-top: 8px;">Generate Progressive Hints</button>
                        </form>
                        <div id="hints_results" class="hints-results-box hidden"></div>
                    </div>

                    <!-- Tab 4: Error Explainer -->
                    <div class="ai-panel" id="panel_error">
                        <p class="panel-intro">Paste an unexpected layout quirk or syntax error message to receive a friendly beginner explanation.</p>
                        <form id="form_explain_error">
                            <input type="text" id="input_error_text" placeholder="e.g. Child elements spilling out of container, or unclosed tag..." required>
                            <button type="submit" class="button primary-button" style="margin-top: 8px;">Explain Error</button>
                        </form>
                        <div id="error_results" class="error-results-box hidden"></div>
                    </div>

                    <!-- Tab 5: Exercise Generator -->
                    <div class="ai-panel" id="panel_exercise">
                        <p class="panel-intro">Generate a custom targeted coding challenge on any topic.</p>
                        <form id="form_generate_exercise" class="exercise-gen-form">
                            <div class="form-row">
                                <label>Topic: <input type="text" id="gen_topic" placeholder="e.g. Flexbox, Tables, Form Validation" value="Flexbox Alignment" required></label>
                                <label>Difficulty:
                                    <select id="gen_difficulty">
                                        <option value="🟢 Easy">🟢 Easy</option>
                                        <option value="🟡 Medium">🟡 Medium</option>
                                        <option value="🔴 Hard">🔴 Hard</option>
                                    </select>
                                </label>
                            </div>
                            <button type="submit" class="button primary-button" style="margin-top: 8px;">Generate Challenge</button>
                        </form>
                        <div id="exercise_results" class="exercise-results-box hidden"></div>
                    </div>

                    <!-- Tab 6: Project Mentor -->
                    <div class="ai-panel" id="panel_mentor">
                        <p class="panel-intro">Have a project idea? The AI Project Mentor will break it into 5 logical milestones so you don't get overwhelmed.</p>
                        <form id="form_project_mentor">
                            <input type="text" id="input_project_idea" placeholder="e.g. Personal Photography Portfolio or Coffee Shop Menu..." required>
                            <button type="submit" class="button primary-button" style="margin-top: 8px;">Create Milestones</button>
                        </form>
                        <div id="mentor_results" class="mentor-results-box hidden"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    toggleDrawer() {
        const modal = document.getElementById('ai-assistant-modal');
        if (!modal) return;
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            modal.classList.add('active');
        } else {
            modal.classList.remove('active');
        }
    }

    attachEvents() {
        const modal = document.getElementById('ai-assistant-modal');
        const closeBtn = document.getElementById('btn_close_ai');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggleDrawer());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.toggleDrawer();
            });
        }

        // Tab Switching
        modal.querySelectorAll('.ai-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // 1. Tutor Ask
        const tutorForm = document.getElementById('form_tutor_ask');
        if (tutorForm) {
            tutorForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const input = document.getElementById('input_tutor_query');
                const query = input.value.trim();
                if (!query) return;

                this.appendChatMessage('user', query);
                input.value = '';

                const replyObj = await window.aiAssistantClient.askTutor(query);
                this.appendChatMessage('ai', replyObj.response || 'Let me help you think through this problem.');
            });
        }

        // 2. Code Review
        const reviewBtn = document.getElementById('btn_run_review');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', async () => {
                const resultsBox = document.getElementById('review_results');
                resultsBox.classList.remove('hidden');
                resultsBox.innerHTML = '<p class="ai-loading">Analyzing your HTML & CSS structure...</p>';

                const res = await window.aiAssistantClient.reviewCode();
                resultsBox.innerHTML = `
                    <div class="review-card">
                        <h4>🌟 Strengths</h4>
                        <ul>${(res.strengths || []).map(s => `<li>${s}</li>`).join('')}</ul>

                        <h4>⚠️ Problems</h4>
                        <ul>${(res.problems || []).map(p => `<li>${p}</li>`).join('')}</ul>

                        <h4>💡 Suggestions</h4>
                        <ul>${(res.suggestions || []).map(s => `<li>${s}</li>`).join('')}</ul>

                        <h4>📚 Learning Recommendation</h4>
                        <p class="rec-box">${res.learningRecommendation || 'Keep practicing!'}</p>
                    </div>
                `;
            });
        }

        // 3. Hint Generator
        const hintForm = document.getElementById('form_generate_hints');
        if (hintForm) {
            hintForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const task = document.getElementById('input_hint_task').value.trim();
                const box = document.getElementById('hints_results');
                box.classList.remove('hidden');
                box.innerHTML = '<p class="ai-loading">Formulating progressive hints...</p>';

                const res = await window.aiAssistantClient.generateProgressiveHints(task);
                box.innerHTML = `
                    <div class="progressive-hints-deck">
                        <div class="hint-tile"><strong>Hint 1 (Concept):</strong> ${res.hint1 || ''}</div>
                        <div class="hint-tile"><strong>Hint 2 (Narrowing):</strong> ${res.hint2 || ''}</div>
                        <div class="hint-tile"><strong>Hint 3 (Specific Property):</strong> ${res.hint3 || ''}</div>
                        <div class="hint-tile"><strong>Hint 4 (Implementation):</strong> <code>${res.hint4 || ''}</code></div>
                    </div>
                `;
            });
        }

        // 4. Error Explainer
        const errorForm = document.getElementById('form_explain_error');
        if (errorForm) {
            errorForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const err = document.getElementById('input_error_text').value.trim();
                const box = document.getElementById('error_results');
                box.classList.remove('hidden');
                box.innerHTML = '<p class="ai-loading">Translating error...</p>';

                const res = await window.aiAssistantClient.explainError(err);
                box.innerHTML = `
                    <div class="error-card">
                        <p style="white-space: pre-line; line-height: 1.6;">${res.explanation || ''}</p>
                    </div>
                `;
            });
        }

        // 5. Exercise Generator
        const exForm = document.getElementById('form_generate_exercise');
        if (exForm) {
            exForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const topic = document.getElementById('gen_topic').value.trim();
                const diff = document.getElementById('gen_difficulty').value;
                const box = document.getElementById('exercise_results');
                box.classList.remove('hidden');
                box.innerHTML = '<p class="ai-loading">Generating custom challenge...</p>';

                const res = await window.aiAssistantClient.generateExercise(topic, diff);
                box.innerHTML = `
                    <div class="gen-exercise-card">
                        <div class="gen-ex-header">
                            <span class="difficulty-badge">${res.difficulty}</span>
                            <h3>${res.title}</h3>
                        </div>
                        <p><strong>Objective:</strong> ${res.objective}</p>
                        <strong>Requirements:</strong>
                        <ul>${(res.requirements || []).map(r => `<li>${r}</li>`).join('')}</ul>
                        <strong>Explanation:</strong>
                        <p>${res.explanation}</p>
                    </div>
                `;
            });
        }

        // 6. Project Mentor
        const mentorForm = document.getElementById('form_project_mentor');
        if (mentorForm) {
            mentorForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const idea = document.getElementById('input_project_idea').value.trim();
                const box = document.getElementById('mentor_results');
                box.classList.remove('hidden');
                box.innerHTML = '<p class="ai-loading">Structuring project milestones...</p>';

                const res = await window.aiAssistantClient.mentorProject(idea);
                box.innerHTML = `
                    <div class="mentor-plan-card">
                        <h3>🗺️ ${res.projectTitle}</h3>
                        <p>${res.overview}</p>
                        <div class="milestones-breakdown-list">
                            ${(res.milestones || []).map(m => `
                                <div class="milestone-plan-item">
                                    <span class="step-badge">Step ${m.step}</span>
                                    <strong>${m.title}</strong>
                                    <p>${m.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        const modal = document.getElementById('ai-assistant-modal');
        if (!modal) return;

        modal.querySelectorAll('.ai-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });

        modal.querySelectorAll('.ai-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `panel_${tabName}`);
        });
    }

    appendChatMessage(sender, text) {
        const chatBox = document.getElementById('tutor_chat_history');
        if (!chatBox) return;

        const bubble = document.createElement('div');
        bubble.className = `ai-chat-bubble ${sender === 'user' ? 'user-bubble' : 'ai-bubble'}`;
        bubble.innerHTML = `
            <span class="ai-bubble-badge">${sender === 'user' ? 'You' : 'AI Tutor'}</span>
            <p style="white-space: pre-line; line-height: 1.6;">${text}</p>
        `;
        chatBox.appendChild(bubble);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistantUI = new AIAssistantUI();
});
