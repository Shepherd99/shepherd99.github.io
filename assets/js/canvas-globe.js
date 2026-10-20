/**
 * ==============================================================================
 * SHEPHERD99 - LIGHTWEIGHT CYBERNETIC CIRCUIT & GLOBE CANVAS ENGINE
 * ==============================================================================
 * Renders a slow-spinning holographic wireframe globe with grid pulses,
 * upward circuit board data traces flowing into the processor chip,
 * and understated scroll-velocity responsiveness.
 * 
 * Performance & Accessibility:
 * - 0 external dependencies (Pure Vanilla Canvas API)
 * - Auto-pauses on hidden tab (visibilitychange)
 * - Honors prefers-reduced-motion accessibility setting
 * - Throttled on mobile screens (< 768px)
 * ==============================================================================
 */

(function () {
    'use strict';

    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Accessibility check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    motionQuery.addEventListener('change', (e) => {
        prefersReducedMotion = e.matches;
        if (prefersReducedMotion) {
            cancelAnimationFrame(rafId);
            drawStaticGlow();
        } else {
            initScene();
            lastTime = performance.now();
            rafId = requestAnimationFrame(animate);
        }
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let isVisible = true;

    // Scroll reactivity state
    let scrollY = window.scrollY || 0;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    let decay = 0.94;

    window.addEventListener('scroll', () => {
        const current = window.scrollY || 0;
        const delta = Math.abs(current - lastScrollY);
        scrollVelocity = Math.min(scrollVelocity + delta * 0.04, 2.5);
        lastScrollY = current;
        scrollY = current;
    }, { passive: true });

    // Globe configuration
    let globe = {
        cx: 0,
        cy: 0,
        radius: 120,
        rotationAngle: 0,
        baseSpeed: 0.0035,
        axialTilt: 0.22, // ~12 degrees tilt
        meridians: 12,
        parallels: 7,
        pulses: []
    };

    // Chip & Circuit Traces
    let chip = {
        x: 0,
        y: 0,
        width: 160,
        height: 50
    };

    let circuitTraces = [];
    let chipPackets = [];
    let globeAscentPackets = [];

    // Resize handler
    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);

        const isMobile = width < 768;

        // Position globe centered horizontally, sitting above chip
        globe.cx = width * 0.5;
        // On desktop, push slightly right or keep centered based on layout
        if (width >= 1200) {
            globe.cx = width * 0.62; // Aligned nicely with the background image
            globe.cy = height * 0.44;
            globe.radius = Math.min(width * 0.16, height * 0.26, 170);
        } else if (isMobile) {
            globe.cx = width * 0.5;
            globe.cy = height * 0.38;
            globe.radius = Math.min(width * 0.26, height * 0.22, 115);
        } else {
            globe.cx = width * 0.55;
            globe.cy = height * 0.42;
            globe.radius = Math.min(width * 0.2, height * 0.25, 145);
        }

        // Chip position directly under the globe
        chip.width = globe.radius * 1.5;
        chip.height = globe.radius * 0.36;
        chip.x = globe.cx - chip.width / 2;
        chip.y = globe.cy + globe.radius * 0.95;

        buildCircuitTraces(isMobile);
        buildGlobePulses(isMobile);
    }

    // Generate PCB-style traces radiating upwards toward the chip
    function buildCircuitTraces(isMobile) {
        circuitTraces = [];
        chipPackets = [];
        globeAscentPackets = [];

        const count = isMobile ? 8 : 18;
        const chipBottom = chip.y + chip.height;
        const chipLeft = chip.x;
        const chipRight = chip.x + chip.width;

        for (let i = 0; i < count; i++) {
            const fraction = (i + 0.5) / count;
            const targetX = chipLeft + fraction * chip.width;
            const startX = width * 0.15 + fraction * (width * 0.7);
            const startY = height + 10;
            const midY1 = height * 0.78 + (i % 3) * 25;
            const midY2 = chipBottom + 35 + (i % 2) * 20;

            // Segmented PCB angles (vertical -> 45deg -> vertical into chip)
            const waypoints = [
                { x: startX, y: startY },
                { x: startX, y: midY1 },
                { x: targetX, y: midY2 },
                { x: targetX, y: chipBottom }
            ];

            // Calculate total path length
            let totalLength = 0;
            const segmentLengths = [];
            for (let j = 0; j < waypoints.length - 1; j++) {
                const dx = waypoints[j + 1].x - waypoints[j].x;
                const dy = waypoints[j + 1].y - waypoints[j].y;
                const len = Math.hypot(dx, dy);
                segmentLengths.push(len);
                totalLength += len;
            }

            circuitTraces.push({
                waypoints,
                segmentLengths,
                totalLength,
                isAmber: i % 4 === 0 // Match amber LED traces from image
            });

            // Add 1-2 packets per trace
            const packetCount = isMobile ? 1 : (i % 2 === 0 ? 2 : 1);
            for (let p = 0; p < packetCount; p++) {
                chipPackets.push({
                    traceIndex: i,
                    progress: (p / packetCount) + Math.random() * 0.3,
                    speed: 0.003 + Math.random() * 0.003,
                    size: 2.5 + Math.random() * 1.5,
                    color: i % 4 === 0 ? 'rgba(245, 158, 11, ' : 'rgba(0, 229, 255, '
                });
            }
        }
    }

    // Generate traveling pulses for the rotating globe
    function buildGlobePulses(isMobile) {
        globe.pulses = [];
        const count = isMobile ? 6 : 14;
        for (let i = 0; i < count; i++) {
            globe.pulses.push({
                lat: (Math.random() - 0.5) * Math.PI * 0.8,
                lon: Math.random() * Math.PI * 2,
                speed: (0.006 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
                radius: 2 + Math.random() * 2,
                energy: Math.random() * Math.PI
            });
        }
    }

    // Helper to evaluate position along multi-segment circuit path
    function getPointOnTrace(trace, t) {
        if (t <= 0) return trace.waypoints[0];
        if (t >= 1) return trace.waypoints[trace.waypoints.length - 1];

        const targetDist = t * trace.totalLength;
        let currentDist = 0;

        for (let i = 0; i < trace.segmentLengths.length; i++) {
            const segLen = trace.segmentLengths[i];
            if (currentDist + segLen >= targetDist) {
                const segT = (targetDist - currentDist) / segLen;
                const p1 = trace.waypoints[i];
                const p2 = trace.waypoints[i + 1];
                return {
                    x: p1.x + (p2.x - p1.x) * segT,
                    y: p1.y + (p2.y - p1.y) * segT
                };
            }
            currentDist += segLen;
        }
        return trace.waypoints[trace.waypoints.length - 1];
    }

    // Upward flow: from chip pin into globe south pole
    function triggerGlobeAscent(x, y, isAmber) {
        if (globeAscentPackets.length > 25) return;
        globeAscentPackets.push({
            x: x,
            startY: y,
            targetY: globe.cy + globe.radius * 0.65,
            progress: 0,
            speed: 0.035 + Math.random() * 0.025,
            color: isAmber ? 'rgba(245, 158, 11, ' : 'rgba(0, 229, 255, '
        });
    }

    // Draw static glowing backdrop for reduced motion
    function drawStaticGlow() {
        ctx.clearRect(0, 0, width, height);
        // Soft ambient core glow
        const radGlow = ctx.createRadialGradient(globe.cx, globe.cy, 10, globe.cx, globe.cy, globe.radius * 1.5);
        radGlow.addColorStop(0, 'rgba(0, 229, 255, 0.18)');
        radGlow.addColorStop(0.5, 'rgba(0, 229, 255, 0.05)');
        radGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = radGlow;
        ctx.beginPath();
        ctx.arc(globe.cx, globe.cy, globe.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Render 3D Wireframe Globe & Lat/Long grid
    function drawRotatingGlobe(tiltAngle) {
        const { cx, cy, radius, rotationAngle, meridians, parallels } = globe;
        const fov = 350;

        ctx.save();
        ctx.lineWidth = 1;

        // 1. Globe Outer Aura & Atmospheric Rim
        const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.65, cx, cy, radius * 1.15);
        rimGrad.addColorStop(0, 'rgba(0, 229, 255, 0.02)');
        rimGrad.addColorStop(0.85, 'rgba(0, 229, 255, 0.15)');
        rimGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = rimGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
        ctx.fill();

        // 2. Parallels (Latitude Circles)
        for (let p = 1; p < parallels; p++) {
            const lat = -Math.PI / 2 + (p / parallels) * Math.PI;
            const rLat = radius * Math.cos(lat);
            const yOffset = radius * Math.sin(lat);

            ctx.beginPath();
            let started = false;
            for (let step = 0; step <= 32; step++) {
                const phi = (step / 32) * Math.PI * 2;
                const x3d = rLat * Math.sin(phi);
                const y3d = yOffset;
                const z3d = rLat * Math.cos(phi);

                // Apply axial tilt
                const yTilted = y3d * Math.cos(tiltAngle) - z3d * Math.sin(tiltAngle);
                const zTilted = y3d * Math.sin(tiltAngle) + z3d * Math.cos(tiltAngle);

                const scale = fov / (fov + zTilted);
                const px = cx + x3d * scale;
                const py = cy + yTilted * scale;

                if (!started) {
                    ctx.moveTo(px, py);
                    started = true;
                } else {
                    ctx.lineTo(px, py);
                }
            }
            // Front-facing latitude ring brightness
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.18)';
            ctx.stroke();
        }

        // 3. Meridians (Longitude Lines rotating with rotationAngle)
        for (let m = 0; m < meridians; m++) {
            const lon = (m / meridians) * Math.PI * 2 + rotationAngle;

            ctx.beginPath();
            let started = false;
            for (let step = 0; step <= 24; step++) {
                const lat = -Math.PI / 2 + (step / 24) * Math.PI;
                const x3d = radius * Math.cos(lat) * Math.sin(lon);
                const y3d = radius * Math.sin(lat);
                const z3d = radius * Math.cos(lat) * Math.cos(lon);

                const yTilted = y3d * Math.cos(tiltAngle) - z3d * Math.sin(tiltAngle);
                const zTilted = y3d * Math.sin(tiltAngle) + z3d * Math.cos(tiltAngle);

                const scale = fov / (fov + zTilted);
                const px = cx + x3d * scale;
                const py = cy + yTilted * scale;

                if (!started) {
                    ctx.moveTo(px, py);
                    started = true;
                } else {
                    ctx.lineTo(px, py);
                }
            }

            // Depth cues: brighter on front hemisphere, faded in back
            const avgZ = Math.cos(lon);
            const alpha = avgZ > 0 ? (0.15 + avgZ * 0.3) : (0.04 + (avgZ + 1) * 0.06);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha.toFixed(3)})`;
            ctx.stroke();
        }

        // 4. Data Packets traveling along globe grid lines
        for (let i = 0; i < globe.pulses.length; i++) {
            const p = globe.pulses[i];
            p.lon += p.speed * (1 + scrollVelocity * 0.8);
            p.energy += 0.05;

            const x3d = radius * Math.cos(p.lat) * Math.sin(p.lon + rotationAngle);
            const y3d = radius * Math.sin(p.lat);
            const z3d = radius * Math.cos(p.lat) * Math.cos(p.lon + rotationAngle);

            const yTilted = y3d * Math.cos(tiltAngle) - z3d * Math.sin(tiltAngle);
            const zTilted = y3d * Math.sin(tiltAngle) + z3d * Math.cos(tiltAngle);

            // Only draw if on front hemisphere
            if (zTilted < radius * 0.2) {
                const scale = fov / (fov + zTilted);
                const px = cx + x3d * scale;
                const py = cy + yTilted * scale;
                const pulseIntensity = 0.5 + 0.5 * Math.sin(p.energy);
                const alpha = Math.max(0, (0.4 + pulseIntensity * 0.5) * (1 - zTilted / radius));

                ctx.fillStyle = `rgba(0, 240, 255, ${alpha.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2);
                ctx.fill();

                // Subtle corona ping
                ctx.strokeStyle = `rgba(16, 185, 129, ${(alpha * 0.4).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, p.radius * scale * 2.2, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    // Render Circuit Traces and Upward Packets
    function drawCircuitAndPackets() {
        ctx.save();

        // 1. Static subtle trace line pathways
        ctx.lineWidth = 1.2;
        for (let i = 0; i < circuitTraces.length; i++) {
            const trace = circuitTraces[i];
            ctx.beginPath();
            ctx.moveTo(trace.waypoints[0].x, trace.waypoints[0].y);
            for (let j = 1; j < trace.waypoints.length; j++) {
                ctx.lineTo(trace.waypoints[j].x, trace.waypoints[j].y);
            }
            ctx.strokeStyle = trace.isAmber ? 'rgba(245, 158, 11, 0.12)' : 'rgba(0, 229, 255, 0.12)';
            ctx.stroke();
        }

        // 2. Animate Traveling Packets upward into the chip
        for (let i = 0; i < chipPackets.length; i++) {
            const pkt = chipPackets[i];
            const trace = circuitTraces[pkt.traceIndex];
            if (!trace) continue;

            const speedBoost = 1 + scrollVelocity * 1.4;
            pkt.progress += pkt.speed * speedBoost;

            if (pkt.progress >= 1) {
                pkt.progress = 0;
                // Reached chip - trigger data ascent into globe
                const endPt = trace.waypoints[trace.waypoints.length - 1];
                triggerGlobeAscent(endPt.x, chip.y, trace.isAmber);
            }

            const pt = getPointOnTrace(trace, pkt.progress);
            const headAlpha = 0.75 + Math.min(scrollVelocity * 0.1, 0.25);

            // Glowing packet head
            ctx.fillStyle = `${pkt.color}${headAlpha})`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pkt.size, 0, Math.PI * 2);
            ctx.fill();

            // Trail
            const trailPt = getPointOnTrace(trace, Math.max(0, pkt.progress - 0.04));
            ctx.strokeStyle = `${pkt.color}0.35)`;
            ctx.lineWidth = pkt.size * 0.8;
            ctx.beginPath();
            ctx.moveTo(trailPt.x, trailPt.y);
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        }

        // 3. Animate Upward Data Ascent (Chip -> Globe South Pole)
        for (let i = globeAscentPackets.length - 1; i >= 0; i--) {
            const stream = globeAscentPackets[i];
            stream.progress += stream.speed * (1 + scrollVelocity * 1.2);

            const currY = stream.startY - (stream.startY - stream.targetY) * stream.progress;
            const alpha = Math.sin(stream.progress * Math.PI) * 0.85;

            ctx.fillStyle = `${stream.color}${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(stream.x, currY, 2.2, 0, Math.PI * 2);
            ctx.fill();

            // Subtle vertical trace stream line
            ctx.strokeStyle = `${stream.color}${(alpha * 0.4).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(stream.x, currY + 6);
            ctx.lineTo(stream.x, currY);
            ctx.stroke();

            if (stream.progress >= 1) {
                globeAscentPackets.splice(i, 1);
            }
        }

        // 4. Subtle chip rim highlight
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(chip.x, chip.y, chip.width, chip.height);

        ctx.restore();
    }

    // Main animation loop
    let lastTime = performance.now();
    function animate(currentTime) {
        if (!isVisible || prefersReducedMotion) return;

        const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
        lastTime = currentTime;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Smooth scroll decay
        scrollVelocity *= decay;
        if (scrollVelocity < 0.005) scrollVelocity = 0;

        // Update globe rotation angle
        const currentSpeed = globe.baseSpeed * (1 + scrollVelocity * 1.2);
        globe.rotationAngle += currentSpeed;

        // Perspective shift based on scroll
        const dynamicTilt = globe.axialTilt + (scrollY * 0.00018);

        // Draw layers
        drawCircuitAndPackets();
        drawRotatingGlobe(dynamicTilt);

        rafId = requestAnimationFrame(animate);
    }

    // Page visibility listener to stop rendering when tab is hidden
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible && !prefersReducedMotion) {
            lastTime = performance.now();
            rafId = requestAnimationFrame(animate);
        } else if (rafId) {
            cancelAnimationFrame(rafId);
        }
    });

    // Initialize
    function initScene() {
        resize();
    }

    window.addEventListener('resize', () => {
        resize();
    });

    // Boot
    initScene();
    if (!prefersReducedMotion) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
    } else {
        drawStaticGlow();
    }
})();
