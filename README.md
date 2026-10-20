# Christopher Chinedu (Shepherd99) | Cybersecurity Portfolio & Threat Lab

[![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-blue?style=flat&logo=github)](https://shepherd99.github.io)
[![Zero Budget](https://img.shields.io/badge/Budget-$0.00%20(Open%20Source)-emerald?style=flat)](#)
[![SOC Status](https://img.shields.io/badge/SOC%20Posture-Active%20Defense-00e5ff?style=flat)](#)

Welcome to the official repository for **[shepherd99.github.io](https://shepherd99.github.io/)**, a dark-themed Security Operations Center (SOC) dashboard showcasing hands-on cybersecurity research, incident response playbooks, packet capture analysis, and systems hardening.

---

## 🛡️ Core Domains Covered

1. **Scanning & Enumeration**: Nmap, Recon-ng, NSE scripts, service profiling, and vulnerability reconnaissance.
2. **Detection & Analysis**: PCAP dissection, Wireshark, Suricata/Snort, Zeek, and network telemetry analysis.
3. **MITRE ATT&CK**: TTP mapping across the cyber kill chain (Phishing, Command Execution, Defense Evasion, Exfiltration).
4. **Incident Response Playbooks**: Containment architectures, host isolation, firewall rules, and evidence preservation (NIST SP 800-61).
5. **Networking**: TCP/IP model, subnetting (VLSM/CIDR), routing protocols, and VLAN isolation.
6. **Linux Security**: File permissions, SUID/SGID auditing, authentication logs (`/var/log/auth.log`), and bash automation.

---

## ⚡ How to Add a New Project (In 60 Seconds)

Adding new lab write-ups or projects is beginner-friendly and requires no complex build tools or recompilation.

1. Open [`assets/js/projects-data.js`](assets/js/projects-data.js) in your text editor.
2. Copy and paste the template object into the `PROJECTS_DATA` array:

```javascript
{
    id: "my-new-lab-name",
    title: "Active Directory BloodHound Lab",
    category: "scanning", // Choose: "incident-response", "detection", "scanning", "mitre", "networking", "linux"
    categoryName: "Scanning & Enumeration",
    status: "Completed", // "Completed", "Active Lab", "In Progress"
    date: "2026",
    featured: false,
    summary: "Brief 1-2 sentence description of the security objectives and outcome.",
    highlights: [
        "First key technical accomplishment or tool configuration.",
        "Second key finding, evidence preservation step, or analysis.",
        "Third takeaway or defensive mitigation recommendation."
    ],
    tags: ["Active Directory", "BloodHound", "Kerberos", "Recon"],
    githubUrl: "https://github.com/Shepherd99/your-repo-name",
    writeupUrl: "https://github.com/Shepherd99/your-repo-name#readme"
},
```

3. Save the file and push your changes to GitHub:
```bash
git add assets/js/projects-data.js
git commit -m "Add new Active Directory lab write-up"
git push origin main
```
GitHub Pages will automatically update your live site!

---

## 🌐 Local Development & Testing

Since this project is built entirely with modern vanilla HTML5, CSS3, and JavaScript, no `npm install` or compilation step is required.

To run locally:
```bash
# Using Python 3's built-in HTTP server:
python -m http.server 8000

# Or with Node.js:
npx serve .
```
Then visit `http://localhost:8000` in your web browser.

---

## 🎨 Visual Background & Canvas VFX Engine

The background integrates the glowing digital globe on a silicon circuit board:
- **Lightweight Canvas Engine** ([`assets/js/canvas-globe.js`](assets/js/canvas-globe.js)): Simulates glowing data packets traveling along PCB traces upward into the CPU and up into the digital globe.
- **Continuous 3D Rotation**: A procedurally rendered holographic wireframe sphere rotates smoothly along its axial tilt.
- **Understated & Accessible**: Honors `prefers-reduced-motion` settings automatically, scales down particle count on mobile screens, and employs a high-contrast radial vignette shield to maintain WCAG AAA text contrast.

---

## 📬 Connect

- **Author:** Christopher Chinedu
- **GitHub:** [@Shepherd99](https://github.com/Shepherd99)
- **LinkedIn:** [Christopher Chinedu](https://www.linkedin.com/in/christopher-chinedu%F0%9F%9B%A1%EF%B8%8F%F0%9F%94%90-79885b231?utm_source=share_via&utm_content=profile&utm_medium=member_ios)
- **Portfolio:** [shepherd99.github.io](https://shepherd99.github.io)
