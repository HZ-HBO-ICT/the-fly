class Game {
    constructor(canvas) {
        this.eventHandler = (e) => {
            this.Geoffrey.xPos = e.clientX;
            this.Geoffrey.yPos = e.clientY;
            this.collidesWithFlies();
            console.log("click");
        };
        this.loop = () => {
            this.counter++;
            this.draw();
            if (this.counter % 120 == 0) {
                this.update();
            }
            window.requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.flies = [];
        this.counter = 0;
        window.addEventListener("mousedown", this.eventHandler);
        let flyImage = this.loadNewImage(`./assets/images/fly.png`);
        this.Geoffrey = this.playerCreator("Geoffrey");
        for (let i = 0; i < 5; i++) {
            this.flies.push(this.flyFactory("fly", flyImage));
        }
        this.loop();
    }
    playerCreator(playerName) {
        return {
            playerName: playerName,
            xPos: 0,
            yPos: 0,
        };
    }
    flyFactory(flyName, flyImage) {
        return {
            flyName: flyName,
            xPos: Math.floor(Math.random() * (window.innerWidth - flyImage.width)),
            yPos: Math.floor(Math.random() * (window.innerHeight - flyImage.height)),
            alive: true,
            image: flyImage,
        };
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.flies.forEach((fly, index) => {
            this.ctx.drawImage(fly.image, fly.xPos, fly.yPos);
        });
    }
    update() {
        this.flies.forEach(function (fly, index) {
            if (fly.alive) {
                fly.xPos = Math.floor(Math.random() * (window.innerWidth - fly.image.width));
                fly.yPos = Math.floor(Math.random() * (window.innerHeight - fly.image.height));
            }
        });
    }
    collidesWithFlies() {
        let flyIndex = undefined;
        this.flies.forEach((fly, index) => {
            console.log(`MouseX: ${this.Geoffrey.xPos}, FlyX: ${fly.xPos}`);
            console.log(`MouseY: ${this.Geoffrey.yPos}, FlyY: ${fly.yPos}`);
            if (this.Geoffrey.xPos >= fly.xPos &&
                this.Geoffrey.xPos <= fly.xPos + fly.image.width &&
                this.Geoffrey.yPos >= fly.yPos &&
                this.Geoffrey.yPos <= fly.yPos + fly.image.height) {
                flyIndex = index;
                console.log("Smashed", flyIndex);
                this.smashed(flyIndex);
            }
        });
        return flyIndex;
    }
    smashed(flyIndex) {
        this.flies[flyIndex].alive = false;
        this.flies[flyIndex].image = this.loadNewImage(`./assets/images/splash.png`);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
let init = function () {
    const BillTheFly = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map