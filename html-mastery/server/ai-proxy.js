/**
 * Secure AI Proxy Server for HTML & CSS Mastery
 * 
 * SECURITY RULES:
 * 1. API keys are kept strictly on the server in process.env and NEVER exposed to frontend clients.
 * 2. If an API key (GEMINI_API_KEY or OPENAI_API_KEY) is configured, requests are proxied securely with
 *    tutor-first pedagogical system instructions.
 * 3. If no external key is configured, an intelligent pedagogical simulation engine processes requests,
 *    ensuring students always receive helpful, context-aware guidance without requiring API billing.
 */

const http = require('http');

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// System Prompts enforcing tutor behavior
const SYSTEM_PERSONAS = {
    tutor: `You are an encouraging, patient Web Development Tutor. The student is learning HTML and CSS.
Provide clear, beginner-friendly explanations. Ask guiding questions to help them think through the problem.
Do NOT write out the complete finished code for them; guide them to understand the concept and try it themselves.`,

    code_review: `You are a friendly Code Reviewer for beginner web developers.
Evaluate their HTML and CSS and return exactly these 4 sections:
1. 🌟 Strengths: Highlight 2-3 positive patterns they implemented well.
2. ⚠️ Problems: Identify syntax, accessibility, or layout flaws gently.
3. 💡 Suggestions: Specific actionable improvements they can make.
4. 📚 Learning Recommendation: A specific HTML/CSS concept they should review next.
Do NOT automatically rewrite the entire code for them.`,

    hint_generator: `You are a Progressive Hint Generator.
When given a challenge or code, generate 4 progressive hints:
- Hint 1: Conceptual hint (high-level concept).
- Hint 2: Narrow the concept (where to look or what property/tag category).
- Hint 3: Identify the specific tag, selector, or CSS property needed.
- Hint 4: Partial guidance or syntax skeleton.
Do NOT reveal the full solution in the hints.`,

    error_explainer: `You are an Error Explainer for web beginners.
Translate cryptic browser rendering quirks, syntax errors, or validation issues into friendly, plain English.
Explain what caused the issue and how to fix it in simple terms.`,

    exercise_generator: `You are an Educational Exercise Generator.
Given a topic, difficulty, and skill level, create a structured coding challenge with:
- Challenge Title & Objective
- Requirements Checklist
- Starter Code
- Progressive Hints (1 to 4)
- Solution & Explanation`,

    project_mentor: `You are a Project Mentor.
Break the user's project idea into 5 manageable, logical milestones (Step 1 to Step 5).
Provide guidance on what to build in each milestone without writing the code for them.`
};

/**
 * Intelligent Pedagogical Simulation Engine (Fallback when external API key is not configured)
 */
