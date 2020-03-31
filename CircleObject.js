const rFactor = 5
const fixedR = Math.min(w, h) / rFactor
const circleObjectDelay = 30
const circleUpdateGap = 0.02

class AnimatedScale {

    scale = 0
    t = 0
    prevT = 0
    shouldUpdate = true

    update() {
        if (this.shouldUpdate) {
            if (this.t - this.prevT >= circleObjectDelay) {
                this.prevT = this.t
                this.scale += circleUpdateGap
                if (this.scale > 1) {
                    this.scale = 1
                    this.shouldUpdate = false
                }
            }
            this.t++
        }
    }
}

class CircleObject extends GameObject {

    x
    y
    animatedScale  = new AnimatedScale()
    color

    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color

    }

    draw(context) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / 90
        context.strokeStyle = this.color || "white"
        context.beginPath()
        context.arc(this.x, this.y, fixedR * this.animatedScale.scale)
        context.stroke()
    }

    update() {
        this.animatedScale.update()

    }
}
