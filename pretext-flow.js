/**
 * Pretext: bio + painéis Contact e CV (obstáculos / alinhamento por bloco).
 */

const TEXT_RUNS = [
  { text: 'Andreia Matos', className: 'pretext-name', el: 'span' },
  { text: ' · ', className: 'pretext-plain', el: 'span' },
  {
    text: 'contact',
    className: 'contact-inline-trigger',
    el: 'button',
    id: 'contact-inline-toggle',
  },
  { text: ' · ', className: 'pretext-plain', el: 'span' },
  {
    text: 'CV',
    className: 'cv-inline-trigger',
    el: 'button',
    id: 'cv-inline-toggle',
  },
  { text: ' · ', className: 'pretext-plain', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'computer scientist and artist; maker of things, such as, ',
    className: 'pretext-blurb',
    el: 'span',
  },
  {
    text: 'ceramics',
    className: 'pretext-work-link',
    el: 'a',
    href: 'https://andreianmatos.github.io/ceramics',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { text: ', ', className: 'pretext-work-sep', el: 'span' },
  {
    text: 'images',
    className: 'pretext-work-link',
    el: 'a',
    href: 'https://andreianmatos.github.io/images',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { text: ', ', className: 'pretext-work-sep', el: 'span' },
  {
    text: 'drawings',
    className: 'pretext-work-link',
    el: 'a',
    href: 'https://andreianmatos.github.io/drawings',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { text: ', ', className: 'pretext-work-sep', el: 'span' },
  {
    text: 'videos',
    className: 'pretext-work-link',
    el: 'a',
    href: 'https://andreianmatos.github.io/videos',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { text: ', ', className: 'pretext-work-sep', el: 'span' },
  {
    text: 'writings',
    className: 'pretext-work-link',
    el: 'a',
    href: 'writings.html',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { text: ', ', className: 'pretext-work-sep', el: 'span' },
  {
    text: 'websites',
    className: 'pretext-site',
    el: 'a',
    href: 'index.html',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { text: '.', className: 'pretext-work-sep', el: 'span' }
];

const TEXT_CONTACT_RUNS = [
  {
    text: 'andreiangmatos@gmail.com',
    className: 'pretext-tool-link',
    el: 'a',
    href: 'mailto:andreiangmatos@gmail.com',
  },
  { text: ' · ', className: 'pretext-plain', el: 'span' },
  {
    text: '@andreiangmatos',
    className: 'pretext-tool-link',
    el: 'a',
    href: 'https://www.instagram.com/andreiangmatos/',
    target: '_blank',
    rel: 'noopener',
  },
];

const TEXT_CV_BIRTH_RUNS = [{ text: 'b. 1999, Viseu · Lisboa', className: 'pretext-meta', el: 'span' }];

const TEXT_CV_EDUCATION_RUNS = [
  { text: '(2024-2025) ', className: 'pretext-cv-body', el: 'span' },
  {
    text: 'Post-Graduation in Communication Sciences: Contemporary Culture and New Technologies',
    className: 'pretext-cv-strong',
    el: 'span',
  },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'Faculdade de Ciências Sociais e Humanas (FCSH), Universidade Nova de Lisboa (NOVA)',
    className: 'pretext-cv-body',
    el: 'span',
  },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2020-2022) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'MSc in Computer Science and Engineering', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'Instituto Superior Técnico (IST), Universidade de Lisboa (UL)',
    className: 'pretext-cv-body',
    el: 'span',
  },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'Specializations: Artificial Intelligence · Computer Graphics',
    className: 'pretext-cv-body',
    el: 'span',
  },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '+ ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Erasmus Exchange Programme', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'ENSIMAG, Université Grenoble Alpes (UGA), Grenoble, France',
    className: 'pretext-cv-body',
    el: 'span',
  },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2017-2020) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'BSc in Computer Science and Engineering', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'Instituto Superior Técnico (IST), Universidade de Lisboa (UL)',
    className: 'pretext-cv-body',
    el: 'span',
  },
];

