/* ============================================================
   experience.js  – Timeline interactivity
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ──────────────────────────────────────────
       1. BUILD YEAR RULER
       Timeline spans 2008 → 2026  (14 cols wide)
       Each col = 1 year. Total = 18 years.
    ────────────────────────────────────────── */
    const START_YEAR = 2008;
    const END_YEAR   = 2026;
    const TOTAL_YEARS = END_YEAR - START_YEAR;   // 18

    const yearsContainer = document.getElementById('timelineYears');
    if (yearsContainer) {
        for (let y = START_YEAR; y <= END_YEAR; y++) {
            const span = document.createElement('span');
            span.className = 'tl-year-marker';
            span.textContent = y;
            yearsContainer.appendChild(span);
        }
    }

    /* ──────────────────────────────────────────
       2. ANIMATED PLAYHEAD that tracks mouse
    ────────────────────────────────────────── */
    const ruler   = document.getElementById('timelineRuler');
    const playhead = document.getElementById('timelinePlayhead');

    if (ruler && playhead) {
        ruler.addEventListener('mousemove', (e) => {
            const rect = ruler.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            playhead.style.left = x + 'px';
            playhead.style.opacity = '1';
        });

        ruler.addEventListener('mouseleave', () => {
            playhead.style.opacity = '0';
        });
    }

    /* ──────────────────────────────────────────
       3. TIMELINE BLOCK CLICK → highlight card
    ────────────────────────────────────────── */
    const tlBlocks = document.querySelectorAll('.tl-block');
    const expCards = document.querySelectorAll('.exp-card');

    tlBlocks.forEach(block => {
        const activateById = (id) => {
            // Highlight the matching card
            expCards.forEach(card => {
                card.classList.remove('highlighted');
            });
            const matchCard = document.getElementById('card-' + id);
            if (matchCard) {
                matchCard.classList.add('highlighted');
                matchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // Highlight the block itself
            tlBlocks.forEach(b => b.classList.remove('active'));
            block.classList.add('active');
        };

        block.addEventListener('click', () => activateById(block.dataset.id));
        block.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateById(block.dataset.id);
            }
        });
    });

    /* ──────────────────────────────────────────
       4. CARD HOVER → pulse the matching block
    ────────────────────────────────────────── */
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const id = card.dataset.id;
            tlBlocks.forEach(b => {
                b.classList.toggle('pulsing', b.dataset.id === id);
            });
        });
        card.addEventListener('mouseleave', () => {
            tlBlocks.forEach(b => b.classList.remove('pulsing'));
        });
    });

    /* ──────────────────────────────────────────
       5. HORIZONTAL DRAG-TO-SCROLL on ruler
    ────────────────────────────────────────── */
    let isDown = false;
    let startX;
    let scrollLeft;

    if (ruler) {
        ruler.addEventListener('mousedown', (e) => {
            isDown = true;
            ruler.classList.add('dragging');
            startX = e.pageX - ruler.offsetLeft;
            scrollLeft = ruler.scrollLeft;
        });
        ruler.addEventListener('mouseleave', () => {
            isDown = false;
            ruler.classList.remove('dragging');
        });
        ruler.addEventListener('mouseup', () => {
            isDown = false;
            ruler.classList.remove('dragging');
        });
        ruler.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - ruler.offsetLeft;
            const walk = (x - startX) * 1.5;
            ruler.scrollLeft = scrollLeft - walk;
        });
    }
});
