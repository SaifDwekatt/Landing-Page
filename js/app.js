// Select all sections and navbar list
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

// Check if a section is in the viewport
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= 0.6 * window.innerHeight;
};

// Remove 'active' class from all sections
const removeActiveClasses = () => {
    sections.forEach((section) => section.classList.remove('your-active-class'));
};

// Build the navigation dynamically
const buildNav = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach((section) => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        navLink.className = 'menu__link';
        navLink.textContent = section.getAttribute('data-nav');
        navLink.href = `#${section.id}`;
        navLink.addEventListener('click', (event) => {
            event.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });
        navItem.appendChild(navLink);
        fragment.appendChild(navItem);
    });
    navbarList.appendChild(fragment);
};

// Highlight the section currently in the viewport
const highlightSectionInViewport = () => {
    sections.forEach((section) => {
        if (isInViewport(section)) {
            removeActiveClasses();
            section.classList.add('your-active-class');
        }
    });
};

// Initialize navigation and add scroll event listener
document.addEventListener('DOMContentLoaded', buildNav);
window.addEventListener('scroll', highlightSectionInViewport);
