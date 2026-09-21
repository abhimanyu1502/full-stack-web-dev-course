/**
 * Tag Placement Dictionary
 * Maps every lesson/topic to whether the featured tags belong inside the <head> tag or under the <body> tag.
 */
const TAG_PLACEMENT_DATA = {
    'introduction': {
        type: 'both',
        badge: 'Structure: <head> & <body>',
        tag: '<head> vs <body>',
        text: 'In HTML documents, tags are divided into two primary zones: <code>&lt;head&gt;</code> tags (e.g. <code>&lt;title&gt;</code>, <code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code>) configure invisible metadata, while <code>&lt;body&gt;</code> tags (e.g. <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;div&gt;</code>) contain all visible content rendered to the user.'
    },
    'basic-html-document': {
        type: 'both',
        badge: 'Document Skeleton: <head> & <body>',
        tag: '<head> & <body>',
        text: 'The <code>&lt;head&gt;</code> tag holds machine-readable setup and metadata (title, scripts, styles), while the <code>&lt;body&gt;</code> tag holds all visual, interactive content displayed in the browser window.'
    },
    'html-elements': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<body> Elements',
        text: 'Visual HTML elements (such as paragraphs, buttons, containers, and headings) belong strictly inside the <code>&lt;body&gt;</code> tag. In contrast, document configuration tags belong in <code>&lt;head&gt;</code>.'
    },
    'attributes': {
        type: 'both',
        badge: 'Used on <head> & <body> tags',
        tag: 'Attributes',
        text: 'Attributes are added to both zones: <code>&lt;head&gt;</code> tags use attributes like <code>charset</code>, <code>name</code>, and <code>rel</code>, while <code>&lt;body&gt;</code> tags use attributes like <code>id</code>, <code>class</code>, <code>src</code>, <code>href</code>, and <code>alt</code>.'
    },
    'headings': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<h1> to <h6>',
        text: 'Heading tags (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>) must always be placed inside the <code>&lt;body&gt;</code> tag. They define visible section headings for users and screen readers (never place headings in the <code>&lt;head&gt;</code> tag).'
    },
    'paragraphs-and-basic-text': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<p>, <br>, <hr>',
        text: 'Paragraph (<code>&lt;p&gt;</code>), line break (<code>&lt;br&gt;</code>), and thematic break (<code>&lt;hr&gt;</code>) tags are visible text elements that belong strictly under the <code>&lt;body&gt;</code> tag.'
    },
    'text-formatting': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<strong>, <em>, <b>, <i>',
        text: 'Inline text-formatting tags (<code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;mark&gt;</code>, <code>&lt;del&gt;</code>, <code>&lt;ins&gt;</code>, <code>&lt;small&gt;</code>) are used inside the <code>&lt;body&gt;</code> tag to format visible prose.'
    },
    'links': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<a> Hyperlink',
        text: 'The <code>&lt;a&gt;</code> (anchor) tag is used inside the <code>&lt;body&gt;</code> tag to create clickable links. Do not confuse <code>&lt;a&gt;</code> with <code>&lt;link&gt;</code> (which is used in <code>&lt;head&gt;</code> to link external CSS files).'
    },
    'buttons-and-links': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<button> & <a>',
        text: 'Both <code>&lt;button&gt;</code> and <code>&lt;a&gt;</code> tags belong under the <code>&lt;body&gt;</code> tag as visible, clickable interactive controls.'
    },
    'images': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<img> Graphic',
        text: 'The <code>&lt;img&gt;</code> tag is placed inside the <code>&lt;body&gt;</code> tag to display visible pictures and illustrations on the page canvas.'
    },
    'lists': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<ul>, <ol>, <li>',
        text: 'List container tags (<code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;dl&gt;</code>) and item tags (<code>&lt;li&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>) belong strictly inside the <code>&lt;body&gt;</code> tag.'
    },
    'div-span': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<div> & <span>',
        text: 'Generic container tags (block-level <code>&lt;div&gt;</code> and inline <code>&lt;span&gt;</code>) are used inside the <code>&lt;body&gt;</code> tag to group and structure visible elements.'
    },
    'semantic-html': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<header>, <nav>, <main>, <footer>',
        text: 'Semantic landmark tags (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>) belong inside the <code>&lt;body&gt;</code> tag. Note that the visual <code>&lt;header&gt;</code> tag is inside <code>&lt;body&gt;</code> and is completely different from the document <code>&lt;head&gt;</code> tag.'
    },
    'tables': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<table>, <tr>, <td>',
        text: 'Tabular data tags (<code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>) are used under the <code>&lt;body&gt;</code> tag to display data grids.'
    },
    'forms': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<form>',
        text: 'The <code>&lt;form&gt;</code> tag belongs inside the <code>&lt;body&gt;</code> tag to wrap and submit interactive user inputs.'
    },
    'input-types': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<input>',
        text: 'The <code>&lt;input&gt;</code> tag is used under the <code>&lt;body&gt;</code> tag (usually nested within a <code>&lt;form&gt;</code>) to accept text, checkboxes, radios, dates, and passwords.'
    },
    'textarea': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<textarea>',
        text: 'The <code>&lt;textarea&gt;</code> element is used inside the <code>&lt;body&gt;</code> tag to allow multiline user text input.'
    },
    'select-and-dropdown': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<select> & <option>',
        text: 'Dropdown tags (<code>&lt;select&gt;</code>, <code>&lt;option&gt;</code>, <code>&lt;optgroup&gt;</code>) belong inside the <code>&lt;body&gt;</code> tag as visible user input controls.'
    },
    'form-validation': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: 'Validation Attributes',
        text: 'Form validation attributes (such as <code>required</code>, <code>pattern</code>, <code>minlength</code>, <code>max</code>) are placed on interactive tags inside the <code>&lt;body&gt;</code> tag.'
    },
    'get-post': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<form method="...">',
        text: 'The <code>method="GET"</code> and <code>method="POST"</code> attributes are applied to <code>&lt;form&gt;</code> tags located inside the <code>&lt;body&gt;</code> tag.'
    },
    'audio-and-video': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<audio> & <video>',
        text: 'Media playback tags (<code>&lt;audio&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;source&gt;</code>, <code>&lt;track&gt;</code>) belong inside the <code>&lt;body&gt;</code> tag to embed visual and sound players.'
    },
    'iframe': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<iframe>',
        text: 'The <code>&lt;iframe&gt;</code> tag is placed inside the <code>&lt;body&gt;</code> tag to embed another webpage or video player directly within your layout.'
    },
    'figure-and-figcaption': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<figure> & <figcaption>',
        text: 'Self-contained media wrapping tags (<code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code>) belong under the <code>&lt;body&gt;</code> tag to annotate images, diagrams, or code snippets.'
    },
    'head-section-and-metadata': {
        type: 'head',
        badge: 'Used inside <head> tag',
        tag: '<meta>, <title>, <link>',
        text: 'All metadata tags (<code>&lt;title&gt;</code>, <code>&lt;meta charset&gt;</code>, <code>&lt;meta name="viewport"&gt;</code>, <code>&lt;link rel="icon"&gt;</code>, <code>&lt;base&gt;</code>) must be placed inside the <code>&lt;head&gt;</code> tag. They do not render visible content on the webpage canvas.'
    },
    'open-graph': {
        type: 'head',
        badge: 'Used inside <head> tag',
        tag: '<meta property="og:*">',
        text: 'Open Graph protocol tags (<code>&lt;meta property="og:title"&gt;</code>, <code>&lt;meta property="og:image"&gt;</code>, <code>&lt;meta property="og:description"&gt;</code>) belong strictly inside the <code>&lt;head&gt;</code> tag for social media crawlers.'
    },
    'css-and-javascript-integration': {
        type: 'both',
        badge: 'Used in <head> & <body>',
        tag: '<link>, <style>, <script>',
        text: 'Stylesheets (<code>&lt;link rel="stylesheet"&gt;</code> and <code>&lt;style&gt;</code>) are placed inside the <code>&lt;head&gt;</code> tag. JavaScript (<code>&lt;script&gt;</code>) can be placed in <code>&lt;head&gt;</code> (with <code>defer</code>) or at the end of the <code>&lt;body&gt;</code> tag.'
    },
    'id-class-and-data': {
        type: 'body',
        badge: 'Used on <body> tags',
        tag: 'id, class, data-*',
        text: 'Identification attributes (<code>id</code>, <code>class</code>, and <code>data-*</code> attributes) are most commonly applied to elements inside the <code>&lt;body&gt;</code> tag for styling and JavaScript manipulation.'
    },
    'accessibility': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: 'Accessibility Elements',
        text: 'Accessibility features (such as <code>alt</code> text, landmark tags, form labels, and focusable buttons) are implemented on elements inside the <code>&lt;body&gt;</code> tag.'
    },
    'aria': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: 'role="..." & aria-*',
        text: 'ARIA roles (<code>role="dialog"</code>, <code>role="alert"</code>) and ARIA states (<code>aria-expanded</code>, <code>aria-hidden</code>) are applied directly to interactive tags inside the <code>&lt;body&gt;</code> tag.'
    },
    'responsive-images': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<img srcset="...">',
        text: 'The <code>srcset</code> and <code>sizes</code> attributes are placed on <code>&lt;img&gt;</code> tags located inside the <code>&lt;body&gt;</code> tag for responsive display.'
    },
    'picture': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<picture> & <source>',
        text: 'The <code>&lt;picture&gt;</code> element and its nested <code>&lt;source&gt;</code> tags belong under the <code>&lt;body&gt;</code> tag to deliver art-directed responsive imagery.'
    },
    'lazy-loading': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: 'loading="lazy"',
        text: 'The <code>loading="lazy"</code> attribute belongs on <code>&lt;img&gt;</code> and <code>&lt;iframe&gt;</code> elements inside the <code>&lt;body&gt;</code> tag to defer offscreen asset downloads.'
    },
    'html-entities': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '&copy;, &lt;, &gt;',
        text: 'HTML special character entities (like <code>&amp;copy;</code>, <code>&amp;amp;</code>, <code>&amp;quot;</code>) are used inside textual content under the <code>&lt;body&gt;</code> tag (and inside <code>&lt;title&gt;</code> in <code>&lt;head&gt;</code>).'
    },
    'global-attributes': {
        type: 'body',
        badge: 'Used on <body> tags',
        tag: 'title, hidden, tabindex',
        text: 'Global attributes (like <code>title</code>, <code>tabindex</code>, <code>hidden</code>, <code>contenteditable</code>) can appear on almost any element, predominantly on visible tags in the <code>&lt;body&gt;</code> tag.'
    },
    'details-and-summary': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<details> & <summary>',
        text: 'The disclosure widget tags (<code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code>) belong inside the <code>&lt;body&gt;</code> tag to provide native interactive accordion toggles without JavaScript.'
    },
    'dialog': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<dialog>',
        text: 'The native modal popup element (<code>&lt;dialog&gt;</code>) belongs inside the <code>&lt;body&gt;</code> tag, opened via JavaScript using <code>dialog.showModal()</code>.'
    },
    'template': {
        type: 'both',
        badge: 'Used in <body> or <head>',
        tag: '<template>',
        text: 'The inert content fragment tag (<code>&lt;template&gt;</code>) can be placed inside the <code>&lt;body&gt;</code> or <code>&lt;head&gt;</code> tag. Its contents remain completely hidden until cloned with JavaScript.'
    },
    'svg': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<svg>, <circle>, <path>',
        text: 'Inline vector graphics (<code>&lt;svg&gt;</code>, <code>&lt;path&gt;</code>, <code>&lt;rect&gt;</code>, <code>&lt;circle&gt;</code>) belong inside the <code>&lt;body&gt;</code> tag to render scalable artwork directly in the document layout.'
    },
    'canvas': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<canvas>',
        text: 'The <code>&lt;canvas&gt;</code> element is a scriptable drawing surface placed inside the <code>&lt;body&gt;</code> tag, manipulated using JavaScript 2D or WebGL contexts.'
    },
    'web-components': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: '<custom-element>',
        text: 'Custom web component tags are placed in the <code>&lt;body&gt;</code> tag to instantiate custom HTML elements defined via <code>customElements.define()</code>.'
    },
    'shadow-dom': {
        type: 'body',
        badge: 'Used under <body> tag',
        tag: 'Shadow Root',
        text: 'Shadow roots are attached to DOM elements inside the <code>&lt;body&gt;</code> tag via <code>element.attachShadow({ mode: "open" })</code> to encapsulate styles and markup.'
    },
    'script-loading': {
        type: 'both',
        badge: 'Used in <head> or <body>',
        tag: '<script defer/async>',
        text: 'The <code>&lt;script&gt;</code> tag can be placed in the <code>&lt;head&gt;</code> tag (using <code>defer</code> or <code>async</code> to avoid blocking document parsing) OR placed right before the closing <code>&lt;/body&gt;</code> tag.'
    },
    'dom': {
        type: 'both',
        badge: 'DOM Tree: <head> & <body>',
        tag: 'document.head & body',
        text: 'In the DOM tree, <code>document.head</code> references all metadata and stylesheet nodes in the <code>&lt;head&gt;</code>, while <code>document.body</code> references all visual nodes in the <code>&lt;body&gt;</code>.'
    },
    'http-and-html': {
        type: 'head',
        badge: 'Associated with <head> tag',
        tag: '<meta http-equiv="...">',
        text: 'HTTP response headers coordinate directly with <code>&lt;head&gt;</code> metadata tags (like <code>&lt;meta http-equiv="Content-Type"&gt;</code> and caching headers) before the <code>&lt;body&gt;</code> is processed.'
    },
    'browser-rendering': {
        type: 'both',
        badge: 'Pipeline: <head> then <body>',
        tag: 'Rendering Pipeline',
        text: 'The browser parser first evaluates the <code>&lt;head&gt;</code> tag to assemble the CSSOM (from stylesheets) and page title, and then streams the <code>&lt;body&gt;</code> tag to construct the visible layout tree and paint layers.'
    },
    'seo': {
        type: 'both',
        badge: 'SEO: <head> metadata + <body> headings',
        tag: '<title>, <meta> & <h1>',
        text: 'Search engine optimization relies heavily on <code>&lt;head&gt;</code> tags (<code>&lt;title&gt;</code>, <code>&lt;meta name="description"&gt;</code>, <code>&lt;link rel="canonical"&gt;</code>) combined with semantic <code>&lt;body&gt;</code> tags (headings and alt text).'
    },
    'security-basics': {
        type: 'both',
        badge: 'Security: <head> policy + <body> attributes',
        tag: 'CSP & rel="noopener"',
        text: 'Web security policies like CSP (<code>&lt;meta http-equiv="Content-Security-Policy"&gt;</code>) are placed in the <code>&lt;head&gt;</code> tag, while link security (<code>rel="noopener noreferrer"</code>) is applied to <code>&lt;a&gt;</code> tags in the <code>&lt;body&gt;</code> tag.'
    },
    'html-debugging': {
        type: 'both',
        badge: 'DevTools: <head> & <body> inspection',
        tag: 'Inspector Elements',
        text: 'Browser DevTools Elements tab reveals both the invisible configurations in the <code>&lt;head&gt;</code> tag and the rendered layout nodes in the <code>&lt;body&gt;</code> tag.'
    },
    'professional-html-checklist': {
        type: 'both',
        badge: 'Checklist: <head> & <body> audits',
        tag: 'Audit Rules',
        text: 'A production HTML audit requires validating essential <code>&lt;head&gt;</code> tags (viewport, charset, title, favicon) and clean, accessible <code>&lt;body&gt;</code> structure (single h1, semantic tags, alt text).'
    },
    'practice-project': {
        type: 'both',
        badge: 'Project: Complete <head> & <body>',
        tag: '<!DOCTYPE html>',
        text: 'Your practice project includes assembling a complete valid HTML document with both the metadata <code>&lt;head&gt;</code> tag and the rich semantic <code>&lt;body&gt;</code> tag.'
    },
    'practice-answer': {
        type: 'both',
        badge: 'Solution: Full <head> & <body>',
        tag: 'Standard Boilerplate',
        text: 'The model solution illustrates clean separation between configuration tags in the <code>&lt;head&gt;</code> and content tags inside the <code>&lt;body&gt;</code>.'
    },
    'questions-and-answers': {
        type: 'both',
        badge: 'Interview Q&A: <head> vs <body>',
        tag: '<head> vs <body> FAQs',
        text: 'A classic technical interview question: "What belongs in &lt;head&gt; vs &lt;body&gt;?" The <code>&lt;head&gt;</code> holds document settings and stylesheets, whereas the <code>&lt;body&gt;</code> holds all visible content.'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TAG_PLACEMENT_DATA;
}
if (typeof window !== 'undefined') {
    window.TAG_PLACEMENT_DATA = TAG_PLACEMENT_DATA;
}
