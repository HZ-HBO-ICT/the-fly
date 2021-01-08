class Game {
  private readonly canvas: HTMLCanvasElement; // find the right type
  private readonly ctx: CanvasRenderingContext2D; // find the right type
  private _Geoffrey: Player;
  private flies: Fly[];
  private counter: number;
  private _fps: number = 0.1;
  private _pause: boolean = false;

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
    
    // Set the context of the canvas
    //create some gameItems
    this._Geoffrey = new Player("Geoffrey");
    for (let i = 0; i < 5; i++) {
      this.flies.push(new Fly("fly"));
    }
    //draw is initial state
    this.loop();
  }

  /**
   * Function to draw the initial state of al living objects
   */
  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);   

    this.flies.forEach((fly, index) => {
      fly.draw(this.ctx);
    });

    this._Geoffrey.draw();
  }

  /**
   * Function to update the state of all living objects
   */
  public update(): void {
    //function formerly known as render()
    this.flies.forEach(function (fly, index) {
      fly.update();
    });
  }

  /**
   * Function to handle the keyboard event
   * @param {KeyboardEvent} - event
   */
  public eventHandler = (e: MouseEvent) => {
    //stop loop
    this._Geoffrey.setXPos(e.clientX);
    this._Geoffrey.setYPos(e.clientY);
    //console.log(this.xPos);
    this._Geoffrey.collidesWithFlies(this.flies);
    console.log('click');
  };

  /**
   * Function to keep on updating the playing field.
   */
  public loop = (): void => {
    this.counter++;
    this.draw();
    if (this.counter % 120 == 0) {
      this.update();      
      // let smashedFlyIndex: number = this._Geoffrey.collidesWithFlies(
      //   this.flies
      // );

      // if (smashedFlyIndex != undefined) {
      //   console.log(smashedFlyIndex);
      //   this.flies = this.flies.splice(smashedFlyIndex, 1);
      //   this.smashedFlies.push(this.flies[smashedFlyIndex]);
      // }
      
    }
    //use the set timeout to control the FPS.
    // setTimeout(() => {
    //   if (this._pause) return;
    // window.requestAnimationFrame(this.loop);
    // }, 1000 / this._fps);
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
