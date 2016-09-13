let Shape = window.createjs.Shape;
import PivotSpace from './pivot_space';

const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Field extends Shape {
  constructor(stage) {
    super();
    this.pivotSpaces = [];
    this.creepPath = [];
    this.towerSpaces = [];
    this.activeSquare = {};

    this.updateActiveSquare = this.updateActiveSquare.bind(this);

    mapPivots.forEach(pivot =>   {
      let options = {};
      options.gridCoords = [pivot[0], pivot[1]];
      options.directionChange = pivot[2];
      let pivotSpace = new PivotSpace(options);
      this.pivotSpaces.push(pivotSpace);
      stage.addChild(pivotSpace);
    });

    creepPath.forEach( path => {
      let pathShape = new Shape();
      pathShape.x = path[1] * squareSize;
      pathShape.y = path[0] * squareSize;
      pathShape.graphics.beginFill("#e0ccb1").drawRect(0, 0, 40, 40);
      this.creepPath.push(pathShape);
      stage.addChild(pathShape);
    });

    towerSpaces.forEach( tower => {
      let towerSpace = new Shape();
      towerSpace.x = tower[1] * squareSize;
      towerSpace.y = tower[0] * squareSize;
      towerSpace.graphics.beginFill("lightgreen").drawRect(0, 0, 40, 40);
      towerSpace.on("mouseover", (event) => {
        event.target.alpha = 0.5;
        this.updateActiveSquare(event);
      });
      towerSpace.on("mouseout", (event) => {
        event.target.alpha = 1;
      });

      this.towerSpaces.push(towerSpace);
      stage.addChild(towerSpace);
    });

    this.startGate = new Shape();
    let startGatePos = [startGateCoords[0] * squareSize,
      startGateCoords[1] * squareSize];
    this.startGate.center = [startGatePos[0], startGatePos[1] + squareSize/2];
    this.startGate.graphics.beginFill("green").drawRect(startGatePos[0],
      startGatePos[1], 10, squareSize);
    stage.addChild(this.startGate);

    this.endGate = new Shape();
    this.endGate.pos = [endGateCoords[0] * squareSize,
      endGateCoords[1] * squareSize];
    this.endGate.center = [this.endGate.pos[0] + squareSize / 2,
      this.endGate.pos[1]];
    this.endGate.graphics.beginFill("red").drawRect(this.endGate.pos[0],
      this.endGate.pos[1], squareSize, 10);
    stage.addChild(this.endGate);
  }

  updateActiveSquare(event) {
    let x = event.stageX;
    let y = event.stageY;
    this.activeSquare["x"] = Math.floor(x / squareSize);
    this.activeSquare["y"] = Math.floor(y / squareSize);
    console.log(this.activeSquare);
  }
}

const map =
  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 2, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
   [0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 2, 1, 1],
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 ];

 // x, y coordinates NOT row, col
 const mapPivots = [[2, 9, "N"], [2, 1, "E"], [6, 1, "S"],
 [6, 4, "E"], [13, 4, "S"], [13, 9, "E"], [17, 9, "N"]];

 // row, col coordinates
 let creepPath = [];
 let towerSpaces = [];
 map.forEach( (row, rIdx) => {
   row.forEach( (space, cIdx) => {
     if (map[rIdx][cIdx] === 0) {
       creepPath.push([rIdx, cIdx]);
     } else if (map[rIdx][cIdx] === 1) {
       towerSpaces.push([rIdx, cIdx]);
     }
   });
 });

export default Field;
