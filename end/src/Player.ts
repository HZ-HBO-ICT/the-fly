/// <reference path="GameItem.ts" />

class Player extends GameItem {
  /**
   * Constructor to create the Player
   * @param {string} - name
   */
  constructor(name: string) {
    super(name);
  }

  public draw(): void {
    //console.log("draw");
  }

  /**
   * Function to determine if the fly collides with the player (mouse coordinates)
   * @param flies - all the flies on the canvas
   */
  public collidesWithFlies(flies: Fly[]): number {
    let flyIndex: number = undefined;
    flies.forEach((fly, index) => {
      console.log(`MouseX: ${this.xPos}, FlyX: ${fly.getXPos()}`);
      console.log(`MouseY: ${this.yPos}, FlyY: ${fly.getYPos()}`);

      if (
        this.xPos >= fly.getXPos() &&
        this.xPos <= fly.getXPos() + fly.getImage().width &&
        this.yPos >= fly.getYPos() &&
        this.yPos <= fly.getYPos() + fly.getImage().height
      ) {
        flyIndex = index;
        console.log("Smashed", flyIndex);

        fly.smashed();
      }
    });
    return flyIndex;
  }
}
