// Global Topics & Search Catalogs
const HTML_TOPICS = [
    "1. Introduction to HTML",
    "2. Basic HTML Document",
    "3. HTML Elements",
    "4. Attributes",
    "5. Headings",
    "6. Paragraphs and Basic Text",
    "7. Text Formatting",
    "8. Links",
    "9. Buttons and Hyperlinks",
    "10. Images",
    "11. Lists",
    "12. div and span",
    "13. Semantic HTML",
    "14. Tables",
    "15. Forms",
    "16. Input Types",
    "17. Textarea",
    "18. Select and Dropdown",
    "19. Form Validation",
    "20. GET and POST",
    "21. Audio and Video",
    "22. Iframe",
    "23. Figure and Figcaption",
    "24. Head Section and Metadata",
    "25. Open Graph",
    "26. CSS and JavaScript Integration",
    "27. id, class and data-*",
    "28. Accessibility",
    "29. ARIA",
    "30. Responsive Images",
    "31. Picture",
    "32. Lazy Loading",
    "33. HTML Entities",
    "34. Global Attributes",
    "35. Details and Summary",
    "36. Dialog",
    "37. Template",
    "38. SVG",
    "39. Canvas",
    "40. Web Components",
    "41. Shadow DOM",
    "42. Script Loading",
    "43. DOM",
    "44. HTTP and HTML",
    "45. Browser Rendering",
    "46. SEO",
    "47. Security Basics",
    "48. HTML Debugging and Validation",
    "49. Professional HTML Checklist",
    "50. Practice Project",
    "51. Practice Answer",
    "52. Questions and Answers"
];

