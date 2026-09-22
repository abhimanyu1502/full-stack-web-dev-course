window.cssLessons = window.cssLessons || [];

window.cssLessons.push(
    // ═══════════════════════════════════════
    // SECTION 8 — FLEXBOX LAYOUT
    // ═══════════════════════════════════════
    {
        id: "flexbox-introduction",
        title: "29. Flexbox Introduction",
        category: "FLEXBOX",
        difficulty: "Beginner",
        explanation: "<strong>Flexbox (Flexible Box Layout)</strong> is a 1-dimensional layout model designed to distribute space along a single axis (row or column). Setting <code>display: flex</code> on a parent container turns all of its direct children into flexible flex items.",
        why: "Before Flexbox, aligning elements horizontally required complicated float hacks. Flexbox makes horizontal alignment, vertical centering, and equal-height columns effortless.",
        syntax: `/* Set on parent container */
.container {
    display: flex; /* Magic starts here! */
}`,
        codeExample: {
            html: `<div class="flex-container">
    <div class="flex-item">Item 1</div>
    <div class="flex-item">Item 2</div>
    <div class="flex-item">Item 3</div>
</div>`,
            css: `.flex-container {
    display: flex; /* Items instantly arrange in a horizontal row */
    gap: 12px;
    background: #f1f5f9;
    padding: 16px;
    border-radius: 8px;
}

.flex-item {
    flex: 1; /* Each item grows equally to take up 1/3 of the space */
    background: #3b82f6;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 6px;
    font-weight: bold;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>display: flex</code> on the parent transforms child <code>div</code> elements from stacking vertically into a smooth horizontal row.</li>
<li><code>flex: 1</code> distributes remaining space equally among all flex items.</li>
<li><code>gap: 12px</code> adds clean, equal space between items without awkward margin resets.</li>
</ul>`,
        exercise: {
            instruction: "Set `display: flex` and `gap: 15px` on `.row`.",
            starterHTML: `<div class="row">\n    <div>Column A</div>\n    <div>Column B</div>\n</div>`,
            starterCSS: `.row {\n    /* Add display: flex and gap */\n}\n.row > div {\n    background: #e2e8f0;\n    padding: 15px;\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `gap`, `background`, `padding`.",
            "Implementation guidance:\n```css\n.row {\n    display: flex;\n    gap: 15px;\n...\n```"
        ],
            solutionHTML: `<div class="row">\n    <div>Column A</div>\n    <div>Column B</div>\n</div>`,
            solutionCSS: `.row {\n    display: flex;\n    gap: 15px;\n}\n.row > div {\n    background: #e2e8f0;\n    padding: 15px;\n}`,
            solutionExplanation: "`display: flex` creates a flex formatting context for direct children."
        },
        takeaways: "Apply `display: flex` to the parent container, not to the child elements."
    },
    {
        id: "justify-content-align-items",
        title: "30. justify-content & align-items",
        category: "FLEXBOX",
        difficulty: "Beginner",
        explanation: "Flexbox alignment is governed by two axes: <strong>justify-content</strong> aligns items along the Main Axis (horizontal by default), while <strong>align-items</strong> aligns items along the Cross Axis (vertical by default).",
        why: "To achieve the classic 'holy grail' of web design — centering an element perfectly both horizontally and vertically — you only need 3 lines of Flexbox!",
        syntax: `/* Main Axis (Horizontal): flex-start | center | flex-end | space-between | space-around | space-evenly */
justify-content: space-between;

/* Cross Axis (Vertical): stretch | center | flex-start | flex-end | baseline */
align-items: center;

/* Perfect centering shorthand */
display: flex;
justify-content: center;
align-items: center;`,
        codeExample: {
            html: `<div class="navbar-demo">
    <div class="logo">SiteLogo</div>
    <div class="nav-links">
        <a href="#">Home</a>
        <a href="#">Pricing</a>
        <button class="btn-login">Login</button>
    </div>
</div>
<div class="perfect-center">
    <h3>Centered Content</h3>
</div>`,
            css: `.navbar-demo {
    display: flex;
    justify-content: space-between; /* Pushes logo to left, links to right */
    align-items: center;           /* Centers items vertically */
    background: #0f172a;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    margin-bottom: 16px;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 16px;
}
.nav-links a { color: #94a3b8; text-decoration: none; }
.btn-login { background: #2563eb; color: white; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; }

.perfect-center {
    display: flex;
    justify-content: center; /* Horizontally centered */
    align-items: center;     /* Vertically centered */
    height: 120px;
    background: #dbeafe;
    border-radius: 8px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>justify-content: space-between</code> pushes the first child to the far left and the last child to the far right.</li>
<li><code>align-items: center</code> aligns elements along their vertical centers.</li>
<li>Combining both centers any modal, hero title, or badge perfectly.</li>
</ul>`,
        exercise: {
            instruction: "Center the content inside `.center-box` vertically and horizontally with `display: flex`, `justify-content: center`, and `align-items: center`.",
            starterHTML: `<div class="center-box">\n    <span>Perfect Center</span>\n</div>`,
            starterCSS: `.center-box {\n    /* Add flexbox centering */\n    height: 120px;\n    background: #f8fafc;\n    border: 1px dashed #64748b;\n}`,
            hints: [
            "Think about the high-level goal: Center the content inside the requested styling vertically and horizontally with the requested styling, the requested styling, and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `justify-content`, `align-items`, `height`, `background`, `border`.",
            "Implementation guidance:\n```css\n.center-box {\n    display: flex;\n    justify-content: center;\n...\n```"
        ],
            solutionHTML: `<div class="center-box">\n    <span>Perfect Center</span>\n</div>`,
            solutionCSS: `.center-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 120px;\n    background: #f8fafc;\n    border: 1px dashed #64748b;\n}`,
            solutionExplanation: "Flexbox makes 2-dimensional centering effortless."
        },
        takeaways: "`justify-content` aligns along the main axis; `align-items` aligns along the cross axis."
    },
    {
        id: "flex-direction-wrap-gap",
        title: "31. flex-direction, flex-wrap & gap",
        category: "FLEXBOX",
        difficulty: "Beginner",
        explanation: "<code>flex-direction</code> sets the direction of the main axis (<code>row</code> | <code>column</code> | <code>row-reverse</code> | <code>column-reverse</code>). <code>flex-wrap: wrap</code> allows items to wrap into multiple rows instead of shrinking. <code>gap</code> defines equal space between rows and columns.",
        why: "Switching <code>flex-direction: column</code> on mobile screens is how you make navigation bars and multi-column layouts responsive.",
        syntax: `flex-direction: column; /* Stacks items vertically */
flex-wrap: wrap;        /* Allows wrapping to new lines */
gap: 16px;              /* Equal space between items */
gap: 20px 10px;         /* Row-gap (20px) Column-gap (10px) */`,
        codeExample: {
            html: `<div class="tag-cloud">
    <span class="tag">HTML5</span>
    <span class="tag">CSS3</span>
    <span class="tag">JavaScript</span>
    <span class="tag">React</span>
    <span class="tag">Node.js</span>
    <span class="tag">TypeScript</span>
    <span class="tag">Next.js</span>
    <span class="tag">GraphQL</span>
</div>`,
            css: `.tag-cloud {
    display: flex;
    flex-wrap: wrap; /* Automatically wraps tags to next row if screen is narrow */
    gap: 10px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
}

.tag {
    background: #e0e7ff;
    color: #4338ca;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>flex-wrap: wrap</code> allows items to flow naturally onto new lines as needed.</li>
<li><code>gap: 10px</code> provides uniform spacing between rows and columns without negative margin hacks.</li>
<li><code>flex-direction: column</code> swaps the main axis so items stack vertically.</li>
</ul>`,
        exercise: {
            instruction: "Set `display: flex`, `flex-wrap: wrap`, and `gap: 12px` on `.badge-container`.",
            starterHTML: `<div class="badge-container">\n    <span>Badge 1</span>\n    <span>Badge 2</span>\n    <span>Badge 3</span>\n</div>`,
            starterCSS: `.badge-container {\n    /* Add flex, wrap, and gap */\n}\n.badge-container span {\n    background: #e2e8f0;\n    padding: 8px 16px;\n    border-radius: 4px;\n}`,
            hints: [
            "Think about the high-level goal: Set the requested styling, the requested styling, and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `flex-wrap`, `gap`, `background`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.badge-container {\n    display: flex;\n    flex-wrap: wrap;\n...\n```"
        ],
            solutionHTML: `<div class="badge-container">\n    <span>Badge 1</span>\n    <span>Badge 2</span>\n    <span>Badge 3</span>\n</div>`,
            solutionCSS: `.badge-container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n}\n.badge-container span {\n    background: #e2e8f0;\n    padding: 8px 16px;\n    border-radius: 4px;\n}`,
            solutionExplanation: "`flex-wrap: wrap` with `gap` makes multi-item lists dynamically responsive."
        },
        takeaways: "Use `flex-wrap: wrap` and `gap` to create responsive card and tag layouts."
    },

    // ═══════════════════════════════════════
    // SECTION 9 — CSS GRID LAYOUT
    // ═══════════════════════════════════════
    {
        id: "grid-introduction",
        title: "32. CSS Grid Introduction",
        category: "CSS GRID",
        difficulty: "Intermediate",
        explanation: "<strong>CSS Grid Layout</strong> is a 2-dimensional layout system, handling rows and columns simultaneously. While Flexbox is 1D (content-first), Grid is 2D (layout-first, rigid columns and rows).",
        why: "CSS Grid makes complex dashboard layouts, photo galleries, and multi-column magazine layouts easy to build without nesting countless wrapper divs.",
        syntax: `/* Set on parent grid container */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
    gap: 20px;
}`,
        codeExample: {
            html: `<div class="grid-gallery">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
</div>`,
            css: `.grid-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    gap: 16px;
}

.card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    font-weight: bold;
    color: #1e293b;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>display: grid</code> turns the container into a grid layout context.</li>
<li><code>repeat(3, 1fr)</code> creates 3 equal columns using the flexible <code>fr</code> (fraction) unit.</li>
<li><code>gap: 16px</code> sets equal gutters between all columns and rows.</li>
</ul>`,
        exercise: {
            instruction: "Create a 2-column grid by setting `display: grid`, `grid-template-columns: 1fr 1fr`, and `gap: 15px` on `.grid-box`.",
            starterHTML: `<div class="grid-box">\n    <div>Left Column</div>\n    <div>Right Column</div>\n</div>`,
            starterCSS: `.grid-box {\n    /* Add display: grid, columns, and gap */\n}\n.grid-box > div {\n    background: #e0f2fe;\n    padding: 20px;\n    border-radius: 6px;\n}`,
            hints: [
            "Think about the high-level goal: Create a 2-column grid by setting the requested styling, the requested styling, and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `grid-template-columns`, `gap`, `background`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.grid-box {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n...\n```"
        ],
            solutionHTML: `<div class="grid-box">\n    <div>Left Column</div>\n    <div>Right Column</div>\n</div>`,
            solutionCSS: `.grid-box {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 15px;\n}\n.grid-box > div {\n    background: #e0f2fe;\n    padding: 20px;\n    border-radius: 6px;\n}`,
            solutionExplanation: "`1fr 1fr` creates two equal columns occupying 50% of the available space each."
        },
        takeaways: "Use Flexbox for 1D rows/components; use Grid for 2D full-page layouts."
    },
    {
        id: "grid-template-columns",
        title: "33. Grid Columns, Rows & minmax()",
        category: "CSS GRID",
        difficulty: "Intermediate",
        explanation: "<code>grid-template-columns</code> and <code>grid-template-rows</code> define the tracks of your grid. The powerhouse pattern <code>repeat(auto-fit, minmax(250px, 1fr))</code> creates fully responsive grids without requiring a single media query!",
        why: "This auto-fit responsive grid pattern automatically fits as many 250px columns as will fit on screen, wrapping smoothly from 4 columns to 1 column on mobile phones.",
        syntax: `/* Explicit columns */
grid-template-columns: 200px 1fr 2fr;

/* Responsive auto-fit grid (No media queries required!) */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`,
        codeExample: {
            html: `<div class="responsive-auto-grid">
    <div class="product-item">Product A</div>
    <div class="product-item">Product B</div>
    <div class="product-item">Product C</div>
    <div class="product-item">Product D</div>
</div>`,
            css: `.responsive-auto-grid {
    display: grid;
    /* Automatically calculates column count based on available space */
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
}

.product-item {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1e40af;
    padding: 24px;
    text-align: center;
    font-weight: bold;
    border-radius: 8px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>auto-fit</code>: fits as many columns onto the screen as possible.</li>
<li><code>minmax(180px, 1fr)</code>: each column must be at least 180px wide, but can expand to fill remaining space (<code>1fr</code>).</li>
<li>On mobile phones (<360px), it gracefully stacks into 1 full-width column automatically.</li>
</ul>`,
        exercise: {
            instruction: "Create an auto-fit grid on `.auto-grid` with `display: grid`, `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))`, and `gap: 12px`.",
            starterHTML: `<div class="auto-grid">\n    <div>1</div><div>2</div><div>3</div>\n</div>`,
            starterCSS: `.auto-grid {\n    /* Add auto-fit grid rule */\n}\n.auto-grid > div {\n    background: #cbd5e1;\n    padding: 16px;\n    border-radius: 4px;\n}`,
            hints: [
            "Think about the high-level goal: Create an auto-fit grid on the requested styling with the requested styling, the requested styling, and the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `grid-template-columns`, `gap`, `background`, `padding`, `border-radius`.",
            "Implementation guidance:\n```css\n.auto-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n...\n```"
        ],
            solutionHTML: `<div class="auto-grid">\n    <div>1</div><div>2</div><div>3</div>\n</div>`,
            solutionCSS: `.auto-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 12px;\n}\n.auto-grid > div {\n    background: #cbd5e1;\n    padding: 16px;\n    border-radius: 4px;\n}`,
            solutionExplanation: "`repeat(auto-fit, minmax(...))` creates fluid auto-wrapping card grids."
        },
        takeaways: "Use `repeat(auto-fit, minmax(250px, 1fr))` for instant responsive card grids."
    },
    {
        id: "grid-placement",
        title: "34. Grid Placement & Spanning",
        category: "CSS GRID",
        difficulty: "Intermediate",
        explanation: "Grid items can span multiple columns or rows using <code>grid-column</code> and <code>grid-row</code> (e.g. <code>grid-column: span 2</code> or <code>grid-column: 1 / -1</code> to span the entire width).",
        why: "Allows creating featured hero cards, full-width headers, and multi-row sidebar layouts with ease.",
        syntax: `/* Span 2 columns */
.featured-card {
    grid-column: span 2;
}

/* Span across full grid from first line to last line */
.full-width-item {
    grid-column: 1 / -1;
}`,
        codeExample: {
            html: `<div class="layout-grid">
    <div class="item header">Header (span full width)</div>
    <div class="item sidebar">Sidebar</div>
    <div class="item main-content">Main Content (span 2 cols)</div>
    <div class="item footer">Footer (span full width)</div>
</div>`,
            css: `.layout-grid {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    gap: 12px;
}

.item {
    padding: 18px;
    border-radius: 6px;
    font-weight: bold;
}

.header {
    grid-column: 1 / -1; /* Spans all 3 columns */
    background: #1e293b;
    color: white;
}

.sidebar {
    background: #e2e8f0;
}

.main-content {
    grid-column: span 2; /* Spans remaining 2 columns */
    background: #dbeafe;
}

.footer {
    grid-column: 1 / -1;
    background: #0f172a;
    color: white;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li><code>grid-column: 1 / -1</code> starts at line 1 and ends at the final line (-1), spanning the entire grid width.</li>
<li><code>grid-column: span 2</code> stretches an item across 2 columns.</li>
</ul>`,
        exercise: {
            instruction: "Make `.featured` span 2 columns using `grid-column: span 2`.",
            starterHTML: `<div class="grid">\n    <div class="featured">Featured Card</div>\n    <div>Card 2</div>\n    <div>Card 3</div>\n</div>`,
            starterCSS: `.grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 10px;\n}\n.featured {\n    /* Add grid-column: span 2 */\n    background: #fbbf24;\n    padding: 16px;\n}\n.grid > div {\n    background: #e2e8f0;\n    padding: 16px;\n}`,
            hints: [
            "Think about the high-level goal: Make the requested styling span 2 columns using the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `grid-template-columns`, `gap`, `grid-column`, `background`, `padding`.",
            "Implementation guidance:\n```css\n.grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n...\n```"
        ],
            solutionHTML: `<div class="grid">\n    <div class="featured">Featured Card</div>\n    <div>Card 2</div>\n    <div>Card 3</div>\n</div>`,
            solutionCSS: `.grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 10px;\n}\n.featured {\n    grid-column: span 2;\n    background: #fbbf24;\n    padding: 16px;\n}\n.grid > div {\n    background: #e2e8f0;\n    padding: 16px;\n}`,
            solutionExplanation: "`grid-column: span 2;` causes an item to occupy two column tracks."
        },
        takeaways: "Use `grid-column: 1 / -1` to make headers and banners stretch across all columns."
    },

    // ═══════════════════════════════════════
    // SECTION 10 — RESPONSIVE DESIGN & MEDIA QUERIES
    // ═══════════════════════════════════════
    {
        id: "responsive-design",
        title: "35. Responsive Web Design Principles",
        category: "RESPONSIVE CSS",
        difficulty: "Beginner",
        explanation: "<strong>Responsive Web Design (RWD)</strong> ensures websites render properly across all device screens — from mobile smartphones and tablets to desktop monitors. The 3 pillars of RWD are: <strong>Fluid Grid Layouts</strong>, <strong>Flexible Images (<code>max-width: 100%</code>)</strong>, and <strong>Media Queries</strong>.",
        why: "Over 60% of all global web traffic originates on mobile phones. If a website is not responsive, it loses visitors and ranks poorly on Google search.",
        syntax: `<!-- 1. Mandatory Viewport Tag in HTML <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* 2. Responsive Image Rule in CSS */
img {
    max-width: 100%;
    height: auto;
    display: block;
}`,
        codeExample: {
            html: `<div class="responsive-hero">
    <h2>Mobile-First Design</h2>
    <p>Resize your browser window to watch the layout adapt fluidly!</p>
    <div class="stats-row">
        <div class="stat-card"><strong>60%+</strong><br>Mobile Traffic</div>
        <div class="stat-card"><strong>100%</strong><br>Fluid Layout</div>
    </div>
</div>`,
            css: `.responsive-hero {
    max-width: 700px;
    margin: 0 auto;
    padding: 24px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    text-align: center;
}

.stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
}

.stat-card {
    flex: 1 1 200px; /* Min width 200px, expands or wraps */
    background: #2563eb;
    color: white;
    padding: 18px;
    border-radius: 6px;
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>The <code>viewport</code> meta tag instructs mobile browsers to render at device width rather than zooming out like a desktop page.</li>
<li><code>max-width: 100%</code> on images and containers prevents horizontal overflow.</li>
<li><code>flex: 1 1 200px</code> creates columns that automatically wrap when the screen width drops below 200px.</li>
</ul>`,
        exercise: {
            instruction: "Make all images responsive: set `max-width: 100%` and `height: auto` on `.fluid-img`.",
            starterHTML: `<img class="fluid-img" src="https://via.placeholder.com/600x300" alt="Placeholder">`,
            starterCSS: `.fluid-img {\n    /* Add max-width and height */\n}`,
            hints: [
            "Think about the high-level goal: Make all images responsive: set the requested styling and the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `max-width`, `height`.",
            "Implementation guidance:\n```css\n.fluid-img {\n    max-width: 100%;\n    height: auto;\n...\n```"
        ],
            solutionHTML: `<img class="fluid-img" src="https://via.placeholder.com/600x300" alt="Placeholder">`,
            solutionCSS: `.fluid-img {\n    max-width: 100%;\n    height: auto;\n}`,
            solutionExplanation: "`max-width: 100%; height: auto;` scales images down proportionally without distortion."
        },
        takeaways: "Always include the viewport meta tag and make images fluid with `max-width: 100%`."
    },
    {
        id: "media-queries",
        title: "36. Media Queries",
        category: "RESPONSIVE CSS",
        difficulty: "Intermediate",
        explanation: "<strong>Media Queries</strong> allow you to apply CSS rules conditionally based on device characteristics, primarily screen width (<code>min-width</code> or <code>max-width</code>). In <strong>Mobile-First Design</strong>, you write mobile styles by default, then use <code>@media (min-width: 768px)</code> to enhance the layout for tablets and desktops.",
        why: "Media queries allow navigation menus to collapse into hamburger buttons on mobile and expand into full horizontal bars on desktop.",
        syntax: `/* Mobile-First: Base CSS is for Mobile */
.layout {
    flex-direction: column;
}

/* Tablet and Desktop Breakpoint (>= 768px) */
@media (min-width: 768px) {
    .layout {
        flex-direction: row;
    }
}

/* Large Desktop Breakpoint (>= 1024px) */
@media (min-width: 1024px) {
    .layout {
        gap: 32px;
    }
}`,
        codeExample: {
            html: `<div class="responsive-card-demo">
    <div class="demo-box">Sidebar / Menu</div>
    <div class="demo-box demo-main">Main Content Area</div>
</div>`,
            css: `.responsive-card-demo {
    display: flex;
    flex-direction: column; /* Stack vertically on mobile */
    gap: 12px;
}

.demo-box {
    background: #e2e8f0;
    padding: 16px;
    border-radius: 6px;
    font-weight: bold;
    text-align: center;
}

/* On tablets and larger screens (>= 600px), place side-by-side */
@media (min-width: 600px) {
    .responsive-card-demo {
        flex-direction: row; /* Horizontal row on desktop */
    }
    .demo-main {
        flex: 2; /* Main content is twice as wide as sidebar */
        background: #dbeafe;
    }
}`
        },
        codeExplanation: `<ul style="margin:0; padding-left:1.2rem; line-height:2">
<li>Base CSS sets <code>flex-direction: column</code> for fast, clean mobile rendering.</li>
<li><code>@media (min-width: 600px)</code> switches to <code>flex-direction: row</code> once there is ample screen space.</li>
<li>Common standard breakpoints: Mobile (<code>&lt; 768px</code>), Tablet (<code>768px - 1023px</code>), Desktop (<code>&gt;= 1024px</code>).</li>
</ul>`,
        exercise: {
            instruction: "Add a media query `@media (min-width: 768px)` that sets `flex-direction: row` on `.split-pane`.",
            starterHTML: `<div class="split-pane">\n    <div>Pane 1</div>\n    <div>Pane 2</div>\n</div>`,
            starterCSS: `.split-pane {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n/* Add media query here */`,
            hints: [
            "Think about the high-level goal: Add a media query the requested styling that sets the requested styling on the requested styling.. Consider what CSS concepts and rule blocks are required.",
            "Focus on targeting the right selector(s). In this challenge, look at the starter code and identify which classes, tags, or IDs need rules.",
            "The essential CSS properties and values you need to configure are: `display`, `flex-direction`, `gap`, `min-width`.",
            "Implementation guidance:\n```css\n.split-pane {\n    display: flex;\n    flex-direction: column;\n...\n```"
        ],
            solutionHTML: `<div class="split-pane">\n    <div>Pane 1</div>\n    <div>Pane 2</div>\n</div>`,
            solutionCSS: `.split-pane {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n@media (min-width: 768px) {\n    .split-pane {\n        flex-direction: row;\n    }\n}`,
            solutionExplanation: "Using `@media (min-width: 768px)` is the mobile-first standard for desktop enhancement."
        },
        takeaways: "Adopt mobile-first design: write default CSS for mobile, then layer desktop styles with `min-width`."
    }
);
