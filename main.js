xdocument.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                spans.forEach(span => span.classList.remove('active'));
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        if (heroSection) {
            const scrollPosition = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            if (scrollPosition < heroHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / (heroHeight * 0.8));
            }
        }
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section:not(.hero)');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Form submission (evitar redirección y mostrar pop-up)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Aquí puedes obtener los valores si necesitas hacer algo con ellos, por ejemplo:
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // No hay redirección, solo mostramos el pop-up
            showPopup();

            // Esto es opcional si deseas hacer algo con los datos del formulario, pero recuerda que en Netlify no es necesario hacer nada
            contactForm.reset();
        });
    }

    // Función para mostrar el pop-up
    function showPopup() {
        const popup = document.getElementById('popup');
        popup.classList.remove('hidden');
        popup.classList.add('show');

        // Ocultar el popup después de 3 segundos
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.classList.add('hidden'), 500);
        }, 3000);
    }
});
//[[redirects]]
//  from = "/success"
//  to = "/"
//  status = 200
//  force = true