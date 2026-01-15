/**
 * Navigation module - reused from Transformer tutorial
 */

class Navigation {
    constructor() {
        this.currentSection = 'intro';
        this.sections = [
            'intro', 'recursion', 'rnn-intro', 'architecture',
            'forward', 'training', 'implementation'
        ];
        this.progress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupNavItems();
        this.setupNavigationButtons();
        this.updateProgress();
        this.restoreProgress();
    }

    setupNavItems() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                if (section) this.navigateToSection(section);
            });
        });
    }

    setupNavigationButtons() {
        document.querySelectorAll('.btn-next, .btn-restart').forEach(btn => {
            btn.addEventListener('click', () => {
                const next = btn.dataset.next;
                if (next) this.navigateToSection(next);
            });
        });

        document.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', () => {
                const prev = btn.dataset.prev;
                if (prev) this.navigateToSection(prev);
            });
        });
    }

    navigateToSection(sectionId) {
        document.getElementById(this.currentSection)?.classList.remove('active');
        document.getElementById(sectionId)?.classList.add('active');

        this.updateNavItems(sectionId);
        this.currentSection = sectionId;
        this.markAsVisited(sectionId);
        this.updateProgress();

        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.hash = sectionId;
        this.saveProgress();
    }

    updateNavItems(sectionId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    markAsVisited(sectionId) {
        if (!this.progress.visited.includes(sectionId)) {
            this.progress.visited.push(sectionId);
        }
        document.querySelector(`.nav-item[data-section="${sectionId}"]`)?.classList.add('completed');
    }

    updateProgress() {
        const percent = (this.progress.visited.length / this.sections.length) * 100;
        const fill = document.getElementById('progressFill');
        if (fill) fill.style.width = `${percent}%`;
    }

    saveProgress() {
        try {
            localStorage.setItem('trmTutorialProgress', JSON.stringify({
                currentSection: this.currentSection,
                visited: this.progress.visited,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {
            console.warn('Unable to save progress');
        }
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('trmTutorialProgress');
            return saved ? JSON.parse(saved) : { currentSection: 'intro', visited: ['intro'] };
        } catch (e) {
            return { currentSection: 'intro', visited: ['intro'] };
        }
    }

    restoreProgress() {
        const hash = window.location.hash.slice(1);
        if (hash && this.sections.includes(hash)) {
            this.navigateToSection(hash);
        } else if (this.progress.currentSection !== 'intro') {
            this.navigateToSection(this.progress.currentSection);
        }

        this.progress.visited.forEach(section => {
            document.querySelector(`.nav-item[data-section="${section}"]`)?.classList.add('completed');
        });
    }
}

export default Navigation;
