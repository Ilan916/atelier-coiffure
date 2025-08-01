// Menu mobile functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const body = document.body;
    const menuOverlay = document.querySelector('.menu-overlay');

    function toggleMenu() {
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Bloquer/débloquer le scroll
        if (!isActive) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur l'overlay
    menuOverlay.addEventListener('click', closeMenu);

    // Fermer le menu quand on clique sur un lien
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    // Changer l'apparence de la navbar au scroll
    window.addEventListener('scroll', function() {
        const headerHeight = header.offsetHeight;
        
        if (window.scrollY > headerHeight - 70) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Smooth scroll avec offset pour compenser la navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20; // 20px de marge supplémentaire
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATIONS AU SCROLL =====
    
    // Fonction pour vérifier si un élément est visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // L'élément est visible s'il est à 80% dans la fenêtre
        return (
            rect.top >= -rect.height * 0.2 &&
            rect.top <= windowHeight * 0.8
        );
    }

    // Fonction pour animer les éléments
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Observer plus performant avec Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Une fois l'animation déclenchée, on peut arrêter d'observer cet élément
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec des classes d'animation
        const elementsToAnimate = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in');
        elementsToAnimate.forEach(el => observer.observe(el));
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('resize', animateOnScroll);
        
        // Animation initiale
        animateOnScroll();
    }
});