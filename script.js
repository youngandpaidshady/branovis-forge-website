// ===========================================
// Main Script - Branovis Forge Website
// ===========================================

// Import GSAP dynamically
let gsap, ScrollTrigger;
async function loadGSAP() {
    try {
        const gsapModule = await import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm');
        const scrollTriggerModule = await import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js');
        gsap = gsapModule.gsap || gsapModule.default;
        ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        if (ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }
    } catch (error) {
        console.warn('GSAP loading failed, continuing without animations:', error);
    }
}

// Initialize everything when DOM is ready
function initAllScripts() {
    // Hide loader immediately if page already loaded
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader && document.readyState === 'complete') {
        pageLoader.classList.add('hidden');
        document.body.classList.remove('loading');
        document.body.style.overflow = '';
    }
    
    initPageLoader();
    initScrollProgressBar();
    initNavigation();
    initBackToTop();
    initFloatingQuickAccess();
    initFAQ();
    initContactForm();
    initProjectFilters();
    initProjectModal();
    initConstructionMaterialsRain();
    initConstructionToolsFloating();
    initConstructionEquipment3D();
    initConstructionBeams3D();
    initConstructionParticles3D();
    initConstructionIconsFloating();
    initBlogFilters();
    initBlogReadMore();
    initLogoAnimations();
    
    // Initialize stats counter with delay to ensure DOM is ready
    setTimeout(() => {
        initStatsCounter();
    }, 500);
    
    // Load GSAP and initialize animations (non-blocking)
    loadGSAP().then(() => {
        if (gsap) {
            initScrollAnimations();
            initContactPageAnimations();
            initPageHeaderAnimations();
        }
    }).catch(err => {
        console.warn('GSAP failed to load, continuing without animations:', err);
    });
    
    // Initialize page header animations even without GSAP
    initPageHeaderAnimations();
    
    // Ensure hero animations are initialized after GSAP loads
    if (document.querySelector('.hero')) {
        loadGSAP().then(() => {
        setTimeout(() => {
            createHeroParticles();
            initHero3DBackground();
        }, 300);
        });
    }
}

// Wait for DOM
if (document.readyState === 'loading') {
    document.body.classList.add('loading');
    document.addEventListener('DOMContentLoaded', initAllScripts);
} else {
    initAllScripts();
}

// Fallback: Always hide loader after max time
setTimeout(() => {
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
        document.body.classList.remove('loading');
        document.body.style.overflow = '';
    }
}, 5000);

// ===========================================
// Page Loader
// ===========================================
function initPageLoader() {
    const pageLoader = document.getElementById('page-loader');
    if (!pageLoader) return;

    function hideLoader() {
        if (pageLoader && !pageLoader.classList.contains('hidden')) {
            pageLoader.classList.add('hidden');
            document.body.classList.remove('loading');
            document.body.style.overflow = '';
        }
    }

    // Hide immediately if page is already loaded
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 200);
        return;
    }

    // Hide on window load
    const loadHandler = () => {
        setTimeout(hideLoader, 200);
    };
    window.addEventListener('load', loadHandler);
    
    // Also try on DOMContentLoaded
    if (document.readyState === 'interactive') {
        setTimeout(hideLoader, 500);
    }

    // Fallback timeout - always hide after 2 seconds
    setTimeout(hideLoader, 2000);
}

// ===========================================
// Scroll Progress Bar
// ===========================================
function initScrollProgressBar() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
}

// ===========================================
// Navigation
// ===========================================
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!header) return;

    // Sticky header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle with animation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            if (navToggle) navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('show-menu');
                if (navToggle) navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
}

// ===========================================
// Logo 3D Animations
// ===========================================
function initLogoAnimations() {
    const navLogo = document.querySelector('.nav-logo');
    if (!navLogo) return;

    const logoWrapper = navLogo.querySelector('.logo-3d-wrapper');
    const logoSvg = navLogo.querySelector('.logo-svg');
    
    if (logoWrapper && logoSvg) {
        // Enhanced mouse tracking with 3D effects
        navLogo.addEventListener('mousemove', (e) => {
            const rect = navLogo.getBoundingClientRect();
            const logoRect = logoWrapper.getBoundingClientRect();
            const x = e.clientX - logoRect.left - logoRect.width / 2;
            const y = e.clientY - logoRect.top - logoRect.height / 2;
            
            const rotateX = (y / (logoRect.height / 2)) * -15;
            const rotateY = (x / (logoRect.width / 2)) * 15;
            
            logoWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.1)`;
            logoSvg.style.transform = `translateZ(20px) scale(1.2)`;
            logoSvg.style.filter = `drop-shadow(0 8px 20px rgba(247, 184, 1, 0.8))`;
        });
        
        navLogo.addEventListener('mouseleave', () => {
            logoWrapper.style.transform = '';
            logoSvg.style.transform = '';
            logoSvg.style.filter = '';
        });

        // Click animation
        navLogo.addEventListener('click', () => {
            logoWrapper.style.animation = 'none';
            setTimeout(() => {
                logoWrapper.style.animation = 'logoClick 0.6s ease';
            }, 10);
        });
    }

    // Add CSS animation for click
    if (!document.getElementById('logo-animations-style')) {
        const style = document.createElement('style');
        style.id = 'logo-animations-style';
        style.textContent = `
            @keyframes logoClick {
                0%, 100% { transform: scale(1) rotateY(0deg); }
                50% { transform: scale(1.2) rotateY(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===========================================
// Back to Top Button
// ===========================================
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================================
// Floating Quick Access
// ===========================================
function initFloatingQuickAccess() {
    const floatingToggle = document.getElementById('floating-toggle');
    const floatingAccess = document.getElementById('floating-quick-access');
    
    if (!floatingToggle || !floatingAccess) return;

    floatingToggle.addEventListener('click', () => {
        floatingAccess.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatingAccess.contains(e.target)) {
            floatingAccess.classList.remove('active');
        }
    });
}

// ===========================================
// FAQ Accordion
// ===========================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===========================================
// Contact Form
// ===========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formMessage = document.getElementById('form-message');
        const formData = new FormData(contactForm);
        
        // Simple validation
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        if (!name || !email || !phone || !message) {
            if (formMessage) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.className = 'form-message error';
            }
            return;
        }

        // Simulate form submission
        if (formMessage) {
            formMessage.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        }
    });
}

// ===========================================
// Project Filters
// ===========================================
let activeFilters = {
    market: 'all',
    service: 'all',
    location: 'all',
    search: ''
};

function initProjectFilters() {
    const projectCards = document.querySelectorAll('.project-card-3d, .project-card');
    if (projectCards.length === 0) return;

    // Search input
    const projectSearch = document.getElementById('project-search');
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            activeFilters.search = e.target.value.toLowerCase().trim();
            filterProjects();
        });
    }

    // Filter pills (new design)
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked pill
            pill.classList.add('active');
            
            // Get filter value
            const filterValue = pill.getAttribute('data-filter') || 'all';
            activeFilters.market = filterValue;
            
            filterProjects();
        });
    });

    // Legacy dropdown support (if exists)
    const filterToggles = document.querySelectorAll('.filter-dropdown-toggle');
    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = toggle.closest('.filter-dropdown');
            if (!dropdown) return;
            
            document.querySelectorAll('.filter-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            
            dropdown.classList.toggle('active');
        });
    });

    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = option.closest('.filter-dropdown');
            if (!dropdown) return;
            
            const type = option.getAttribute('data-type');
            const value = option.getAttribute('data-filter') || 
                         option.getAttribute('data-service') || 
                         option.getAttribute('data-location') || 'all';
            
            const menu = option.closest('.filter-dropdown-menu');
            if (menu) {
                menu.querySelectorAll('.filter-option').forEach(opt => {
                    opt.classList.remove('active');
                });
            }
            option.classList.add('active');
            
            if (type && activeFilters.hasOwnProperty(type)) {
                activeFilters[type] = value;
                filterProjects();
            }
            
            const toggle = dropdown.querySelector('.filter-toggle-label');
            if (toggle) {
                toggle.textContent = option.textContent.trim();
            }
            
            dropdown.classList.remove('active');
        });
    });

    // Initial filter
    filterProjects();
}

