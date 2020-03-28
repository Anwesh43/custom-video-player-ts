const w : number = window.innerWidth
const h : number = window.innerHeight

class VideoPlayer {

    video : HTMLVideoElement = document.createElement('video')
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D
    gameObjects : Array<GameObject> = []

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
        this.video.src = url
        this.video.style.display = 'none'
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
        setInterval(() => {
            this.show()
        }, 0)
    }

    static init(url) {
        const videoPlayer : VideoPlayer = new VideoPlayer(url)
        videoPlayer.start()
    }
}

class GameObject {

    draw(context : CanvasRenderingContext2D) {

    }

    update() {

    }
}
