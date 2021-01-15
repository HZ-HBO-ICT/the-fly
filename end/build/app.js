class GameItem {
    constructor(name) {
        this.name = name;
        this.xPos = 0;
        this.yPos = 0;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    setXPos(xPos) {
        this.xPos = xPos;
    }
    setYPos(yPos) {
        this.yPos = yPos;
    }
}
class Fly extends GameItem {
    constructor(name) {
        super(name);
        this.alive = true;
        this.image = this.loadNewImage(`./assets/images/${this.name}.png`);
        this.xPos = Math.floor(Math.random() * (window.innerWidth - this.image.width));
        this.yPos = Math.floor(Math.random() * (window.innerHeight - this.image.height));
    }
    getImage() {
        return this.image;
    }
    setImage(imageString) {
        this.image = this.loadNewImage(imageString);
    }
    smashed() {
        this.alive = false;
        this.setImage(`./assets/images/splash.png`);
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
    update() {
        if (this.alive) {
            this.xPos = Math.floor(Math.random() * (window.innerWidth - this.image.width));
            this.yPos = Math.floor(Math.random() * (window.innerHeight - this.image.height));
        }
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Player extends GameItem {
    constructor(name) {
        super(name);
    }
    draw() {
    }
    collidesWithFlies(flies) {
        let flyIndex = undefined;
        flies.forEach((fly, index) => {
            console.log(`MouseX: ${this.xPos}, FlyX: ${fly.getXPos()}`);
            console.log(`MouseY: ${this.yPos}, FlyY: ${fly.getYPos()}`);
            if (this.xPos >= fly.getXPos() &&
                this.xPos <= fly.getXPos() + fly.getImage().width &&
                this.yPos >= fly.getYPos() &&
                this.yPos <= fly.getYPos() + fly.getImage().height) {
                flyIndex = index;
                console.log("Smashed", flyIndex);
                fly.smashed();
            }
        });
        return flyIndex;
    }
}
class Game {
    constructor(canvas) {
        this.eventHandler = (e) => {
            this.Geoffrey.setXPos(e.clientX);
            this.Geoffrey.setYPos(e.clientY);
            this.Geoffrey.collidesWithFlies(this.flies);
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
        this.Geoffrey = new Player("Geoffrey");
        for (let i = 0; i < 5; i++) {
            this.flies.push(new Fly("fly"));
        }
        this.loop();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.flies.forEach((fly, index) => {
            fly.draw(this.ctx);
        });
        this.Geoffrey.draw();
    }
    update() {
        this.flies.forEach(function (fly, index) {
            fly.update();
        });
    }
}
let init = function () {
    const BillTheFly = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map