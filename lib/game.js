import Field from './field';
import Enemy from './enemy';

// 40 pixels for a "square"
const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Game {
  constructor(stage) {
    this.stage = stage;
    this.field = new Field(stage);
    this.health = 100;
    this.enemies = window.enemies = [];

    this.pivotSpaces = window.pivotSpaces = this.field.pivotSpaces;

    this.spawnWaves = this.spawnWaves.bind(this);
    this.inPivotRange = this.inPivotRange.bind(this);
    this.checkPivots = this.checkPivots.bind(this);
    this.checkEndGateHit = this.checkEndGateHit.bind(this);
  }

  isGameOver() {
    return this.health <= 0;
  }

  spawnWaves(n) {
    let i = 0;
    let options = {
      x: this.field.startGate.center[0],
      y: this.field.startGate.center[1],
      size: 10,
      color: "black",
      direction: "E",
      speed: 4
    };
    console.log("spawning");
    let enemy = new Enemy(options);
    this.enemies.push(enemy);
    this.stage.addChild(enemy);
    setTimeout( () => { i++; if (i < n) {this.spawnWaves(n - 1); } }, 2000);
  }

  checkPivots() {
    let pivotSpaces = this.pivotSpaces;
    let enemies = this.enemies;
    for (let i = 0; i < pivotSpaces.length; i++) {
      for (let j = 0; j < enemies.length; j++) {
        if (this.inPivotRange(pivotSpaces[i].center, enemies[j].center)) {
          enemies[j].direction = pivotSpaces[i].directionChange;
        }
      }
    }
  }

  checkEndGateHit() {
    const endPos = this.field.endGate.pos;
    let idxToRemove = [];
    this.enemies.forEach(enemy => {
      if(enemy.y === 0 && enemy.x >= endPos[0] &&
          enemy.x <= endPos[0] + squareSize) {
        this.health -= enemy.damage;
        this.stage.removeChild(enemy);
        console.log(`${this.health} health remaining!`);
        idxToRemove.push(this.enemies.indexOf(enemy));
      }
    });
    if (idxToRemove.length > 0) {
      let newEnemies = [];
      for (let i = idxToRemove.length - 1; i > -1; i--) {
        let idx = idxToRemove[i];
        newEnemies = newEnemies.concat(this.enemies.slice(0, idx)
          .concat(this.enemies.slice(idx + 1)));
      }
      this.enemies = newEnemies;
    }
  }

  inPivotRange(arr1, arr2) {
    return (Math.abs(arr1[0] - arr2[0]) <= 5 &&
      Math.abs(arr1[1] - arr2[1]) <= 5) ? true : false;
  }

  play() {
    this.spawnWaves(8);
  }
}

export default Game;
