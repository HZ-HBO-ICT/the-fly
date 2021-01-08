/// <reference path="GameItem.ts" />

class Player extends GameItem {
  /**
   * Function to create the Player
   * @param {string} - name
   */
  constructor(name: string) {
    super(name);
    //add click handler
  }

  public draw() {
    //console.log("draw");
  }

  public collidesWithFlies(flies: Fly[]) {
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
        console.log('Smashed', flyIndex);

        fly.smashed();
      }
    });
    return flyIndex;
  }
}
