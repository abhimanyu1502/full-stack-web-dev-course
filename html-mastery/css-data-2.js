window.cssLessons = window.cssLessons || [];

window.cssLessons.push(
    // ═══════════════════════════════════════
    // SECTION 5 — THE BOX MODEL & DIMENSIONS
    // ═══════════════════════════════════════
    {
        id: "css-box-model",
        title: "The CSS Box Model",
        category: "BOX MODEL",
        difficulty: "Beginner",
        explanation: "In CSS, every single element on the page is treated as a rectangular box. The <strong>Box Model</strong> consists of 4 concentric layers: <strong>Content</strong> (the inner text/image), <strong>Padding</strong> (space inside the border), <strong>Border</strong> (the outline wrapping the padding), and <strong>Margin</strong> (space outside the border pushing neighbors away).",
        why: "Mastering the Box Model is the single most fundamental skill in CSS layout. All spacing, alignment, and sizing bugs come down to understanding these 4 layers.",
        syntax: `/* Total element rendered space:
   Margin (outside)
   -> Border
   -> Padding (inside)
   -> Content (width x height)
*/`,
        codeExample: {
            html: `<div class="box-model-demo">
    <p>I am the inner <strong>Content</strong>.</p>
</div>`,
            css: `.box-model-demo {
    /* 1. Content width */
    width: 280px;
    background: #dbeafe; /* Content area color */

    /* 2. Padding: space inside */
    padding: 24px;

    /* 3. Border: wrapping line */
    border: 4px solid #2563eb;

    /* 4. Margin: space outside */
    margin: 30px auto;

    text-align: center;
    border-radius: 8px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><strong>Content</strong>: where your text and child tags live.</li>
<li><strong>Padding (24px)</strong>: creates space between the text and the blue border. It takes the element's background color.</li>
<li><strong>Border (4px)</strong>: the visible outline around the padding.</li>
<li><strong>Margin (30px)</strong>: transparent buffer creating clearance around the outside of the box.</li>
</ul>`,
        exercise: {
            instruction: "Set `padding: 20px`, `border: 2px solid green`, and `margin: 15px` on `.box`.",
            starterHTML: `<div class="box">Box Model Exercise</div>`,
            starterCSS: `.box {\n    /* Add padding, border, and margin */\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling, the requested styling, and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `padding`, `border`, `margin`.",
            "Implementation guidance:\n```css\n.box {\n    padding: 20px;\n    border: 2px solid green;\n...\n```"
        ],
            solutionHTML: `<div class="box">Box Model Exercise</div>`,
            solutionCSS: `.box {\n    padding: 20px;\n    border: 2px solid green;\n    margin: 15px;\n}`,
            solutionExplanation: "Padding adds interior breathing room, border frames the element, and margin spaces it from neighboring elements."
        },
        takeaways: "Padding is inside the border; Margin is outside the border."
    },
    {
        id: "box-sizing",
        title: "box-sizing: border-box",
        category: "BOX MODEL",
        difficulty: "Beginner",
        explanation: "By default, browsers use <code>box-sizing: content-box</code>, meaning adding padding and borders <em>adds to</em> the total width of an element (a 200px box with 20px padding becomes 240px wide!). Setting <code>box-sizing: border-box</code> forces padding and borders to be absorbed <em>inside</em> the declared width.",
        why: "<code>border-box</code> makes responsive layouts predictable. If you set <code>width: 50%</code>, it will always stay exactly 50% regardless of how much padding or border you add.",
        syntax: `/* Standard CSS Reset applied to all elements */
*, *::before, *::after {
    box-sizing: border-box;
}`,
        codeExample: {
            html: `<div class="box content-box">
    <strong>content-box</strong><br>width: 200px + 20px padding = 240px total!
</div>
<div class="box border-box">
    <strong>border-box</strong><br>width: 200px (padding stays inside)
</div>`,
            css: `.box {
    width: 200px;
    padding: 20px;
    border: 4px solid #3b82f6;
    margin-bottom: 16px;
    background: #eff6ff;
}

.content-box {
    box-sizing: content-box; /* Grows bigger! */
}

.border-box {
    box-sizing: border-box; /* Stays exact 200px! */
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>The <code>.content-box</code> renders at 248px wide (200 + 40 padding + 8 borders).</li>
<li>The <code>.border-box</code> renders at exactly 200px wide, shrinking the content area to fit.</li>
<li>Modern web developers apply <code>box-sizing: border-box</code> globally to all elements at the start of every project.</li>
</ul>`,
        exercise: {
            instruction: "Apply `box-sizing: border-box` to `.input-full` with `width: 100%` and `padding: 12px`.",
            starterHTML: `<input class="input-full" placeholder="Full-width input">`,
            starterCSS: `.input-full {\n    /* Add box-sizing, width, and padding */\n    border: 1px solid #94a3b8;\n    border-radius: 4px;\n}`,
            hints: [
            "Think about the high-level goal: Apply the requested styling to the requested styling with the requested styling and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `box-sizing`, `width`, `padding`, `border`, `border-radius`.",
            "Implementation guidance:\n```css\n.input-full {\n    box-sizing: border-box;\n    width: 100%;\n...\n```"
        ],
            solutionHTML: `<input class="input-full" placeholder="Full-width input">`,
            solutionCSS: `.input-full {\n    box-sizing: border-box;\n    width: 100%;\n    padding: 12px;\n    border: 1px solid #94a3b8;\n    border-radius: 4px;\n}`,
            solutionExplanation: "With `border-box`, `width: 100%` elements won't overflow their parent containers when padding is applied."
        },
        takeaways: "Always set `*, *::before, *::after { box-sizing: border-box; }` at the top of every stylesheet."
    },
    {
        id: "margin",
        title: "Margin & Margin Collapsing",
        category: "BOX MODEL",
        difficulty: "Beginner",
        explanation: "<strong>Margin</strong> creates space outside an element. You can set margins individually (<code>margin-top</code>, <code>margin-right</code>, <code>margin-bottom</code>, <code>margin-left</code>) or using the 4-value clockwise shorthand: <code>margin: top right bottom left</code>.",
        why: "Understanding margin auto centering (<code>margin: 0 auto</code>) and vertical margin collapsing is essential for structuring layouts.",
        syntax: `/* Shorthand: Clockwise (Top, Right, Bottom, Left) */
margin: 10px 20px 30px 40px;

/* 2-value: Vertical | Horizontal */
margin: 20px auto; /* Centers block elements horizontally! */

/* Individual sides */
margin-top: 1rem;
margin-bottom: 2rem;`,
        codeExample: {
            html: `<div class="card-centered">
    <h3>Centered Card</h3>
    <p>Using <code>margin: 0 auto</code> with a <code>max-width</code> centers block elements.</p>
</div>
<div class="stack-box top-box">Box 1 (margin-bottom: 30px)</div>
<div class="stack-box bottom-box">Box 2 (margin-top: 20px) — Gap is 30px, not 50px!</div>`,
            css: `.card-centered {
    max-width: 400px;
    margin: 0 auto 24px auto; /* Centered */
    padding: 16px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    text-align: center;
}

.stack-box {
    padding: 12px;
    background: #e2e8f0;
    border-radius: 4px;
}
.top-box { margin-bottom: 30px; }
.bottom-box { margin-top: 20px; } /* Collapses with top-box's 30px margin! */`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>margin: 0 auto</code>: Browser automatically divides remaining horizontal space equally on left and right, centering the element.</li>
<li><strong>Margin Collapsing</strong>: When two vertical margins touch, they collapse into a single margin equal to the largest of the two (30px, not 50px).</li>
</ul>`,
        exercise: {
            instruction: "Center `.container` horizontally by adding `max-width: 500px` and `margin: 0 auto`.",
            starterHTML: `<div class="container">\n    <p>I am a centered container.</p>\n</div>`,
            starterCSS: `.container {\n    /* Center this container */\n    background: #f1f5f9;\n    padding: 20px;\n}`,
            hints: [
            "Think about the high-level goal: Center the requested styling horizontally by adding the requested styling and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `max-width`, `margin`, `background`, `padding`.",
            "Implementation guidance:\n```css\n.container {\n    max-width: 500px;\n    margin: 0 auto;\n...\n```"
        ],
            solutionHTML: `<div class="container">\n    <p>I am a centered container.</p>\n</div>`,
            solutionCSS: `.container {\n    max-width: 500px;\n    margin: 0 auto;\n    background: #f1f5f9;\n    padding: 20px;\n}`,
            solutionExplanation: "`margin: 0 auto` on a block element with a defined width or max-width centers it horizontally."
        },
        takeaways: "Use `margin: 0 auto` to center containers. Remember that vertical margins collapse into the larger value."
    },
    {
        id: "padding",
        title: "Padding & Spacing",
        category: "BOX MODEL",
        difficulty: "Beginner",
        explanation: "<strong>Padding</strong> creates breathing room <em>inside</em> an element, between its content and its border. Unlike margin, padding is part of the clickable area of a button and inherits the element's background color.",
        why: "Buttons, cards, inputs, and navigation links all depend on balanced padding to look clickable and inviting.",
        syntax: `/* All 4 sides */
padding: 16px;

/* Vertical | Horizontal */
padding: 12px 24px;

/* Top | Right | Bottom | Left (Clockwise) */
padding: 10px 20px 15px 5px;`,
        codeExample: {
            html: `<button class="btn btn-cramped">No Padding</button>
<button class="btn btn-spacious">Spacious Padding (12px 28px)</button>
<div class="padded-card">
    <h4>Comfortable Interior Padding</h4>
    <p>The text is cushioned away from the border.</p>
</div>`,
            css: `.btn {
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
}
.btn-cramped { padding: 0; }
.btn-spacious { padding: 12px 28px; }

.padded-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 24px;
    margin-top: 16px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>padding: 12px 28px</code> gives 12px padding on top/bottom and 28px on left/right for an attractive pill button shape.</li>
<li>Padding never collapses — padding values always add together directly.</li>
</ul>`,
        exercise: {
            instruction: "Give `.action-btn` a vertical padding of 10px and horizontal padding of 20px using the 2-value shorthand.",
            starterHTML: `<button class="action-btn">Click Me</button>`,
            starterCSS: `.action-btn {\n    /* Add padding */\n    background: #16a34a;\n    color: white;\n    border: none;\n    border-radius: 4px;\n}`,
            hints: [
            "Think about the high-level goal: Give the requested styling a vertical padding of 10px and horizontal padding of 20px using the 2-value shorthand.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `padding`, `background`, `color`, `border`, `border-radius`.",
            "Implementation guidance:\n```css\n.action-btn {\n    padding: 10px 20px;\n    background: #16a34a;\n...\n```"
        ],
            solutionHTML: `<button class="action-btn">Click Me</button>`,
            solutionCSS: `.action-btn {\n    padding: 10px 20px;\n    background: #16a34a;\n    color: white;\n    border: none;\n    border-radius: 4px;\n}`,
            solutionExplanation: "The 2-value shorthand `padding: 10px 20px;` applies 10px to top/bottom and 20px to left/right."
        },
        takeaways: "Padding expands the clickable area of buttons and links and carries the element background color."
    },
    {
        id: "borders",
        title: "Borders & Border-Radius",
        category: "BOX MODEL",
        difficulty: "Beginner",
        explanation: "The <code>border</code> shorthand property sets the width, style, and color of an element's perimeter line. The <code>border-radius</code> property rounds the corners of the box.",
        why: "Subtle borders and rounded corners define the visual surface boundaries and modern look-and-feel of cards, inputs, and modals.",
        syntax: `/* border: width style color */
border: 1px solid #e2e8f0;
border-bottom: 2px dashed #3b82f6;

/* border-radius */
border-radius: 8px;   /* Subtle rounded corner */
border-radius: 9999px; /* Pill / Capsule shape */
border-radius: 50%;   /* Perfect circle (when width === height) */`,
        codeExample: {
            html: `<div class="badge-pill">Capsule Pill</div>
<div class="circle-avatar">JD</div>
<div class="callout-box">Border on left side only</div>`,
            css: `.badge-pill {
    display: inline-block;
    padding: 6px 16px;
    background: #e0e7ff;
    color: #4338ca;
    border-radius: 9999px; /* Pill */
    font-weight: 600;
}

.circle-avatar {
    width: 48px;
    height: 48px;
    background: #0ea5e9;
    color: white;
    border-radius: 50%; /* Circle */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.callout-box {
    margin-top: 16px;
    padding: 14px;
    background: #f8fafc;
    border-left: 4px solid #2563eb;
    border-radius: 0 8px 8px 0;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>border-radius: 50%</code> turns any square element into a circle.</li>
<li><code>border-radius: 9999px</code> creates a pill shape regardless of element length.</li>
<li>Individual side borders like <code>border-left</code> create callout accents.</li>
</ul>`,
        exercise: {
            instruction: "Create a circular avatar: set `width: 50px`, `height: 50px`, and `border-radius: 50%` on `.avatar`.",
            starterHTML: `<div class="avatar">AB</div>`,
            starterCSS: `.avatar {\n    /* Add dimensions and border-radius */\n    background: #6366f1;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}`,
            hints: [
            "Think about the high-level goal: Create a circular avatar: set the requested styling, the requested styling, and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `width`, `height`, `border-radius`, `background`, `color`, `display`, `align-items`, `justify-content`.",
            "Implementation guidance:\n```css\n.avatar {\n    width: 50px;\n    height: 50px;\n...\n```"
        ],
            solutionHTML: `<div class="avatar">AB</div>`,
            solutionCSS: `.avatar {\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    background: #6366f1;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}`,
            solutionExplanation: "A square element with `border-radius: 50%` renders as a circle."
        },
        takeaways: "Use `border-radius: 8px-12px` for modern cards and `50%` for profile circles."
    },
    {
        id: "width-and-height",
        title: "Width, Height & Min/Max Constraints",
        category: "BOX MODEL",
        difficulty: "Beginner",
        explanation: "The <code>width</code> and <code>height</code> properties set element dimensions. <code>min-width</code>, <code>max-width</code>, <code>min-height</code>, and <code>max-height</code> set defensive limits that keep containers responsive.",
        why: "Using fixed <code>width: 800px</code> causes horizontal scrolling on smartphones. Using <code>max-width: 800px; width: 100%;</code> makes containers fluid and mobile-friendly.",
        syntax: `/* Fluid responsive container */
width: 100%;
max-width: 1200px;
margin: 0 auto;

/* Full viewport height section */
min-height: 100vh;`,
        codeExample: {
            html: `<div class="responsive-wrapper">
    <h2>Fluid Container</h2>
    <p>Shrink your browser window. Notice how this box never overflows!</p>
</div>`,
            css: `.responsive-wrapper {
    width: 100%;
    max-width: 600px; /* Never exceeds 600px on desktop */
    min-height: 120px;
    margin: 0 auto;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 20px;
    border-radius: 8px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>width: 100%</code> allows the element to shrink smoothly on smaller mobile screens.</li>
<li><code>max-width: 600px</code> prevents it from stretching too wide on massive desktop displays.</li>
<li><code>min-height</code> guarantees minimum height without cutting off content if more text is added.</li>
</ul>`,
        exercise: {
            instruction: "Make `.container` responsive with `width: 100%` and `max-width: 450px`.",
            starterHTML: `<div class="container">\n    <h3>Responsive Box</h3>\n</div>`,
            starterCSS: `.container {\n    /* Add width and max-width */\n    background: #dbeafe;\n    padding: 16px;\n    border-radius: 6px;\n}`,
            hints: [
            "Think about the high-level goal: Make the requested styling responsive with the requested styling and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `width`, `max-width`, `background`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.container {\n    width: 100%;\n    max-width: 450px;\n...\n```"
        ],
            solutionHTML: `<div class="container">\n    <h3>Responsive Box</h3>\n</div>`,
            solutionCSS: `.container {\n    width: 100%;\n    max-width: 450px;\n    background: #dbeafe;\n    padding: 16px;\n    border-radius: 6px;\n}`,
            solutionExplanation: "Combining `width: 100%` and `max-width` is the golden rule of fluid responsive web design."
        },
        takeaways: "Avoid fixed pixel widths on layout containers. Use `width: 100%; max-width: ...` instead."
    },

    // ═══════════════════════════════════════
    // SECTION 6 — BACKGROUNDS & EFFECTS
    // ═══════════════════════════════════════
    {
        id: "backgrounds",
        title: "CSS Backgrounds",
        category: "BACKGROUNDS",
        difficulty: "Beginner",
        explanation: "The <code>background</code> properties style element backdrops with colors, images, and attachments. Key properties: <code>background-color</code>, <code>background-image</code>, <code>background-size</code> (<code>cover</code> | <code>contain</code>), <code>background-position</code>, and <code>background-repeat</code>.",
        why: "Hero headers, banners, and textured UI cards rely on background styling.",
        syntax: `background-color: #0f172a;
background-image: url('banner.jpg');
background-size: cover;      /* Scales to cover entire box */
background-position: center; /* Centers image */
background-repeat: no-repeat;/* Prevents tiling */`,
        codeExample: {
            html: `<div class="hero-banner">
    <h1>Explore the Web</h1>
    <p>Hero banner with dark gradient overlay</p>
</div>`,
            css: `.hero-banner {
    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), #1e293b;
    color: white;
    padding: 60px 24px;
    border-radius: 12px;
    text-align: center;
}

.hero-banner h1 {
    font-size: 2.2rem;
    margin-bottom: 8px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>background-size: cover</code> ensures image fills the element while preserving its aspect ratio.</li>
<li><code>background-position: center</code> anchors the most important central portion of the image.</li>
<li>Overlaying a semi-transparent gradient ensures text remains readable over complex images.</li>
</ul>`,
        exercise: {
            instruction: "Set `background-color: #0f172a` and `color: white` on `.dark-card`.",
            starterHTML: `<div class="dark-card">Dark Card Content</div>`,
            starterCSS: `.dark-card {\n    /* Add background-color and color */\n    padding: 24px;\n    border-radius: 8px;\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background-color`, `color`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.dark-card {\n    background-color: #0f172a;\n    color: white;\n...\n```"
        ],
            solutionHTML: `<div class="dark-card">Dark Card Content</div>`,
            solutionCSS: `.dark-card {\n    background-color: #0f172a;\n    color: white;\n    padding: 24px;\n    border-radius: 8px;\n}`,
            solutionExplanation: "Setting dark backgrounds paired with light text creates modern dark-mode components."
        },
        takeaways: "Always set `background-size: cover; background-position: center; background-repeat: no-repeat;` on background images."
    },
    {
        id: "gradients",
        title: "CSS Gradients",
        category: "BACKGROUNDS",
        difficulty: "Beginner",
        explanation: "CSS gradients let you display smooth transitions between two or more colors without loading heavy image files. The two primary types are <strong>Linear Gradients</strong> (transitions along a straight line/angle) and <strong>Radial Gradients</strong> (transitions radiating outward from a central point).",
        why: "Gradients create modern, vibrant depth for hero headers, buttons, and decorative badges.",
        syntax: `/* Linear: Direction, Color 1, Color 2 */
background: linear-gradient(to right, #2563eb, #9333ea);
background: linear-gradient(135deg, #667eea, #764ba2);

/* Radial: Shape at Position, Color 1, Color 2 */
background: radial-gradient(circle, #3b82f6, #1e3a8a);`,
        codeExample: {
            html: `<div class="grad-box linear-grad">Linear Gradient (135deg)</div>
<div class="grad-box sunset-grad">Sunset Gradient</div>
<button class="grad-btn">Gradient Button</button>`,
            css: `.grad-box {
    padding: 24px;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    margin-bottom: 12px;
}

.linear-grad {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.sunset-grad {
    background: linear-gradient(to right, #f97316, #ec4899);
}

.grad-btn {
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>135deg</code> creates a diagonal angle from top-left to bottom-right.</li>
<li><code>to right</code> transitions horizontally from left to right.</li>
<li>You can include multiple color stops: <code>linear-gradient(to right, red, yellow, green)</code>.</li>
</ul>`,
        exercise: {
            instruction: "Apply a linear gradient background from `#2563eb` to `#7c3aed` to `.hero-box`.",
            starterHTML: `<div class="hero-box">Gradient Hero</div>`,
            starterCSS: `.hero-box {\n    /* Add linear-gradient background */\n    padding: 30px;\n    color: white;\n    border-radius: 8px;\n}`,
            hints: [
            "Think about the high-level goal: Apply a linear gradient background from the requested styling to the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `background`, `padding`, `color`, `border-radius`.",
            "Implementation guidance:\n```css\n.hero-box {\n    background: linear-gradient(to right, #2563eb, #7c3aed);\n    padding: 30px;\n...\n```"
        ],
            solutionHTML: `<div class="hero-box">Gradient Hero</div>`,
            solutionCSS: `.hero-box {\n    background: linear-gradient(to right, #2563eb, #7c3aed);\n    padding: 30px;\n    color: white;\n    border-radius: 8px;\n}`,
            solutionExplanation: "`linear-gradient()` creates smooth color blends without image assets."
        },
        takeaways: "Use gradients sparingly on CTAs and banners for high-impact visual interest."
    },
    {
        id: "shadows",
        title: "Box Shadow & Text Shadow",
        category: "BACKGROUNDS",
        difficulty: "Beginner",
        explanation: "<code>box-shadow</code> adds realistic shadow elevation behind elements, creating visual hierarchy. <code>text-shadow</code> adds shadow effects directly behind individual text glyphs.",
        why: "Shadows give interfaces depth and realism, making cards feel elevated off the page and buttons look interactive.",
        syntax: `/* box-shadow: x-offset y-offset blur spread color */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

/* text-shadow: x-offset y-offset blur color */
text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);`,
        codeExample: {
            html: `<div class="card shadow-sm">Small Shadow (0 1px 3px)</div>
<div class="card shadow-md">Medium Shadow (0 4px 6px)</div>
<div class="card shadow-lg">Large Elevated Shadow (0 10px 15px)</div>`,
            css: `.card {
    background: white;
    padding: 18px;
    border-radius: 8px;
    margin-bottom: 16px;
    color: #1e293b;
    border: 1px solid #f1f5f9;
}

.shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><strong>X-offset (0)</strong>: Horizontal shift. 0 means centered.</li>
<li><strong>Y-offset (4px)</strong>: Vertical drop downward.</li>
<li><strong>Blur (6px)</strong>: How soft and diffused the shadow edges appear.</li>
<li><strong>Color</strong>: Use semi-transparent black (e.g. <code>rgba(0,0,0,0.1)</code>) for natural realism.</li>
</ul>`,
        exercise: {
            instruction: "Add `box-shadow: 0 8px 16px rgba(0,0,0,0.15)` to `.floating-card`.",
            starterHTML: `<div class="floating-card">Elevated Content</div>`,
            starterCSS: `.floating-card {\n    /* Add box-shadow */\n    background: white;\n    padding: 20px;\n    border-radius: 8px;\n}`,
            hints: [
            "Think about the high-level goal: Add the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `box-shadow`, `background`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.floating-card {\n    box-shadow: 0 8px 16px rgba(0,0,0,0.15);\n    background: white;\n...\n```"
        ],
            solutionHTML: `<div class="floating-card">Elevated Content</div>`,
            solutionCSS: `.floating-card {\n    box-shadow: 0 8px 16px rgba(0,0,0,0.15);\n    background: white;\n    padding: 20px;\n    border-radius: 8px;\n}`,
            solutionExplanation: "Subtle alpha shadows simulate ambient light elevation."
        },
        takeaways: "Keep shadows soft and low-opacity (0.05 to 0.15) for a modern, premium aesthetic."
    },

    // ═══════════════════════════════════════
    // SECTION 7 — LAYOUT & POSITIONING
    // ═══════════════════════════════════════
    {
        id: "display",
        title: "The display Property",
        category: "LAYOUT",
        difficulty: "Beginner",
        explanation: "The <code>display</code> property defines how an element renders and interacts with surrounding elements. The 4 classic display values are: <strong>block</strong> (starts on new line, takes 100% width), <strong>inline</strong> (flows within text, respects NO width/height), <strong>inline-block</strong> (flows like text but respects width/height/padding), and <strong>none</strong> (removes element from page completely).",
        why: "Understanding display prevents confusion when elements won't accept width or stubbornly break onto new lines.",
        syntax: `display: block;        /* div, p, h1 */
display: inline;       /* span, a, strong */
display: inline-block; /* button, img, custom badges */
display: none;         /* Hidden completely */`,
        codeExample: {
            html: `<!-- Inline tags transformed into inline-blocks -->
<a href="#" class="nav-pill">Home</a>
<a href="#" class="nav-pill">Products</a>
<a href="#" class="nav-pill">About</a>`,
            css: `.nav-pill {
    display: inline-block; /* Allows padding and width while staying on one line! */
    padding: 8px 16px;
    background: #e2e8f0;
    color: #1e293b;
    text-decoration: none;
    border-radius: 6px;
    margin-right: 8px;
    font-weight: 500;
}

.nav-pill:hover {
    background: #2563eb;
    color: white;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Anchor tags <code>&lt;a&gt;</code> are inline by default and ignore vertical padding/height.</li>
<li>Setting <code>display: inline-block</code> gives them full box model powers while keeping them in a single row.</li>
<li><code>display: none</code> removes an element from accessibility and screen layout completely.</li>
</ul>`,
        exercise: {
            instruction: "Set `display: inline-block`, `padding: 10px 20px`, and `background: lightblue` on `.tag`.",
            starterHTML: `<span class="tag">Tag 1</span>\n<span class="tag">Tag 2</span>`,
            starterCSS: `.tag {\n    /* Add display, padding, and background */\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling, the requested styling, and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `padding`, `background`.",
            "Implementation guidance:\n```css\n.tag {\n    display: inline-block;\n    padding: 10px 20px;\n...\n```"
        ],
            solutionHTML: `<span class="tag">Tag 1</span>\n<span class="tag">Tag 2</span>`,
            solutionCSS: `.tag {\n    display: inline-block;\n    padding: 10px 20px;\n    background: lightblue;\n}`,
            solutionExplanation: "`inline-block` lets `span` elements sit side-by-side while respecting padding and margins."
        },
        takeaways: "Use `inline-block` when inline elements need custom width, height, or vertical padding."
    },
    {
        id: "position",
        title: "CSS Positioning",
        category: "LAYOUT",
        difficulty: "Intermediate",
        explanation: "The <code>position</code> property dictates how an element is placed on the screen. The 5 values are: <strong>static</strong> (default normal document flow), <strong>relative</strong> (offset relative to itself), <strong>absolute</strong> (pinned relative to closest positioned ancestor), <strong>fixed</strong> (pinned to viewport during scroll), and <strong>sticky</strong> (scrolls normally until reaching a scroll threshold).",
        why: "Positioning powers dropdown menus, badges on avatars, sticky headers, and floating modals.",
        syntax: `/* 1. Relative Parent Container */
.card {
    position: relative;
}

/* 2. Absolute Child Badge inside Parent */
.badge {
    position: absolute;
    top: 10px;
    right: 10px;
}

/* 3. Sticky Navigation Header */
header {
    position: sticky;
    top: 0;
}`,
        codeExample: {
            html: `<div class="product-card">
    <span class="sale-badge">SALE</span>
    <h3>Wireless Headphones</h3>
    <p>Premium noise-canceling audio.</p>
</div>`,
            css: `.product-card {
    position: relative; /* Anchor reference point for absolute children */
    padding: 24px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    max-width: 300px;
}

.sale-badge {
    position: absolute; /* Placed top-right corner of .product-card */
    top: 12px;
    right: 12px;
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 20px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>An <code>absolute</code> element searches upward for the nearest ancestor with <code>position: relative</code> (or absolute/fixed).</li>
<li><code>top: 12px; right: 12px;</code> positions the badge 12px from the top-right corner of the parent card.</li>
<li><code>fixed</code> locks elements to the browser window so they stay visible when scrolling.</li>
</ul>`,
        exercise: {
            instruction: "Position `.badge` in the top-right corner of `.container` by setting `position: relative` on `.container` and `position: absolute; top: 0; right: 0;` on `.badge`.",
            starterHTML: `<div class="container">\n    <span class="badge">NEW</span>\n    <p>Card Content</p>\n</div>`,
            starterCSS: `.container {\n    /* Add position: relative */\n    padding: 20px;\n    border: 1px solid #ccc;\n}\n\n.badge {\n    /* Add position: absolute, top, and right */\n    background: green;\n    color: white;\n    padding: 4px 8px;\n}`,
            hints: [
            "Think about the high-level goal: Position the requested styling in the top-right corner of the requested styling by setting the requested styling on the requested styling and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `position`, `padding`, `border`, `top`, `right`, `background`, `color`.",
            "Implementation guidance:\n```css\n.container {\n    position: relative;\n    padding: 20px;\n...\n```"
        ],
            solutionHTML: `<div class="container">\n    <span class="badge">NEW</span>\n    <p>Card Content</p>\n</div>`,
            solutionCSS: `.container {\n    position: relative;\n    padding: 20px;\n    border: 1px solid #ccc;\n}\n\n.badge {\n    position: absolute;\n    top: 0;\n    right: 0;\n    background: green;\n    color: white;\n    padding: 4px 8px;\n}`,
            solutionExplanation: "The parent needs `position: relative` so the child's `position: absolute` stays bounded within the card."
        },
        takeaways: "Always set `position: relative` on the parent container when using `position: absolute` on children."
    },
    {
        id: "z-index",
        title: "z-index & Stacking Context",
        category: "LAYOUT",
        difficulty: "Intermediate",
        explanation: "The <code>z-index</code> property controls the vertical 3D layering order of overlapping elements along the Z-axis (pointing outward toward the user). Higher numbers sit on top of lower numbers. <strong>Crucial rule:</strong> <code>z-index</code> only works on positioned elements (<code>relative</code>, <code>absolute</code>, <code>fixed</code>, <code>sticky</code>).",
        why: "Prevents modals from getting hidden under headers, and ensures dropdown menus float above card content.",
        syntax: `/* Must have position defined */
.modal {
    position: fixed;
    z-index: 1000; /* Sits on top of everything */
}

.dropdown {
    position: absolute;
    z-index: 100;
}`,
        codeExample: {
            html: `<div class="stack-container">
    <div class="box box-1">Box 1 (z-index: 1)</div>
    <div class="box box-2">Box 2 (z-index: 2 - On Top!)</div>
</div>`,
            css: `.stack-container {
    position: relative;
    height: 140px;
}

.box {
    position: absolute;
    width: 160px;
    height: 100px;
    padding: 12px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
}

.box-1 {
    top: 0;
    left: 0;
    background: #3b82f6;
    z-index: 1;
}

.box-2 {
    top: 30px;
    left: 60px;
    background: #ec4899;
    z-index: 2; /* Sits above Box 1 */
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Both boxes are positioned <code>absolute</code> so <code>z-index</code> takes effect.</li>
<li><code>box-2</code> has <code>z-index: 2</code>, so it stacks on top of <code>box-1</code> (<code>z-index: 1</code>).</li>
<li>Establish a clear scale (e.g. dropdowns: 10, headers: 50, modals: 100) instead of typing <code>999999</code>.</li>
</ul>`,
        exercise: {
            instruction: "Make `.overlay` sit above `.background` by adding `position: relative; z-index: 10;` to `.overlay`.",
            starterHTML: `<div class="background">Background Layer</div>\n<div class="overlay">Top Layer Overlay</div>`,
            starterCSS: `.background {\n    position: relative;\n    z-index: 1;\n    background: #cbd5e1;\n    padding: 20px;\n}\n\n.overlay {\n    /* Add position and z-index: 10 */\n    background: #2563eb;\n    color: white;\n    padding: 20px;\n    margin-top: -20px;\n}`,
            hints: [
            "Think about the high-level goal: Make the requested styling sit above the requested styling by adding the requested styling to the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `position`, `z-index`, `background`, `padding`, `color`, `margin-top`.",
            "Implementation guidance:\n```css\n.background {\n    position: relative;\n    z-index: 1;\n...\n```"
        ],
            solutionHTML: `<div class="background">Background Layer</div>\n<div class="overlay">Top Layer Overlay</div>`,
            solutionCSS: `.background {\n    position: relative;\n    z-index: 1;\n    background: #cbd5e1;\n    padding: 20px;\n}\n\n.overlay {\n    position: relative;\n    z-index: 10;\n    background: #2563eb;\n    color: white;\n    padding: 20px;\n    margin-top: -20px;\n}`,
            solutionExplanation: "z-index requires a positioning context (`relative`, `absolute`, or `fixed`) to apply."
        },
        takeaways: "z-index only functions on positioned elements. Plan a clean z-index scale (10, 50, 100)."
    },
    {
        id: "overflow",
        title: "The overflow Property",
        category: "LAYOUT",
        difficulty: "Beginner",
        explanation: "The <code>overflow</code> property specifies what happens when an element's content is too large to fit in its specified area. Values include: <strong>visible</strong> (default, bleeds out), <strong>hidden</strong> (clipped, no scrollbars), <strong>scroll</strong> (always shows scrollbars), and <strong>auto</strong> (adds scrollbars only when content exceeds boundaries).",
        why: "<code>overflow: auto</code> powers scrollable code blocks and sidebars, while <code>overflow: hidden</code> clips rounded corners.",
        syntax: `overflow: hidden; /* Clips overflowing content */
overflow: auto;   /* Scrollbars only when needed */
overflow-x: auto; /* Horizontal scroll only (great for code blocks) */
overflow-y: scroll; /* Vertical scroll */`,
        codeExample: {
            html: `<div class="scroll-box">
    <h4>Scrollable Code / Log Container</h4>
    <p>Line 1: System initialized.</p>
    <p>Line 2: Server running on port 8000.</p>
    <p>Line 3: Database connection established.</p>
    <p>Line 4: Compiling assets...</p>
    <p>Line 5: Ready for user requests.</p>
</div>`,
            css: `.scroll-box {
    max-height: 120px;
    overflow-y: auto; /* Adds scrollbar only when content overflows */
    background: #0f172a;
    color: #e2e8f0;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #1e293b;
    font-family: monospace;
    font-size: 0.85rem;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Setting <code>max-height: 120px</code> caps the height.</li>
<li><code>overflow-y: auto</code> cleanly introduces a scrollbar so users can scroll through all log entries without breaking the surrounding layout.</li>
</ul>`,
        exercise: {
            instruction: "Set `max-height: 100px` and `overflow-y: auto` on `.scroll-pane`.",
            starterHTML: `<div class="scroll-pane">\n    <p>Paragraph 1</p>\n    <p>Paragraph 2</p>\n    <p>Paragraph 3</p>\n    <p>Paragraph 4</p>\n</div>`,
            starterCSS: `.scroll-pane {\n    /* Add max-height and overflow-y */\n    background: #f8fafc;\n    padding: 12px;\n    border: 1px solid #ccc;\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `max-height`, `overflow-y`, `background`, `padding`, `border`.",
            "Implementation guidance:\n```css\n.scroll-pane {\n    max-height: 100px;\n    overflow-y: auto;\n...\n```"
        ],
            solutionHTML: `<div class="scroll-pane">\n    <p>Paragraph 1</p>\n    <p>Paragraph 2</p>\n    <p>Paragraph 3</p>\n    <p>Paragraph 4</p>\n</div>`,
            solutionCSS: `.scroll-pane {\n    max-height: 100px;\n    overflow-y: auto;\n    background: #f8fafc;\n    padding: 12px;\n    border: 1px solid #ccc;\n}`,
            solutionExplanation: "`overflow-y: auto` creates contained, scrollable viewports for long text content."
        },
        takeaways: "Use `overflow-x: auto` on code blocks and data tables to prevent mobile viewport blowouts."
    }
);
