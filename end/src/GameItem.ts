class GameItem {
  protected name: string;
  protected xPos: number;
  protected yPos: number;

  /**
   * Constructor
   * @param name - name of the gameItem
   */
  constructor(name: string) {
    this.name = name;
    this.xPos = 0;
    this.yPos = 0;
  }

  //Getters and setters
  public getXPos(): number {
    return this.xPos;
  }

  public getYPos(): number {
    return this.yPos;
  }

  public setXPos(xPos:number){
    this.xPos = xPos;
  }

  public setYPos(yPos:number){
    this.yPos = yPos;
  }

}