function filterProjects() {
    const projectCards = document.querySelectorAll('.project-card-3d, .project-card');
    const countElement = document.getElementById('count-number');
    const noProjects = document.getElementById('no-projects');
    let visibleCount = 0;

    projectCards.forEach(card => {
        const industry = card.getAttribute('data-industry') || '';
        const service = card.getAttribute('data-service') || '';
        const location = card.getAttribute('data-location') || '';
        const searchText = card.getAttribute('data-search') || '';

        const marketMatch = activeFilters.market === 'all' || industry === activeFilters.market;
        const serviceMatch = activeFilters.service === 'all' || service === activeFilters.service;
        const locationMatch = activeFilters.location === 'all' || location === activeFilters.location;
        const searchMatch = !activeFilters.search || 
                           searchText.toLowerCase().includes(activeFilters.search) ||
                           card.querySelector('h3')?.textContent.toLowerCase().includes(activeFilters.search) ||
                           card.querySelector('p')?.textContent.toLowerCase().includes(activeFilters.search);

        if (marketMatch && serviceMatch && locationMatch && searchMatch) {
            card.style.display = '';
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });

    if (countElement) {
        countElement.textContent = visibleCount;
    }

    if (noProjects) {
        noProjects.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// ===========================================
// Project Modal
// ===========================================
const projectData = {
    'kitchen-remodel': {
        title: 'Modern Kitchen Remodel',
        category: 'Remodeling',
        duration: '10 weeks',
        location: 'Atlanta, GA',
        description: 'Complete kitchen transformation featuring custom cabinetry, quartz countertops, and state-of-the-art appliances. Open concept design with improved functionality and modern aesthetics.',
        details: ['Custom-built cabinetry', 'Quartz countertops', 'High-end appliances', 'Recessed lighting', 'Large center island', 'Modern backsplash'],
        images: {
            before: ['https://images.unsplash.com/photo-1556912172-47b7a9a4d5c8?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1556912173-5d9136c0d2e3?w=1200&h=800&fit=crop']
        }
    },
    'bathroom-remodel': {
        title: 'Luxury Master Bathroom',
        category: 'Remodeling',
        duration: '8 weeks',
        location: 'Atlanta, GA',
        description: 'Spacious master bathroom renovation with walk-in shower, freestanding tub, and premium fixtures. Elegant tile work and custom vanity design create a spa-like retreat.',
        details: ['Walk-in glass shower', 'Freestanding tub', 'Custom vanity', 'Heated floors', 'LED lighting', 'Premium fixtures'],
        images: {
            before: ['https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&h=800&fit=crop']
        }
    },
    'home-renovation': {
        title: 'Complete Home Renovation',
        category: 'Renovation',
        duration: '5 months',
        location: 'Charlotte, NC',
        description: 'Full home renovation project including structural updates, new flooring, updated electrical and plumbing systems, and modern interior finishes throughout the entire property.',
        details: ['Structural updates', 'New flooring', 'Updated electrical', 'Updated plumbing', 'Modern finishes', 'Energy-efficient systems'],
        images: {
            before: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop']
        }
    },
    'office-renovation': {
        title: 'Office Building Renovation',
        category: 'Renovation',
        duration: '4 months',
        location: 'Chicago, IL',
        description: 'Complete renovation of 10,000 sq ft office space including modern open floor plan, upgraded HVAC systems, new lighting, and contemporary finishes.',
        details: ['Modern open floor plan', 'Upgraded HVAC', 'New lighting systems', 'Contemporary finishes', 'Improved workflow'],
        images: {
            before: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop']
        }
    },
    'hospital-expansion': {
        title: 'Hospital Medical Wing Expansion',
        category: 'New Construction',
        duration: '18 months',
        location: 'Charlotte, NC',
        description: 'Large-scale hospital expansion project adding 120,000 sq ft of new medical facilities including patient rooms, surgical suites, and state-of-the-art medical equipment integration. Completed while maintaining full hospital operations.',
        details: ['120,000 sq ft expansion', 'Patient rooms', 'Surgical suites', 'Medical equipment integration', 'Zero patient disruption'],
        images: {
            before: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop']
        }
    },
    'hotel-construction': {
        title: 'Luxury Hotel Construction',
        category: 'New Construction',
        duration: '20 months',
        location: 'Miami, FL',
        description: 'New construction of a 200-room luxury hotel featuring elegant architecture, premium finishes, spa facilities, fine dining restaurant, and extensive conference facilities.',
        details: ['200 luxury rooms', 'Spa facilities', 'Fine dining restaurant', 'Conference facilities', 'Premium finishes'],
        images: {
            before: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop']
        }
    },
    'manufacturing-facility': {
        title: 'Manufacturing Facility',
        category: 'New Construction',
        duration: '16 months',
        location: 'Chicago, IL',
        description: 'New construction of a 180,000 sq ft manufacturing facility with specialized production lines, warehouse space, and administrative offices.',
        details: ['180,000 sq ft facility', 'Specialized production lines', 'Warehouse space', 'Administrative offices', 'Advanced HVAC systems'],
        images: {
            before: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop']
        }
    },
    'warehouse-construction': {
        title: 'Distribution Warehouse Facility',
        category: 'New Construction',
        duration: '14 months',
        location: 'Atlanta, GA',
        description: 'Construction of a 250,000 sq ft state-of-the-art distribution warehouse facility featuring advanced material handling systems, climate control, and extensive loading dock infrastructure.',
        details: ['250,000 sq ft facility', 'Material handling systems', 'Climate control', 'Loading dock infrastructure', 'Automated systems'],
        images: {
            before: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop']
        }
    },
    'stadium-construction': {
        title: 'Multi-Purpose Stadium Construction',
        category: 'New Construction',
        duration: '24 months',
        location: 'Dallas, TX',
        description: 'Construction of a state-of-the-art 50,000-seat multi-purpose stadium featuring retractable roof, luxury suites, premium seating areas, and comprehensive hospitality facilities.',
        details: ['50,000-seat capacity', 'Retractable roof', 'Luxury suites', 'Premium seating', 'Hospitality facilities'],
        images: {
            before: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop'],
            after: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop']
        }
    },
    'farmhouse-kitchen-renovation': {
        title: 'Farmhouse Kitchen Renovation',
        category: 'Remodeling',
        duration: '12 weeks',
        location: 'Vermont',
        description: 'Comprehensive farmhouse kitchen renovation featuring rustic design elements, modern functionality, and premium finishes. This project transformed an outdated kitchen into a beautiful, functional space that combines classic farmhouse charm with contemporary convenience.',
        details: ['Rustic design elements', 'Modern appliances', 'Custom cabinetry', 'Farmhouse sink', 'Reclaimed wood accents', 'Updated lighting'],
        images: {
            before: ['img/projects/scraped_farmhouse-kitchen-renovation.jpg'],
            after: ['img/projects/scraped_farmhouse-kitchen-renovation.jpg']
        }
    },
    'williston-bathroom-remodel': {
        title: 'Williston Bathroom Remodel',
        category: 'Remodeling',
        duration: '8 weeks',
        location: 'Williston, VT',
        description: 'Complete bathroom remodel in Williston featuring modern fixtures, elegant tile work, and spa-like amenities. The design focuses on comfort, style, and functionality with premium materials and expert craftsmanship.',
        details: ['Modern fixtures', 'Elegant tile work', 'Spa-like amenities', 'Custom vanity', 'Updated plumbing', 'LED lighting'],
        images: {
            before: ['img/projects/scraped_williston-bathroom-remodel.jpg'],
            after: ['img/projects/scraped_williston-bathroom-remodel.jpg']
        }
    },
    'charlotte-library-addition': {
        title: 'Charlotte Library Addition',
        category: 'New Construction',
        duration: '10 months',
        location: 'Charlotte, VT',
        description: 'Expansion project for the Charlotte Library, adding significant new space for community programs and services. This addition seamlessly integrates with the existing structure while providing modern facilities and improved accessibility.',
        details: ['Community program space', 'Improved accessibility', 'Modern facilities', 'Seamless integration', 'Increased capacity', 'Enhanced services'],
        images: {
            before: ['img/projects/scraped_charlotte-library-addition.jpg'],
            after: ['img/projects/scraped_charlotte-library-addition.jpg']
        }
    },
    'burlington-kitchen-remodel': {
        title: 'Burlington Kitchen Remodel',
        category: 'Remodeling',
        duration: '10 weeks',
        location: 'Burlington, VT',
        description: 'Complete kitchen renovation in Burlington designed to improve usability and modern aesthetics. The project features updated cabinetry, new countertops, premium appliances, and an improved layout that maximizes both function and style.',
        details: ['Updated cabinetry', 'New countertops', 'Premium appliances', 'Improved layout', 'Modern design', 'Enhanced functionality'],
        images: {
            before: ['img/projects/scraped_burlington-kitchen-remodel.jpg'],
            after: ['img/projects/scraped_burlington-kitchen-remodel.jpg']
        }
    }
};

function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const viewProjectBtns = document.querySelectorAll('.btn-view-project');

    if (!modal) return;

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        const content = document.getElementById('project-detail-content');
        if (content) {
            content.innerHTML = `
                <h2>${project.title}</h2>
                <p><strong>Category:</strong> ${project.category}</p>
                <p><strong>Duration:</strong> ${project.duration}</p>
                <p><strong>Location:</strong> ${project.location}</p>
                <p>${project.description}</p>
                <h3>Project Details</h3>
                <ul>
                    ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            `;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            if (projectId) openModal(projectId);
        });
    });

    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
}

