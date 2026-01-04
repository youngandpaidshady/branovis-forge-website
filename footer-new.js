// New Footer Component (Vanilla JS)
// Converted from React component to vanilla JavaScript

(function() {
    'use strict';

    function initNewFooter() {
        const footerContainer = document.querySelector('footer.footer-new, footer');
        if (!footerContainer) return;

        // Dark mode state
        let isDarkMode = false;

        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            isDarkMode = true;
            document.documentElement.classList.add('dark');
        }

        // Create footer HTML
        function createFooterHTML() {
            return `
                <div class="footer-new-container">
                    <div class="footer-new-grid">
                        <!-- Newsletter Section -->
                        <div class="footer-new-section footer-newsletter">
                            <div class="footer-newsletter-bg"></div>
                            <h2 class="footer-new-title">Stay Connected</h2>
                            <p class="footer-new-description">
                                Join our newsletter for the latest updates and exclusive offers.
                            </p>
                            <form class="footer-newsletter-form" id="footer-newsletter-form">
                                <div class="footer-newsletter-input-wrapper">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        class="footer-newsletter-input"
                                        required
                                        aria-label="Email address"
                                    />
                                    <button
                                        type="submit"
                                        class="footer-newsletter-submit"
                                        aria-label="Subscribe to newsletter"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                        <span class="sr-only">Subscribe</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Quick Links -->
                        <div class="footer-new-section">
                            <h3 class="footer-new-heading">Quick Links</h3>
                            <nav class="footer-new-nav">
                                <a href="index.html" class="footer-new-link">Home</a>
                                <a href="about.html" class="footer-new-link">About Us</a>
                                <a href="services.html" class="footer-new-link">Services</a>
                                <a href="projects.html" class="footer-new-link">Projects</a>
                                <a href="contact.html" class="footer-new-link">Contact</a>
                            </nav>
                        </div>

                        <!-- Contact Info -->
                        <div class="footer-new-section">
                            <h3 class="footer-new-heading">Contact Us</h3>
                            <address class="footer-new-address">
                                <p>123 Innovation Street</p>
                                <p>Tech City, TC 12345</p>
                                <p>Phone: <a href="tel:+1234567890" class="footer-new-link">(123) 456-7890</a></p>
                                <p>Email: <a href="mailto:hello@branovisforge.com" class="footer-new-link">hello@branovisforge.com</a></p>
                            </address>
                        </div>

                        <!-- Social Media & Dark Mode -->
                        <div class="footer-new-section footer-social-section">
                            <h3 class="footer-new-heading">Follow Us</h3>
                            <div class="footer-social-icons">
                                <a
                                    href="https://www.facebook.com/branovisforge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="footer-social-icon"
                                    aria-label="Follow us on Facebook"
                                    data-tooltip="Follow us on Facebook"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                    <span class="sr-only">Facebook</span>
                                </a>
                                <a
                                    href="https://twitter.com/branovisforge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="footer-social-icon"
                                    aria-label="Follow us on Twitter"
                                    data-tooltip="Follow us on Twitter"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                    </svg>
                                    <span class="sr-only">Twitter</span>
                                </a>
                                <a
                                    href="https://www.instagram.com/branovisforge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="footer-social-icon"
                                    aria-label="Follow us on Instagram"
                                    data-tooltip="Follow us on Instagram"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                    <span class="sr-only">Instagram</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/branovisforge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="footer-social-icon"
                                    aria-label="Connect with us on LinkedIn"
                                    data-tooltip="Connect with us on LinkedIn"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                    <span class="sr-only">LinkedIn</span>
                                </a>
                            </div>
                            <div class="footer-dark-mode-toggle">
                                <svg class="footer-mode-icon footer-sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                                <label class="footer-switch-wrapper">
                                    <input
                                        type="checkbox"
                                        id="footer-dark-mode"
                                        class="footer-switch-input"
                                        ${isDarkMode ? 'checked' : ''}
                                        aria-label="Toggle dark mode"
                                    />
                                    <span class="footer-switch-slider"></span>
                                </label>
                                <svg class="footer-mode-icon footer-moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <div class="footer-new-bottom">
                        <p class="footer-new-copyright">
                            © <span id="footer-year-new">2025</span> Branovis Forge Remodelling LLC, a subsidiary of The Branovis. All rights reserved.
                        </p>
                    </div>
                </div>
            `;
        }

        // Render footer
        footerContainer.innerHTML = createFooterHTML();

        // Update year
        const yearElement = document.getElementById('footer-year-new');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Newsletter form handler
        const newsletterForm = document.getElementById('footer-newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = newsletterForm.querySelector('input[type="email"]');
                if (input && input.value) {
                    // Here you would typically send the email to your backend
                    alert('Thank you for subscribing! We\'ll keep you updated.');
                    input.value = '';
                }
            });
        }

        // Dark mode toggle handler
        const darkModeToggle = document.getElementById('footer-dark-mode');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', (e) => {
                isDarkMode = e.target.checked;
                if (isDarkMode) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }
            });
        }

        // Tooltip functionality for social icons
        const socialIcons = footerContainer.querySelectorAll('.footer-social-icon');
        socialIcons.forEach(icon => {
            const tooltipText = icon.getAttribute('data-tooltip');
            if (tooltipText) {
                let tooltip = null;
                
                icon.addEventListener('mouseenter', () => {
                    tooltip = document.createElement('div');
                    tooltip.className = 'footer-tooltip';
                    tooltip.textContent = tooltipText;
                    document.body.appendChild(tooltip);
                    
                    const rect = icon.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
                });
                
                icon.addEventListener('mouseleave', () => {
                    if (tooltip) {
                        tooltip.remove();
                        tooltip = null;
                    }
                });
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewFooter);
    } else {
        initNewFooter();
    }
})();