const TEXT_CV_WORKSHOPS_RUNS = [
  { text: '(2026) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Advanced Illustration Seminar', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  { text: 'Ar.Co', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2025) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Alternative Dreams', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  {
    text: 'Alternative photographic printing processes',
    className: 'pretext-cv-body',
    el: 'span',
  },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  { text: 'Imagerie — Casa de Imagens Lisboa, Portugal', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2024) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Classical Bookbinding Workshop', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  { text: 'Artlier, Lisboa, Portugal', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2023) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Ceramics Club', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  { text: 'Corrente, Lisboa, Portugal', className: 'pretext-cv-body', el: 'span' },
];

const TEXT_CV_RESIDENCIES_RUNS = [
  { text: '(2025) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Provisional School for Nothing', className: 'pretext-cv-strong', el: 'span' },
  { text: ' ', className: 'pretext-plain', el: 'span' },
  { text: 'Associação Provisória, Sabóia, Portugal', className: 'pretext-cv-body', el: 'span' },
];

const TEXT_CV_WORK_RUNS = [
  { text: '(01.2023–present) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Data Scientist / ML Engineer', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Nokia', className: 'pretext-cv-strong', el: 'span' },
  { text: ', Lisboa, Portugal', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(12.2023–03.2024) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Research Assistant', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Tallinn University (TLU)', className: 'pretext-cv-strong', el: 'span' },
  { text: ', Estonia', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(03.2022–07.2022) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Invited Teaching Assistant', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — ', className: 'pretext-cv-body', el: 'span' },
  { text: 'IST', className: 'pretext-cv-strong', el: 'span' },
  { text: ', Lisboa', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(09.2021–10.2022) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Research Intern', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — ', className: 'pretext-cv-body', el: 'span' },
  { text: 'INESC-ID', className: 'pretext-cv-strong', el: 'span' },
  { text: ', Lisboa', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2024, 2025) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Programming Team', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — Olhares do Mediterrâneo', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2022, 2023) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Production Support', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — Doclisboa', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2022) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Production Support', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — Queer Lisboa', className: 'pretext-cv-body', el: 'span' },
  { text: '  ', className: 'pretext-plain', el: 'span' },
  { text: '(2020–2022) ', className: 'pretext-cv-body', el: 'span' },
  { text: 'Co-Founder', className: 'pretext-cv-strong', el: 'span' },
  { text: ' — Kino Kave Cineclub', className: 'pretext-cv-body', el: 'span' },
];

let globalLH = 24;
let contactLH = 24;
let cvBirthLH = 24;
let cvEduLH = 24;
let cvWorkshopsLH = 24;
let cvResLH = 24;
let cvWorkLH = 24;
let modRef = null;
let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
let rafPending = false;
let fontsDirty = true;
let lastMousemoveLayoutMs = 0;
const MOUSEMOVE_LAYOUT_MIN_MS = 90;
/** Relayout no scroll: rebuild a cada tick de scroll → jitter (sobretudo no fim da página). */
let scrollLayoutTimer = null;
const SCROLL_LAYOUT_DEBOUNCE_MS = 200;
/** ResizeObserver após layout altera alturas → outro RO; coalesce num rAF por frame. */
let resizeObserverRaf = null;
/** Avanço horizontal após cada fragmento (canvas vs DOM + respiro entre runs). */
const FRAG_GAP_PX = 1.5;
const INTER_FRAG_EM = 0.16;

function interFragmentGapPx(mount) {
  const em = parseFloat(getComputedStyle(mount).fontSize) || 16;
  return FRAG_GAP_PX + em * INTER_FRAG_EM;
}

function wantsReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Top-aligned rows vs same-y baseline: shift (px) to apply to fragments next to .pretext-name */
const baselineShiftCache = new Map();