// ===========================================
// Blog Filters
// ===========================================
function initBlogFilters() {
    const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (blogFilterBtns.length === 0) return;

    blogFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active state
            blogFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category') || '';
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===========================================
// Blog Read More Links
// ===========================================
function initBlogReadMore() {
    const blogLinks = document.querySelectorAll('.blog-card-link');
    
    blogLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const blogCard = link.closest('.blog-card');
            const blogTitle = blogCard.querySelector('.blog-card-title')?.textContent || 'Blog Post';
            
            // Create modal or expand content
            showBlogPostModal(blogTitle, link.getAttribute('href'));
        });
    });
}

// Blog post content data
const blogPostContent = {
    'blog-post-kitchen-renovation.html': {
        title: '10 Essential Tips for Planning Your Kitchen Renovation',
        date: 'March 15, 2024',
        category: 'Remodeling',
        readTime: '5 min read',
        content: `
            <p>Planning a kitchen renovation can be both exciting and overwhelming. With so many decisions to make, it's essential to approach your project with a clear strategy. Here are 10 expert tips to help you plan your kitchen renovation successfully.</p>
            
            <h3>1. Set a Realistic Budget</h3>
            <p>Before you start, determine how much you can realistically spend. Include a 10-20% contingency fund for unexpected expenses. Research average costs in your area and prioritize what's most important to you.</p>
            
            <h3>2. Plan Your Layout Carefully</h3>
            <p>The kitchen triangle (sink, stove, refrigerator) is still a fundamental design principle. Ensure these three key areas form an efficient work triangle with clear pathways between them.</p>
            
            <h3>3. Choose Quality Materials</h3>
            <p>Invest in durable materials that will stand the test of time. Quality cabinets, countertops, and appliances may cost more upfront but will save you money in the long run.</p>
            
            <h3>4. Consider Storage Solutions</h3>
            <p>Maximize your storage with pull-out drawers, corner cabinets, and vertical storage. Think about how you use your kitchen and design storage accordingly.</p>
            
            <h3>5. Lighting is Key</h3>
            <p>Plan for layered lighting: ambient, task, and accent lighting. Under-cabinet lighting is essential for food preparation, while pendant lights can add style and functionality.</p>
            
            <h3>6. Select Appliances Early</h3>
            <p>Choose your appliances before finalizing cabinet designs. This ensures proper fit and allows for any special requirements or modifications.</p>
            
            <h3>7. Think About Ventilation</h3>
            <p>A quality range hood is essential for removing cooking odors and maintaining air quality. Consider the size and power needed for your cooking style.</p>
            
            <h3>8. Plan for Electrical Outlets</h3>
            <p>Ensure you have enough outlets in convenient locations. Consider USB outlets, appliance garages, and outlets in drawers for charging devices.</p>
            
            <h3>9. Work with Reputable Contractors</h3>
            <p>Research and interview multiple contractors. Check references, licenses, and insurance. A good contractor will help you avoid costly mistakes.</p>
            
            <h3>10. Allow for Timeline Flexibility</h3>
            <p>Renovations often take longer than expected. Build in buffer time for delays, especially if you're ordering custom items or dealing with permit approvals.</p>
            
            <p>By following these tips and working with experienced professionals, you can create a kitchen that's both beautiful and functional. Remember, good planning is the foundation of a successful renovation.</p>
        `
    },
    'blog-post-sustainable-building.html': {
        title: 'Sustainable Building Practices: The Future of Construction',
        date: 'February 28, 2024',
        category: 'Industry Trends',
        readTime: '7 min read',
        content: `
            <p>The construction industry is undergoing a significant transformation as sustainable building practices become the standard rather than the exception. From energy-efficient designs to eco-friendly materials, green construction is shaping the future of how we build.</p>
            
            <h3>The Rise of Sustainable Materials</h3>
            <p>Modern construction increasingly relies on sustainable materials such as recycled steel, bamboo, reclaimed wood, and low-impact concrete alternatives. These materials not only reduce environmental impact but often provide superior performance and durability.</p>
            
            <h3>Energy Efficiency in Design</h3>
            <p>Passive solar design, high-performance insulation, and energy-efficient windows are becoming standard features. Buildings are now designed to minimize energy consumption while maximizing comfort and functionality.</p>
            
            <h3>Water Conservation Strategies</h3>
            <p>Rainwater harvesting systems, greywater recycling, and low-flow fixtures help reduce water consumption. Smart irrigation systems and drought-resistant landscaping further contribute to water conservation.</p>
            
            <h3>Renewable Energy Integration</h3>
            <p>Solar panels, wind turbines, and geothermal systems are being integrated into building designs from the start. Net-zero energy buildings are becoming more common as technology improves and costs decrease.</p>
            
            <h3>Waste Reduction</h3>
            <p>Construction waste management has become a priority, with recycling programs and material reuse strategies reducing landfill waste. Prefabrication and modular construction also minimize on-site waste.</p>
            
            <h3>Green Building Certifications</h3>
            <p>LEED, Energy Star, and other certification programs provide frameworks for sustainable construction. These certifications not only benefit the environment but also increase property values and reduce operating costs.</p>
            
            <p>As we move forward, sustainable building practices will continue to evolve, driven by innovation, environmental responsibility, and economic benefits. The future of construction is green, and it's happening now.</p>
        `
    },
    'blog-post-home-additions.html': {
        title: 'Complete Guide to Home Additions: What You Need to Know',
        date: 'January 22, 2024',
        category: 'Tips & Advice',
        readTime: '6 min read',
        content: `
            <p>Adding space to your home is a significant investment that requires careful planning and consideration. Whether you're adding a room, expanding an existing space, or building a second story, this guide will help you navigate the process.</p>
            
            <h3>Planning Your Addition</h3>
            <p>Start by clearly defining your goals. What do you need the additional space for? How will it integrate with your existing home? Consider both your current needs and future plans.</p>
            
            <h3>Permits and Zoning</h3>
            <p>Most home additions require building permits. Check with your local building department about zoning restrictions, setback requirements, and permit processes. This step is crucial and cannot be skipped.</p>
            
            <h3>Budget Considerations</h3>
            <p>Home additions typically cost $100-$300 per square foot, depending on complexity and finishes. Factor in costs for design, permits, materials, labor, and unexpected expenses. Always include a 15-20% contingency.</p>
            
            <h3>Design and Architecture</h3>
            <p>Work with an architect or designer to create plans that complement your existing home. Consider the flow between old and new spaces, natural light, and how the addition affects your home's exterior appearance.</p>
            
            <h3>Structural Considerations</h3>
            <p>Your existing foundation and structure must support the addition. A structural engineer can assess your home and determine what modifications are needed.</p>
            
            <h3>Timeline Expectations</h3>
            <p>Most home additions take 3-6 months from start to finish, depending on size and complexity. Weather, permit approvals, and material availability can affect timelines.</p>
            
            <h3>Working with Contractors</h3>
            <p>Choose experienced contractors who specialize in home additions. Get multiple quotes, check references, and ensure they're licensed and insured. Clear communication is essential throughout the project.</p>
            
            <p>With proper planning and the right team, a home addition can significantly enhance your living space and increase your home's value. Take your time to plan carefully, and you'll be rewarded with a space that perfectly meets your needs.</p>
        `
    },
    'blog-post-bathroom-renovation.html': {
        title: 'Bathroom Renovation: Maximizing Space and Style',
        date: 'December 10, 2023',
        category: 'Remodeling',
        readTime: '5 min read',
        content: `
            <p>Bathroom renovations offer one of the best returns on investment while significantly improving your daily life. Whether you're working with a small powder room or a spacious master bath, these tips will help you maximize both space and style.</p>
            
            <h3>Space-Saving Solutions</h3>
            <p>Wall-mounted vanities, floating shelves, and corner showers can make even the smallest bathroom feel more spacious. Consider a pedestal sink for powder rooms where storage isn't critical.</p>
            
            <h3>Smart Storage</h3>
            <p>Recessed medicine cabinets, built-in niches, and vertical storage solutions help keep your bathroom organized. Consider your storage needs and design accordingly.</p>
            
            <h3>Lighting Design</h3>
            <p>Layered lighting is essential in bathrooms. Combine ambient lighting with task lighting around the mirror and accent lighting for ambiance. Natural light is always a plus when possible.</p>
            
            <h3>Modern Fixtures</h3>
            <p>Water-efficient fixtures not only save water but also reduce utility bills. Consider low-flow toilets, water-saving showerheads, and faucets with aerators.</p>
            
            <h3>Tile Selection</h3>
            <p>Large format tiles can make a small space feel bigger, while interesting patterns add visual interest. Consider durability, maintenance, and slip resistance, especially for floors.</p>
            
            <h3>Ventilation</h3>
            <p>Proper ventilation prevents moisture problems and maintains air quality. Ensure your bathroom fan is properly sized and vented to the exterior.</p>
            
            <h3>Accessibility Considerations</h3>
            <p>Even if you don't need accessibility features now, consider grab bars, curbless showers, and wider doorways. These features can make your bathroom safer and more comfortable for everyone.</p>
            
            <p>A well-planned bathroom renovation can transform your daily routine while adding significant value to your home. Focus on quality materials and thoughtful design, and you'll enjoy your new bathroom for years to come.</p>
        `
    },
    'blog-post-smart-home.html': {
        title: 'Smart Home Integration in New Construction Projects',
        date: 'November 18, 2023',
        category: 'Industry Trends',
        readTime: '8 min read',
        content: `
            <p>Smart home technology is no longer a luxury—it's becoming standard in new construction. Integrating smart systems during the building phase is more efficient and cost-effective than retrofitting later.</p>
            
            <h3>Planning for Smart Integration</h3>
            <p>Work with your builder and a smart home specialist to plan wiring, network infrastructure, and device placement from the start. This ensures seamless integration and avoids costly modifications later.</p>
            
            <h3>Network Infrastructure</h3>
            <p>Robust Wi-Fi coverage is essential. Consider access points, mesh networks, and hardwired connections for critical devices. Plan for future bandwidth needs as technology continues to evolve.</p>
            
            <h3>Automated Lighting Systems</h3>
            <p>Smart lighting offers convenience, energy savings, and security. Programmable schedules, motion sensors, and remote control capabilities enhance both functionality and efficiency.</p>
            
            <h3>Climate Control</h3>
            <p>Smart thermostats learn your preferences and optimize energy usage. Zoned systems allow different temperatures in different areas, maximizing comfort while minimizing waste.</p>
            
            <h3>Security and Monitoring</h3>
            <p>Integrated security systems with cameras, sensors, and smart locks provide peace of mind. Remote monitoring and alerts keep you connected to your home even when you're away.</p>
            
            <h3>Voice Control Integration</h3>
            <p>Voice assistants can control multiple systems throughout your home. Plan for optimal placement of devices to ensure reliable voice recognition throughout your space.</p>
            
            <h3>Energy Management</h3>
            <p>Smart home systems can monitor and optimize energy usage, identifying opportunities for savings. Integration with solar panels and battery storage creates a comprehensive energy management solution.</p>
            
            <p>As smart home technology continues to advance, building it into new construction from the start ensures your home is future-ready. The investment pays off in convenience, efficiency, and home value.</p>
        `
    },
    'blog-post-budgeting-guide.html': {
        title: 'How to Budget for Your Construction Project: A Step-by-Step Guide',
        date: 'October 5, 2023',
        category: 'Tips & Advice',
        readTime: '6 min read',
        content: `
            <p>Proper budgeting is the foundation of a successful construction project. Without a realistic budget and careful financial planning, even the best-designed projects can run into trouble. Here's how to create and manage your construction budget effectively.</p>
            
            <h3>1. Define Your Project Scope</h3>
            <p>Clearly outline what you want to accomplish. List all components, finishes, and features. A detailed scope prevents scope creep and helps you make informed decisions about priorities.</p>
            
            <h3>2. Research Costs</h3>
            <p>Get quotes from multiple contractors and suppliers. Research material costs, labor rates in your area, and typical project expenses. Online calculators can provide rough estimates, but professional quotes are essential.</p>
            
            <h3>3. Create a Detailed Budget</h3>
            <p>Break down your budget into categories: design and permits, materials, labor, appliances and fixtures, finishes, and contingency. Allocate funds based on your priorities and research.</p>
            
            <h3>4. Include a Contingency Fund</h3>
            <p>Set aside 15-20% of your total budget for unexpected expenses. Construction projects often encounter surprises, from hidden structural issues to material price increases.</p>
            
            <h3>5. Consider Financing Options</h3>
            <p>If you're financing your project, explore different loan options. Construction loans, home equity loans, and personal loans each have different terms and requirements.</p>
            
            <h3>6. Track Expenses</h3>
            <p>Keep detailed records of all expenses. Use spreadsheets or budgeting apps to track spending against your budget. Regular reviews help you catch overruns early.</p>
            
            <h3>7. Prioritize and Adjust</h3>
            <p>If costs exceed your budget, identify areas where you can adjust. Some items can be upgraded later, while others are essential. Work with your contractor to find cost-saving alternatives.</p>
            
            <h3>8. Plan for Ongoing Costs</h3>
            <p>Consider increased utility costs, maintenance, and property taxes. A larger home or upgraded systems may increase your ongoing expenses.</p>
            
            <p>Remember, a well-planned budget is a living document. Review and adjust it regularly, communicate openly with your contractor, and be prepared to make trade-offs. With careful planning, you can complete your project within budget while achieving your goals.</p>
        `
    }
};

