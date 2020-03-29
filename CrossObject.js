const drawLine = (context, x1, y1, x2, y2) => {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

class CrossObject extends GameObject {

    deg = 0
    prevT = 0
    currT = 0

    constructor(x, y, color) {
        super()
        this.x = x
        this.y = y
        this.color = color
    }

    draw(context) {
        const size = h / 5
        context.lineWidth = Math.min(w, h) / 90
        context.lineCap = 'round'
        context.strokeStyle = this.color
        context.save()
        context.translate(this.x, this.y)
        for (var j = 0; j < 2; j++) {
            const sf = 1 - 2 * j
            context.save()
            context.rotate(sf * Math.PI / 4 * Math.sin((this.deg % 180) * Math.PI / 180))
            drawLine(context, 0, -size / 2, 0, size / 2)
            context.restore()
        }
        context.restore()
    }

    update() {
        this.currT++
        if (this.currT - this.prevT > 30) {
            this.prevT = this.currT
            this.deg += 30
        }
    }
}
