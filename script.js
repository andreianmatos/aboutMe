/* Imagens: pasta main/items/ ao lado de index.html (commit no Git).
   Flutuantes: 1.png … 10.png. Thumbnails: ceramics.png, images.png, drawings.png, videos.gif, writings.png */
const CONFIG = {
    pieces: { minScale: 0.1, maxScale: 0.18 },
    workFloats: { minScale: 0.07, maxScale: 0.12 },
    paths: { items: 'main/items/' },
    /** Movimento flutuante: vx/vy por frame (~60fps). */
    drift: {
        vMax: 0.82,
        damping: 0.99935,
        minSpeed: 0.055,
        nudge: 0.16,
    },
};

const WORK_FLOATS = [
    { path: 'main/items/ceramics.png', href: 'https://andreianmatos.github.io/ceramics' },
    { path: 'main/items/images.png', href: 'https://andreianmatos.github.io/images' },
    { path: 'main/items/drawings.png', href: 'https://andreianmatos.github.io/drawings' },
    { path: 'main/items/videos.gif', href: 'https://andreianmatos.github.io/videos' },
    { path: 'main/items/writings.png', href: 'writings.html' },
];

/**
 * Pasta “actual” da página. Sem isto, em URLs como …/aboutMe (sem / final),
 * new URL('main/items/1.png', location) vira …/main/items/1.png em vez de …/aboutMe/main/items/1.png
 * (comum em GitHub Pages no telemóvel).
 */
function pageDirectoryPath() {
    let p = window.location.pathname;
    if (p.endsWith('/')) return p;
    if (/\.html?$/i.test(p)) return p.replace(/\/[^/]*$/, '/');
    return `${p}/`;
}

