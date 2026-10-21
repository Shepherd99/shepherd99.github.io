/**
 * ==============================================================================
 * CHRISTOPHER CHINEDU OSIGWE - MAIN DASHBOARD UI ENGINE
 * ==============================================================================
 * Handles:
 * - Dynamic rendering of Skills & Tools from SKILLS_DATA
 * - Collapsible Project Category Folders from CATEGORIES & PROJECTS_DATA
 * - Education section rendering from EDUCATION_DATA
 * - Certifications section rendering from CERTIFICATIONS_DATA
 * - Top navbar ScrollSpy and scroll styling
 * - Mobile navigation drawer and accessibility
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ── Elements ───────────────────────────────────────────────────────────────
    const skillsGrid = document.getElementById('skills-grid');
    const projectFolders = document.getElementById('project-folders');
    const totalProjectsBadge = document.getElementById('total-projects-badge');
    const educationGrid = document.getElementById('education-grid');
    const certsGrid = document.getElementById('certifications-grid');
    const topNavbar = document.getElementById('top-navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.navbar-links .nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');

    // ── SVG Icon Helper ────────────────────────────────────────────────────────
    function getCategoryIconSvg(iconType) {
        switch (iconType) {
            case 'shield':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
            case 'activity':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>';
            case 'crosshair':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>';
            case 'grid':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>';
            case 'network':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="2" width="6" height="6" rx="1"></rect><rect x="9" y="16" width="6" height="6" rx="1"></rect><path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path><line x1="12" y1="13" x2="12" y2="16"></line></svg>';
            case 'terminal':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>';
            case 'server':
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>';
            default:
                return '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle></svg>';
        }
    }

    // ── 1. Render Skills & Tools ───────────────────────────────────────────────
    function renderSkills() {
        if (!skillsGrid || typeof SKILLS_DATA === 'undefined') return;

        skillsGrid.innerHTML = '';
        SKILLS_DATA.forEach(group => {
            const card = document.createElement('div');
            card.className = 'skill-card';

            const iconSvg = getCategoryIconSvg(group.icon);
            const toolChips = group.tools.map(tool => `<span class="tool-chip">${tool}</span>`).join('');

            card.innerHTML = `
                <div class="skill-card-header">
                    <div class="skill-icon">
                        ${iconSvg}
                    </div>
                    <h3 class="skill-card-title">${group.title}</h3>
                </div>
                <div class="skill-tools">
                    ${toolChips}
                </div>
            `;
            skillsGrid.appendChild(card);
        });
    }

    // ── 2. Render Projects in Collapsible Category Folders ─────────────────────
    function renderProjectFolders() {
        if (!projectFolders || typeof CATEGORIES === 'undefined' || typeof PROJECTS_DATA === 'undefined') return;

        if (totalProjectsBadge) {
            totalProjectsBadge.textContent = PROJECTS_DATA.length;
        }

        projectFolders.innerHTML = '';

        CATEGORIES.forEach(cat => {
            const projects = PROJECTS_DATA.filter(p => p.category === cat.id);
            const count = projects.length;

            const folder = document.createElement('div');
            folder.className = 'project-folder';
            folder.setAttribute('data-category', cat.id);

            const iconSvg = getCategoryIconSvg(cat.icon);

            let bodyHtml = '';
            if (count === 0) {
                bodyHtml = `
                    <div class="empty-state">
                        <p class="mono-text">// NO TELEMETRY ENTRIES IN THIS DOMAIN YET</p>
                        <p class="muted-text">Lab write-up in progress. Check back shortly!</p>
                    </div>
                `;
            } else {
                bodyHtml = projects.map(project => {
                    const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
                    const categoryBadge = `<span class="badge category-badge ${project.category}">${cat.name}</span>`;
                    const statusBadge = `<span class="badge status-badge ${statusClass}">● ${project.status}</span>`;

                    const highlightsHtml = project.highlights && project.highlights.length > 0
                        ? `<ul class="project-highlights">
                            ${project.highlights.map(h => `<li>${h}</li>`).join('')}
                           </ul>`
                        : '';

                    const tagsHtml = project.tags && project.tags.length > 0
                        ? `<div class="project-tags">
                            ${project.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
                           </div>`
                        : '';

                    let linksHtml = '';
                    if (project.githubUrl) {
                        linksHtml += `
                            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" title="View Source Code on GitHub">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                <span>Repository</span>
                            </a>
                        `;
                    }
                    if (project.writeupUrl && project.writeupUrl !== project.githubUrl) {
                        linksHtml += `
                            <a href="${project.writeupUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                                <span>Write-Up &rarr;</span>
                            </a>
                        `;
                    }

                    return `
                        <article class="project-card ${project.featured ? 'featured' : ''}">
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
                        </article>
                    `;
                }).join('');
            }

            folder.innerHTML = `
                <div class="folder-header" role="button" aria-expanded="false" tabindex="0">
                    <div class="folder-header-left">
                        <div class="folder-icon ${cat.id}">
                            ${iconSvg}
                        </div>
                        <h3 class="folder-title">${cat.name}</h3>
                    </div>
                    <div class="folder-header-right">
                        <span class="folder-count">${count} ${count === 1 ? 'Lab' : 'Labs'}</span>
                        <svg class="folder-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="folder-body">
                    <div class="folder-content">
                        ${bodyHtml}
                    </div>
                </div>
            `;

            // Toggle expand/collapse
            const header = folder.querySelector('.folder-header');
            function toggleFolder() {
                const isOpen = folder.classList.contains('open');
                folder.classList.toggle('open');
                header.setAttribute('aria-expanded', !isOpen);
            }

            header.addEventListener('click', toggleFolder);
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFolder();
                }
            });

            projectFolders.appendChild(folder);
        });
    }

    // ── 3. Render Education ───────────────────────────────────────────────────
    function renderEducation() {
        if (!educationGrid || typeof EDUCATION_DATA === 'undefined') return;

        educationGrid.innerHTML = '';

        if (EDUCATION_DATA.length === 0) {
            educationGrid.innerHTML = `
                <div class="empty-state">
                    <p class="mono-text">// ACADEMIC CURRICULUM LOG</p>
                    <p class="muted-text">Academic and formal training programs will be published here. Check back soon!</p>
                </div>
            `;
            return;
        }

        EDUCATION_DATA.forEach(edu => {
            const card = document.createElement('div');
            card.className = 'education-card';

            const courseworkHtml = edu.coursework && edu.coursework.length > 0
                ? `<div class="edu-coursework">
                    ${edu.coursework.map(c => `<span class="tool-chip">${c}</span>`).join('')}
                   </div>`
                : '';

            card.innerHTML = `
                <div class="edu-header">
                    <div>
                        <h3 class="edu-institution">${edu.institution}</h3>
                        <div class="edu-program">${edu.program}</div>
                    </div>
                    <div>
                        <span class="edu-status-badge">${edu.status}</span>
                        <div class="edu-dates">${edu.dates}</div>
                    </div>
                </div>
                ${edu.description ? `<p class="edu-description">${edu.description}</p>` : ''}
                ${courseworkHtml}
            `;
            educationGrid.appendChild(card);
        });
    }

    // ── 4. Render Certifications ──────────────────────────────────────────────
    function renderCertifications() {
        if (!certsGrid || typeof CERTIFICATIONS_DATA === 'undefined') return;

        certsGrid.innerHTML = '';

        if (CERTIFICATIONS_DATA.length === 0) {
            certsGrid.innerHTML = `
                <div class="empty-state">
                    <p class="mono-text">// CREDENTIALS & CERTIFICATION REGISTRY</p>
                    <p class="muted-text">Active and prospective security certifications will be displayed here.</p>
                </div>
            `;
            return;
        }

        CERTIFICATIONS_DATA.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'cert-card';

            const statusClass = cert.status.toLowerCase().includes('active') ? 'active' : 'in-progress';
            const skillsHtml = cert.skills && cert.skills.length > 0
                ? `<div class="cert-skills">
                    ${cert.skills.map(s => `<span class="tool-chip">${s}</span>`).join('')}
                   </div>`
                : '';

            card.innerHTML = `
                <div class="cert-header">
                    <div>
                        <h3 class="cert-name">${cert.name}</h3>
                        <div class="cert-issuer">${cert.issuer}</div>
                    </div>
                    <div>
                        <span class="cert-status ${statusClass}">${cert.status}</span>
                        <div class="cert-date">${cert.date}</div>
                    </div>
                </div>
                ${skillsHtml}
                ${cert.credentialUrl ? `<div style="margin-top:0.5rem;"><a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding:0.3rem 0.6rem; font-size:0.74rem;">Verify Credential &rarr;</a></div>` : ''}
            `;
            certsGrid.appendChild(card);
        });
    }

    // ── 5. Mobile Drawer Navigation ───────────────────────────────────────────
    function openMobileNav() {
        if (!mobileNav) return;
        mobileNav.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        if (!mobileNav) return;
        mobileNav.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileNav);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
            closeMobileNav();
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileNav();
        });
    });

    // ── 6. Navbar Scroll Effect & ScrollSpy ────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        // Sticky navbar background styling
        if (topNavbar) {
            if (window.scrollY > 30) {
                topNavbar.classList.add('scrolled');
            } else {
                topNavbar.classList.remove('scrolled');
            }
        }

        // ScrollSpy active link highlighting
        const scrollPosition = window.scrollY + 160;

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

                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 7. Initial Mount ──────────────────────────────────────────────────────
    renderSkills();
    renderProjectFolders();
    renderEducation();
    renderCertifications();
    onScroll();
});
