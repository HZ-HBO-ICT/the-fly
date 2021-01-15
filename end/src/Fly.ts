/// <reference path="GameItem.ts" />

class Fly extends GameItem {
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

  /**
   * Function to turn fly into smashed fly
   */
  public smashed(): void {
    this.alive = false;
    this.setImage(`./assets/images/splash.png`);
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
    if (this.alive) {
      this.xPos = Math.floor(
        Math.random() * (window.innerWidth - this.image.width)
      );
      this.yPos = Math.floor(
        Math.random() * (window.innerHeight - this.image.height)
      );
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
