window.cssLessons = window.cssLessons || [];

window.cssLessons.push(
    // ═══════════════════════════════════════
    // SECTION 1 — CSS FOUNDATIONS
    // ═══════════════════════════════════════
    {
        id: "what-is-css",
        title: "What is CSS?",
        category: "FOUNDATIONS",
        difficulty: "Beginner",
        explanation: "CSS stands for <strong>Cascading Style Sheets</strong>. It is the language used to describe how HTML elements should look on screen — controlling everything from colors and fonts to layout and animations.",
        why: "Without CSS, every webpage would just be plain black text on a white background. CSS separates <em>presentation</em> (how it looks) from <em>structure</em> (what it is). This separation makes code far easier to maintain and redesign.",
        syntax: "selector {\n    property: value;\n}",
        codeExample: {
            html: `<!-- HTML structure (no style yet) -->
<h1>Welcome to My Page</h1>
<p>This paragraph will be styled with CSS.</p>
<button>Click Me</button>`,
            css: `/* CSS adds all the visual design */
h1 {
    color: #2563eb;
    font-size: 2rem;
}

p {
    color: #555;
    font-size: 1.1rem;
    line-height: 1.7;
}

button {
    background: #2563eb;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>h1 { color: #2563eb; }</code> — selects every <code>&lt;h1&gt;</code> on the page and sets its text to blue.</li>
<li><code>font-size: 2rem</code> — sets the heading to twice the default font size.</li>
<li><code>line-height: 1.7</code> — adds comfortable vertical spacing between lines of paragraph text.</li>
<li><code>button { ... }</code> — transforms the default ugly browser button into a styled interactive component, just with CSS.</li>
</ul>`,
        exercise: {
            instruction: "Change the paragraph text color to red and the heading text color to darkblue.",
            starterHTML: `<h1>My Heading</h1>\n<p class="text">Welcome to CSS!</p>`,
            starterCSS: `h1 {\n    /* Your CSS here */\n}\n\n.text {\n    /* Your CSS here */\n}`,
            hints: [
            "Think about the high-level goal: Change the paragraph text color to red and the heading text color to darkblue.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `color`.",
            "Implementation guidance:\n```css\nh1 {\n    color: darkblue;\n}\n...\n```"
        ],
            solutionHTML: `<h1>My Heading</h1>\n<p class="text">Welcome to CSS!</p>`,
            solutionCSS: `h1 {\n    color: darkblue;\n}\n\n.text {\n    color: red;\n}`,
            solutionExplanation: "The `color` property sets the text color of any element. We used `darkblue` for the heading and `red` for the paragraph."
        },
        takeaways: "HTML is for structure. CSS is for presentation. Never mix the two roles."
    },
    {
        id: "css-syntax",
        title: "CSS Syntax",
        category: "FOUNDATIONS",
        difficulty: "Beginner",
        explanation: "A CSS rule consists of three core parts: a <strong>Selector</strong> (which element to style), a <strong>Property</strong> (what aspect to change), and a <strong>Value</strong> (the new setting). Together, property + value form a <em>declaration</em>, wrapped in curly braces.",
        why: "Understanding syntax prevents syntax errors. Missing a single semicolon or curly brace can silently break all CSS rules that follow it.",
        syntax: "/* Selector { Declaration: Property: Value; } */\nh1 {\n    color: red;\n    font-size: 24px;\n}",
        codeExample: {
            html: `<h1>CSS Rule Anatomy</h1>
<p class="intro">Each declaration ends with a semicolon.</p>
<p class="highlight">Multiple declarations go inside { }.</p>`,
            css: `/* Selector: h1 */
h1 {
    color: #1e3a8a;          /* Property: color | Value: #1e3a8a */
    border-bottom: 2px solid #3b82f6; /* Property: border-bottom */
    padding-bottom: 8px;    /* Property: padding-bottom */
}

/* Selector: .intro */
.intro {
    font-size: 1.1rem;
    color: #475569;
}

/* Selector: .highlight */
.highlight {
    background: #fef08a;
    padding: 6px 12px;
    border-radius: 4px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><strong>Selector</strong>: points to the HTML element you want to style (e.g. <code>h1</code>, <code>.intro</code>).</li>
<li><strong>Declaration Block</strong>: everything inside the curly braces <code>{ ... }</code>.</li>
<li><strong>Property</strong>: the CSS feature being changed (e.g. <code>color</code>, <code>background</code>).</li>
<li><strong>Value</strong>: the setting assigned to the property (e.g. <code>#1e3a8a</code>, <code>#fef08a</code>).</li>
<li><strong>Semicolon <code>;</code></strong>: MUST separate every declaration.</li>
</ul>`,
        exercise: {
            instruction: "Add a font-size of 20px and a background color of yellow to the `.box` element.",
            starterHTML: `<div class="box">Styled Box</div>`,
            starterCSS: `.box {\n    color: black;\n    /* Add font-size and background here */\n}`,
            hints: [
            "Think about the high-level goal: Add a font-size of 20px and a background color of yellow to the the requested styling element.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `color`, `font-size`, `background`.",
            "Implementation guidance:\n```css\n.box {\n    color: black;\n    font-size: 20px;\n...\n```"
        ],
            solutionHTML: `<div class="box">Styled Box</div>`,
            solutionCSS: `.box {\n    color: black;\n    font-size: 20px;\n    background: yellow;\n}`,
            solutionExplanation: "We added `font-size: 20px;` and `background: yellow;` inside the declaration block, each ending with a semicolon."
        },
        takeaways: "Always end every declaration with a semicolon. Missing semicolons cause cascading parse errors."
    },
    {
        id: "ways-to-add-css",
        title: "Ways to Add CSS",
        category: "FOUNDATIONS",
        difficulty: "Beginner",
        explanation: "There are three ways to apply CSS to HTML: <strong>External</strong> (a separate <code>.css</code> file linked with <code>&lt;link&gt;</code>), <strong>Internal</strong> (a <code>&lt;style&gt;</code> tag inside <code>&lt;head&gt;</code>), and <strong>Inline</strong> (a <code>style=\"...\"</code> attribute directly on an HTML element).",
        why: "External stylesheets are the industry standard for production websites because they keep code clean, modular, and enable browser caching across multiple pages.",
        syntax: `<!-- 1. External (Recommended) -->
<link rel="stylesheet" href="style.css">

<!-- 2. Internal (Single-page testing) -->
<style>
    p { color: blue; }
</style>

<!-- 3. Inline (Avoid in production) -->
<p style="color: blue;">Text</p>`,
        codeExample: {
            html: `<!-- Internal style block example -->
<div class="card">
    <h2 class="card-title">External vs Internal</h2>
    <p>External CSS is best for multi-page websites.</p>
    <p style="color: #dc2626; font-size: 0.85rem;">⚠️ This line uses inline style (bad practice for full sites).</p>
</div>`,
            css: `.card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 20px;
}

.card-title {
    color: #1e293b;
    margin-top: 0;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><strong>External (Best)</strong>: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> in the <code>&lt;head&gt;</code>. Cacheable, reusable.</li>
<li><strong>Internal</strong>: <code>&lt;style&gt;</code> inside <code>&lt;head&gt;</code>. Good for single-page standalone demos.</li>
<li><strong>Inline (Worst)</strong>: <code>style="color:red"</code> directly on the tag. Hard to maintain, overrides external styles with high specificity.</li>
</ul>`,
        exercise: {
            instruction: "Style the `.demo` element with a green text color and a padding of 15px.",
            starterHTML: `<div class="demo">Apply styles here</div>`,
            starterCSS: `.demo {\n    /* Add color and padding */\n}`,
            hints: [
            "Think about the high-level goal: Style the the requested styling element with a green text color and a padding of 15px.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `color`, `padding`.",
            "Implementation guidance:\n```css\n.demo {\n    color: green;\n    padding: 15px;\n...\n```"
        ],
            solutionHTML: `<div class="demo">Apply styles here</div>`,
            solutionCSS: `.demo {\n    color: green;\n    padding: 15px;\n}`,
            solutionExplanation: "Rules written in stylesheets or internal `<style>` blocks keep presentation cleanly separated from the HTML markup."
        },
        takeaways: "Use External stylesheets 99% of the time. Reserve Inline styles only for dynamic JavaScript style injections."
    },

    // ═══════════════════════════════════════
    // SECTION 2 — SELECTORS & CASCADE
    // ═══════════════════════════════════════
    {
        id: "element-selectors",
        title: "Element Selectors",
        category: "SELECTORS",
        difficulty: "Beginner",
        explanation: "An <strong>Element Selector</strong> (also called a type selector) targets all HTML elements that have a specific tag name, such as <code>p</code>, <code>h1</code>, <code>button</code>, or <code>a</code>.",
        why: "Element selectors are great for establishing global typography baselines and default element styling across your entire website.",
        syntax: "tagname {\n    property: value;\n}",
        codeExample: {
            html: `<h1>Page Title</h1>
<p>First paragraph.</p>
<p>Second paragraph inherits the exact same paragraph styles.</p>
<button>Button 1</button>
<button>Button 2</button>`,
            css: `/* Styles EVERY <h1> on the entire page */
h1 {
    color: #1d4ed8;
    font-family: Georgia, serif;
}

/* Styles EVERY <p> */
p {
    color: #4b5563;
    font-size: 1rem;
    line-height: 1.6;
}

/* Styles EVERY <button> */
button {
    background: #0284c7;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>h1 { ... }</code> affects every <code>&lt;h1&gt;</code> without needing class attributes.</li>
<li><code>p { ... }</code> sets uniform text color and line height across all paragraphs.</li>
<li><code>button { ... }</code> ensures consistent button sizes and appearances.</li>
</ul>`,
        exercise: {
            instruction: "Style all `h2` elements with darkviolet color and all `span` elements with bold font-weight.",
            starterHTML: `<h2>Section Title</h2>\n<p>Some text with a <span>highlighted word</span>.</p>`,
            starterCSS: `h2 {\n    /* Color */\n}\n\nspan {\n    /* Font weight */\n}`,
            hints: [
            "Think about the high-level goal: Style all the requested styling elements with darkviolet color and all the requested styling elements with bold font-weight.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `color`, `font-weight`.",
            "Implementation guidance:\n```css\nh2 {\n    color: darkviolet;\n}\n...\n```"
        ],
            solutionHTML: `<h2>Section Title</h2>\n<p>Some text with a <span>highlighted word</span>.</p>`,
            solutionCSS: `h2 {\n    color: darkviolet;\n}\n\nspan {\n    font-weight: bold;\n}`,
            solutionExplanation: "Targeting tag names directly applies styles to every instance of that HTML tag."
        },
        takeaways: "Element selectors target all tags of that type. Use them for site-wide baseline defaults."
    },
    {
        id: "class-selectors",
        title: "Class Selectors",
        category: "SELECTORS",
        difficulty: "Beginner",
        explanation: "A <strong>Class Selector</strong> targets elements that have a specific <code>class</code> attribute. In CSS, class selectors are written with a leading dot: <code>.classname</code>.",
        why: "Classes are the most versatile and frequently used selector in CSS. Unlike IDs, a class can be reused on as many elements as you want.",
        syntax: ".classname {\n    property: value;\n}",
        codeExample: {
            html: `<button class="btn btn-primary">Save Changes</button>
<button class="btn btn-danger">Delete</button>
<p class="badge">Featured</p>`,
            css: `/* Shared base class */
.btn {
    padding: 8px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

/* Modifier class: primary */
.btn-primary {
    background: #2563eb;
    color: white;
}

/* Modifier class: danger */
.btn-danger {
    background: #dc2626;
    color: white;
}

.badge {
    display: inline-block;
    background: #dbeafe;
    color: #1d4ed8;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>.btn</code> applies common padding, border, and radius to both buttons.</li>
<li><code>.btn-primary</code> adds the blue background to the first button.</li>
<li><code>.btn-danger</code> adds the red background to the second button.</li>
<li>HTML elements can have multiple classes separated by spaces (e.g. <code>class="btn btn-primary"</code>).</li>
</ul>`,
        exercise: {
            instruction: "Create CSS for `.card` (border 1px solid #ccc, padding 16px) and `.title` (color #3b82f6).",
            starterHTML: `<div class="card">\n    <h3 class="title">My Card</h3>\n    <p>Card body text.</p>\n</div>`,
            starterCSS: `.card {\n    /* Add border and padding */\n}\n\n.title {\n    /* Add color */\n}`,
            hints: [
            "Think about the high-level goal: Create CSS for the requested styling (border 1px solid #ccc, padding 16px) and the requested styling (color #3b82f6).. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `border`, `padding`, `color`.",
            "Implementation guidance:\n```css\n.card {\n    border: 1px solid #ccc;\n    padding: 16px;\n...\n```"
        ],
            solutionHTML: `<div class="card">\n    <h3 class="title">My Card</h3>\n    <p>Card body text.</p>\n</div>`,
            solutionCSS: `.card {\n    border: 1px solid #ccc;\n    padding: 16px;\n}\n\n.title {\n    color: #3b82f6;\n}`,
            solutionExplanation: "The dot prefix `.card` and `.title` matches elements with `class=\"card\"` and `class=\"title\"`."
        },
        takeaways: "Classes are reusable and should be your primary tool for component styling in CSS."
    },
    {
        id: "id-selectors",
        title: "ID Selectors",
        category: "SELECTORS",
        difficulty: "Beginner",
        explanation: "An <strong>ID Selector</strong> targets an element with a unique <code>id</code> attribute. In CSS, ID selectors are prefixed with a hash symbol: <code>#idname</code>.",
        why: "IDs must be unique per webpage. In CSS, IDs have very high specificity, which can make overriding styles difficult. They are primarily used for anchor navigation and JS targeting.",
        syntax: "#idname {\n    property: value;\n}",
        codeExample: {
            html: `<header id="main-header">
    <h1>Site Logo</h1>
</header>
<main id="content">
    <p>Main page content goes here.</p>
</main>`,
            css: `#main-header {
    background: #0f172a;
    color: white;
    padding: 20px;
    text-align: center;
}

#content {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>#main-header</code> styles only the single element with <code>id="main-header"</code>.</li>
<li><code>#content</code> centers the main content area with <code>margin: 0 auto</code>.</li>
<li>An ID should never appear more than once on the same HTML page.</li>
</ul>`,
        exercise: {
            instruction: "Style the element with `id=\"special-box\"` with a background of #fef08a and padding of 14px.",
            starterHTML: `<div id="special-box">Unique Section</div>`,
            starterCSS: `/* Write your ID selector here */`,
            hints: [
            "Think about the high-level goal: Style the element with the requested styling with a background of #fef08a and padding of 14px.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `padding`.",
            "Implementation guidance:\n```css\n#special-box {\n    background: #fef08a;\n    padding: 14px;\n...\n```"
        ],
            solutionHTML: `<div id="special-box">Unique Section</div>`,
            solutionCSS: `#special-box {\n    background: #fef08a;\n    padding: 14px;\n}`,
            solutionExplanation: "ID selectors use `#` and match the element whose `id` attribute matches exactly."
        },
        takeaways: "IDs must be unique per document. Prefer classes for styling to avoid high specificity headaches."
    },
    {
        id: "grouping-selectors",
        title: "Grouping Selectors",
        category: "SELECTORS",
        difficulty: "Beginner",
        explanation: "A <strong>Grouping Selector</strong> allows you to apply the exact same CSS declarations to multiple selectors at once by separating them with a comma: <code>h1, h2, h3 { ... }</code>.",
        why: "Grouping prevents code duplication and keeps your stylesheets DRY (Don't Repeat Yourself).",
        syntax: "selector1, selector2, selector3 {\n    property: value;\n}",
        codeExample: {
            html: `<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Section Heading</h3>
<p>Standard paragraph text.</p>`,
            css: `/* Apply shared font family and margin reset to all headings */
h1, h2, h3 {
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    margin-top: 0;
}

/* Individual adjustments */
h1 { font-size: 2.2rem; }
h2 { font-size: 1.7rem; }
h3 { font-size: 1.3rem; }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>h1, h2, h3</code> shares font-family, color, and margin-top across all three heading levels.</li>
<li>Specific rules below customize font sizes for each heading individually.</li>
</ul>`,
        exercise: {
            instruction: "Group `.btn` and `.input` to share `border-radius: 8px` and `font-size: 15px`.",
            starterHTML: `<button class="btn">Click</button>\n<input class="input" placeholder="Type...">`,
            starterCSS: `/* Group .btn and .input here */`,
            hints: [
            "Think about the high-level goal: Group the requested styling and the requested styling to share the requested styling and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `border-radius`, `font-size`.",
            "Implementation guidance:\n```css\n.btn, .input {\n    border-radius: 8px;\n    font-size: 15px;\n...\n```"
        ],
            solutionHTML: `<button class="btn">Click</button>\n<input class="input" placeholder="Type...">`,
            solutionCSS: `.btn, .input {\n    border-radius: 8px;\n    font-size: 15px;\n}`,
            solutionExplanation: "Comma-separated selectors apply the declaration block to every matched selector."
        },
        takeaways: "Group selectors with commas to share common styles and keep stylesheets clean and DRY."
    },
    {
        id: "combinators",
        title: "CSS Combinators",
        category: "SELECTORS",
        difficulty: "Beginner",
        explanation: "A <strong>Combinator</strong> explains the relationship between two selectors. CSS supports 4 combinators: <strong>Descendant (space)</strong> (any nested child/grandchild), <strong>Child (<code>&gt;</code>)</strong> (direct children only), <strong>Adjacent Sibling (<code>+</code>)</strong> (immediately following sibling), and <strong>General Sibling (<code>~</code>)</strong> (any following sibling).",
        why: "Combinators give you precise control over targeted elements based on where they live inside the DOM tree without needing to add extra classes to every child tag.",
        syntax: `/* 1. Descendant (any level inside) */
.card p { color: gray; }

/* 2. Direct Child (1 level only) */
.card > p { color: black; }

/* 3. Adjacent Sibling (immediately after) */
h2 + p { font-size: 1.2rem; }

/* 4. General Sibling (any sibling after) */
h2 ~ p { color: #555; }`,
        codeExample: {
            html: `<div class="container">
    <h2>Topic Header</h2>
    <p>Intro paragraph (adjacent to h2).</p>
    <p>Second paragraph.</p>
    <div class="inner-box">
        <p>Nested paragraph inside inner-box.</p>
    </div>
</div>`,
            css: `/* Direct child only */
.container > p {
    color: #1e3a8a;
    font-weight: 500;
}

/* Adjacent sibling: paragraph immediately following h2 */
h2 + p {
    background: #dbeafe;
    padding: 8px;
    border-radius: 4px;
}

/* Descendant selector: paragraph inside inner-box */
.container .inner-box p {
    color: #dc2626;
    font-style: italic;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>.container &gt; p</code> only styles the two direct paragraph children of <code>.container</code>, ignoring the nested one inside <code>.inner-box</code>.</li>
<li><code>h2 + p</code> styles only the very first paragraph that directly follows <code>&lt;h2&gt;</code>.</li>
<li><code>.container .inner-box p</code> uses descendant spaces to target deeply nested paragraphs.</li>
</ul>`,
        exercise: {
            instruction: "Use a direct child combinator (`>`) to make only direct `li` children of `.menu` have a blue color.",
            starterHTML: `<ul class="menu">\n    <li>Home</li>\n    <li>Services\n        <ul><li>Design</li></ul>\n    </li>\n</ul>`,
            starterCSS: `/* Add .menu > li rule */`,
            hints: [
            "Think about the high-level goal: Use a direct child combinator (the requested styling) to make only direct the requested styling children of the requested styling have a blue color.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `color`.",
            "Implementation guidance:\n```css\n.menu > li {\n    color: blue;\n}\n...\n```"
        ],
            solutionHTML: `<ul class="menu">\n    <li>Home</li>\n    <li>Services\n        <ul><li>Design</li></ul>\n    </li>\n</ul>`,
            solutionCSS: `.menu > li {\n    color: blue;\n}`,
            solutionExplanation: "The `>` combinator prevents styles from leaking into nested sub-lists."
        },
        takeaways: "Use space for all descendants; use `>` for direct children; use `+` for immediately following elements."
    },
    {
        id: "specificity",
        title: "CSS Specificity & The Cascade",
        category: "SELECTORS",
        difficulty: "Intermediate",
        explanation: "<strong>Specificity</strong> is the algorithm browsers use to determine which CSS rule wins when multiple rules target the same element. It is calculated as a point system: <strong>Inline Styles (1000)</strong> &gt; <strong>IDs (100)</strong> &gt; <strong>Classes, Attributes, Pseudo-classes (10)</strong> &gt; <strong>Elements, Pseudo-elements (1)</strong>.",
        why: "Understanding specificity prevents you from relying on ugly hacks like <code>!important</code> to force styles to apply.",
        syntax: `/* Specificity calculation:
   Element = (0, 0, 1)
   Class   = (0, 1, 0)
   ID      = (1, 0, 0)
   Inline  = (1, 0, 0, 0)
*/`,
        codeExample: {
            html: `<div id="box" class="card highlight">
    <p class="text">Specificity in action</p>
</div>`,
            css: `/* Specificity: (0, 0, 1) — Lowest */
div {
    background: gray;
}

/* Specificity: (0, 1, 0) — Wins over element */
.card {
    background: lightblue;
}

/* Specificity: (0, 2, 0) — Wins over single class */
.card.highlight {
    background: orange;
}

/* Specificity: (1, 0, 0) — Wins over all classes! */
#box {
    background: #4ade80; /* This GREEN color wins! */
    padding: 20px;
    border-radius: 8px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>div</code> has a specificity of 1.</li>
<li><code>.card</code> has a specificity of 10.</li>
<li><code>.card.highlight</code> has a specificity of 20.</li>
<li><code>#box</code> has a specificity of 100 — so <code>#box</code> wins and turns the background green!</li>
<li>If two rules have identical specificity, the <strong>last one defined in the stylesheet wins</strong> (the Cascade).</li>
</ul>`,
        exercise: {
            instruction: "Override the `.alert` class color (red) on `#special-alert` by writing an ID selector for `#special-alert` with color: darkgreen.",
            starterHTML: `<p id="special-alert" class="alert">Alert Message</p>`,
            starterCSS: `.alert {\n    color: red;\n}\n\n/* Add #special-alert rule here */`,
            hints: [
            "Think about the high-level goal: Override the the requested styling class color (red) on the requested styling by writing an ID selector for the requested styling with color: darkgreen.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `color`.",
            "Implementation guidance:\n```css\n.alert {\n    color: red;\n}\n...\n```"
        ],
            solutionHTML: `<p id="special-alert" class="alert">Alert Message</p>`,
            solutionCSS: `.alert {\n    color: red;\n}\n\n#special-alert {\n    color: darkgreen;\n}`,
            solutionExplanation: "The ID selector `#special-alert` has higher specificity (100) than the class `.alert` (10), so darkgreen wins."
        },
        takeaways: "Keep specificity low by styling with single classes. Avoid stacking multiple IDs or using !important."
    },
    {
        id: "inheritance",
        title: "CSS Inheritance",
        category: "SELECTORS",
        difficulty: "Beginner",
        explanation: "<strong>Inheritance</strong> is the mechanism where child elements automatically inherit certain CSS property values from their parent container. Text properties (like <code>color</code>, <code>font-family</code>, <code>line-height</code>) are inherited by default. Box model properties (like <code>border</code>, <code>margin</code>, <code>padding</code>, <code>background</code>) are NOT inherited.",
        why: "Inheritance allows you to set global font and text color once on the <code>&lt;body&gt;</code> tag and have the entire document automatically look unified.",
        syntax: `/* Inherited properties: color, font-family, font-size, line-height, text-align */
body {
    font-family: Arial, sans-serif;
    color: #333;
}

/* Explicit inheritance keywords: inherit, initial, unset */
button {
    font-family: inherit; /* Forces button to inherit parent font */
}`,
        codeExample: {
            html: `<div class="parent-card">
    <h2>Inheritance Example</h2>
    <p>This paragraph inherits the blue color and Georgia font from parent-card.</p>
    <button>Default Button Font</button>
    <button class="custom-btn">Button with font: inherit</button>
</div>`,
            css: `.parent-card {
    font-family: Georgia, serif;
    color: #1e3a8a;
    border: 2px solid #3b82f6; /* Border is NOT inherited */
    padding: 20px;
}

.custom-btn {
    font-family: inherit; /* Explicitly inherit Georgia font */
    color: inherit;
    background: #e0f2fe;
    border: 1px solid #3b82f6;
    padding: 6px 12px;
    border-radius: 4px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>The <code>h2</code> and <code>p</code> elements automatically inherit <code>color: #1e3a8a</code> and <code>font-family: Georgia</code>.</li>
<li>HTML form elements (like <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>) do NOT inherit fonts by default; you must write <code>font-family: inherit;</code>.</li>
<li>The parent's <code>border</code> is not inherited by the children.</li>
</ul>`,
        exercise: {
            instruction: "Set `font-family: sans-serif` and `color: navy` on `.container`, and give `.custom-input` `font-family: inherit`.",
            starterHTML: `<div class="container">\n    <p>Inherits font and color.</p>\n    <input class="custom-input" value="Inherited font">\n</div>`,
            starterCSS: `.container {\n    /* Add font-family and color */\n}\n\n.custom-input {\n    /* Add font-family: inherit */\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling and the requested styling on the requested styling, and give the requested styling the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `font-family`, `color`.",
            "Implementation guidance:\n```css\n.container {\n    font-family: sans-serif;\n    color: navy;\n...\n```"
        ],
            solutionHTML: `<div class="container">\n    <p>Inherits font and color.</p>\n    <input class="custom-input" value="Inherited font">\n</div>`,
            solutionCSS: `.container {\n    font-family: sans-serif;\n    color: navy;\n}\n\n.custom-input {\n    font-family: inherit;\n}`,
            solutionExplanation: "Setting text properties on a parent cascades down to all descendants unless explicitly overridden."
        },
        takeaways: "Text properties inherit naturally. Use `inherit` to pull parent values into form controls."
    },

    // ═══════════════════════════════════════
    // SECTION 3 — COLORS & UNITS
    // ═══════════════════════════════════════
    {
        id: "colors",
        title: "Colors in CSS",
        category: "COLORS & UNITS",
        difficulty: "Beginner",
        explanation: "CSS provides multiple formats to define colors: <strong>Named Colors</strong> (<code>red</code>, <code>royalblue</code>), <strong>HEX codes</strong> (<code>#2563eb</code>), <strong>RGB / RGBA</strong> (<code>rgb(37, 99, 235)</code>), and <strong>HSL / HSLA</strong> (<code>hsl(221, 83%, 53%)</code>).",
        why: "HSL (Hue, Saturation, Lightness) is the most intuitive for humans, while HEX and RGBA are the industry standards for digital web design.",
        syntax: `/* Named */
color: crimson;

/* HEX (6-digit and 8-digit with alpha) */
color: #2563eb;
color: #2563eb80; /* 50% opacity */

/* RGB and RGBA */
color: rgb(37, 99, 235);
color: rgba(37, 99, 235, 0.5);

/* HSL and HSLA (Hue: 0-360, Saturation: %, Lightness: %) */
color: hsl(221, 83%, 53%);
color: hsla(221, 83%, 53%, 0.8);`,
        codeExample: {
            html: `<div class="color-box hex-box">HEX: #3b82f6</div>
<div class="color-box rgb-box">RGB: rgb(16, 185, 129)</div>
<div class="color-box hsl-box">HSL: hsl(262, 83%, 58%)</div>
<div class="color-box alpha-box">Semi-transparent RGBA</div>`,
            css: `.color-box {
    padding: 14px;
    margin-bottom: 8px;
    border-radius: 6px;
    color: white;
    font-weight: bold;
}

.hex-box   { background: #3b82f6; }
.rgb-box   { background: rgb(16, 185, 129); }
.hsl-box   { background: hsl(262, 83%, 58%); }
.alpha-box { background: rgba(239, 68, 68, 0.75); }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><strong>HEX (<code>#RRGGBB</code>)</strong>: Base-16 representation from <code>00</code> to <code>FF</code>.</li>
<li><strong>RGB</strong>: Red, Green, Blue channels from 0 to 255.</li>
<li><strong>HSL</strong>: Hue (0-360° color wheel), Saturation (0-100%), Lightness (0% black, 100% white).</li>
<li><strong>Alpha channel</strong>: Controls opacity from <code>0.0</code> (fully transparent) to <code>1.0</code> (fully opaque).</li>
</ul>`,
        exercise: {
            instruction: "Set the background of `.badge` to a semi-transparent blue using `rgba(37, 99, 235, 0.2)` and text color to `#1d4ed8`.",
            starterHTML: `<span class="badge">New Release</span>`,
            starterCSS: `.badge {\n    /* Add background and color */\n    padding: 6px 14px;\n    border-radius: 20px;\n}`,
            hints: [
            "Think about the high-level goal: Set the background of the requested styling to a semi-transparent blue using the requested styling and text color to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `color`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.badge {\n    background: rgba(37, 99, 235, 0.2);\n    color: #1d4ed8;\n...\n```"
        ],
            solutionHTML: `<span class="badge">New Release</span>`,
            solutionCSS: `.badge {\n    background: rgba(37, 99, 235, 0.2);\n    color: #1d4ed8;\n    padding: 6px 14px;\n    border-radius: 20px;\n}`,
            solutionExplanation: "Using RGBA allows you to create subtle translucent background tints without affecting the opacity of inner text."
        },
        takeaways: "Use HEX for exact brand colors and RGBA/HSLA when you need transparency."
    },
    {
        id: "css-units",
        title: "CSS Units",
        category: "COLORS & UNITS",
        difficulty: "Beginner",
        explanation: "CSS units define size, length, and distances. They are divided into <strong>Absolute Units</strong> (<code>px</code>) which do not change, and <strong>Relative Units</strong> (<code>rem</code>, <code>em</code>, <code>%</code>, <code>vw</code>, <code>vh</code>) which scale dynamically based on font size or viewport dimensions.",
        why: "Using relative units like <code>rem</code> ensures your website scales properly when users adjust their operating system or browser font size settings, which is essential for accessibility.",
        syntax: `/* Absolute */
font-size: 16px;

/* Relative to Root HTML font-size (1rem = 16px by default) */
font-size: 1.25rem; /* 20px */
padding: 1.5rem;    /* 24px */

/* Relative to parent font-size */
font-size: 1.2em;

/* Relative to Viewport (100vw = 100% screen width, 100vh = 100% screen height) */
width: 50vw;
min-height: 100vh;`,
        codeExample: {
            html: `<div class="unit-card">
    <h2>Scalable Card Title</h2>
    <p>This text uses <code>rem</code> for accessible sizing.</p>
    <div class="percentage-bar">50% Width of Parent</div>
</div>`,
            css: `.unit-card {
    max-width: 500px;
    padding: 1.5rem; /* 24px */
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem; /* 8px */
}

h2 {
    font-size: 1.5rem; /* 24px */
    margin-bottom: 0.75rem; /* 12px */
}

.percentage-bar {
    width: 75%;
    background: #3b82f6;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>rem</code>: Root EM. <code>1rem</code> equals the font size of the <code>&lt;html&gt;</code> element (usually 16px). Recommended for typography, padding, margins.</li>
<li><code>em</code>: Relative to the element's own or parent's font size. Great for badges and icons that should scale proportionally with their surrounding text.</li>
<li><code>%</code>: Relative to the parent container's dimensions.</li>
<li><code>vw / vh</code>: 1% of viewport width and height respectively.</li>
</ul>`,
        exercise: {
            instruction: "Set `font-size: 1.5rem` and `padding: 1rem 2rem` on `.button-cta`.",
            starterHTML: `<button class="button-cta">Get Started</button>`,
            starterCSS: `.button-cta {\n    /* Add font-size and padding using rem */\n    background: #2563eb;\n    color: white;\n    border: none;\n    border-radius: 6px;\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `font-size`, `padding`, `background`, `color`, `border`, `border-radius`.",
            "Implementation guidance:\n```css\n.button-cta {\n    font-size: 1.5rem;\n    padding: 1rem 2rem;\n...\n```"
        ],
            solutionHTML: `<button class="button-cta">Get Started</button>`,
            solutionCSS: `.button-cta {\n    font-size: 1.5rem;\n    padding: 1rem 2rem;\n    background: #2563eb;\n    color: white;\n    border: none;\n    border-radius: 6px;\n}`,
            solutionExplanation: "Using `rem` guarantees accessible scaling when users adjust system text magnification."
        },
        takeaways: "Use `rem` for typography and spacing, `%` and `vw/vh` for fluid layouts, and `px` for fine borders."
    },

    // ═══════════════════════════════════════
    // SECTION 4 — TYPOGRAPHY & TEXT
    // ═══════════════════════════════════════
    {
        id: "font-properties",
        title: "Font Properties",
        category: "TYPOGRAPHY",
        difficulty: "Beginner",
        explanation: "Font properties control the typeface family, weight, style, and size of text. The core font properties are: <code>font-family</code>, <code>font-size</code>, <code>font-weight</code>, <code>font-style</code>, and the <code>font</code> shorthand.",
        why: "Typography is the foundation of UI design. 90% of user interface interaction is reading text, so clear font hierarchy is vital.",
        syntax: `font-family: 'Inter', -apple-system, sans-serif;
font-size: 1.125rem;
font-weight: 600; /* 400 = regular, 700 = bold */
font-style: italic; /* normal | italic */`,
        codeExample: {
            html: `<h1 class="heading">Modern Typography</h1>
<p class="lead">Introductory lead paragraph with medium weight.</p>
<p class="body-text">Regular body copy with high readability.</p>`,
            css: `.heading {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
}

.lead {
    font-size: 1.25rem;
    font-weight: 500;
    color: #334155;
}

.body-text {
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
    color: #64748b;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>font-family</code> specifies a fallback chain (e.g. if Helvetica is missing, use Arial, then any system sans-serif).</li>
<li><code>font-weight</code> numeric values range from <code>100</code> (thin) to <code>900</code> (black), with <code>400</code> as normal and <code>700</code> as bold.</li>
</ul>`,
        exercise: {
            instruction: "Style `.quote` with `font-style: italic`, `font-size: 1.2rem`, and `font-weight: 600`.",
            starterHTML: `<p class="quote">Design is intelligence made visible.</p>`,
            starterCSS: `.quote {\n    /* Add font properties */\n}`,
            hints: [
            "Think about the high-level goal: Style the requested styling with the requested styling, the requested styling, and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `font-style`, `font-size`, `font-weight`.",
            "Implementation guidance:\n```css\n.quote {\n    font-style: italic;\n    font-size: 1.2rem;\n...\n```"
        ],
            solutionHTML: `<p class="quote">Design is intelligence made visible.</p>`,
            solutionCSS: `.quote {\n    font-style: italic;\n    font-size: 1.2rem;\n    font-weight: 600;\n}`,
            solutionExplanation: "Combining font-style, size, and weight gives quotes distinct emphasis."
        },
        takeaways: "Always include fallback fonts in your font-family stack to ensure cross-platform compatibility."
    },
    {
        id: "text-properties",
        title: "Text Properties",
        category: "TYPOGRAPHY",
        difficulty: "Beginner",
        explanation: "Text properties style the alignment, spacing, transformation, and decoration of text. Key properties include: <code>text-align</code>, <code>line-height</code>, <code>letter-spacing</code>, <code>text-transform</code>, and <code>text-decoration</code>.",
        why: "Proper line height and letter spacing can instantly transform cramped, unreadable text into a polished, professional editorial design.",
        syntax: `text-align: center; /* left | right | center | justify */
line-height: 1.6;   /* 1.5 to 1.7 is ideal for body copy */
letter-spacing: 0.05em; /* Tracking between characters */
text-transform: uppercase; /* capitalize | uppercase | lowercase */
text-decoration: underline; /* none | underline | line-through */`,
        codeExample: {
            html: `<div class="article">
    <span class="category-tag">Technology</span>
    <h2 class="title">The Future of Web Styling</h2>
    <p class="body">Clean typography makes content inviting. Notice the comfortable line spacing and balanced letter tracking across all text blocks.</p>
    <a href="#" class="read-more">Read Full Story &rarr;</a>
</div>`,
            css: `.category-tag {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.75rem;
    font-weight: 700;
    color: #2563eb;
}

.title {
    text-align: left;
    line-height: 1.25;
    margin: 6px 0 12px;
}

.body {
    line-height: 1.7;
    color: #475569;
}

.read-more {
    text-decoration: none;
    font-weight: 600;
    color: #2563eb;
}
.read-more:hover {
    text-decoration: underline;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>text-transform: uppercase</code> changes text to capital letters without altering HTML source code.</li>
<li><code>line-height: 1.7</code> sets comfortable vertical breathing room between wrapped lines.</li>
<li><code>text-decoration: none</code> removes default anchor underlines.</li>
</ul>`,
        exercise: {
            instruction: "Style `.uppercase-title` with `text-transform: uppercase`, `letter-spacing: 2px`, and `text-align: center`.",
            starterHTML: `<h3 class="uppercase-title">Featured Article</h3>`,
            starterCSS: `.uppercase-title {\n    /* Add text properties */\n}`,
            hints: [
            "Think about the high-level goal: Style the requested styling with the requested styling, the requested styling, and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `text-transform`, `letter-spacing`, `text-align`.",
            "Implementation guidance:\n```css\n.uppercase-title {\n    text-transform: uppercase;\n    letter-spacing: 2px;\n...\n```"
        ],
            solutionHTML: `<h3 class="uppercase-title">Featured Article</h3>`,
            solutionCSS: `.uppercase-title {\n    text-transform: uppercase;\n    letter-spacing: 2px;\n    text-align: center;\n}`,
            solutionExplanation: "Letter-spacing and uppercase transformations create clean section labels and headers."
        },
        takeaways: "Always set `line-height: 1.5` to `1.7` on body text for optimal reading accessibility."
    },
    {
        id: "web-fonts",
        title: "Web Fonts (Google Fonts)",
        category: "TYPOGRAPHY",
        difficulty: "Beginner",
        explanation: "<strong>Web Fonts</strong> allow you to load custom, beautiful typefaces (like Inter, Roboto, Poppins) from services like Google Fonts instead of being limited to standard pre-installed system fonts.",
        why: "Custom web fonts give websites a distinctive brand personality and ensure consistent typography across every operating system (macOS, Windows, iOS, Android).",
        syntax: `<!-- In HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

/* In CSS */
body {
    font-family: 'Poppins', sans-serif;
}`,
        codeExample: {
            html: `<div class="font-demo">
    <h2>Loaded via Google Fonts</h2>
    <p>This paragraph renders with the clean Poppins web font loaded directly from the Google Fonts CDN.</p>
</div>`,
            css: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.font-demo {
    font-family: 'Poppins', sans-serif;
    background: #f8fafc;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.font-demo h2 {
    font-weight: 600;
    color: #1e293b;
    margin-top: 0;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>@import</code> or <code>&lt;link&gt;</code> requests the font files from Google's high-speed CDN.</li>
<li><code>font-family: 'Poppins', sans-serif;</code> applies the downloaded typeface with a fallback.</li>
<li>Specify only the weights you need (e.g. 400, 700) to keep page load times fast.</li>
</ul>`,
        exercise: {
            instruction: "Apply `font-family: 'Poppins', sans-serif;` and `font-weight: 600` to `.brand-heading`.",
            starterHTML: `<h1 class="brand-heading">Creative Agency</h1>`,
            starterCSS: `.brand-heading {\n    /* Apply font-family and font-weight */\n}`,
            hints: [
            "Think about the high-level goal: Apply the requested styling and the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `font-family`, `font-weight`.",
            "Implementation guidance:\n```css\n.brand-heading {\n    font-family: 'Poppins', sans-serif;\n    font-weight: 600;\n...\n```"
        ],
            solutionHTML: `<h1 class="brand-heading">Creative Agency</h1>`,
            solutionCSS: `.brand-heading {\n    font-family: 'Poppins', sans-serif;\n    font-weight: 600;\n}`,
            solutionExplanation: "Enclose multi-word font names in quotes and always provide a generic fallback like `sans-serif`."
        },
        takeaways: "Load only required font weights to keep performance fast and prevent layout shift."
    }
);