const getTopicFile = (topic) => {
    let formattedId = topic.toLowerCase().replace(/^[0-9]+\.\s/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (topic.includes("Introduction")) formattedId = "introduction";
    if (topic.includes("div and span")) formattedId = "div-span";
    if (topic.includes("GET and POST")) formattedId = "get-post";
    if (topic.includes("Buttons and")) formattedId = "buttons-and-links";
    if (topic.includes("HTML Debugging")) formattedId = "html-debugging";
    return formattedId + '.html';
};

const CSS_TOPICS_CATALOG = [
    { id: 'what-is-css', title: '1. What is CSS?', category: 'Basics' },
    { id: 'css-syntax', title: '2. CSS Syntax & Rule Anatomy', category: 'Basics' },
    { id: 'ways-to-add-css', title: '3. Ways to Add CSS', category: 'Basics' },
    { id: 'element-selectors', title: '4. Element Selectors', category: 'Selectors' },
    { id: 'class-selectors', title: '5. Class Selectors (.class)', category: 'Selectors' },
    { id: 'id-selectors', title: '6. ID Selectors (#id)', category: 'Selectors' },
    { id: 'grouping-selectors', title: '7. Grouping & Universal Selectors', category: 'Selectors' },
    { id: 'combinators', title: '8. CSS Combinators', category: 'Selectors' },
    { id: 'specificity', title: '9. CSS Specificity & The Cascade', category: 'Selectors' },
    { id: 'inheritance', title: '10. CSS Inheritance', category: 'Selectors' },
    { id: 'colors', title: '11. Colors in CSS', category: 'Colors & Units' },
    { id: 'css-units', title: '12. CSS Units (px, rem, em, vh, vw)', category: 'Colors & Units' },
    { id: 'font-properties', title: '13. Font Properties', category: 'Typography' },
    { id: 'text-properties', title: '14. Text Styling Properties', category: 'Typography' },
    { id: 'web-fonts', title: '15. Web Fonts (Google Fonts)', category: 'Typography' },
    { id: 'css-box-model', title: '16. The CSS Box Model', category: 'Box Model' },
    { id: 'box-sizing', title: '17. box-sizing Property', category: 'Box Model' },
    { id: 'margin', title: '18. Margin & Margin Collapsing', category: 'Box Model' },
    { id: 'padding', title: '19. Padding', category: 'Box Model' },
    { id: 'borders', title: '20. Borders & border-radius', category: 'Box Model' },
    { id: 'width-and-height', title: '21. Width, Height & Constraints', category: 'Box Model' },
    { id: 'backgrounds', title: '22. CSS Backgrounds', category: 'Backgrounds' },
    { id: 'gradients', title: '23. CSS Gradients', category: 'Backgrounds' },
    { id: 'shadows', title: '24. Box Shadow & Text Shadow', category: 'Backgrounds' },
    { id: 'display', title: '25. The display Property', category: 'Layout' },
    { id: 'position', title: '26. CSS Positioning (relative, absolute, fixed, sticky)', category: 'Layout' },
    { id: 'z-index', title: '27. z-index & Stacking Context', category: 'Layout' },
    { id: 'overflow', title: '28. The overflow Property', category: 'Layout' },
    { id: 'flexbox-introduction', title: '29. Flexbox Introduction', category: 'Flexbox' },
    { id: 'justify-content-align-items', title: '30. justify-content & align-items', category: 'Flexbox' },
    { id: 'flex-direction-wrap-gap', title: '31. flex-direction, flex-wrap & gap', category: 'Flexbox' },
    { id: 'grid-introduction', title: '32. CSS Grid Introduction', category: 'CSS Grid' },
    { id: 'grid-template-columns', title: '33. Grid Columns, Rows & minmax()', category: 'CSS Grid' },
    { id: 'grid-placement', title: '34. Grid Item Placement & Areas', category: 'CSS Grid' },
    { id: 'responsive-design', title: '35. Responsive Design Principles', category: 'Responsive' },
    { id: 'media-queries', title: '36. CSS Media Queries & Breakpoints', category: 'Responsive' },
    { id: 'pseudo-classes', title: '37. Pseudo-classes (:hover, :focus, :nth-child)', category: 'Advanced' },
    { id: 'pseudo-elements', title: '38. Pseudo-elements (::before, ::after)', category: 'Advanced' },
    { id: 'transitions', title: '39. CSS Transitions', category: 'Transitions' },
    { id: 'transform', title: '40. CSS Transforms (2D & 3D)', category: 'Transforms' },
    { id: 'css-animations', title: '41. CSS Keyframe Animations', category: 'Animations' },
    { id: 'css-variables', title: '42. CSS Custom Properties (Variables)', category: 'Modern CSS' },
    { id: 'css-functions', title: '43. Modern CSS Functions (calc, clamp, min, max)', category: 'Modern CSS' },
    { id: 'advanced-selectors', title: '44. Advanced Selectors (:has, :is, :where)', category: 'Modern CSS' },
    { id: 'styling-buttons', title: '45. Practical Component: Buttons', category: 'Components' },
    { id: 'styling-forms', title: '46. Practical Component: Modern Form', category: 'Components' },
    { id: 'navbar-project', title: '47. Mini-Project: Responsive Navbar', category: 'Projects' },
    { id: 'card-project', title: '48. Mini-Project: Pricing / Product Cards', category: 'Projects' },
    { id: 'capstone-project', title: '49. Capstone Project: Responsive Landing Page', category: 'Projects' }
];

const PLAYGROUNDS_CATALOG = [
    { title: 'Box Model Visualizer', category: 'Playground', url: 'playgrounds.html?pg=box-model', keywords: 'box model margin padding border width height content-box border-box' },
    { title: 'Flexbox Visualizer', category: 'Playground', url: 'playgrounds.html?pg=flexbox', keywords: 'flexbox flex-direction justify-content align-items gap flex-wrap cards' },
    { title: 'CSS Grid Visualizer', category: 'Playground', url: 'playgrounds.html?pg=grid', keywords: 'grid columns rows gap fr minmax placement alignment' },
    { title: 'Position & z-index Visualizer', category: 'Playground', url: 'playgrounds.html?pg=position', keywords: 'positioning relative absolute fixed sticky top right bottom left z-index' }
];

const PROJECTS_CATALOG = [
    { title: 'Personal Profile Project', category: 'Project', url: 'projects.html#html_proj_profile', keywords: 'html bio avatar links' },
    { title: 'Resume / CV Project', category: 'Project', url: 'projects.html#html_proj_resume', keywords: 'html work experience education skills' },
    { title: 'Restaurant Menu Project', category: 'Project', url: 'projects.html#html_proj_menu', keywords: 'html food pricing sections' },
    { title: 'Blog Post Project', category: 'Project', url: 'projects.html#html_proj_blog', keywords: 'html article header author comments' },
    { title: 'Registration Form Project', category: 'Project', url: 'projects.html#html_proj_registration', keywords: 'html inputs validation submit labels' },
    { title: 'Portfolio Project', category: 'Project', url: 'projects.html#html_proj_portfolio', keywords: 'html projects contact about header' },
    { title: 'Profile Card Project', category: 'Project', url: 'projects.html#css_proj_card', keywords: 'css box-model shadow border-radius' },
    { title: 'Responsive Navbar Project', category: 'Project', url: 'projects.html#css_proj_navbar', keywords: 'css flexbox menu mobile navigation' },
    { title: 'Pricing Cards Project', category: 'Project', url: 'projects.html#css_proj_pricing', keywords: 'css flexbox grid badges comparison' },
    { title: 'Login Page Project', category: 'Project', url: 'projects.html#css_proj_login', keywords: 'css form centering gradient button inputs' },
    { title: 'Landing Page Project', category: 'Project', url: 'projects.html#css_proj_landing', keywords: 'css hero section features cta responsive' },
    { title: 'Admin Dashboard Project', category: 'Project', url: 'projects.html#css_proj_dashboard', keywords: 'css grid sidebar stats cards charts' },
    { title: 'Responsive Portfolio Project', category: 'Project', url: 'projects.html#css_proj_responsive_portfolio', keywords: 'css media queries mobile layout grid' }
];

function initMainApp() {
    // 1. Theme Toggling
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (_) {}
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            try {
                localStorage.setItem('theme', newTheme);
            } catch (_) {}
        });
    }

    // 2. Mobile Menu Toggle — with ARIA, Escape, focus trap, and backdrop
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Inject skip-to-main link if not already present
    if (!document.querySelector('.skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Inject sidebar backdrop if not present
    let sidebarBackdrop = document.querySelector('.sidebar-backdrop');
    if (!sidebarBackdrop && sidebar) {
        sidebarBackdrop = document.createElement('div');
        sidebarBackdrop.className = 'sidebar-backdrop';
        sidebarBackdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(sidebarBackdrop);
    }

    // Set sidebar ARIA attributes
    if (sidebar) {
        sidebar.setAttribute('role', 'navigation');
        sidebar.setAttribute('aria-label', 'Course topics');
    }
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'sidebar');
        mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
    }

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('open');
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileMenuToggle.setAttribute('aria-label', 'Close navigation menu');
        }
        if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
        document.body.classList.add('mobile-nav-open');
        // Focus first focusable element in sidebar
        const firstFocusable = sidebar.querySelector('a, button, [tabindex="0"]');
        if (firstFocusable) setTimeout(() => firstFocusable.focus(), 60);
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
        document.body.classList.remove('mobile-nav-open');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
        });

        // Backdrop click closes sidebar
        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener('click', closeSidebar);
            sidebarBackdrop.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        }

        // Escape key closes sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
                if (mobileMenuToggle) mobileMenuToggle.focus();
            }
        });

        // Focus trap: Tab cycles within sidebar when open on mobile
        sidebar.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || window.innerWidth > 768 || !sidebar.classList.contains('open')) return;
            const focusables = Array.from(sidebar.querySelectorAll('a[href], button, [tabindex="0"]')).filter(el => !el.closest('[hidden]') && el.offsetParent !== null);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });

        // Close sidebar on nav link click (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    closeSidebar();
                }
            }
        });
    }


    // 3. Generate Table of Contents (ToC)
    const tocList = document.getElementById('toc-list');
    const navLinks = []; 
    
    if (tocList) {
        let currentPath = window.location.pathname.split('/').pop();
        if (!currentPath || currentPath === 'index.html') currentPath = 'introduction.html';

        HTML_TOPICS.forEach((topic) => {
            const targetFile = getTopicFile(topic);
            const formattedId = targetFile.replace('.html', '');
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = targetFile;
            a.textContent = topic;
            a.dataset.targetId = formattedId;
            
            if (currentPath === targetFile) {
                a.classList.add('active');
                if (sidebar) {
                    setTimeout(() => {
                        const targetScroll = a.offsetTop - (sidebar.clientHeight / 2) + (a.clientHeight / 2);
                        sidebar.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
                    }, 100);
                }
            }
            
            a.addEventListener('click', () => {
                if (window.innerWidth <= 768 && sidebar) {
                    closeSidebar();
                }
            });
            
            li.appendChild(a);
            tocList.appendChild(li);
            navLinks.push(a);
        });

        // ── Utility nav items at bottom of sidebar ────────────────────────────
        const utilItems = [
            { href: 'projects.html',   label: '🚀 Project Hub' },
            { href: 'my-progress.html', label: '📊 My Progress' }
        ];
        utilItems.forEach(item => {
            const li = document.createElement('li');
            li.style.marginTop = item.href === 'projects.html' ? '0.5rem' : '0';
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.label;
            if (window.location.pathname.includes(item.href.replace('.html', ''))) {
                a.classList.add('active');
            }
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    // 5. Scroll Progress Bar & Back to Top (Optimized 60fps)
    const progressBar = document.getElementById('progress-bar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    let isScrollTicking = false;
    // Cache scrollHeight to avoid forced reflow on every frame
    let cachedScrollHeight = 0;
    const updateScrollHeightCache = () => {
        cachedScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    };
    updateScrollHeightCache();
    // Update cache on resize (avoid stale values on viewport change)
    window.addEventListener('resize', updateScrollHeightCache, { passive: true });

    window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                // DOM READ — batch all reads together
                const winScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
                const showBackToTop = winScroll > 450;
                const scrolledPct = cachedScrollHeight > 0
                    ? Math.min(100, Math.max(0, (winScroll / cachedScrollHeight) * 100))
                    : 0;

                // DOM WRITE — batch all writes after reads
                if (progressBar) {
                    progressBar.style.width = scrolledPct + '%';
                }
                if (backToTopBtn) {
                    if (showBackToTop) {
                        backToTopBtn.classList.remove('hidden');
                    } else {
                        backToTopBtn.classList.add('hidden');
                    }
                }
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }, { passive: true });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Copy Code Button
    const setupCopyButtons = () => {
        const copyBtns = document.querySelectorAll('.copy-button');
        copyBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', () => {
                const codeBlock = newBtn.parentElement.nextElementSibling?.querySelector('code');
                if (!codeBlock) return;
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    newBtn.textContent = 'Copied!';
                    newBtn.classList.add('copied');
                    setTimeout(() => {
                        newBtn.textContent = 'Copy';
                        newBtn.classList.remove('copied');
                    }, 2000);
                });
            });
        });
    };
    setupCopyButtons();

    // 7. Universal Lightweight Search Engine (HTML, CSS, Playgrounds, Projects)
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchInput && searchResults && searchContainer) {
        let selectedIndex = -1;
        let searchDebounceTimer = null;

        // Build Unified Search Items List
        const allSearchItems = [
            ...HTML_TOPICS.map((topic, i) => ({
                title: topic,
                badge: 'HTML',
                category: 'HTML Core',
                url: getTopicFile(topic),
                keywords: `${topic} html structure tag attribute elements`.toLowerCase()
            })),
            ...CSS_TOPICS_CATALOG.map(item => ({
                title: item.title,
                badge: 'CSS',
                category: item.category,
                url: 'css.html?topic=' + item.id,
                cssId: item.id,
                keywords: `${item.title} ${item.category} ${item.id}`.toLowerCase()
            })),
            ...PLAYGROUNDS_CATALOG.map(item => ({
                title: item.title,
                badge: 'PLAYGROUND',
                category: item.category,
                url: item.url,
                keywords: `${item.title} ${item.keywords}`.toLowerCase()
            })),
            ...PROJECTS_CATALOG.map(item => ({
                title: item.title,
                badge: 'PROJECT',
                category: item.category,
                url: item.url,
                keywords: `${item.title} ${item.keywords}`.toLowerCase()
            }))
        ];

        // Convert search icon to a real HTML button for 100% click/tap compatibility
        let searchBtn = document.getElementById('search-btn');
        const existingIcon = searchContainer.querySelector('.search-icon');
        if (!searchBtn) {
            if (existingIcon) {
                searchBtn = document.createElement('button');
                searchBtn.type = 'button';
                searchBtn.id = 'search-btn';
                searchBtn.className = 'search-btn';
                searchBtn.setAttribute('aria-label', 'Search');
                existingIcon.parentNode.insertBefore(searchBtn, existingIcon);
                searchBtn.appendChild(existingIcon);
            }
        }

        // Add Clear Button if not present
        let clearBtn = document.getElementById('search-clear-btn');
        if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.id = 'search-clear-btn';
            clearBtn.className = 'search-clear-btn hidden';
            clearBtn.setAttribute('aria-label', 'Clear search');
            clearBtn.innerHTML = '&times;';
            searchContainer.appendChild(clearBtn);
        }

        // Add Mobile Search Close Button if not present
        let closeMobileSearchBtn = document.getElementById('mobile-search-close-btn');
        if (!closeMobileSearchBtn) {
            closeMobileSearchBtn = document.createElement('button');
            closeMobileSearchBtn.type = 'button';
            closeMobileSearchBtn.id = 'mobile-search-close-btn';
            closeMobileSearchBtn.className = 'mobile-search-close-btn';
            closeMobileSearchBtn.setAttribute('aria-label', 'Close search');
            closeMobileSearchBtn.innerHTML = '&times;';
            searchContainer.appendChild(closeMobileSearchBtn);
        }

        // Ensure Mobile Search Toggle Button in Header Actions
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.getElementById('mobile-search-toggle')) {
            const mobileSearchToggle = document.createElement('button');
            mobileSearchToggle.type = 'button';
            mobileSearchToggle.id = 'mobile-search-toggle';
            mobileSearchToggle.className = 'icon-button mobile-only';
            mobileSearchToggle.setAttribute('aria-label', 'Open search');
            mobileSearchToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            `;
            headerActions.insertBefore(mobileSearchToggle, headerActions.firstChild);
            
            mobileSearchToggle.addEventListener('click', () => {
                searchContainer.classList.add('mobile-open');
                setTimeout(() => searchInput.focus(), 150);
            });
        }

        closeMobileSearchBtn.addEventListener('click', () => {
            searchContainer.classList.remove('mobile-open');
            searchResults.classList.add('hidden');
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.classList.add('hidden');
            searchResults.classList.add('hidden');
            selectedIndex = -1;
            searchInput.focus();
        });

        const performSearch = (immediate = false) => {
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length > 0) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }

            if (query.length < 2) {
                searchResults.classList.add('hidden');
                searchResults.innerHTML = '';
                selectedIndex = -1;
                return;
            }

            searchResults.innerHTML = '';
            selectedIndex = -1;

            const matches = allSearchItems.filter(item => {
                return item.title.toLowerCase().includes(query) ||
                       item.category.toLowerCase().includes(query) ||
                       item.keywords.includes(query);
            }).slice(0, 15);

            if (matches.length === 0) {
                const div = document.createElement('div');
                div.className = 'search-result-item no-match';
                div.innerHTML = `<h4>No topics found for "${query}"</h4><p>Try searching for HTML tags, CSS properties, or playgrounds</p>`;
                searchResults.appendChild(div);
            } else {
                matches.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    div.dataset.index = index;
                    
                    let badgeColor = 'var(--accent-color)';
                    if (item.badge === 'CSS') badgeColor = '#38bdf8';
                    if (item.badge === 'PROJECT') badgeColor = '#ec4899';
                    if (item.badge === 'PLAYGROUND') badgeColor = '#a855f7';

                    div.innerHTML = `
                        <div class="search-item-header">
                            <span class="search-badge" style="background:${badgeColor}20; color:${badgeColor}; border:1px solid ${badgeColor}40;">${item.badge}</span>
                            <span class="search-title">${item.title}</span>
                        </div>
                        <p class="search-category">${item.category}</p>
                    `;

                    div.addEventListener('click', () => {
                        navigateToSearchResult(item);
                    });

                    searchResults.appendChild(div);
                });
            }

            searchResults.classList.remove('hidden');
        };

        const navigateToSearchResult = (item) => {
            searchContainer.classList.remove('mobile-open');
            searchResults.classList.add('hidden');
            searchInput.value = '';
            clearBtn.classList.add('hidden');

            if (item.cssId && window.location.pathname.includes('css.html') && typeof window.renderLesson === 'function') {
                history.pushState(null, '', `?topic=${item.cssId}`);
                window.renderLesson(item.cssId);
                const mainEl = document.getElementById('main-content') || document.getElementById('css-main-content');
                if (mainEl) mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.href = item.url;
            }
        };

        const updateActiveHighlight = () => {
            const items = searchResults.querySelectorAll('.search-result-item:not(.no-match)');
            items.forEach((item, idx) => {
                if (idx === selectedIndex) {
                    item.classList.add('selected');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('selected');
                }
            });
        };

        // Debounced input for smooth typing on mobile and low-end devices
        searchInput.addEventListener('input', () => {
            if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                performSearch(false);
            }, 100);
        });

        // Search button click handler
        if (searchBtn) {
            const onSearchBtnTrigger = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (searchInput.value.trim().length >= 2) {
                    if (searchResults.classList.contains('hidden')) {
                        performSearch(true);
                    } else {
                        // Enter first result
                        const firstItem = searchResults.querySelector('.search-result-item:not(.no-match)');
                        if (firstItem) {
                            firstItem.click();
                        }
                    }
                } else {
                    searchInput.focus();
                }
            };
            searchBtn.addEventListener('click', onSearchBtnTrigger);
            searchBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSearchBtnTrigger(e);
                }
            });
        }

        // Keyboard Navigation (Arrow keys, Enter, Escape)
        searchInput.addEventListener('keydown', (e) => {
            const items = searchResults.querySelectorAll('.search-result-item:not(.no-match)');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (searchResults.classList.contains('hidden')) {
                    performSearch(true);
                    return;
                }
                if (items.length > 0) {
                    selectedIndex = (selectedIndex + 1) % items.length;
                    updateActiveHighlight();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (items.length > 0) {
                    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                    updateActiveHighlight();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (!searchResults.classList.contains('hidden') && items.length > 0) {
                    if (selectedIndex >= 0 && selectedIndex < items.length) {
                        items[selectedIndex].click();
                    } else {
                        items[0].click();
                    }
                } else if (searchInput.value.trim().length >= 2) {
                    performSearch(true);
                }
            } else if (e.key === 'Escape') {
                searchResults.classList.add('hidden');
                searchContainer.classList.remove('mobile-open');
                searchInput.blur();
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }

    // 8. Practice Answer Toggle
    const revealAnswerBtn = document.getElementById('reveal-answer-btn');
    const practiceAnswer = document.getElementById('practice-answer');
    
    if (revealAnswerBtn && practiceAnswer) {
        revealAnswerBtn.addEventListener('click', () => {
            if (practiceAnswer.classList.contains('hidden')) {
                practiceAnswer.classList.remove('hidden');
                revealAnswerBtn.textContent = 'Hide Complete Answer';
                // Automatically scroll to the answer
                setTimeout(() => {
                    practiceAnswer.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                practiceAnswer.classList.add('hidden');
                revealAnswerBtn.textContent = 'Show Complete Answer';
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainApp);
} else {
    initMainApp();
}


/* ==========================================================================
   Interactive Components (Quiz & Code Editor)
   ========================================================================== */

// 1. Quizzes Database
const quizzes = {
    'introduction': {
        q: 'What does HTML stand for?',
        options: ['Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'Home Tool Markup Language'],
        answer: 1
    },
    'basic-html-document': {
        q: 'Which tag prevents the browser from entering "Quirks Mode"?',
        options: ['<meta charset="UTF-8">', '<html>', '<!DOCTYPE html>'],
        answer: 2
    },
    'html-elements': {
        q: 'What is the correct definition of an HTML element?',
        options: ['Only the opening tag', 'Everything from the start tag to the end tag', 'Only the content inside the tags'],
        answer: 1
    },
    'attributes': {
        q: 'Where are HTML attributes specified?',
        options: ['In the closing tag', 'Inside the content', 'In the opening tag'],
        answer: 2
    },
    'headings': {
        q: 'Which heading tag is the most important for SEO and should only be used once per page?',
        options: ['<h1>', '<h3>', '<h6>'],
        answer: 0
    },
    'paragraphs-and-basic-text': {
        q: 'Which tag is used to create a paragraph?',
        options: ['<para>', '<p>', '<text>'],
        answer: 1
    },
    'text-formatting': {
        q: 'Which tag gives text strong importance and is announced with emphasis by screen readers?',
        options: ['<b>', '<strong>', '<bold>'],
        answer: 1
    },
    'links': {
        q: 'Which attribute is required for an <a> tag to make it a clickable link?',
        options: ['src', 'link', 'href'],
        answer: 2
    },
    'buttons-and-links': {
        q: 'When should you use a <button> instead of an <a> link?',
        options: ['To navigate to a new webpage URL', 'To perform an action on the current page (e.g. submit, open modal)', 'To make text look blue and underlined'],
        answer: 1
    },
    'images': {
        q: 'Which attribute is crucial for screen readers and SEO when using the <img> tag?',
        options: ['src', 'alt', 'title'],
        answer: 1
    },
    'lists': {
        q: 'Which tag creates a bulleted (unordered) list?',
        options: ['<ol>', '<ul>', '<li>'],
        answer: 1
    },
    'div-span': {
        q: 'Which of the following is an inline element?',
        options: ['<div>', '<span>', '<p>'],
        answer: 1
    },
    'semantic-html': {
        q: 'Why should we use Semantic HTML (like <article> instead of <div>)?',
        options: ['It makes the website load faster', 'It looks better visually by default', 'It improves accessibility and SEO'],
        answer: 2
    },
    'tables': {
        q: 'Which tag defines a table row?',
        options: ['<td>', '<th>', '<tr>'],
        answer: 2
    },
    'forms': {
        q: 'Which attribute specifies where to send the form-data when a form is submitted?',
        options: ['method', 'action', 'submit'],
        answer: 1
    },
    'input-types': {
        q: 'Which input type hides the characters the user types?',
        options: ['type="hidden"', 'type="text"', 'type="password"'],
        answer: 2
    },
    'textarea': {
        q: 'Unlike <input>, how do you specify the default text inside a <textarea>?',
        options: ['Using the value attribute', 'Between the opening and closing <textarea> tags', 'Using the placeholder attribute'],
        answer: 1
    },
    'select-and-dropdown': {
        q: 'Which tag is used to define items inside a <select> dropdown list?',
        options: ['<item>', '<option>', '<list>'],
        answer: 1
    },
    'form-validation': {
        q: 'Which attribute makes an input field mandatory?',
        options: ['validate', 'important', 'required'],
        answer: 2
    },
    'get-post': {
        q: 'Which HTTP method should be used when sending sensitive data (like passwords)?',
        options: ['GET', 'POST', 'It does not matter'],
        answer: 1
    },
    'audio-and-video': {
        q: 'Which attribute adds play/pause and volume controls to <video> and <audio>?',
        options: ['controls', 'autoplay', 'interface'],
        answer: 0
    },
    'iframe': {
        q: 'What is an iframe used for?',
        options: ['To embed another HTML page into the current page', 'To create a frame around an image', 'To isolate CSS styles'],
        answer: 0
    },
    'figure-and-figcaption': {
        q: 'What is the purpose of <figcaption>?',
        options: ['To style a figure', 'To provide a caption for a <figure> element', 'To draw an HTML canvas'],
        answer: 1
    },
    'head-section-and-metadata': {
        q: 'Does content inside the <head> tag render visibly on the webpage?',
        options: ['Yes', 'No', 'Only on mobile'],
        answer: 1
    },
    'open-graph': {
        q: 'What do Open Graph (og:) tags do?',
        options: ['Control how your page looks when shared on social media', 'Optimize your JavaScript', 'Make your images load faster'],
        answer: 0
    },
    'css-and-javascript-integration': {
        q: 'What is the standard way to link an external CSS file?',
        options: ['<style src="style.css">', '<script href="style.css">', '<link rel="stylesheet" href="style.css">'],
        answer: 2
    },
    'id-class-and-data': {
        q: 'Which attribute must be unique across the entire HTML document?',
        options: ['class', 'id', 'data-*'],
        answer: 1
    },
    'accessibility': {
        q: 'What is the primary goal of web accessibility?',
        options: ['Making websites load instantly', 'Ensuring websites are usable by people with disabilities', 'Improving server security'],
        answer: 1
    },
    'aria': {
        q: 'How do you make an icon-only link accessible for screen readers while hiding the decorative SVG?',
        options: ['Add aria-label to the <a> and aria-hidden="true" to the <svg>', 'Add alt="icon" to the <svg>', 'Wrap the icon in a <span> without any attributes'],
        answer: 0
    },
    'responsive-images': {
        q: 'Which attribute allows you to provide different image sizes for different screen widths?',
        options: ['sizes', 'srcset', 'src'],
        answer: 1
    },
    'picture': {
        q: 'Why use the <picture> element instead of a standard <img>?',
        options: ['To serve entirely different image files (like WebP) based on browser support', 'To draw shapes with CSS', 'To make the image load instantly'],
        answer: 0
    },
    'lazy-loading': {
        q: 'How do you natively lazy-load an image in modern HTML?',
        options: ['loading="lazy"', 'defer="true"', 'async'],
        answer: 0
    },
    'html-entities': {
        q: 'How do you display a literal "<" character on the screen without the browser thinking it is a tag?',
        options: ['<&lt>', '&lt;', '\<'],
        answer: 1
    },
    'global-attributes': {
        q: 'Which global attribute can make any HTML element editable by the user?',
        options: ['editable="true"', 'contenteditable="true"', 'user-modify="read-write"'],
        answer: 1
    },
    'details-and-summary': {
        q: 'Which native HTML elements create an expandable "accordion" without JavaScript?',
        options: ['<accordion> and <panel>', '<details> and <summary>', '<expand> and <content>'],
        answer: 1
    },
    'dialog': {
        q: 'How do you open a <dialog> element natively via JavaScript so that it acts as a modal?',
        options: ['dialog.open()', 'dialog.show()', 'dialog.showModal()'],
        answer: 2
    },
    'template': {
        q: 'Is the content inside a <template> tag visible on the page immediately?',
        options: ['Yes', 'No, it must be cloned and inserted by JavaScript', 'Only if it has the visible attribute'],
        answer: 1
    },
    'svg': {
        q: 'What is the main advantage of SVG images?',
        options: ['They are smaller file sizes than JPG', 'They can be styled with CSS and scaled infinitely without losing quality', 'They load faster on slow networks'],
        answer: 1
    },
    'canvas': {
        q: 'How do you draw graphics on a <canvas> element?',
        options: ['Using CSS', 'Using native HTML tags like <circle>', 'Using JavaScript (like getContext("2d"))'],
        answer: 2
    },
    'web-components': {
        q: 'Which API allows you to define your own custom HTML tags?',
        options: ['Custom Elements API', 'Shadow DOM', 'HTML Templates'],
        answer: 0
    },
    'shadow-dom': {
        q: 'What is the primary benefit of the Shadow DOM?',
        options: ['It hides elements from screen readers', 'It encapsulates CSS styles so they do not leak out or get overridden', 'It makes rendering 3D graphics faster'],
        answer: 1
    },
    'script-loading': {
        q: 'Which attribute downloads the script in the background but executes it only after HTML parsing is fully complete?',
        options: ['async', 'defer', 'preload'],
        answer: 1
    },
    'dom': {
        q: 'What does DOM stand for?',
        options: ['Document Object Model', 'Data Output Mechanism', 'Document Orientation Markup'],
        answer: 0
    },
    'http-and-html': {
        q: 'What HTTP status code means "Not Found"?',
        options: ['200', '404', '500'],
        answer: 1
    },
    'browser-rendering': {
        q: 'What is the correct order of the browser rendering pipeline?',
        options: ['DOM -> Paint -> Layout', 'DOM -> CSSOM -> Render Tree -> Layout -> Paint', 'CSSOM -> DOM -> Paint'],
        answer: 1
    },
    'seo': {
        q: 'Which tag is NOT relevant for SEO?',
        options: ['<h1>', '<title>', '<b>'],
        answer: 2
    },
    'security-basics': {
        q: 'What does XSS stand for?',
        options: ['Cross-Site Scripting', 'XML Style Sheets', 'Extended Secure Sockets'],
        answer: 0
    },
    'html-debugging': {
        q: 'Which tool is the industry standard for validating HTML markup compliance?',
        options: ['W3C Markup Validation Service', 'Google Analytics', 'Postman'],
        answer: 0
    },
    'professional-html-checklist': {
        q: 'Which of the following is a sign of unprofessional HTML?',
        options: ['Using <button> instead of <div> for clickable elements', 'Leaving out the <title> tag', 'Using a linter'],
        answer: 1
    },
    'practice-project': {
        q: 'When building a project, what should you structure first?',
        options: ['The JavaScript logic', 'The CSS styling', 'The Semantic HTML skeleton'],
        answer: 2
    },
    'practice-answer': {
        q: 'Is it cheating to look at the answer?',
        options: ['Yes', 'No, reading code is a great way to learn', 'Only if you do not try first'],
        answer: 2
    },
    'questions-and-answers': {
        q: 'What is the best way to remember all these HTML tags?',
        options: ['Memorize them all before coding', 'Build real projects and use documentation when needed', 'Read the HTML spec front to back'],
        answer: 1
    }
};

// 2. Inject Lightweight Quiz Engine Component
function renderQuiz() {
    let pageId = window.location.pathname.split('/').pop().replace('.html', '');
    if (!pageId || pageId === 'index') pageId = 'introduction';
    
    const mainContent = document.getElementById('main-content');
    const pagination = document.querySelector('.pagination-container');
    if (!mainContent || !pagination) return;

    // Remove legacy simple quiz if present to prevent layout clutter
    const legacyQuiz = document.querySelector('.quiz-container');
    if (legacyQuiz) {
        legacyQuiz.remove();
    }

    // Determine checkpoint mapping for groups of lessons
    let checkpointId = null;
    if (['lists', 'div-span', 'paragraphs-and-basic-text'].includes(pageId)) {
        checkpointId = 'html-foundations-checkpoint';
    } else if (['get-post', 'audio-and-video', 'forms'].includes(pageId)) {
        checkpointId = 'html-forms-media-checkpoint';
    } else if (['aria', 'responsive-images', 'accessibility'].includes(pageId)) {
        checkpointId = 'html-accessibility-semantics-checkpoint';
    }

    let quizPayload = null;

    if (checkpointId && window.quizEngineData && window.quizEngineData[checkpointId]) {
        quizPayload = {
            id: checkpointId,
            title: window.quizEngineData[checkpointId].title,
            description: window.quizEngineData[checkpointId].description,
            questions: window.quizEngineData[checkpointId].questions
        };
    } else {
        const quizData = quizzes[pageId];
        if (!quizData) return;

        const cleanTitle = pageId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        const correctOptText = quizData.options[quizData.answer];
        const explanationText = quizData.explanation || `Correct. "${correctOptText}" is the standard compliant answer for ${cleanTitle}.`;

        quizPayload = {
            id: `html_quiz_${pageId}`,
            title: `${cleanTitle} Knowledge Check`,
            description: `Verify your understanding of ${cleanTitle} before proceeding.`,
            questions: [
                {
                    type: quizData.type || 'multiple-choice',
                    question: quizData.q,
                    code: quizData.code || null,
                    options: quizData.options,
                    correct: quizData.answer,
                    explanation: explanationText
                }
            ]
        };
    }

    const quizWrapper = document.createElement('div');
    quizWrapper.id = `quiz-engine-wrapper-${pageId}`;
    mainContent.insertBefore(quizWrapper, pagination);

    const initEngine = () => {
        if (typeof QuizEngine !== 'undefined') {
            new QuizEngine({
                container: quizWrapper,
                id: quizPayload.id,
                title: quizPayload.title,
                description: quizPayload.description,
                questions: quizPayload.questions
            });
        } else {
            setTimeout(initEngine, 40);
        }
    };

    initEngine();
}

// 3. Inject Reusable Exercise System for HTML Lessons
function getHtmlChallenge(pageId) {
    const challenges = {
        'introduction': {
            title: "First Webpage Structure",
            difficulty: "Easy",
            instructions: "Create a main heading with your name and a paragraph introducing yourself.",
            starterHTML: `<!-- Welcome to HTML! Practice below -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_h1',
                    label: 'Includes an <h1> top-level heading',
                    test: (html) => /<h1[^>]*>[\s\S]*?<\/h1>/i.test(html)
                },
                {
                    id: 'has_p',
                    label: 'Includes at least one <p> paragraph tag',
                    test: (html) => /<p[^>]*>[\s\S]*?<\/p>/i.test(html)
                }
            ],
            hints: [
                "HTML elements give structural meaning to raw text on a webpage.",
                "You need two separate elements: one for the primary heading and one for paragraph body text.",
                "Use the `<h1>` tag for the heading and `<p>` for the paragraph.",
                "Syntax template:\n```html\n<h1>Your Name</h1>\n<p>Your bio goes here.</p>\n```"
            ],
            solutionHTML: "<h1>Alex Dev</h1>\n<p>I am learning modern full-stack web development with HTML and CSS!</p>",
            solutionExplanation: "The <h1> tag establishes the page's top-level topic, while the <p> tag wraps standard body text."
        },
        'basic-html-document': {
            title: "Boilerplate Document Structure",
            difficulty: "Easy",
            instructions: "Write a complete modern HTML5 boilerplate document with doctype, html, head, title, and body tags.",
            starterHTML: ``,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_doctype',
                    label: 'Includes <!DOCTYPE html> declaration',
                    test: (html) => /<!doctype\s+html>/i.test(html)
                },
                {
                    id: 'has_html_tag',
                    label: 'Wraps content in <html lang="en">',
                    test: (html) => /<html[^>]*lang=["']en["'][^>]*>[\s\S]*<\/html>/i.test(html)
                },
                {
                    id: 'has_head_and_body',
                    label: 'Contains both <head> and <body> blocks',
                    test: (html) => /<head>[\s\S]*<\/head>/i.test(html) && /<body>[\s\S]*<\/body>/i.test(html)
                }
            ],
            hints: [
                "Every professional webpage begins with the HTML5 doctype preamble.",
                "Structure the document hierarchy: `<!DOCTYPE html>` &rarr; `<html>` &rarr; `<head>` and `<body>`.",
                "Specify `<meta charset=\"UTF-8\">` and `<title>` inside the `<head>`.",
                "Syntax outline:\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>\n```"
            ],
            solutionHTML: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My First HTML Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>`,
            solutionExplanation: "The DOCTYPE informs the browser to render in standard mode, while the head contains metadata and body contains visual elements."
        },
        'html-elements': {
            title: "Elements and Nesting",
            difficulty: "Easy",
            instructions: "Create an outer container (such as a section or article) with nested heading, paragraph, and strong elements.",
            starterHTML: `<section>\n    <!-- Nest your heading and styled paragraph here -->\n</section>`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_section',
                    label: 'Uses a <section> or <article> container',
                    test: (html) => /<(section|article)[^>]*>[\s\S]*<\/\1>/i.test(html)
                },
                {
                    id: 'has_nested_strong',
                    label: 'Nests <strong> within a paragraph',
                    test: (html) => /<p[^>]*>[\s\S]*?<strong[^>]*>[\s\S]*?<\/strong>[\s\S]*?<\/p>/i.test(html)
                }
            ],
            hints: [
                "Elements consist of opening tags, content, and closing tags.",
                "Proper nesting means child tags are completely enclosed inside parent tags.",
                "Use `<section>` as the parent, `<p>` as child, and `<strong>` nested inside the `<p>`.",
                "Example:\n```html\n<section>\n  <h2>Nested</h2>\n  <p>Text with <strong>bold</strong> focus.</p>\n</section>\n```"
            ],
            solutionHTML: `<section>\n  <h2>Mastering Nesting</h2>\n  <p>Always close tags in the <strong>reverse order</strong> that they were opened.</p>\n</section>`,
            solutionExplanation: "Tags must strictly nest without overlapping tag boundaries to maintain valid DOM trees."
        },
        'attributes': {
            title: "HTML Attributes Mastery",
            difficulty: "Easy",
            instructions: "Create an image tag with src and alt attributes, and an anchor tag with href and title attributes.",
            starterHTML: `<!-- Add your image and link with required attributes -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_img_alt',
                    label: '<img> contains src and descriptive alt attribute',
                    test: (html) => /<img[^>]+src=["'][^"']+["'][^>]+alt=["'][^"']+["']/i.test(html) || /<img[^>]+alt=["'][^"']+["'][^>]+src=["'][^"']+["']/i.test(html)
                },
                {
                    id: 'has_a_href',
                    label: '<a> contains valid href attribute',
                    test: (html) => /<a[^>]+href=["'][^"']+["'][^>]*>[\s\S]*?<\/a>/i.test(html)
                }
            ],
            hints: [
                "Attributes provide extra configuration details inside the opening tag.",
                "Attributes follow the name=\"value\" key-value syntax pattern.",
                "For images, `src` and `alt` are mandatory; for links, `href` is required.",
                "Example:\n```html\n<img src=\"https://picsum.photos/200/100\" alt=\"Sample photo\">\n<a href=\"https://example.com\" title=\"Visit site\">Learn More</a>\n```"
            ],
            solutionHTML: `<img src=\"https://picsum.photos/300/150\" alt=\"Scenic mountain lake\" width=\"300\" height=\"150\">\n<a href=\"https://developer.mozilla.org\" title=\"MDN Documentation\">Explore Web Docs</a>`,
            solutionExplanation: "Attributes modify behavior or provide accessible descriptions, such as `alt` text for screen readers."
        },
        'headings': {
            title: "Heading Hierarchy",
            difficulty: "Easy",
            instructions: "Structure a document with an <h1> main title, an <h2> section, and an <h3> subsection.",
            starterHTML: `<!-- Structure your headings below -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_h1',
                    label: 'Contains exactly one <h1> heading',
                    test: (html) => (html.match(/<h1[^>]*>/gi) || []).length === 1
                },
                {
                    id: 'has_h2_h3',
                    label: 'Contains both <h2> and <h3> subheadings',
                    test: (html) => /<h2[^>]*>[\s\S]*?<\/h2>/i.test(html) && /<h3[^>]*>[\s\S]*?<\/h3>/i.test(html)
                }
            ],
            hints: [
                "Headings create an outline of your page from most important (h1) to least important (h6).",
                "Only use one <h1> per page for SEO, then use <h2> and <h3> for nested sections.",
                "The relevant tags are `<h1>`, `<h2>`, and `<h3>`.",
                "Write:\n```html\n<h1>Main Heading</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n```"
            ],
            solutionHTML: "<h1>Frontend Architecture</h1>\n<h2>Design System</h2>\n<h3>Typography Hierarchy</h3>\n<p>Detailed design tokens.</p>",
            solutionExplanation: "Headings must not skip levels (e.g. h1 straight to h3). Keeping proper order helps screen readers and search engines parse your page."
        },
        'paragraphs-and-basic-text': {
            title: "Paragraphs and Line Breaks",
            difficulty: "Easy",
            instructions: "Write two distinct paragraphs separated by a horizontal rule (<hr>) and include a line break (<br>).",
            starterHTML: `<!-- Write paragraphs with <hr> and <br> -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'two_p',
                    label: 'Contains at least 2 distinct <p> tags',
                    test: (html) => (html.match(/<p[^>]*>/gi) || []).length >= 2
                },
                {
                    id: 'has_hr_br',
                    label: 'Uses <hr> separator and <br> line break',
                    test: (html) => /<hr\s*\/?>/i.test(html) && /<br\s*\/?>/i.test(html)
                }
            ],
            hints: [
                "Browsers ignore multiple spaces and enters in HTML unless wrapped in appropriate tags.",
                "Use container tags for paragraphs and void elements for breaks.",
                "The tags are `<p>`, `<br>`, and `<hr>`.",
                "Structure:\n```html\n<p>First paragraph with<br>line break.</p>\n<hr>\n<p>Second paragraph...</p>\n```"
            ],
            solutionHTML: "<p>HTML automatically collapses extra whitespace in source code.<br>Use break tags for single line returns.</p>\n<hr>\n<p>Use &lt;p&gt; tags to separate distinct paragraphs cleanly.</p>",
            solutionExplanation: "Paragraphs have default vertical margins. Use <hr> to denote thematic breaks between sections."
        },
        'text-formatting': {
            title: "Semantic Text Formatting",
            difficulty: "Easy",
            instructions: "Write a sentence using <strong> for importance, <em> for emphasis, and <mark> for highlights.",
            starterHTML: `<!-- Add formatted text using <strong>, <em>, and <mark> -->\n<p></p>`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_strong',
                    label: 'Includes <strong> element',
                    test: (html) => /<strong[^>]*>[\s\S]*?<\/strong>/i.test(html)
                },
                {
                    id: 'has_em',
                    label: 'Includes <em> element',
                    test: (html) => /<em[^>]*>[\s\S]*?<\/em>/i.test(html)
                },
                {
                    id: 'has_mark',
                    label: 'Includes <mark> element',
                    test: (html) => /<mark[^>]*>[\s\S]*?<\/mark>/i.test(html)
                }
            ],
            hints: [
                "Formatting tags provide both visual styling and accessibility meaning.",
                "Differentiate between purely visual styling and semantic importance.",
                "Use `<strong>` instead of `<b>`, and `<em>` instead of `<i>`.",
                "Example:\n```html\n<p><strong>Warning:</strong> Sale ends <em>tonight</em>! Special <mark>50% off</mark>.</p>\n```"
            ],
            solutionHTML: "<p><strong>Important:</strong> Please submit your work by <em>Friday</em>. Check the <mark>highlighted</mark> section.</p>",
            solutionExplanation: "Screen readers change tone and volume for <strong> and <em>, whereas <b> and <i> have no semantic value."
        },
        'links': {
            title: "Hyperlink Navigation",
            difficulty: "Easy",
            instructions: "Create a link opening an external website in a new tab securely with target=\"_blank\" and rel=\"noopener noreferrer\".",
            starterHTML: `<!-- Build a secure external hyperlink -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_target_blank',
                    label: 'Includes target="_blank"',
                    test: (html) => /target=["']_blank["']/i.test(html)
                },
                {
                    id: 'has_rel_noopener',
                    label: 'Includes rel="noopener noreferrer"',
                    test: (html) => /rel=["'][^"']*noopener[^"']*["']/i.test(html)
                }
            ],
            hints: [
                "Hyperlinks allow users to navigate to other pages or external domains.",
                "Configure attributes for destination URL, target window, and security protection.",
                "The tag is `<a>`, and attributes are `href`, `target=\"_blank\"`, and `rel=\"noopener noreferrer\"`.",
                "Example syntax:\n```html\n<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">Visit Example</a>\n```"
            ],
            solutionHTML: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>`,
            solutionExplanation: "Always include `rel=\"noopener noreferrer\"` whenever using `target=\"_blank\"` to prevent tab-napping vulnerabilities."
        },
        'buttons-and-links': {
            title: "Buttons vs Links",
            difficulty: "Medium",
            instructions: "Create both a navigation link <a> that links to an ID or URL, and an action <button type=\"button\">.",
            starterHTML: `<div>\n    <!-- Add <a> and <button> here -->\n</div>`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_a_tag',
                    label: 'Includes navigation anchor <a> with href',
                    test: (html) => /<a[^>]+href=["'][^"']+["'][^>]*>[\s\S]*?<\/a>/i.test(html)
                },
                {
                    id: 'has_button_type',
                    label: 'Includes <button type="button"> or <button type="submit">',
                    test: (html) => /<button[^>]+type=["'](button|submit)["'][^>]*>[\s\S]*?<\/button>/i.test(html)
                }
            ],
            hints: [
                "Links navigate to new URLs; buttons trigger JavaScript actions or submissions.",
                "Use the correct element according to user intent rather than visual appearance.",
                "The tags are `<button type=\"button\">` and `<a href=\"...\">`.",
                "Example:\n```html\n<a href=\"#pricing\" class=\"nav-link\">View Pricing</a>\n<button type=\"button\" class=\"btn\">Buy Now</button>\n```"
            ],
            solutionHTML: `<a href="#pricing">View Pricing</a>\n<button type=\"button\">Download Report</button>`,
            solutionExplanation: "Never use <div> with click handlers when a native <button> provides built-in keyboard accessibility and focus management."
        },
        'images': {
            title: "Accessible Images",
            difficulty: "Easy",
            instructions: "Add an image with src, descriptive alt text, width, and height attributes.",
            starterHTML: `<!-- Add an accessible responsive <img> -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_img_alt',
                    label: '<img> has non-empty alt attribute',
                    test: (html) => /<img[^>]+alt=["'][^"']+["']/i.test(html)
                },
                {
                    id: 'has_dimensions',
                    label: '<img> specifies width and height attributes',
                    test: (html) => /<img[^>]+width=["'][^"']+["'][^>]+height=["'][^"']+["']/i.test(html) || /<img[^>]+height=["'][^"']+["'][^>]+width=["'][^"']+["']/i.test(html)
                }
            ],
            hints: [
                "Images are void elements (self-closing) embedded into the page.",
                "Always provide accessibility descriptions and intrinsic aspect ratio dimensions.",
                "Use the `<img>` tag with `src`, `alt`, `width`, and `height` attributes.",
                "Example:\n```html\n<img src=\"https://picsum.photos/400/250\" alt=\"Scenic mountain landscape\" width=\"400\" height=\"250\">\n```"
            ],
            solutionHTML: `<img src="https://picsum.photos/400/250" alt="Sunset over the calm ocean" width="400" height="250" loading="lazy">`,
            solutionExplanation: "The `alt` attribute is vital for screen reader users and SEO. `width` and `height` prevent layout shifts."
        },
        'lists': {
            title: "Ordered and Unordered Lists",
            difficulty: "Easy",
            instructions: "Create an unordered list (<ul>) with 3 items, and an ordered list (<ol>) with 3 numbered steps.",
            starterHTML: `<!-- Create an unordered and an ordered list below -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_ul_3_li',
                    label: 'Unordered list <ul> contains at least 3 <li> items',
                    test: (html) => {
                        const ulMatch = html.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
                        return ulMatch && (ulMatch[1].match(/<li[^>]*>/gi) || []).length >= 3;
                    }
                },
                {
                    id: 'has_ol_3_li',
                    label: 'Ordered list <ol> contains at least 3 <li> items',
                    test: (html) => {
                        const olMatch = html.match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
                        return olMatch && (olMatch[1].match(/<li[^>]*>/gi) || []).length >= 3;
                    }
                }
            ],
            hints: [
                "HTML offers bulleted lists (unordered) and numbered lists (ordered).",
                "Wrap each list item in an <li> tag inside the appropriate parent list element.",
                "Use `<ul>` for unordered lists and `<ol>` for numbered lists.",
                "Structure:\n```html\n<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>\n<ol><li>Step 1</li><li>Step 2</li><li>Step 3</li></ol>\n```"
            ],
            solutionHTML: `<h3>Tech Stack (Unordered)</h3>\n<ul>\n  <li>HTML5 Semantic Markup</li>\n  <li>Modern CSS Flexbox & Grid</li>\n  <li>JavaScript ES6+</li>\n</ul>\n\n<h3>Build Steps (Ordered)</h3>\n<ol>\n  <li>Design component wireframe</li>\n  <li>Write accessible markup</li>\n  <li>Apply responsive CSS tokens</li>\n</ol>`,
            solutionExplanation: "Only `<li>` tags are valid direct children of `<ul>` and `<ol>` elements."
        },
        'div-span': {
            title: "Block vs Inline Containers",
            difficulty: "Medium",
            instructions: "Use a block-level <div> card container and an inline <span> badge with custom styling.",
            starterHTML: `<!-- Build a div card with an embedded span badge -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_div_card',
                    label: 'Contains a <div class="profile-card">',
                    test: (html) => /<div[^>]*class=["'][^"']*profile-card[^"']*["'][^>]*>[\s\S]*?<\/div>/i.test(html)
                },
                {
                    id: 'has_span_badge',
                    label: 'Contains an inline <span class="badge">',
                    test: (html) => /<span[^>]*class=["'][^"']*badge[^"']*["'][^>]*>[\s\S]*?<\/span>/i.test(html)
                }
            ],
            hints: [
                "<div> creates a generic block container; <span> creates an inline text container.",
                "Use classes to hook CSS styles to these non-semantic utility tags.",
                "Target `<div class=\"profile-card\">` with an inner `<span class=\"badge\">`.",
                "Example:\n```html\n<div class=\"profile-card\">\n  <h3>User Profile <span class=\"badge\">Pro</span></h3>\n  <p>Software Engineer</p>\n</div>\n```"
            ],
            solutionHTML: `<div class="profile-card">\n  <h3>Alex Morgan <span class="badge">PRO MEMBER</span></h3>\n  <p>Full-Stack Web Architect</p>\n</div>`,
            solutionExplanation: "<div> creates a new block formatting context, whereas <span> allows localized styling without breaking the line flow."
        },
        'semantic-html': {
            title: "Semantic Page Architecture",
            difficulty: "Medium",
            instructions: "Construct a semantic document layout featuring <header>, <nav>, <main>, <article>, and <footer> tags.",
            starterHTML: `<!-- Assemble a full semantic webpage skeleton -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_header_nav',
                    label: 'Includes <header> and <nav> elements',
                    test: (html) => /<header[^>]*>[\s\S]*?<\/header>/i.test(html) && /<nav[^>]*>[\s\S]*?<\/nav>/i.test(html)
                },
                {
                    id: 'has_main_article_footer',
                    label: 'Includes <main>, <article>, and <footer> elements',
                    test: (html) => /<main[^>]*>[\s\S]*?<\/main>/i.test(html) && /<article[^>]*>[\s\S]*?<\/article>/i.test(html) && /<footer[^>]*>[\s\S]*?<\/footer>/i.test(html)
                }
            ],
            hints: [
                "Semantic elements explicitly convey their role to assistive technology and search engine crawlers.",
                "Replace generic divs with header, nav, main, article/section, and footer.",
                "Structure them in natural top-down reading order.",
                "Example:\n```html\n<header><nav><a href=\"#\">Home</a></nav></header>\n<main><article><h2>Post</h2><p>Content</p></article></main>\n<footer><p>&copy; 2026</p></footer>\n```"
            ],
            solutionHTML: `<header>\n  <h1>DevPortal</h1>\n  <nav>\n    <a href="#articles">Articles</a> | <a href="#about">About</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Semantic HTML5 Guide</h2>\n    <p>Semantic tags improve accessibility and SEO.</p>\n  </article>\n</main>\n<footer>\n  <p>&copy; 2026 DevPortal. All rights reserved.</p>\n</footer>`,
            solutionExplanation: "Semantic containers form accessible landmarks that screen reader users use to jump directly to primary sections."
        },
        'tables': {
            title: "Accessible Data Tables",
            difficulty: "Medium",
            instructions: "Create a data table using <table>, <caption>, <thead>, <tbody>, <tr>, <th scope=\"col\">, and <td>.",
            starterHTML: `<!-- Build a styled data table with headers and caption -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_caption',
                    label: 'Includes a <caption> describing table data',
                    test: (html) => /<caption[^>]*>[\s\S]*?<\/caption>/i.test(html)
                },
                {
                    id: 'has_thead_tbody',
                    label: 'Uses <thead> and <tbody> sections',
                    test: (html) => /<thead[^>]*>[\s\S]*?<\/thead>/i.test(html) && /<tbody[^>]*>[\s\S]*?<\/tbody>/i.test(html)
                },
                {
                    id: 'has_th_scope',
                    label: 'Uses <th scope="col"> for column headings',
                    test: (html) => /<th[^>]+scope=["']col["'][^>]*>/i.test(html)
                }
            ],
            hints: [
                "Tables present tabular data matrixes with rows and columns.",
                "Use <caption> to describe content, and <thead>/<tbody> for grouping.",
                "Add `scope=\"col\"` or `scope=\"row\"` to `<th>` tags for accessibility.",
                "Structure:\n```html\n<table>\n  <caption>Monthly Sales</caption>\n  <thead><tr><th scope=\"col\">Month</th><th scope=\"col\">Revenue</th></tr></thead>\n  <tbody><tr><td>Jan</td><td>$10,000</td></tr></tbody>\n</table>\n```"
            ],
            solutionHTML: `<table>\n  <caption>Quarterly Performance Summary</caption>\n  <thead>\n    <tr>\n      <th scope="col">Quarter</th>\n      <th scope="col">Active Users</th>\n      <th scope="col">Uptime</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Q1</td>\n      <td>120,400</td>\n      <td>99.98%</td>\n    </tr>\n    <tr>\n      <td>Q2</td>\n      <td>145,200</td>\n      <td>99.99%</td>\n    </tr>\n  </tbody>\n</table>`,
            solutionExplanation: "The caption and header scope attributes ensure screen readers can accurately map each data cell back to its column context."
        },
        'forms': {
            title: "Accessible Form Construction",
            difficulty: "Medium",
            instructions: "Build a registration form with <label for=\"...\">, linked <input id=\"...\"> fields for email & password, and a submit button.",
            starterHTML: `<!-- Build a form with linked labels, inputs, and submit button -->\n`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_form_tag',
                    label: 'Wraps controls in a <form> tag',
                    test: (html) => /<form[^>]*>[\s\S]*?<\/form>/i.test(html)
                },
                {
                    id: 'has_linked_labels',
                    label: 'Labels use "for" attribute matching input "id"',
                    test: (html) => /<label[^>]+for=["']([^"']+)["'][^>]*>[\s\S]*?<\/label>[\s\S]*?<input[^>]+id=["']\1["']/i.test(html) || /<input[^>]+id=["']([^"']+)["'][\s\S]*?<label[^>]+for=["']\1["']/i.test(html)
                },
                {
                    id: 'has_submit_btn',
                    label: 'Includes a submit button',
                    test: (html) => /<button[^>]*type=["']submit["'][^>]*>[\s\S]*?<\/button>/i.test(html) || /<input[^>]*type=["']submit["']/i.test(html)
                }
            ],
            hints: [
                "Forms collect user input and submit data to a backend handler.",
                "Every input element must be paired with an associated <label> using the `for` attribute.",
                "The elements are `<form>`, `<label for=\"...\">`, `<input id=\"...\" type=\"...\">`, and `<button type=\"submit\">`.",
                "Structure:\n```html\n<form>\n  <label for=\"email\">Email</label>\n  <input id=\"email\" type=\"email\" required>\n  <button type=\"submit\">Sign In</button>\n</form>\n```"
            ],
            solutionHTML: `<form action="/register" method="POST">\n  <label for="reg-email">Email Address:</label>\n  <input type="email" id="reg-email" name="email" required placeholder="you@example.com">\n\n  <label for="reg-pass">Password (min 8 chars):</label>\n  <input type="password" id="reg-pass" name="password" minlength="8" required>\n\n  <button type="submit">Create Account</button>\n</form>`,
            solutionExplanation: "Associating `<label for=\"id\">` with `<input id=\"id\">` makes the form accessible to screen readers and increases the tap target area on mobile."
        },
        'input-types': {
            title: "Modern HTML5 Input Types",
            difficulty: "Medium",
            instructions: "Create a form showcasing number, date, range, and color inputs with labels.",
            starterHTML: `<!-- Add specialized HTML5 input types -->\n<form>\n</form>`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_number_date',
                    label: 'Includes type="number" and type="date" inputs',
                    test: (html) => /type=["']number["']/i.test(html) && /type=["']date["']/i.test(html)
                },
                {
                    id: 'has_range_color',
                    label: 'Includes type="range" and type="color" inputs',
                    test: (html) => /type=["']range["']/i.test(html) && /type=["']color["']/i.test(html)
                }
            ],
            hints: [
                "HTML5 introduced semantic input types that invoke native OS pickers and soft keyboards.",
                "Use attributes type=\"number\", type=\"date\", type=\"range\", and type=\"color\".",
                "Ensure each input has a corresponding label.",
                "Example:\n```html\n<input type=\"color\" id=\"theme\">\n<input type=\"range\" id=\"vol\" min=\"0\" max=\"100\">\n```"
            ],
            solutionHTML: `<form>\n  <label for="qty">Quantity (1-10):</label>\n  <input type="number" id="qty" min="1" max="10" value="1">\n\n  <label for="dob">Booking Date:</label>\n  <input type="date" id="dob">\n\n  <label for="volume">Volume Slider:</label>\n  <input type="range" id="volume" min="0" max="100" value="75">\n\n  <label for="brand-color">Brand Color:</label>\n  <input type="color" id="brand-color" value="#2563eb">\n</form>`,
            solutionExplanation: "Using specialized input types gives mobile users tailored keypads (e.g. numeric dials) and improves validation reliability."
        },
        'aria': {
            title: "Accessible Icon Link with ARIA",
            difficulty: "Medium",
            instructions: "Create an accessible icon link to https://x.com with aria-label=\"Follow us on X\" and an embedded <svg> with aria-hidden=\"true\".",
            starterHTML: `<!-- Build an accessible SVG icon link with ARIA -->\n<a href="https://x.com">\n  <!-- Add your SVG with aria-hidden="true" -->\n</a>`,
            starterCSS: ``,
            validationRules: [
                {
                    id: 'has_aria_label',
                    label: '<a> tag has aria-label="Follow us on X"',
                    test: (html) => /<a[^>]+aria-label=["'][^"']*follow\s+us\s+on\s+x[^"']*["']/i.test(html)
                },
                {
                    id: 'has_aria_hidden_svg',
                    label: '<svg> tag has aria-hidden="true"',
                    test: (html) => /<svg[^>]+aria-hidden=["']true["']/i.test(html)
                }
            ],
            hints: [
                "Screen readers cannot understand raw SVG vectors or path coordinates unless given an accessible label.",
                "Add `aria-label` to the parent anchor `<a>` so screen readers announce the destination.",
                "Add `aria-hidden=\"true\"` to the `<svg>` child element to hide decorative graphic paths from the screen reader.",
                "Syntax template:\n```html\n<a href=\"https://x.com\" aria-label=\"Follow us on X\">\n  <svg aria-hidden=\"true\" viewBox=\"0 0 24 24\">\n    <path d=\"...\"/>\n  </svg>\n</a>\n```"
            ],
            solutionHTML: `<!-- The screen reader will now correctly announce: "Link, Follow us on X" -->\n<a href="https://x.com" aria-label="Follow us on X">\n  <!-- Place your fixed SVG or icon span here -->\n  <svg aria-hidden="true" viewBox="0 0 24 24">\n    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>\n  </svg>\n</a>`,
            solutionExplanation: "The `aria-label` attribute provides the link with an accessible name ('Follow us on X') for screen readers, while `aria-hidden=\"true\"` on the `<svg>` prevents assistive technology from trying to announce raw graphic paths."
        }
    };

    if (challenges[pageId]) {
        return challenges[pageId];
    }

    // Dynamic generation for all remaining HTML topics
    const cleanTitle = pageId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    // Determine difficulty by topic complexity
    let difficulty = 'Easy';
    const mediumTopics = ['canvas', 'web-components', 'shadow-dom', 'practice-project'];
    const intermediateTopics = ['form-validation', 'get-post', 'audio-and-video', 'iframe', 'accessibility', 'aria', 'dialog', 'svg', 'script-loading', 'dom', 'seo', 'security-basics'];
    if (mediumTopics.includes(pageId)) {
        difficulty = 'Hard';
    } else if (intermediateTopics.includes(pageId)) {
        difficulty = 'Medium';
    }

    return {
        title: `${cleanTitle} Practice Challenge`,
        difficulty: difficulty,
        instructions: `Practice applying ${cleanTitle} markup and concepts in the live code sandbox below.`,
        starterHTML: `<!-- ${cleanTitle} Sandbox -->\n<div>\n  <h2>${cleanTitle}</h2>\n  <p>Write your markup here...</p>\n</div>`,
        starterCSS: ``,
        validationRules: [
            {
                id: 'rule_valid_markup',
                label: `Contains semantic markup implementing ${cleanTitle}`,
                test: (html) => {
                    const clean = html.trim().toLowerCase();
                    return clean.length > 25 && clean.includes('<');
                }
            }
        ],
        hints: [
            `Think about the core purpose of ${cleanTitle} in modern semantic web development.`,
            `Identify the specific HTML tags or attributes introduced in this lesson.`,
            `Check the code examples in the lesson above to verify tag names and attribute syntax.`,
            `Draft your markup in the HTML editor pane, observing the live preview to verify formatting.`
        ],
        solutionHTML: `<!-- ${cleanTitle} Solution -->\n<div>\n  <h2>${cleanTitle} Implemented</h2>\n  <p>Standard compliant HTML5 markup demonstrated.</p>\n</div>`,
        solutionExplanation: `Applying semantic HTML tags and best practices ensures optimal accessibility, SEO ranking, and maintainability.`
    };
}

// 3. Inject Reusable Live Code Editor Component
function renderLiveEditor() {
    let pageId = window.location.pathname.split('/').pop().replace('.html', '');
    if (!pageId || pageId === 'index') pageId = 'introduction';
    if (pageId === 'css') return; // Handled by css-app.js
    
    const mainContent = document.getElementById('main-content');
    const pagination = document.querySelector('.pagination-container');
    if (!mainContent || !pagination) return;

    // Remove legacy static editor placeholders if present to prevent duplication
    const legacyEditor = document.getElementById('practice-editor');
    if (legacyEditor) {
        legacyEditor.remove();
    }

    const section = document.createElement('div');
    section.id = 'practice-editor';
    mainContent.insertBefore(section, pagination);

    const challengeData = getHtmlChallenge(pageId);

    const initEditor = () => {
        if (typeof InteractiveCodeEditor !== 'undefined') {
            new InteractiveCodeEditor({
                container: section,
                id: `html_${pageId}`,
                title: challengeData.title || 'Interactive HTML Sandbox',
                starterHTML: challengeData.starterHTML || '<h1>Hello World</h1>\n<p>Start practicing!</p>',
                starterCSS: '',
                showCSS: false
            });
        } else {
            setTimeout(initEditor, 40);
        }
    };

    initEditor();
}

// Call the render functions
function initPageEnhancements() {
    renderQuiz();
    renderLiveEditor();
    
    // Student Progress System Initialization
    let pageId = window.location.pathname.split('/').pop().replace('.html', '');
    if (!pageId || pageId === 'index') pageId = 'introduction';

    const initProgressTrack = () => {
        if (window.progressSystem) {
            const headingEl = document.querySelector('h1');
            const pageTitle = headingEl ? headingEl.textContent.trim() : pageId;
            window.progressSystem.visitLesson(pageId, pageTitle, 'html', `${pageId}.html`);
            window.progressSystem.mountDashboardButton();
        } else {
            setTimeout(initProgressTrack, 40);
        }
    };
    initProgressTrack();

    // Inject Course Switcher
    const logoContainer = document.querySelector('.logo');
    if (logoContainer && !document.getElementById('course-switcher')) {
        const isCss = window.location.pathname.includes('css.html');
        logoContainer.innerHTML = `
            <select id="course-switcher" style="background: transparent; border: none; font-size: 1.25rem; font-weight: 700; color: var(--text-primary); cursor: pointer; outline: none;">
                <option value="html" ${!isCss ? 'selected' : ''}>HTML Mastery</option>
                <option value="css" ${isCss ? 'selected' : ''}>CSS Mastery</option>
            </select>
        `;
        document.getElementById('course-switcher').addEventListener('change', (e) => {
            if (e.target.value === 'css') {
                window.location.href = 'css.html';
            } else {
                window.location.href = 'introduction.html';
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageEnhancements);
} else {
    initPageEnhancements();
}

// ── Service Worker Registration ──────────────────────────────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => {
                // Check for updates every 60 minutes
                setInterval(() => reg.update(), 60 * 60 * 1000);
            })
            .catch(err => console.warn('[SW] Registration failed:', err.message));
    });
}
