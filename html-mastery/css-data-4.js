window.cssLessons = window.cssLessons || [];

window.cssLessons.push(
    // ═══════════════════════════════════════
    // SECTION 11 — INTERACTION & MOTION
    // ═══════════════════════════════════════
    {
        id: "pseudo-classes",
        title: "Pseudo-classes",
        category: "MOTION & STATES",
        difficulty: "Beginner",
        explanation: "A <strong>Pseudo-class</strong> selects an element based on its dynamic state or position in the DOM. Common examples: <code>:hover</code> (mouse over), <code>:focus</code> (keyboard or input focus), <code>:active</code> (currently clicked), <code>:nth-child(n)</code> (positional index), and <code>:not(selector)</code> (negation filter).",
        why: "Pseudo-classes provide rich interactive feedback for links, buttons, form fields, and alternating table rows without writing any JavaScript.",
        syntax: `/* User Interaction */
button:hover { background: darkblue; }
input:focus { border-color: #2563eb; }
button:active { transform: scale(0.98); }

/* Structural Selection */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
tr:nth-child(even) { background: #f8fafc; } /* Zebra striping */
button:not(.primary) { opacity: 0.8; }`,
        codeExample: {
            html: `<button class="hover-btn">Hover Me</button>
<input class="focus-input" placeholder="Click or Tab here...">
<ul class="zebra-list">
    <li>Row 1 (Odd)</li>
    <li>Row 2 (Even - Zebra Highlighted)</li>
    <li>Row 3 (Odd)</li>
    <li>Row 4 (Even - Zebra Highlighted)</li>
</ul>`,
            css: `.hover-btn {
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}
.hover-btn:hover { background: #1d4ed8; }
.hover-btn:active { transform: translateY(2px); }

.focus-input {
    display: block;
    margin: 12px 0;
    padding: 8px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    outline: none;
}
.focus-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.zebra-list { list-style: none; padding: 0; }
.zebra-list li { padding: 8px 12px; }
.zebra-list li:nth-child(even) { background: #f1f5f9; }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>:hover</code> changes button color smoothly when the cursor moves over it.</li>
<li><code>:focus</code> highlights active form fields for keyboard navigation accessibility.</li>
<li><code>:nth-child(even)</code> automatically stripes every alternating table or list row.</li>
</ul>`,
        exercise: {
            instruction: "Add a `:hover` state to `.btn` that changes `background-color` to `#16a34a`.",
            starterHTML: `<button class="btn">Hover Button</button>`,
            starterCSS: `.btn {\n    background-color: #22c55e;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 4px;\n}\n\n/* Add :hover rule here */`,
            hints: [
            "Think about the high-level goal: Add a the requested styling state to the requested styling that changes the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background-color`, `color`, `padding`, `border`, `border-radius`, `btn`.",
            "Implementation guidance:\n```css\n.btn {\n    background-color: #22c55e;\n    color: white;\n...\n```"
        ],
            solutionHTML: `<button class="btn">Hover Button</button>`,
            solutionCSS: `.btn {\n    background-color: #22c55e;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 4px;\n}\n\n.btn:hover {\n    background-color: #16a34a;\n}`,
            solutionExplanation: "The `:hover` pseudo-class applies styles when the pointer rests on the element."
        },
        takeaways: "Always provide visible `:focus` states on interactive elements for keyboard accessibility."
    },
    {
        id: "pseudo-elements",
        title: "Pseudo-elements",
        category: "MOTION & STATES",
        difficulty: "Intermediate",
        explanation: "A <strong>Pseudo-element</strong> creates an artificial virtual element inside the selected tag without adding extra HTML markup. Written with double colons: <code>::before</code> (inserts before content), <code>::after</code> (inserts after content), <code>::placeholder</code> (styles input hints), and <code>::selection</code> (styles text highlight).",
        why: "<code>::before</code> and <code>::after</code> let you create icons, decorative underline badges, tooltips, and badges purely in CSS. <strong>Crucial rule:</strong> You MUST include <code>content: \"\";</code> for them to render.",
        syntax: `/* Must include content property */
.badge::before {
    content: "★ ";
    color: gold;
}

.link::after {
    content: " →";
    transition: transform 0.2s;
}

::selection {
    background: #3b82f6;
    color: white;
}`,
        codeExample: {
            html: `<div class="quote-card">Design is how it works.</div>
<a href="#" class="animated-link">Explore Features</a>`,
            css: `.quote-card {
    position: relative;
    padding: 20px 20px 20px 48px;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 1.1rem;
    font-style: italic;
    color: #334155;
}

/* Insert decorative quote mark via ::before */
.quote-card::before {
    content: "“";
    position: absolute;
    left: 16px;
    top: 4px;
    font-size: 3rem;
    color: #94a3b8;
    line-height: 1;
}

.animated-link {
    text-decoration: none;
    color: #2563eb;
    font-weight: 600;
}
.animated-link::after {
    content: " →";
    display: inline-block;
    transition: transform 0.2s ease;
}
.animated-link:hover::after {
    transform: translateX(4px);
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>content: "“"</code> inserts the decorative quotation glyph without cluttering the HTML text.</li>
<li><code>.animated-link::after</code> inserts an arrow that slides outward on hover using CSS transforms.</li>
</ul>`,
        exercise: {
            instruction: "Add a `::before` pseudo-element to `.tip` with `content: '💡 ';` and `font-weight: bold;`.",
            starterHTML: `<p class="tip">Always validate your HTML markup.</p>`,
            starterCSS: `.tip {\n    background: #fef3c7;\n    padding: 12px;\n    border-radius: 6px;\n}\n\n/* Add .tip::before here */`,
            hints: [
            "Think about the high-level goal: Add a the requested styling pseudo-element to the requested styling with the requested styling and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `padding`, `border-radius`, `tip`, `content`, `font-weight`.",
            "Implementation guidance:\n```css\n.tip {\n    background: #fef3c7;\n    padding: 12px;\n...\n```"
        ],
            solutionHTML: `<p class="tip">Always validate your HTML markup.</p>`,
            solutionCSS: `.tip {\n    background: #fef3c7;\n    padding: 12px;\n    border-radius: 6px;\n}\n\n.tip::before {\n    content: '💡 ';\n    font-weight: bold;\n}`,
            solutionExplanation: "The `::before` pseudo-element requires `content: ...` to display on screen."
        },
        takeaways: "Always declare `content: ''` on `::before` and `::after` pseudo-elements."
    },
    {
        id: "transitions",
        title: "CSS Transitions",
        category: "MOTION & STATES",
        difficulty: "Beginner",
        explanation: "<strong>CSS Transitions</strong> create smooth, animated state changes between two property values over time instead of snapping instantly. The shorthand syntax is: <code>transition: property duration timing-function delay;</code>.",
        why: "Smooth 200ms transitions on hover states, buttons, and menus make interfaces feel fluid, polished, and responsive.",
        syntax: `/* transition: property duration timing-function */
transition: background-color 0.2s ease;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.2s ease, box-shadow 0.2s ease;`,
        codeExample: {
            html: `<button class="smooth-btn">Smooth Transition</button>
<div class="hover-card">Hover over this card to lift it!</div>`,
            css: `.smooth-btn {
    background: #2563eb;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.25s ease, transform 0.15s ease;
}

.smooth-btn:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
}

.hover-card {
    margin-top: 16px;
    padding: 20px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.hover-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -5px rgba(0,0,0,0.15);
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Always define <code>transition</code> on the <strong>base element</strong>, not on the <code>:hover</code> state, so the reverse animation plays smoothly when unhovering.</li>
<li>Animate performant properties like <code>transform</code> and <code>opacity</code> rather than heavy layout properties like <code>height</code> or <code>top</code>.</li>
</ul>`,
        exercise: {
            instruction: "Add `transition: background-color 0.3s ease` to `.button`.",
            starterHTML: `<button class="button">Smooth Button</button>`,
            starterCSS: `.button {\n    /* Add transition */\n    background: #3b82f6;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 6px;\n}\n.button:hover {\n    background: #1e40af;\n}`,
            hints: [
            "Think about the high-level goal: Add the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `transition`, `background`, `color`, `padding`, `border`, `border-radius`, `button`.",
            "Implementation guidance:\n```css\n.button {\n    transition: background-color 0.3s ease;\n    background: #3b82f6;\n...\n```"
        ],
            solutionHTML: `<button class="button">Smooth Button</button>`,
            solutionCSS: `.button {\n    transition: background-color 0.3s ease;\n    background: #3b82f6;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 6px;\n}\n.button:hover {\n    background: #1e40af;\n}`,
            solutionExplanation: "Defining transitions on the base selector ensures smooth forward and reverse animations."
        },
        takeaways: "Define `transition` on the base class, and animate `transform` and `opacity` for best 60fps performance."
    },
    {
        id: "transform",
        title: "CSS Transforms",
        category: "MOTION & STATES",
        difficulty: "Intermediate",
        explanation: "The <code>transform</code> property modifies the coordinate space of an element without disrupting document flow. Common 2D transform functions: <code>translate(x, y)</code> (moves element), <code>scale(n)</code> (enlarges or shrinks), <code>rotate(deg)</code> (rotates), and <code>skew(deg)</code>.",
        why: "Transforms are GPU-accelerated and do not trigger costly browser reflows or repaints, making them the most performant animation technique.",
        syntax: `transform: translate(10px, -20px); /* Move X and Y */
transform: scale(1.05);           /* Grow by 5% */
transform: rotate(45deg);          /* Rotate 45 degrees */
transform: translateX(10px) rotate(5deg); /* Combine multiple! */`,
        codeExample: {
            html: `<div class="transform-demo">
    <div class="t-box box-rotate">Rotate 15°</div>
    <div class="t-box box-scale">Scale 1.1x</div>
    <div class="t-box box-translate">Translate Y</div>
</div>`,
            css: `.transform-demo {
    display: flex;
    gap: 20px;
    padding: 20px 0;
}

.t-box {
    width: 100px;
    height: 80px;
    background: #2563eb;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
    font-size: 0.8rem;
    transition: transform 0.25s ease;
}

.box-rotate:hover { transform: rotate(15deg); }
.box-scale:hover { transform: scale(1.15); }
.box-translate:hover { transform: translateY(-8px); }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>translateY(-8px)</code> moves the element 8px upward on the screen.</li>
<li><code>scale(1.15)</code> zooms the element by 15% without pushing neighboring elements out of position.</li>
<li>Multiple transform functions can be chained in a space-separated list.</li>
</ul>`,
        exercise: {
            instruction: "Add a hover state that scales `.card` by 1.05: `.card:hover { transform: scale(1.05); }`.",
            starterHTML: `<div class="card">Card Item</div>`,
            starterCSS: `.card {\n    background: #e2e8f0;\n    padding: 20px;\n    border-radius: 8px;\n    transition: transform 0.2s ease;\n}\n\n/* Add :hover transform here */`,
            hints: [
            "Think about the high-level goal: Add a hover state that scales the requested styling by 1.05: the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `padding`, `border-radius`, `transition`, `card`, `transform`.",
            "Implementation guidance:\n```css\n.card {\n    background: #e2e8f0;\n    padding: 20px;\n...\n```"
        ],
            solutionHTML: `<div class="card">Card Item</div>`,
            solutionCSS: `.card {\n    background: #e2e8f0;\n    padding: 20px;\n    border-radius: 8px;\n    transition: transform 0.2s ease;\n}\n\n.card:hover {\n    transform: scale(1.05);\n}`,
            solutionExplanation: "GPU-accelerated `transform: scale()` produces silky smooth zoom effects."
        },
        takeaways: "Use `transform` instead of changing `top`, `left`, `width`, or `height` during animations."
    },
    {
        id: "css-animations",
        title: "Keyframe Animations",
        category: "MOTION & STATES",
        difficulty: "Intermediate",
        explanation: "<strong>CSS Keyframe Animations</strong> allow you to create complex, multi-stage, repeating animations without JavaScript using the <code>@keyframes</code> at-rule and the <code>animation</code> property.",
        why: "Keyframes power loading spinners, glowing badges, pulsing alert indicators, and entrance animations.",
        syntax: `/* 1. Define Keyframes */
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
}

/* 2. Apply to Element */
.pulse-badge {
    animation: pulse 2s infinite ease-in-out;
}`,
        codeExample: {
            html: `<div class="animation-demo">
    <div class="spinner"></div>
    <div class="pulse-indicator">● LIVE</div>
</div>`,
            css: `@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes pulseFade {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.95); }
}

.spinner {
    width: 36px;
    height: 36px;
    border: 4px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

.pulse-indicator {
    display: inline-block;
    color: #ef4444;
    font-weight: bold;
    margin-left: 20px;
    animation: pulseFade 1.5s infinite ease-in-out;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>@keyframes spin</code> defines the rotation from 0 to 360 degrees.</li>
<li><code>animation: spin 0.8s linear infinite</code> runs continuously with no easing slowdown.</li>
<li><code>animation-fill-mode: forwards</code> retains the final 100% keyframe state after animation finishes.</li>
</ul>`,
        exercise: {
            instruction: "Create a continuous spin animation: apply `animation: spin 1s linear infinite` to `.loader`.",
            starterHTML: `<div class="loader"></div>`,
            starterCSS: `@keyframes spin {\n    to { transform: rotate(360deg); }\n}\n\n.loader {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #ddd;\n    border-top-color: #06b6d4;\n    border-radius: 50%;\n    /* Apply animation here */\n}`,
            hints: [
            "Think about the high-level goal: Create a continuous spin animation: apply the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `transform`, `width`, `height`, `border`, `border-top-color`, `border-radius`, `animation`.",
            "Implementation guidance:\n```css\n@keyframes spin {\n    to { transform: rotate(360deg); }\n}\n...\n```"
        ],
            solutionHTML: `<div class="loader"></div>`,
            solutionCSS: `@keyframes spin {\n    to { transform: rotate(360deg); }\n}\n\n.loader {\n    width: 40px;\n    height: 40px;\n    border: 4px solid #ddd;\n    border-top-color: #06b6d4;\n    border-radius: 50%;\n    animation: spin 1s linear infinite;\n}`,
            solutionExplanation: "The shorthand `animation: spin 1s linear infinite` applies the keyframe rule continuously."
        },
        takeaways: "Use `@keyframes` for multi-step or looping animations (spinners, pulses)."
    },

    // ═══════════════════════════════════════
    // SECTION 12 — MODERN CSS ARCHITECTURE
    // ═══════════════════════════════════════
    {
        id: "css-variables",
        title: "CSS Custom Properties (Variables)",
        category: "MODERN CSS",
        difficulty: "Intermediate",
        explanation: "<strong>CSS Variables (Custom Properties)</strong> let you store reusable values (colors, spacing, fonts) under custom names prefixed with two dashes (<code>--primary-color: #2563eb</code>) and reference them using <code>var(--primary-color)</code>.",
        why: "CSS variables make full-site dark mode theming instant — change one variable on <code>:root</code>, and the entire website adapts immediately.",
        syntax: `/* Define in global scope */
:root {
    --brand-color: #2563eb;
    --radius-md: 8px;
}

/* Dark mode theme overrides */
[data-theme="dark"] {
    --brand-color: #60a5fa;
    --bg-surface: #0f172a;
}

/* Usage with optional fallback */
.button {
    background-color: var(--brand-color);
    border-radius: var(--radius-md, 4px);
}`,
        codeExample: {
            html: `<div class="theme-card">
    <h3>Theming with Variables</h3>
    <p>Change <code>--primary</code> and watch the button and heading update simultaneously.</p>
    <button class="theme-btn">Primary Action</button>
</div>`,
            css: `:root {
    --primary: #2563eb;
    --primary-hover: #1d4ed8;
    --card-bg: #f8fafc;
    --card-border: #cbd5e1;
}

.theme-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    padding: 24px;
    border-radius: 8px;
}

.theme-card h3 {
    color: var(--primary);
    margin-top: 0;
}

.theme-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 8px 18px;
    border-radius: 6px;
    cursor: pointer;
}
.theme-btn:hover { background: var(--primary-hover); }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>:root</code> represents the top-level <code>&lt;html&gt;</code> element, making variables accessible everywhere.</li>
<li>Variables participate in the cascade and can be overridden locally inside specific components.</li>
</ul>`,
        exercise: {
            instruction: "Define `--accent: #16a34a;` inside `:root` and use `background: var(--accent);` on `.pill`.",
            starterHTML: `<span class="pill">Success</span>`,
            starterCSS: `:root {\n    /* Define --accent here */\n}\n\n.pill {\n    /* Use var(--accent) for background */\n    color: white;\n    padding: 4px 12px;\n    border-radius: 20px;\n}`,
            hints: [
            "Think about the high-level goal: Define the requested styling inside the requested styling and use the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `--accent`, `background`, `color`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n:root {\n    --accent: #16a34a;\n}\n...\n```"
        ],
            solutionHTML: `<span class="pill">Success</span>`,
            solutionCSS: `:root {\n    --accent: #16a34a;\n}\n\n.pill {\n    background: var(--accent);\n    color: white;\n    padding: 4px 12px;\n    border-radius: 20px;\n}`,
            solutionExplanation: "CSS variables defined on `:root` can be reused anywhere with `var(--name)`."
        },
        takeaways: "Use CSS variables on `:root` for design tokens (colors, spacing, shadows) to enable instant dark mode themes."
    },
    {
        id: "css-functions",
        title: "CSS Functions (calc, min, max, clamp)",
        category: "MODERN CSS",
        difficulty: "Intermediate",
        explanation: "CSS includes powerful mathematical functions for dynamic sizing: <code>calc()</code> (performs mathematical calculations mixing units), <code>min()</code> and <code>max()</code> (clamps to smallest/largest value), and <code>clamp(min, preferred, max)</code> for fluid typography and fluid spacing.",
        why: "<code>clamp()</code> eliminates dozens of media queries by smoothly scaling headings from mobile to desktop screens like liquid.",
        syntax: `/* 1. calc: Mix percentage and pixels */
width: calc(100% - 40px);

/* 2. min / max */
width: min(800px, 90vw); /* Whichever is smaller */

/* 3. clamp: minimum, fluid-preferred, maximum */
font-size: clamp(1.5rem, 3vw + 1rem, 3rem);`,
        codeExample: {
            html: `<div class="clamp-container">
    <h1 class="fluid-heading">Fluid Responsive Headline</h1>
    <p>Resize the window: this title scales smoothly between 1.5rem and 2.8rem without a single media query!</p>
    <div class="calc-sidebar">calc(100% - 40px) width</div>
</div>`,
            css: `.clamp-container {
    padding: 20px;
    background: #f8fafc;
    border-radius: 8px;
}

.fluid-heading {
    /* Min 1.5rem (mobile) -> Fluid 4vw -> Max 2.8rem (desktop) */
    font-size: clamp(1.5rem, 4vw + 0.5rem, 2.8rem);
    color: #0f172a;
    line-height: 1.2;
    margin-top: 0;
}

.calc-sidebar {
    width: calc(100% - 30px);
    background: #dbeafe;
    padding: 12px;
    border-radius: 6px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>clamp(min, preferred, max)</code>: If the preferred size drops below <code>min</code>, <code>min</code> is used; if it exceeds <code>max</code>, <code>max</code> is used.</li>
<li><code>calc()</code> requires spaces around operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>).</li>
</ul>`,
        exercise: {
            instruction: "Set `font-size: clamp(1.2rem, 3vw, 2.5rem)` on `.scalable-title`.",
            starterHTML: `<h2 class="scalable-title">Dynamic Sized Title</h2>`,
            starterCSS: `.scalable-title {\n    /* Add clamp font-size */\n    color: #1e3a8a;\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `font-size`, `color`.",
            "Implementation guidance:\n```css\n.scalable-title {\n    font-size: clamp(1.2rem, 3vw, 2.5rem);\n    color: #1e3a8a;\n...\n```"
        ],
            solutionHTML: `<h2 class="scalable-title">Dynamic Sized Title</h2>`,
            solutionCSS: `.scalable-title {\n    font-size: clamp(1.2rem, 3vw, 2.5rem);\n    color: #1e3a8a;\n}`,
            solutionExplanation: "`clamp()` establishes fluid, responsive typography across all screen sizes."
        },
        takeaways: "Use `clamp()` for fluid headings and `calc()` for offsetting fixed gutters from 100% widths."
    },
    {
        id: "advanced-selectors",
        title: "Advanced Selectors (:is, :where, :has, [attr])",
        category: "MODERN CSS",
        difficulty: "Intermediate",
        explanation: "Modern CSS introduces powerful selector matching: <strong>Attribute Selectors</strong> (<code>[type=\"text\"]</code>, <code>[href^=\"https\"]</code>), <code>:is()</code> (groups matching selectors with normal specificity), <code>:where()</code> (groups with 0 specificity), and <code>:has()</code> (the revolutionary 'parent selector').",
        why: "<code>:has()</code> allows you to style a parent container conditionally based on what child elements it contains — something that previously required JavaScript!",
        syntax: `/* Attribute Selectors */
a[target="_blank"] { ... }      /* Exact attribute match */
a[href^="https"] { ... }        /* Starts with https */
img[src$=".png"] { ... }        /* Ends with .png */

/* :is() and :where() */
:is(h1, h2, h3) > a { ... }     /* Cleaner than writing 3 long rules */

/* :has() Parent Selector */
.card:has(img) { ... }          /* Style card ONLY IF it contains an image */`,
        codeExample: {
            html: `<div class="card has-img-card">
    <img src="https://via.placeholder.com/80" alt="Icon" width="40">
    <h3>Card With Image</h3>
    <p>The parent card has an extra border because of <code>:has(img)</code>!</p>
</div>
<a href="https://google.com" target="_blank" class="secure-link">Secure External Link</a>`,
            css: `/* Style external secure links with green badge */
a[href^="https"][target="_blank"] {
    color: #059669;
    font-weight: bold;
}

/* Style cards that contain images */
.card {
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    margin-bottom: 12px;
}

.card:has(img) {
    border-left: 4px solid #3b82f6; /* Modern parent selector! */
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>a[target="_blank"]</code> matches only links configured to open in new tabs.</li>
<li><code>.card:has(img)</code> detects if any <code>&lt;img&gt;</code> is nested inside and styles the parent card.</li>
<li><code>:is(h1, h2, h3)</code> simplifies long compound selectors into readable shorthand.</li>
</ul>`,
        exercise: {
            instruction: "Style all external links starting with https: `a[href^=\"https\"] { color: #0284c7; }`.",
            starterHTML: `<a href="https://example.com">Secure Link</a>\n<a href="/local">Local Link</a>`,
            starterCSS: `/* Add attribute selector here */`,
            hints: [
            "Think about the high-level goal: Style all external links starting with https: the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "Implementation guidance:\n```css\na[href^=\"https\"] {\n    color: #0284c7;\n}\n...\n```"
        ],
            solutionHTML: `<a href="https://example.com">Secure Link</a>\n<a href="/local">Local Link</a>`,
            solutionCSS: `a[href^="https"] {\n    color: #0284c7;\n}`,
            solutionExplanation: "`[href^=\"https\"]` targets attributes whose values begin with the specified prefix."
        },
        takeaways: "Use `:has()` to style parents based on their children and attribute selectors for form control types."
    },

    // ═══════════════════════════════════════
    // SECTION 13 — PRACTICAL COMPONENTS & CAPSTONE
    // ═══════════════════════════════════════
    {
        id: "styling-buttons",
        title: "Styling Buttons & Interactive States",
        category: "PRACTICAL CSS",
        difficulty: "Intermediate",
        explanation: "Production-ready buttons require careful consideration of all interactive states: <strong>Default</strong>, <strong>Hover</strong>, <strong>Focus-Visible</strong>, <strong>Active</strong>, and <strong>Disabled</strong>.",
        why: "Buttons are the primary conversion element in web interfaces. Consistent button styling creates trust and clear user feedback.",
        syntax: `/* Standard button reset & base */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.25rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}`,
        codeExample: {
            html: `<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-primary" disabled>Disabled State</button>`,
            css: `.btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
}

.btn-primary {
    background: #2563eb;
    color: white;
}
.btn-primary:hover:not(:disabled) {
    background: #1d4ed8;
    transform: translateY(-1px);
}
.btn-primary:active:not(:disabled) {
    transform: translateY(1px);
}

.btn-outline {
    background: transparent;
    color: #2563eb;
    border-color: #2563eb;
}
.btn-outline:hover {
    background: #eff6ff;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>:hover:not(:disabled)</code> prevents hover animations from triggering when a button is disabled.</li>
<li><code>transform: translateY(1px)</code> creates a tactile physical 'press' sensation on click.</li>
<li><code>cursor: not-allowed</code> signals that the control cannot currently be clicked.</li>
</ul>`,
        exercise: {
            instruction: "Add hover effect `background: #15803d` and disabled state `opacity: 0.5; cursor: not-allowed;` to `.save-btn`.",
            starterHTML: `<button class="save-btn">Save</button>`,
            starterCSS: `.save-btn {\n    background: #16a34a;\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n/* Add :hover and :disabled */`,
            hints: [
            "Think about the high-level goal: Add hover effect the requested styling and disabled state the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `color`, `padding`, `border`, `border-radius`, `cursor`, `save-btn`, `opacity`.",
            "Implementation guidance:\n```css\n.save-btn {\n    background: #16a34a;\n    color: white;\n...\n```"
        ],
            solutionHTML: `<button class="save-btn">Save</button>`,
            solutionCSS: `.save-btn {\n    background: #16a34a;\n    color: white;\n    padding: 8px 16px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n.save-btn:hover {\n    background: #15803d;\n}\n.save-btn:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}`,
            solutionExplanation: "Defining complete interactive states ensures clear visual feedback for users."
        },
        takeaways: "Always style hover, active, focus-visible, and disabled states on buttons."
    },
    {
        id: "styling-forms",
        title: "Styling Forms & Inputs",
        category: "PRACTICAL CSS",
        difficulty: "Intermediate",
        explanation: "Form controls (<code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, <code>&lt;select&gt;</code>) require explicit font inheritance, focus ring outlines, and balanced padding to match your overall UI theme.",
        why: "Default browser form inputs look dated and vary widely between Windows, macOS, and Android. Custom styling ensures uniform beauty.",
        syntax: `/* Reset form element fonts */
input, button, textarea, select {
    font: inherit;
}

/* Modern input styling */
.form-input {
    width: 100%;
    padding: 0.65rem 0.9rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}`,
        codeExample: {
            html: `<form class="form-group">
    <label for="email" class="form-label">Work Email</label>
    <input type="email" id="email" class="form-input" placeholder="you@company.com">
    <button type="submit" class="submit-btn">Subscribe</button>
</form>`,
            css: `.form-group {
    max-width: 360px;
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.form-label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #1e293b;
}

.form-input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s ease;
}

.form-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.submit-btn {
    width: 100%;
    margin-top: 12px;
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>display: block</code> on <code>.form-label</code> positions the label above the field cleanly.</li>
<li><code>box-shadow: 0 0 0 3px ...</code> creates an accessible glowing focus ring without displacing page layout.</li>
</ul>`,
        exercise: {
            instruction: "Add a focus ring to `.input-field`: `border-color: #3b82f6` and `outline: none` on focus.",
            starterHTML: `<input class="input-field" placeholder="Focus me...">`,
            starterCSS: `.input-field {\n    padding: 8px 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\n/* Add :focus rule */`,
            hints: [
            "Think about the high-level goal: Add a focus ring to the requested styling: the requested styling and the requested styling on focus.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `padding`, `border`, `border-radius`, `input-field`, `border-color`, `outline`.",
            "Implementation guidance:\n```css\n.input-field {\n    padding: 8px 12px;\n    border: 1px solid #ccc;\n...\n```"
        ],
            solutionHTML: `<input class="input-field" placeholder="Focus me...">`,
            solutionCSS: `.input-field {\n    padding: 8px 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\n.input-field:focus {\n    border-color: #3b82f6;\n    outline: none;\n}`,
            solutionExplanation: "Replacing default browser outline with custom border focus indicators creates a refined design."
        },
        takeaways: "Always make sure inputs have visible `:focus` states with high contrast."
    },
    {
        id: "navbar-project",
        title: "Project: Responsive Navigation Bar",
        category: "MINI PROJECTS",
        difficulty: "Intermediate",
        explanation: "Build a modern, responsive navigation header featuring a logo, navigation links, and a call-to-action button that adapts fluidly across mobile and desktop screens.",
        why: "Every website requires a responsive navigation header as its primary wayfinding element.",
        syntax: `/* Flexbox Navbar Pattern */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}`,
        codeExample: {
            html: `<nav class="site-nav">
    <div class="nav-logo">⚡ DevPro</div>
    <ul class="nav-menu">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#docs">Docs</a></li>
    </ul>
    <a href="#signup" class="nav-cta">Get Started</a>
</nav>`,
            css: `.site-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0f172a;
    padding: 14px 24px;
    border-radius: 8px;
}

.nav-logo {
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.nav-menu a {
    color: #94a3b8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}
.nav-menu a:hover { color: white; }

.nav-cta {
    background: #2563eb;
    color: white;
    text-decoration: none;
    padding: 8px 18px;
    border-radius: 6px;
    font-weight: 600;
    transition: background 0.2s;
}
.nav-cta:hover { background: #1d4ed8; }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>display: flex</code> with <code>justify-content: space-between</code> spaces the Logo, Menu, and CTA evenly across the header bar.</li>
<li><code>gap: 20px</code> on <code>.nav-menu</code> creates clean horizontal gutters between list items.</li>
</ul>`,
        exercise: {
            instruction: "Build the navigation bar layout by adding `display: flex; justify-content: space-between; align-items: center;` to `.nav-bar`.",
            starterHTML: `<div class="nav-bar">\n    <span class="logo">Logo</span>\n    <button class="btn">Sign In</button>\n</div>`,
            starterCSS: `.nav-bar {\n    /* Add flexbox rules here */\n    background: #1e293b;\n    color: white;\n    padding: 14px 20px;\n}\n.btn {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 6px 14px;\n    border-radius: 4px;\n}`,
            hints: [
            "Think about the high-level goal: Build the navigation bar layout by adding the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `justify-content`, `align-items`, `background`, `color`, `padding`, `border`, `border-radius`.",
            "Implementation guidance:\n```css\n.nav-bar {\n    display: flex;\n    justify-content: space-between;\n...\n```"
        ],
            solutionHTML: `<div class="nav-bar">\n    <span class="logo">Logo</span>\n    <button class="btn">Sign In</button>\n</div>`,
            solutionCSS: `.nav-bar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: #1e293b;\n    color: white;\n    padding: 14px 20px;\n}\n.btn {\n    background: #3b82f6;\n    color: white;\n    border: none;\n    padding: 6px 14px;\n    border-radius: 4px;\n}`,
            solutionExplanation: "`justify-content: space-between` pushes logo to left and action button to right."
        },
        takeaways: "Flexbox with `space-between` and `align-items: center` is the definitive navbar pattern."
    },
    {
        id: "card-project",
        title: "Project: Product & Profile Card",
        category: "MINI PROJECTS",
        difficulty: "Intermediate",
        explanation: "Build a polished, interactive e-commerce product card featuring an image with a sale badge, typography hierarchy, star ratings, and an animated hover lift effect.",
        why: "Card components are the most widely used UI pattern on the web, found in dashboards, e-commerce stores, and blogs.",
        syntax: `/* Card with elevation and hover lift */
.card {
    transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}`,
        codeExample: {
            html: `<div class="product-card">
    <div class="card-img-wrapper">
        <span class="sale-badge">SALE</span>
        <div class="mock-img">🎧</div>
    </div>
    <div class="card-body">
        <span class="category">Audio</span>
        <h3 class="product-title">Wireless Studio Pro</h3>
        <p class="price"><del>$199</del> <strong>$149</strong></p>
        <button class="add-to-cart">Add to Cart</button>
    </div>
</div>`,
            css: `.product-card {
    max-width: 260px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -6px rgba(0,0,0,0.12);
}

.card-img-wrapper {
    position: relative;
    background: #f1f5f9;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mock-img { font-size: 3rem; }

.sale-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ef4444;
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 20px;
}

.card-body { padding: 16px; }
.category { font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight: bold; }
.product-title { margin: 4px 0 8px; font-size: 1.1rem; color: #0f172a; }
.price strong { font-size: 1.2rem; color: #16a34a; }
.price del { color: #94a3b8; margin-right: 6px; }

.add-to-cart {
    width: 100%;
    margin-top: 10px;
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Combines <strong>Box Model</strong>, <strong>Position Relative/Absolute</strong>, <strong>Flexbox</strong>, and <strong>Transforms</strong> into a production component.</li>
<li><code>overflow: hidden</code> on the parent ensures inner images clip to the 12px rounded corner radius.</li>
</ul>`,
        exercise: {
            instruction: "Add a hover lift to `.product-box`: `transform: translateY(-4px)` and `box-shadow: 0 10px 20px rgba(0,0,0,0.1)` on hover.",
            starterHTML: `<div class="product-box">Card Item</div>`,
            starterCSS: `.product-box {\n    background: white;\n    padding: 20px;\n    border-radius: 8px;\n    border: 1px solid #ddd;\n    transition: transform 0.2s, box-shadow 0.2s;\n}\n/* Add :hover rule */`,
            hints: [
            "Think about the high-level goal: Add a hover lift to the requested styling: the requested styling and the requested styling on hover.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `padding`, `border-radius`, `border`, `transition`, `product-box`, `transform`, `box-shadow`.",
            "Implementation guidance:\n```css\n.product-box {\n    background: white;\n    padding: 20px;\n...\n```"
        ],
            solutionHTML: `<div class="product-box">Card Item</div>`,
            solutionCSS: `.product-box {\n    background: white;\n    padding: 20px;\n    border-radius: 8px;\n    border: 1px solid #ddd;\n    transition: transform 0.2s, box-shadow 0.2s;\n}\n.product-box:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}`,
            solutionExplanation: "Transform and box-shadow together create a tactile card hover lift effect."
        },
        takeaways: "Combine positioning, typography, and hover transitions to build realistic UI components."
    },
    {
        id: "capstone-project",
        title: "🏆 Capstone: Full Responsive Landing Page",
        category: "CAPSTONE PROJECT",
        difficulty: "Intermediate",
        explanation: "Bring together everything you have learned — Box Model, Typography, CSS Variables, Flexbox, CSS Grid, Media Queries, Transitions, and Modern Effects — to build a complete, production-ready landing page.",
        why: "Building a full webpage end-to-end proves your mastery of CSS and gives you a portfolio-ready project.",
        syntax: `/* Full Page Structure:
   1. CSS Reset & Variables
   2. Responsive Navigation Header
   3. Hero Section with Gradient CTA
   4. 3-Column Responsive Feature Grid
   5. Responsive Footer
*/`,
        codeExample: {
            html: `<div class="landing-page">
    <header class="hero-header">
        <span class="hero-tag">LAUNCHING V2.0</span>
        <h1>Build Faster With Modern CSS</h1>
        <p class="hero-subtitle">The complete guide to master frontend design from fundamentals to practical responsive layouts.</p>
        <div class="cta-group">
            <button class="btn btn-primary">Start Learning Free</button>
            <button class="btn btn-secondary">View Curriculum</button>
        </div>
    </header>

    <section class="features-grid">
        <div class="feature-card">
            <div class="f-icon">⚡</div>
            <h4>Pure CSS Layouts</h4>
            <p>Master Flexbox and Grid without bloated third-party frameworks.</p>
        </div>
        <div class="feature-card">
            <div class="f-icon">📱</div>
            <h4>100% Mobile Ready</h4>
            <p>Design mobile-first interfaces that look stunning on any screen.</p>
        </div>
        <div class="feature-card">
            <div class="f-icon">🎨</div>
            <h4>Design Systems</h4>
            <p>Harness CSS Custom Properties for scalable light and dark themes.</p>
        </div>
    </section>
</div>`,
            css: `:root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --text-main: #0f172a;
    --text-muted: #475569;
    --bg-page: #f8fafc;
}

.landing-page {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: var(--text-main);
    padding: 20px;
}

.hero-header {
    text-align: center;
    padding: 40px 16px;
    max-width: 650px;
    margin: 0 auto;
}

.hero-tag {
    background: #dbeafe;
    color: var(--primary);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
}

.hero-header h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    line-height: 1.15;
    margin: 14px 0;
}

.hero-subtitle {
    color: var(--text-muted);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 24px;
}

.cta-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.btn {
    padding: 10px 22px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
}
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-dark); }
.btn-secondary { background: #e2e8f0; color: var(--text-main); }
.btn-secondary:hover { background: #cbd5e1; }

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    max-width: 900px;
    margin: 30px auto 0;
}

.feature-card {
    background: white;
    padding: 24px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

.f-icon { font-size: 2rem; margin-bottom: 12px; }
.feature-card h4 { margin: 0 0 8px; font-size: 1.1rem; }
.feature-card p { margin: 0; color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Uses <strong>CSS Variables</strong> for rapid centralized theme tweaking.</li>
<li>Uses <code>clamp()</code> for fluid hero typography without media queries.</li>
<li>Uses <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))</code> for an automatically responsive 3-column to 1-column card grid.</li>
<li>Uses <strong>Flexbox</strong> for button groups and header centering.</li>
</ul>`,
        exercise: {
            instruction: "Congratulations on reaching the capstone! Style the `.hero-banner` with `background: linear-gradient(135deg, #2563eb, #7c3aed)`, `color: white`, and `text-align: center`.",
            starterHTML: `<div class="hero-banner">\n    <h1>Master CSS!</h1>\n    <p>You have completed the CSS course curriculum.</p>\n</div>`,
            starterCSS: `.hero-banner {\n    /* Add gradient, color, and text-align */\n    padding: 40px 20px;\n    border-radius: 12px;\n}`,
            hints: [
            "Think about the high-level goal: Congratulations on reaching the capstone! Style the the requested styling with the requested styling, the requested styling, and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `color`, `text-align`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.hero-banner {\n    background: linear-gradient(135deg, #2563eb, #7c3aed);\n    color: white;\n...\n```"
        ],
            solutionHTML: `<div class="hero-banner">\n    <h1>Master CSS!</h1>\n    <p>You have completed the CSS course curriculum.</p>\n</div>`,
            solutionCSS: `.hero-banner {\n    background: linear-gradient(135deg, #2563eb, #7c3aed);\n    color: white;\n    text-align: center;\n    padding: 40px 20px;\n    border-radius: 12px;\n}`,
            solutionExplanation: "You have built the entire foundation of modern CSS!"
        },
        takeaways: "Congratulations! You now have a solid practical mastery of CSS layout, responsiveness, typography, and modern design."
    }
);
