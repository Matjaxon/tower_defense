let Shape = window.createjs.Shape;
import FieldCell from './field_cell';

const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Field extends Shape {
  constructor(stage) {
    super();
    this.pivotPoints = [];

    this.startGate = new Shape();
    let startGatePos = [startGateCoords[0] * squareSize,
      startGateCoords[1] * squareSize];
    this.startGate.center = [startGatePos[0], startGatePos[1] + squareSize/2];
    this.startGate.graphics.beginFill("green").drawRect(startGatePos[0],
      startGatePos[1], 10, squareSize);
    stage.addChild(this.startGate);

    this.endGate = new Shape();
    let endGatePos = [endGateCoords[0] * squareSize,
      endGateCoords[1] * squareSize];
    this.endGate.center = [endGatePos[0] + squareSize / 2, endGatePos[1]];
    this.endGate.graphics.beginFill("red").drawRect(endGatePos[0],
      endGatePos[1], squareSize, 10);
    stage.addChild(this.endGate);

    mapPivots.forEach(pivot => {
      let options = {};
      options.gridCoords = [pivot[0], pivot[1]];
      options.directionChange = pivot[2];
      let pivotPoint = new FieldCell(options);
      this.pivotPoints.push(pivotPoint);
      stage.addChild(pivotPoint);
    });

  }
}

let mapPivots = [[2, 9, "N"], [2, 1, "E"], [6, 1, "S"],
  [6, 4, "E"], [13, 4, "S"], [13, 9, "E"], [17, 9, "N"]];

let map =
  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 ];

export default Field;
