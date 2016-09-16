const Shape = window.createjs.Shape;
const createjs = window.createjs;

const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Enemy extends Shape {
  constructor(options) {
    super();
    this.active = false;
    this.graphics.beginFill("orange").drawCircle(0, 0, options.size);
    this.x = options.x;
    this.y = options.y;
    this.center = [this.x, this.y];
    this.game = options.game;
    this.direction = options.direction;
    this.speed = options.speed;
    this.move = this.move.bind(this);
    this.damage = 10;
    this.health = 100;
    this.killReward = 10;
    this.steps = 2;
    this.totalDistance = this.steps * this.speed;
    this.moveDelayTimer = Math.ceil(options.moveDelay * 40) * this.speed * 3;

    this.removeEnemy = options.removeEnemy;

    this.move = this.move.bind(this);
    this.updateTotalDistance = this.updateTotalDistance.bind(this);
    this.checkActivation = this.checkActivation.bind(this);
    this.isDead = this.isDead.bind(this);
  }

  move() {
    if(!createjs.Ticker.getPaused()) {
      if(this.moveDelayTimer > 0) {
        this.moveDelayTimer -= 1;
      } else {
        this.checkActivation(this, this.game);
        switch(this.direction) {
          case "N":
            this.y = this.y - this.speed;
            break;
          case "S":
            this.y = this.y + this.speed;
            break;
          case "W":
            this.x = this.x - this.speed;
            break;
          case "E":
            this.x = this.x + this.speed;
            break;
        }
        this.center = [this.x, this.y];
        this.steps += 1;
        this.updateTotalDistance();
        if(this.isDead()) {
          this.game.updateGoldCount(this.killReward);
          this.removeEnemy(this);
        }
      }
    }
  }

  updateTotalDistance() {
    this.totalDistance = this.steps * this.speed;
  }

  isDead() {
    return this.health <= 0;
  }

  checkActivation(enemy, game) {
    if (!enemy.active) {
      enemy.active = true;
      let pendingEnemies = game.pendingEnemies;
      let pendingIdx = pendingEnemies.indexOf(enemy);
      game.pendingEnemies = pendingEnemies.slice(0, pendingIdx)
        .concat(pendingEnemies.slice(pendingIdx + 1));
      game.enemies.push(enemy);
    }
  }
}

export default Enemy;
