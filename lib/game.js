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
  constructor(stage, togglePause) {

    this.stage = stage;
    this.field = new Field({
      stage,
      game: this
    });

    let menuOptions = {
      stage,
      game: this
    };
    this.menu = new TowerMenu(menuOptions);
    this.towerOverlay = null;

    this.enemies = window.enemies = [];
    this.pendingEnemies = window.pendingEnemies = [];
    this.bullets = [];

    this.towers = window.towers = [];
    this.activeTower = null;
    this.selectedSpace = {};
    this.health = 100;
    this.gold = 400;
    this.spawnTimer = 1200;
    this.waveCount = 0;
    this.enemyCount = 6;

    this.pivotSpaces = window.pivotSpaces = this.field.pivotSpaces;

    // Other setup methods
    this.updateGoldCount(0);
    this.updateHealth(0);
    this.togglePause = togglePause;

    // Permanent binding
    this.spawnWave = this.spawnWave.bind(this);
    this.inPivotRange = this.inPivotRange.bind(this);
    this.checkPivots = this.checkPivots.bind(this);
    this.checkEndGateHit = this.checkEndGateHit.bind(this);
    this.compareEnemies = this.compareEnemies.bind(this);
    this.sortEnemies = this.sortEnemies.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
    this.updateGoldCount = this.updateGoldCount.bind(this);
    this.updateWaveCount = this.updateWaveCount.bind(this);
    this.buildStartingTowers = this.buildStartingTowers.bind(this);
    this.needSpawn = this.needSpawn.bind(this);
    this.move = this.move.bind(this);
    this.spawnWave = this.spawnWave.bind(this);
    this.updateHealth = this.updateHealth.bind(this);
    this.play = this.play.bind(this);
  }

  isGameOver() {
    return this.health <= 0;
  }

  move() {
    this.spawnTimer -= 1;
    this.enemies.forEach(enemy => enemy.move());
    this.pendingEnemies.forEach(pendingEnemy => pendingEnemy.move());
    this.checkPivots(this.pivotSpaces, this.enemies);
    this.checkEndGateHit();
    this.towers.forEach(tower => tower.move());
    this.bullets.forEach(bullet => bullet.move());

    if(this.needSpawn()) {
      this.spawnWave(8);
    }
  }

  needSpawn() {
    return this.spawnTimer <= 0 || (this.pendingEnemies.length < 1 &&
      this.enemies.length < 1);
  }

  spawnWave() {
    this.spawnEnemies(Math.floor(this.enemyCount)); // every 2 waves 1 more enemy spawns
    this.updateWaveCount();
    this.spawnTimer = 1200;
    this.enemyCount += 0.5;
  }

  spawnEnemies(n) {
    let options = {
      x: this.field.startGate.center[0] - 80,
      y: this.field.startGate.center[1],
      size: 10,
      color: "black",
      direction: "E",
      speed: 3,
      game: this,
      removeEnemy: this.removeEnemy,
      moveDelay: Math.random(0.3, 1)
    };
    let enemy = new Enemy(options);
    this.pendingEnemies.push(enemy);
    this.stage.addChild(enemy);
    if(n > 0) this.spawnEnemies(n - 1);
  }

  checkEndGateHit() {
    const endPos = this.field.endGate.pos;
    this.enemies.forEach(enemy => {
      if(enemy.y <= 0 && enemy.x >= endPos[0] &&
          enemy.x <= endPos[0] + squareSize) {
        this.updateHealth(enemy.damage);
        this.removeEnemy(enemy);
      }
    });
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

  inPivotRange(arr1, arr2) {
    return (Math.abs(arr1[0] - arr2[0]) <= 5 &&
      Math.abs(arr1[1] - arr2[1]) <= 5) ? true : false;
  }

  play() {
    let launchScreen = document.getElementById("launch-screen");
    launchScreen.style.display = "none";
    this.togglePause();
    this.buildStartingTowers();
    this.spawnWave(8);
  }

  buildStartingTowers() {
    let towerOptions1 = {coords: [3, 4], stage: this.stage,
      game:this, active: true};
    let towerOptions2 = {coords: [5, 12], stage: this.stage,
      game:this, active: true};
    let tower1 = new RifleTower(towerOptions1);
    let tower2 = new RapidFireTower(towerOptions2);
    this.towers.push(tower1);
    this.towers.push(tower2);
    this.stage.addChild(tower1);
    this.stage.addChild(tower2);
  }

  sortEnemies() {
    this.enemies = this.enemies.sort(this.compareEnemies);
  }

  compareEnemies(a, b) {
    if(a.totalDistance > b.totalDistance) {
      return 1;
    } else {
      return -1;
    }
  }

  removeEnemy(enemy) {
    this.stage.removeChild(enemy);
    let idxToRemove = this.enemies.indexOf(enemy);
    let newEnemies = this.enemies.slice(0, idxToRemove)
      .concat(this.enemies.slice(idxToRemove + 1));
    this.enemies = newEnemies;
  }

  updateGoldCount(gold) {
    this.gold += gold;
    let goldCounter = document.getElementById("gold");
    goldCounter.innerHTML = this.gold;
  }

  updateWaveCount() {
    this.waveCount += 1;
    let waveCounter = document.getElementById("wave-count");
    waveCounter.innerHTML = this.waveCount;
  }

  updateHealth(damage) {
    this.health -= damage;
    let healthCounter = document.getElementById("health");
    healthCounter.innerHTML = this.health;
  }
}

export default Game;
