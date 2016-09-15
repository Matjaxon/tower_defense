let Shape = window.createjs.Shape;
import PivotSpace from './pivot_space';
import RifleTower from './rifle_tower';
import RapidFireTower from './rapid_fire_tower';
import Util from './util';

const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Field extends Shape {
  constructor(options) {
    super();
    let stage = options.stage;
    this.stage = stage;

    this.game = options.game;
    const game = this.game;

    this.pivotSpaces = [];
    this.creepPath = [];
    this.towerSpaces = [];
    this.activeSquare = {};

    this.towerOverlay = null;

    this.updateActiveSquare = this.updateActiveSquare.bind(this);
    this.setSelectedSpace = this.setSelectedSpace.bind(this);
    this.drawOverlayTower = this.drawOverlayTower.bind(this);
    this.placeTower = this.placeTower.bind(this);
    this.removeTowerOverlay = this.removeTowerOverlay.bind(this);
    this.hideOverlayTower = this.hideOverlayTower.bind(this);

    mapPivots.forEach(pivot =>   {
      let pivotOptions = {};
      pivotOptions.gridCoords = [pivot[0], pivot[1]];
      pivotOptions.directionChange = pivot[2];
      let pivotSpace = new PivotSpace(pivotOptions);
      this.pivotSpaces.push(pivotSpace);
      stage.addChild(pivotSpace);
    });

    creepPath.forEach( path => {
      let pathShape = new Shape();
      pathShape.x = path[1] * squareSize;
      pathShape.y = path[0] * squareSize;
      pathShape.graphics.beginFill("#ededed").drawRect(0, 0, 40, 40);
      this.creepPath.push(pathShape);
      stage.addChild(pathShape);
    });

    towerSpaces.forEach( tower => {
      let towerSpace = new Shape();
      towerSpace.x = tower[1] * squareSize;
      towerSpace.y = tower[0] * squareSize;
      towerSpace.graphics.beginFill("white").drawRect(0, 0, 40, 40);

      towerSpace.on("mouseover", (event) => {
        let prevActive = this.activeSquare;
        let targetSquare = Util.findTargetSquare(event, squareSize);
        event.target.alpha = 0.5;
        if(!Util.isSameSquare(prevActive, targetSquare)) {
          this.hideOverlayTower();
          this.updateActiveSquare(event);
          this.drawOverlayTower();
        }
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

  setSelectedSpace(event, game, towerSpace) {
    let x = event.stageX;
    let y = event.stageY;
    let prevSpace = game.selectedSpace.space;
    if (prevSpace) {
      prevSpace.graphics.beginFill("lightgreen").drawRect(0, 0, 40, 40);
      game.setSelectedSpace = {};
    }
    if (towerSpace !== prevSpace) {
      game.selectedSpace["x"] = Math.floor( x / squareSize);
      game.selectedSpace["y"] = Math.floor( y / squareSize);
      game.selectedSpace["space"] = towerSpace;
      towerSpace.graphics.beginFill("yellow").drawRect(0, 0, 40, 40);
    }
  }

  updateActiveSquare(event) {
    let x = event.stageX;
    let y = event.stageY;
    this.activeSquare["x"] = Math.floor(x / squareSize);
    this.activeSquare["y"] = Math.floor(y / squareSize);
  }

  drawOverlayTower() {
    if(this.game.towerOverlay) {
      let towerType = this.game.towerOverlay;
      let overlayOptions = {
        coords: [this.activeSquare.y, this.activeSquare.x],
        stage: this.stage,
        game: this.game
      };
      let overlayTower;
      if(towerType === 'rifle') {
        overlayTower = new RifleTower(overlayOptions);
      } else if(towerType === 'rapid_fire') {
        overlayTower = new RapidFireTower(overlayOptions);
      }
      this.towerOverlay = overlayTower;
      this.stage.addChild(overlayTower);
      overlayTower.showRadius(this.stage);
    }
  }

  hideOverlayTower() {
    if (this.towerOverlay) {
      this.stage.removeChild(this.towerOverlay.radiusShown);
      this.stage.removeChild(this.towerOverlay);
      this.towerOverlay = null;
    }
  }

  placeTower() {
    if(this.spaceIsOpen(this.activeSquare)) {
      let newTowerOptions = {
        active: true,
        coords: [this.activeSquare.y, this.activeSquare.x],
        stage: this.stage,
        game: this.game
      };
      let towerType = this.game.towerOverlay;
      let newTower;
      if(towerType === 'rifle') {
        newTower = new RifleTower(newTowerOptions);
      } else if (towerType === "rapid_fire") {
        newTower = new RapidFireTower(newTowerOptions);
      }
      if (this.game.gold >= newTower.towerCost) {
        this.game.updateGoldCount(-newTower.towerCost);
        this.game.towers.push(newTower);
        this.stage.addChild(newTower);
        this.removeTowerOverlay();
      } else {
        console.log("NOT ENOUGH GOLD");
      }
    }
  }

  spaceIsOpen(activeCoords) {
    // activesquare is an object while tower coords are an array [y, x]
    if (!activeCoords) {
      activeCoords = this.activeSquare;
    }
    let result = true;
    let towers = this.game.towers;
    towers.forEach(tower => {
      if(activeCoords.x === tower.coords[1] &&
        activeCoords.y === tower.coords[0]) {
          result = false;
        }
    });
    return result;
  }

  removeTowerOverlay() {
    this.hideOverlayTower();
    this.game.towerOverlay = null;
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
