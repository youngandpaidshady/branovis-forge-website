// Animated Testimonials Component (Vanilla JS)
// Converted from React component to vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
    function initAnimatedTestimonials() {
        const container = document.getElementById('animated-testimonials');
        if (!container) return;

        const testimonials = [
            {
                quote: "The attention to detail and innovative construction methods have completely transformed our home. This is exactly what we've been looking for.",
                name: "Sarah Chen",
                designation: "Homeowner · Atlanta, GA",
                src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ceoReply: "Thank you, Sarah! We're thrilled that your home transformation exceeded your expectations. It was a pleasure working with you!"
            },
            {
                quote: "Implementation was seamless and the results exceeded our expectations. The team's flexibility and professionalism is remarkable.",
                name: "Michael Rodriguez",
                designation: "Business Owner · Charlotte, NC",
                src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ceoReply: "Michael, your trust in our team means everything. We're honored to have been part of your business expansion!"
            },
            {
                quote: "This construction project has significantly improved our facility's functionality. The intuitive design makes complex spaces simple and efficient.",
                name: "Emily Watson",
                designation: "Hospital Administrator · Dallas, TX",
                src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ceoReply: "Emily, working on healthcare facilities requires precision and care. Thank you for the opportunity to serve your hospital!"
            },
            {
                quote: "Outstanding support and robust construction quality. It's rare to find a contractor that delivers on all their promises.",
                name: "James Kim",
                designation: "Property Developer · Miami, FL",
                src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ceoReply: "James, delivering on promises is our commitment. We're grateful for your partnership and continued trust!"
            },
            {
                quote: "The scalability and performance of their construction work has been game-changing for our organization. Highly recommend to any growing business.",
                name: "Lisa Thompson",
                designation: "Commercial Property Manager · New York, NY",
                src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ceoReply: "Lisa, your recommendation is the highest compliment. We're proud to have contributed to your organization's growth!"
            },
        ];

        let active = 0;
        const autoplay = true;
        let autoplayInterval = null;

        const imagesWrapper = document.getElementById('testimonial-images');
        const contentWrapper = document.getElementById('testimonial-content');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');

        if (!imagesWrapper || !contentWrapper || !prevBtn || !nextBtn) return;

        // Random rotate function
        function randomRotateY() {
            return Math.floor(Math.random() * 21) - 10;
        }

        // Initialize images
        function initImages() {
            imagesWrapper.innerHTML = '';
            testimonials.forEach((testimonial, index) => {
                const imgDiv = document.createElement('div');
                imgDiv.className = `testimonial-image-item ${index === active ? 'active' : ''}`;
                imgDiv.style.opacity = index === active ? '1' : '0.7';
                imgDiv.style.transform = index === active 
                    ? 'scale(1) translateZ(0) rotate(0deg)' 
                    : `scale(0.95) translateZ(-100px) rotate(${randomRotateY()}deg)`;
                imgDiv.style.zIndex = index === active ? '999' : (testimonials.length + 2 - index).toString();
                
                const img = document.createElement('img');
                img.src = testimonial.src;
                img.alt = testimonial.name;
                img.draggable = false;
                img.loading = 'lazy';
                img.width = 500;
                img.height = 500;
                
                imgDiv.appendChild(img);
                imagesWrapper.appendChild(imgDiv);
            });
        }

        // Update active testimonial
        function updateTestimonial(newActive) {
            active = newActive;

            // Update images
            const imageItems = imagesWrapper.querySelectorAll('.testimonial-image-item');
            imageItems.forEach((item, index) => {
                const isActive = index === active;
                item.classList.toggle('active', isActive);
                
                if (isActive) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateZ(0) rotate(0deg)';
                    item.style.zIndex = '999';
                    item.style.animation = 'testimonialImageBounce 0.4s ease-in-out';
                } else {
                    item.style.opacity = '0.7';
                    item.style.transform = `scale(0.95) translateZ(-100px) rotate(${randomRotateY()}deg)`;
                    item.style.zIndex = (testimonials.length + 2 - index).toString();
                    item.style.animation = '';
                }
            });

            // Update content with word-by-word animation
            updateContent();
        }

        // Update content with word-by-word animation
        function updateContent() {
            const testimonial = testimonials[active];
            const words = testimonial.quote.split(' ');
            
            contentWrapper.innerHTML = `
                <article itemscope itemtype="https://schema.org/Review" class="testimonial-review-item">
                    <div itemprop="author" itemscope itemtype="https://schema.org/Person">
                        <div class="animated-testimonial-name" itemprop="name">${testimonial.name}</div>
                        <div class="animated-testimonial-designation">${testimonial.designation}</div>
                    </div>
                    <div class="animated-testimonial-stars" aria-label="5 out of 5 stars" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                        <meta itemprop="ratingValue" content="5">
                        <meta itemprop="bestRating" content="5">
                        <span class="star-icon" aria-hidden="true">★</span>
                        <span class="star-icon" aria-hidden="true">★</span>
                        <span class="star-icon" aria-hidden="true">★</span>
                        <span class="star-icon" aria-hidden="true">★</span>
                        <span class="star-icon" aria-hidden="true">★</span>
                    </div>
                    <div class="animated-testimonial-quote" id="testimonial-quote" itemprop="reviewBody">
                        ${words.map((word, index) => 
                            `<span class="testimonial-word" style="animation-delay: ${index * 0.02}s">${word}&nbsp;</span>`
                        ).join('')}
                    </div>
                    ${testimonial.ceoReply ? `
                    <div class="animated-testimonial-ceo-reply">
                        <div class="ceo-reply-header">
                            <div class="ceo-reply-avatar">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Branovis Forge, CEO" loading="lazy" width="40" height="40">
                            </div>
                            <div class="ceo-reply-info">
                                <strong class="ceo-reply-name">Branovis Forge</strong>
                                <span class="ceo-reply-role">CEO</span>
                            </div>
                        </div>
                        <p class="ceo-reply-text">"${testimonial.ceoReply}"</p>
                    </div>
                    ` : ''}
                </article>
            `;
        }

        // Navigation handlers
        function handleNext() {
            updateTestimonial((active + 1) % testimonials.length);
        }

        function handlePrev() {
            updateTestimonial((active - 1 + testimonials.length) % testimonials.length);
        }

        prevBtn.addEventListener('click', handlePrev);
        nextBtn.addEventListener('click', handleNext);

        // Autoplay
        if (autoplay) {
            autoplayInterval = setInterval(handleNext, 5000);
            
            // Pause on hover
            container.addEventListener('mouseenter', () => {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                }
            });
            
            container.addEventListener('mouseleave', () => {
                if (autoplay) {
                    autoplayInterval = setInterval(handleNext, 5000);
                }
            });
        }

        // Initialize
        initImages();
        updateContent();
    }

    initAnimatedTestimonials();
});
