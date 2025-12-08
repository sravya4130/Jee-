// --- app.js ---

// --- 1. Sidebar Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuButton = document.getElementById('menu-button');

    // Function to toggle the sidebar open/closed
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
    };

    menuButton.addEventListener('click', toggleSidebar);

    // Optional: Close sidebar if user clicks outside of it (simple implementation)
    document.addEventListener('click', (event) => {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(event.target) && 
            !menuButton.contains(event.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Highlight the current page in the sidebar
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


// --- 2. Tutor Data Management using LocalStorage ---
const DEFAULT_TUTOR_NAMES = ['Alex', 'David', 'Sravya', 'Olivia', 'Mermi', 'Ogneson'];
const TUTOR_STORAGE_KEY = 'chemistryJeeTutors';
const SELECTED_TUTOR_KEY = 'chemistryJeeSelectedTutor';

// Function to initialize data in localStorage if it doesn't exist
function initializeTutorData() {
    if (!localStorage.getItem(TUTOR_STORAGE_KEY)) {
        localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(DEFAULT_TUTOR_NAMES));
    }
    if (!localStorage.getItem(SELECTED_TUTOR_KEY)) {
        localStorage.setItem(SELECTED_TUTOR_KEY, DEFAULT_TUTOR_NAMES[0]);
    }
}

// Function to get the current list of tutor names
function getTutorNames() {
    return JSON.parse(localStorage.getItem(TUTOR_STORAGE_KEY));
}

// Function to get the currently selected tutor
function getSelectedTutor() {
    return localStorage.getItem(SELECTED_TUTOR_KEY);
}

// Function to set the currently selected tutor (used in tutors.html)
function setSelectedTutor(name) {
    localStorage.setItem(SELECTED_TUTOR_KEY, name);
}

// Function to rename a tutor (used in settings.html)
function renameTutor(oldName, newName) {
    const names = getTutorNames();
    const index = names.indexOf(oldName);
    if (index !== -1) {
        names[index] = newName;
        localStorage.setItem(TUTOR_STORAGE_KEY, JSON.stringify(names));
    }
    
    // Update selected tutor if the renamed tutor was selected
    if (getSelectedTutor() === oldName) {
        setSelectedTutor(newName);
    }
}
