// Table of Contents Active Link Highlighting
const tocLinks = document.querySelectorAll('.toc-list a');
const tocSections = Array.from(tocLinks)
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

function updateActiveLink() {
    // Offset so the highlight switches slightly before the heading hits the top
    const scrollPos = window.scrollY + 180;
    let currentSectionId = tocSections[0] ? tocSections[0].id : '';

    for (let i = 0; i < tocSections.length; i++) {
        const thisTop = tocSections[i].offsetTop;
        const nextTop = tocSections[i + 1]?.offsetTop ?? Number.POSITIVE_INFINITY;
        if (scrollPos >= thisTop && scrollPos < nextTop) {
            currentSectionId = tocSections[i].id;
            break;
        }
    }

    tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === currentSectionId);
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
// Initial call
updateActiveLink();

// Smooth scrolling for TOC links
tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Close the offcanvas after clicking
            const offcanvasElement = document.getElementById('tocOffcanvas');
            if (offcanvasElement) {
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
            }
        }
    });
});