function measureBaselineShiftVsName(className, mount) {
  if (className === 'pretext-name') return 0;
  if (baselineShiftCache.has(className)) return baselineShiftCache.get(className);

  const wrap = document.createElement('div');
  wrap.style.cssText =
    'display:flex;align-items:baseline;flex-direction:row;visibility:hidden;position:absolute;left:-9999px;top:0;white-space:nowrap';
  const nameEl = document.createElement('span');
  nameEl.className = 'pretext-name';
  nameEl.textContent = 'Andreia Matos';
  const probe = document.createElement('span');
  probe.className = className;
  probe.textContent = 'Mg';
  wrap.appendChild(nameEl);
  wrap.appendChild(probe);
  mount.appendChild(wrap);
  const nt = nameEl.getBoundingClientRect().top;
  const pt = probe.getBoundingClientRect().top;
  mount.removeChild(wrap);
  const shift = Math.round(pt - nt);
  baselineShiftCache.set(className, shift);
  return shift;
}

function collectTopsWithName(lines) {
  const byTop = new Map();
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].top;
    if (!byTop.has(t)) byTop.set(t, []);
    byTop.get(t).push(lines[i]);
  }
  const tops = new Set();
  for (const arr of byTop.values()) {
    if (arr.some((x) => x.run.className === 'pretext-name')) {
      tops.add(arr[0].top);
    }
  }
  return tops;
}

function subtractInterval(seg, o) {
  const { l, r } = seg;
  const ol = o.left;
  const or = o.right;
  if (or <= l || ol >= r) return [seg];
  const out = [];
  if (ol > l) out.push({ l, r: Math.min(r, ol) });
  if (or < r) out.push({ l: Math.max(l, or), r });
  return out.filter((s) => s.r - s.l > 40);
}

function bestSegmentForY(textRect, cy, obstacles) {
  let segs = [{ l: textRect.left, r: textRect.right }];
  for (const o of obstacles) {
    if (o.bottom <= cy || o.top >= cy) continue;
    if (o.right <= textRect.left || o.left >= textRect.right) continue;
    segs = segs.flatMap((s) => subtractInterval(s, o));
  }
  if (segs.length === 0) return null;
  segs.sort((a, b) => b.r - b.l - (a.r - a.l));
  return segs[0];
}

function buildCanvasFont(cs) {
  const family = cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
  const st = cs.fontStyle === 'normal' ? '' : `${cs.fontStyle} `;
  return `${st}${cs.fontWeight} ${cs.fontSize} "${family}"`.trim();
}

function measureRunClass(mount, className) {
  const wrap = document.createElement('div');
  wrap.className = 'pretext-line-row';
  wrap.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0';
  const inner = document.createElement('span');
  inner.className = className;
  inner.textContent = 'Mg';
  wrap.appendChild(inner);
  mount.appendChild(wrap);
  const cs = getComputedStyle(inner);
  const fontSize = parseFloat(cs.fontSize) || 16;
  const lh = parseFloat(cs.lineHeight);
  const lineHeightPx = Number.isFinite(lh) && lh > 0 ? lh : fontSize * 1.86;
  const canvasFont = buildCanvasFont(cs);
  mount.removeChild(wrap);
  return { lineHeightPx, canvasFont };
}

/** Extra vertical stride so rows do not overlap (subpixel LH, descenders, baseline shift vs name). */
function maxDownwardBaselineShiftVsName(mount, runs) {
  let max = 0;
  for (const run of runs) {
    if (run.className === 'pretext-name') continue;
    const s = measureBaselineShiftVsName(run.className, mount);
    if (s > max) max = s;
  }
  return max;
}

