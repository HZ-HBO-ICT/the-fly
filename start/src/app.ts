class Game {
  private readonly canvas: HTMLCanvasElement; // find the right type
  private readonly ctx: CanvasRenderingContext2D; // find the right type
  private Geoffrey: any;
  private flies: any[];
  private counter: number;

  /**
   * Constructor method to construct an instance based on the Game class
   * @param canvas - canvas in the DOM
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.flies = [];
    this.counter = 0;
    window.addEventListener("mousedown", this.eventHandler);
    //window.addEventListener("mouseup", this.eventUpHandler);
    let flyImage = this.loadNewImage(`./assets/images/fly.png`);
    // Set the context of the canvas
    //create some gameItems
    this.Geoffrey = this.playerCreator("Geoffrey");
    for (let i = 0; i < 5; i++) {
      this.flies.push(this.flyFactory("fly", flyImage));
    }
    //draw is initial state
    this.loop();
  }

  /**
   * Function to create a player
   * @param playerName - name of the player
   */
  public playerCreator(playerName: string): any {
    return {
      playerName: playerName,
      xPos: 0,
      yPos: 0,
    };
  }

  /**
   * Function to create flies
   * @param flyName - name of the fly
   * @param flyImage - name of the image
   */
  public flyFactory(flyName: string, flyImage: HTMLImageElement): any {
    return {
      flyName: flyName,
      xPos: Math.floor(Math.random() * (window.innerWidth - flyImage.width)),
      yPos: Math.floor(Math.random() * (window.innerHeight - flyImage.height)),
      alive: true,
      image: flyImage,
    };
  }

  /**
   * Function to draw the initial state of al living objects
   */
  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.flies.forEach((fly, index) => {
      this.ctx.drawImage(fly.image, fly.xPos, fly.yPos);
    });
  }

  /**
   * Function to update the state of all living objects
   */
  public update(): void {
    //function formerly known as render()
    this.flies.forEach(function (fly, index) {
      if (fly.alive) {
        fly.xPos = Math.floor(
          Math.random() * (window.innerWidth - fly.image.width)
        );
        fly.yPos = Math.floor(
          Math.random() * (window.innerHeight - fly.image.height)
        );
      }
    });
  }

  /**
   * Function to handle the keyboard event
   * @param {MouseEvent} - event
   */
  public eventHandler = (e: MouseEvent) => {
    //stop loop
    this.Geoffrey.xPos = e.clientX;
    this.Geoffrey.yPos = e.clientY;
    //console.log(this.xPos);
    this.collidesWithFlies();
    console.log("click");
  };

  /**
   * Function to determine if the fly collides with the player
   * @param flies - all the flies on the canvas
   */
  public collidesWithFlies() {
    let flyIndex: number = undefined;
    this.flies.forEach((fly, index) => {
      console.log(`MouseX: ${this.Geoffrey.xPos}, FlyX: ${fly.xPos}`);
      console.log(`MouseY: ${this.Geoffrey.yPos}, FlyY: ${fly.yPos}`);

      if (
        this.Geoffrey.xPos >= fly.xPos &&
        this.Geoffrey.xPos <= fly.xPos + fly.image.width &&
        this.Geoffrey.yPos >= fly.yPos &&
        this.Geoffrey.yPos <= fly.yPos + fly.image.height
      ) {
        flyIndex = index;
        console.log("Smashed", flyIndex);

        this.smashed(flyIndex);
      }
    });
    return flyIndex;
  }

  /**
   * Function to turn a fly into a smashed fly
   * @param flyIndex - index of a fly in the fly array
   */
  public smashed(flyIndex: number): void {
    this.flies[flyIndex].alive = false;
    this.flies[flyIndex].image = this.loadNewImage(
      `./assets/images/splash.png`
    );
  }

  /**
   * Loads an image so it doesn't flicker
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  protected loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Function to keep on updating the playing field.
   */
  public loop = (): void => {
    this.counter++;
    this.draw();
    if (this.counter % 120 == 0) {
      this.update();
    }
    window.requestAnimationFrame(this.loop);
  };
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
  const BillTheFly = new Game(
    <HTMLCanvasElement>document.getElementById("canvas")
  );
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
