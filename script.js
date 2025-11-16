// Table of Contents Active Link Highlighting
const tocLinks = document.querySelectorAll('.toc-list a');
const sections = document.querySelectorAll('[id]');
const tocCollapseBtn = document.getElementById('tocCollapseBtn');
const tocList = document.getElementById('tocList');

// Initialize with correct icon for closed state
if (tocList.classList.contains('d-none')) {
    tocCollapseBtn.innerHTML = '<i class="bi bi-chevron-down"></i>';
}

tocCollapseBtn.addEventListener('click', function () {
    tocList.classList.toggle('d-none');
    tocCollapseBtn.innerHTML = tocList.classList.contains('d-none')
        ? '<i class="bi bi-chevron-down"></i>'
        : '<i class="bi bi-chevron-up"></i>';
});

function updateActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
// Initial call
updateActiveLink();