function showBlogPostModal(title, postId) {
    const post = blogPostContent[postId];
    if (!post) {
        // If post doesn't exist, show a simple message
        alert(`Full article: "${title}"\n\nThis is a preview. The full article content will be available soon.`);
        return;
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'blog-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'blog-modal-content';
    
    modalContent.innerHTML = `
        <button class="blog-modal-close">&times;</button>
        <div class="blog-modal-header">
            <span class="blog-modal-category">${post.category}</span>
            <h2>${post.title}</h2>
            <div class="blog-modal-meta">
                <span>📅 ${post.date}</span>
                <span>⏱️ ${post.readTime}</span>
            </div>
        </div>
        <div class="blog-modal-body">
            ${post.content}
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close button
    const closeBtn = modalContent.querySelector('.blog-modal-close');
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// ===========================================
// Stats Counter - Enhanced
// ===========================================
let statsAnimated = false;

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    if (statsAnimated) return; // Prevent duplicate animations
    
    // Check if stats are already visible
    const statsSection = document.querySelector('.stats');
    const checkAndAnimate = () => {
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200;
            
            if (isVisible && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach((stat, index) => {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    if (target > 0) {
                        setTimeout(() => {
                            if (stat.textContent === '0' || stat.textContent.trim() === '' || parseInt(stat.textContent) === 0) {
                                animateValue(stat, 0, target, 2500);
                            }
                        }, index * 200); // Stagger animation
                    }
                });
                return true;
            }
        }
        return false;
    };
    
    // Check immediately
    if (checkAndAnimate()) return;
    
    // Use IntersectionObserver for scroll-triggered animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '100px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach((stat, index) => {
                    const target = parseInt(stat.getAttribute('data-target')) || 0;
                    if (target > 0) {
                        setTimeout(() => {
                            if (stat.textContent === '0' || stat.textContent.trim() === '' || parseInt(stat.textContent) === 0) {
                                animateValue(stat, 0, target, 2500);
                            }
                        }, index * 200);
                    }
                });
                observer.disconnect();
            }
        });
    }, observerOptions);

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Fallback: animate after 3 seconds if still not triggered
    setTimeout(() => {
        if (!statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.getAttribute('data-target')) || 0;
                if (target > 0) {
                    setTimeout(() => {
                        animateValue(stat, 0, target, 2500);
                    }, index * 200);
                }
            });
            observer.disconnect();
        }
    }, 3000);
}

function animateValue(element, start, end, duration) {
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Use easing function for smoother animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(easeOutCubic * (end - start) + start);
        
        element.textContent = value;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end; // Ensure final value is exact
        }
    };
    window.requestAnimationFrame(step);
}

// ===========================================
// GSAP Scroll Animations
// ===========================================
function initScrollAnimations() {
    if (!gsap || !ScrollTrigger) return;

    // Hero 3D Text Animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.textContent.split(' ');
        heroTitle.innerHTML = words.map(word => 
            `<span class="hero-title-word">${word}</span>`
        ).join(' ');
        
        const titleWords = heroTitle.querySelectorAll('.hero-title-word');
        gsap.from(titleWords, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.1,
            duration: 1,
            ease: 'back.out(1.7)',
            transformOrigin: '50% 50% -50px'
        });

        // 3D hover effect on title words with tail
        titleWords.forEach((word, index) => {
            // Store original text for tail effect
            word.setAttribute('data-text', word.textContent);
            
            word.addEventListener('mouseenter', () => {
                // Create tail trail effect
                const tail = document.createElement('span');
                tail.className = 'word-tail';
                tail.textContent = word.textContent;
                tail.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    color: rgba(198, 167, 94, 0.4);
                    transform: translateZ(-30px) scale(1.1);
                    filter: blur(6px);
                    pointer-events: none;
                    z-index: -1;
                    white-space: nowrap;
                `;
                word.style.position = 'relative';
                word.appendChild(tail);
                
                gsap.to(word, {
                    rotateY: 15,
                    rotateX: 5,
                    scale: 1.15,
                    z: 25,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                    transformStyle: 'preserve-3d'
                });
                
                gsap.to(tail, {
                    opacity: 0.6,
                    scale: 1.2,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
            
            word.addEventListener('mouseleave', () => {
                const tail = word.querySelector('.word-tail');
                if (tail) {
                    gsap.to(tail, {
                        opacity: 0,
                        scale: 1,
                        duration: 0.3,
                        onComplete: () => tail.remove()
                    });
                }
                
                gsap.to(word, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    z: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Hero subtitle animation
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        gsap.to(heroSubtitle, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
            onComplete: () => {
                heroSubtitle.classList.add('animated');
            }
        });
    }

    // Hero buttons 3D animation
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, i) => {
        // Wrap button if not already wrapped
        if (!btn.parentElement.classList.contains('hero-btn-3d')) {
            const btnWrapper = document.createElement('div');
            btnWrapper.className = 'hero-btn-3d';
            btn.parentNode.insertBefore(btnWrapper, btn);
            btnWrapper.appendChild(btn);
        }
        
        const btnWrapper = btn.parentElement;
        gsap.from(btnWrapper, {
            opacity: 0,
            y: 50,
            rotateX: -45,
            duration: 0.8,
            delay: 0.8 + i * 0.1,
            ease: 'back.out(1.7)',
            transformStyle: 'preserve-3d'
        });
    });

    // Parent company notice animation
    const parentNotice = document.querySelector('.parent-company-notice');
    if (parentNotice) {
        gsap.to(parentNotice, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.2,
            ease: 'power2.out',
            onComplete: () => {
                parentNotice.classList.add('animated');
            }
        });
    }

    // Premium Cinematic Parallax effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        const heroBg = hero.querySelector('.hero-construction-materials-bg');
        
        // Main hero parallax - subtle and luxurious
        gsap.to(hero, {
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            },
            y: 80,
            ease: 'power1.out'
        });
        
        // Hero content depth parallax
        if (heroContent) {
            gsap.to(heroContent, {
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.2
                },
                y: 40,
                scale: 0.98,
                opacity: 0.7,
                ease: 'power1.out'
            });
        }
        
        // Background materials depth parallax
        if (heroBg) {
            gsap.to(heroBg, {
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2
                },
                y: 120,
                scale: 1.05,
                ease: 'power1.out'
            });
        }
    }

    // Enhanced 3D background animations - ensure it runs after GSAP loads
    loadGSAP().then(() => {
        setTimeout(() => {
            createHeroParticles();
            initHero3DBackground();
        }, 300);
    });

    // Magnetic buttons effect
    initMagneticButtons();

    // Text reveal animations
    initTextRevealAnimations();

    // Image reveal animations
    initImageRevealAnimations();

    // Stagger animations for cards with more wow
    initStaggerCardAnimations();

    // Section entrance animations
    initSectionAnimations();

    // Glitch effect on hover
    initGlitchEffects();

    // Floating/shake animations
    initFloatingAnimations();

    // Shimmer effects
    initShimmerEffects();
}