function syncMetricsForRuns(mount, runs, setGlobalLH, opts = {}) {
  const lines = mount;
  const cs = getComputedStyle(lines);
  const fontSize = parseFloat(cs.fontSize) || 16;
  const lh = parseFloat(cs.lineHeight);
  const baseLH = Number.isFinite(lh) && lh > 0 ? lh : fontSize * 1.86;
  let maxLH = baseLH;
  for (const run of runs) {
    const m = measureRunClass(lines, run.className);
    run.lineHeightPx = m.lineHeightPx;
    run.canvasFont = m.canvasFont;
    if (m.lineHeightPx > maxLH) maxLH = m.lineHeightPx;
  }
  const shiftPad = opts.skipNameShift ? 0 : maxDownwardBaselineShiftVsName(mount, runs);
  const subpixelPad = 4;
  setGlobalLH(Math.max(22, Math.ceil(maxLH) + shiftPad + subpixelPad));
}

function syncGlobalMetrics(mount) {
  syncMetricsForRuns(mount, TEXT_RUNS, (v) => {
    globalLH = v;
  });
}

function prepareRunsFor(mod, runs) {
  const { prepareWithSegments } = mod;
  for (const run of runs) {
    if (!run.text || !run.canvasFont) continue;
    if (
      run.__pretextSrc === run.text &&
      run.__pretextFont === run.canvasFont &&
      run.prepared
    ) {
      continue;
    }
    try {
      run.prepared = prepareWithSegments(run.text, run.canvasFont);
      run.__pretextSrc = run.text;
      run.__pretextFont = run.canvasFont;
    } catch (_) {
      run.prepared = null;
      run.__pretextSrc = '';
      run.__pretextFont = '';
    }
    run.cursor = { segmentIndex: 0, graphemeIndex: 0 };
  }
}

function prepareAllPretextRuns(mod) {
  prepareRunsFor(mod, TEXT_RUNS);
  prepareRunsFor(mod, TEXT_CONTACT_RUNS);
  prepareRunsFor(mod, TEXT_CV_BIRTH_RUNS);
  prepareRunsFor(mod, TEXT_CV_EDUCATION_RUNS);
  prepareRunsFor(mod, TEXT_CV_WORKSHOPS_RUNS);
  prepareRunsFor(mod, TEXT_CV_RESIDENCIES_RUNS);
  prepareRunsFor(mod, TEXT_CV_WORK_RUNS);
}

function resetRunCursors(runs) {
  for (const run of runs) {
    run.cursor = { segmentIndex: 0, graphemeIndex: 0 };
  }
}

function drawingLayerObstacles() {
  return Array.from(document.querySelectorAll('#drawings-layer .drawing-item.appeared')).map((el) =>
    el.getBoundingClientRect()
  );
}

function getObstaclesForMain() {
  const rects = drawingLayerObstacles();
  const cv = document.getElementById('cv-inline');
  if (cv?.classList.contains('is-open')) {
    const r = cv.getBoundingClientRect();
    if (r.width >= 8 && r.height >= 8) rects.push(r);
  }
  const contact = document.getElementById('contact-inline');
  if (contact?.classList.contains('is-open')) {
    const r = contact.getBoundingClientRect();
    if (r.width >= 8 && r.height >= 8) rects.push(r);
  }
  return rects;
}

function getObstaclesForContactPanel() {
  const rects = drawingLayerObstacles();
  const cv = document.getElementById('cv-inline');
  if (cv?.classList.contains('is-open')) {
    const r = cv.getBoundingClientRect();
    if (r.width >= 8 && r.height >= 8) rects.push(r);
  }
  return rects;
}

function getObstaclesForCvPanel() {
  return drawingLayerObstacles();
}

