/**
 * ==============================================================================
 * SHEPHERD99 - MAIN DASHBOARD UI INTERACTION ENGINE
 * ==============================================================================
 * Handles:
 * - Dynamic rendering of projects from projects-data.js
 * - Category filtering (Scanning, Detection, MITRE, IR, Networking, Linux)
 * - Mobile sidebar drawer toggle & accessibility
 * - ScrollSpy active link highlighting
 * - Real-time SOC UTC telemetry clock
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Elements
    const projectsContainer = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const utcClock = document.getElementById('utc-clock');
    const totalProjectsBadge = document.getElementById('total-projects-badge');

    // 1. Telemetry Clock (UTC Time)
    function updateClock() {
        if (!utcClock) return;
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        utcClock.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Mobile Drawer Navigation
    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeSidebar);
    }

    // Close mobile drawer when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });

    // Close mobile drawer when clicking a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        });
    });

    // 3. Render Project Cards
    function renderProjects(category = 'all') {
        if (!projectsContainer || typeof PROJECTS_DATA === 'undefined') return;

        const filtered = category === 'all' 
            ? PROJECTS_DATA 
            : PROJECTS_DATA.filter(p => p.category === category);

        if (totalProjectsBadge) {
            totalProjectsBadge.textContent = PROJECTS_DATA.length;
        }

        projectsContainer.innerHTML = '';

        if (filtered.length === 0) {
            projectsContainer.innerHTML = `
                <div class="empty-state">
                    <p class="mono-text">// NO TELEMETRY ENTRIES IN THIS DOMAIN YET</p>
                    <p class="muted-text">Lab write-up in progress. Check back shortly!</p>
                </div>
            `;
            return;
        }

        filtered.forEach(project => {
            const card = document.createElement('article');
            card.className = `project-card ${project.featured ? 'featured' : ''}`;
            card.setAttribute('data-category', project.category);

            // Badges
            const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
            const categoryBadge = `<span class="badge category-badge ${project.category}">${project.categoryName}</span>`;
            const statusBadge = `<span class="badge status-badge ${statusClass}">● ${project.status}</span>`;

            // Highlights list
            const highlightsHtml = project.highlights && project.highlights.length > 0
                ? `<ul class="project-highlights">
                    ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                   </ul>`
                : '';

            // Tags
            const tagsHtml = project.tags && project.tags.length > 0
                ? `<div class="project-tags">
                    ${project.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
                   </div>`
                : '';

            // Links / Actions
            let linksHtml = '';
            if (project.githubUrl) {
                linksHtml += `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="View Source Code on GitHub">
                        <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span>Repository</span>
                    </a>
                `;
            }
            if (project.writeupUrl && project.writeupUrl !== project.githubUrl) {
                const isInternal = project.writeupUrl.startsWith('#');
                linksHtml += `
                    <a href="${project.writeupUrl}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} class="btn btn-secondary">
                        <span>${isInternal ? 'View Lab Notes' : 'Read Write-Up'} &rarr;</span>
                    </a>
                `;
            }

            card.innerHTML = `
                <div class="card-header">
                    <div class="badge-group">
                        ${categoryBadge}
                        ${statusBadge}
                    </div>
                    <span class="project-date mono-text">${project.date}</span>
                </div>
                <h3 class="card-title">${project.title}</h3>
                <p class="card-summary">${project.summary}</p>
                ${highlightsHtml}
                ${tagsHtml}
                <div class="card-footer">
                    ${linksHtml}
                </div>
            `;

            projectsContainer.appendChild(card);
        });
    }

    // 4. Category Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const category = btn.getAttribute('data-filter') || 'all';
            renderProjects(category);
        });
    });

    // 5. ScrollSpy - Highlight Sidebar Links
    const sections = document.querySelectorAll('section[id]');
    function onScrollSpy() {
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });

    // Initial render
    renderProjects('all');
});
