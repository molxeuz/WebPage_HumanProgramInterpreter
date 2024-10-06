document.getElementById('close-message').addEventListener('click', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const projectsSection = document.getElementById('projects');
    welcomeMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    welcomeMessage.style.opacity = '0';
    welcomeMessage.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        welcomeMessage.style.display = 'none';
        projectsSection.style.transition = 'margin-top 0.5s ease';
        projectsSection.style.marginTop = '70px';
    }, 500);
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        const fadeOutSection = document.querySelector('section.fade');
        fadeOutSection.style.transition = 'opacity 0.5s ease';
        fadeOutSection.style.opacity = '0';
        fadeOutSection.addEventListener('transitionend', function() {
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 50);
        }, { once: true });
    });
});
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
    };
    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
    };
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        const darkMode = localStorage.getItem('dark-mode');
        if (darkMode !== 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            const fadeOutSection = document.querySelector('section.fade');
            fadeOutSection.style.transition = 'opacity 0.5s ease';
            fadeOutSection.style.opacity = '0';
            fadeOutSection.addEventListener('transitionend', function() {
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 50);
            }, { once: true });
        });
    });
});