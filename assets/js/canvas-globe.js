/**
 * ==============================================================================
 * CHRISTOPHER CHINEDU OSIGWE - 3D HOLOGRAPHIC GLOBE & CIRCUIT CANVAS ENGINE
 * ==============================================================================
 * Pure Vanilla Canvas 2D API – Zero external dependencies.
 * 100% Offline & Local File (file://) Safe:
 * - Uses pure mathematical spherical geometry and polygon ray-casting.
 * - Zero fetch(), zero Image(), zero offscreen getImageData(), zero CORS issues.
 *
 * Features:
 * - True 3D spherical depth: glowing continental dot-matrix with depth shading
 *   (luminous facing camera, dimming toward curving silhouette, back culled)
 * - Luminous latitude/longitude grid wireframe with front/back depth
 * - Radiant atmospheric corona and rim glow
 * - Silicon CPU processor socket platform directly beneath globe
 * - Radiating PCB motherboard traces with animated traveling light pulses (cyan & amber)
 * - Upward data telemetry packets ascending from CPU socket into globe
 * - Continuous smooth rotation with mouse parallax tilt & scroll velocity boost
 * ==============================================================================
 */

(function () {
    'use strict';

    // ── 1. Canvas Context & Retina DPR Setup ──────────────────────────────────
    var canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = window.innerWidth || document.documentElement.clientWidth || 1280;
    var H = window.innerHeight || document.documentElement.clientHeight || 800;

    function resizeCanvas() {
        W = window.innerWidth || document.documentElement.clientWidth || 1280;
        H = window.innerHeight || document.documentElement.clientHeight || 800;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        computeLayout();
        buildTraces();
    }

    // ── 2. Continent Polygon Geometry (Longitude [-180..180], Latitude [-90..90]) ─
    var CONTINENTS = [
        // Africa
        [[-17,35],[-5,36],[10,37],[15,38],[25,32],[32,31],[35,30],[40,28],[43,12],[50,12],[51,11],[51,2],[42,-2],[40,-10],[35,-25],[33,-34],[28,-34],[20,-35],[18,-30],[15,-25],[12,-18],[12,-6],[9,0],[7,4],[5,5],[2,6],[1,5],[-1,5],[-5,4],[-8,5],[-13,8],[-17,11],[-17,15],[-16,18],[-16,22],[-13,25],[-17,32],[-17,35]],
        // Europe
        [[-10,36],[-9,38],[-9,43],[-2,43],[0,44],[3,43],[5,44],[3,47],[-4,48],[-5,52],[-3,54],[-5,58],[0,58],[5,54],[8,54],[6,57],[10,57],[12,55],[10,58],[12,60],[12,64],[15,65],[18,69],[20,70],[25,70],[28,70],[32,65],[30,60],[28,56],[22,55],[20,54],[18,55],[14,54],[14,50],[17,49],[22,48],[24,46],[22,44],[25,42],[27,42],[30,42],[32,38],[28,36],[22,36],[15,38],[12,38],[10,44],[7,44],[5,40],[0,40],[-2,36],[-10,36]],
        // Asia
        [[30,38],[35,37],[36,35],[40,38],[42,42],[45,40],[50,38],[52,42],[55,45],[60,55],[65,55],[68,58],[73,55],[78,55],[82,50],[87,50],[90,45],[95,42],[98,40],[100,35],[100,22],[105,18],[105,12],[108,8],[110,2],[105,0],[100,2],[98,6],[92,8],[88,22],[85,25],[80,15],[78,8],[77,10],[75,12],[72,20],[68,24],[62,25],[58,27],[55,26],[52,28],[48,30],[44,34],[42,37],[38,38],[35,38],[30,38]],
        // North America
        [[-170,65],[-165,63],[-155,60],[-145,62],[-140,60],[-135,57],[-130,53],[-125,50],[-123,46],[-120,35],[-115,30],[-110,25],[-105,20],[-100,18],[-95,18],[-90,16],[-87,14],[-83,10],[-80,8],[-78,9],[-77,18],[-80,25],[-82,27],[-82,30],[-78,35],[-75,36],[-72,41],[-70,43],[-67,45],[-65,47],[-60,47],[-55,50],[-58,52],[-60,54],[-65,55],[-68,58],[-72,60],[-78,62],[-82,65],[-85,68],[-88,67],[-95,68],[-100,70],[-110,72],[-120,72],[-130,70],[-140,68],[-150,68],[-160,68],[-170,65]],
        // South America
        [[-80,10],[-75,12],[-70,12],[-65,10],[-60,8],[-55,5],[-50,2],[-45,0],[-40,-2],[-35,-5],[-35,-10],[-37,-15],[-40,-20],[-42,-23],[-45,-24],[-48,-28],[-50,-30],[-52,-33],[-55,-35],[-58,-38],[-63,-40],[-65,-43],[-65,-48],[-68,-50],[-70,-55],[-72,-50],[-74,-45],[-73,-40],[-71,-35],[-71,-30],[-70,-25],[-70,-18],[-75,-15],[-76,-10],[-78,-5],[-80,0],[-80,5],[-77,8],[-80,10]],
        // Australia
        [[114,-25],[115,-33],[117,-35],[120,-35],[125,-35],[130,-33],[134,-35],[137,-36],[140,-38],[145,-39],[148,-38],[150,-37],[152,-33],[153,-28],[150,-23],[148,-20],[145,-18],[142,-15],[140,-12],[137,-12],[135,-14],[132,-12],[130,-13],[128,-15],[125,-15],[122,-18],[118,-20],[115,-22],[114,-25]],
        // Greenland
        [[-55,60],[-50,62],[-45,61],[-42,63],[-40,65],[-38,68],[-30,70],[-25,72],[-22,74],[-20,76],[-20,80],[-22,82],[-25,83],[-30,83],[-35,82],[-40,80],[-45,78],[-50,75],[-52,72],[-55,68],[-55,60]],
        // UK & Ireland
        [[-6,50],[-5,52],[-4,54],[-5,56],[-4,58],[-3,58],[-1,58],[0,57],[2,53],[1,51],[0,51],[-2,50],[-4,50],[-6,50]],
        [[-10,51],[-10,53],[-9,55],[-7,55],[-6,54],[-6,52],[-8,51],[-10,51]],
        // Japan
        [[130,31],[131,33],[132,34],[134,35],[136,35],[137,37],[139,38],[140,40],[141,41],[142,43],[145,45],[144,43],[142,40],[141,38],[140,36],[138,34],[136,33],[134,32],[132,31],[130,31]],
        // Madagascar
        [[43,-12],[44,-14],[44,-18],[44,-22],[45,-24],[47,-26],[50,-26],[50,-22],[49,-18],[48,-14],[46,-12],[43,-12]],
        // Indonesia & SE Asia Islands
        [[95,-6],[98,-4],[100,-2],[103,0],[105,2],[108,0],[110,-2],[112,-5],[115,-8],[118,-8],[120,-6],[122,-4],[125,-5],[128,-6],[130,-4],[132,-2],[135,-3],[138,-5],[140,-4],[140,-2],[135,0],[130,2],[125,3],[120,2],[115,0],[110,2],[108,3],[105,5],[102,3],[100,0],[97,-2],[95,-6]]
    ];

    /** Pure mathematical point-in-polygon ray-casting algorithm (100% immune to CORS / file:// limitations) */
    function isPointInPoly(poly, lon, lat) {
        var inside = false;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            var xi = poly[i][0], yi = poly[i][1];
            var xj = poly[j][0], yj = poly[j][1];
            var intersect = ((yi > lat) !== (yj > lat)) &&
                (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    function isLand(lon, lat) {
        for (var i = 0; i < CONTINENTS.length; i++) {
            if (isPointInPoly(CONTINENTS[i], lon, lat)) {
                return true;
            }
        }
        return false;
    }

    // ── 3. Fibonacci Sphere Dot-Matrix Generation ─────────────────────────────
    var spherePoints = []; // [{x, y, z, lat, lon}]
    var TOTAL_POINTS = 4200;
    var GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

    function generateSpherePoints() {
        spherePoints = [];
        for (var i = 0; i < TOTAL_POINTS; i++) {
            var y = 1 - (i / (TOTAL_POINTS - 1)) * 2; // [1, -1]
            var radiusAtY = Math.sqrt(1 - y * y);
            var phi = (2 * Math.PI * i) / GOLDEN_RATIO;

            var x = Math.cos(phi) * radiusAtY;
            var z = Math.sin(phi) * radiusAtY;

            var lat = Math.asin(y) * (180 / Math.PI);
            var lon = Math.atan2(x, z) * (180 / Math.PI);

            if (isLand(lon, lat)) {
                spherePoints.push({ x: x, y: y, z: z, lat: lat, lon: lon });
            }
        }
    }

    // ── 4. Responsive Globe Layout & Positioning ──────────────────────────────
    var globe = {
        cx: 0,
        cy: 0,
        radius: 150,
        rotY: 0,
        baseSpeed: 0.0035,
        tiltX: 0.15,
        tiltZ: 0,
        targetTiltX: 0.15,
        targetTiltZ: 0
    };

    var FOV = 450;

    function computeLayout() {
        if (W >= 1200) {
            // Desktop: Positioned prominently on right-center so hero text on left is unobstructed
            globe.cx = W * 0.70;
            globe.cy = H * 0.44;
            globe.radius = Math.max(140, Math.min(W * 0.16, H * 0.26, 175));
        } else if (W >= 1024) {
            // Laptop
            globe.cx = W * 0.68;
            globe.cy = H * 0.44;
            globe.radius = Math.max(130, Math.min(W * 0.18, H * 0.25, 160));
        } else if (W >= 768) {
            // Tablet
            globe.cx = W * 0.50;
            globe.cy = H * 0.40;
            globe.radius = Math.max(110, Math.min(W * 0.20, H * 0.22, 140));
        } else {
            // Mobile
            globe.cx = W * 0.50;
            globe.cy = H * 0.36;
            globe.radius = Math.max(90, Math.min(W * 0.26, H * 0.20, 115));
        }
    }

    // ── 5. Silicon Chip Socket & PCB Circuit Traces ───────────────────────────
    var traces = [];
    var pulses = [];
    var dataPackets = [];

    function buildTraces() {
        traces = [];
        pulses = [];
        dataPackets = [];

        var chipX = globe.cx;
        var chipY = globe.cy + globe.radius * 1.04;
        var chipW = globe.radius * 0.75;
        var chipH = globe.radius * 0.20;

        var traceCount = 18;
        var maxLen = globe.radius * 1.9;

        for (var i = 0; i < traceCount; i++) {
            var segs = [];
            var isLeft = i < 7;
            var isRight = i >= 7 && i < 14;
            var isDown = i >= 14;

            var startX, startY;
            if (isLeft) {
                startX = chipX - chipW * 0.5;
                startY = chipY + (i - 3) * (chipH * 0.24);
            } else if (isRight) {
                startX = chipX + chipW * 0.5;
                startY = chipY + (i - 10) * (chipH * 0.24);
            } else {
                startX = chipX + (i - 15.5) * (chipW * 0.3);
                startY = chipY + chipH * 0.5;
            }

            segs.push({ x: startX, y: startY });

            var curX = startX, curY = startY;
            var segCount = 2 + (i % 2);
            var dirX = isLeft ? -1 : (isRight ? 1 : (i % 2 === 0 ? -1 : 1));

            for (var s = 0; s < segCount; s++) {
                var stepLen = (0.35 + (s * 0.2)) * (maxLen / segCount);
                if (s === 0) {
                    curX += stepLen * dirX;
                } else if (s === 1) {
                    curY += stepLen * 0.8;
                } else {
                    curX += stepLen * 0.6 * dirX;
                }
                segs.push({ x: curX, y: curY });
            }

            // Total length
            var len = 0;
            for (var k = 1; k < segs.length; k++) {
                var dx = segs[k].x - segs[k - 1].x;
                var dy = segs[k].y - segs[k - 1].y;
                len += Math.sqrt(dx * dx + dy * dy);
            }

            var isAmber = (i % 4 === 1);
            traces.push({
                segments: segs,
                totalLen: len,
                color: isAmber ? 'amber' : 'cyan'
            });

            pulses.push({
                traceIdx: i,
                t: Math.random(),
                speed: 0.0035 + Math.random() * 0.004
            });
        }
    }

    function getPointAlongTrace(trace, t) {
        var segs = trace.segments;
        if (trace.totalLen === 0) return segs[0];

        var target = t * trace.totalLen;
        var accumulated = 0;

        for (var i = 1; i < segs.length; i++) {
            var dx = segs[i].x - segs[i - 1].x;
            var dy = segs[i].y - segs[i - 1].y;
            var segLen = Math.sqrt(dx * dx + dy * dy);

            if (accumulated + segLen >= target) {
                var frac = (target - accumulated) / segLen;
                return {
                    x: segs[i - 1].x + dx * frac,
                    y: segs[i - 1].y + dy * frac
                };
            }
            accumulated += segLen;
        }
        return segs[segs.length - 1];
    }

    // ── 6. 3D Math & Perspective Transformations ──────────────────────────────
    function rotate3D(px, py, pz) {
        // Continuous rotation around Y axis
        var cosY = Math.cos(globe.rotY), sinY = Math.sin(globe.rotY);
        var x1 = px * cosY + pz * sinY;
        var z1 = -px * sinY + pz * cosY;
        var y1 = py;

        // X-axis tilt (mouse pitch)
        var cosX = Math.cos(globe.tiltX), sinX = Math.sin(globe.tiltX);
        var y2 = y1 * cosX - z1 * sinX;
        var z2 = y1 * sinX + z1 * cosX;
        var x2 = x1;

        // Z-axis tilt (mouse roll)
        var cosZ = Math.cos(globe.tiltZ), sinZ = Math.sin(globe.tiltZ);
        var x3 = x2 * cosZ - y2 * sinZ;
        var y3 = x2 * sinZ + y2 * cosZ;

        return { x: x3, y: y3, z: z2 };
    }

    function project3D(p) {
        var scale = FOV / (FOV + p.z * globe.radius);
        return {
            sx: globe.cx + p.x * globe.radius * scale,
            sy: globe.cy - p.y * globe.radius * scale,
            scale: scale,
            z: p.z
        };
    }

    // ── 7. Rendering Layers ───────────────────────────────────────────────────

    // Atmospheric outer corona & radiant rim
    function drawAtmosphere() {
        var r = globe.radius;
        var outerR = r * 1.25;

        // Radiant Outer Corona
        var corona = ctx.createRadialGradient(globe.cx, globe.cy, r * 0.85, globe.cx, globe.cy, outerR);
        corona.addColorStop(0, 'rgba(0, 229, 255, 0)');
        corona.addColorStop(0.65, 'rgba(0, 229, 255, 0.08)');
        corona.addColorStop(0.85, 'rgba(0, 229, 255, 0.16)');
        corona.addColorStop(1, 'rgba(0, 229, 255, 0)');

        ctx.beginPath();
        ctx.arc(globe.cx, globe.cy, outerR, 0, Math.PI * 2);
        ctx.fillStyle = corona;
        ctx.fill();

        // Edge Silhouette Rim
        var rim = ctx.createRadialGradient(globe.cx, globe.cy, r * 0.70, globe.cx, globe.cy, r * 1.05);
        rim.addColorStop(0, 'rgba(0, 229, 255, 0)');
        rim.addColorStop(0.75, 'rgba(0, 229, 255, 0.06)');
        rim.addColorStop(0.92, 'rgba(0, 229, 255, 0.22)');
        rim.addColorStop(1, 'rgba(0, 229, 255, 0)');

        ctx.beginPath();
        ctx.arc(globe.cx, globe.cy, r * 1.05, 0, Math.PI * 2);
        ctx.fillStyle = rim;
        ctx.fill();
    }

    // Latitude & Longitude Graticule Wireframe
    function drawGrid() {
        var DEG = Math.PI / 180;
        ctx.lineWidth = 0.8;

        // Meridians
        for (var m = 0; m < 10; m++) {
            var lon = (m / 10) * Math.PI * 2;
            ctx.beginPath();
            var started = false;

            for (var lat = -90; lat <= 90; lat += 4) {
                var latR = lat * DEG;
                var px = Math.cos(latR) * Math.sin(lon);
                var py = Math.sin(latR);
                var pz = Math.cos(latR) * Math.cos(lon);

                var rp = rotate3D(px, py, pz);
                var pp = project3D(rp);

                // Front hemisphere depth shading
                if (rp.z < -0.05) {
                    started = false;
                    continue;
                }

                var alpha = Math.pow(Math.max(0, rp.z), 0.7) * 0.24;
                ctx.strokeStyle = 'rgba(0, 229, 255, ' + alpha.toFixed(3) + ')';

                if (!started) {
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pp.sx, pp.sy);
                    started = true;
                } else {
                    ctx.lineTo(pp.sx, pp.sy);
                }
            }
            ctx.stroke();
        }

        // Parallels
        var lats = [-60, -35, 0, 35, 60];
        for (var p = 0; p < lats.length; p++) {
            var pLat = lats[p] * DEG;
            ctx.beginPath();
            var pStarted = false;

            for (var deg = 0; deg <= 360; deg += 4) {
                var lonR = deg * DEG;
                var px2 = Math.cos(pLat) * Math.sin(lonR);
                var py2 = Math.sin(pLat);
                var pz2 = Math.cos(pLat) * Math.cos(lonR);

                var rp2 = rotate3D(px2, py2, pz2);
                var pp2 = project3D(rp2);

                if (rp2.z < -0.05) {
                    pStarted = false;
                    continue;
                }

                var alpha2 = Math.pow(Math.max(0, rp2.z), 0.7) * 0.22;
                ctx.strokeStyle = 'rgba(0, 229, 255, ' + alpha2.toFixed(3) + ')';

                if (!pStarted) {
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(pp2.sx, pp2.sy);
                    pStarted = true;
                } else {
                    ctx.lineTo(pp2.sx, pp2.sy);
                }
            }
            ctx.stroke();
        }
    }

    // 3D Dot-Matrix Continents with True Curvature & Depth
    function drawDots() {
        for (var i = 0; i < spherePoints.length; i++) {
            var sp = spherePoints[i];
            var rp = rotate3D(sp.x, sp.y, sp.z);

            // True 3D depth culling: only draw front hemisphere
            if (rp.z <= 0) continue;

            var pp = project3D(rp);
            // Non-linear depth falloff: sharp & bright at center, dimming toward edges
            var depth = Math.pow(Math.max(0, rp.z), 0.65);
            if (depth < 0.02) continue;

            var dotRadius = (0.8 + depth * 1.5) * (globe.radius / 130);

            // Ambient Glow Halo
            var haloSize = dotRadius * 3.2;
            var haloAlpha = depth * 0.35;
            ctx.beginPath();
            ctx.arc(pp.sx, pp.sy, haloSize, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 229, 255, ' + haloAlpha.toFixed(3) + ')';
            ctx.fill();

            // Luminous Core Dot
            ctx.beginPath();
            ctx.arc(pp.sx, pp.sy, dotRadius, 0, Math.PI * 2);
            var coreAlpha = 0.5 + depth * 0.5;
            var coreG = Math.round(200 + depth * 55);
            var coreB = Math.round(230 + depth * 25);
            ctx.fillStyle = 'rgba(0, ' + coreG + ', ' + coreB + ', ' + coreAlpha.toFixed(3) + ')';
            ctx.fill();
        }
    }

    // Silicon CPU Chip Socket & PCB Motherboard Traces
    function drawCircuitBoard() {
        var chipX = globe.cx;
        var chipY = globe.cy + globe.radius * 1.04;
        var chipW = globe.radius * 0.75;
        var chipH = globe.radius * 0.20;

        // 1. Static PCB Copper Traces
        for (var t = 0; t < traces.length; t++) {
            var trace = traces[t];
            var segs = trace.segments;
            var color = trace.color === 'amber'
                ? 'rgba(245, 158, 11, 0.18)'
                : 'rgba(0, 229, 255, 0.18)';

            ctx.strokeStyle = color;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(segs[0].x, segs[0].y);
            for (var s = 1; s < segs.length; s++) {
                ctx.lineTo(segs[s].x, segs[s].y);
            }
            ctx.stroke();
        }

        // 2. Animated Outward Light Pulses along Traces
        for (var p = 0; p < pulses.length; p++) {
            var pulse = pulses[p];
            pulse.t += pulse.speed;

            if (pulse.t >= 1) {
                pulse.t -= 1;
                // Chance to trigger an upward data ascent packet from chip to globe
                if (Math.random() < 0.30 && dataPackets.length < 15) {
                    dataPackets.push({
                        x: chipX + (Math.random() - 0.5) * chipW * 0.45,
                        y: chipY - chipH * 0.5,
                        targetY: globe.cy + globe.radius * 0.82,
                        speed: 0.9 + Math.random() * 1.1,
                        alpha: 1.0
                    });
                }
            }

            var pt = getPointAlongTrace(traces[pulse.traceIdx], pulse.t);
            var isAmber = traces[pulse.traceIdx].color === 'amber';
            var rgb = isAmber ? '245, 158, 11' : '0, 229, 255';

            // Outer Pulse Glow
            var glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6);
            glow.addColorStop(0, 'rgba(' + rgb + ', 0.8)');
            glow.addColorStop(1, 'rgba(' + rgb + ', 0)');
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // Bright Core
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = isAmber ? '#fbbf24' : '#e0faff';
            ctx.fill();
        }

        // 3. Silicon Microchip Socket
        var pulseGlow = 0.22 + Math.sin(Date.now() * 0.003) * 0.10;
        ctx.strokeStyle = 'rgba(0, 229, 255, ' + pulseGlow.toFixed(3) + ')';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(chipX - chipW * 0.5, chipY - chipH * 0.5, chipW, chipH);

        // Chip Internal Bevel & Markings
        ctx.fillStyle = 'rgba(7, 15, 30, 0.7)';
        ctx.fillRect(chipX - chipW * 0.5, chipY - chipH * 0.5, chipW, chipH);

        ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(chipX - chipW * 0.5 + 4, chipY - chipH * 0.5 + 3, chipW - 8, chipH - 6);

        // Chip Corner Pins
        var pinLen = 5;
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
        ctx.lineWidth = 1.0;
        for (var pin = 0; pin < 6; pin++) {
            var pinX = chipX - chipW * 0.4 + pin * (chipW * 0.16);
            ctx.beginPath();
            ctx.moveTo(pinX, chipY + chipH * 0.5);
            ctx.lineTo(pinX, chipY + chipH * 0.5 + pinLen);
            ctx.stroke();
        }

        // 4. Upward Telemetry Packets (CPU Socket → Globe South Pole)
        for (var d = dataPackets.length - 1; d >= 0; d--) {
            var pkt = dataPackets[d];
            pkt.y -= pkt.speed;

            var totalDist = (chipY - chipH * 0.5) - pkt.targetY;
            var traveled = (chipY - chipH * 0.5) - pkt.y;
            pkt.alpha = Math.max(0, 1 - (traveled / totalDist));

            if (pkt.alpha <= 0 || pkt.y <= pkt.targetY) {
                dataPackets.splice(d, 1);
                continue;
            }

            // Packet Stream Line
            ctx.strokeStyle = 'rgba(0, 229, 255, ' + (pkt.alpha * 0.35).toFixed(3) + ')';
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(pkt.x, pkt.y);
            ctx.lineTo(pkt.x, pkt.y + 10);
            ctx.stroke();

            // Head Glow
            var pGlow = ctx.createRadialGradient(pkt.x, pkt.y, 0, pkt.x, pkt.y, 5);
            pGlow.addColorStop(0, 'rgba(0, 229, 255, ' + (pkt.alpha * 0.9).toFixed(3) + ')');
            pGlow.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.beginPath();
            ctx.arc(pkt.x, pkt.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = pGlow;
            ctx.fill();

            // Head Core
            ctx.beginPath();
            ctx.arc(pkt.x, pkt.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
    }

    // ── 8. Mouse & Scroll Parallax Listeners ───────────────────────────────────
    var mouse = { x: W * 0.5, y: H * 0.5 };
    var scrollY = 0;
    var lastScrollY = 0;
    var scrollVelocity = 0;

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('scroll', function () {
        scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    }, { passive: true });

    // ── 9. Main Animation Loop ────────────────────────────────────────────────
    var running = true;
    var rafId = null;

    function renderFrame() {
        if (!running) return;
        rafId = requestAnimationFrame(renderFrame);

        // Smooth scroll velocity decay
        scrollVelocity = (scrollY - lastScrollY) * 0.25;
        scrollVelocity *= 0.92;
        lastScrollY += (scrollY - lastScrollY) * 0.12;

        // Continuous Y-axis rotation with slight scroll boost
        var speedBoost = Math.min(Math.abs(scrollVelocity) * 0.0015, globe.baseSpeed * 1.5);
        globe.rotY += globe.baseSpeed + speedBoost;

        // Mouse Parallax 3D Tilt (±12° pitch, ±8° roll)
        var dx = (mouse.x - globe.cx) / (W * 0.5);
        var dy = (mouse.y - globe.cy) / (H * 0.5);
        var maxTiltX = 12 * (Math.PI / 180);
        var maxTiltZ = 8 * (Math.PI / 180);

        globe.targetTiltX = -dy * maxTiltX + 0.15; // Natural 10° forward tilt
        globe.targetTiltZ = dx * maxTiltZ;

        // Eased interpolation
        globe.tiltX += (globe.targetTiltX - globe.tiltX) * 0.045;
        globe.tiltZ += (globe.targetTiltZ - globe.tiltZ) * 0.045;

        // Draw Complete Scene
        ctx.clearRect(0, 0, W, H);
        drawCircuitBoard();
        drawAtmosphere();
        drawGrid();
        drawDots();
    }

    // ── 10. Lifecycle & Visibility Listeners ───────────────────────────────────
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
        } else {
            if (!running) {
                running = true;
                renderFrame();
            }
        }
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            resizeCanvas();
        }, 120);
    });

    // ── 11. Boot & Initialization ─────────────────────────────────────────────
    function init() {
        resizeCanvas();
        generateSpherePoints();
        computeLayout();
        buildTraces();

        running = true;
        renderFrame();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run on window load to ensure all stylesheets and geometry are resolved
    window.addEventListener('load', function () {
        resizeCanvas();
    });

})();