function applyFontMetricsIfNeeded() {
  const mainMount = document.getElementById('pretext-lines');
  if (!mainMount || !modRef) return false;
  if (fontsDirty) {
    baselineShiftCache.clear();
    syncGlobalMetrics(mainMount);

    const cpm = document.getElementById('contact-pretext-lines');
    if (cpm) {
      syncMetricsForRuns(cpm, TEXT_CONTACT_RUNS, (v) => {
        contactLH = v;
      }, { skipNameShift: true });
    }
    const vbm = document.getElementById('cv-pretext-birth');
    if (vbm) {
      syncMetricsForRuns(vbm, TEXT_CV_BIRTH_RUNS, (v) => {
        cvBirthLH = v;
      }, { skipNameShift: true });
    }
    const ve = document.getElementById('cv-pretext-education');
    if (ve) {
      syncMetricsForRuns(ve, TEXT_CV_EDUCATION_RUNS, (v) => {
        cvEduLH = v;
      }, { skipNameShift: true });
    }
    const vw = document.getElementById('cv-pretext-workshops');
    if (vw) {
      syncMetricsForRuns(vw, TEXT_CV_WORKSHOPS_RUNS, (v) => {
        cvWorkshopsLH = v;
      }, { skipNameShift: true });
    }
    const vr = document.getElementById('cv-pretext-residencies');
    if (vr) {
      syncMetricsForRuns(vr, TEXT_CV_RESIDENCIES_RUNS, (v) => {
        cvResLH = v;
      }, { skipNameShift: true });
    }
    const vwk = document.getElementById('cv-pretext-work');
    if (vwk) {
      syncMetricsForRuns(vwk, TEXT_CV_WORK_RUNS, (v) => {
        cvWorkLH = v;
      }, { skipNameShift: true });
    }

    fontsDirty = false;
  }
  prepareAllPretextRuns(modRef);
  return true;
}

function scheduleLayout() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    if (!applyFontMetricsIfNeeded()) return;
    runLayout();
    runContactLayout();
    runCvBirthLayout();
    runCvSectionLayout('cv-pretext-education', TEXT_CV_EDUCATION_RUNS, cvEduLH);
    runCvSectionLayout('cv-pretext-workshops', TEXT_CV_WORKSHOPS_RUNS, cvWorkshopsLH);
    runCvSectionLayout('cv-pretext-residencies', TEXT_CV_RESIDENCIES_RUNS, cvResLH);
    runCvSectionLayout('cv-pretext-work', TEXT_CV_WORK_RUNS, cvWorkLH);
  });
}

function centerLineGroups(lines, textRect) {
  const byTop = new Map();
  for (let i = 0; i < lines.length; i++) {
    const y = lines[i].top;
    if (!byTop.has(y)) byTop.set(y, []);
    byTop.get(y).push(i);
  }
  for (const indices of byTop.values()) {
    const first = lines[indices[0]];
    if (first.segL == null || first.segR == null) continue;
    const { segL, segR } = first;
    let minLeft = Infinity;
    let maxRight = -Infinity;
    for (const i of indices) {
      const L = lines[i];
      minLeft = Math.min(minLeft, L.left);
      maxRight = Math.max(maxRight, L.left + L.w);
    }
    const contentW = maxRight - minLeft;
    const segW = segR - segL;
    const segLeftLocal = segL - textRect.left;
    const delta = segLeftLocal + (segW - contentW) / 2 - minLeft;
    for (const i of indices) {
      lines[i].left += delta;
    }
  }
}

function alignLineGroups(lines, textRect, alignMode) {
  if (alignMode === 'center') {
    centerLineGroups(lines, textRect);
    return;
  }
  if (alignMode !== 'left') return;
  const byTop = new Map();
  for (let i = 0; i < lines.length; i++) {
    const y = lines[i].top;
    if (!byTop.has(y)) byTop.set(y, []);
    byTop.get(y).push(i);
  }
  for (const indices of byTop.values()) {
    const first = lines[indices[0]];
    if (first.segL == null || first.segR == null) continue;
    const { segL } = first;
    let minLeft = Infinity;
    for (const i of indices) {
      minLeft = Math.min(minLeft, lines[i].left);
    }
    const segLeftLocal = segL - textRect.left;
    const delta = segLeftLocal - minLeft;
    for (const i of indices) {
      lines[i].left += delta;
    }
  }
}

