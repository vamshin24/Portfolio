// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to important elements
    const scrollArrow = document.querySelector('.bounce-arrow');
    const workSection = document.getElementById('work-section');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarLinks = document.querySelector('.navbar-links');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const icon = darkModeToggle.querySelector('i');

    // Toggle navbar links visibility
    if (hamburgerMenu && navbarLinks) {
        hamburgerMenu.addEventListener('click', function () {
            navbarLinks.classList.toggle('active');
        });
    }
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Title Rotator for Hero section
    const rotatingText = document.getElementById('rotating-text');
    if (rotatingText) {
        const words = ["Software", "Backend", "Robotics Software", "Applied AI", "Distributed Systems"];
        let wordIndex = 0;
        setInterval(() => {
            rotatingText.classList.add('fade-out');
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatingText.textContent = words[wordIndex];
                rotatingText.classList.remove('fade-out');
            }, 250); // Matches transition duration in CSS (0.25s)
        }, 3000); // 3 seconds interval
    }

    // Toggle dark mode when button is clicked
    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for the bounce arrow
    if (scrollArrow && workSection) {
        scrollArrow.addEventListener('click', function () {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const workSectionTop = workSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: workSectionTop,
                behavior: 'smooth'
            });

            // Force animation of work section elements when scrolled to
            const workSectionElements = workSection.querySelectorAll('.hidden');
            setTimeout(() => {
                workSectionElements.forEach(el => {
                    el.classList.add('fade-in');
                });
            }, 500);
        });
    }

    // The rest of your existing functionality...
    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll('.navbar-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetSectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetSectionTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Modal Logic
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const readMoreButtons = document.querySelectorAll('.read-more');
    let activeModalCarousel = null; // Track the carousel instance

    // Open Modal
    if (readMoreButtons) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const card = this.closest('.card');
                const hiddenDetails = card.querySelector('.card-hidden-details');
                const mediaCarousel = card.querySelector('.card-media-carousel');

                if (hiddenDetails && modal && modalBody) {
                    // Clear previous content
                    modalBody.innerHTML = '';

                    // Clone Media (Images/Videos)
                    if (mediaCarousel) {
                        const mediaClone = mediaCarousel.cloneNode(true);
                        mediaClone.className = 'modal-media-gallery';
                        modalBody.appendChild(mediaClone);

                        // Initialize Carousel for Modal
                        activeModalCarousel = new MediaCarousel(mediaClone);
                        activeModalCarousel.init();
                    }

                    // Clone Content
                    const contentClone = hiddenDetails.cloneNode(true);
                    contentClone.removeAttribute('hidden');
                    contentClone.style.display = 'block';
                    contentClone.className = 'modal-text-content';
                    modalBody.appendChild(contentClone);

                    // Show Modal
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Disable background scroll
                }
            });
        });
    }

    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (activeModalCarousel) {
                activeModalCarousel.stopCycle(true);
                if (activeModalCarousel.observer) activeModalCarousel.observer.disconnect();
                activeModalCarousel = null;
            }
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scroll
            modalBody.innerHTML = ''; // Clear content
        });
    }

    // Close on outside click (Attached to modal, not window, to prevent bubbling issues)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (activeModalCarousel) {
                    activeModalCarousel.stopCycle(true);
                    if (activeModalCarousel.observer) activeModalCarousel.observer.disconnect();
                    activeModalCarousel = null;
                }
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                modalBody.innerHTML = '';
            }
        });
    }

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            if (activeModalCarousel) {
                activeModalCarousel.stopCycle(true);
                if (activeModalCarousel.observer) activeModalCarousel.observer.disconnect();
                activeModalCarousel = null;
            }
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalBody.innerHTML = '';
        }
    });
});

function initScrollAnimations() {
    // Elements to animate when scrolled into view
    const animatedElements = document.querySelectorAll('.section-heading, .card, .about-content, .profile-image');

    // Apply initial hidden state
    animatedElements.forEach(el => {
        el.classList.add('hidden');
    });

    // Create observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When element is in view
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('fade-in');
                // Stop observing after animation
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // 15% of item visible
        rootMargin: '0px 0px -100px 0px' // Triggers slightly before element enters viewport
    });

    // Start observing elements
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Add staggered animation to card sections
function animateCards() {
    const sections = document.querySelectorAll('.cards-container');

    sections.forEach(section => {
        const cards = section.querySelectorAll('.card');

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}