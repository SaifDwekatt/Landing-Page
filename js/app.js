const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');

const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= 0.6 * window.innerHeight;
};

const removeActiveClasses = () => {
    sections.forEach((section) => section.classList.remove('your-active-class'));
};

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

const highlightSectionInViewport = () => {
    sections.forEach((section) => {
        if (isInViewport(section)) {
            removeActiveClasses();
            section.classList.add('your-active-class');
        }
    });
};

document.addEventListener('DOMContentLoaded', buildNav);
window.addEventListener('scroll', highlightSectionInViewport);
