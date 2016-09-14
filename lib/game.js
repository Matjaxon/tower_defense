import Field from './field';
import Enemy from './enemy';
import Tower from './tower';
import RifleTower from './rifle_tower';
import RapidFireTower from './rapid_fire_tower';
import TowerMenu from './tower_menu';

// 40 pixels for a "square"
const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Game {
  constructor(stage) {

    this.stage = stage;
    this.field = new Field({
      stage,
      game: this
    });

    let menuOptions = {stage};
    this.menu = new TowerMenu(menuOptions);

    this.enemies = window.enemies = [];
    this.towers = window.towers = [];
    this.activeTower = null;
    this.selectedSpace = {};
    this.health = 100;

    this.pivotSpaces = window.pivotSpaces = this.field.pivotSpaces;

    this.spawnWaves = this.spawnWaves.bind(this);
    this.inPivotRange = this.inPivotRange.bind(this);
    this.checkPivots = this.checkPivots.bind(this);
    this.checkEndGateHit = this.checkEndGateHit.bind(this);
    this.compareEnemies = this.compareEnemies.bind(this);
    this.sortEnemies = this.sortEnemies.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
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
      speed: 4,
      game: this
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
    this.enemies.forEach(enemy => {
      if(enemy.y === 0 && enemy.x >= endPos[0] &&
          enemy.x <= endPos[0] + squareSize) {
        this.health -= enemy.damage;
        console.log(`${this.health} health remaining!`);
        this.removeEnemy(enemy);
      }
    });
  }

  inPivotRange(arr1, arr2) {
    return (Math.abs(arr1[0] - arr2[0]) <= 5 &&
      Math.abs(arr1[1] - arr2[1]) <= 5) ? true : false;
  }

  play() {
    this.spawnWaves(8);
    let towerOptions1 = {coords: [3, 4], stage: this.stage,
      game:this};
    let towerOptions2 = {coords: [5, 12], stage: this.stage,
      game:this};
    let tower1 = new RifleTower(towerOptions1);
    let tower2 = new RapidFireTower(towerOptions2);
    this.towers.push(tower1);
    this.towers.push(tower2);
    this.stage.addChild(tower1);
    this.stage.addChild(tower2);
  }

  compareEnemies(a, b) {
    if(a.totalDistance > b.totalDistance) {
      return 1;
    } else {
      return -1;
    }
  }

  sortEnemies() {
    this.enemies = this.enemies.sort(this.compareEnemies);
  }

  removeEnemy(enemy) {
    this.stage.removeChild(enemy);
    let idxToRemove = this.enemies.indexOf(enemy);
    let newEnemies = this.enemies.slice(0, idxToRemove)
      .concat(this.enemies.slice(idxToRemove + 1));
    this.enemies = newEnemies;
  }
}

export default Game;
