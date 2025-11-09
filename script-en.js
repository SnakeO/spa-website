document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const bookingForm = document.getElementById('bookingForm');
    const quickBookingForm = document.getElementById('quickBookingForm');
    const navbar = document.querySelector('.navbar');

    let gallerySwiper = null;
    let resultsSwiper = null;

    // Monday Promotion Banner Logic
    function checkMondayPromo() {
        const banner = document.getElementById('mondayBanner');
        if (!banner) return;

        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

        if (dayOfWeek === 1) { // Monday
            banner.classList.add('show');
        } else {
            banner.style.display = 'none';
        }
    }

    // Call on page load
    checkMondayPromo();

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        fadeInObserver.observe(element);
    });
    
    function handleFormSubmit(form, formName) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const toastHtml = `
                <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            Thank you for your booking! We will contact you shortly.
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                    </div>
                </div>
            `;
            
            const toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '9999';
            toastContainer.innerHTML = toastHtml;
            document.body.appendChild(toastContainer);
            
            const toastElement = toastContainer.querySelector('.toast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            
            form.reset();
            
            const modal = form.closest('.modal');
            if (modal) {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
            
            setTimeout(() => {
                toastContainer.remove();
            }, 5000);
        });
    }
    
    if (bookingForm) {
        handleFormSubmit(bookingForm, 'Booking Form');
    }
    
    if (quickBookingForm) {
        handleFormSubmit(quickBookingForm, 'Quick Booking');
    }
    
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    galleryThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            const modal = document.getElementById('galleryModal');
            if (modal) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
                
                modal.addEventListener('shown.bs.modal', function() {
                    if (!gallerySwiper) {
                        gallerySwiper = new Swiper('.galleryModalSwiper', {
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                            keyboard: {
                                enabled: true,
                            },
                            initialSlide: index
                        });
                    } else {
                        gallerySwiper.slideTo(index, 0);
                    }
                }, { once: true });
            }
        });
    });

    // Results modal gallery
    const resultsThumbs = document.querySelectorAll('[data-bs-target="#resultsModal"]');
    resultsThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            const modal = document.getElementById('resultsModal');
            if (modal) {
                modal.addEventListener('shown.bs.modal', function() {
                    if (!resultsSwiper) {
                        resultsSwiper = new Swiper('.resultsModalSwiper', {
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true
                            },
                            keyboard: {
                                enabled: true,
                            },
                            initialSlide: index
                        });
                    } else {
                        resultsSwiper.slideTo(index, 0);
                    }
                }, { once: true });
            }
        });
    });

    const serviceCards = document.querySelectorAll('.service-card');
    const serviceData = {
        'Traditional Thai Massage': {
            description: 'Thai traditional massage has a 2500-year history of healing techniques. Combining yoga-like stretches with acupressure, treatments follow energy lines throughout the body.',
            details: `
                <div class="service-details">
                    <h5>Benefits</h5>
                    <ul>
                        <li>Improved blood circulation and metabolism</li>
                        <li>Muscle tension relief and increased flexibility</li>
                        <li>Stress relief and deep relaxation</li>
                        <li>Energy balance adjustment</li>
                    </ul>
                    <h5>Treatment Includes</h5>
                    <ul>
                        <li>Full body stretching</li>
                        <li>Acupressure and massage</li>
                        <li>Joint mobility improvement</li>
                        <li>Breathing technique guidance</li>
                    </ul>
                    <h5>Pricing</h5>
                    <ul>
                        <li>70 minute session: ¥5,000</li>
                        <li>100 minute session: ¥7,000</li>
                        <li>130 minute session: ¥9,000</li>
                    </ul>
                </div>
            `
        },
        'Foot Reflexology': {
            description: 'The feet contain reflex zones corresponding to organs and systems throughout the body. Stimulating these zones promotes overall health and restores balance.',
            details: `
                <div class="service-details">
                    <h5>Benefits</h5>
                    <ul>
                        <li>Internal organ activation</li>
                        <li>Improved blood circulation</li>
                        <li>Enhanced waste elimination</li>
                        <li>Boosted natural healing ability</li>
                    </ul>
                    <h5>Treatment Includes</h5>
                    <ul>
                        <li>Relaxing foot bath</li>
                        <li>Reflex zone stimulation</li>
                        <li>Calf muscle massage</li>
                        <li>Aromatherapy oil finish</li>
                    </ul>
                    <h5>Pricing</h5>
                    <ul>
                        <li>60 minute session: ¥6,000</li>
                    </ul>
                </div>
            `
        },
        'Aromatherapy Oil Massage': {
            description: 'Using carefully selected essential oils with gentle touch techniques for full body massage. Guides both body and mind to deep relaxation.',
            details: `
                <div class="service-details">
                    <h5>Benefits</h5>
                    <ul>
                        <li>Deep relaxation</li>
                        <li>Skin moisturizing and nourishment</li>
                        <li>Psychological benefits from aromatherapy</li>
                        <li>Improved lymphatic flow</li>
                    </ul>
                    <h5>Essential Oils</h5>
                    <ul>
                        <li>Lavender (Relaxation)</li>
                        <li>Peppermint (Refresh)</li>
                        <li>Ylang-Ylang (Balance)</li>
                        <li>Rosemary (Activation)</li>
                    </ul>
                    <h5>Pricing</h5>
                    <ul>
                        <li>70 minute session: ¥9,000</li>
                        <li>100 minute session: ¥13,000</li>
                        <li>130 minute session: ¥16,000</li>
                    </ul>
                </div>
            `
        },
        'Thai + Aroma Oil Combo': {
            description: 'Luxurious combination of traditional Thai massage and aromatherapy oil massage for ultimate mind and body relaxation.',
            details: `
                <div class="service-details">
                    <h5>Benefits</h5>
                    <ul>
                        <li>Muscle tension relief and stretching benefits</li>
                        <li>Deep relaxation and mental stability</li>
                        <li>Improved blood circulation and metabolism</li>
                        <li>Psychological benefits from aromatherapy</li>
                    </ul>
                    <h5>Treatment Includes</h5>
                    <ul>
                        <li>Full body stretching with Thai traditional massage</li>
                        <li>Relaxation massage with aromatic oils</li>
                        <li>Choice of your preferred essential oil</li>
                        <li>Private treatment in a fully enclosed room</li>
                    </ul>
                    <h5>Pricing</h5>
                    <ul>
                        <li>70 minute session: ¥8,000</li>
                        <li>100 minute session: ¥12,000</li>
                        <li>130 minute session: ¥15,000</li>
                    </ul>
                </div>
            `
        }
    };
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            const img = this.querySelector('img');
            const serviceModal = document.getElementById('serviceModal');
            
            if (serviceModal && serviceData[title]) {
                document.getElementById('serviceModalTitle').textContent = title;
                document.getElementById('serviceModalImage').src = img.src;
                document.getElementById('serviceModalImage').alt = img.alt;
                document.getElementById('serviceModalDescription').textContent = serviceData[title].description;
                document.getElementById('serviceModalDetails').innerHTML = serviceData[title].details;
                
                const bsModal = new bootstrap.Modal(serviceModal);
                bsModal.show();
            }
        });
    });
    
    const dateTimeInput = document.querySelector('input[type="datetime-local"]');
    if (dateTimeInput) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        dateTimeInput.min = now.toISOString().slice(0, 16);
        
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateTimeInput.max = maxDate.toISOString().slice(0, 16);
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});