function layoutRunsIntoMount(mount, runs, lhStride, options) {
  const {
    obstacleGetter,
    alignMode = 'center',
    useNameBaseline = true,
    useMouseSkew = true,
  } = options;

  if (!mount || !modRef) return;

  const textRect = mount.getBoundingClientRect();
  if (textRect.width < 60) {
    mount.replaceChildren();
    mount.style.minHeight = '';
    return;
  }

  const obstacles = obstacleGetter();
  const { layoutNextLineRange, materializeLineRange } = modRef;
  resetRunCursors(runs);

  const lines = [];
  let y = 0;
  let xOffset = 0;
  let runIndex = 0;
  const maxH = Math.max(window.innerHeight * 6, 6000);
  const mouseBias = useMouseSkew ? ((mouseX / window.innerWidth - 0.5) * 28) | 0 : 0;
  let guard = 0;

  while (y < maxH && guard++ < 12000) {
    if (runIndex >= runs.length) break;

    const run = runs[runIndex];
    const prepared = run.prepared;
    if (!prepared || !run.text) {
      runIndex++;
      continue;
    }

    let cursor = run.cursor;
    const cy = textRect.top + y + lhStride * 0.52;
    const seg = bestSegmentForY(textRect, cy, obstacles);
    if (!seg) {
      y += lhStride;
      xOffset = 0;
      continue;
    }

    const fragmentLeft = seg.l + xOffset;
    if (fragmentLeft >= seg.r - 32) {
      y += lhStride;
      xOffset = 0;
      continue;
    }

    let width = seg.r - fragmentLeft + mouseBias;
    width = Math.max(36, Math.min(width, textRect.width * 1.3));

    const range = layoutNextLineRange(prepared, cursor, width);
    if (range == null) {
      runIndex++;
      continue;
    }

    const line = materializeLineRange(prepared, range);
    const prev = { ...cursor };
    cursor = range.end;
    run.cursor = cursor;

    if (prev.segmentIndex === cursor.segmentIndex && prev.graphemeIndex === cursor.graphemeIndex) break;

    if (line.text.length === 0) {
      y += lhStride;
      xOffset = 0;
      continue;
    }

    const leftPx = fragmentLeft - textRect.left;
    const canvasW =
      typeof line.width === 'number' && line.width > 0 && Number.isFinite(line.width) ? line.width : 0;
    const domW = measureDomFragmentWidth(mount, run, line.text);
    const w = Math.max(canvasW, domW, 1);

    lines.push({
      text: line.text,
      left: leftPx,
      top: y,
      w,
      run,
      segL: seg.l,
      segR: seg.r,
    });

    xOffset += w + interFragmentGapPx(mount);

    const moreInRun = layoutNextLineRange(prepared, cursor, 1e9) !== null;
    if (!moreInRun) {
      runIndex++;
    }
  }

  alignLineGroups(lines, textRect, alignMode);

  const topsWithName = useNameBaseline ? collectTopsWithName(lines) : new Set();

  const contentH = y + lhStride * 2;
  mount.style.minHeight = `${Math.max(contentH, lhStride * 2)}px`;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];
    const row = document.createElement('div');
    row.className = 'pretext-line-row';
    let topPx = item.top;
    if (useNameBaseline && topsWithName.has(item.top) && item.run.className !== 'pretext-name') {
      topPx += measureBaselineShiftVsName(item.run.className, mount);
    }
    const rowId = lhStride > 0 ? (item.top / lhStride) | 0 : 0;
    const skew =
      useMouseSkew && !wantsReducedMotion()
        ? (((mouseX / window.innerWidth - 0.5) * 2.5 * (rowId % 3)) | 0)
        : 0;
    row.style.top = `${topPx}px`;
    row.style.left = `${item.left}px`;
    row.style.transform = `translateX(${skew}px)`;
    const inner = createInnerEl(item.run, item.text);
    row.appendChild(inner);
    frag.appendChild(row);
  }
  mount.replaceChildren(frag);
}

function patchMainPretextToggleAria() {
  const cvOpen = document.getElementById('cv-inline')?.classList.contains('is-open');
  const contactOpen = document.getElementById('contact-inline')?.classList.contains('is-open');
  document.getElementById('cv-inline-toggle')?.setAttribute('aria-expanded', cvOpen ? 'true' : 'false');
  document.getElementById('contact-inline-toggle')?.setAttribute('aria-expanded', contactOpen ? 'true' : 'false');
}

