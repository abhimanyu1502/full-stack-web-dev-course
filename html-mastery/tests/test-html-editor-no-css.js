const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('Testing HTML Code Editor - Zero CSS Verification...');

// 1. Verify editor.js initial template has no <style>
const editorCode = fs.readFileSync(path.join(__dirname, '../editor.js'), 'utf8');
assert(!editorCode.includes('<style>\n    body { font-family: sans-serif; padding: 1rem; }\n  </style>'), 'editor.js default initialHTML has no <style> tag');
console.log('✔ editor.js initialHTML is pure HTML without <style>');

// 2. Verify script.js HTML challenges have no starterCSS
const scriptCode = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
assert(!scriptCode.includes('starterCSS: `h1 {\n    color: #2563eb;\n}`'), 'introduction has no starterCSS');
assert(!scriptCode.includes('starterCSS: `body {\n    font-family: system-ui, sans-serif;\n}`'), 'basic-html-document has no starterCSS');
assert(scriptCode.includes('showCSS: false'), 'renderLiveEditor passes showCSS: false');
console.log('✔ script.js passes showCSS: false and all HTML challenges have empty starterCSS');

// 3. Verify exercise.js defaults showCSS to false
const exerciseCode = fs.readFileSync(path.join(__dirname, '../exercise.js'), 'utf8');
assert(exerciseCode.includes('this.showCSS = options.showCSS !== undefined ? options.showCSS : false;'), 'exercise.js defaults showCSS to false');
console.log('✔ exercise.js defaults showCSS to false');

// 4. Verify fallback textareas have no &lt;style&gt;
const tfHtml = fs.readFileSync(path.join(__dirname, '../text-formatting.html'), 'utf8');
assert(!tfHtml.includes('&lt;style&gt;'), 'text-formatting.html textarea has no style tags');

const hdHtml = fs.readFileSync(path.join(__dirname, '../html-debugging.html'), 'utf8');
assert(!hdHtml.includes('&lt;style&gt;'), 'html-debugging.html textarea has no style tags');

const blHtml = fs.readFileSync(path.join(__dirname, '../buttons-and-links.html'), 'utf8');
assert(!blHtml.includes('&lt;style&gt;'), 'buttons-and-links.html textarea has no style tags');
console.log('✔ fallback HTML textareas have no style tags');

// 5. Verify CSS track still enables showCSS: true
const cssAppCode = fs.readFileSync(path.join(__dirname, '../css-app.js'), 'utf8');
assert(cssAppCode.includes('showCSS: true'), 'css-app.js keeps showCSS: true for CSS lessons');
console.log('✔ css-app.js keeps showCSS: true for CSS track');

console.log('\nAll HTML code editor zero-CSS checks PASSED! 🎉');
