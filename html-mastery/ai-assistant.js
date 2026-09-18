/**
 * AI Assistant Client Architecture
 * 
 * SECURITY:
 * - NO API keys or secret credentials are kept or sent from the client.
 * - Dispatches requests to the secure proxy backend endpoint (/api/ai).
 * - Includes a client-side pedagogical fallback if the proxy server is offline.
 */

class AIAssistantClient {
    constructor(endpoint = '/api/ai') {
        this.endpoint = endpoint;
    }

    /**
     * Helper to gather current workspace context
     */
    getCurrentContext() {
        let lessonTitle = document.title || 'HTML/CSS Lesson';
        const h1 = document.querySelector('h1');
        if (h1) lessonTitle = h1.textContent.trim();

        // Check active editor content
        let html = '';
        let css = '';

        const htmlTextarea = document.querySelector('.pane-html .editor-textarea, #html-code');
        if (htmlTextarea) html = htmlTextarea.value;

        const cssTextarea = document.querySelector('.pane-css .editor-textarea, #css-code');
        if (cssTextarea) css = cssTextarea.value;

        return {
            lesson: lessonTitle,
            html,
            css
        };
    }

    /**
     * Dispatch request to secure backend or local pedagogical fallback
     */
    async sendRequest(mode, payload) {
        try {
            const res = await fetch(this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode, ...payload })
            });

            if (res.ok) {
                const json = await res.json();
                if (json.success && json.data) {
                    return json.data;
                }
            }
        } catch (e) {
            // Fallback gracefully when backend server is not running
        }

        return this.localPedagogicalFallback(mode, payload);
    }

    /**
     * 1. AI Tutor: Answers student questions with guidance
     */
    async askTutor(question) {
        const ctx = this.getCurrentContext();
        return this.sendRequest('tutor', {
            question,
            lesson: ctx.lesson,
            html: ctx.html,
            css: ctx.css
        });
    }

    /**
     * 2. AI Code Reviewer: Strengths, Problems, Suggestions, Learning Recommendations
     */
    async reviewCode(customHtml, customCss) {
        const ctx = this.getCurrentContext();
        return this.sendRequest('code_review', {
            html: customHtml || ctx.html,
            css: customCss || ctx.css,
            lesson: ctx.lesson
        });
    }

    /**
     * 3. AI Hint Generator: Progressive 4-tier hints
     */
    async generateProgressiveHints(taskDescription) {
        const ctx = this.getCurrentContext();
        return this.sendRequest('hint_generator', {
            task: taskDescription,
            html: ctx.html,
            css: ctx.css,
            lesson: ctx.lesson
        });
    }

    /**
     * 4. AI Error Explainer: Plain English breakdown
     */
    async explainError(errorText) {
        const ctx = this.getCurrentContext();
        return this.sendRequest('error_explainer', {
            errorText,
            html: ctx.html,
            css: ctx.css
        });
    }

    /**
     * 5. AI Exercise Generator: Custom practice challenge
     */
    async generateExercise(topic, difficulty, skillLevel = 'Beginner') {
        return this.sendRequest('exercise_generator', {
            topic,
            difficulty,
            skillLevel
        });
    }

    /**
     * 6. AI Project Mentor: 5-step milestone breakdown
     */
    async mentorProject(projectIdea) {
        return this.sendRequest('project_mentor', {
            projectIdea
        });
    }

    /**
     * Client-side pedagogical fallback engine
     */
    localPedagogicalFallback(mode, payload) {
        const { question = '', html = '', css = '', lesson = '', topic = '', difficulty = '', errorText = '', projectIdea = '' } = payload;

        if (mode === 'tutor') {
            const q = (question || '').toLowerCase();
            if (q.includes('center') || q.includes('div')) {
                return {
                    response: `Centering a \`<div>\` is one of the most important concepts to master in CSS!

Here are two primary techniques:
1. **Flexbox (Parent Container)**:
   Add \`display: flex;\`, \`justify-content: center;\` (horizontal), and \`align-items: center;\` (vertical) to the **parent** element. Ensure the parent has a height (like \`min-height: 100vh;\`).
2. **Auto Margins (Block element)**:
   If your div has a specified \`width\` (e.g. \`width: 320px;\`), setting \`margin: 0 auto;\` centers it horizontally within its parent block.

Does your current CSS set \`display: flex\` on the div's parent container? Try checking that first!`
                };
            }
            return {
                response: `You're currently exploring "${lesson || 'Web Development'}"!

To troubleshoot:
1. **Check HTML tags**: Verify that each tag is properly paired and nested.
2. **Check CSS Selectors**: Ensure your class name matches the HTML (e.g. \`.my-card\` in CSS matches \`class="my-card"\` in HTML).
3. **Inspect the Box Model**: Check if margin, padding, or border might be altering the expected spacing.

What behavior are you seeing in the live preview right now?`
            };
        }

        if (mode === 'code_review') {
            const strengths = ['Proper structural separation of concerns.'];
            const problems = [];
            const suggestions = [];

            if (html.includes('alt=')) strengths.push('Included descriptive alt attributes.');
            else {
                problems.push('Images may be missing accessibility `alt` attributes.');
                suggestions.push('Add clear `alt="..."` descriptions to all image elements.');
            }

            if (css.includes('flex') || css.includes('grid')) strengths.push('Good use of modern layout standards.');
            else suggestions.push('Consider modernizing layout with CSS Flexbox (`display: flex`).');

            return {
                strengths,
                problems: problems.length > 0 ? problems : ['No critical structural issues detected.'],
                suggestions: suggestions.length > 0 ? suggestions : ['Review responsive media query behavior.'],
                learningRecommendation: 'Practice semantic markup hierarchy and modern Flexbox alignment properties.'
            };
        }

        if (mode === 'hint_generator') {
            return {
                hint1: 'Hint 1 (Concept): Identify which parent element wraps the content you want to adjust.',
                hint2: 'Hint 2 (Narrowing): Inspect the display mode of that parent container.',
                hint3: 'Hint 3 (Specific Property): Apply `display: flex;` with `justify-content` or `gap`.',
                hint4: 'Hint 4 (Implementation): `.parent { display: flex; justify-content: center; }`'
            };
        }

        if (mode === 'error_explainer') {
            return {
                explanation: `**Error Explanation**: "${errorText || 'Syntax or Alignment issue'}"

**Why this occurs:** In HTML and CSS, browsers are forgiving but will misbehave if tags aren't closed, a semicolon is missing after a CSS property, or a selector is misspelled.

**How to solve:** Check that all tags are closed properly, verify semicolons at the end of each CSS declaration, and check the browser console for specific line warnings.`
            };
        }

        if (mode === 'exercise_generator') {
            const targetTopic = topic || 'Flexbox Alignment';
            return {
                title: `${targetTopic} Challenge`,
                difficulty: difficulty || '🟢 Easy',
                objective: `Practice positioning items using modern ${targetTopic} rules.`,
                requirements: [
                    'Create a parent container with the specified layout display',
                    'Align children horizontally and vertically',
                    'Add appropriate spacing and padding'
                ],
                starterCode: {
                    html: `<div class="card-container">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>`,
                    css: `.card-container {\n  /* Add your layout styles here */\n  border: 2px dashed #94a3b8;\n  min-height: 200px;\n}\n.box {\n  background: #3b82f6;\n  color: white;\n  padding: 20px;\n  border-radius: 6px;\n}`
                },
                hints: [
                    'Hint 1: Apply display flex to the parent .card-container.',
                    'Hint 2: Use justify-content: space-around to spread items out evenly.',
                    'Hint 3: Use align-items: center to center boxes vertically.',
                    'Hint 4: .card-container { display: flex; justify-content: space-around; align-items: center; }'
                ],
                solution: `.card-container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  border: 2px dashed #94a3b8;\n  min-height: 200px;\n}`,
                explanation: 'Setting `display: flex` turns the element into a flex container. `justify-content` manages distribution along the main axis, while `align-items` handles cross-axis alignment.'
            };
        }

        if (mode === 'project_mentor') {
            const idea = projectIdea || 'Interactive Web Project';
            return {
                projectTitle: idea,
                overview: `Here is a structured 5-step milestone breakdown to build "${idea}" without getting overwhelmed:`,
                milestones: [
                    { step: 1, title: 'Structure & Semantic Markup', description: 'Draft the page skeleton using semantic HTML tags (<header>, <main>, <section>, <footer>).' },
                    { step: 2, title: 'Color Palette & Typography', description: 'Establish CSS custom properties for primary/secondary colors and apply font families.' },
                    { step: 3, title: 'Layout & Box Model', description: 'Implement responsive Flexbox or Grid containers with proper margin and padding.' },
                    { step: 4, title: 'Interactivity & Transitions', description: 'Add hover states (:hover), active buttons, and smooth transition effects.' },
                    { step: 5, title: 'Responsive Testing & Polish', description: 'Test on mobile screen widths using media queries and verify accessibility.' }
                ]
            };
        }

        return { response: 'Hello! I am your AI Web Development Tutor. How can I assist you today?' };
    }
}

window.aiAssistantClient = new AIAssistantClient();
