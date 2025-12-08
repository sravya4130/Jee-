// --- app.js (Updated for overlay and smooth toggle) ---

// --- 1. Sidebar Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menu-button');
    const overlay = document.getElementById('sidebar-overlay');

    // Function to toggle the sidebar open/closed
    const toggleSidebar = () => {
        const isOpen = sidebar.classList.toggle('open');
        overlay.classList.toggle('visible', isOpen);
    };

    menuButton.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking the dark overlay
    overlay.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            toggleSidebar(); // Uses toggleSidebar to close both
        }
    });

    // Highlight the current page in the sidebar
    // (Existing logic to highlight the active page)
    const currentPagePath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
        const itemHref = item.getAttribute('href').split('/').pop();
        if (itemHref === currentPagePath) {
            item.classList.add('active');
        }
    });

    // Initialize Tutor Data
    initializeTutorData();
});


// --- 2. Tutor Data Management (Unchanged from previous response) ---
const DEFAULT_TUTOR_NAMES = ['Alex', 'David', 'Sravya', 'Olivia', 'Mermi', 'Ogneson'];
const TUTOR_STORAGE_KEY = 'chemistryJeeTutors';
const SELECTED_TUTOR_KEY = 'chemistryJeeSelectedTutor';

function initializeTutorData() {
    if (!localStorage.getItem(TUTOR_STORAGE_KEY)) {
        localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(DEFAULT_TUTOR_NAMES));
    }
    if (!localStorage.getItem(SELECTED_TUTOR_KEY)) {
        localStorage.setItem(SELECTED_TUTOR_KEY, DEFAULT_TUTOR_NAMES[0]);
    }
}
function getTutorNames() {
    return JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY));
}
function getSelectedTutor() {
    return localStorage.getItem(SELECTED_TUTOR_KEY);
}
function setSelectedTutor(name) {
    localStorage.setItem(SELECTED_TUTOR_KEY, name);
}
function renameTutor(oldName, newName) {
    const names = getTutorNames();
    const index = names.indexOf(oldName);
    if (index !== -1) {
        names[index] = newName;
        localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(names));
    }
    if (getSelectedTutor() === oldName) {
        setSelectedTutor(newName);
    }
}
