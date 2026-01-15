/**
 * Navigation module
 * Handles section switching, progress tracking, and navigation state
 */

class Navigation {
    constructor() {
        this.currentSection = 'intro';
        this.sections = [
            'intro', 'basics', 'attention', 'self-attention',
            'multi-head', 'positional', 'architecture', 'examples'
        ];
        this.progress = this.loadProgress();

        this.init();
    }

    /**
     * Initialize navigation
     */
    init() {
        this.setupNavItems();
        this.setupNavigationButtons();
        this.updateProgress();
        this.restoreProgress();
    }

    /**
     * Setup navigation menu items
     */
    setupNavItems() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = item.dataset.section;
                if (section) {
                    this.navigateToSection(section);
                }
            });
        });
    }

    /**
     * Setup next/prev navigation buttons
     */
    setupNavigationButtons() {
        // Next buttons
        const nextButtons = document.querySelectorAll('.btn-next, .btn-restart');
        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const nextSection = btn.dataset.next;
                if (nextSection) {
                    this.navigateToSection(nextSection);
                }
            });
        });

        // Previous buttons
        const prevButtons = document.querySelectorAll('.btn-prev');
        prevButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const prevSection = btn.dataset.prev;
                if (prevSection) {
                    this.navigateToSection(prevSection);
                }
            });
        });
    }

    /**
     * Navigate to a specific section
     */
    navigateToSection(sectionId) {
        // Hide current section
        const currentSectionElement = document.getElementById(this.currentSection);
        if (currentSectionElement) {
            currentSectionElement.classList.remove('active');
        }

        // Show new section
        const newSectionElement = document.getElementById(sectionId);
        if (newSectionElement) {
            newSectionElement.classList.add('active');
        }

        // Update navigation state
        this.updateNavItems(sectionId);

        // Update progress
        this.currentSection = sectionId;
        this.markAsVisited(sectionId);
        this.updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL hash
        window.location.hash = sectionId;

        // Save progress
        this.saveProgress();
    }

    /**
     * Update active nav item
     */
    updateNavItems(sectionId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Mark section as visited
     */
    markAsVisited(sectionId) {
        if (!this.progress.visited.includes(sectionId)) {
            this.progress.visited.push(sectionId);
        }

        // Update nav item to show completion
        const navItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
        if (navItem) {
            navItem.classList.add('completed');
        }
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        const totalSections = this.sections.length;
        const visitedSections = this.progress.visited.length;
        const progressPercent = (visitedSections / totalSections) * 100;

        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        const progressData = {
            currentSection: this.currentSection,
            visited: this.progress.visited,
            timestamp: new Date().toISOString()
        };

        try {
            localStorage.setItem('transformerTutorialProgress', JSON.stringify(progressData));
        } catch (e) {
            console.warn('Unable to save progress:', e);
        }
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        try {
            const saved = localStorage.getItem('transformerTutorialProgress');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Unable to load progress:', e);
        }

        return {
            currentSection: 'intro',
            visited: ['intro']
        };
    }

    /**
     * Restore progress from localStorage
     */
    restoreProgress() {
        // Check URL hash first
        const hash = window.location.hash.slice(1);
        if (hash && this.sections.includes(hash)) {
            this.navigateToSection(hash);
            return;
        }

        // Otherwise restore from localStorage
        if (this.progress.currentSection && this.progress.currentSection !== 'intro') {
            this.navigateToSection(this.progress.currentSection);
        }

        // Mark visited sections
        this.progress.visited.forEach(section => {
            const navItem = document.querySelector(`.nav-item[data-section="${section}"]`);
            if (navItem) {
                navItem.classList.add('completed');
            }
        });
    }

    /**
     * Reset progress
     */
    resetProgress() {
        this.progress = {
            currentSection: 'intro',
            visited: ['intro']
        };

        this.saveProgress();
        this.navigateToSection('intro');

        // Remove completed class from all nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('completed');
        });

        this.updateProgress();
    }
}

export default Navigation;
