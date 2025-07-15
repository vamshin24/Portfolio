// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to important elements
    const scrollArrow = document.querySelector('.bounce-arrow');
    const workSection = document.getElementById('work-section');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarLinks = document.querySelector('.navbar-links');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const icon = darkModeToggle.querySelector('i');

    // Toggle navbar links visibility
    hamburgerMenu.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
    });
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Toggle dark mode when button is clicked
    darkModeToggle.addEventListener('click', function() {
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
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for the bounce arrow
    if (scrollArrow && workSection) {
        scrollArrow.addEventListener('click', function() {
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
    
    // Open modal with animation
    if (readMoreButtons && modal && modalBody) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const contentId = this.getAttribute('data-id');
                const content = getModalContent(contentId);
                
                modalBody.innerHTML = content;
                modal.style.display = 'block';
                
                // Force a reflow before adding the active class for the animation to work
                void modal.offsetWidth;
                modal.classList.add('active');
            });
        });
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
    
    // Initialize animations
    initScrollAnimations();
    animateCards();
    
    // Content for modals
    function getModalContent(id) {
        const contents = {
            'addverb': `
                <h2>Addverb Technologies</h2>
                <h4>Robotics Software Engineer | 2022 - 2023</h4>
                <p>Worked on full-stack development and systems engineering for warehouse robotics, focusing on automation, real-time coordination, and backend optimization using Java, Python, and messaging systems like Kafka and Redis. Delivered scalable solutions that enhanced performance, reliability, and throughput in real-world industrial environments.</p>
                <ul>
                    <li>Designed and deployed a DWS (Dimensioning, Weighing, Scanning) system with microservices architecture and REST APIs, improving inbound logistics automation by 80%.</li>
                    <li>Enhanced robotic communication reliability by implementing TCP/IP socket communication and PLC programming, reducing signal transmission latency by 20%.</li>
                    <li>Refactored warehouse control system (WCS) scheduling logic in Python (Django), resolving 70+ bugs and improving storage efficiency by 35%.</li>
                    <li>Optimized inter-system messaging using Redis, Kafka, and RabbitMQ to increase real-time coordination between robotic subsystems (Zippy and SortIE) by 15%.</li>
                    <li>Led the architecture for an inbound palletization system using Spring Boot and Maven, boosting throughput and warehouse efficiency by 40%.</li>
                </ul>
                <p></p>
                <p>Techstack used: Java, Spring Boot, MSSQL, Redis, Kafka, RabbitMQ, Python, Django, TCP/IP, PLC Programming.</p>
            `,
            'opennets': `
                <h2>OpenNets</h2>
                <h4>Full Stack Developer Intern| May 2021 - July 2021</h4>
                <p>Built a network simulation platform and interactive UI to support custom topology testing and performance analysis. Focused on backend logic, real-time simulation, and frontend improvements using Mininet, Node.js, MongoDB, and AngularJS.</p>
                <ul>
                    <li>Developed a modular network simulation tool using Mininet, Node.js, and MongoDB, enabling users to emulate and test 10+ network topologies with variable traffic configurations.</li>
                    <li>Reduced configuration-related errors by 30% by automating topology generation and real-time traffic evaluation in the simulator.</li>
                    <li>Built a dynamic user interface with AngularJS for editing topology parameters, contributing to ~30% of the front-end feature set.</li>
                    <li>Collaborated in an Agile development environment using Git, attending sprint meetings, conducting code reviews, and ensuring timely feature delivery aligned with user needs.</li>
                </ul>
                <p></p>
                <p>Techstack used: Mininet, Node.js, MongoDB, AngularJS, Git, Agile Methodology.</p>
            `,
            'navigation': `
                <h2>UAV Autonomous Landing & Color-Based Navigation</h2>
                <p>I developed an autonomous navigation system for the Parrot Mambo Mini Drone using color-based line following and shape detection. The system enables the drone to autonomously take off, follow a colored line (in red, green, or blue), and detect a circular marker at the end of the line to initiate a controlled landing. Using MATLAB Simulink, real-time camera feedback, and improved HSV-based color detection, the drone continuously adjusts its movement to stay aligned with the path. The project successfully demonstrated the integration of computer vision for real-time image processing, motion correction, and autonomous decision-making, laying the foundation for more complex navigation tasks in aerial robotics.</p>
                <p>Techstack used: OpenCV, Python, Gazebo, MATLAB.</p>
            `,
            'iot': `
                <h2>Path Planning for Maze Solving with MyCobot Pro 600</h2>
                <p>I developed an autonomous solution for solving a 4x4 maze using the MyCobot Pro 600 robotic arm. The maze image was captured using an AI Kit camera, processed to extract the solution path, and converted into waypoints that the robot could follow. The maze-solving algorithm relied on morphological operations and skeletonization to determine the shortest path. These waypoints were then transformed into robot coordinates using inverse kinematics, and the robotic arm autonomously navigated the maze with straight-line movements. The process involved validating the solution through a digital twin, ensuring accurate path planning, and executing the movements through TCP communication with the robot. The project successfully demonstrated autonomous maze solving with the MyCobot Pro 600, showcasing robust image processing and kinematic control techniques.</p>
                <p>Techstack used: Python, OpenCV, MATLAB Simulink, ROS2, Inverse Kinematics.</p>
            `,
            'distributed': `
                <h2>WhatsApp Group Chat Analysis</h2>
                <p>This project leverages Python and a diverse set of libraries to analyze exported WhatsApp chat data. The tech stack includes Pandas for data manipulation and statistical analysis, NumPy for efficient numerical operations, regex for parsing message formats, and emoji for identifying and counting emoji usage. By extracting and processing messages, the tool provides comprehensive insights into chat activity, such as message counts, media, emoji usage, and shared links, all broken down by individual users. This versatile project highlights the power of Python for data parsing and exploratory analysis.</p>
                <p>Techstack used: Python, Pandas, NumPy, regex.</p>
                `,
            'project4': `
                <h2>Task Management Application</h2>
                <p>This application allows users to register, log in, and manage tasks (view, create, update, delete). The focus is on functionality, code clarity, and correctness.Only authenticated users can perform task operations.Password Hashing: Use bcrypt or another hashing library to store passwords securely.Token Verification: Verify the token (JWT) on each request to protected routes.The backend is implemented using Node.js/Express with TypeScript and PostgreSQL for data persistence, while the frontend is built with React and TypeScript.</p>
                <p>Techstack used: Node.js, Express, PostgreSQL, TypeScript, React.</p>
                `,
            'project5': `
                <h2>Image Restoration of Natural Images</h2>
                <p>In this project, I developed a solution to restore rain-degraded images using deep learning, enhancing applications like outdoor surveillance and autonomous vehicles. Leveraging MATLAB, PyTorch, and Python, I implemented a Multi-Stage Progressive Restoration Network (MPRNet) that combines CNNs with an encoder-decoder design. The model breaks restoration into progressive subtasks, uses supervised attention to refine features, and integrates multi-scale feature aggregation for high-quality outputs. This approach achieved state-of-the-art results on synthetic and real-world datasets for image deraining, deblurring, and denoising with computational efficiency.</p>
                <p>Techstack used: PyTorch, CNN Encoder-Decoder Network, ORSNet.</p>
                `,
            'project6': `
                <h2>Performance enhancement of underwater communication</h2>
                <p>I developed a machine learning model in MATLAB to simulate light propagation in ocean waters, aiming to improve data rates and wireless capabilities for underwater Free Space Optical (FSO) links, addressing the bandwidth limitations of acoustic communication. Using NumPy and Simulink libraries, I built a simulation environment to model underwater optical channels, factoring in light scattering, absorption, and turbulence. The machine learning model optimized signal integrity and data recovery in challenging underwater conditions. This project showcased the potential of combining machine learning with optical communication to enable high-speed, reliable underwater data transfer for exploration, autonomous vehicles, and environmental monitoring.</p>
                <p>Techstack used: PyTorch, MATLAB, NumPy.</p>
                `,
            'fun-project3': `
                <h2>Open-Seq-Me</h2>
                <p>In the PU Automations Hackathon, I worked on automating the sample sequencing process in laboratory environments, which traditionally requires manual intervention for repetitive tasks. Our solution aimed to improve speed, precision, and reliability by integrating robotics, particularly the Dobot Magician Lite. The process involved automating the handling, cutting, retrieval, and placement of products into the sequencer, as well as efficiently discarding waste. Key technologies included laser cutting, a vibrating metal sheet for casing separation, and the use of a conveyor belt system for product movement. I contributed to the development of Sequoia, an AI-powered assistant built with LangChain and GPT-4 Turbo, which guides engineers and stakeholders through the automation process. By optimizing the workflow with just one robot and leveraging environmental factors, we reduced hardware complexity and costs, creating a more efficient and scalable solution. The project provided real-world experience in rapid prototyping, automation, and problem-solving, pushing the team to think creatively and work collaboratively.</p>
                <p>Techstack used: Dobot Magician Lite, AI, Python, Pydobot.</p>
            `,
            'fun-project4': `
                <h2>AeroChain</h2>
                <p>In the AeroChain project, I worked as part of a team to address the inefficiencies in the aerospace supply chain. We developed a blockchain-based solution to streamline data management and provide centralized, real-time visibility into orders, shipments, and supplier performance. My contributions focused on leveraging AI-driven insights for demand prediction and proactive planning, while helping build features that enabled smart sourcing decisions and supported transparent, tamper-proof tracking of supply chain activities. I also helped integrate tools like an onboarding chatbot and a visual insight assistant, facilitating seamless interaction with the system. Our platform improved inventory management, reduced administrative costs, and fostered better supplier relationships. As part of the future development plan, I’m excited about incorporating digital twin simulations and sustainability features into the system for further optimization.</p>
                <p>Techstack used: React.js, Smart Contracts, Blockchain.</p>
            `,
            'fun-project5': `
                <h2>Endstar Game Development</h2>
                <p>In the Endstar Game Maker Spark Challenge, the Team Educate! developed a game titled Sun Devil Hero: Saving President Crow. The game is designed to offer an engaging learning experience for freshmen at ASU, combining education with gaming in a fun and interactive environment. The story follows Agent Sparky, who must rescue President Crow within the game world. The game is built using Endstar, a platform focused on world-building and rapid application development (RAD), facilitating enterprise-level game development. Throughout the hackathon, the team leveraged AI and game design principles to create an immersive educational experience. The project demonstrated how games can be utilized for educational purposes while providing a valuable, hands-on experience with game development tools and platforms. The team learned key takeaways such as the ease of use and versatility of the Endstar platform, which supports both rapid development and deployment.</p>
                <p>Techstack used: LUA scripting, AI, Decision Trees, UI/UX Design.</p>
            `,
            'news': `
                <h2>Food Sage: OCR</h2>
                <p>This project WON! a hackathon organized by Voxel51, focusing on Visual AI. This project focuses on identifying and extracting the ingredients section from processed food packaging. The extracted ingredients are then categorized into three levels of potential harmfulness. By leveraging computer vision and optical character recognition (OCR) techniques, the system analyzes the ingredient lists and assesses their relative health impact.</p>
                <p>Techstack used: Python, OCR, Pytesseract.</p>
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