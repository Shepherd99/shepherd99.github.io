# Christopher Chinedu Osigwe | Cybersecurity Portfolio & Threat Lab

[![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-blue?style=flat&logo=github)](https://shepherd99.github.io)
[![Zero Budget](https://img.shields.io/badge/Budget-$0.00%20(Open%20Source)-emerald?style=flat)](#)
[![SOC Status](https://img.shields.io/badge/SOC%20Posture-Active%20Defense-00e5ff?style=flat)](#)

Welcome to the official repository for **[shepherd99.github.io](https://shepherd99.github.io/)**, a dark-themed Security Operations Center (SOC) portfolio showcasing hands-on cybersecurity research, incident response playbooks, packet capture analysis, and systems hardening.

---

## 🧭 Page Structure & Flow

The portfolio is structured as a full scrollable landing page with distinct sections:
1. **Hero / Professional Profile**: Executive overview, defensive security focus, core metrics, and quick navigation.
2. **Skills & Tools**: Categorized tooling matrix covering Network Analysis, Reconnaissance, IR, MITRE ATT&CK, Linux, and SOC Platforms.
3. **Projects (Collapsible Category Folders)**:
   - 📁 **Incident Response** (featuring *Incident Response Quarantine Lab*)
   - 📁 **Detection & Analysis** (featuring *Network Traffic Capture Analysis*)
   - 📁 **Scanning & Enumeration** (ready for future labs with empty state display)
   - 📁 **MITRE ATT&CK** (ready for future labs with empty state display)
   - 📁 **Networking** (ready for future labs with empty state display)
   - 📁 **Linux** (ready for future labs with empty state display)
4. **Education**: Dedicated academic registry for degree programs, institutions, and coursework.
5. **Certifications**: Registry for active and in-progress credentials (e.g. CompTIA Security+, Network+, BTL1).
6. **Contact**: Interactive terminal console with direct links to verified profiles.

---

## ⚡ How to Add, Edit, or Remove Entries

All portfolio data is centralized in [`assets/js/portfolio-data.js`](assets/js/portfolio-data.js). You never need to touch the HTML markup to add or remove items.

### Adding a New Project
Open [`assets/js/portfolio-data.js`](assets/js/portfolio-data.js) and add an object to `PROJECTS_DATA`:
```javascript
{
    id: "my-new-lab",
    title: "Active Directory BloodHound Lab",
    category: "scanning", // Choose: "incident-response" | "detection" | "scanning" | "mitre" | "networking" | "linux"
    status: "Completed",  // "Completed" | "Active Lab" | "In Progress"
    date: "2026",
    featured: false,
    summary: "Brief 1-2 sentence description of the security objectives and outcome.",
    highlights: [
        "Configured BloodHound ingestion and mapped domain attack graphs.",
        "Audited Kerberoasting exposure and unconstrained delegation paths."
    ],
    tags: ["Active Directory", "BloodHound", "Kerberos", "Recon"],
    githubUrl: "https://github.com/Shepherd99/your-repo-name",
    writeupUrl: "https://github.com/Shepherd99/your-repo-name#readme"
},
```

### Adding Education & Certifications
Simply add or edit objects in the `EDUCATION_DATA` or `CERTIFICATIONS_DATA` arrays inside [`assets/js/portfolio-data.js`](assets/js/portfolio-data.js). The UI will automatically render the new cards or display the clean empty-state fallback if an array is empty.

---

## 🌐 Local Testing

The project is built entirely with vanilla HTML5, modern CSS3, and ES6 JavaScript. No package installations, node dependencies, or build tools are required.

Open `index.html` directly in any modern desktop or mobile browser.

---

## 🎨 3D Holographic Globe VFX Engine

The background features a custom, high-fidelity 3D holographic Earth globe rendered on an HTML5 Canvas ([`assets/js/canvas-globe.js`](assets/js/canvas-globe.js)):
- **Fibonacci Sphere Dot-Matrix**: Continents rendered via a procedural latitude/longitude dot-matrix using spherical projection.
- **True 3D Depth Shading**: Dots facing the viewer are luminous and sharp, diminishing smoothly toward the silhouette edge.
- **Glowing Silicon Socket & Traces**: Sits atop a glowing microchip socket with radiating PCB circuit traces and animated light pulses.
- **Parallax Responsiveness**: Reacts with subtle tilt to mouse movements and scroll velocity across desktop and laptop viewports.
- **Accessibility**: Automatically pauses when the browser tab is hidden and honors `prefers-reduced-motion` settings.

---

## 📬 Connect

- **Author:** Christopher Chinedu Osigwe
- **GitHub:** [@Shepherd99](https://github.com/Shepherd99)
- **LinkedIn:** [Christopher Chinedu Osigwe](https://www.linkedin.com/in/christopher-chinedu%F0%9F%9B%A1%EF%B8%8F%F0%9F%94%90-79885b231)
- **Portfolio:** [shepherd99.github.io](https://shepherd99.github.io)
