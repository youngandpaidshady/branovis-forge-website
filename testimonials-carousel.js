// Testimonials Carousel Functionality
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonials-carousel');
    const prevBtn = document.querySelector('.testimonials-carousel-btn-prev');
    const nextBtn = document.querySelector('.testimonials-carousel-btn-next');
    const dots = document.querySelectorAll('.testimonials-carousel-dot');
    
    if (!carousel) return;
    
    let currentIndex = 0;
    const items = carousel.querySelectorAll('.testimonial-carousel-item');
    const totalItems = items.length;
    
    // Calculate scroll amount based on item width
    function getScrollAmount() {
        const item = items[0];
        if (!item) return 0;
        const itemWidth = item.offsetWidth;
        const gap = 20; // 1.25rem = 20px
        return itemWidth + gap;
    }
    
    // Update active dot
    function updateDots(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
    }
    
    // Update button states
    function updateButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= totalItems - 1;
        }
    }
    
    // Scroll to specific index
    function scrollToIndex(index) {
        if (index < 0 || index >= totalItems) return;
        
        currentIndex = index;
        const scrollAmount = getScrollAmount() * index;
        
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        updateDots(currentIndex);
        updateButtons();
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            }
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalItems - 1) {
                scrollToIndex(currentIndex + 1);
            }
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToIndex(index);
        });
    });
    
    // Scroll event listener for swipe/trackpad
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = carousel.scrollLeft;
            const scrollAmount = getScrollAmount();
            const newIndex = Math.round(scrollLeft / scrollAmount);
            
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalItems) {
                currentIndex = newIndex;
                updateDots(currentIndex);
                updateButtons();
            }
        }, 100);
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalItems - 1) {
                // Swipe left - next
                scrollToIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous
                scrollToIndex(currentIndex - 1);
            }
        }
    }
    
    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            scrollToIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < totalItems - 1) {
            e.preventDefault();
            scrollToIndex(currentIndex + 1);
        }
    });
    
    // Initialize
    updateButtons();
    updateDots(0);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            scrollToIndex(currentIndex);
        }, 250);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);
} else {
    initTestimonialsCarousel();
}

