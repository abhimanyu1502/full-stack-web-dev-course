const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('   TEST SUITE: HTML & CSS MASTERY FULLSTACK PLATFORM  ');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  [PASS] ${testName}`);
    } else {
        failedTests++;
        const msg = `  [FAIL] ${testName}${details ? ' - ' + details : ''}`;
        console.error(msg);
        failures.push(msg);
    }
}

// ----------------------------------------------------
// 1. ROUTE & HTML INTEGRITY
// ----------------------------------------------------
console.log('\n--- 1. Verifying All HTML Routes & Links ---');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
assert(htmlFiles.length >= 45, `HTML files count (${htmlFiles.length}) >= 45`);

htmlFiles.forEach(file => {
    const src = fs.readFileSync(file, 'utf8');
    
    // Check basic HTML5 structure
    const hasDoctype = /<!DOCTYPE html>/i.test(src);
    const hasLang = /<html[^>]*lang=["']en["']/i.test(src);
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(src);
    const hasTitle = /<title>[^<]+<\/title>/i.test(src);
    const hasMain = /<main[^>]*id=["']main-content["']/i.test(src);
    
    assert(hasDoctype && hasLang && hasViewport && hasTitle && hasMain, 
        `HTML Document valid: ${file}`, 
        `doctype:${hasDoctype}, lang:${hasLang}, viewport:${hasViewport}, title:${hasTitle}, main:${hasMain}`);
    
    // Check iframes are properly sandboxed if any
    const iframes = src.match(/<iframe[^>]*>/gi) || [];
    iframes.forEach(iframe => {
        const isSandboxed = /sandbox=/i.test(iframe);
        const hasTitleAttr = /title=/i.test(iframe);
        assert(isSandboxed && hasTitleAttr, `Iframe sandboxed in ${file}`, iframe);
    });
});

// ----------------------------------------------------
// 2. NAVIGATION & PROGRESS ROUTING
// ----------------------------------------------------
console.log('\n--- 2. Verifying Topic Routing & Navigation ---');
const progressSrc = fs.readFileSync('progress.js', 'utf8');

const mockStorage = {};
const mockLocalStorage = {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; },
    clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); },
    key: (i) => Object.keys(mockStorage)[i] || null,
    get length() { return Object.keys(mockStorage).length; }
};

const mockWindow = {
    localStorage: mockLocalStorage,
    location: { pathname: '/introduction.html', search: '', href: 'http://localhost/introduction.html' },
    document: {
        addEventListener: () => {},
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, style: {} }),
        body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} } },
        head: { appendChild: () => {} },
        documentElement: { getAttribute: () => 'light', setAttribute: () => {} }
    },
    addEventListener: () => {},
    CustomEvent: class CustomEvent { constructor(name, d) { this.name = name; this.detail = d; } },
    dispatchEvent: () => {}
};

const context = vm.createContext({
    window: mockWindow,
    document: mockWindow.document,
    localStorage: mockLocalStorage,
    location: mockWindow.location,
    console: { log: () => {}, warn: () => {}, error: () => {} },
    CustomEvent: mockWindow.CustomEvent,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout
});

vm.runInContext(progressSrc, context);
const ps = context.window.progressSystem;

assert(!!ps, 'progressSystem initializes cleanly');
assert(Array.isArray(ps.htmlTopics) && ps.htmlTopics.length === 47, `HTML Topics registered in progress.js (Found ${ps.htmlTopics?.length})`);

// Verify every topic route exists
ps.htmlTopics.forEach(t => {
    const exists = fs.existsSync(t.url);
    assert(exists, `Topic file exists: ${t.url} (${t.title})`);
});

// Test progress calculation and XP
ps.visitLesson('introduction', '1. Introduction to HTML', 'html', 'introduction.html');
assert(ps.data.completedLessons.includes('introduction'), 'Progress marks lesson complete via visitLesson');
assert(ps.data.xp >= 25, `XP awarded correctly (${ps.data.xp} XP)`);

// Test Bookmark toggle
const added = ps.toggleBookmark('introduction', 'Introduction to HTML', 'introduction.html');
assert(added && ps.isBookmarked('introduction'), 'Bookmark added successfully');
ps.toggleBookmark('introduction', 'Introduction to HTML', 'introduction.html');
assert(!ps.isBookmarked('introduction'), 'Bookmark removed on toggle');

// Test Save Code
ps.saveCode('test-ex-1', '<h1>Hello World</h1>');
assert(ps.data.savedCode['test-ex-1'] === '<h1>Hello World</h1>', 'Code snippet saved correctly in progress state');

const htmlProgress = ps.getHTMLProgress();
assert(htmlProgress.completed === 1 && htmlProgress.total === ps.htmlTopics.length, `HTML progress accurately calculated: ${htmlProgress.completed}/${htmlProgress.total}`);

// ----------------------------------------------------
// 3. CSS LESSON DATA & PLAYGROUNDS
// ----------------------------------------------------
console.log('\n--- 3. Verifying CSS Lesson Modules & Playgrounds ---');
const cssFiles = ['css-data-1.js', 'css-data-2.js', 'css-data-3.js', 'css-data-4.js'];
let allCssLessons = [];

cssFiles.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const ctx = vm.createContext({ window: { cssLessons: allCssLessons } });
    vm.runInContext(code, ctx);
    allCssLessons = ctx.window.cssLessons;
});

assert(allCssLessons.length === 49, `Total 49 CSS Lessons defined across bundles (Found ${allCssLessons.length})`);

// Verify CSS lesson schemas
let invalidCssLessons = 0;
allCssLessons.forEach(l => {
    if (!l.id || !l.title || !l.category || !l.explanation || !l.codeExample) {
        invalidCssLessons++;
    }
});
assert(invalidCssLessons === 0, 'All 49 CSS lessons have valid title, category, explanation, and codeExample');

// Check Playgrounds file
const pgHtml = fs.readFileSync('playgrounds.html', 'utf8');
const pgJs = fs.readFileSync('playgrounds.js', 'utf8');
assert(pgHtml.includes('Box Model') && pgHtml.includes('Flexbox') && pgHtml.includes('Grid') && pgHtml.includes('Position'), 'playgrounds.html contains all 4 playground sections');
assert(pgJs.includes('renderBoxModel') && pgJs.includes('renderFlexbox') && pgJs.includes('renderGrid') && pgJs.includes('renderPosition'), 'playgrounds.js contains render functions for all 4 playgrounds');

// ----------------------------------------------------
// 4. QUIZZES, EXERCISES & CODE EDITOR
// ----------------------------------------------------
console.log('\n--- 4. Verifying Quiz Engine, Exercise System & Code Editor ---');
const quizDataCode = fs.readFileSync('quiz-data.js', 'utf8');
const quizCtx = vm.createContext({ window: {}, localStorage: mockLocalStorage, document: mockWindow.document });
vm.runInContext(quizDataCode, quizCtx);
const quizzes = quizCtx.window.quizEngineData;

assert(typeof quizzes === 'object' && Object.keys(quizzes).length >= 5, `Quiz engine data loaded with ${Object.keys(quizzes || {}).length} checkpoints`);

// Verify JS Syntax for critical components
['editor.js', 'script.js', 'css-app.js', 'project-system.js'].forEach(file => {
    try {
        const src = fs.readFileSync(file, 'utf8');
        new Function(src);
        assert(true, `Syntax valid: ${file}`);
    } catch (e) {
        assert(false, `Syntax valid: ${file}`, e.message);
    }
});

// ----------------------------------------------------
// 5. STYLESHEET REGRESSION & RESPONSIVE BREAKPOINTS
// ----------------------------------------------------
console.log('\n--- 5. Verifying Stylesheet Rules & Responsive Breakpoints ---');
const cssContent = fs.readFileSync('styles.css', 'utf8');

assert(cssContent.includes('--bg-color:') && cssContent.includes('--text-primary:'), 'CSS custom property tokens defined');
assert(cssContent.includes('[data-theme="dark"]'), 'Dark mode tokens defined');
assert(cssContent.includes('@media (max-width: 768px)'), 'Mobile (768px) responsive rules defined');
assert(cssContent.includes('@media (max-width: 480px)') || cssContent.includes('@media (max-width: 640px)'), 'Small screen responsive rules defined');
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'Accessible reduced motion rules defined');
assert(cssContent.includes('scroll-behavior: smooth;'), 'Smooth scrolling enabled');

// ----------------------------------------------------
// 6. DASHBOARD & LOCAL PROGRESS ARCHITECTURE
// ----------------------------------------------------
console.log('\n--- 6. Verifying Learning Dashboard & Static Architecture ---');
const dashHtml = fs.readFileSync('dashboard.html', 'utf8');
const dashJs = fs.readFileSync('dashboard.js', 'utf8');

assert(dashHtml.includes('db-greeting') && dashHtml.includes('hero-streak') && dashHtml.includes('hero-xp'), 'Dashboard HTML contains hero stats and greeting elements');
assert(dashHtml.includes('db-goal-text') && dashHtml.includes('db-challenge-card'), 'Dashboard HTML contains goal and daily challenge widgets');
assert(!dashHtml.includes('cloud-sync.js'), 'Dashboard HTML is clean with no cloud-sync server dependencies');
assert(dashJs.includes('safeGet') && dashJs.includes('safeSet'), 'Dashboard JS uses safe storage wrappers');

// ----------------------------------------------------
// 7. INTERACTIVE CODE EDITOR COMPATIBILITY
// ----------------------------------------------------
console.log('\n--- 7. Verifying Responsive Code Editor Component ---');
try {
    const editorContent = fs.readFileSync('editor.js', 'utf8');
    assert(editorContent.includes('class InteractiveCodeEditor'), 'InteractiveCodeEditor class defined');
    assert(editorContent.includes('editor-mobile-tabs'), 'Mobile tabs switcher included in editor');
    assert(editorContent.includes('executeCode'), 'Live execution method defined');
    assert(editorContent.includes('saveCodeLocally'), 'Local persistence defined');
} catch (err) {
    assert(false, 'Interactive Code Editor tests', err.message);
}

// ----------------------------------------------------
// FINAL REGRESSION SUMMARY
// ----------------------------------------------------
console.log('\n====================================================');
console.log(`REGRESSION RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} checks`);
console.log('====================================================\n');

if (failedTests === 0) {
    console.log('>>> OVERALL REGRESSION STATUS: PASS <<<');
    process.exit(0);
} else {
    console.error('>>> OVERALL REGRESSION STATUS: FAIL <<<');
    process.exit(1);
}