function runContactLayout() {
  const panel = document.getElementById('contact-inline');
  const mount = document.getElementById('contact-pretext-lines');
  if (!mount) return;
  if (!panel?.classList.contains('is-open')) {
    mount.replaceChildren();
    mount.style.minHeight = '';
    return;
  }
  layoutRunsIntoMount(mount, TEXT_CONTACT_RUNS, contactLH, {
    obstacleGetter: getObstaclesForContactPanel,
    alignMode: 'left',
    useNameBaseline: false,
    useMouseSkew: false,
  });
}

function runCvBirthLayout() {
  const cvPanel = document.getElementById('cv-inline');
  const mount = document.getElementById('cv-pretext-birth');
  if (!mount) return;
  if (!cvPanel?.classList.contains('is-open')) {
    mount.replaceChildren();
    mount.style.minHeight = '';
    return;
  }
  layoutRunsIntoMount(mount, TEXT_CV_BIRTH_RUNS, cvBirthLH, {
    obstacleGetter: getObstaclesForCvPanel,
    alignMode: 'left',
    useNameBaseline: false,
    useMouseSkew: false,
  });
}

function runCvSectionLayout(mountId, runs, lhStride) {
  const cvPanel = document.getElementById('cv-inline');
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (!cvPanel?.classList.contains('is-open')) {
    mount.replaceChildren();
    mount.style.minHeight = '';
    return;
  }
  const content = mount.closest('.content');
  if (content && !content.classList.contains('is-open')) {
    mount.replaceChildren();
    mount.style.minHeight = '';
    return;
  }
  layoutRunsIntoMount(mount, runs, lhStride, {
    obstacleGetter: getObstaclesForCvPanel,
    alignMode: 'left',
    useNameBaseline: false,
    useMouseSkew: false,
  });
}

function createInnerEl(run, text) {
  if (run.el === 'a') {
    const a = document.createElement('a');
    a.className = run.className;
    a.textContent = text;
    if (run.href) a.setAttribute('href', run.href);
    if (run.target) a.setAttribute('target', run.target);
    if (run.rel) a.setAttribute('rel', run.rel);
    return a;
  }
  if (run.el === 'button') {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = run.className;
    b.textContent = text;
    if (run.id) b.id = run.id;
    b.setAttribute('aria-expanded', 'false');
    if (run.id === 'cv-inline-toggle') {
      b.setAttribute('aria-controls', 'cv-inline');
      b.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.toggleCvPanelFromUi === 'function') {
          window.toggleCvPanelFromUi();
        }
      });
    } else if (run.id === 'contact-inline-toggle') {
      b.setAttribute('aria-controls', 'contact-inline');
      b.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.toggleContactPanelFromUi === 'function') {
          window.toggleContactPanelFromUi();
        }
      });
    }
    return b;
  }
  const s = document.createElement('span');
  s.className = run.className;
  s.textContent = text;
  return s;
}

/** Largura real no DOM (canvas do Pretext subestima negrito, botões e espaços). */
function measureDomFragmentWidth(mount, run, text) {
  if (!text.length) return 0;
  const wrap = document.createElement('div');
  wrap.className = 'pretext-line-row';
  wrap.style.cssText =
    'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;pointer-events:none';
  const inner = createInnerEl(run, text);
  wrap.appendChild(inner);
  mount.appendChild(wrap);
  const w = inner.getBoundingClientRect().width;
  mount.removeChild(wrap);
  return w;
}

function runLayout() {
  const mount = document.getElementById('pretext-lines');
  if (!mount || !modRef) return;

  layoutRunsIntoMount(mount, TEXT_RUNS, globalLH, {
    obstacleGetter: getObstaclesForMain,
    alignMode: 'center',
    useNameBaseline: true,
    useMouseSkew: true,
  });

  patchMainPretextToggleAria();

  fitPretextToViewport(mount);

  window.dispatchEvent(new CustomEvent('pretext-layout-done'));
}