// Enhanced 3D Background Animation
function initHero3DBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) {
        console.log('Hero section not found');
        return;
    }
    
    // Construction materials background animations - call directly
    createConstructionMaterialsBackground();
}

// Initialize construction materials for all page headers
function initPageHeaderAnimations() {
    const pageHeaders = document.querySelectorAll('.page-header');
    pageHeaders.forEach(header => {
        const bgContainer = header.querySelector('.hero-construction-materials-bg');
        if (bgContainer) {
            createConstructionMaterialsForPageHeader(header, bgContainer);
        }
    });
}

// Create construction materials for page headers (fewer elements for performance)
function createConstructionMaterialsForPageHeader(container, bgContainer) {
    if (!container || !bgContainer) return;
    
    bgContainer.innerHTML = '';
    bgContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        overflow: hidden;
        transform-style: preserve-3d;
        perspective: 2000px;
        opacity: 0.35;
    `;
    
    // Create fewer elements for page headers
    const brickCount = 10;
    const beamCount = 6;
    const rebarCount = 4;
    
    // Create simplified 3D bricks
    for (let i = 0; i < brickCount; i++) {
        const brick = document.createElement('div');
        brick.className = 'material-brick';
        const size = 40 + Math.random() * 30;
        brick.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 0.5}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(160, 82, 45, 0.35));
            border: 1px solid rgba(101, 67, 33, 0.4);
            border-radius: 2px;
            transform: rotate(${Math.random() * 360}deg);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        `;
        bgContainer.appendChild(brick);
        
        if (gsap) {
            gsap.to(brick, {
                rotation: `+=${360}`,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 80,
                duration: 20 + Math.random() * 10,
                repeat: -1,
                ease: 'sine.inOut',
                delay: i * 0.3
            });
        }
    }
    
    // Add mouse parallax for page headers
    container.addEventListener('mousemove', (e) => {
        const materials = bgContainer.querySelectorAll('.material-brick');
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        materials.forEach((material, index) => {
            const depth = (index % 3 + 1) * 20;
            const moveX = (x - 0.5) * depth;
            const moveY = (y - 0.5) * depth;
            
            if (gsap) {
                gsap.to(material, {
                    x: moveX,
                    y: moveY,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Create construction materials background with enhanced 3D animations
function createConstructionMaterialsBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const bgContainer = hero.querySelector('.hero-construction-materials-bg');
    if (!bgContainer) return;
    
    // Clear existing content
    bgContainer.innerHTML = '';
    bgContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        overflow: hidden;
        transform-style: preserve-3d;
        perspective: 2000px;
    `;
    
    // Create 3D bricks with realistic texture - More prominent
    const brickCount = 20;
    for (let i = 0; i < brickCount; i++) {
        const brick = document.createElement('div');
        brick.className = 'material-brick';
        const width = 60 + Math.random() * 80;
        const height = 25 + Math.random() * 15;
        const depth = 15 + Math.random() * 10;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotationY = Math.random() * 360;
        const rotationX = (Math.random() - 0.5) * 30;
        
        brick.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            left: ${x}%;
            top: ${y}%;
            transform-style: preserve-3d;
            transform: translateZ(${depth/2}px) rotateY(${rotationY}deg) rotateX(${rotationX}deg);
            will-change: transform;
        `;
        
        // Create 3D brick faces
        ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach((face, idx) => {
            const faceEl = document.createElement('div');
            faceEl.className = `brick-face brick-${face}`;
            const isSide = ['right', 'left'].includes(face);
            const isTop = face === 'top' || face === 'bottom';
            
            faceEl.style.cssText = `
                position: absolute;
                width: ${isSide ? depth : width}px;
                height: ${isTop ? depth : height}px;
            background: linear-gradient(135deg, 
                rgba(247, 184, 1, 0.8) 0%,
                rgba(255, 215, 0, 0.9) 25%,
                rgba(247, 184, 1, 0.8) 50%,
                rgba(255, 193, 7, 0.9) 75%,
                rgba(247, 184, 1, 0.8) 100%
            );
            border: 1px solid rgba(247, 184, 1, 0.6);
                box-shadow: 
                    inset 0 1px 2px rgba(255, 255, 255, 0.1),
                    inset 0 -1px 2px rgba(0, 0, 0, 0.2),
                    0 4px 8px rgba(0, 0, 0, 0.15);
                transform: ${getBrickFaceTransform(face, width, height, depth)};
                transform-origin: center;
            `;
            
            // Add mortar lines texture
            if (face === 'front' || face === 'top') {
                faceEl.style.backgroundImage = `
                    repeating-linear-gradient(0deg, 
                        transparent 0px, 
                        transparent 2px, 
                        rgba(247, 184, 1, 0.3) 2px, 
                        rgba(247, 184, 1, 0.3) 3px
                    ),
                    repeating-linear-gradient(90deg, 
                        transparent 0px, 
                        transparent 2px, 
                        rgba(247, 184, 1, 0.3) 2px, 
                        rgba(247, 184, 1, 0.3) 3px
                    )
                `;
            }
            
            brick.appendChild(faceEl);
        });
        
        bgContainer.appendChild(brick);
        
        // Set initial transform
        const initialX = (Math.random() - 0.5) * 150;
        const initialY = (Math.random() - 0.5) * 100;
        const animDuration = 15 + Math.random() * 10;
        const animDelay = i * 0.3;
        
        // Enhanced GSAP animation - primary method
        if (gsap) {
            gsap.to(brick, {
                rotationY: `+=${360 + Math.random() * 180}`,
                rotationX: `+=${(Math.random() - 0.5) * 40}`,
                x: `+=${(Math.random() - 0.5) * 200}`,
                y: `+=${(Math.random() - 0.5) * 150}`,
                z: `+=${(Math.random() - 0.5) * 250}`,
                duration: animDuration,
                repeat: -1,
                ease: 'sine.inOut',
                delay: animDelay,
                yoyo: false
            });
        } else {
            // Fallback CSS animation if GSAP not loaded
            brick.style.animation = `materialMove3D ${animDuration}s ease-in-out infinite`;
            brick.style.animationDelay = `${animDelay}s`;
        }
    }
    
    // Create 3D wood beams - More visible
    const beamCount = 12;
    for (let i = 0; i < beamCount; i++) {
        const beam = document.createElement('div');
        beam.className = 'material-beam';
        const length = 150 + Math.random() * 100;
        const width = 30 + Math.random() * 20;
        const height = 30 + Math.random() * 20;
        
        beam.style.cssText = `
            position: absolute;
            width: ${length}px;
            height: ${height}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transform-style: preserve-3d;
            transform: translateZ(${width/2}px) rotateY(${Math.random() * 360}deg) rotateX(${(Math.random() - 0.5) * 45}deg);
            will-change: transform;
        `;
        
        // Create beam faces
        ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach(face => {
            const faceEl = document.createElement('div');
            faceEl.className = `beam-face beam-${face}`;
            const isSide = ['right', 'left'].includes(face);
            const isTop = face === 'top' || face === 'bottom';
            
            faceEl.style.cssText = `
                position: absolute;
                width: ${isSide ? width : length}px;
                height: ${isTop ? width : height}px;
                background: linear-gradient(90deg, 
                    rgba(247, 184, 1, 0.8) 0%,
                    rgba(255, 215, 0, 0.85) 20%,
                    rgba(247, 184, 1, 0.8) 40%,
                    rgba(255, 215, 0, 0.85) 60%,
                    rgba(247, 184, 1, 0.8) 80%,
                    rgba(255, 215, 0, 0.85) 100%
                );
                border: 1px solid rgba(247, 184, 1, 0.6);
                box-shadow: 
                    inset 0 1px 3px rgba(255, 255, 255, 0.1),
                    inset 0 -1px 3px rgba(0, 0, 0, 0.3),
                    0 2px 6px rgba(0, 0, 0, 0.2);
                transform: ${getBeamFaceTransform(face, length, height, width)};
            `;
            
            // Add wood grain texture
            if (face === 'top') {
                faceEl.style.backgroundImage = `
                    repeating-linear-gradient(90deg,
                        transparent 0px,
                        transparent 8px,
                        rgba(247, 184, 1, 0.3) 8px,
                        rgba(247, 184, 1, 0.3) 9px
                    )
                `;
            }
            
            beam.appendChild(faceEl);
        });
        
        bgContainer.appendChild(beam);
        
        // Enhanced GSAP animation - primary method
        const beamAnimDuration = 20 + Math.random() * 15;
        const beamAnimDelay = i * 0.4;
        
        if (gsap) {
            gsap.to(beam, {
                rotationY: `+=${360}`,
                rotationZ: `+=${(Math.random() - 0.5) * 60}`,
                x: `+=${(Math.random() - 0.5) * 250}`,
                y: `+=${(Math.random() - 0.5) * 180}`,
                z: `+=${(Math.random() - 0.5) * 300}`,
                duration: beamAnimDuration,
                repeat: -1,
                ease: 'power1.inOut',
                delay: beamAnimDelay
            });
        } else {
            // Fallback CSS animation
            beam.style.animation = `materialMove3D ${beamAnimDuration}s ease-in-out infinite`;
            beam.style.animationDelay = `${beamAnimDelay}s`;
        }
    }
    
    // Create steel rebar/I-beams - Enhanced
    const rebarCount = 10;
    for (let i = 0; i < rebarCount; i++) {
        const rebar = document.createElement('div');
        rebar.className = 'material-rebar';
        const length = 120 + Math.random() * 80;
        const diameter = 8 + Math.random() * 6;
        
        rebar.style.cssText = `
            position: absolute;
            width: ${length}px;
            height: ${diameter}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transform-style: preserve-3d;
            transform: translateZ(${diameter/2}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * 90}deg);
            will-change: transform;
        `;
        
        // Create cylindrical rebar (simplified as box)
        const rebarBody = document.createElement('div');
        rebarBody.style.cssText = `
            position: absolute;
            width: ${length}px;
            height: ${diameter}px;
            background: linear-gradient(90deg,
                rgba(247, 184, 1, 0.8) 0%,
                rgba(255, 215, 0, 0.9) 50%,
                rgba(247, 184, 1, 0.8) 100%
            );
            border: 1px solid rgba(247, 184, 1, 0.6);
            box-shadow: 
                0 2px 8px rgba(0, 0, 0, 0.2),
                inset 0 1px 2px rgba(255, 255, 255, 0.3);
            border-radius: ${diameter/2}px;
        `;
        
        rebar.appendChild(rebarBody);
        bgContainer.appendChild(rebar);
        
        // Enhanced GSAP animation - primary method
        const rebarAnimDuration = 18 + Math.random() * 12;
        const rebarAnimDelay = i * 0.5;
        
        if (gsap) {
            gsap.to(rebar, {
                rotationY: `+=${360}`,
                rotationX: `+=${180 + Math.random() * 180}`,
                x: `+=${(Math.random() - 0.5) * 220}`,
                y: `+=${(Math.random() - 0.5) * 160}`,
                z: `+=${(Math.random() - 0.5) * 280}`,
                duration: rebarAnimDuration,
                repeat: -1,
                ease: 'sine.inOut',
                delay: rebarAnimDelay
            });
        } else {
            // Fallback CSS animation
            rebar.style.animation = `materialMove3D ${rebarAnimDuration}s ease-in-out infinite`;
            rebar.style.animationDelay = `${rebarAnimDelay}s`;
        }
    }
    
    // Add concrete texture overlay
    const concreteOverlay = document.createElement('div');
    concreteOverlay.className = 'concrete-texture-overlay';
    concreteOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            radial-gradient(circle at 20% 30%, rgba(247, 184, 1, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(247, 184, 1, 0.08) 0%, transparent 50%),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(247, 184, 1, 0.05) 2px, rgba(247, 184, 1, 0.05) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(247, 184, 1, 0.05) 2px, rgba(247, 184, 1, 0.05) 4px);
        opacity: 0.6;
        pointer-events: none;
        z-index: 10;
    `;
    bgContainer.appendChild(concreteOverlay);
    
    // Add mouse parallax effect
    hero.addEventListener('mousemove', (e) => {
        const materials = bgContainer.querySelectorAll('.material-brick, .material-beam, .material-rebar');
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        materials.forEach((material, index) => {
            const depth = (index % 3 + 1) * 30;
            const moveX = (x - 0.5) * depth;
            const moveY = (y - 0.5) * depth;
            
            if (gsap) {
                gsap.to(material, {
                    x: moveX,
                    y: moveY,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    hero.addEventListener('mouseleave', () => {
        const materials = bgContainer.querySelectorAll('.material-brick, .material-beam, .material-rebar');
        if (gsap) {
            gsap.to(materials, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
}

// Helper function to calculate brick face transforms
function getBrickFaceTransform(face, width, height, depth) {
    const transforms = {
        front: `translateZ(${depth/2}px)`,
        back: `translateZ(-${depth/2}px) rotateY(180deg)`,
        right: `translateX(${width/2}px) rotateY(90deg)`,
        left: `translateX(-${width/2}px) rotateY(-90deg)`,
        top: `translateY(-${height/2}px) rotateX(90deg)`,
        bottom: `translateY(${height/2}px) rotateX(-90deg)`
    };
    return transforms[face] || '';
}

// Helper function to calculate beam face transforms
function getBeamFaceTransform(face, length, height, width) {
    const transforms = {
        front: `translateZ(${width/2}px)`,
        back: `translateZ(-${width/2}px) rotateY(180deg)`,
        right: `translateX(${length/2}px) rotateY(90deg)`,
        left: `translateX(-${length/2}px) rotateY(-90deg)`,
        top: `translateY(-${height/2}px) rotateX(90deg)`,
        bottom: `translateY(${height/2}px) rotateX(-90deg)`
    };
    return transforms[face] || '';
}

// Create floating particles in hero with tail trails that form construction materials
function createHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Remove existing particles if any
    const existing = hero.querySelector('.hero-particles');
    if (existing) existing.remove();

    const particleContainer = document.createElement('div');
    particleContainer.className = 'hero-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
        transform-style: preserve-3d;
        perspective: 2000px;
    `;
    hero.appendChild(particleContainer);

    // Gold color for 3D animations
    const goldColor = 'rgba(247, 184, 1,';
    const goldColorRGB = '247, 184, 1';
    
    // Create particles that will form into construction materials
    const particleCount = window.innerWidth < 640 ? 40 : 60;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 3;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const startZ = (Math.random() - 0.5) * 500;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${goldColor}1) 0%, ${goldColor}0.8) 50%, ${goldColor}0.4) 100%);
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            pointer-events: none;
            box-shadow: 
                0 0 ${size * 3}px ${goldColor}0.9),
                0 0 ${size * 6}px ${goldColor}0.6);
            will-change: transform, opacity;
            transform: translateZ(${startZ}px);
            transform-style: preserve-3d;
        `;
        particle.classList.add('gold-particle');
        particleContainer.appendChild(particle);
        particles.push({ element: particle, startX, startY, startZ, size });

        // Create glowing tail trail for particle
        const tail = document.createElement('div');
        tail.style.cssText = `
            position: absolute;
            width: ${size * 3}px;
            height: ${size * 3}px;
            background: radial-gradient(circle, ${goldColor}0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            filter: blur(6px);
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
        `;
        particle.appendChild(tail);

        // Initial animation - particles float randomly
        if (gsap) {
            const floatDuration = Math.random() * 8 + 6;
            gsap.to(particle, {
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                z: (Math.random() - 0.5) * 300,
                rotationX: Math.random() * 360,
                rotationY: Math.random() * 360,
                rotationZ: Math.random() * 360,
                opacity: Math.random() * 0.4 + 0.6,
                duration: floatDuration,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            // Animate tail glow
            gsap.to(tail, {
                scale: Math.random() * 1.5 + 1,
                opacity: Math.random() * 0.3 + 0.2,
                duration: floatDuration * 0.6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // After initial floating, form particles into construction materials
    setTimeout(() => {
        formParticlesIntoMaterials(particles, goldColor, goldColorRGB, particleContainer);
    }, 3000);
}

// Function to form particles into 3D construction materials
function formParticlesIntoMaterials(particles, goldColor, goldColorRGB, container) {
    if (!gsap) return;
    
    // Group particles into material types (bricks, beams, rebars)
    const brickGroups = [];
    const beamGroups = [];
    const rebarGroups = [];
    
    // Divide particles into groups
    for (let i = 0; i < particles.length; i += 3) {
        if (i + 2 < particles.length) {
            brickGroups.push([particles[i], particles[i + 1], particles[i + 2]]);
        }
    }
    
    for (let i = 0; i < particles.length; i += 4) {
        if (i + 3 < particles.length) {
            beamGroups.push([particles[i], particles[i + 1], particles[i + 2], particles[i + 3]]);
        }
    }
    
    for (let i = 0; i < particles.length; i += 2) {
        if (i + 1 < particles.length) {
            rebarGroups.push([particles[i], particles[i + 1]]);
        }
    }
    
    // Form bricks
    brickGroups.forEach((group, groupIndex) => {
        const centerX = (group[0].startX + group[1].startX + group[2].startX) / 3;
        const centerY = (group[0].startY + group[1].startY + group[2].startY) / 3;
        const centerZ = (group[0].startZ + group[1].startZ + group[2].startZ) / 3;
        
        group.forEach((p, index) => {
            const offsetX = (index % 2) * 40 - 20;
            const offsetY = Math.floor(index / 2) * 25 - 12.5;
            
            gsap.to(p.element, {
                x: `+=${offsetX}`,
                y: `+=${offsetY}`,
                z: centerZ,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                scale: 1.5,
                duration: 2,
                delay: groupIndex * 0.1,
                ease: 'power2.out',
                onComplete: () => {
                    // Transform into brick shape
                    p.element.style.borderRadius = '4px';
                    p.element.style.width = '40px';
                    p.element.style.height = '25px';
                    p.element.style.background = `linear-gradient(135deg, ${goldColor}0.9) 0%, ${goldColor}0.7) 100%)`;
                    p.element.style.boxShadow = `0 4px 12px ${goldColor}0.6), inset 0 2px 4px ${goldColor}0.9)`;
                }
            });
        });
    });
    
    // Form beams
    beamGroups.forEach((group, groupIndex) => {
        const centerX = group.reduce((sum, p) => sum + p.startX, 0) / group.length;
        const centerY = group.reduce((sum, p) => sum + p.startY, 0) / group.length;
        
        group.forEach((p, index) => {
            const offsetX = (index - 1.5) * 35;
            
            gsap.to(p.element, {
                x: `+=${offsetX}`,
                y: centerY - p.startY,
                z: p.startZ,
                rotationX: 0,
                rotationY: 90,
                rotationZ: 0,
                scale: 1.2,
                duration: 2.5,
                delay: groupIndex * 0.15,
                ease: 'power2.out',
                onComplete: () => {
                    p.element.style.borderRadius = '8px';
                    p.element.style.width = '35px';
                    p.element.style.height = '30px';
                    p.element.style.background = `linear-gradient(90deg, ${goldColor}0.8) 0%, ${goldColor}0.6) 100%)`;
                }
            });
        });
    });
    
    // Form rebars
    rebarGroups.forEach((group, groupIndex) => {
        group.forEach((p, index) => {
            gsap.to(p.element, {
                rotationX: 45,
                rotationY: groupIndex * 30,
                scale: 0.8,
                duration: 2,
                delay: groupIndex * 0.2,
                ease: 'power2.out',
                onComplete: () => {
                    p.element.style.borderRadius = '50%';
                    p.element.style.width = '6px';
                    p.element.style.height = '120px';
                    p.element.style.background = `linear-gradient(180deg, ${goldColor}0.9) 0%, ${goldColor}0.7) 100%)`;
                }
            });
        });
    });
    
    // Continuous 3D animation after formation
    setTimeout(() => {
        const allElements = particles.map(p => p.element);
        gsap.to(allElements, {
            rotationY: '+=360',
            rotationX: '+=180',
            z: '+=100',
            duration: 20,
            repeat: -1,
            ease: 'none'
        });
    }, 4000);
}

// ===========================================
// Magnetic Buttons - WOW Effect
// ===========================================
function initMagneticButtons() {
    if (!gsap) return;
    
    const magneticButtons = document.querySelectorAll('.btn, .service-card, .project-card, .blog-card');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ===========================================
// Text Reveal Animations
// ===========================================
function initTextRevealAnimations() {
    if (!gsap) return;
    
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title, h2, h3');
    
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotationX: -90,
            transformOrigin: 'center bottom',
            duration: 1,
            ease: 'back.out(1.7)'
        });
    });
}

// ===========================================
// Image Reveal Animations
// ===========================================
function initImageRevealAnimations() {
    if (!gsap) return;
    
    const images = document.querySelectorAll('img[loading="lazy"], .project-image img, .about-image img, .ceo-image img');
    
    images.forEach((img, index) => {
        // Image scale animation
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 1.3,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            delay: index * 0.1
        });
    });
}

// ===========================================
// Stagger Card Animations - Enhanced
// ===========================================
function initStaggerCardAnimations() {
    if (!gsap) return;
    
    // Service cards with 3D flip
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: serviceCards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 100,
            rotationX: -90,
            scale: 0.5,
            stagger: {
                amount: 0.8,
                from: 'start'
            },
            duration: 1,
            ease: 'back.out(1.7)',
            transformOrigin: 'center bottom'
        });
    }
    
    // Project cards with slide and scale
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        gsap.from(projectCards, {
            scrollTrigger: {
                trigger: projectCards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -100,
            scale: 0.8,
            rotationY: -45,
            stagger: {
                amount: 1,
                from: 'random'
            },
            duration: 1.2,
            ease: 'power3.out'
        });
    }
    
    // Testimonial cards with fade and zoom
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        gsap.from(testimonialCards, {
            scrollTrigger: {
                trigger: testimonialCards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0,
            rotation: 180,
            stagger: 0.2,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    // Blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length > 0) {
        gsap.from(blogCards, {
            scrollTrigger: {
                trigger: blogCards[0].parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            rotationZ: -5,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
        });
    }
}

// ===========================================
// Section Entrance Animations
// ===========================================
function initSectionAnimations() {
    if (!gsap || !ScrollTrigger) return;
    
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        // Create timeline for section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate section background
        tl.from(section, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

// ===========================================
// Glitch Effect on Hover
// ===========================================
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.hero-title, .section-title, .nav-link');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!gsap) return;
            
            gsap.to(element, {
                x: () => Math.random() * 10 - 5,
                y: () => Math.random() * 10 - 5,
                duration: 0.1,
                repeat: 5,
                yoyo: true,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(element, { x: 0, y: 0 });
                }
            });
        });
    });
}

// ===========================================
// Floating Animations
// ===========================================
function initFloatingAnimations() {
    if (!gsap) return;
    
    // Floating elements
    const floatingElements = document.querySelectorAll('.service-icon, .stat-item, .team-image');
    
    floatingElements.forEach((element, index) => {
        gsap.to(element, {
            y: -20,
            rotation: 5,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });
}

// ===========================================
// Shimmer Effects
// ===========================================
function initShimmerEffects() {
    // Add shimmer to buttons and cards
    const shimmerElements = document.querySelectorAll('.btn, .service-card, .project-card');
    
    shimmerElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const shimmer = document.createElement('div');
            shimmer.className = 'shimmer-effect';
            shimmer.style.cssText = `
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
                transform: translateX(-100%) translateY(-100%) rotate(45deg);
                pointer-events: none;
                z-index: 1;
            `;
            
            if (element.style.position !== 'relative' && element.style.position !== 'absolute') {
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
            }
            
            element.appendChild(shimmer);
            
            if (gsap) {
                gsap.to(shimmer, {
                    x: '200%',
                    y: '200%',
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => shimmer.remove()
                });
            }
        });
    });
}

// ===========================================
// Contact Page Animations
// ===========================================
function initContactPageAnimations() {
    if (!gsap || !ScrollTrigger) return;
    
    // Only run on contact page
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    // Animate contact form entrance
    const contactFormWrapper = document.querySelector('.contact-form-wrapper');
    if (contactFormWrapper) {
        gsap.from(contactFormWrapper, {
            opacity: 0,
            x: -50,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: contactFormWrapper,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animate contact info cards with stagger
    const contactCards = document.querySelectorAll('.contact-info-card');
    if (contactCards.length > 0) {
        gsap.from(contactCards, {
            opacity: 0,
            x: 50,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: contactCards[0],
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
        
        // Add hover tilt effect to cards
        contactCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const parent = input.closest('.form-group');
            if (parent && gsap) {
                gsap.to(parent, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        input.addEventListener('blur', () => {
            const parent = input.closest('.form-group');
            if (parent && gsap) {
                gsap.to(parent, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Animate submit button
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
            if (gsap) {
                gsap.to(submitButton, {
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(247, 184, 1, 0.4)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        submitButton.addEventListener('mouseleave', () => {
            if (gsap) {
                gsap.to(submitButton, {
                    scale: 1,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }
    
    // Animate contact features
    const contactFeatures = document.querySelectorAll('.contact-feature-item');
    if (contactFeatures.length > 0) {
        gsap.from(contactFeatures, {
            opacity: 0,
            y: 40,
            scale: 0.9,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: contactFeatures[0],
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animate social icons
    const socialIcons = document.querySelectorAll('.social-icon-link');
    socialIcons.forEach((icon, index) => {
        gsap.from(icon, {
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: icon,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate form header icon
    const formIcon = document.querySelector('.form-icon');
    if (formIcon && gsap) {
        gsap.to(formIcon, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: 'none'
        });
    }
    
    // Parallax effect on background decorations
    const decorations = document.querySelectorAll('.contact-decoration');
    if (decorations.length > 0) {
        decorations.forEach((dec, index) => {
            gsap.to(dec, {
                y: -30,
                rotation: 15,
                duration: 3 + index,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.5
            });
        });
    }
}

// ===========================================
// Construction Materials Rain Effect
// ===========================================
function initConstructionMaterialsRain() {
    const rainContainer = document.getElementById('construction-materials-rain');
    if (!rainContainer) return;

    // Construction material symbols/emojis
    const materials = ['🔨', '⚒️', '🪚', '🔧', '⛏️', '🪓', '📐', '🔩', '⚙️', '🧱', '🏗️', '🔲', '📦', '🧰'];
    
    // Create particles continuously
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'construction-material-particle';
        
        // Random material
        const material = materials[Math.floor(Math.random() * materials.length)];
        particle.textContent = material;
        
        // Random starting position
        const startX = Math.random() * 100;
        particle.style.left = startX + '%';
        
        // Random size
        const size = 1.2 + Math.random() * 0.8; // 1.2rem to 2rem
        particle.style.fontSize = size + 'rem';
        
        // Random animation duration (fast - 2-4 seconds)
        const duration = 2 + Math.random() * 2;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        
        rainContainer.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + 0.5) * 1000);
    }
    
    // Create particles at intervals (fast rainfall)
    const createInterval = setInterval(() => {
        if (document.getElementById('construction-materials-rain')) {
            createParticle();
        } else {
            clearInterval(createInterval);
        }
    }, 150); // Create new particle every 150ms for fast rainfall
    
    // Create initial batch
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 50);
    }
}

// ===========================================
// Construction Tools Floating Animation
// ===========================================
function initConstructionToolsFloating() {
    // Add floating construction tools to various sections
    const sections = document.querySelectorAll('.section, .hero, .about-hero-section, .services-hero-section, .projects-hero-section, .team-hero-section, .blog-hero-section, .contact-hero-section');
    
    sections.forEach((section, index) => {
        if (section.querySelector('.construction-tools-container')) return; // Already initialized
        
        const toolsContainer = document.createElement('div');
        toolsContainer.className = 'construction-tools-container';
        toolsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        
        section.style.position = 'relative';
        section.appendChild(toolsContainer);
        
        // Construction tools emojis
        const tools = ['🔨', '⚒️', '🪚', '🔧', '⛏️', '🪓', '📐', '🔩', '⚙️', '🧰', '🏗️', '🔲'];
        const toolCount = Math.min(8, Math.floor(window.innerWidth / 150)); // Responsive count
        
        for (let i = 0; i < toolCount; i++) {
            const tool = document.createElement('div');
            tool.className = 'floating-construction-tool';
            tool.textContent = tools[Math.floor(Math.random() * tools.length)];
            tool.style.cssText = `
                position: absolute;
                font-size: ${1.5 + Math.random() * 1}rem;
                opacity: ${0.2 + Math.random() * 0.3};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatTool3D ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                transform-style: preserve-3d;
                will-change: transform;
            `;
            
            toolsContainer.appendChild(tool);
        }
    });
}

// ===========================================
// Construction Equipment 3D Effects
// ===========================================
function initConstructionEquipment3D() {
    // Add 3D construction equipment to hero sections
    const heroSections = document.querySelectorAll('.hero, .about-hero-section, .services-hero-section, .projects-hero-section, .team-hero-section, .blog-hero-section, .contact-hero-section');
    
    heroSections.forEach(hero => {
        if (hero.querySelector('.construction-equipment-3d')) return;
        
        const equipmentContainer = document.createElement('div');
        equipmentContainer.className = 'construction-equipment-3d';
        equipmentContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.style.position = 'relative';
        hero.appendChild(equipmentContainer);
        
        // Create construction equipment elements
        const equipmentTypes = ['🏗️', '🚧', '🔨', '⚒️', '🪚', '🧱', '📐', '🔩'];
        const count = Math.min(8, Math.floor(window.innerWidth / 150));
        
        for (let i = 0; i < count; i++) {
            const equipment = document.createElement('div');
            equipment.className = 'construction-equipment-item';
            equipment.textContent = equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)];
            equipment.style.cssText = `
                position: absolute;
                font-size: ${2 + Math.random() * 2}rem;
                opacity: ${0.15 + Math.random() * 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: equipmentRotate3D ${12 + Math.random() * 8}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
                transform-style: preserve-3d;
                will-change: transform;
            `;
            
            equipmentContainer.appendChild(equipment);
        }
    });
}

// ===========================================
// Construction Beams 3D Animation
// ===========================================
function initConstructionBeams3D() {
    const sections = document.querySelectorAll('.section, .hero, .about-hero-section, .services-hero-section, .projects-hero-section, .team-hero-section, .blog-hero-section, .contact-hero-section');
    
    sections.forEach((section, index) => {
        if (section.querySelector('.construction-beams-3d')) return;
        
        const beamsContainer = document.createElement('div');
        beamsContainer.className = 'construction-beams-3d';
        beamsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;
        
        section.style.position = 'relative';
        section.appendChild(beamsContainer);
        
        const beamCount = Math.min(5, Math.floor(window.innerWidth / 250));
        
        for (let i = 0; i < beamCount; i++) {
            const beam = document.createElement('div');
            beam.className = 'construction-beam-3d';
            beam.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 30}px;
                height: ${100 + Math.random() * 200}px;
                background: linear-gradient(135deg, rgba(247, 184, 1, 0.2) 0%, rgba(247, 184, 1, 0.05) 100%);
                border: 1px solid rgba(247, 184, 1, 0.3);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: beamFloat3D ${15 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                transform-style: preserve-3d;
                will-change: transform;
                border-radius: 4px;
            `;
            
            beamsContainer.appendChild(beam);
        }
    });
}

