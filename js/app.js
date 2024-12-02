// Select all sections and navbar list
const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

// Check if a section is in the viewport
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight * 0.6; // Dynamically check the viewport
};

// Remove 'active' class from all sections
const removeActiveClasses = () => {
    sections.forEach((section) => section.classList.remove('your-active-class'));
    document.querySelectorAll('.menu__link').forEach((link) => link.classList.remove('active'));
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
    let activeSectionFound = false; // Prevent multiple active states
    sections.forEach((section) => {
        if (isInViewport(section) && !activeSectionFound) {
            removeActiveClasses();
            section.classList.add('your-active-class');

            // Highlight corresponding navbar link
            const activeLink = document.querySelector(`.menu__link[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');

            activeSectionFound = true; // Mark the first visible section as active
        }
    });
};

// Initialize navigation and add scroll event listener
document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    highlightSectionInViewport(); // Highlight the first section on page load
});
window.addEventListener('scroll', highlightSectionInViewport);
