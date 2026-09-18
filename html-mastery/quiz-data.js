/**
 * Comprehensive Quiz Datasets for HTML & CSS Mastery
 * Includes 4 Question Types:
 * - multiple-choice
 * - true-false
 * - code-output
 * - identify-error
 *
 * All questions include rich explanations (e.g., "Correct. justify-content controls distribution along the Flexbox main axis.")
 */

window.quizEngineData = {
    // ═════════════════════════════════════════════════════════════════════
    // HTML CHECKPOINT QUIZZES
    // ═════════════════════════════════════════════════════════════════════

    'html-foundations-checkpoint': {
        title: "HTML Foundations & Text Markup Checkpoint",
        description: "Test your understanding of basic document structure, headings, formatting, links, and lists.",
        questions: [
            {
                type: 'true-false',
                question: "True or False: The `<!DOCTYPE html>` declaration is case-sensitive and must strictly be written in uppercase.",
                options: ['True', 'False'],
                correct: 1,
                explanation: "Correct. `<!DOCTYPE html>` is case-insensitive in HTML5. Writing `<!doctype html>` or `<!DOCTYPE html>` works identically in modern web browsers."
            },
            {
                type: 'code-output',
                question: "What will be rendered on the screen when this markup is processed by the browser?",
                code: "<p>Important: <mark>Sale ends tonight!</mark></p>",
                options: [
                    "The text 'Important: Sale ends tonight!' with 'Sale ends tonight!' bolded.",
                    "The text 'Important: Sale ends tonight!' with 'Sale ends tonight!' highlighted with a yellow background.",
                    "The text with 'Sale ends tonight!' struck through.",
                    "Only the text 'Important:' is displayed."
                ],
                correct: 1,
                explanation: "Correct. The `<mark>` element visually highlights text with a default yellow background color to denote relevance."
            },
            {
                type: 'identify-error',
                question: "Identify the security flaw in this external hyperlink tag:",
                code: '<a href="https://example.com" target="_blank">Visit External Site</a>',
                options: [
                    "External links opening in a new tab without `rel=\"noopener noreferrer\"` are vulnerable to reverse tab-napping attacks.",
                    "The `href` attribute must use HTTP instead of HTTPS.",
                    "Links opening in new tabs must use `type=\"external\"`.",
                    "The `<a>` element requires a closing `</a>` with an ID."
                ],
                correct: 0,
                explanation: "Correct. Always pair `target=\"_blank\"` with `rel=\"noopener noreferrer\"` to prevent external target pages from accessing your `window.opener` object."
            },
            {
                type: 'multiple-choice',
                question: "Which HTML5 tag is the most appropriate semantic element for wrapping top-level heading text on a page?",
                options: ['<h2>', '<h1>', '<header>', '<div>'],
                correct: 1,
                explanation: "Correct. `<h1>` represents the main top-level heading of a document page and is crucial for document outline hierarchy and SEO."
            }
        ]
    },

    'html-forms-media-checkpoint': {
        title: "HTML Forms, Inputs & Media Checkpoint",
        description: "Verify your knowledge of interactive form controls, label associations, validation, and media embedding.",
        questions: [
            {
                type: 'identify-error',
                question: "Identify why screen readers fail to associate the label with the input in this snippet:",
                code: '<label for="user-email">Email Address:</label>\n<input type="email" name="user-email" placeholder="you@example.com">',
                options: [
                    "The `<input>` tag is missing `id=\"user-email\"`. Labels link to inputs via `id`, not `name`.",
                    "The `placeholder` attribute overrides the label text.",
                    "Labels must wrap the input element directly without attributes.",
                    "`type=\"email\"` is an invalid HTML input type."
                ],
                correct: 0,
                explanation: "Correct. The `for` attribute of a `<label>` must match the exact `id` attribute of the target `<input>` tag."
            },
            {
                type: 'multiple-choice',
                question: "Which HTTP method should be used when submitting sensitive user credentials (such as passwords)?",
                options: ['GET', 'POST', 'PUT', 'FETCH'],
                correct: 1,
                explanation: "Correct. `POST` sends form payload data inside the HTTP request body rather than appending plain text parameters to the browser address bar URL as `GET` does."
            },
            {
                type: 'code-output',
                question: "What input control will the browser display for this element on a mobile browser?",
                code: '<input type="number" min="1" max="10">',
                options: [
                    "A standard text input box with a QWERTY keyboard layout.",
                    "A numeric keypad optimized for entering numbers within the specified range.",
                    "A color wheel selector popover.",
                    "A date picker calendar modal."
                ],
                correct: 1,
                explanation: "Correct. `type=\"number\"` triggers mobile operating systems to display numeric keypads for user input efficiency."
            },
            {
                type: 'true-false',
                question: "True or False: The `<video>` element requires the `controls` attribute for native play/pause buttons to be visible to users.",
                options: ['True', 'False'],
                correct: 0,
                explanation: "Correct. Without the boolean `controls` attribute, browsers hide default video playback UI controls (play, pause, volume, timeline)."
            }
        ]
    },

    'html-accessibility-semantics-checkpoint': {
        title: "Semantic HTML & ARIA Accessibility Checkpoint",
        description: "Test your mastery of landmark tags, screen reader attributes, and accessible ARIA design patterns.",
        questions: [
            {
                type: 'multiple-choice',
                question: "What is the recommended accessible pattern for an icon-only hyperlink wrapping a decorative SVG?",
                code: '<a href="https://x.com" aria-label="Follow us on X">\n  <svg class="icon-x" aria-hidden="true" viewBox="0 0 24 24">\n    <path d="..."/>\n  </svg>\n</a>',
                options: [
                    "Place `aria-label` on the `<a>` element and `aria-hidden=\"true\"` on the `<svg>` element.",
                    "Add `alt=\"icon\"` to the `<svg>` tag.",
                    "Wrap the SVG inside a `<label>` element without attributes.",
                    "Use `role=\"button\"` on the SVG and leave the `<a>` tag empty."
                ],
                correct: 0,
                explanation: "Correct. `aria-label` on the parent `<a>` tag provides an accessible name ('Follow us on X') for screen readers, while `aria-hidden=\"true\"` hides raw vector paths."
            },
            {
                type: 'true-false',
                question: "True or False: The First Rule of ARIA states that you should prefer native HTML elements before reaching for ARIA attributes.",
                options: ['True', 'False'],
                correct: 0,
                explanation: "Correct. Always prefer native elements like `<button>`, `<nav>`, and `<header>` before creating `<div role=\"...\">` implementations with ARIA."
            },
            {
                type: 'identify-error',
                question: "Identify the accessibility error in this button implementation:",
                code: '<div class="btn" onclick="saveData()">Save Changes</div>',
                options: [
                    "Using a `<div>` with a click handler lacks native keyboard focus, `Enter`/`Space` activation, and screen reader role identification compared to a native `<button>`.",
                    "Div tags cannot have CSS classes attached to them.",
                    "Functions called in `onclick` must begin with capital letters.",
                    "`Save Changes` text is prohibited inside divs."
                ],
                correct: 0,
                explanation: "Correct. Native `<button>` elements provide built-in tab key focus, spacebar/enter key triggering, and screen reader button semantics automatically."
            }
        ]
    },

    // ═════════════════════════════════════════════════════════════════════
    // CSS CHECKPOINT QUIZZES
    // ═════════════════════════════════════════════════════════════════════

    'css-foundations-checkpoint': {
        title: "CSS Foundations & Selectors Checkpoint",
        description: "Assess your knowledge of CSS syntax, specificity rules, color models, and font units.",
        questions: [
            {
                type: 'multiple-choice',
                question: "Which CSS property controls the distribution and alignment of flex items along the main axis?",
                options: ['align-items', 'justify-content', 'align-content', 'flex-direction'],
                correct: 1,
                explanation: "Correct. `justify-content` controls distribution along the Flexbox main axis, whereas `align-items` controls cross-axis alignment."
            },
            {
                type: 'code-output',
                question: "Predict which color the paragraph text will display given these CSS specificity rules:",
                code: `/* CSS */\np.text { color: red; }\n#main { color: blue; }\n\n<!-- HTML -->\n<p id="main" class="text">Sample Text</p>`,
                options: ['Red', 'Blue', 'Black (default browser text)', 'Transparent'],
                correct: 1,
                explanation: "Correct. ID selectors (`#main`, specificity 1-0-0) have higher specificity than class + element selectors (`p.text`, specificity 0-1-1), so the text displays blue."
            },
            {
                type: 'true-false',
                question: "True or False: The `rem` font unit is relative to the font-size of the root `<html>` element.",
                options: ['True', 'False'],
                correct: 0,
                explanation: "Correct. `rem` stands for Root EM and scales relative to the root `<html>` element's font-size (typically 16px by default)."
            }
        ]
    },

    'css-box-model-layout-checkpoint': {
        title: "CSS Box Model & Layout Checkpoint",
        description: "Test your understanding of margin collapse, padding, box-sizing, positioning, and display types.",
        questions: [
            {
                type: 'identify-error',
                question: "Identify why an element with `width: 300px; padding: 20px; border: 5px solid black;` occupies 350px total layout space:",
                code: '.card {\n    width: 300px;\n    padding: 20px;\n    border: 5px solid black;\n}',
                options: [
                    "By default, `box-sizing` is `content-box`, adding padding and border on top of width. Use `box-sizing: border-box;` to include padding and border inside width.",
                    "Width applies only to child elements.",
                    "Borders double their thickness automatically on desktop viewports.",
                    "Padding can only be specified in percentages."
                ],
                correct: 0,
                explanation: "Correct. `box-sizing: border-box;` forces the browser to include padding and border within the specified element width."
            },
            {
                type: 'code-output',
                question: "What positioning context will an element with `position: absolute;` align itself to?",
                options: [
                    "Always relative to the viewport window.",
                    "Relative to its closest ancestor element that has a `position` value other than `static`.",
                    "Relative to its next sibling element.",
                    "Absolute positioning removes the element completely from rendering."
                ],
                correct: 1,
                explanation: "Correct. `position: absolute` positions an element relative to its nearest positioned ancestor (`relative`, `absolute`, `fixed`, or `sticky`)."
            },
            {
                type: 'multiple-choice',
                question: "Which `display` property value places elements side-by-side while still respecting width and height dimensions?",
                options: ['inline', 'block', 'inline-block', 'none'],
                correct: 2,
                explanation: "Correct. `inline-block` flows inline with surrounding content like text, but allows explicit `width`, `height`, `margin`, and `padding` styling."
            }
        ]
    },

    'css-flexbox-grid-checkpoint': {
        title: "CSS Flexbox & Grid Checkpoint",
        description: "Test your mastery of modern responsive layout systems.",
        questions: [
            {
                type: 'code-output',
                question: "Predict the layout order of flex items when using this property:",
                code: '.flex-container {\n    display: flex;\n    flex-direction: column-reverse;\n}',
                options: [
                    "Items are laid out horizontally from right to left.",
                    "Items are stacked vertically with the last item in DOM source code placed at the top.",
                    "Items are arranged in a 2D matrix.",
                    "Items disappear from layout."
                ],
                correct: 1,
                explanation: "Correct. `flex-direction: column-reverse` stacks flex items vertically in reverse DOM source order."
            },
            {
                type: 'multiple-choice',
                question: "Which CSS Grid property creates responsive equal-width columns that automatically fit the container size?",
                code: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
                options: [
                    "`repeat(auto-fit, minmax(250px, 1fr))`",
                    "`grid-auto-flow: dense`",
                    "`flex-wrap: wrap`",
                    "`column-count: 3`"
                ],
                correct: 0,
                explanation: "Correct. Combining `repeat(auto-fit, minmax(min, max))` creates a fully fluid responsive grid without requiring media queries!"
            },
            {
                type: 'true-false',
                question: "True or False: Flexbox is primarily designed for 1-dimensional layouts (rows OR columns), whereas CSS Grid is designed for 2-dimensional layouts (rows AND columns).",
                options: ['True', 'False'],
                correct: 0,
                explanation: "Correct. Use Flexbox for linear components (navbars, item lists) and CSS Grid for complex 2D page layouts."
            }
        ]
    }
};
