// Testimonials Marquee with CEO Replies
function initTestimonialsMarquee() {
    const marqueeGroup = document.querySelector('.testimonials-marquee-group');
    if (!marqueeGroup) return;

    const testimonialsData = [
        {
            id: "testimonial-1",
            author: {
                name: "Jennifer Martinez",
                handle: "Homeowner · Atlanta, GA",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
            },
            text: "Branovis and his team exceeded all expectations. They showed up on time every day, kept the place clean, and the kitchen renovation looks amazing. Worth every penny!",
            ceoReply: "Thank you, Jennifer! Your kitchen transformation was a joy to work on. We're thrilled you're enjoying your new space!",
            date: "2024-10-01"
        },
        {
            id: "testimonial-2",
            author: {
                name: "Robert Thompson",
                handle: "Business Owner · Charlotte, NC",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            text: "Renovated our office space while keeping business running smoothly. Professional team, top-notch quality, and finished ahead of schedule.",
            ceoReply: "We appreciate your trust, Robert! Minimizing business disruption was our top priority. Happy to hear the team delivered!",
            date: "2024-08-01"
        },
        {
            id: "testimonial-3",
            author: {
                name: "Dr. Amanda Williams",
                handle: "Hospital Administrator · Dallas, TX",
                avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face"
            },
            text: "Hospital expansion completed without disrupting patient care. Coordinated perfectly, maintained sterile environments, and finished early.",
            ceoReply: "Dr. Williams, working on healthcare facilities requires precision and care. Thank you for the opportunity to serve your hospital!",
            date: "2024-05-01"
        },
        {
            id: "testimonial-4",
            author: {
                name: "Michael & Sarah Chen",
                handle: "Homeowners · Miami, FL",
                avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face"
            },
            text: "Complete home renovation exceeded expectations. Outstanding craftsmanship and attention to detail. Our home feels brand new!",
            ceoReply: "Michael and Sarah, transforming your home was a privilege. We're delighted you're enjoying every detail!",
            date: "2024-11-01"
        },
        {
            id: "testimonial-5",
            author: {
                name: "Patricia Rodriguez",
                handle: "Homeowner · New York, NY",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            },
            text: "Best bathroom renovation experience! Flawless tile work, respectful team, and daily cleanup. Already planning our next project.",
            ceoReply: "Patricia, your bathroom turned out beautifully! We're excited to work with you on your next project!",
            date: "2024-11-15"
        },
        {
            id: "testimonial-6",
            author: {
                name: "David & Lisa Johnson",
                handle: "Homeowners · Los Angeles, CA",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
            },
            text: "Built our dream home with transparency and excellent communication. Exceptional quality - every detail matters to them.",
            ceoReply: "David and Lisa, building your dream home was an honor. Thank you for trusting us with such an important project!",
            date: "2024-07-01"
        }
    ];

    function createTestimonialCard(item, index) {
        const article = document.createElement('article');
        article.className = 'testimonial-card-marquee';
        article.setAttribute('role', 'listitem');
        article.setAttribute('itemscope', '');
        article.setAttribute('itemtype', 'https://schema.org/Review');
        article.setAttribute('data-index', index);
        
        article.innerHTML = `
            <meta itemprop="itemReviewed" content="Branovis Forge Remodelling LLC">
            <div class="testimonial-card-header">
                <div class="testimonial-avatar-wrapper">
                    <img src="${item.author.avatar}" alt="${item.author.name}" class="testimonial-avatar" loading="lazy">
                </div>
                <div class="testimonial-author-info">
                    <h3 class="testimonial-author-name" itemprop="author" itemscope itemtype="https://schema.org/Person">
                        <span itemprop="name">${item.author.name}</span>
                    </h3>
                    <p class="testimonial-author-handle">${item.author.handle}</p>
                </div>
            </div>
            <p class="testimonial-text" itemprop="reviewBody">"${item.text}"</p>
            ${item.ceoReply ? `
            <div class="testimonial-ceo-reply">
                <div class="testimonial-ceo-reply-header">
                    <div class="testimonial-ceo-avatar-wrapper">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Branovis Forge, CEO" class="testimonial-ceo-avatar" loading="lazy">
                    </div>
                    <div class="testimonial-ceo-info">
                        <strong class="testimonial-ceo-name">Branovis Forge</strong>
                        <span class="testimonial-ceo-role">CEO</span>
                    </div>
                </div>
                <p class="testimonial-ceo-reply-text">"${item.ceoReply}"</p>
            </div>
            ` : ''}
        `;
        
        return article;
    }

    // Clear existing content
    marqueeGroup.innerHTML = '';

    // Create 4 sets of testimonials for seamless loop (as in React component)
    for (let setIndex = 0; setIndex < 4; setIndex++) {
        testimonialsData.forEach((item, index) => {
            const card = createTestimonialCard(item, setIndex * testimonialsData.length + index);
            marqueeGroup.appendChild(card);
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialsMarquee);
} else {
    initTestimonialsMarquee();
}

