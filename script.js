const CONFIG = {
    pieces: { minToLoad: 3, maxToLoad: 5, minScale: 0.15, maxScale: 0.20 },
    doodles: { minToShow: 6, maxToShow: 9, minScale: 0.35, maxScale: 1.0, minOpacity: 0.15, maxOpacity: 0.3 },
    paths: { items: 'main/items/', doodles: 'main/' }
};

// Helper function to convert image URLs to wsrv.nl CDN
function getCDNUrl(relativePath) {
    // Always use production domain for CDN (images must be accessible from production)
    const productionDomain = 'https://andreiamatos.xyz';
    // Remove leading slash if present
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullUrl = `${productionDomain}/${cleanPath}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(fullUrl)}`;
}

// Helper function to load image with CDN fallback
function loadImageWithCDN(imgElement, relativePath) {
    // Original URL is already set in src attribute, so it will load immediately
    // Try to upgrade to CDN in the background
    const cdnUrl = getCDNUrl(relativePath);
    console.log(`[CDN] Attempting to load: ${relativePath} via CDN: ${cdnUrl}`);
    
    // Test CDN URL
    const testImg = new Image();
    testImg.onload = () => {
        // CDN works, upgrade to CDN
        console.log(`[CDN] ✓ Successfully loaded via CDN: ${relativePath}`);
        imgElement.src = cdnUrl;
    };
    testImg.onerror = () => {
        // CDN failed, keep original src (already loaded)
        console.warn(`[CDN] ✗ Failed to load via CDN, using original: ${relativePath}`);
    };
    testImg.src = cdnUrl;
}

let floatingItems = [];
let isPaused = false;

function isMobile() {
    return window.innerWidth <= 800;
}

// INITIALIZE BACKGROUND DOODLES (main/1.png - main/13.png)
async function initDoodles() {
    // Hide drawings on mobile for better UX
    if (isMobile()) return;
    
    const isProduction = window.location.hostname === 'andreiamatos.xyz' || window.location.hostname.includes('github.io');
    const layer = document.getElementById('doodles-layer');
    const existing = [];
    for (let i = 1; i <= 13; i++) {
        const img = new Image();
        const originalUrl = `${CONFIG.paths.doodles}${i}.png`;
        const url = isProduction ? getCDNUrl(originalUrl) : originalUrl;
        if (isProduction) console.log(`[CDN] Loading doodle ${i} via CDN: ${url}`);
        const found = await new Promise(res => {
            img.onload = () => res(true); img.onerror = () => res(false); img.src = url;
        });
        if (found) existing.push(i);
    }
    const selected = existing.sort(() => Math.random() - 0.5).slice(0, 4);
    selected.forEach(id => {
        const d = document.createElement('div');
        d.className = 'doodle';
        const originalUrl = `${CONFIG.paths.doodles}${id}.png`;
        const imageUrl = isProduction ? getCDNUrl(originalUrl) : originalUrl;
        d.style.backgroundImage = `url(${imageUrl})`;
        const img = new Image(); img.src = imageUrl;
        img.onload = () => {
            let scale = CONFIG.doodles.minScale + Math.random() * (CONFIG.doodles.maxScale - CONFIG.doodles.minScale);
            let w = img.naturalWidth * scale;
            d.style.width = w + "px"; d.style.height = (w * (img.naturalHeight / img.naturalWidth)) + "px";
            // Position randomly anywhere on screen
            d.style.left = Math.random() * (window.innerWidth - w) + "px";
            d.style.top = Math.random() * (window.innerHeight - w) + "px";
            d.style.transform = `rotate(${Math.random() * 360}deg)`;
            layer.appendChild(d);
            setTimeout(() => d.style.opacity = CONFIG.doodles.minOpacity + Math.random() * (CONFIG.doodles.maxOpacity - CONFIG.doodles.minOpacity), 100);
        };
    });
}

// INITIALIZE DRAGGABLE PIECES (main/items/1.png - main/items/10.png)
async function initFloating() {
    // Hide draggable pieces on mobile for better UX
    if (isMobile()) return;
    
    const isProduction = window.location.hostname === 'andreiamatos.xyz' || window.location.hostname.includes('github.io');
    const layer = document.getElementById('drawings-layer');
    const existing = [];
    for (let i = 1; i <= 10; i++) {
        const img = new Image();
        const originalUrl = `${CONFIG.paths.items}${i}.png`;
        const url = isProduction ? getCDNUrl(originalUrl) : originalUrl;
        if (isProduction) console.log(`[CDN] Loading draggable item ${i} via CDN: ${url}`);
        const found = await new Promise(res => {
            img.onload = () => res(true); img.onerror = () => res(false); img.src = url;
        });
        if (found) existing.push(i);
    }
    const selected = existing.sort(() => Math.random() - 0.5).slice(0, 7);
    selected.forEach((id, index) => {
        const originalUrl = `${CONFIG.paths.items}${id}.png`;
        const img = new Image(); img.src = isProduction ? getCDNUrl(originalUrl) : originalUrl;
        img.onload = () => {
            const el = createPieceElement(img, layer);
            setTimeout(() => el.classList.add('appeared'), index * 150);
        };
    });
}

