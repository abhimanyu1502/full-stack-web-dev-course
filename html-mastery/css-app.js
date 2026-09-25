document.addEventListener('DOMContentLoaded', () => {
    // Inject Linters
    if (typeof HTMLHint === 'undefined') {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/htmlhint/0.11.4/htmlhint.js";
        document.head.appendChild(script);
    }
    if (typeof CSSLint === 'undefined') {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/csslint/1.0.5/csslint.js";
        document.head.appendChild(script);
    }
    if (typeof QuizEngine === 'undefined') {
        const qScript = document.createElement('script');
        qScript.src = "quiz-engine.js";
        document.head.appendChild(qScript);
    }
    if (typeof window.quizEngineData === 'undefined') {
        const qDataScript = document.createElement('script');
        qDataScript.src = "quiz-data.js";
        document.head.appendChild(qDataScript);
    }
    if (typeof window.progressSystem === 'undefined') {
        const pScript = document.createElement('script');
        pScript.src = "progress.js";
        document.head.appendChild(pScript);
    }

    const tocList = document.getElementById('css-toc-list');
    const mainContent = document.getElementById('main-content') || document.getElementById('css-main-content');
    const lessons = window.cssLessons || [];
    
    // 1. Generate Sidebar TOC grouped by Category
    let currentCategory = "";
    lessons.forEach(lesson => {
        if (lesson.category !== currentCategory) {
            currentCategory = lesson.category;
            const categoryHeader = document.createElement('li');
            categoryHeader.className = 'toc-category';
            categoryHeader.style.cssText = 'font-weight:bold; margin-top:15px; color:var(--text-secondary); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; padding: 0 12px; pointer-events: none;';
            categoryHeader.textContent = currentCategory;
            tocList.appendChild(categoryHeader);
        }
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `?topic=${lesson.id}`;
        a.textContent = lesson.title;
        a.id = `link-${lesson.id}`;
        
        const closeMobileSidebar = () => {
            if (typeof window.closeSidebar === 'function') {
                window.closeSidebar();
            } else {
                const sb = document.getElementById('sidebar');
                if (sb && sb.classList.contains('open')) sb.classList.remove('open');
                const backdrop = document.querySelector('.sidebar-backdrop');
                if (backdrop) backdrop.classList.remove('active');
                const toggle = document.getElementById('mobile-menu-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.setAttribute('aria-label', 'Open navigation menu');
                }
                document.body.classList.remove('mobile-nav-open');
                document.body.style.overflow = '';
            }
        };

        // INTERCEPT CLICK FOR SPA — no page refresh
        a.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', `?topic=${lesson.id}`);
            renderLesson(lesson.id);
            closeMobileSidebar();
        });
        
        li.appendChild(a);
        tocList.appendChild(li);
    });

    // Helper: escape HTML for display in code blocks
    const escapeHtml = (str) => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Make renderLesson globally available so script.js search bar can use it
    window.renderLesson = (topicId) => {
        // Automatically close mobile/tablet sidebar navigation if open
        if (typeof window.closeSidebar === 'function') {
            window.closeSidebar();
        } else {
            const sb = document.getElementById('sidebar');
            if (sb && sb.classList.contains('open')) sb.classList.remove('open');
            const backdrop = document.querySelector('.sidebar-backdrop');
            if (backdrop) backdrop.classList.remove('active');
            const toggle = document.getElementById('mobile-menu-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Open navigation menu');
            }
            document.body.classList.remove('mobile-nav-open');
            document.body.style.overflow = '';
        }

        const currentLessonIndex = lessons.findIndex(l => l.id === topicId);
        const lesson = lessons[currentLessonIndex];

        if (!lesson) {
            mainContent.innerHTML = `<h2>Topic not found</h2><p>Please select a topic from the sidebar.</p>`;
            return;
        }

        // Remove active class from all links & highlight current
        document.querySelectorAll('#css-toc-list a').forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(`link-${lesson.id}`);
        if (activeLink) {
            activeLink.classList.add('active');
            setTimeout(() => activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }

        // Scroll main content to top
        window.scrollTo(0, 0);

        // Update page title with numbered topic
        document.title = `${lesson.title} — CSS Mastery`;

        const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
        const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;
        const difficultyColor = lesson.difficulty === 'Beginner' ? '#16a34a' : '#d97706';

        // Build the code example section — show code on left, rendered preview on right
        const codeExampleSection = lesson.codeExample ? `
            <div class="css-lesson-block" style="margin-top: 2rem;">
                <h2 style="margin-bottom: 0.75rem;">Code Example</h2>
                <div class="code-example-grid" style="border:1px solid var(--border-color); border-radius:var(--radius-md); overflow:hidden;">
                    <!-- Code Side -->
                    <div style="background:#1e1e1e;">
                        <div style="background:#18181b; color:#94a3b8; font-size:0.75rem; padding:8px 14px; border-bottom:1px solid #27272a; font-family:var(--font-mono);">
                            ${lesson.codeExample.css ? 'index.html + style.css' : 'index.html'}
                        </div>
                        <pre style="background:#1e1e1e; color:#d4d4d4; margin:0; padding:16px; overflow-x:auto; font-size:13px; font-family:var(--font-mono); line-height:1.6; max-height:300px; overflow-y:auto;"><code>${escapeHtml(lesson.codeExample.html)}${lesson.codeExample.css ? '\n\n/* --- style.css --- */\n' + escapeHtml(lesson.codeExample.css) : ''}</code></pre>
                    </div>
                    <!-- Live Preview Side -->
                    <div style="background:var(--surface-color); display:flex; flex-direction:column;">
                        <div style="background:var(--bg-tertiary); color:var(--text-secondary); font-size:0.75rem; padding:8px 14px; border-bottom:1px solid var(--border-color); border-left:1px solid var(--border-color); font-weight:600;">
                            ▶ Live Output
                        </div>
                        <iframe id="example-preview" sandbox="allow-scripts" title="Lesson Live Output" style="flex:1; width:100%; border:none; border-left:1px solid var(--border-color); min-height:220px; background:#ffffff;"></iframe>
                    </div>
                </div>
            </div>

            <div style="margin-top:1.5rem;">
                <h2 style="margin-bottom:0.5rem;">Explanation of the Code</h2>
                <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem 1.25rem; color:var(--text-primary); line-height:1.6;">
                    ${lesson.codeExplanation}
                </div>
            </div>
        ` : (lesson.codeExplanation ? `
            <div style="margin-top:1.5rem;">
                <h2 style="margin-bottom:0.5rem;">Explanation of the Code</h2>
                <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem 1.25rem; color:var(--text-primary); line-height:1.6;">
                    ${lesson.codeExplanation}
                </div>
            </div>
        ` : '');

        let html = `
            <div class="lesson-header" style="margin-bottom: 2rem; padding-bottom:1.5rem; border-bottom:1px solid var(--border-color);">
                <span style="color: var(--text-secondary); text-transform: uppercase; font-size: 0.8rem; letter-spacing:1px;">CSS Mastery › ${lesson.category} • Lesson ${currentLessonIndex + 1} of ${lessons.length}</span>
                <h1 style="margin-top: 0.4rem; margin-bottom:0.5rem;">${lesson.title}</h1>
                <span style="display: inline-block; padding: 3px 12px; background: ${difficultyColor}; color: white; border-radius: 20px; font-size: 0.78rem; font-weight: bold;">🟢 ${lesson.difficulty}</span>
            </div>

            <!-- Tag Placement Indicator: Head vs Body -->
            <div class="tag-placement-callout placement-head-box">
                <div class="placement-badge">🎨 &lt;head&gt; or &lt;body&gt;</div>
                <div class="placement-content">
                    <strong>Tag Placement:</strong> External stylesheets are linked via <code>&lt;link rel="stylesheet" href="..."&gt;</code> inside the <code>&lt;head&gt;</code> tag, or embedded via internal <code>&lt;style&gt;</code> tags inside <code>&lt;head&gt;</code>. Inline styles are applied directly to HTML tags in the <code>&lt;body&gt;</code> tag using the <code>style="..."</code> attribute.
                </div>
            </div>

            <section class="lesson-content">

                <div class="css-lesson-block">
                    <h3 style="margin-bottom:0.5rem;">What is it?</h3>
                    <p style="font-size: 1.05rem; line-height: 1.7; margin:0; color:var(--text-primary);">${lesson.explanation}</p>
                </div>

                <div class="card tip-card" style="margin-top:1.5rem;">
                    <div class="card-icon">💡</div>
                    <div class="card-content">
                        <strong>Why does this matter?</strong>
                        <p>${lesson.why}</p>
                    </div>
                </div>

                <div class="css-lesson-block" style="margin-top:2rem;">
                    <h3 style="margin-bottom:0.75rem;">📐 Syntax</h3>
                    <div class="code-block-wrapper">
                        <pre><code>${escapeHtml(lesson.syntax)}</code></pre>
                    </div>
                </div>

                ${codeExampleSection}

                <div class="card best-practice-card" style="margin: 2rem 0;">
                    <div class="card-icon">⭐</div>
                    <div class="card-content">
                        <strong>Key Takeaway</strong>
                        <p>${lesson.takeaways}</p>
                    </div>
                </div>

                ${lesson.exercise && lesson.exercise.instruction ? `
                <div style="margin-top: 2rem; margin-bottom: 1.5rem;">
                    <h2>Practice</h2>
                    <div class="card practice-card">
                        <div class="card-icon">💻</div>
                        <div class="card-content">
                            <strong>Try it yourself</strong>
                            <p>${escapeHtml(lesson.exercise.instruction)}</p>
                        </div>
                    </div>
                </div>
                ` : ''}
            </section>

            <!-- Visual Interactive Playground Container -->
            <div id="lesson-playground-container"></div>

            <!-- Reusable Exercise System Container -->
            <div id="lesson-exercise-container"></div>

            <!-- Lightweight Quiz Engine Container -->
            <div id="lesson-quiz-container"></div>

            <div class="pagination-container" style="display: flex; justify-content: space-between; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color); gap:10px; flex-wrap:wrap;">
                ${prevLesson ? `<a href="?topic=${prevLesson.id}" class="button nav-btn" data-topic="${prevLesson.id}">← ${prevLesson.title}</a>` : `<div></div>`}
                ${nextLesson ? `<a href="?topic=${nextLesson.id}" class="button primary-button nav-btn" data-topic="${nextLesson.id}">Next: ${nextLesson.title} →</a>` : `<div></div>`}
            </div>
        `;

        mainContent.innerHTML = html;

        // Render visual interactive playground supplement if applicable
        const pgContainer = document.getElementById('lesson-playground-container');
        if (pgContainer && window.CSSPlaygrounds) {
            if (['css-box-model', 'box-sizing', 'margin', 'padding', 'borders', 'width-and-height'].includes(lesson.id)) {
                window.CSSPlaygrounds.renderBoxModel(pgContainer);
            } else if (['flexbox-introduction', 'justify-content-align-items', 'flex-direction-wrap-gap'].includes(lesson.id)) {
                window.CSSPlaygrounds.renderFlexbox(pgContainer);
            } else if (['grid-introduction', 'grid-template-columns', 'grid-placement'].includes(lesson.id)) {
                window.CSSPlaygrounds.renderGrid(pgContainer);
            } else if (['position', 'z-index'].includes(lesson.id)) {
                window.CSSPlaygrounds.renderPosition(pgContainer);
            }
        }

        // Render the code example iframe safely without triggering SecurityError
        if (lesson.codeExample) {
            const exampleFrame = document.getElementById('example-preview');
            if (exampleFrame) {
                exampleFrame.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:sans-serif;padding:12px;} ${lesson.codeExample.css || ''}</style></head><body>${lesson.codeExample.html}</body></html>`;
            }
        }

        // Initialize Reusable Code Sandbox (clean, matching HTML section design)
        const initCssEditor = () => {
            if (typeof InteractiveCodeEditor !== 'undefined') {
                const exContainer = document.getElementById('lesson-exercise-container');
                if (!exContainer) return;
                exContainer.innerHTML = '';
                new InteractiveCodeEditor({
                    container: exContainer,
                    id: `css_${lesson.id}`,
                    title: `Practice: ${lesson.title}`,
                    starterHTML: (lesson.exercise && lesson.exercise.starterHTML) ? lesson.exercise.starterHTML : '<div>\n  <h1>Practice CSS</h1>\n  <p>Style this element!</p>\n</div>',
                    starterCSS: (lesson.exercise && lesson.exercise.starterCSS) ? lesson.exercise.starterCSS : 'h1 {\n  color: #2563eb;\n}\n\np {\n  color: #4b5563;\n}',
                    showCSS: true
                });
            } else {
                setTimeout(initCssEditor, 40);
            }
        };
        initCssEditor();

        // Initialize Lightweight Quiz Engine Checkpoints
        let cssCheckpointId = null;
        if (['borders', 'typography', 'units'].includes(lesson.id)) {
            cssCheckpointId = 'css-foundations-checkpoint';
        } else if (['overflow', 'display', 'position'].includes(lesson.id)) {
            cssCheckpointId = 'css-box-model-layout-checkpoint';
        } else if (['media-queries', 'grid', 'flexbox'].includes(lesson.id)) {
            cssCheckpointId = 'css-flexbox-grid-checkpoint';
        }

        const initCssQuiz = () => {
            if (typeof QuizEngine !== 'undefined') {
                let quizConfig = null;
                if (cssCheckpointId && window.quizEngineData && window.quizEngineData[cssCheckpointId]) {
                    quizConfig = {
                        container: '#lesson-quiz-container',
                        id: cssCheckpointId,
                        title: window.quizEngineData[cssCheckpointId].title,
                        description: window.quizEngineData[cssCheckpointId].description,
                        questions: window.quizEngineData[cssCheckpointId].questions
                    };
                } else {
                    quizConfig = {
                        container: '#lesson-quiz-container',
                        id: `css_quiz_${lesson.id}`,
                        title: `Knowledge Check: ${lesson.title}`,
                        description: `Reinforce ${lesson.title} concepts before advancing.`,
                        questions: [
                            {
                                type: 'multiple-choice',
                                question: `Which core CSS property or rule is primarily associated with ${lesson.title}?`,
                                options: [
                                    `Properties defined in ${lesson.title} documentation`,
                                    `Unrelated HTML attributes`,
                                    `JavaScript DOM handlers`
                                ],
                                correct: 0,
                                explanation: `Correct. ${lesson.title} rules directly govern element visual presentation and layout behavior in modern CSS.`
                            }
                        ]
                    };
                }
                new QuizEngine(quizConfig);
            } else {
                setTimeout(initCssQuiz, 40);
            }
        };
        initCssQuiz();

        // Track Progress & Mount Dashboard Button
        const initProgressTrack = () => {
            if (window.progressSystem) {
                window.progressSystem.visitLesson(lesson.id, lesson.title, 'css', `css.html?topic=${lesson.id}`);
                window.progressSystem.mountDashboardButton();
            } else {
                setTimeout(initProgressTrack, 40);
            }
        };
        initProgressTrack();

        // INTERCEPT PAGINATION CLICKS for SPA
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const nextTopic = btn.getAttribute('data-topic');
                history.pushState(null, '', `?topic=${nextTopic}`);
                renderLesson(nextTopic);
            });
        });
    };

    // Initialize
    const urlParams = new URLSearchParams(window.location.search);
    let topicId = urlParams.get('topic');
    if (!topicId) { topicId = 'what-is-css'; history.replaceState(null, '', `?topic=${topicId}`); }
    renderLesson(topicId);

    // Browser back/forward
    window.addEventListener('popstate', () => {
        const p = new URLSearchParams(window.location.search);
        renderLesson(p.get('topic') || 'what-is-css');
    });
});
