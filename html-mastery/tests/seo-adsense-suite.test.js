const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let passed = 0;
let failed = 0;
const failures = [];

function test(description, condition, details = '') {
    if (condition) {
        passed++;
        console.log(`  [PASS] ${description}`);
    } else {
        failed++;
        const msg = `  [FAIL] ${description} ${details ? '(' + details + ')' : ''}`;
        console.error(msg);
        failures.push(msg);
    }
}

console.log('\n======================================================');
console.log('--- 1. Technical & On-Page SEO Suite Verification ---');
console.log('======================================================');

const titlesSet = new Set();
const descsSet = new Set();

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Title
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    test(`${file} has non-empty title`, !!title && title.length > 5, title);
    if (title && file !== '200.html') {
        test(`${file} title is unique`, !titlesSet.has(title), `Duplicate: ${title}`);
        titlesSet.add(title);
    }

    // 2. Meta description
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1].trim() : null;
    test(`${file} has meta description`, !!desc && desc.length > 20, desc);
    if (desc && file !== '200.html') {
        test(`${file} description is unique`, !descsSet.has(desc), `Duplicate desc in ${file}`);
        descsSet.add(desc);
    }

    // 3. Canonical & Robots
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);

    if (file === '404.html' || file === '200.html') {
        test(`${file} has noindex robots directive`, robotsMatch && robotsMatch[1].includes('noindex'));
    } else {
        test(`${file} has canonical URL`, !!canonicalMatch && canonicalMatch[1].startsWith('https://webmastery.in/'), canonicalMatch ? canonicalMatch[1] : 'none');
        test(`${file} has index, follow robots directive`, robotsMatch && robotsMatch[1].includes('index'));
    }

    // 4. Open Graph & Twitter Cards
    if (file !== '404.html' && file !== '200.html') {
        const ogTitle = content.match(/<meta\s+property=["']og:title["']/i);
        const ogDesc = content.match(/<meta\s+property=["']og:description["']/i);
        const ogUrl = content.match(/<meta\s+property=["']og:url["']/i);
        const twitterCard = content.match(/<meta\s+name=["']twitter:card["']/i);

        test(`${file} has Open Graph meta tags`, !!(ogTitle && ogDesc && ogUrl));
        test(`${file} has Twitter Card metadata`, !!twitterCard);
    }

    // 5. Headings (Single H1)
    const h1Matches = Array.from(content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi));
    test(`${file} has exactly one H1`, h1Matches.length === 1, `Found ${h1Matches.length} H1 tags`);

    // 6. JSON-LD structured data
    const jsonLdMatches = Array.from(content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi));
    if (file !== '404.html' && file !== '200.html') {
        test(`${file} has structured data (JSON-LD)`, jsonLdMatches.length >= 1, `Count: ${jsonLdMatches.length}`);
        jsonLdMatches.forEach((m, idx) => {
            let valid = false;
            try {
                const parsed = JSON.parse(m[1].trim());
                valid = !!parsed['@context'];
            } catch (_) {}
            test(`${file} JSON-LD block #${idx + 1} is valid schema.org`, valid);
        });
    }
});

console.log('\n======================================================');
console.log('--- 2. Infrastructure & AdSense Readiness Verification ---');
console.log('======================================================');

// robots.txt
const robotsPath = path.join(rootDir, 'robots.txt');
test('robots.txt exists', fs.existsSync(robotsPath));
if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    test('robots.txt allows crawling', robotsContent.includes('User-agent: *') && robotsContent.includes('Allow: /'));
    test('robots.txt references sitemap.xml', robotsContent.includes('sitemap.xml'));
}

// sitemap.xml
const sitemapPath = path.join(rootDir, 'sitemap.xml');
test('sitemap.xml exists', fs.existsSync(sitemapPath));
if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    test('sitemap.xml has valid XML header', sitemapContent.startsWith('<?xml'));
    test('sitemap.xml includes index page', sitemapContent.includes('<loc>https://webmastery.in/</loc>'));
    test('sitemap.xml includes dashboard', sitemapContent.includes('dashboard.html'));
    test('sitemap.xml includes css course', sitemapContent.includes('css.html'));
    test('sitemap.xml includes legal pages', sitemapContent.includes('privacy-policy.html') && sitemapContent.includes('terms.html'));
    test('sitemap.xml does NOT include 404 page', !sitemapContent.includes('404.html'));
}

// ads.txt
const adsTxtPath = path.join(rootDir, 'ads.txt');
test('ads.txt exists', fs.existsSync(adsTxtPath));
if (fs.existsSync(adsTxtPath)) {
    const adsContent = fs.readFileSync(adsTxtPath, 'utf8');
    test('ads.txt has publisher placeholder', adsContent.includes('YOUR-ADSENSE-PUBLISHER-ID'));
    test('ads.txt does not contain fake publisher ID', !/pub-\d{16}/.test(adsContent));
}

// Trust & Legal Pages
test('about.html exists', fs.existsSync(path.join(rootDir, 'about.html')));
test('contact.html exists', fs.existsSync(path.join(rootDir, 'contact.html')));
test('privacy-policy.html exists', fs.existsSync(path.join(rootDir, 'privacy-policy.html')));
test('terms.html exists', fs.existsSync(path.join(rootDir, 'terms.html')));
test('404.html exists', fs.existsSync(path.join(rootDir, '404.html')));

console.log('\n======================================================');
console.log(`SEO & ADSENSE AUDIT RESULTS: ${passed} passed, ${failed} failed`);
console.log('======================================================');

if (failed > 0) {
    console.error(`\nFailures (${failed}):`);
    failures.forEach(f => console.error(f));
    process.exit(1);
} else {
    console.log('\n>>> ALL SEO & ADSENSE VERIFICATIONS PASSED! <<<\n');
}
