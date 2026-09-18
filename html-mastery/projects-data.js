/**
 * Project-Based Learning Data Registry
 * Contains definitions for 6 HTML Projects and 7 CSS Projects with 5-step milestones,
 * starter code, validation rules, hints, and skills summary.
 */

window.projectsData = {
    html: [
        {
            id: 'html-profile',
            title: 'Personal Profile',
            track: 'html',
            icon: '👤',
            difficulty: '🟢 Easy',
            objective: 'Build a structured personal profile webpage with headings, paragraphs, profile image, and social links.',
            requirements: [
                'Use appropriate heading levels (h1, h2)',
                'Include a bio paragraph and profile image',
                'Create a list of interests or skills',
                'Add contact links with target="_blank"'
            ],
            skills: ['HTML Headings', 'Paragraphs & Text', 'Images & alt text', 'Unordered Lists', 'Hyperlinks'],
            starterCode: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Personal Profile</title>
</head>
<body>
  <!-- Build your profile here -->
</body>
</html>`,
                css: `/* Add minimal styling if desired */
body {
  font-family: sans-serif;
  line-height: 1.6;
  max-width: 600px;
  margin: 20px auto;
  padding: 0 15px;
}`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Header & Title',
                    instructions: 'Add an <h1> tag with your full name and an <h2> tag with your subtitle/role (e.g., "Web Developer in Training").',
                    hints: ['Use <h1>Your Name</h1> for the main heading.', 'Use <h2>Web Developer</h2> right below it.'],
                    validation: (html) => /<h1[^>]*>[\s\S]*?<\/h1>/i.test(html) && /<h2[^>]*>[\s\S]*?<\/h2>/i.test(html)
                },
                {
                    step: 2,
                    title: 'Bio & Profile Image',
                    instructions: 'Add an <img> tag with src and alt attributes, followed by a <p> tag containing a short bio.',
                    hints: ['Use <img src="https://via.placeholder.com/150" alt="Profile Picture">', 'Add <p>Hi! I am learning web development...</p>'],
                    validation: (html) => /<img[^>]+src=["'][^"']+["'][^>]*>/i.test(html) && /<p[^>]*>[\s\S]*?<\/p>/i.test(html)
                },
                {
                    step: 3,
                    title: 'Skills & Interests List',
                    instructions: 'Create an <h2> labeled "My Interests" and an unordered list <ul> with at least 3 <li> items.',
                    hints: ['Add <h2>My Interests</h2>', 'Use <ul><li>Coding</li><li>Reading</li><li>Gaming</li></ul>'],
                    validation: (html) => /<ul[^>]*>[\s\S]*?(?:<li[^>]*>[\s\S]*?<\/li>[\s\S]*?){3,}<\/ul>/i.test(html)
                },
                {
                    step: 4,
                    title: 'Contact Links',
                    instructions: 'Add a section with <h2>Contact Me</h2> and at least two anchor links <a> with href and target="_blank".',
                    hints: ['<a href="https://github.com" target="_blank">GitHub</a>', '<a href="mailto:test@example.com">Email Me</a>'],
                    validation: (html) => (html.match(/<a[^>]+href=["'][^"']+["'][^>]*>/gi) || []).length >= 2
                },
                {
                    step: 5,
                    title: 'Semantic Wrap',
                    instructions: 'Wrap your header in a <header> tag, main content in a <main> tag, and footer/links in a <footer> tag.',
                    hints: ['Put <h1> and <h2> inside <header>...', '</header>', 'Wrap bio and list in <main>...', '</main>'],
                    validation: (html) => /<header[^>]*>/i.test(html) && /<main[^>]*>/i.test(html) && /<footer[^>]*>/i.test(html)
                }
            ]
        },
        {
            id: 'html-resume',
            title: 'Online Resume',
            track: 'html',
            icon: '📄',
            difficulty: '🟡 Medium',
            objective: 'Build a comprehensive online CV with work history, education, skill matrix table, and contact info.',
            requirements: [
                'Structured header with contact metadata',
                'Work experience history using ordered/unordered lists',
                'Education section with semantic headings',
                'Skills summary using an HTML <table> with headers'
            ],
            skills: ['Semantic Sections', 'HTML Tables', 'Ordered/Unordered Lists', 'Strong & Emphasis Tags'],
            starterCode: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Professional Resume</title>
</head>
<body>
  <!-- Build resume here -->
</body>
</html>`,
                css: `body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.5; }
table { border-collapse: collapse; width: 100%; margin-top: 10px; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Header & Contact Information',
                    instructions: 'Add a <header> with your name in <h1> and a paragraph with email, phone, and location.',
                    hints: ['<h1>Jane Doe</h1>', '<p>Email: jane@example.com | Phone: (555) 000-1234</p>'],
                    validation: (html) => /<header[^>]*>[\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<\/header>/i.test(html)
                },
                {
                    step: 2,
                    title: 'Work Experience Section',
                    instructions: 'Create a <section> with an <h2> "Work Experience" and articles or divs detailing 2 job positions.',
                    hints: ['<section><h2>Work Experience</h2><article><h3>Junior Dev</h3>...</article></section>'],
                    validation: (html) => (html.match(/<h3[^>]*>/gi) || []).length >= 2
                },
                {
                    step: 3,
                    title: 'Education & Certifications',
                    instructions: 'Add an "Education" section with degree details using an ordered list <ol> with <li> elements.',
                    hints: ['<section><h2>Education</h2><ol><li>BS in Computer Science</li></ol></section>'],
                    validation: (html) => /<ol[^>]*>[\s\S]*?<li[^>]*>[\s\S]*?<\/li>[\s\S]*?<\/ol>/i.test(html)
                },
                {
                    step: 4,
                    title: 'Skills Matrix Table',
                    instructions: 'Create a <table> with <thead> and <tbody>, containing <th> labels for Skill and Proficiency.',
                    hints: ['<table><thead><tr><th>Skill</th><th>Level</th></tr></thead><tbody>...</tbody></table>'],
                    validation: (html) => /<table[^>]*>[\s\S]*?<th[^>]*>[\s\S]*?<\/th>[\s\S]*?<\/table>/i.test(html)
                },
                {
                    step: 5,
                    title: 'Footer & Download Link',
                    instructions: 'Add a <footer> tag with a copyright notice and a link <a href="#" download> to download a PDF resume.',
                    hints: ['<footer><p>&copy; 2026 Jane Doe. <a href="#" download>Download PDF</a></p></footer>'],
                    validation: (html) => /<footer[^>]*>[\s\S]*?<\/footer>/i.test(html) && /<a[^>]+download/i.test(html)
                }
            ]
        },
        {
            id: 'html-restaurant-menu',
            title: 'Restaurant Menu',
            track: 'html',
            icon: '🍽️',
            difficulty: '🟢 Easy',
            objective: 'Build an elegant restaurant menu with categories, item descriptions, prices, and an online order request form.',
            requirements: [
                'Organized food categories (Appetizers, Mains, Desserts)',
                'Item descriptions with bold titles and prices',
                'An online reservation/order form with text and select inputs'
            ],
            skills: ['Category Grouping', 'Form Controls', 'Details & Summary', 'Semantic Layout'],
            starterCode: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bistro Gourmet Menu</title>
</head>
<body>
  <!-- Build menu here -->
</body>
</html>`,
                css: `body { font-family: Georgia, serif; max-width: 700px; margin: 0 auto; padding: 20px; }
.price { font-weight: bold; color: #b91c1c; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Restaurant Header',
                    instructions: 'Create a <header> with <h1> Restaurant Name and a tag line paragraph.',
                    hints: ['<h1>Le Petit Bistro</h1>', '<p>Authentic French Cuisine</p>'],
                    validation: (html) => /<h1[^>]*>[\s\S]*?<\/h1>/i.test(html)
                },
                {
                    step: 2,
                    title: 'Menu Categories & Items',
                    instructions: 'Create sections for "Appetizers" and "Main Courses" using <h2> headings and list items for dishes.',
                    hints: ['<section><h2>Appetizers</h2><ul><li>Garlic Bread - $6</li></ul></section>'],
                    validation: (html) => (html.match(/<h2[^>]*>/gi) || []).length >= 2 && /<ul[^>]*>/i.test(html)
                },
                {
                    step: 3,
                    title: 'Specialty Descriptions',
                    instructions: 'Use <figure> and <figcaption> or <details> and <summary> to highlight a chef specialty.',
                    hints: ['<details><summary>Chef Special: Lobster Bisque</summary><p>Rich creamy soup...</p></details>'],
                    validation: (html) => /<(figure|details)[^>]*>/i.test(html)
                },
                {
                    step: 4,
                    title: 'Reservation / Order Form',
                    instructions: 'Add a <form> with inputs for Name, Email, Date, and a <select> dropdown for Table Size.',
                    hints: ['<form><input type="text" name="name" required><select name="table"><option>2 People</option></select></form>'],
                    validation: (html) => /<form[^>]*>[\s\S]*?<select[^>]*>[\s\S]*?<\/select>[\s\S]*?<\/form>/i.test(html)
                },
                {
                    step: 5,
                    title: 'Submit Button & Footer',
                    instructions: 'Add a submit button inside the form and a footer with opening hours.',
                    hints: ['<button type="submit">Reserve Table</button>', '<footer>Open Daily 5pm - 11pm</footer>'],
                    validation: (html) => /<button[^>]+type=["']submit["'][^>]*>/i.test(html) && /<footer[^>]*>/i.test(html)
                }
            ]
        },
        {
            id: 'html-blog',
            title: 'Blog Article Page',
            track: 'html',
            icon: '📝',
            difficulty: '🟡 Medium',
            objective: 'Build a semantic blog post webpage complete with article author metadata, image figures, blockquotes, and comment section.',
            requirements: [
                'Semantic `<article>` wrapper',
                'Metadata section (`<time>`, author name, read time)',
                'Image figure with `<figcaption>`',
                'Blockquote for highlighted pull quote',
                'Comments form with `<textarea>`'
            ],
            skills: ['Article Structure', 'Time & Meta Tags', 'Blockquote', 'Textarea & Forms'],
            starterCode: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tech Blog Article</title>
</head>
<body>
  <!-- Build article here -->
</body>
</html>`,
                css: `body { font-family: system-ui, sans-serif; line-height: 1.7; max-width: 680px; margin: 30px auto; padding: 0 20px; }
blockquote { border-left: 4px solid #3b82f6; margin: 0; padding-left: 15px; font-style: italic; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Article Header & Title',
                    instructions: 'Wrap content in an <article> tag. Inside, add a <header> with article title in <h1> and category tag.',
                    hints: ['<article><header><h1>The Future of Web Development</h1></header></article>'],
                    validation: (html) => /<article[^>]*>[\s\S]*?<header[^>]*>[\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<\/header>/i.test(html)
                },
                {
                    step: 2,
                    title: 'Author Metadata & Time Tag',
                    instructions: 'Add a metadata paragraph with author name and a valid <time datetime="YYYY-MM-DD"> tag.',
                    hints: ['<p>By Jane Doe on <time datetime="2026-09-18">September 18, 2026</time></p>'],
                    validation: (html) => /<time[^>]+datetime=["'][^"']+["'][^>]*>/i.test(html)
                },
                {
                    step: 3,
                    title: 'Content Paragraphs & Pull Quote',
                    instructions: 'Write 2 body paragraphs <p> and include a <blockquote> with a memorable quote.',
                    hints: ['<p>Web standards continue to evolve rapidly...</p>','<blockquote>"The web is for everyone." - Tim Berners-Lee</blockquote>'],
                    validation: (html) => (html.match(/<p[^>]*>/gi) || []).length >= 2 && /<blockquote[^>]*>/i.test(html)
                },
                {
                    step: 4,
                    title: 'Featured Image Figure',
                    instructions: 'Insert a <figure> element containing an <img> and a descriptive <figcaption>.',
                    hints: ['<figure><img src="https://via.placeholder.com/600x300" alt="Code"><figcaption>Figure 1: Writing clean HTML.</figcaption></figure>'],
                    validation: (html) => /<figure[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<figcaption[^>]*>[\s\S]*?<\/figcaption>[\s\S]*?<\/figure>/i.test(html)
                },
                {
                    step: 5,
                    title: 'Leave a Comment Form',
                    instructions: 'Add a comment section with a <form>, <input type="text"> for name, and <textarea> for the message.',
                    hints: ['<form><input type="text" placeholder="Name"><textarea placeholder="Comment..."></textarea><button type="submit">Post Comment</button></form>'],
                    validation: (html) => /<form[^>]*>[\s\S]*?<textarea[^>]*>[\s\S]*?<\/textarea>[\s\S]*?<\/form>/i.test(html)
                }
            ]
        },
        {
            id: 'html-registration-form',
            title: 'Registration Form',
            track: 'html',
            icon: '📋',
            difficulty: '🟡 Medium',
            objective: 'Build a comprehensive user registration form with fieldsets, legends, input types, checkboxes, radio buttons, and validation attributes.',
            requirements: [
                'Grouped input fieldsets with `<legend>`',
                'Multiple input types (text, email, password, date, tel)',
                'Radio buttons for account type and checkboxes for terms',
                'HTML5 validation attributes (required, minlength, pattern)'
            ],
            skills: ['Form Layout', 'Fieldset & Legend', 'Input Validation Attributes', 'Checkboxes & Radios'],
            starterCode: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Account Registration</title>
</head>
<body>
  <!-- Build form here -->
</body>
</html>`,
                css: `body { font-family: sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; }
fieldset { border: 1px solid #ccc; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
legend { font-weight: bold; padding: 0 5px; }
div { margin-bottom: 10px; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Form Container & Title',
                    instructions: 'Create a main heading <h1> "Create Account" and a <form action="#" method="POST"> wrapper.',
                    hints: ['<h1>Create Account</h1><form action="#" method="POST">...</form>'],
                    validation: (html) => /<form[^>]*>/i.test(html) && /<h1[^>]*>/i.test(html)
                },
                {
                    step: 2,
                    title: 'Personal Info Fieldset',
                    instructions: 'Add a <fieldset> with <legend>Personal Info</legend>, containing inputs for Name and Email with required attributes.',
                    hints: ['<fieldset><legend>Personal Info</legend><label>Full Name: <input type="text" required></label></fieldset>'],
                    validation: (html) => /<fieldset[^>]*>[\s\S]*?<legend[^>]*>[\s\S]*?<\/legend>[\s\S]*?<\/fieldset>/i.test(html) && /type=["']email["']/i.test(html)
                },
                {
                    step: 3,
                    title: 'Security Credentials',
                    instructions: 'Add password inputs with minlength="8" and type="password".',
                    hints: ['<label>Password: <input type="password" minlength="8" required></label>'],
                    validation: (html) => /type=["']password["'][^>]*minlength/i.test(html) || /minlength[^>]*type=["']password["']/i.test(html)
                },
                {
                    step: 4,
                    title: 'Radio & Checkbox Selection',
                    instructions: 'Add radio buttons for "Account Type" (Personal vs Business) sharing the same name attribute, and a Terms & Conditions checkbox.',
                    hints: ['<input type="radio" name="plan" value="personal"> Personal', '<input type="checkbox" required> Accept Terms'],
                    validation: (html) => (html.match(/type=["']radio["']/gi) || []).length >= 2 && /type=["']checkbox["']/i.test(html)
                },
                {
                    step: 5,
                    title: 'Form Submission',
                    instructions: 'Add a submit button <button type="submit">Create Account</button> at the end of the form.',
                    hints: ['<button type="submit">Create Account</button>'],
                    validation: (html) => /<button[^>]+type=["']submit["'][^>]*>/i.test(html) || /<input[^>]+type=["']submit["'][^>]*>/i.test(html)
                }
            ]
        },
        {
            id: 'html-portfolio',
            title: 'Developer Portfolio Page',
            track: 'html',
            icon: '🚀',
            difficulty: '🔴 Hard',
            objective: 'Build a multi-section developer portfolio with navigation anchor links, project cards grid markup, skills summary, and contact form.',
            requirements: [
                'Semantic navbar with internal anchor links (`href="#projects"`)',
                'Hero banner section with CTA link',
                'Projects section with multiple project preview cards',
                'Contact form section'
            ],
            skills: ['Multi-section Architecture', 'Internal Page Links', 'Semantic Layout', 'Card Structure'],
            starterCode: {
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Frontend Developer Portfolio</title>
</head>
<body>
  <!-- Build portfolio here -->
</body>
</html>`,
                css: `body { font-family: system-ui, sans-serif; margin: 0; padding: 0; line-height: 1.6; }
nav { background: #1e293b; color: #fff; padding: 1rem; }
nav a { color: #fff; margin-right: 15px; text-decoration: none; }
section { padding: 40px 20px; max-width: 800px; margin: 0 auto; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Navigation Header',
                    instructions: 'Create a <header> with <nav> containing links to #about, #projects, and #contact.',
                    hints: ['<nav><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav>'],
                    validation: (html) => /<nav[^>]*>[\s\S]*?<a[^>]+href=["']#projects["']/i.test(html)
                },
                {
                    step: 2,
                    title: 'Hero Section',
                    instructions: 'Add a <section id="about"> with <h1> "Hi, I\'m [Name]", a tag line paragraph, and a contact CTA link.',
                    hints: ['<section id="about"><h1>Hi, I\'m Alex</h1><p>Full Stack Web Developer</p><a href="#contact">Get In Touch</a></section>'],
                    validation: (html) => /<section[^>]+id=["']about["']/i.test(html)
                },
                {
                    step: 3,
                    title: 'Projects Grid Section',
                    instructions: 'Create a <section id="projects"> with <h2>Projects</h2> and at least 3 <article> project cards.',
                    hints: ['<section id="projects"><h2>My Projects</h2><article><h3>Project 1</h3><p>Built with HTML & CSS</p></article></section>'],
                    validation: (html) => /<section[^>]+id=["']projects["']/i.test(html) && (html.match(/<article[^>]*>/gi) || []).length >= 3
                },
                {
                    step: 4,
                    title: 'Contact Form Section',
                    instructions: 'Add a <section id="contact"> with a <form> for sending messages.',
                    hints: ['<section id="contact"><h2>Contact Me</h2><form><input type="email"><textarea></textarea></form></section>'],
                    validation: (html) => /<section[^>]+id=["']contact["']/i.test(html) && /<form[^>]*>/i.test(html)
                },
                {
                    step: 5,
                    title: 'Footer & Copyright',
                    instructions: 'Add a <footer> with copyright info and social link icons.',
                    hints: ['<footer><p>&copy; 2026 Developer Portfolio. Built with HTML5.</p></footer>'],
                    validation: (html) => /<footer[^>]*>[\s\S]*?<\/footer>/i.test(html)
                }
            ]
        }
    ],

    css: [
        {
            id: 'css-profile-card',
            title: 'Profile Card Component',
            track: 'css',
            icon: '🎴',
            difficulty: '🟢 Easy',
            objective: 'Style a modern user profile card with rounded avatar image, box shadow, custom typography, and action buttons.',
            requirements: [
                'Card container with border-radius and subtle box-shadow',
                'Centered avatar image with circular clip (border-radius: 50%)',
                'Styled typography hierarchy (title, subtitle, bio)',
                'Hover transition effects on buttons'
            ],
            skills: ['Box Model', 'Border Radius', 'Box Shadow', 'Flex Alignment', 'Transitions'],
            starterCode: {
                html: `<div class="profile-card">
  <img src="https://via.placeholder.com/100" alt="Avatar" class="avatar">
  <h2 class="name">Sarah Connor</h2>
  <p class="role">Frontend Developer</p>
  <p class="bio">Passionate about clean code, UI design, and responsive web apps.</p>
  <button class="btn-follow">Follow</button>
</div>`,
                css: `/* Add CSS rules here */
body {
  background: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Card Container Box',
                    instructions: 'Target `.profile-card` with background-color #ffffff, padding 20px, border-radius 12px, max-width 300px, and text-align center.',
                    hints: ['.profile-card { background: #fff; padding: 24px; border-radius: 12px; max-width: 300px; text-align: center; }'],
                    validation: (html, css) => /\.profile-card[\s\S]*?border-radius/i.test(css)
                },
                {
                    step: 2,
                    title: 'Circular Avatar Styling',
                    instructions: 'Style `.avatar` with width 100px, height 100px, and border-radius 50% to make it circular.',
                    hints: ['.avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }'],
                    validation: (html, css) => /\.avatar[\s\S]*?border-radius:\s*50%/i.test(css)
                },
                {
                    step: 3,
                    title: 'Box Shadow & Depth',
                    instructions: 'Add a modern subtle box-shadow to `.profile-card` (e.g. `box-shadow: 0 10px 25px rgba(0,0,0,0.1)`).',
                    hints: ['box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);'],
                    validation: (html, css) => /\.profile-card[\s\S]*?box-shadow/i.test(css)
                },
                {
                    step: 4,
                    title: 'Typography Styling',
                    instructions: 'Style `.name` with font-size 1.25rem, color #1e293b, and `.role` with color #64748b.',
                    hints: ['.name { font-size: 1.25rem; color: #1e293b; margin: 10px 0 4px; }'],
                    validation: (html, css) => /\.name[\s\S]*?color/i.test(css) && /\.role[\s\S]*?color/i.test(css)
                },
                {
                    step: 5,
                    title: 'Interactive Follow Button',
                    instructions: 'Style `.btn-follow` with background-color #2563eb, color #fff, border none, border-radius 6px, and a hover scale/color transition.',
                    hints: ['.btn-follow { background: #2563eb; color: #fff; padding: 8px 20px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }', '.btn-follow:hover { background: #1d4ed8; }'],
                    validation: (html, css) => /\.btn-follow:hover/i.test(css)
                }
            ]
        },
        {
            id: 'css-navbar',
            title: 'Navigation Bar',
            track: 'css',
            icon: '🧭',
            difficulty: '🟢 Easy',
            objective: 'Build a responsive horizontal navigation header using Flexbox with logo branding and active state links.',
            requirements: [
                'Flexbox layout aligning logo left and links right',
                'Padded link items with hover states',
                'Active indicator line/background',
                'Clean reset and box-sizing'
            ],
            skills: ['Flexbox Space-Between', 'Align Items', 'Pseudo-classes (:hover, :active)', 'Transitions'],
            starterCode: {
                html: `<nav class="navbar">
  <div class="logo">WebCraft</div>
  <ul class="nav-links">
    <li><a href="#" class="active">Home</a></li>
    <li><a href="#">Courses</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
                css: `body { margin: 0; font-family: sans-serif; background: #0f172a; color: #fff; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Flex Container Layout',
                    instructions: 'Set `.navbar` display to flex, justify-content to space-between, and align-items to center.',
                    hints: ['.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #1e293b; }'],
                    validation: (html, css) => /\.navbar[\s\S]*?display:\s*flex/i.test(css) && /\.navbar[\s\S]*?justify-content:\s*space-between/i.test(css)
                },
                {
                    step: 2,
                    title: 'Horizontal List Items',
                    instructions: 'Remove list style from `.nav-links` (list-style: none), set display to flex, and add gap: 1.5rem.',
                    hints: ['.nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 1.5rem; }'],
                    validation: (html, css) => /\.nav-links[\s\S]*?list-style:\s*none/i.test(css)
                },
                {
                    step: 3,
                    title: 'Link Styling',
                    instructions: 'Style `.nav-links a` with color #94a3b8, text-decoration none, and font-weight 500.',
                    hints: ['.nav-links a { color: #94a3b8; text-decoration: none; font-weight: 500; }'],
                    validation: (html, css) => /\.nav-links\s+a[\s\S]*?text-decoration:\s*none/i.test(css)
                },
                {
                    step: 4,
                    title: 'Hover & Active States',
                    instructions: 'Add hover effect to `.nav-links a:hover` (color: #ffffff) and style `.nav-links a.active` with color #38bdf8.',
                    hints: ['.nav-links a:hover, .nav-links a.active { color: #38bdf8; }'],
                    validation: (html, css) => /\.nav-links\s+a:(hover|active)|\.active/i.test(css)
                },
                {
                    step: 5,
                    title: 'Brand Logo Styling',
                    instructions: 'Style `.logo` with font-size 1.25rem, font-weight 700, and color #38bdf8.',
                    hints: ['.logo { font-size: 1.25rem; font-weight: 700; color: #38bdf8; }'],
                    validation: (html, css) => /\.logo[\s\S]*?font-weight/i.test(css)
                }
            ]
        },
        {
            id: 'css-pricing-cards',
            title: 'Pricing Cards Grid',
            track: 'css',
            icon: '💳',
            difficulty: '🟡 Medium',
            objective: 'Build a responsive 3-column pricing table featuring a highlighted popular plan with transform badge.',
            requirements: [
                'CSS Grid or Flexbox responsive multi-column layout',
                'Highlighted middle card with border accent & transform scaling',
                'Price typography with currency unit',
                'Feature checklist styling'
            ],
            skills: ['CSS Grid / Flexbox', 'Transform & Scaling', 'Badge Positioning', 'Card Accent Borders'],
            starterCode: {
                html: `<div class="pricing-container">
  <div class="plan-card">
    <h3>Starter</h3>
    <div class="price">$19<span>/mo</span></div>
    <ul>
      <li>5 Projects</li>
      <li>Basic Support</li>
    </ul>
    <button>Choose Plan</button>
  </div>

  <div class="plan-card featured">
    <span class="badge">Popular</span>
    <h3>Pro</h3>
    <div class="price">$49<span>/mo</span></div>
    <ul>
      <li>Unlimited Projects</li>
      <li>Priority Support</li>
    </ul>
    <button class="btn-primary">Choose Plan</button>
  </div>
</div>`,
                css: `body { font-family: sans-serif; background: #f8fafc; padding: 40px 20px; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Grid Container',
                    instructions: 'Style `.pricing-container` with display flex or grid, gap 20px, and max-width 800px centered.',
                    hints: ['.pricing-container { display: flex; gap: 20px; justify-content: center; align-items: center; max-width: 800px; margin: 0 auto; }'],
                    validation: (html, css) => /\.pricing-container[\s\S]*?display:\s*(flex|grid)/i.test(css)
                },
                {
                    step: 2,
                    title: 'Plan Card Base Style',
                    instructions: 'Style `.plan-card` with background #fff, border 1px solid #e2e8f0, padding 25px, border-radius 10px, and flex: 1.',
                    hints: ['.plan-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 25px; flex: 1; text-align: center; position: relative; }'],
                    validation: (html, css) => /\.plan-card[\s\S]*?border/i.test(css)
                },
                {
                    step: 3,
                    title: 'Featured Card Highlight',
                    instructions: 'Style `.plan-card.featured` with border-color #2563eb, transform scale(1.05), and subtle shadow.',
                    hints: ['.plan-card.featured { border: 2px solid #2563eb; transform: scale(1.05); box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15); }'],
                    validation: (html, css) => /\.plan-card\.featured[\s\S]*?border/i.test(css) && /\.plan-card\.featured[\s\S]*?transform/i.test(css)
                },
                {
                    step: 4,
                    title: 'Popular Badge Absolute Position',
                    instructions: 'Position `.badge` at top right of `.featured` card using position absolute.',
                    hints: ['.badge { position: absolute; top: -12px; right: 20px; background: #2563eb; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 12px; }'],
                    validation: (html, css) => /\.badge[\s\S]*?position:\s*absolute/i.test(css)
                },
                {
                    step: 5,
                    title: 'Button Hover Effects',
                    instructions: 'Style buttons with full width, border-radius, and hover transition.',
                    hints: ['button { width: 100%; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: 600; }'],
                    validation: (html, css) => /button:hover/i.test(css) || /\.btn-primary/i.test(css)
                }
            ]
        },
        {
            id: 'css-login-page',
            title: 'Modern Login Form Page',
            track: 'css',
            icon: '🔐',
            difficulty: '🟡 Medium',
            objective: 'Style a sleek, responsive authentication card with custom input focus states, gradient accent, and floating labels.',
            requirements: [
                'Centered card container on gradient background',
                'Input field focus rings (`:focus`)',
                'Styled primary CTA submit button',
                'Forgot password link and social login buttons'
            ],
            skills: ['Form Input Focus States', 'CSS Gradients', 'Flex Center Alignment', 'Box Shadows'],
            starterCode: {
                html: `<div class="login-card">
  <h2>Welcome Back</h2>
  <form>
    <div class="form-group">
      <label>Email</label>
      <input type="email" placeholder="you@example.com" required>
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" placeholder="••••••••" required>
    </div>
    <button type="submit" class="btn-login">Sign In</button>
  </form>
</div>`,
                css: `body { margin: 0; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #0f172a; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Gradient Background',
                    instructions: 'Add a background linear-gradient to `body` (e.g. `linear-gradient(135deg, #0f172a, #1e293b)`).',
                    hints: ['body { background: linear-gradient(135deg, #0f172a, #1e293b); color: #f8fafc; }'],
                    validation: (html, css) => /linear-gradient/i.test(css)
                },
                {
                    step: 2,
                    title: 'Login Card Shell',
                    instructions: 'Style `.login-card` with background #1e293b, padding 30px, border-radius 12px, width 100%, max-width 360px, and box-shadow.',
                    hints: ['.login-card { background: #1e293b; padding: 32px; border-radius: 12px; width: 100%; max-width: 360px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }'],
                    validation: (html, css) => /\.login-card[\s\S]*?border-radius/i.test(css)
                },
                {
                    step: 3,
                    title: 'Input Controls Styling',
                    instructions: 'Style `.form-group input` with width 100%, padding 10px, border 1px solid #334155, border-radius 6px, background #0f172a, and color #fff.',
                    hints: ['.form-group input { width: 100%; padding: 10px; border: 1px solid #334155; border-radius: 6px; background: #0f172a; color: #fff; box-sizing: border-box; }'],
                    validation: (html, css) => /\.form-group\s+input[\s\S]*?border/i.test(css)
                },
                {
                    step: 4,
                    title: 'Input Focus State',
                    instructions: 'Add a focus ring to `.form-group input:focus` with outline none and border-color/box-shadow glow.',
                    hints: ['.form-group input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25); }'],
                    validation: (html, css) => /input:focus/i.test(css)
                },
                {
                    step: 5,
                    title: 'Primary Login Button',
                    instructions: 'Style `.btn-login` with full width, background #3b82f6, color #fff, padding 12px, border-radius 6px, and hover effect.',
                    hints: ['.btn-login { width: 100%; background: #3b82f6; color: #fff; padding: 12px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }', '.btn-login:hover { background: #2563eb; }'],
                    validation: (html, css) => /\.btn-login[\s\S]*?background/i.test(css)
                }
            ]
        },
        {
            id: 'css-landing-page',
            title: 'Hero & Feature Landing Page',
            track: 'css',
            icon: '🌟',
            difficulty: '🔴 Hard',
            objective: 'Design a full landing page hero banner with grid features section, vibrant CTA callouts, and typography hierarchy.',
            requirements: [
                'Full-width hero banner with background overlay',
                'Responsive 3-column feature section',
                'Call to Action (CTA) buttons with gradient effects',
                'Fluid typography and margin spacing'
            ],
            skills: ['Hero Sections', 'CSS Grid', 'Gradient Buttons', 'Typography Scaling'],
            starterCode: {
                html: `<header class="hero">
  <h1>Build Faster Websites</h1>
  <p>Master modern HTML and CSS with real-world interactive projects.</p>
  <div class="cta-group">
    <a href="#" class="btn btn-cta">Get Started Free</a>
    <a href="#" class="btn btn-secondary">Learn More</a>
  </div>
</header>

<section class="features">
  <div class="feature-box">
    <h3>⚡ Fast Execution</h3>
    <p>Run code directly in live sandboxed preview frames.</p>
  </div>
  <div class="feature-box">
    <h3>🎯 Step Validation</h3>
    <p>Get instant feedback on your progress.</p>
  </div>
  <div class="feature-box">
    <h3>🏆 Gamified Badges</h3>
    <p>Earn XP and track achievements.</p>
  </div>
</section>`,
                css: `body { margin: 0; font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Hero Header Banner',
                    instructions: 'Style `.hero` with text-align center, padding 80px 20px, and background gradient.',
                    hints: ['.hero { text-align: center; padding: 80px 20px; background: radial-gradient(circle, #1e293b 0%, #0f172a 100%); }'],
                    validation: (html, css) => /\.hero[\s\S]*?padding/i.test(css)
                },
                {
                    step: 2,
                    title: 'Hero Title & Tagline',
                    instructions: 'Style `.hero h1` with font-size 2.5rem, font-weight 800, and `.hero p` with max-width 600px centered.',
                    hints: ['.hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; }', '.hero p { font-size: 1.15rem; color: #94a3b8; max-width: 600px; margin: 0 auto 30px; }'],
                    validation: (html, css) => /\.hero\s+h1[\s\S]*?font-size/i.test(css)
                },
                {
                    step: 3,
                    title: 'CTA Buttons',
                    instructions: 'Style `.btn-cta` with background linear-gradient(#3b82f6 to #2563eb), padding 12px 28px, and border-radius 25px.',
                    hints: ['.btn { display: inline-block; padding: 12px 28px; border-radius: 25px; text-decoration: none; font-weight: 600; margin: 0 5px; }', '.btn-cta { background: linear-gradient(90deg, #3b82f6, #2563eb); color: #fff; }'],
                    validation: (html, css) => /\.btn-cta[\s\S]*?background/i.test(css)
                },
                {
                    step: 4,
                    title: 'Features Grid Layout',
                    instructions: 'Set `.features` display to grid with `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` and gap 20px.',
                    hints: ['.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 900px; margin: 40px auto; padding: 0 20px; }'],
                    validation: (html, css) => /\.features[\s\S]*?display:\s*grid/i.test(css)
                },
                {
                    step: 5,
                    title: 'Feature Cards Style',
                    instructions: 'Style `.feature-box` with background #1e293b, padding 20px, border-radius 10px, and border 1px solid #334155.',
                    hints: ['.feature-box { background: #1e293b; border: 1px solid #334155; padding: 24px; border-radius: 10px; }'],
                    validation: (html, css) => /\.feature-box[\s\S]*?background/i.test(css)
                }
            ]
        },
        {
            id: 'css-dashboard',
            title: 'Admin Dashboard Layout',
            track: 'css',
            icon: '📊',
            difficulty: '🔴 Hard',
            objective: 'Build an admin analytics dashboard layout with sidebar navigation, CSS Grid stat widgets, and data card tiles.',
            requirements: [
                'Sidebar + Main Content split grid layout',
                'Stat cards grid (4 widgets across top)',
                'Main chart/data card container',
                'Clean dark theme styling'
            ],
            skills: ['CSS Grid Areas/Columns', 'Dashboard Layouts', 'Widget Component Design', 'Sidebar Styling'],
            starterCode: {
                html: `<div class="dashboard-grid">
  <aside class="sidebar">
    <h2>DashNav</h2>
    <ul>
      <li class="active">Overview</li>
      <li>Analytics</li>
      <li>Settings</li>
    </ul>
  </aside>

  <main class="main-content">
    <div class="stats-row">
      <div class="stat-card">
        <span class="label">Users</span>
        <span class="value">12,450</span>
      </div>
      <div class="stat-card">
        <span class="label">Revenue</span>
        <span class="value">$34,200</span>
      </div>
    </div>
  </main>
</div>`,
                css: `body { margin: 0; font-family: sans-serif; background: #0f172a; color: #f8fafc; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Main Grid Split',
                    instructions: 'Style `.dashboard-grid` with `display: grid; grid-template-columns: 220px 1fr; min-height: 100vh;`.',
                    hints: ['.dashboard-grid { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }'],
                    validation: (html, css) => /\.dashboard-grid[\s\S]*?grid-template-columns/i.test(css)
                },
                {
                    step: 2,
                    title: 'Sidebar Column Style',
                    instructions: 'Style `.sidebar` with background #1e293b, padding 20px, and border-right 1px solid #334155.',
                    hints: ['.sidebar { background: #1e293b; border-right: 1px solid #334155; padding: 20px; }'],
                    validation: (html, css) => /\.sidebar[\s\S]*?background/i.test(css)
                },
                {
                    step: 3,
                    title: 'Sidebar List Items',
                    instructions: 'Style `.sidebar ul` with list-style none and `.sidebar li.active` with background #334155, color #38bdf8, and border-radius 6px.',
                    hints: ['.sidebar ul { list-style: none; padding: 0; }', '.sidebar li { padding: 10px; border-radius: 6px; margin-bottom: 4px; cursor: pointer; }', '.sidebar li.active { background: #334155; color: #38bdf8; }'],
                    validation: (html, css) => /\.sidebar[\s\S]*?active/i.test(css)
                },
                {
                    step: 4,
                    title: 'Stats Grid Row',
                    instructions: 'Set `.stats-row` display to grid with `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))` and gap 15px.',
                    hints: ['.stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }'],
                    validation: (html, css) => /\.stats-row[\s\S]*?display:\s*grid/i.test(css)
                },
                {
                    step: 5,
                    title: 'Stat Widget Box',
                    instructions: 'Style `.stat-card` with background #1e293b, padding 20px, border-radius 8px, and border 1px solid #334155.',
                    hints: ['.stat-card { background: #1e293b; border: 1px solid #334155; padding: 20px; border-radius: 8px; }', '.value { font-size: 1.5rem; font-weight: 700; color: #38bdf8; display: block; }'],
                    validation: (html, css) => /\.stat-card[\s\S]*?border/i.test(css)
                }
            ]
        },
        {
            id: 'css-responsive-portfolio',
            title: 'Responsive Portfolio Site',
            track: 'css',
            icon: '📱',
            difficulty: '🔴 Hard',
            objective: 'Style a complete responsive portfolio website that dynamically adapts between desktop 3-column layout and mobile single-column layout via @media queries.',
            requirements: [
                'Fluid grid layout for project showcase',
                'Media query breakpoint at `@media (max-width: 768px)`',
                'Mobile navigation menu adjustment',
                'Hover zoom transition effect on project thumbnails'
            ],
            skills: ['Media Queries', 'Fluid Responsive Layouts', 'CSS Transitions', 'Flex direction column fallback'],
            starterCode: {
                html: `<header class="site-header">
  <div class="logo">Alex.dev</div>
  <nav class="nav">
    <a href="#">Work</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</header>

<main class="portfolio-grid">
  <div class="project-card">
    <div class="thumb">Project Alpha</div>
    <h3>E-Commerce App</h3>
  </div>
  <div class="project-card">
    <div class="thumb">Project Beta</div>
    <h3>Social Platform</h3>
  </div>
  <div class="project-card">
    <div class="thumb">Project Gamma</div>
    <h3>AI Dashboard</h3>
  </div>
</main>`,
                css: `body { margin: 0; font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; }`
            },
            milestones: [
                {
                    step: 1,
                    title: 'Desktop Header & Navigation',
                    instructions: 'Style `.site-header` display flex, justify-content space-between, align-items center, background #1e293b, padding 1rem 2rem.',
                    hints: ['.site-header { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 1rem 2rem; }'],
                    validation: (html, css) => /\.site-header[\s\S]*?display:\s*flex/i.test(css)
                },
                {
                    step: 2,
                    title: 'Desktop Portfolio Grid',
                    instructions: 'Style `.portfolio-grid` with display grid, grid-template-columns: repeat(3, 1fr), gap 25px, max-width 1000px, padding 40px 20px, margin 0 auto.',
                    hints: ['.portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1000px; margin: 0 auto; padding: 40px 20px; }'],
                    validation: (html, css) => /\.portfolio-grid[\s\S]*?grid-template-columns/i.test(css)
                },
                {
                    step: 3,
                    title: 'Project Card & Thumbnail Hover',
                    instructions: 'Style `.thumb` with height 160px, background #334155, border-radius 8px, overflow hidden, and hover transition transform: scale(1.03).',
                    hints: ['.thumb { height: 160px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease; }', '.project-card:hover .thumb { transform: scale(1.03); }'],
                    validation: (html, css) => /\.thumb[\s\S]*?transition/i.test(css) || /:hover/i.test(css)
                },
                {
                    step: 4,
                    title: 'Tablet Media Query Breakpoint',
                    instructions: 'Add `@media (max-width: 900px)` changing `.portfolio-grid` to `grid-template-columns: repeat(2, 1fr)`.',
                    hints: ['@media (max-width: 900px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr); } }'],
                    validation: (html, css) => /@media[\s\S]*?repeat\(\s*2/i.test(css) || /@media[\s\S]*?max-width:\s*(900|768)px/i.test(css)
                },
                {
                    step: 5,
                    title: 'Mobile Media Query Breakpoint',
                    instructions: 'Add `@media (max-width: 600px)` changing `.portfolio-grid` to 1 column and `.site-header` to flex-direction column.',
                    hints: ['@media (max-width: 600px) { .portfolio-grid { grid-template-columns: 1fr; } .site-header { flex-direction: column; gap: 10px; } }'],
                    validation: (html, css) => /@media[\s\S]*?grid-template-columns:\s*1fr/i.test(css) || /@media[\s\S]*?flex-direction:\s*column/i.test(css)
                }
            ]
        }
    ]
};
