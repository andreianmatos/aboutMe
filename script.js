function show(sectionId) {
    const allContent = document.querySelectorAll('.content-div');
    const allMenuItems = document.querySelectorAll('.menu');
    
    // 1. Hide all content sections
    allContent.forEach(div => {
        div.classList.remove('is-visible');
    });

    // 2. Remove "active" (and the asterisk) from all links
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });

    // 3. Show specific section and highlight the clicked link
    if (sectionId === 'section1') {
        document.querySelectorAll('.section1').forEach(div => div.classList.add('is-visible'));
        document.getElementById('nav-about').classList.add('active');
    } 
    else if (sectionId === 'section2') {
        document.querySelectorAll('.section2').forEach(div => div.classList.add('is-visible'));
        document.getElementById('nav-work').classList.add('active');
        
        // Scatter images logic for Desktop
        if (window.innerWidth > 800) {
            setTimeout(scatterItems, 50);
        }
    }
    // Note: If sectionId is empty (clicking the name), everything stays hidden/dimmed
}

function scrollToTop() {
    if (window.innerWidth <= 800) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const rightPane = document.getElementById('rightpane');
        if (rightPane) rightPane.scrollTop = 0;
    }
}

function toggleCollapsible(element) {
    const content = element.nextElementSibling;
    content.style.display = (content.style.display === "block") ? "none" : "block";
}

function scatterItems() {
    if (window.innerWidth <= 800) return; 

    const items = Array.from(document.querySelectorAll('.scatter-item'));
    const container = document.querySelector('.constellation-container');
    if (!container || items.length === 0) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const cols = 2;
    const rows = 3;
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    let slots = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            slots.push({ r, c });
        }
    }

    slots.sort(() => Math.random() - 0.5);

    items.forEach((item, index) => {
        if (index >= slots.length) return;

        const slot = slots[index];
        const baseX = slot.c * cellWidth + (cellWidth / 2);
        const baseY = slot.r * cellHeight + (cellHeight / 2);

        const itemWidth = item.offsetWidth || 150;
        const itemHeight = item.offsetHeight || 150;
        
        const jitterX = (Math.random() - 0.5) * (cellWidth * 0.4);
        const jitterY = (Math.random() - 0.5) * (cellHeight * 0.4);

        let finalX = baseX + jitterX - (itemWidth / 2);
        let finalY = baseY + jitterY - (itemHeight / 2);

        finalX = Math.max(10, Math.min(finalX, width - itemWidth - 10));
        finalY = Math.max(10, Math.min(finalY, height - itemHeight - 10));

        item.style.left = `${finalX}px`;
        item.style.top = `${finalY}px`;

        const rotation = (Math.random() - 0.5) * 12;
        item.style.transform = `rotate(${rotation}deg)`;
    });
}

window.onresize = () => {
    const workSection = document.querySelector('.section2.content-div');
    if (workSection && workSection.classList.contains('is-visible')) {
        scatterItems();
    }
};