const FIT_PAD = 20;
const FIT_MIN_SCALE = 0.42;

function fitPretextToViewport(mount) {
  const outer = mount.closest('.pretext-fit-outer');
  if (!outer) return;

  const cvOpen = document.getElementById('cv-inline')?.classList.contains('is-open');
  const contactOpen = document.getElementById('contact-inline')?.classList.contains('is-open');
  mount.style.transform = '';
  outer.style.height = '';

  if (cvOpen || contactOpen) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const rawH = mount.offsetHeight;
      if (rawH < 8) return;

      const top = mount.getBoundingClientRect().top;
      const avail = window.innerHeight - top - FIT_PAD;
      if (avail < 80 || rawH <= avail) return;

      let s = (avail / rawH) * 0.98;
      if (s < FIT_MIN_SCALE) s = FIT_MIN_SCALE;

      mount.style.transformOrigin = 'top center';
      mount.style.transform = `scale(${s})`;
      outer.style.height = `${rawH * s}px`;
    });
  });
}

function plainFallback(mount) {
  mount.textContent = TEXT_RUNS.map((r) => r.text).join('');
}

async function boot() {
  const mount = document.getElementById('pretext-lines');
  if (!mount) return;

  try {
    await document.fonts.ready;
  } catch (_) {
    /* ignore */
  }

  let mod;
  try {
    mod = await import('https://esm.sh/@chenglou/pretext@0.0.5');
  } catch (e) {
    plainFallback(mount);
    return;
  }
  modRef = mod;
  fontsDirty = true;

  window.addEventListener(
    'resize',
    () => {
      fontsDirty = true;
      scheduleLayout();
    },
    { passive: true }
  );
  window.addEventListener(
    'mousemove',
    (e) => {
      mouseX = e.clientX;
      const t = performance.now();
      if (t - lastMousemoveLayoutMs < MOUSEMOVE_LAYOUT_MIN_MS) return;
      lastMousemoveLayoutMs = t;
      scheduleLayout();
    },
    { passive: true }
  );
  function onWindowScrollForLayout() {
    if (scrollLayoutTimer != null) return;
    scrollLayoutTimer = window.setTimeout(() => {
      scrollLayoutTimer = null;
      scheduleLayout();
    }, SCROLL_LAYOUT_DEBOUNCE_MS);
  }
  window.addEventListener('scroll', onWindowScrollForLayout, { passive: true, capture: true });
  window.addEventListener(
    'scrollend',
    () => {
      if (scrollLayoutTimer != null) {
        window.clearTimeout(scrollLayoutTimer);
        scrollLayoutTimer = null;
      }
      scheduleLayout();
    },
    { passive: true, capture: true }
  );
  window.addEventListener('pretext-dirty', scheduleLayout);

  function onPretextResizeObserved() {
    if (resizeObserverRaf != null) return;
    resizeObserverRaf = requestAnimationFrame(() => {
      resizeObserverRaf = null;
      scheduleLayout();
    });
  }
  const ro = new ResizeObserver(onPretextResizeObserved);
  ro.observe(mount);
  const tb = document.querySelector('.text-block');
  if (tb) ro.observe(tb);
  const cv = document.getElementById('cv-inline');
  if (cv) ro.observe(cv);
  const contactPanel = document.getElementById('contact-inline');
  if (contactPanel) ro.observe(contactPanel);
  const contactPretext = document.getElementById('contact-pretext-lines');
  if (contactPretext) ro.observe(contactPretext);
  for (const id of [
    'cv-pretext-birth',
    'cv-pretext-education',
    'cv-pretext-workshops',
    'cv-pretext-residencies',
    'cv-pretext-work',
  ]) {
    const el = document.getElementById(id);
    if (el) ro.observe(el);
  }

  scheduleLayout();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
