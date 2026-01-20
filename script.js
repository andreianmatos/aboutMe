const CONFIG = {
    pieces: { minToLoad: 3, maxToLoad: 5, minScale: 0.15, maxScale: 0.20 },
    doodles: { minToShow: 6, maxToShow: 9, minScale: 0.35, maxScale: 1.0, minOpacity: 0.15, maxOpacity: 0.3 },
    paths: { items: 'main/items/', doodles: 'main/' }
};

let floatingItems = [];
let isPaused = false;

function isMobile() {
    return window.innerWidth <= 800;
}

// INITIALIZE BACKGROUND DOODLES (main/1.png - main/13.png)
async function initDoodles() {
    // Hide drawings on mobile for better UX
    if (isMobile()) return;
    
    const layer = document.getElementById('doodles-layer');
    const existing = [];
    for (let i = 1; i <= 13; i++) {
        const img = new Image();
        const url = `${CONFIG.paths.doodles}${i}.png`;
        const found = await new Promise(res => {
            img.onload = () => res(true); img.onerror = () => res(false); img.src = url;
        });
        if (found) existing.push(i);
    }
    const selected = existing.sort(() => Math.random() - 0.5).slice(0, 4);
    selected.forEach(id => {
        const d = document.createElement('div');
        d.className = 'doodle';
        d.style.backgroundImage = `url(${CONFIG.paths.doodles}${id}.png)`;
        const img = new Image(); img.src = `${CONFIG.paths.doodles}${id}.png`;
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
    
    const layer = document.getElementById('drawings-layer');
    const existing = [];
    for (let i = 1; i <= 10; i++) {
        const img = new Image(); const url = `${CONFIG.paths.items}${i}.png`;
        const found = await new Promise(res => {
            img.onload = () => res(true); img.onerror = () => res(false); img.src = url;
        });
        if (found) existing.push(i);
    }
    const selected = existing.sort(() => Math.random() - 0.5).slice(0, 7);
    selected.forEach((id, index) => {
        const img = new Image(); img.src = `${CONFIG.paths.items}${id}.png`;
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
        item.isDragging = true;
        container.setPointerCapture(e.pointerId);
        item.dragOffsetX = e.clientX - item.x;
        item.dragOffsetY = e.clientY - item.y;
    };
    container.onpointermove = (e) => {
        if (item.isDragging) {
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
    const container = document.querySelector('.constellation-container');
    if (!container || items.length === 0) return;
    const width = container.offsetWidth, height = container.offsetHeight;
    const cols = 2, rows = 3;
    const cellW = width / cols, cellH = height / rows;
    let slots = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) slots.push({ r, c });
    slots.sort(() => Math.random() - 0.5);
    items.forEach((item, index) => {
        if (index >= slots.length) return;
        const slot = slots[index];
        const baseX = slot.c * cellW + (cellW / 2), baseY = slot.r * cellH + (cellH / 2);
        const itemW = item.offsetWidth, itemH = item.offsetHeight;
        item.style.left = `${Math.max(10, Math.min(baseX + (Math.random()-0.5)*cellW*0.4 - (itemW/2), width-itemW-10))}px`;
        item.style.top = `${Math.max(10, Math.min(baseY + (Math.random()-0.5)*cellH*0.4 - (itemH/2), height-itemH-10))}px`;
        item.style.transform = `rotate(${(Math.random() - 0.5) * 12}deg)`;
    });
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
    initDoodles(); initFloating(); updatePhysics();
});