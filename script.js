let highestZ = 1;

class Paper {
    constructor(paper) {
        this.paper = paper;
        this.isDragging = false;
        this.isRotating = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.rotation = Math.random() * 30 - 15;

        this.init();
    }

    init() {
        this.paper.style.transform = `rotate(${this.rotation}deg)`;

        this.paper.addEventListener('mousedown', this.startDrag.bind(this));
        this.paper.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });

        document.addEventListener('mousemove', this.onMove.bind(this));
        document.addEventListener('touchmove', this.onMove.bind(this), { passive: false });

        document.addEventListener('mouseup', this.endDrag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));
    }

    startDrag(e) {
        e.preventDefault();
        
        this.isDragging = true;
        this.paper.style.zIndex = highestZ++;
        
        const event = e.type.includes('touch') ? e.touches[0] : e;
        this.startX = event.clientX - this.currentX;
        this.startY = event.clientY - this.currentY;
    }

    onMove(e) {
        if (!this.isDragging) return;

        const event = e.type.includes('touch') ? e.touches[0] : e;
        this.currentX = event.clientX - this.startX;
        this.currentY = event.clientY - this.startY;

        this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    }

    endDrag() {
        this.isDragging = false;
    }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
