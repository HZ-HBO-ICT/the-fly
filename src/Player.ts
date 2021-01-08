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
    console.log("draw");
  }

  public collidesWithFlies(flies: Fly[]) {
    //let collides = false;
    console.log('ClickerdeClick')
    let flyIndex: number = undefined;
    flies.forEach((fly, index) => {
      console.log(`Mouse: ${this.xPos}, Fly: ${fly.getXPos()}`);
      // console.log(`Mouse: ${this.yPos}, Fly: ${fly.getYPos()}`);

      if (
        this.xPos >= fly.getXPos() &&
        this.xPos <= fly.getXPos() + fly.getImage().width &&
        this.yPos >= fly.getYPos() &&
        this.yPos <= fly.getYPos() + fly.getImage().height
      ) {
        flyIndex = index;
        console.log('Smashed', flyIndex);
        // //collides = true;
        // console.error('clicked on Fly');
        // //fly out the array
        // fly.setImage(`./assets/images/splash.png`);
      }
    });
    return flyIndex;
  }
}
