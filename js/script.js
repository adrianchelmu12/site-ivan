document.addEventListener('DOMContentLoaded', function () {

    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const statNumbers = document.querySelectorAll('.stat-number');
    const sections = document.querySelectorAll('section[id]');

    let statsAnimated = false;

    /* ========== Mobile Menu Toggle ========== */
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navAnchors.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ========== Navbar Scroll Effect ========== */
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveNav();
        animateStats();
    });

    /* ========== Active Nav Link on Scroll ========== */
    function updateActiveNav() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop - 100;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < bottom) {
                navAnchors.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ========== Stats Counter Animation ========== */
    function animateStats() {
        if (statsAnimated) return;

        var aboutSection = document.getElementById('despre-noi');
        if (!aboutSection) return;

        var rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach(function (stat) {
                var target = parseInt(stat.getAttribute('data-target'));
                var duration = 2000;
                var startTime = null;

                function easeOutQuad(t) {
                    return t * (2 - t);
                }

                function updateCounter(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var elapsed = timestamp - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var easedProgress = easeOutQuad(progress);
                    var current = Math.floor(easedProgress * target);

                    stat.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    /* ========== Carousel ========== */
    var track = document.querySelector('.carousel-track');
    var slides = document.querySelectorAll('.carousel-slide');
    var dotsContainer = document.querySelector('.carousel-dots');
    var prevBtn = document.querySelector('.carousel-btn.prev');
    var nextBtn = document.querySelector('.carousel-btn.next');
    var currentIndex = 0;

    if (track && slides.length > 0) {

        slides.forEach(function (_, index) {
            var dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        var dots = document.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });

        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });

        /* ========== Lightbox ========== */
        var lightbox = document.getElementById('lightbox');
        var lightboxImg = document.getElementById('lightbox-img');
        var lightboxClose = document.querySelector('.lightbox-close');

        if (lightbox && lightboxImg && lightboxClose) {
            slides.forEach(function (slide) {
                var img = slide.querySelector('img');
                img.addEventListener('click', function () {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('open');
                });
            });

            lightboxClose.addEventListener('click', function () {
                lightbox.classList.remove('open');
            });

            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('open');
                }
            });
        }
    }

    /* ========== Scroll Reveal Animation ========== */
    var revealElements = document.querySelectorAll('.about-grid, .carousel, .contact-grid, .section-header');

    function revealOnScroll() {
        revealElements.forEach(function (el) {
            el.classList.add('reveal');
        });

        var allReveals = document.querySelectorAll('.reveal');
        allReveals.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    /* ========== Cookie Banner ========== */
    var cookieBanner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('cookie-accept-all');

    if (cookieBanner && acceptBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.classList.add('visible');
        }

        acceptBtn.addEventListener('click', function () {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('visible');
        });
    }
});
