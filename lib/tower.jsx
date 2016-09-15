const Shape = window.createjs.Shape;
import TowerOptions from './tower_options';
import React from 'react';
import ReactDOM from 'react-dom';

// 40 pixels for a "square"
const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Tower extends Shape {
  constructor(options) {
    super();
    this.active = options.active || false;
    this.activeRadius = false;
    this.radiusShown = null;
    this.graphics.beginFill(options.color).drawCircle(0, 0, squareSize/2);
    this.coords = options.coords;
    this.game = options.game;

    this.towerType = options.towerType;
    this.attackRadius = options.attackRadius;
    this.damage = options.damage;
    this.attackTimer = options.attackTimer;
    this.towerCost = options.towerCost;
    this.refundValue = options.refundValue;

    this.remainingAttackTimer = 0;
    this.attackTarget = null;

    this.x = this.coords[1] * squareSize + squareSize/2;
    this.y = this.coords[0] * squareSize + squareSize/2;

    this.assignClickHandler = this.assignClickHandler.bind(this);
    this.toggleRadius = this.toggleRadius.bind(this);
    this.showRadius = this.showRadius.bind(this);
    this.destroyTower = this.destroyTower.bind(this);
    this.hideTowerMenu = this.hideTowerMenu.bind(this);

    const game = options.game;
    this.assignClickHandler(game);
  }

  assignClickHandler(game) {
    let towerOptions = document.getElementById("tower-options");
    this.on("click", (event) => {
      if(!game.towerOverlay) {
        if (game.activeTower) {
          game.activeTower.toggleRadius(game.stage);
          if(game.activeTower === this) {
            this.hideTowerMenu();
            game.activeTower = null;
          } else {
            this.toggleRadius(game.stage);
            game.activeTower = this;
            let towerMenu = document.getElementById("tower-options");
            towerMenu.style.display = "flex";
            ReactDOM.render(<TowerOptions game={this.game} tower={this} />, towerOptions);
          }
        } else {
          this.toggleRadius(game.stage);
          game.activeTower = this;
          let towerMenu = document.getElementById("tower-options");
          if (towerMenu) towerMenu.style.display = "flex";
          ReactDOM.render(<TowerOptions game={this.game} tower={this} />, towerOptions);
        }
      } else {
        if(game.field.towerOverlay === this) {
          game.field.placeTower();
        } else {
          game.field.removeTowerOverlay();
        }
      }
    });
  }

  toggleRadius() {
    this.activeRadius = !this.activeRadius;
    if(this.activeRadius) {
      this.showRadius(this.game.stage);
      let towerOptions = new TowerOptions({tower: this, game: this.game});
    } else {
      this.game.stage.removeChild(this.radiusShown);
      this.radiusShown = null;
      }
    }

  showRadius(stage) {
    let radius = new Shape();
    radius.x = this.x;
    radius.y = this.y;
    radius.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)")
      .drawCircle(0, 0, this.attackRadius);
    stage.addChild(radius);
    this.radiusShown = radius;
  }

  // equivalent of enemy stepping.
  move() {
    if(this.active) {
      this.updateTarget();
      if(this.remainingAttackTimer > 0) this.remainingAttackTimer -= 1;
      this.checkFire();
    }
  }

  updateTarget() {
    this.attackTarget = null;
    let enemies = this.game.enemies;
    enemies.forEach(enemy => {
      let tar = this.attackTarget;
      let tarTotalDistance = (tar) ? tar.totalDistance : 0;
      if(this.inRange(enemy) &&
        (!this.attackTarget || enemy.totalDistance > tarTotalDistance)) {
          this.attackTarget = enemy;
        }
    });
  }

  checkFire() {
    if(this.remainingAttackTimer === 0 && this.attackTarget) {
      console.log(`${this.towerType} FIRE!`);
      this.fire();
      this.remainingAttackTimer = this.attackTimer;
    }
  }

  inRange(enemy) {
    let range = this.attackRadius;
    return (Math.pow((this.x - enemy.x), 2) +
      Math.pow((this.y - enemy.y), 2) <= Math.pow(range, 2));
  }

  fire() {
    this.attackTarget.health -= this.damage;
  }

  destroyTower() {
    this.game.activeTower = null;
    this.toggleRadius();
    this.hideTowerMenu();
    this.game.stage.removeChild(this);
    let gameTowers = this.game.towers;
    let idxToRemove = gameTowers.indexOf(this);
    let newTowers = gameTowers.slice(0, idxToRemove)
      .concat(gameTowers.slice(idxToRemove + 1));
    this.game.towers = newTowers;
    this.game.updateGoldCount(this.refundValue);
  }

  hideTowerMenu() {
    let towerMenu = document.getElementById("tower-options");
    towerMenu.style.display = "none";
  }

}

export default Tower;
