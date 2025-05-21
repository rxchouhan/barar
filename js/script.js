document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const productGrid = document.getElementById('product-grid');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const siteNav = document.getElementById('main-nav');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const pageOverlay = document.getElementById('page-overlay');
    const currentYearSpan = document.getElementById('current-year');
    const navLinks = document.querySelectorAll('.site-nav .nav-link');
    const categoryCards = document.querySelectorAll('.category-card');
    const contactForm = document.getElementById('contact-form'); // This form is now removed, but variable can stay if other forms are added
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const siteHeader = document.getElementById('main-header');

    const CURRENCY_SYMBOL = '₹';

    const allProductsData = [
        { id: 'prod1', name: 'Clarity Suite', category: 'Productivity', description: 'Streamline your workflow with essential productivity tools.', price: 3499, imageUrl: 'https://via.placeholder.com/300x180/E8F0FE/0A58CA?text=Clarity', specs: ['Windows, macOS, Linux compatible', 'Cloud synchronization', 'Real-time collaboration', 'Offline access available'] },
        { id: 'prod2', name: 'Guardian Shield', category: 'Security', description: 'Robust digital protection for peace of mind.', price: 1299, imageUrl: 'https://via.placeholder.com/300x180/E6F4EA/1E8E3E?text=Guardian', specs: ['Real-time threat detection', 'Secure VPN (5GB/month)', 'Password manager', 'Regular security updates'] },
        { id: 'prod3', name: 'Canvas Pro', category: 'Design', description: 'Professional-grade design software for creatives.', price: 5499, imageUrl: 'https://via.placeholder.com/300x180/FEF7E0/F9AB00?text=Canvas', specs: ['Vector and raster editing', 'Advanced typography tools', 'CMYK and RGB support', 'Extensive brush library'] },
        { id: 'prod4', name: 'DevCore IDE', category: 'Development', description: 'Next-gen IDE for efficient coding and development.', price: 6999, imageUrl: 'https://via.placeholder.com/300x180/FCE8E6/D93025?text=DevCore', specs: ['Multi-language support (JS, Python, Java, C++)', 'Integrated debugger', 'Version control integration', 'AI-powered code suggestions'] },
        { id: 'prod5', name: 'MotionCraft Editor', category: 'Design', description: 'Create stunning videos with an intuitive interface.', price: 4199, imageUrl: 'https://via.placeholder.com/300x180/F1F3F4/5F6368?text=MotionCraft', specs: ['4K video support', 'Timeline-based editing', 'Color grading tools', 'Motion graphics templates'] },
        { id: 'prod6', name: 'VaultSync Backup', category: 'Productivity', description: 'Secure and reliable cloud backup for your data (Annual).', price: 899, imageUrl: 'https://via.placeholder.com/300x180/E1F5FE/0277BD?text=VaultSync', specs: ['Automated scheduled backups', 'End-to-end encryption', 'Cross-platform access', 'File versioning'] }
    ];

    function renderProducts(productsToRender = allProductsData) {
        if (!productGrid) {
            console.error("productGrid element not found!");
            return;
        }
        productGrid.innerHTML = '<div class="loading-spinner">Loading products...</div>';

        setTimeout(() => {
            productGrid.innerHTML = '';
            if (productsToRender.length === 0) {
                productGrid.innerHTML = '<p class="no-products">No products found for this category.</p>';
                return;
            }
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description.substring(0, 75)}...</p>
                        <div class="product-price"><span class="currency-symbol">${CURRENCY_SYMBOL}</span>${product.price.toLocaleString('en-IN')}</div>
                        <div class="product-actions">
                            <a href="product.html?id=${product.id}" class="btn btn-primary view-details-btn">View Details</a>
                        </div>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }, 200);
    }

    function findProductById(id) { return allProductsData.find(p => p.id === id); }

    function openMobileNav() {
        if (siteNav && pageOverlay) {
            siteNav.classList.add('active');
            pageOverlay.classList.add('active');
            document.body.classList.add('nav-open');
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    }
    function closeMobileNav() {
        if (siteNav && pageOverlay) {
            siteNav.classList.remove('active');
            pageOverlay.classList.remove('active');
            document.body.classList.remove('nav-open');
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    function setActiveNavLink() {
        if (!siteHeader || !navLinks.length) return;
        const sections = document.querySelectorAll('main section[id]');
        if (!sections.length) return;

        let currentActive = '';
        const headerOffset = siteHeader.offsetHeight + 60;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentActive = section.getAttribute('id');
            }
        });
        
        if (!currentActive) {
            if (sections[0] && window.pageYOffset < sections[0].offsetTop - headerOffset) {
                currentActive = sections[0].getAttribute('id');
            } else {
                for (let i = sections.length - 1; i >= 0; i--) {
                    if (window.pageYOffset >= sections[i].offsetTop - headerOffset) {
                        currentActive = sections[i].getAttribute('id');
                        break;
                    }
                }
            }
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActive}`) {
                link.classList.add('active');
            }
        });
    }

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileNav);
    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileNav);
    if (pageOverlay) pageOverlay.addEventListener('click', closeMobileNav);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && siteNav && siteNav.classList.contains('active')) {
                closeMobileNav();
            }
        });
    });

    if (siteHeader) {
        window.addEventListener('scroll', () => {
            siteHeader.classList.toggle('scrolled', window.scrollY > 20);
            setActiveNavLink();
        });
    }
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.classList.toggle('visible', window.scrollY > 200);
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (categoryCards.length > 0 && productGrid) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                categoryCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const category = card.dataset.category;
                renderProducts(category === 'All' ? allProductsData : allProductsData.filter(p => p.category === category));
            });
        });
    }

    // Contact form JS removed as the form is removed.
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         alert('Thank you for your message! (This is a demo for Barar.in)');
    //         contactForm.reset();
    //     });
    // }

    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    function init() {
        const initialActiveCategoryCard = document.querySelector('.category-card.active');
        if (initialActiveCategoryCard) {
            const initialCategory = initialActiveCategoryCard.dataset.category;
            renderProducts(initialCategory === 'All' ? allProductsData : allProductsData.filter(p => p.category === initialCategory));
        } else {
            renderProducts(); 
            const allCategoryCard = document.querySelector('.category-card[data-category="All"]');
            if(allCategoryCard) allCategoryCard.classList.add('active');
        }
        setActiveNavLink();
    }
    init();
});
