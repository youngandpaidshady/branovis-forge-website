// FAQ Tabs Component (Vanilla JS)
// Converted from React component to vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
    function initFAQTabs() {
        const faqContainer = document.getElementById('faq-tabs-container');
        if (!faqContainer) return;

        const categories = {
            "general": "General",
            "projects": "Projects",
            "process": "Process",
            "payment": "Payment & Warranty"
        };

        const faqData = {
            "general": [
                {
                    question: "Are you licensed and insured?",
                    answer: "Absolutely! We're fully licensed, bonded, and insured—giving you complete peace of mind. Our comprehensive coverage includes liability and workers' compensation insurance, so you're protected every step of the way. We've got your back, literally and legally!"
                },
                {
                    question: "What areas do you serve?",
                    answer: "We're everywhere you need us! From the bustling streets of New York and Los Angeles to the vibrant communities of Atlanta, Charlotte, Dallas, Miami, and Chicago—we bring our expertise right to your doorstep. Don't see your city? Give us a call anyway—we're always expanding and love new challenges!"
                },
                {
                    question: "Do you provide free estimates?",
                    answer: "Yes, we offer free consultations and detailed estimates for all projects. Contact us to schedule a meeting where we'll discuss your vision and provide a comprehensive quote."
                },
                {
                    question: "What types of construction projects do you handle?",
                    answer: "Think of us as your construction Swiss Army knife! Whether you're dreaming of a stunning kitchen transformation, adding that extra room you've always wanted, building a state-of-the-art healthcare facility, or creating a show-stopping commercial space—we've done it all. From cozy bathroom makeovers to massive industrial complexes, we bring the same passion and precision to every project. Size? That's just a number!"
                }
            ],
            "projects": [
                {
                    question: "How long does a typical remodeling project take?",
                    answer: "Project timelines vary based on scope and complexity. A kitchen remodel typically takes 6-12 weeks, while a complete home renovation can take 3-6 months. We provide detailed timelines during the planning phase."
                },
                {
                    question: "How much should I budget for a renovation project?",
                    answer: "Let's talk numbers! Every project is as unique as you are, so budgets naturally vary. Here's the lowdown: dream kitchens typically run $25K-$75K (and worth every penny!), stunning bathroom transformations range $15K-$40K, while whole-home makeovers can go $100K-$500K+. Pro tip: we always recommend a 15-20% cushion for those 'surprise' moments (old house, we're looking at you!). Ready to bring your vision to life? Let's chat and get you a custom estimate that fits your dreams and budget perfectly."
                },
                {
                    question: "What materials do you use?",
                    answer: "Only the best for your project! We source premium materials from industry-leading suppliers—think luxurious hardwoods, stunning natural stone, designer tiles, sleek metals, and elegant glass. Love eco-friendly options? We've got sustainable materials that don't compromise on style. We'll guide you through choices that match your budget, aesthetic, and lifestyle, always with quality and durability front and center. Your home deserves nothing less!"
                },
                {
                    question: "Can I live in my home during renovation?",
                    answer: "Home sweet home—even during construction! For kitchen or bathroom makeovers, you can absolutely stay put. We're pros at creating 'living zones' that keep your daily life rolling while we work our magic. We'll protect your furniture, seal off work areas, maintain clean paths, and keep safety top of mind. Bigger projects? We'll have an honest chat about timelines and whether a short vacation might be more comfortable. Bottom line: we make living through renovation as painless as possible!"
                }
            ],
            "process": [
                {
                    question: "Do you handle permits and inspections?",
                    answer: "Yes—and we make it stress-free! We're your permit pros, handling all the bureaucratic legwork so you don't have to. From navigating local building departments to coordinating with inspectors, we've got it covered. Every project meets (and often exceeds) local codes and regulations. Best part? It's all included in our service. Sit back, relax, and watch your vision come to life while we handle the red tape!"
                },
                {
                    question: "Can you work with my existing design or architect?",
                    answer: "Teamwork makes the dream work! Whether you've got plans from your favorite architect, sketches on napkins, or just big ideas—we're here to make them reality. We love collaborating with designers and homeowners to create something extraordinary. Our team speaks fluent 'architectural drawings' and excels at turning blueprints into beautiful, livable spaces. Design-build? Custom modifications? Your vision, our execution—let's build something amazing together!"
                },
                {
                    question: "How do you ensure project quality?",
                    answer: "Quality isn't just a goal—it's our obsession! Every step of your project gets the VIP treatment: rigorous inspections, master craftsmen, certified pros, and our eagle-eyed quality control. You'll stay in the loop with real-time progress updates, and here's the kicker: we warranty our work and stand behind every single project. When we say 'built to last,' we mean it. Your satisfaction? Guaranteed!"
                },
                {
                    question: "How do you handle project delays?",
                    answer: "We're deadline ninjas, but life happens! Weather, material hiccups, permit timelines, or surprise discoveries (looking at you, century-old wiring!) can occasionally slow things down. Here's our promise: you'll know immediately if something's shifting, why it's happening, and exactly what we're doing about it. Our proactive planning catches 95% of potential issues before they become problems. Transparency is key—no surprises, just solutions!"
                },
                {
                    question: "Do you provide energy-efficient and green building options?",
                    answer: "Green is our favorite color! We're passionate about sustainable building and can turn your project into an eco-friendly powerhouse. Think energy-efficient systems, recycled materials, solar options, smart home tech, and cutting-edge green techniques. Dreaming of LEED certification or Energy Star status? We'll guide you there. The best part? Those utility bills shrink while your carbon footprint does too. Saving the planet and your wallet—now that's a win-win!"
                },
                {
                    question: "How do I get started with my project?",
                    answer: "Ready to transform your space? Let's do this! Shoot us a message through our website, give us a call, or drop us an email—we're here and excited to chat. We'll set up a free consultation where we dive deep into your dreams, answer every question (yes, even the quirky ones!), and if needed, we'll come see your space in person. Then we'll craft a detailed estimate that breaks down everything. When you're ready to make it happen, we'll lock in the contract, create your custom timeline, and boom—we're bringing your vision to life! Your dream project is just one call away."
                }
            ],
            "payment": [
                {
                    question: "What is your payment schedule?",
                    answer: "Fair, transparent, and flexible—that's our payment philosophy! We structure payments around project milestones, so you're paying for progress, not promises. We'll need a deposit to lock in your spot (prime construction season books fast!), then payments flow as work gets done. Final payment? Only when you're absolutely thrilled with the results. Worried about the finances? Let's talk—we work with homeowners to find payment solutions that make sense for your budget."
                },
                {
                    question: "Do you offer warranties on your work?",
                    answer: "Absolutely—we guarantee our craft! Our workmanship warranties vary by project, but one thing stays constant: we stand behind everything we build. Plus, we partner with top-tier manufacturers who back their materials and systems with solid warranties. All the fine print is crystal clear in your contract, and here's the real promise: if something needs attention, we'll be there. Your peace of mind is part of the package!"
                }
            ]
        };

        let selectedCategory = Object.keys(categories)[0];

        // Render FAQ structure
        function renderFAQ() {
            faqContainer.innerHTML = `
                <div class="faq-header-new">
                    <span class="faq-subtitle-new">Let's answer some questions</span>
                    <h2 class="faq-title-new">Frequently Asked Questions</h2>
                    <span class="faq-header-glow"></span>
                </div>
                <div class="faq-tabs-new" role="tablist">
                    ${Object.entries(categories).map(([key, label]) => `
                        <button
                            class="faq-tab-button ${selectedCategory === key ? 'active' : ''}"
                            data-category="${key}"
                            role="tab"
                            aria-selected="${selectedCategory === key}"
                        >
                            <span class="faq-tab-label">${label}</span>
                            ${selectedCategory === key ? '<span class="faq-tab-active-bg"></span>' : ''}
                        </button>
                    `).join('')}
                </div>
                <div class="faq-list-new" id="faq-list-container">
                    ${renderFAQList(selectedCategory)}
                </div>
            `;

            // Add event listeners
            const tabButtons = faqContainer.querySelectorAll('.faq-tab-button');
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.dataset.category;
                    setSelectedCategory(category);
                });
            });

            const faqItems = faqContainer.querySelectorAll('.faq-item-new');
            faqItems.forEach(item => {
                const button = item.querySelector('.faq-question-new');
                if (button) {
                    button.addEventListener('click', () => {
                        const isOpen = item.classList.contains('open');
                        // Close all items
                        faqItems.forEach(i => i.classList.remove('open'));
                        // Toggle clicked item
                        if (!isOpen) {
                            item.classList.add('open');
                        }
                    });
                }
            });
        }

        function renderFAQList(category) {
            const questions = faqData[category] || [];
            return `
                <div class="faq-list-content" data-category="${category}">
                    ${questions.map((faq, index) => `
                        <div class="faq-item-new">
                            <button class="faq-question-new" type="button">
                                <span class="faq-question-text">${faq.question}</span>
                                <span class="faq-icon-new">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </span>
                            </button>
                            <div class="faq-answer-new">
                                <p>${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function setSelectedCategory(category) {
            selectedCategory = category;
            renderFAQ();
        }

        // Initial render
        renderFAQ();
    }

    initFAQTabs();
});

