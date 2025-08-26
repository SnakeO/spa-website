document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const bookingForm = document.getElementById('bookingForm');
    const quickBookingForm = document.getElementById('quickBookingForm');
    const navbar = document.querySelector('.navbar');
    
    let gallerySwiper = null;
    
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
                            ご予約ありがとうございます！すぐにご連絡いたします。
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
    
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceData = {
        '伝統タイマッサージ': {
            description: 'タイ古式マッサージは2500年の歴史を持つ伝統的な癒しの技術です。ヨガのようなストレッチと指圧を組み合わせ、エネルギーラインに沿って施術を行います。',
            details: `
                <div class="service-details">
                    <h5>効果</h5>
                    <ul>
                        <li>血行促進と新陳代謝の向上</li>
                        <li>筋肉の緊張緩和と柔軟性向上</li>
                        <li>ストレス解消とリラクゼーション</li>
                        <li>エネルギーバランスの調整</li>
                    </ul>
                    <h5>施術内容</h5>
                    <ul>
                        <li>全身のストレッチング</li>
                        <li>指圧とマッサージ</li>
                        <li>関節の可動域改善</li>
                        <li>呼吸法の指導</li>
                    </ul>
                    <h5>料金</h5>
                    <ul>
                        <li>60分コース: ¥6,000</li>
                        <li>90分コース: ¥8,500</li>
                        <li>120分コース: ¥11,000</li>
                    </ul>
                </div>
            `
        },
        '足裏リフレクソロジー': {
            description: '足裏には全身の臓器や器官に対応する反射区があります。これらを刺激することで、全身の健康促進とバランス回復を図ります。',
            details: `
                <div class="service-details">
                    <h5>効果</h5>
                    <ul>
                        <li>内臓機能の活性化</li>
                        <li>血液循環の改善</li>
                        <li>老廃物の排出促進</li>
                        <li>自然治癒力の向上</li>
                    </ul>
                    <h5>施術内容</h5>
                    <ul>
                        <li>足浴でのリラクゼーション</li>
                        <li>足裏の反射区への刺激</li>
                        <li>ふくらはぎのマッサージ</li>
                        <li>アロマオイルでの仕上げ</li>
                    </ul>
                    <h5>料金</h5>
                    <ul>
                        <li>30分コース: ¥3,500</li>
                        <li>60分コース: ¥6,000</li>
                    </ul>
                </div>
            `
        },
        'アロマオイルマッサージ': {
            description: '厳選されたエッセンシャルオイルを使用し、優しいタッチで全身をマッサージ。心身ともに深いリラクゼーションへと導きます。',
            details: `
                <div class="service-details">
                    <h5>効果</h5>
                    <ul>
                        <li>深いリラクゼーション</li>
                        <li>肌の保湿と栄養補給</li>
                        <li>アロマによる心理的効果</li>
                        <li>リンパの流れ改善</li>
                    </ul>
                    <h5>使用オイル</h5>
                    <ul>
                        <li>ラベンダー（リラックス）</li>
                        <li>ペパーミント（リフレッシュ）</li>
                        <li>イランイラン（バランス）</li>
                        <li>ローズマリー（活性化）</li>
                    </ul>
                    <h5>料金</h5>
                    <ul>
                        <li>60分コース: ¥7,500</li>
                        <li>90分コース: ¥10,500</li>
                    </ul>
                </div>
            `
        },
        'タイストレッチ療法': {
            description: 'ヨガのポーズを取り入れたパッシブストレッチング。セラピストがお客様の体を優しく動かし、深いストレッチを実現します。',
            details: `
                <div class="service-details">
                    <h5>効果</h5>
                    <ul>
                        <li>柔軟性の大幅な向上</li>
                        <li>姿勢の改善</li>
                        <li>慢性的な痛みの緩和</li>
                        <li>運動能力の向上</li>
                    </ul>
                    <h5>施術内容</h5>
                    <ul>
                        <li>全身の可動域チェック</li>
                        <li>段階的なストレッチング</li>
                        <li>呼吸と動きの調和</li>
                        <li>アフターケアアドバイス</li>
                    </ul>
                    <h5>料金</h5>
                    <ul>
                        <li>45分コース: ¥5,500</li>
                        <li>60分コース: ¥7,000</li>
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