function resolveAssetUrl(relativePath) {
    const clean = relativePath.replace(/^\//, '');
    if (window.location.protocol === 'file:') return clean;
    const dir = pageDirectoryPath();
    return `${window.location.origin}${dir}${clean}`;
}

function viewportWidth() {
    return window.visualViewport?.width ?? window.innerWidth;
}

function viewportHeight() {
    return window.visualViewport?.height ?? window.innerHeight;
}

let floatingItems = [];

/** Evitar notifyPretextDirty a 60fps: destrói o DOM do Pretext e o clique no CV nunca dispara. */
let lastPhysicsPretextNotify = 0;
const PHYSICS_PRETEXT_INTERVAL_MS = 280;

function isMobile() {
    return window.matchMedia('(max-width: 800px)').matches;
}

function notifyPretextDirty() {
    window.dispatchEvent(new Event('pretext-dirty'));
}

function setCvPanelOpen(open) {
    const panel = document.getElementById('cv-inline');
    if (!panel) return;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('cv-open', open);
    const btn = document.getElementById('cv-inline-toggle');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    requestAnimationFrame(() => notifyPretextDirty());
}

function setContactPanelOpen(open) {
    const panel = document.getElementById('contact-inline');
    if (!panel) return;
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('contact-open', open);
    const btn = document.getElementById('contact-inline-toggle');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    requestAnimationFrame(() => notifyPretextDirty());
}

/** Botão CV (Pretext) chama isto; definido cedo para o módulo poder usar. */
function toggleCvPanelFromUi() {
    const panel = document.getElementById('cv-inline');
    if (!panel) return;
    setCvPanelOpen(!panel.classList.contains('is-open'));
}
window.toggleCvPanelFromUi = toggleCvPanelFromUi;

function toggleContactPanelFromUi() {
    const panel = document.getElementById('contact-inline');
    if (!panel) return;
    setContactPanelOpen(!panel.classList.contains('is-open'));
}
window.toggleContactPanelFromUi = toggleContactPanelFromUi;

function loadImageUrl(url) {
    return new Promise((res) => {
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.onload = () => res(img);
        img.onerror = () => res(null);
        img.src = url;
    });
}

async function tryLoadItem(id) {
    const url = resolveAssetUrl(`${CONFIG.paths.items}${id}.png`);
    const img = await loadImageUrl(url);
    return img ? id : null;
}

function attachPointerHandlers(container, item) {
    const onMove = (e) => {
        if (item.isDragging) {
            item.x = e.clientX - item.dragOffsetX;
            item.y = e.clientY - item.dragOffsetY;
            item.dragMoved = Math.max(
                item.dragMoved,
                Math.hypot(e.clientX - item.dragStartX, e.clientY - item.dragStartY)
            );
            notifyPretextDirty();
        }
    };

    container.onpointerdown = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        item.isDragging = true;
        item.dragMoved = 0;
        item.dragStartX = e.clientX;
        item.dragStartY = e.clientY;
        item.dragDownAt = Date.now();
        container.setPointerCapture(e.pointerId);
        item.dragOffsetX = e.clientX - item.x;
        item.dragOffsetY = e.clientY - item.y;
    };
    container.onpointermove = onMove;
    container.onpointerup = () => {
        item.isDragging = false;
        const tap = item.linkHref && item.dragMoved < 12 && Date.now() - item.dragDownAt < 900;
        if (tap) {
            const h = item.linkHref;
            if (/^https?:\/\//i.test(h)) {
                window.open(h, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = h;
            }
        }
    };
    container.onpointercancel = () => {
        item.isDragging = false;
    };
}

function createPieceElement(imgObj, parent, opts = {}) {
    const { minScale, maxScale, extraClass = '', linkHref = null } = opts;
    const mn = minScale ?? CONFIG.pieces.minScale;
    const mx = maxScale ?? CONFIG.pieces.maxScale;

    const container = document.createElement('div');
    container.className = `drawing-item${extraClass ? ` ${extraClass}` : ''}`;
    const imgEl = document.createElement('img');
    imgEl.src = imgObj.src;
    imgEl.alt = '';
    imgEl.draggable = false;
    container.appendChild(imgEl);

    const scale = mn + Math.random() * (mx - mn);
    const vw = viewportWidth();
    const vh = viewportHeight();
    const w = vw * scale;
    const ratio =
        imgObj.naturalWidth > 0 ? imgObj.naturalHeight / imgObj.naturalWidth : 1;
    const h = w * ratio;
    container.style.width = `${w}px`;

    const maxX = Math.max(10, vw - w - 10);
    const maxY = Math.max(10, vh - h - 10);
    const item = {
        el: container,
        x: Math.random() * maxX + 10,
        y: Math.random() * maxY + 10,
        vx: (Math.random() - 0.5) * 2 * CONFIG.drift.vMax,
        vy: (Math.random() - 0.5) * 2 * CONFIG.drift.vMax,
        isDragging: false,
        w,
        h,
        linkHref,
        dragMoved: 0,
        dragStartX: 0,
        dragStartY: 0,
        dragDownAt: 0,
    };

    container.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
    if (linkHref) {
        container.title = 'Arrastar — ou clicar (sem mover) para abrir';
    }
    attachPointerHandlers(container, item);

    parent.appendChild(container);
    floatingItems.push(item);
    return container;
}

async function initFloating() {
    const layer = document.getElementById('drawings-layer');
    if (!layer) return;

    const ids = Array.from({ length: 10 }, (_, i) => i + 1);
    const existing = (await Promise.all(ids.map((id) => tryLoadItem(id)))).filter(Boolean);
    existing.sort(() => Math.random() - 0.5);

    existing.forEach((id, index) => {
        const url = resolveAssetUrl(`${CONFIG.paths.items}${id}.png`);
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.onload = () => {
            createPieceElement(img, layer, {});
            const el = floatingItems[floatingItems.length - 1]?.el;
            if (!el) return;
            if (isMobile()) {
                el.classList.add('appeared');
            } else {
                setTimeout(() => el.classList.add('appeared'), index * 80);
            }
        };
        img.onerror = () => {};
        img.src = url;
    });
}

function initWorkFloats() {
    const layer = document.getElementById('drawings-layer');
    if (!layer) return;

    WORK_FLOATS.forEach((def, index) => {
        const url = resolveAssetUrl(def.path);
        const img = new Image();
        img.decoding = 'async';
        img.loading = 'eager';
        img.onload = () => {
            createPieceElement(img, layer, {
                minScale: CONFIG.workFloats.minScale,
                maxScale: CONFIG.workFloats.maxScale,
                extraClass: 'work-float',
                linkHref: def.href,
            });
            const el = floatingItems[floatingItems.length - 1]?.el;
            if (!el) return;
            if (isMobile()) {
                el.classList.add('appeared');
            } else {
                setTimeout(() => el.classList.add('appeared'), 120 + index * 70);
            }
        };
        img.onerror = () => {};
        img.src = url;
    });
}

function updatePhysics() {
    const bufferZone = 40;

    floatingItems.forEach((item) => {
        if (!item.isDragging) {
            item.x += item.vx;
            item.y += item.vy;

            const itemW = item.w;
            const itemH = item.h;
            const maxX = viewportWidth() - itemW;
            const maxY = viewportHeight() - itemH;

            if (item.x < bufferZone) {
                const factor = item.x / bufferZone;
                item.vx = Math.abs(item.vx) * (0.3 + factor * 0.7);
                item.x = Math.max(0, item.x);
            }
            if (item.x > maxX - bufferZone) {
                const factor = (maxX - item.x) / bufferZone;
                item.vx = -Math.abs(item.vx) * (0.3 + factor * 0.7);
                item.x = Math.min(maxX, item.x);
            }
            if (item.y < bufferZone) {
                const factor = item.y / bufferZone;
                item.vy = Math.abs(item.vy) * (0.3 + factor * 0.7);
                item.y = Math.max(0, item.y);
            }
            if (item.y > maxY - bufferZone) {
                const factor = (maxY - item.y) / bufferZone;
                item.vy = -Math.abs(item.vy) * (0.3 + factor * 0.7);
                item.y = Math.min(maxY, item.y);
            }

            item.x = Math.max(0, Math.min(maxX, item.x));
            item.y = Math.max(0, Math.min(maxY, item.y));

            const damp = CONFIG.drift.damping;
            item.vx *= damp;
            item.vy *= damp;

            const minV = CONFIG.drift.minSpeed;
            if (Math.abs(item.vx) < minV && Math.abs(item.vy) < minV) {
                const n = CONFIG.drift.nudge;
                item.vx += (Math.random() - 0.5) * 2 * n;
                item.vy += (Math.random() - 0.5) * 2 * n;
            }
        }

        if (item.el?.style) {
            item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        }
    });

    const now = performance.now();
    if (now - lastPhysicsPretextNotify >= PHYSICS_PRETEXT_INTERVAL_MS) {
        lastPhysicsPretextNotify = now;
        notifyPretextDirty();
    }
    requestAnimationFrame(updatePhysics);
}

function toggleCollapsible(element) {
    const content = element.nextElementSibling;
    if (!content?.classList.contains('content')) return;
    const willOpen = !content.classList.contains('is-open');
    content.classList.toggle('is-open', willOpen);
    element.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    requestAnimationFrame(() => notifyPretextDirty());
}

function initCvInline() {
    const panel = document.getElementById('cv-inline');
    const textBlock = document.querySelector('.text-block');
    if (!panel || !textBlock || textBlock.dataset.cvDeleg) return;
    textBlock.dataset.cvDeleg = '1';

    panel.querySelectorAll('.content').forEach((el) => el.style.removeProperty('display'));

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (panel.classList.contains('is-open')) setCvPanelOpen(false);
        const contactPanel = document.getElementById('contact-inline');
        if (contactPanel?.classList.contains('is-open')) setContactPanelOpen(false);
    });

    panel.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'max-height') {
            notifyPretextDirty();
        }
    });

    const contactPanel = document.getElementById('contact-inline');
    if (contactPanel) {
        contactPanel.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'max-height') {
                notifyPretextDirty();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCvInline();
    setContactPanelOpen(true);
    setCvPanelOpen(true);
    initFloating();
    initWorkFloats();
    updatePhysics();
});
