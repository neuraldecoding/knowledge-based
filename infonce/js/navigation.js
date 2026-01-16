// Navigation Logic for InfoNCE Tutorial

class Navigation {
    constructor() {
        this.sections = ['intro', 'math', 'mechanics', 'temperature', 'symmetric', 'implementation', 'applications'];
        this.currentSection = 'intro';
        this.init();
    }

    init() {
        // Setup nav item click handlers
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                this.navigateTo(section);
            });
        });

        // Update progress on load
        this.updateProgress();
    }

    navigateTo(sectionId) {
        // Hide current section
        const currentElement = document.getElementById(this.currentSection);
        if (currentElement) {
            currentElement.classList.remove('active');
        }

        // Show new section
        const newElement = document.getElementById(sectionId);
        if (newElement) {
            newElement.classList.add('active');
            this.currentSection = sectionId;

            // Update nav items
            this.updateNavItems(sectionId);

            // Update progress bar
            this.updateProgress();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateNavItems(sectionId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    updateProgress() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        const progress = ((currentIndex + 1) / this.sections.length) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    next() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        if (currentIndex < this.sections.length - 1) {
            this.navigateTo(this.sections[currentIndex + 1]);
        }
    }

    previous() {
        const currentIndex = this.sections.indexOf(this.currentSection);
        if (currentIndex > 0) {
            this.navigateTo(this.sections[currentIndex - 1]);
        }
    }
}

// Export for use in other modules
export default Navigation;
