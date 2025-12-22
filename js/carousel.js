// Media Carousel Logic
class MediaCarousel {
    constructor(cardElement) {
        this.card = cardElement;
        // Check if the passed element IS the carousel (e.g. for modal) or contains it
        if (cardElement.classList.contains('card-media-carousel') || cardElement.classList.contains('modal-media-gallery')) {
            this.carousel = cardElement;
        } else {
            this.carousel = cardElement.querySelector('.card-media-carousel') || cardElement.querySelector('.modal-media-gallery');
        }

        if (!this.carousel) return; // Guard clause

        this.items = Array.from(this.carousel.querySelectorAll('.media-item'));
        this.currentIndex = 0;
        this.interval = null;
        this.isPlaying = false;
        this.cycleTime = 4000; // 4 seconds per slide

        if (this.items.length > 1) {
            this.createControls();
            this.init();
        }
    }

    createControls() {
        // Create Previous Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.ariaLabel = "Previous Slide";

        // Create Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.ariaLabel = "Next Slide";

        // Append to Carousel
        this.carousel.appendChild(prevBtn);
        this.carousel.appendChild(nextBtn);

        // Add Listeners
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            this.prevSlide();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextSlide(true);
        });
    }

    init() {
        // Observe visibility to save resources
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.manualStop) {
                    this.startCycle();
                } else {
                    this.stopCycle();
                }
            });
        }, { threshold: 0.5 });

        this.observer.observe(this.card);

        this.observer.observe(this.card);

        // Pause on hover removed per user request for continuous loop

        // Pause if reduced motion is preferred
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            this.manualStop = true;
            this.stopCycle();
            this.observer.disconnect();
        }
    }

    startCycle() {
        if (this.isPlaying || this.manualStop) return;
        this.isPlaying = true;
        this.scheduleNextSlide();
    }

    scheduleNextSlide() {
        // Clear any existing timer/listeners
        this.clearSchedule();

        if (!this.isPlaying) return;

        const currentItem = this.items[this.currentIndex];
        const video = currentItem.querySelector('video');

        if (video) {
            // If video, wait for it to end
            // Ensure video is playing
            video.play().catch(e => console.log("Video autoplay blocked:", e));

            this.videoEndHandler = () => {
                this.nextSlide();
            };
            video.addEventListener('ended', this.videoEndHandler, { once: true });
        } else {
            // If image, wait 3 seconds
            this.timer = setTimeout(() => {
                this.nextSlide();
            }, 3000);
        }
    }

    clearSchedule() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        // Remove listener from current video if exists
        const currentItem = this.items[this.currentIndex];
        const video = currentItem.querySelector('video');
        if (video && this.videoEndHandler) {
            video.removeEventListener('ended', this.videoEndHandler);
            this.videoEndHandler = null;
        }
    }

    stopCycle(permanent = false) {
        this.isPlaying = false;
        this.clearSchedule();

        if (permanent) {
            this.manualStop = true;
        }

        const activeItem = this.items[this.currentIndex];
        const video = activeItem.querySelector('video');
        if (video && !video.paused) {
            video.pause();
        }
    }

    prevSlide() {
        // Clear any running schedule to prevent double-skipping
        this.clearSchedule();

        const prevIndex = this.currentIndex;
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateSlide(prevIndex);

        // Ensure loop continues
        if (!this.manualStop) {
            this.isPlaying = true;
            this.scheduleNextSlide();
        }
    }

    nextSlide(manual = false) {
        // Clear any running schedule
        this.clearSchedule();

        const prevIndex = this.currentIndex;
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateSlide(prevIndex);

        // Ensure loop continues
        if (!this.manualStop) {
            this.isPlaying = true;
            this.scheduleNextSlide();
        }
    }

    updateSlide(prevIndex) {
        // Hide previous
        this.items[prevIndex].classList.remove('active');
        const prevVideo = this.items[prevIndex].querySelector('video');
        if (prevVideo) {
            prevVideo.pause();
            prevVideo.currentTime = 0;
        }

        // Show next
        const newItem = this.items[this.currentIndex];
        newItem.classList.add('active');

        const newVideo = newItem.querySelector('video');
        if (newVideo) {
            // Only autoplay if we haven't manually stopped, or if explicitly requested. 
            // For now, let's play if it's visible, but maybe not if manual interaction happened? 
            // actually, if user clicks next to a video, they probably want to see it play.
            newVideo.play().catch(e => console.log("Video autoplay blocked or failed:", e));
        }
    }
}

// Initialize Carousels
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.querySelector('.card-media-carousel')) {
            new MediaCarousel(card);
        }
    });
});