function createPieceElement(imgObj, parent) {
    const container = document.createElement('div');
    container.className = 'drawing-item';
    const canvas = document.createElement('canvas');
    canvas.width = imgObj.naturalWidth; canvas.height = imgObj.naturalHeight;
    canvas.getContext('2d').drawImage(imgObj, 0, 0);
    container.appendChild(canvas);

    let scale = CONFIG.pieces.minScale + Math.random() * (CONFIG.pieces.maxScale - CONFIG.pieces.minScale);
    let w = window.innerWidth * scale;
    container.style.width = w + "px";

    // Position randomly anywhere on screen
    const item = { el: container, x: Math.random() * (window.innerWidth - w), y: Math.random() * (window.innerHeight - w), vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, isDragging: false };

    container.onpointerdown = (e) => {
        if (isPaused) return; // Don't allow dragging when paused (About/Work sections are open)
        item.isDragging = true;
        container.setPointerCapture(e.pointerId);
        item.dragOffsetX = e.clientX - item.x;
        item.dragOffsetY = e.clientY - item.y;
    };
    container.onpointermove = (e) => {
        if (item.isDragging && !isPaused) {
            item.x = e.clientX - item.dragOffsetX;
            item.y = e.clientY - item.dragOffsetY;
        }
    };
    container.onpointerup = () => item.isDragging = false;

    parent.appendChild(container);
    floatingItems.push(item);
    return container;
}

function updatePhysics() {
    // Skip physics on mobile
    if (isMobile()) {
        requestAnimationFrame(updatePhysics);
        return;
    }
    
    const bufferZone = 50; // Soft buffer zone for smoother transitions
    
    floatingItems.forEach(item => {
        if (!item.isDragging && !isPaused) {
            // Apply velocity
            item.x += item.vx;
            item.y += item.vy;
            
            const itemW = item.el.offsetWidth;
            const itemH = item.el.offsetHeight;
            const maxX = window.innerWidth - itemW;
            const maxY = window.innerHeight - itemH;
            
            // Soft boundary handling with buffer zones
            // Left edge
            if (item.x < bufferZone) {
                const factor = item.x / bufferZone;
                item.vx = Math.abs(item.vx) * (0.3 + factor * 0.7); // Gradually redirect
                item.x = Math.max(0, item.x);
            }
            // Right edge
            if (item.x > maxX - bufferZone) {
                const factor = (maxX - item.x) / bufferZone;
                item.vx = -Math.abs(item.vx) * (0.3 + factor * 0.7);
                item.x = Math.min(maxX, item.x);
            }
            // Top edge
            if (item.y < bufferZone) {
                const factor = item.y / bufferZone;
                item.vy = Math.abs(item.vy) * (0.3 + factor * 0.7);
                item.y = Math.max(0, item.y);
            }
            // Bottom edge
            if (item.y > maxY - bufferZone) {
                const factor = (maxY - item.y) / bufferZone;
                item.vy = -Math.abs(item.vy) * (0.3 + factor * 0.7);
                item.y = Math.min(maxY, item.y);
            }
            
            // Ensure items stay within bounds
            item.x = Math.max(0, Math.min(maxX, item.x));
            item.y = Math.max(0, Math.min(maxY, item.y));
            
            // Damping to prevent infinite acceleration
            item.vx *= 0.999;
            item.vy *= 0.999;
            
            // Keep items moving - add small random boost if velocity gets too low
            const minVelocity = 0.05;
            if (Math.abs(item.vx) < minVelocity && Math.abs(item.vy) < minVelocity) {
                item.vx += (Math.random() - 0.5) * 0.1;
                item.vy += (Math.random() - 0.5) * 0.1;
            }
        }
        item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
    });
    requestAnimationFrame(updatePhysics);
}

