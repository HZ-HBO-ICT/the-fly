/// <reference path="GameItem.ts" />

class Fly extends GameItem {
  private element: HTMLElement;
  private alive: boolean = true;
  private image: HTMLImageElement;

  /**
   * Function to create the GameItem
   * @param {string} - name
   * @param {number} - xPosition
   * @param {number} - yPosition
   */
  constructor(name: string) {
    super(name);
    this.image = this.loadNewImage(`./assets/images/${this.name}.png`);
    this.xPos = Math.floor(
      Math.random() * (window.innerWidth - this.image.width)
    );
    this.yPos = Math.floor(
      Math.random() * (window.innerHeight - this.image.height)
    );
  }

  //getters and setters
  public getImage(): HTMLImageElement {
    return this.image;
  }

  public setImage(imageString: string) {
    this.image = this.loadNewImage(imageString);
  }

  public setAlive(alive: boolean) {
    this.alive = alive;
  }

  /**
   * Function to draw the initial state of the fly
   * @param {HTMLElement} - container
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.xPos, this.yPos);
  }

  /**
   * Function to update the state of the fly
   */
  public update(): void {
    //function formerly known as render()
    //if fly is alive then update else show different image
    if (this.alive) {
      this.xPos = Math.floor(
        Math.random() * (window.innerWidth - this.image.width)
      );
      this.yPos = Math.floor(
        Math.random() * (window.innerHeight - this.image.height)
      );
    } else {
      this.image = this.loadNewImage(`./assets/images/splash.png`);
    }
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
}
