/**
 * ==============================================================================
 * SHEPHERD99 - CYBERSECURITY PROJECTS & LABS DATA SOURCE
 * ==============================================================================
 * Author: Christopher Chinedu (Shepherd99)
 * 
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy one of the project objects below.
 * 2. Paste it into the `PROJECTS_DATA` array.
 * 3. Fill in your project details (title, category, summary, tags, links).
 * 4. Save this file and commit to GitHub!
 * 
 * VALID CATEGORIES:
 * - "incident-response"  -> Incident Response Playbooks
 * - "detection"          -> Detection & Analysis
 * - "scanning"           -> Scanning & Enumeration
 * - "mitre"              -> MITRE ATT&CK
 * - "networking"         -> Networking
 * - "linux"              -> Linux
 * ==============================================================================
 */

const PROJECTS_DATA = [
    {
        id: "ir-quarantine-lab",
        title: "Incident Response Quarantine Lab",
        category: "incident-response",
        categoryName: "Incident Response Playbooks",
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
        categoryName: "Detection & Analysis",
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
    },
    {
        id: "nmap-scanning-enumeration",
        title: "Network Scanning & Service Enumeration Lab",
        category: "scanning",
        categoryName: "Scanning & Enumeration",
        status: "Active Lab",
        date: "2026",
        featured: false,
        summary: "Targeted reconnaissance and port enumeration across segmented subnets using Nmap, version detection, and vulnerability scripting engine (NSE).",
        highlights: [
            "Executed stealth SYN scans (-sS), UDP audits, and comprehensive version detection (-sV).",
            "Leveraged Nmap Scripting Engine (NSE) scripts to detect misconfigurations and legacy protocol versions.",
            "Formulated asset discovery matrices identifying attack surfaces across host services."
        ],
        tags: ["Nmap", "Port Scanning", "Reconnaissance", "NSE", "Service Enumeration"],
        githubUrl: "https://github.com/Shepherd99",
        writeupUrl: "#scanning-section"
    },
    {
        id: "mitre-threat-mapping",
        title: "Adversary TTP Mapping & ATT&CK Alignment",
        category: "mitre",
        categoryName: "MITRE ATT&CK",
        status: "In Progress",
        date: "2026",
        featured: false,
        summary: "Mapping observed adversary tactics, techniques, and procedures (TTPs) across the MITRE ATT&CK Enterprise Matrix to evaluate defensive detection coverage.",
        highlights: [
            "Mapped kill chain phases from Initial Access (T1566) through Defense Evasion (T1070) and Exfiltration.",
            "Evaluated defensive telemetry gaps across host event logs and network egress points.",
            "Constructed detection correlation rules aligned with specific technique IDs."
        ],
        tags: ["MITRE ATT&CK", "Threat Intelligence", "TTP Mapping", "Kill Chain", "Defensive Coverage"],
        githubUrl: "https://github.com/Shepherd99",
        writeupUrl: "#mitre-section"
    },
    {
        id: "subnet-routing-lab",
        title: "Subnetting & Network Isolation Architecture",
        category: "networking",
        categoryName: "Networking",
        status: "Completed",
        date: "2026",
        featured: false,
        summary: "Hands-on implementation of IPv4 subnetting schemes, CIDR notation design, and gateway routing configurations to enforce zero-trust network boundaries.",
        highlights: [
            "Calculated custom variable-length subnet masks (VLSM) to partition virtual management and DMZ zones.",
            "Configured stateful packet filtering rules to block unauthorized lateral movement between subnets.",
            "Verified end-to-end packet flow and MTU path metrics using ICMP and traceroute diagnostics."
        ],
        tags: ["Networking", "Subnetting", "CIDR", "Routing", "OSI Model", "VLAN"],
        githubUrl: "https://github.com/Shepherd99",
        writeupUrl: "#networking-section"
    },
    {
        id: "linux-security-auditing",
        title: "Linux System Hardening & Log Auditing",
        category: "linux",
        categoryName: "Linux",
        status: "Active Lab",
        date: "2026",
        featured: false,
        summary: "Hardening Debian/Ubuntu virtual machines, enforcing least-privilege permission models, and establishing automated bash log auditing for authentication failures.",
        highlights: [
            "Audited SUID/SGID binaries, configured restrictive umask policies, and tightened SSH daemon configurations.",
            "Parsed `/var/log/auth.log` and systemd journals to identify brute-force login attempts.",
            "Wrote Bash automation scripts to inspect listening sockets, running daemons, and cron jobs."
        ],
        tags: ["Linux", "Bash", "System Hardening", "Log Auditing", "Permissions", "SSH Security"],
        githubUrl: "https://github.com/Shepherd99",
        writeupUrl: "#linux-section"
    }
];

// Helper to get projects by category or return all
function getProjects(category = "all") {
    if (category === "all") {
        return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter(project => project.category === category);
}
