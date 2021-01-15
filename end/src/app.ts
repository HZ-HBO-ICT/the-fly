class Game {
  private readonly canvas: HTMLCanvasElement; // find the right type
  private readonly ctx: CanvasRenderingContext2D; // find the right type
  private Geoffrey: Player;
  private flies: Fly[];
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
    
    //create some gameItems
    this.Geoffrey = new Player("Geoffrey");
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

    this.Geoffrey.draw();
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
   * @param {MouseEvent} - event
   */
  public eventHandler = (e: MouseEvent) => {
    //find the position of the mouse
    this.Geoffrey.setXPos(e.clientX);
    this.Geoffrey.setYPos(e.clientY);
    
    //check to see if the mouse collides with some flies.
    this.Geoffrey.collidesWithFlies(this.flies);
  };

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
