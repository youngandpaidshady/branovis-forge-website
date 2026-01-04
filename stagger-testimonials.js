// Stagger Testimonials Component (Vanilla JS)
// Converted from React component to vanilla JavaScript

const SQRT_5000 = Math.sqrt(5000);

const testimonialsData = [
    {
        tempId: 0,
        testimonial: "My favorite solution in the market. We work 5x faster with Branovis Forge.",
        by: "Alex, CEO at TechCorp",
        imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Thank you, Alex! We're thrilled to boost your team's efficiency."
    },
    {
        tempId: 1,
        testimonial: "I'm confident my data is safe with Branovis Forge. I can't say that about other providers.",
        by: "Dan, CTO at SecureNet",
        imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Dan, your trust means everything. Security is our top priority."
    },
    {
        tempId: 2,
        testimonial: "I know it's cliche, but we were lost before we found Branovis Forge. Can't thank you guys enough!",
        by: "Stephanie, COO at InnovateCo",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Stephanie, we're honored to be your trusted partner!"
    },
    {
        tempId: 3,
        testimonial: "Branovis Forge's products make planning for the future seamless. Can't recommend them enough!",
        by: "Marie, CFO at FuturePlanning",
        imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Marie, future-proofing is core to what we do. Thank you!"
    },
    {
        tempId: 4,
        testimonial: "If I could give 11 stars, I'd give 12.",
        by: "Andre, Head of Design at CreativeSolutions",
        imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Andre, your enthusiasm drives us to excel. Thank you!"
    },
    {
        tempId: 5,
        testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
        by: "Jeremy, Product Manager at TimeWise",
        imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Jeremy, saving you time is our goal. We're here for you!"
    },
    {
        tempId: 6,
        testimonial: "Took some convincing, but now that we're on Branovis Forge, we're never going back.",
        by: "Pam, Marketing Director at BrandBuilders",
        imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Pam, we're glad you took the leap. Welcome to the family!"
    },
    {
        tempId: 7,
        testimonial: "I would be lost without Branovis Forge's in-depth analytics. The ROI is EASILY 100X for us.",
        by: "Daniel, Data Scientist at AnalyticsPro",
        imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Daniel, a 100X ROI is phenomenal! We're proud to deliver value."
    },
    {
        tempId: 8,
        testimonial: "It's just the best. Period.",
        by: "Fernando, UX Designer at UserFirst",
        imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Fernando, simple and powerful feedback. Thank you!"
    },
    {
        tempId: 9,
        testimonial: "I switched 5 years ago and never looked back.",
        by: "Andy, DevOps Engineer at CloudMasters",
        imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Andy, 5 years of partnership is amazing. Here's to many more!"
    },
    {
        tempId: 10,
        testimonial: "I've been searching for a solution like Branovis Forge for YEARS. So glad I finally found one!",
        by: "Pete, Sales Director at RevenueRockets",
        imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Pete, your search is over! We're excited to help you grow."
    },
    {
        tempId: 11,
        testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
        by: "Marina, HR Manager at TalentForge",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Marina, ease of use is key. We're thrilled it worked so well!"
    },
    {
        tempId: 12,
        testimonial: "Branovis Forge's customer support is unparalleled. They're always there when we need them.",
        by: "Olivia, Customer Success Manager at ClientCare",
        imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Olivia, our support team is dedicated to your success. Thank you!"
    },
    {
        tempId: 13,
        testimonial: "The efficiency gains we've seen since implementing Branovis Forge are off the charts!",
        by: "Raj, Operations Manager at StreamlineSolutions",
        imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Raj, driving efficiency is what we do best. Keep up the great work!"
    },
    {
        tempId: 14,
        testimonial: "Branovis Forge has revolutionized how we handle our workflow. It's a game-changer!",
        by: "Lila, Workflow Specialist at ProcessPro",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Lila, we love being a game-changer! Thank you for the feedback."
    },
    {
        tempId: 15,
        testimonial: "The scalability of Branovis Forge's solution is impressive. It grows with our business seamlessly.",
        by: "Trevor, Scaling Officer at GrowthGurus",
        imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Trevor, scalability is crucial. We're growing with you!"
    },
    {
        tempId: 16,
        testimonial: "I appreciate how Branovis Forge continually innovates. They're always one step ahead.",
        by: "Naomi, Innovation Lead at FutureTech",
        imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Naomi, innovation is in our DNA. We're committed to staying ahead."
    },
    {
        tempId: 17,
        testimonial: "The ROI we've seen with Branovis Forge is incredible. It's paid for itself many times over.",
        by: "Victor, Finance Analyst at ProfitPeak",
        imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Victor, strong ROI is the ultimate measure of success. Thank you!"
    },
    {
        tempId: 18,
        testimonial: "Branovis Forge's platform is so robust, yet easy to use. It's the perfect balance.",
        by: "Yuki, Tech Lead at BalancedTech",
        imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Yuki, balance is key. We're glad it's the perfect fit for you!"
    },
    {
        tempId: 19,
        testimonial: "We've tried many solutions, but Branovis Forge stands out in terms of reliability and performance.",
        by: "Zoe, Performance Manager at ReliableSystems",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        ceoReply: "Zoe, reliability is non-negotiable. Thank you for trusting us!"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    function initStaggerTestimonials() {
        const container = document.getElementById('stagger-testimonials-container');
        if (!container) return;

        let cardSize = 365;
        let testimonialsList = [...testimonialsData];

        // Update card size based on screen width
        function updateSize() {
            cardSize = window.matchMedia("(min-width: 640px)").matches ? 365 : 290;
            render();
        }

        // Handle move function
        function handleMove(steps) {
            const newList = [...testimonialsList];
            if (steps > 0) {
                for (let i = steps; i > 0; i--) {
                    const item = newList.shift();
                    if (!item) return;
                    newList.push({ ...item, tempId: Math.random() });
                }
            } else {
                for (let i = steps; i < 0; i++) {
                    const item = newList.pop();
                    if (!item) return;
                    newList.unshift({ ...item, tempId: Math.random() });
                }
            }
            testimonialsList = newList;
            render();
        }

        // Render function
        function render() {
            container.innerHTML = `
                <div class="stagger-testimonials-wrapper">
                    ${testimonialsList.map((testimonial, index) => {
                        const position = testimonialsList.length % 2
                            ? index - (testimonialsList.length + 1) / 2
                            : index - testimonialsList.length / 2;
                        const isCenter = position === 0;
                        
                        return `
                                <div
                                    class="stagger-testimonial-card ${isCenter ? 'stagger-testimonial-center' : ''}"
                                    data-position="${position}"
                                    style="
                                        width: ${cardSize}px;
                                        height: ${testimonial.ceoReply ? cardSize + 80 : cardSize}px;
                                        transform: translate(-50%, -50%) 
                                            translateX(${(cardSize / 1.5) * position}px)
                                            translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
                                            rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg);
                                    "
                                >
                                    <span class="stagger-card-corner"></span>
                                    <img
                                        src="${testimonial.imgSrc}"
                                        alt="${testimonial.by.split(',')[0]}"
                                        class="stagger-testimonial-avatar"
                                        loading="lazy"
                                    />
                                    <h3 class="stagger-testimonial-text ${isCenter ? 'stagger-testimonial-text-center' : ''}">
                                        "${testimonial.testimonial}"
                                    </h3>
                                    <p class="stagger-testimonial-author ${isCenter ? 'stagger-testimonial-author-center' : ''}">
                                        - ${testimonial.by}
                                    </p>
                                    ${testimonial.ceoReply ? `
                                    <div class="stagger-testimonial-ceo-reply ${isCenter ? 'stagger-testimonial-ceo-reply-center' : ''}">
                                        <div class="stagger-ceo-reply-header">
                                            <img
                                                src="img/others/ceo.png"
                                                alt="Branovis Forge, CEO"
                                                class="stagger-ceo-reply-avatar"
                                                loading="lazy"
                                            />
                                            <div class="stagger-ceo-reply-info">
                                                <span class="stagger-ceo-reply-name">Branovis Forge</span>
                                                <span class="stagger-ceo-reply-role">CEO</span>
                                            </div>
                                        </div>
                                        <p class="stagger-ceo-reply-text">${testimonial.ceoReply}</p>
                                    </div>
                                    ` : ''}
                                </div>
                        `;
                    }).join('')}
                    <div class="stagger-testimonials-controls">
                        <button
                            class="stagger-testimonials-btn"
                            onclick="window.handleStaggerMove && window.handleStaggerMove(-1)"
                            aria-label="Previous testimonial"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </button>
                        <button
                            class="stagger-testimonials-btn"
                            onclick="window.handleStaggerMove && window.handleStaggerMove(1)"
                            aria-label="Next testimonial"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;

            // Add click handlers to cards
            container.querySelectorAll('.stagger-testimonial-card').forEach((card, index) => {
                const position = parseInt(card.dataset.position);
                card.addEventListener('click', () => handleMove(position));
            });
        }

        // Expose handleMove to window for button onclick
        window.handleStaggerMove = handleMove;

        // Initial render
        render();

        // Update on resize
        window.addEventListener('resize', updateSize);
        updateSize();
    }

    initStaggerTestimonials();
});