function show(sectionId) {
    const stage = document.getElementById('home-stage');
    document.querySelectorAll('.content-div').forEach(div => div.classList.remove('is-visible'));
    document.querySelectorAll('.menu').forEach(item => item.classList.remove('active'));

    if (sectionId === 'home') {
        stage.classList.remove('dimmed');
        isPaused = false;
    } else {
        stage.classList.add('dimmed');
        isPaused = true;
        // Stop any active dragging when opening a section
        floatingItems.forEach(item => {
            item.isDragging = false;
        });
        if (sectionId === 'section1') {
            document.querySelectorAll('.section1').forEach(div => div.classList.add('is-visible'));
            document.getElementById('nav-about').classList.add('active');
        } else if (sectionId === 'section2') {
            document.querySelectorAll('.section2').forEach(div => div.classList.add('is-visible'));
            document.getElementById('nav-work').classList.add('active');
            if (window.innerWidth > 800) setTimeout(scatterItems, 50);
        }
    }
}

function scatterItems() {
    const items = Array.from(document.querySelectorAll('.constellation-container .scatter-item'));
    const websitesSection = document.querySelector('.constellation-container .websites-section');
    const container = document.querySelector('.constellation-container');
    if (!container || items.length === 0) return;
    const width = container.offsetWidth, height = container.offsetHeight;
    const cols = 2, rows = 3;
    const cellW = width / cols, cellH = height / rows;
    let slots = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) slots.push({ r, c });
    slots.sort(() => Math.random() - 0.5);
    
    // Position scatter items
    items.forEach((item, index) => {
        if (index >= slots.length) return;
        const slot = slots[index];
        const baseX = slot.c * cellW + (cellW / 2), baseY = slot.r * cellH + (cellH / 2);
        const itemW = item.offsetWidth, itemH = item.offsetHeight;
        item.style.left = `${Math.max(10, Math.min(baseX + (Math.random()-0.5)*cellW*0.4 - (itemW/2), width-itemW-10))}px`;
        item.style.top = `${Math.max(10, Math.min(baseY + (Math.random()-0.5)*cellH*0.4 - (itemH/2), height-itemH-10))}px`;
        item.style.transform = `rotate(${(Math.random() - 0.5) * 12}deg)`;
    });
    
    // Position sticky note in an available slot (wait for image to load for accurate dimensions)
    if (websitesSection) {
        const stickyImg = websitesSection.querySelector('.sticky-note-img');
        if (stickyImg && stickyImg.complete) {
            positionStickyNote();
        } else if (stickyImg) {
            stickyImg.onload = positionStickyNote;
        } else {
            setTimeout(positionStickyNote, 100);
        }
    }
    
    function positionStickyNote() {
        if (!websitesSection) return;
        const usedSlots = items.slice(0, Math.min(items.length, slots.length)).map((item, index) => slots[index]);
        const availableSlots = slots.filter(slot => !usedSlots.some(used => used.r === slot.r && used.c === slot.c));
        
        if (availableSlots.length > 0) {
            const slot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
            const baseX = slot.c * cellW + (cellW / 2), baseY = slot.r * cellH + (cellH / 2);
            const itemW = websitesSection.offsetWidth || 280, itemH = websitesSection.offsetHeight || 200;
            websitesSection.style.left = `${Math.max(10, Math.min(baseX + (Math.random()-0.5)*cellW*0.4 - (itemW/2), width-itemW-10))}px`;
            websitesSection.style.top = `${Math.max(10, Math.min(baseY + (Math.random()-0.5)*cellH*0.4 - (itemH/2), height-itemH-10))}px`;
            websitesSection.style.transform = `rotate(${(Math.random() - 0.5) * 8}deg)`;
        }
    }
}

function toggleCollapsible(element) {
    const content = element.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
}

function scrollToTop() {
    if (window.innerWidth <= 800) window.scrollTo({ top: 0, behavior: 'smooth' });
    else { const rp = document.getElementById('rightpane'); if (rp) rp.scrollTop = 0; }
}

document.addEventListener('DOMContentLoaded', () => {
    // Only use CDN on production domain, otherwise use original images
    const isProduction = window.location.hostname === 'andreiamatos.xyz' || window.location.hostname.includes('github.io');
    console.log(`[CDN] Current hostname: ${window.location.hostname}`);
    console.log(`[CDN] Production mode: ${isProduction}`);
    
    if (isProduction) {
        console.log('[CDN] Enabling CDN for images...');
        // Load CDN images for img tags with data-src attribute
        document.querySelectorAll('img.cdn-image').forEach(img => {
            if (img.dataset.src) {
                loadImageWithCDN(img, img.dataset.src);
            }
        });
    } else {
        console.log('[CDN] Not in production mode, using original images');
    }
    // If not production, images will use their original src (already set in HTML)
    
    initDoodles(); initFloating(); updatePhysics();
});