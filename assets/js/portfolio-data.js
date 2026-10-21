/**
 * ==============================================================================
 * CHRISTOPHER CHINEDU OSIGWE - PORTFOLIO DATA SOURCE
 * ==============================================================================
 * Author: Christopher Chinedu Osigwe (GitHub: @Shepherd99)
 *
 * HOW TO ADD/EDIT/REMOVE ENTRIES:
 * ─────────────────────────────────────────────────────────────────────
 * Each section below (PROJECTS, EDUCATION, CERTIFICATIONS, SKILLS)
 * is a simple JavaScript array. To add a new entry, copy the template
 * comment block at the top of each section, paste it into the array,
 * and fill in your values. To remove one, just delete its { ... } block.
 *
 * VALID PROJECT CATEGORIES:
 *   "incident-response"  → Incident Response
 *   "detection"           → Detection & Analysis
 *   "scanning"            → Scanning & Enumeration
 *   "mitre"               → MITRE ATT&CK
 *   "networking"          → Networking
 *   "linux"               → Linux
 * ==============================================================================
 */

// ─── CATEGORY DEFINITIONS (order matters — this is the folder display order) ──
const CATEGORIES = [
    { id: "incident-response", name: "Incident Response",       icon: "shield"    },
    { id: "detection",         name: "Detection & Analysis",    icon: "activity"  },
    { id: "scanning",          name: "Scanning & Enumeration",  icon: "crosshair" },
    { id: "mitre",             name: "MITRE ATT&CK",           icon: "grid"      },
    { id: "networking",        name: "Networking",              icon: "network"   },
    { id: "linux",             name: "Linux",                   icon: "terminal"  }
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
// TEMPLATE — copy this block, paste inside the array, and fill in your values:
//
// {
//     id: "unique-slug",
//     title: "Project Title",
//     category: "incident-response",   // pick from VALID CATEGORIES above
//     status: "Completed",             // "Completed" | "Active Lab" | "In Progress"
//     date: "2026",
//     featured: true,                  // true highlights the card with a cyan border
//     summary: "One-paragraph summary of what this project does.",
//     highlights: [
//         "Key accomplishment or technique used.",
//         "Another highlight."
//     ],
//     tags: ["Tag1", "Tag2", "Tag3"],
//     githubUrl: "https://github.com/Shepherd99/repo-name",
//     writeupUrl: "https://github.com/Shepherd99/repo-name#readme"
// },

const PROJECTS_DATA = [
    {
        id: "ir-quarantine-lab",
        title: "Incident Response Quarantine Lab",
        category: "incident-response",
        status: "Completed",
        date: "2026",
        featured: true,
        summary: "Designed and implemented an isolated host containment architecture to simulate malware outbreak quarantine procedures and forensic evidence preservation.",
        highlights: [
            "Configured firewall segregation rules and network isolation controls for infected virtual endpoints.",
            "Established evidence preservation procedures adhering to NIST SP 800-61 Incident Handling guidelines.",
            "Documented step-by-step containment playbooks and post-incident remediation workflows."
        ],
        tags: ["Incident Response", "Host Isolation", "Firewall Rules", "Containment", "Forensics", "Virtualization"],
        githubUrl: "https://github.com/shepherd99/incident-response-quarantine-lab",
        writeupUrl: "https://github.com/shepherd99/incident-response-quarantine-lab#readme"
    },
    {
        id: "network-traffic-capture",
        title: "Network Traffic Capture Analysis",
        category: "detection",
        status: "Completed",
        date: "2026",
        featured: true,
        summary: "Performed deep packet inspection and network protocol analysis on captured PCAP files to identify reconnaissance behaviors, abnormal data transmissions, and protocol anomalies.",
        highlights: [
            "Analyzed TCP/IP handshakes, DNS query anomalies, and unencrypted protocol payloads using Wireshark.",
            "Isolated suspicious communication patterns and extracted network telemetry indicators (IPs, URIs, payloads).",
            "Synthesized findings into actionable detection summaries and defensive firewall/IDS rule recommendations."
        ],
        tags: ["Wireshark", "Packet Analysis", "PCAP", "TCP/IP", "Traffic Inspection", "Detection"],
        githubUrl: "https://github.com/shepherd99/network-traffic-capture-analysis",
        writeupUrl: "https://github.com/shepherd99/network-traffic-capture-analysis#readme"
    }
];

// ─── SKILLS & TOOLS ───────────────────────────────────────────────────────────
// Each group has a title, an icon key, and an array of tool names.
// To add a new tool, push a string into the relevant `tools` array.
// To add a new category, add a new object to the array.

const SKILLS_DATA = [
    {
        title: "Network Analysis & Forensics",
        icon: "activity",
        tools: ["Wireshark", "Tshark", "Zeek", "tcpdump", "PCAP Inspection", "Suricata / Snort"]
    },
    {
        title: "Scanning & Reconnaissance",
        icon: "crosshair",
        tools: ["Nmap", "NSE Scripts", "Netcat", "Gobuster", "Recon-ng", "Masscan"]
    },
    {
        title: "Incident Response & Defense",
        icon: "shield",
        tools: ["Host Isolation", "IPTables / UFW", "Memory Triage", "NIST SP 800-61", "Quarantine Architecture"]
    },
    {
        title: "Frameworks & Standards",
        icon: "grid",
        tools: ["MITRE ATT&CK Enterprise Matrix", "NIST CSF", "Cyber Kill Chain", "Diamond Model"]
    },
    {
        title: "Linux Systems & Hardening",
        icon: "terminal",
        tools: ["Bash Scripting", "Debian / Ubuntu", "systemd Auditing", "SUID / SGID", "SSH Hardening", "Auth Log Analysis"]
    },
    {
        title: "Platforms & Tooling",
        icon: "server",
        tools: ["SIEM Queries", "VirtualBox / VMware", "Git / GitHub", "Python Scripting", "Docker Basics"]
    }
];

// ─── EDUCATION ────────────────────────────────────────────────────────────────
// TEMPLATE — copy this block, paste inside the array, and fill in your values:
//
// {
//     institution: "University Name",
//     program: "Bachelor of Science in Cybersecurity",
//     dates: "2023 – 2027",
//     status: "In Progress",           // "In Progress" | "Completed" | "Expected 2027"
//     coursework: ["Network Security", "Operating Systems", "Digital Forensics"],
//     description: "Optional one-line description of focus or honors."
// },

const EDUCATION_DATA = [
    {
        institution: "Higher Education / Academic Institution",
        program: "Cybersecurity & Computing Studies",
        dates: "In Progress",
        status: "Enrolled",
        coursework: ["Network Security", "TCP/IP Protocol Architecture", "Linux Systems Administration", "Incident Handling"],
        description: "Focusing on defensive security engineering, network protocol dissection, and operating system security boundaries."
    }
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
// TEMPLATE — copy this block, paste inside the array, and fill in your values:
//
// {
//     name: "CompTIA Security+",
//     issuer: "CompTIA",
//     date: "2026",
//     status: "Active",               // "Active" | "In Progress" | "Target: Q4 2026"
//     credentialUrl: "https://...",    // verification link (optional, set to "" if none)
//     skills: ["Threat Analysis", "Risk Management", "Cryptography"]
// },

const CERTIFICATIONS_DATA = [
    {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        date: "Target: 2026",
        status: "In Progress",
        credentialUrl: "",
        skills: ["Threat Analysis", "Security Operations", "Vulnerability Management", "Identity & Access Control"]
    },
    {
        name: "CompTIA Network+",
        issuer: "CompTIA",
        date: "Target: 2026",
        status: "In Progress",
        credentialUrl: "",
        skills: ["Network Architecture", "Routing Protocols", "Subnetting (VLSM)", "Traffic Troubleshooting"]
    },
    {
        name: "Blue Team Level 1 (BTL1)",
        issuer: "Security Blue Team",
        date: "Target: 2026",
        status: "In Progress",
        credentialUrl: "",
        skills: ["Network Forensics", "SIEM Analysis", "Incident Response Playbooks", "Malware Triage"]
    }
];

// ─── HELPER FUNCTIONS (used by main.js — do not remove) ───────────────────────
function getProjectsByCategory(categoryId) {
    return PROJECTS_DATA.filter(p => p.category === categoryId);
}

function getAllProjects() {
    return PROJECTS_DATA;
}
