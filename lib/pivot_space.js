let Shape = window.createjs.Shape;

// 40 pixels for a "square"
const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class PivotSpace extends Shape {
  constructor(options) {
    super();
    let gridCoords = options.gridCoords;
    console.log(gridCoords);
    this.x = gridCoords[0] * squareSize;
    this.y = gridCoords[1] * squareSize;
    this.xCenter = this.x + squareSize/2;
    this.yCenter = this.y + squareSize/2;
    this.center = [this.xCenter, this.yCenter];
    this.size = squareSize;
    this.color = "blue";
    this.directionChange = options.directionChange;
    this.graphics.beginFill(this.color)
      .drawRect(0, 0, 40, 40);
  }
}

export default PivotSpace;
