// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial scroll to work section after page loads
    // This ensures the page scrolls to the work section automatically
    // Smooth scrolling for the bounce arrow - Now goes to work section instead of about
    const scrollArrow = document.querySelector('.bounce-arrow');
    const workSection = document.getElementById('work-section');
    
    if (scrollArrow && workSection) {
        scrollArrow.addEventListener('click', function() {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const workSectionTop = workSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: workSectionTop,
                behavior: 'smooth'
            });
            
            // Optional: Force animation of work section elements when scrolled to
            const workSectionElements = workSection.querySelectorAll('.hidden');
            setTimeout(() => {
                workSectionElements.forEach(el => {
                    el.classList.add('fade-in');
                });
            }, 500); // Small delay to ensure scroll completes first
        });
    }
    
    // Smooth scrolling for all navbar links
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
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
    
    // Modal functionality
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    // Close modal when clicking the X
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the modal content
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Open modal with content based on which button was clicked
    if (readMoreButtons && modal && modalBody) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const contentId = this.getAttribute('data-id');
                const content = getModalContent(contentId);
                
                modalBody.innerHTML = content;
                modal.style.display = 'block';
            });
        });
    }
    const animatedElements = document.querySelectorAll('.section-heading, .card, .about-content, .profile-image');
    
    // Add the 'hidden' class to all selected elements (makes them initially invisible)
    animatedElements.forEach(el => {
        el.classList.add('hidden');
    });
    initScrollAnimations();
    animateCards();
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
        root: null,           // Use viewport as root
        threshold: 0.15,      // 15% of item visible
        rootMargin: '0px 0px -100px 0px' // Triggers slightly before element enters viewport
    });
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Smooth page transitions
    document.querySelectorAll('a[href^="about.html"], a[href^="index.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process internal links
            if (this.href.includes('html')) {
                e.preventDefault();
                
                // Begin exit animation
                document.body.style.opacity = 0;
                document.body.style.transform = 'translateY(-20px)';
                document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                // After animation completes, navigate to the new page
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
    // Animation on page load/scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '0px'
    });
    
    // Observe elements with animate class
    document.querySelectorAll('.animate').forEach(element => {
        element.classList.add('hidden');
        observer.observe(element);
    });
    
    // Special handling for hero section - animate immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('hidden');
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 300);
    }
  
    // Close modal when clicking the X
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    }

    // Open modal with animation
    if (readMoreButtons && modal && modalBody) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const contentId = this.getAttribute('data-id');
                const content = getModalContent(contentId);
                
                modalBody.innerHTML = content;
                modal.style.display = 'block';
                
                const buttonPosition = this.getBoundingClientRect();
            const modalContent = modal.querySelector('.modal-content');
            
                // Force a reflow before adding the active class for the animation to work
                void modal.offsetWidth;
                modal.classList.add('active');
            });
        });
    }

    
    
    // Content for modals
    function getModalContent(id) {
        const contents = {
            'addverb': `
                <h2>Addverb Technologies</h2>
                <h4>Robotics Engineer | 2022-2024</h4>
                <p>At Addverb Technologies, I specialized in designing and implementing robotic solutions for warehouse automation.</p>
                <ul>
                    <li>Led the development of an autonomous navigation system that improved warehouse efficiency by 30%</li>
                    <li>Collaborated with cross-functional teams to integrate robotic systems with existing warehouse management software</li>
                    <li>Designed and implemented machine vision algorithms for object recognition and sorting</li>
                    <li>Developed custom firmware for embedded systems controlling robotic arms and conveyor systems</li>
                </ul>
                <p>Technologies used: ROS, Python, C++, Computer Vision, Machine Learning, Embedded Systems</p>
            `,
            'opennets': `
                <h2>OpenNets</h2>
                <h4>Software Developer | 2020-2022</h4>
                <p>At OpenNets, I worked on developing network infrastructure solutions and communication systems.</p>
                <ul>
                    <li>Built resilient network monitoring tools that reduced downtime by 45%</li>
                    <li>Developed API integrations between various network management systems</li>
                    <li>Created custom dashboards for real-time network performance visualization</li>
                    <li>Implemented security protocols and network optimization algorithms</li>
                </ul>
                <p>Technologies used: Java, Python, JavaScript, Node.js, Network Protocols, RESTful APIs</p>
            `,
            'navigation': `
                <h2>Autonomous Navigation System</h2>
                <p>An advanced navigation algorithm for mobile robots operating in dynamic environments with obstacle avoidance.</p>
                <h4>Key Features:</h4>
                <ul>
                    <li>Real-time path planning with dynamic obstacle avoidance</li>
                    <li>Integration with multiple sensor types (LiDAR, camera, ultrasonic)</li>
                    <li>Machine learning for environment classification and decision making</li>
                    <li>Optimized for low computational resources</li>
                </ul>
                <p>This project demonstrated a 40% improvement in navigation efficiency compared to traditional pathfinding algorithms.</p>
                <p>Technologies used: Python, ROS, TensorFlow, C++</p>
            `,
            'iot': `
                <h2>IoT Monitoring Dashboard</h2>
                <p>A comprehensive real-time monitoring system for industrial IoT sensors with advanced data visualization.</p>
                <h4>Key Features:</h4>
                <ul>
                    <li>Real-time data collection from various sensor types</li>
                    <li>Interactive dashboards with customizable widgets</li>
                    <li>Anomaly detection and predictive maintenance alerts</li>
                    <li>Historical data analysis and trend identification</li>
                </ul>
                <p>Implemented in three manufacturing facilities, resulting in a 25% reduction in equipment downtime.</p>
                <p>Technologies used: JavaScript, Node.js, MQTT, React, MongoDB, D3.js</p>
            `,
            'distributed': `
                <h2>Distributed Computing Framework</h2>
                <p>A lightweight framework for distributed computing tasks across multiple nodes with fault tolerance.</p>
                <h4>Key Features:</h4>
                <ul>
                    <li>Task scheduling and distribution based on node availability and capacity</li>
                    <li>Automatic recovery from node failures</li>
                    <li>Data synchronization and conflict resolution</li>
                    <li>Secure communication between nodes</li>
                </ul>
                <p>Used for processing large datasets in resource-constrained environments with 70% improvement in processing time.</p>
                <p>Technologies used: Go, gRPC, Protocol Buffers, Docker</p>
            `,
            'ar-grocery': `
                <h2>AR Grocery Shopping Experience</h2>
                <p>A hackathon project that uses augmented reality to enhance the grocery shopping experience.</p>
                <h4>Key Features:</h4>
                <ul>
                    <li>Product information overlay when scanning items with a smartphone camera</li>
                    <li>Nutritional information visualization and dietary restriction filtering</li>
                    <li>Recipe suggestions based on scanned products</li>
                    <li>Price comparison with nearby stores</li>
                </ul>
                <p>Won first place at the 2023 TechInnovate Hackathon.</p>
                <p>Technologies used: ARKit/ARCore, Unity, JavaScript, Node.js, MongoDB</p>
            `,
            'news': `
                <h2>Personalized News Aggregator</h2>
                <p>A news aggregation application that uses machine learning to curate content based on user preferences.</p>
                <h4>Key Features:</h4>
                <ul>
                    <li>Content filtering based on user reading habits and preferences</li>
                    <li>Topic categorization and sentiment analysis</li>
                    <li>Customizable reading interface with focus mode</li>
                    <li>Offline reading capabilities and syncing across devices</li>
                </ul>
                <p>Developed as a weekend project during a machine learning bootcamp.</p>
                <p>Technologies used: Python, Flask, React, Natural Language Processing, TensorFlow</p>
            `
        };
        
        return contents[id] || '<h2>Content coming soon!</h2>';
    }
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