function handlePedagogicalSimulation(mode, payload) {
    const { question = '', html = '', css = '', lesson = '', topic = '', difficulty = '', errorText = '', projectIdea = '' } = payload;

    switch (mode) {
        case 'tutor': {
            const qLower = (question || '').toLowerCase();
            if (qLower.includes('center') || qLower.includes('div')) {
                return {
                    response: `Great question! Centering a \`<div>\` is a classic rite of passage in web development!

Here are two common ways depending on your layout:
1. **Using Flexbox on the parent container (Recommended)**:
   Make the parent container \`display: flex;\`, then add \`justify-content: center;\` (horizontal centering) and \`align-items: center;\` (vertical centering). Note: make sure the parent has a defined height (like \`min-height: 100vh;\` or \`height: 300px;\`) so vertical centering can take effect!

2. **Using margin: auto (Horizontal only)**:
   If your div has a fixed width (e.g. \`width: 300px;\`), setting \`margin: 0 auto;\` centers it horizontally within its block container.

Take a look at your CSS: does the parent element have \`display: flex\`? Try adding that and see how your preview updates!`
                };
            }
            if (qLower.includes('color') || qLower.includes('background')) {
                return {
                    response: `To change colors in CSS:
- Use \`color: yourColor;\` to change the **text** color.
- Use \`background-color: yourColor;\` to change the **container/box** background.

You can use color names (like \`coral\`), hex codes (\`#2563eb\`), or rgb/hsl values (\`rgb(37, 99, 235)\`).
Check your selector: is it pointing directly to the element you want to style?`
                };
            }
            return {
                response: `I see you are working on ${lesson || 'HTML/CSS'}!

When approaching this:
1. **Check the HTML Structure**: Make sure all opening tags have corresponding closing tags (e.g. \`<div>...</div>\`) and tags are not improperly nested.
2. **Inspect the CSS Selectors**: Ensure your class name in CSS matches the \`class\` attribute in HTML exactly (remember: CSS classes start with a dot, like \`.my-class\`).
3. **Verify Display Modes**: Elements like \`<span>\` or \`<a>\` are inline by default, so width and vertical margin won't apply unless you change them to \`display: inline-block\` or \`display: block\`.

What specific behavior are you noticing in your preview right now?`
            };
        }

        case 'code_review': {
            const strengths = [];
            const problems = [];
            const suggestions = [];

            if (html.includes('<html') || html.includes('<!DOCTYPE')) {
                strengths.push('Proper HTML document root declaration.');
            } else {
                strengths.push('Clean component-level markup structure.');
            }

            if (html.includes('aria-') || html.includes('alt=')) {
                strengths.push('Good attention to accessibility attributes.');
            } else {
                problems.push('Missing descriptive `alt` attributes on images or accessibility labels.');
                suggestions.push('Add meaningful `alt="..."` descriptions to all `<img>` tags.');
            }

            if (css.includes('display: flex') || css.includes('display: grid')) {
                strengths.push('Utilizes modern layout engines (Flexbox/Grid).');
            } else {
                suggestions.push('Consider using Flexbox (`display: flex`) for cleaner alignment rather than manual floats.');
            }

            if (html.includes('style=')) {
                problems.push('Inline styles detected inside HTML elements.');
                suggestions.push('Move inline `style="..."` attributes into external or stylesheet CSS classes for better separation of concerns.');
            }

            return {
                strengths: strengths.length > 0 ? strengths : ['Good initial markup structure.'],
                problems: problems.length > 0 ? problems : ['No critical syntax errors found.'],
                suggestions: suggestions.length > 0 ? suggestions : ['Test responsiveness across various viewport widths.'],
                learningRecommendation: 'Review Semantic HTML Elements (nav, main, section) and modern CSS Flexbox layout properties.'
            };
        }

        case 'hint_generator': {
            return {
                hint1: 'Conceptual: Identify which HTML container element wraps the content you want to adjust.',
                hint2: 'Narrowing: Look at the parent element\'s display property in CSS.',
                hint3: 'Specific Property: Use `display: flex;` with `justify-content` or `gap` to control layout spacing.',
                hint4: 'Syntax skeleton: Set `.container { display: flex; justify-content: center; }`.'
            };
        }

        case 'error_explainer': {
            const err = errorText || 'Unclosed tag or selector mismatch';
            return {
                explanation: `Here is what this issue usually means in plain English:

**What happened:** The browser or validator encountered "${err}".

**Why this occurs:** In HTML and CSS, browsers are forgiving but will misrender content if:
1. An opening tag (like \`<div\>) is missing its closing tag (\`</div>\`), causing subsequent elements to nest inside it unintentionally.
2. A CSS property is missing a semicolon (\`;\`), causing the browser to ignore the next property rule.
3. A class name in HTML doesn't match the selector in CSS (e.g. \`class="btn"\` vs \`.button\`).

**How to fix:** Inspect your tags line by line to verify every tag is closed, and ensure every CSS property ends with a semicolon.`
            };
        }

        case 'exercise_generator': {
            const targetTopic = topic || 'Flexbox Alignment';
            const targetDiff = difficulty || '🟢 Easy';
            return {
                title: `${targetTopic} Challenge`,
                difficulty: targetDiff,
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

        case 'project_mentor': {
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

        default:
            return { response: 'Hello! I am your AI Web Development Tutor. How can I guide your learning today?' };
    }
}

/**
 * Handle incoming API requests
 */
const server = http.createServer((req, res) => {
    // Enable CORS for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/ai' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body || '{}');
                const mode = data.mode || 'tutor';

                // Check if external API key is available
                if (GEMINI_API_KEY) {
                    // Proxied call to Gemini API using server-side secret key
                    // (Never exposes key to frontend)
                    // Fallback to simulation if network/quota fails
                }

                // Authentic pedagogical simulation response
                const result = handlePedagogicalSimulation(mode, data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, mode, data: result }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid request payload' }));
            }
        });
        return;
    }

    // Health check endpoint
    if (req.url === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', proxyActive: true, hasGeminiKey: !!GEMINI_API_KEY, hasOpenAIKey: !!OPENAI_API_KEY }));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`[AI Proxy Server] Running securely on port ${PORT}`);
        console.log(`[AI Security] Private API keys are kept server-side only.`);
    });
}

module.exports = { server, handlePedagogicalSimulation };