// ===========================================
// Construction Particles 3D
// ===========================================
function initConstructionParticles3D() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        if (section.querySelector('.construction-particles-3d')) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'construction-particles-3d';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;
        
        section.style.position = 'relative';
        section.appendChild(particlesContainer);
        
        const particleCount = Math.min(12, Math.floor(window.innerWidth / 100));
        const particleTypes = ['●', '■', '▲', '◆', '★'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'construction-particle-3d';
            particle.textContent = particleTypes[Math.floor(Math.random() * particleTypes.length)];
            particle.style.cssText = `
                position: absolute;
                font-size: ${0.5 + Math.random() * 1}rem;
                color: rgba(247, 184, 1, ${0.3 + Math.random() * 0.4});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat3D ${10 + Math.random() * 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
                transform-style: preserve-3d;
                will-change: transform;
            `;
            
            particlesContainer.appendChild(particle);
        }
    });
}

// ===========================================
// Construction Icons Floating
// ===========================================
function initConstructionIconsFloating() {
    const allSections = document.querySelectorAll('section');
    
    allSections.forEach(section => {
        if (section.querySelector('.construction-icons-floating')) return;
        
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'construction-icons-floating';
        iconsContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        
        section.style.position = 'relative';
        section.appendChild(iconsContainer);
        
        const iconCount = Math.min(6, Math.floor(window.innerWidth / 200));
        const icons = ['🔧', '⚙️', '📐', '🔩', '⛏️', '🪓', '🪚', '🧰', '📦', '🔲'];
        
        for (let i = 0; i < iconCount; i++) {
            const icon = document.createElement('div');
            icon.className = 'construction-icon-float';
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.cssText = `
                position: absolute;
                font-size: ${1.5 + Math.random() * 1.5}rem;
                opacity: ${0.2 + Math.random() * 0.3};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: iconFloat3D ${8 + Math.random() * 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
                transform-style: preserve-3d;
                will-change: transform;
            `;
            
            iconsContainer.appendChild(icon);
        }
    });
}
