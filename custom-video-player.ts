var w : number = window.innerWidth
var h : number = window.innerHeight

window.onresize = () => {
    w = window.innerWidth
    h = window.innerHeight
}

class VideoPlayer {

    video : HTMLVideoElement = document.createElement('video')
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D
    gameObjects : Array<GameObject> = []
    loaded : boolean = false

    constructor(url) {
        this.initVideo(url)
        this.initCanvas()
    }

    initVideo(url) {
        this.video.width = w
        this.video.height = h
        this.video.style.position = 'absolute'
        this.video.style.left = '0px'
        this.video.style.top = '0px'
        document.body.appendChild(this.video)
        this.video.src = url
        this.video.autoplay = true
        this.video.style.display = 'none'
        this.video.onload = () => {
            this.loaded = true
        }
    }

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        this.canvas.style.position = 'absolute'
        this.canvas.style.left = '0px'
        this.canvas.style.top = '0px'
        document.body.appendChild(this.canvas)
    }

    show() {
        this.context.drawImage(this.video, 0, 0, w, h)
        this.gameObjects.forEach((gameObject) => {
            gameObject.draw(this.context)
            gameObject.update()
        })
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject)
    }

    start() {
        this.video.volume = 0
        this.video.play()
        this.video.loop = true
        setInterval(() => {
            this.show()
        }, 0)
    }

    attachClickListener(cb) {
        this.canvas.onmousedown = (event) => {
            const x = event.offsetX
            const y = event.offsetY
            cb(x, y)
        }
    }

    static create(url) {
        const videoPlayer : VideoPlayer = new VideoPlayer(url)
        videoPlayer.start()
        return videoPlayer
    }
}

class GameObject {

    draw(context : CanvasRenderingContext2D) {

    }

    update() {

    }
}

class ColorFilter extends GameObject {

    alpha : number = 0.4

    constructor(private color : string) {
        super()
    }

    setAlpha(alpha : number) {
        this.alpha = alpha
    }

    draw(context : CanvasRenderingContext2D) {
        context.globalAlpha = this.alpha
        context.fillStyle = this.color
        context.fillRect(0, 0, w, h)
        context.globalAlpha = 1
    }

}
