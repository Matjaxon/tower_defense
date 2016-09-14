const Shape = window.createjs.Shape;
const createjs = window.createjs;

const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Enemy extends Shape {
  constructor(options) {
    super();
    this.graphics.beginFill("orange").drawCircle(0, 0, options.size);
    this.x = options.x;
    this.y = options.y;
    this.center = [this.x, this.y];
    this.game = options.game;
    this.direction = options.direction;
    this.speed = options.speed;
    this.move = this.move.bind(this);
    this.damage = 10;
    this.health = 120;
    this.steps = 1;
    this.totalDistance = this.steps * this.speed;
    this.removeEnemy = options.removeEnemy;

    this.move = this.move.bind(this);
    this.updateTotalDistance = this.updateTotalDistance.bind(this);
  }

  move() {
    if(!createjs.Ticker.getPaused()) {
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
        this.game.removeEnemy(this);
      }
    }
  }

  updateTotalDistance() {
    this.totalDistance = this.step * this.speed;
  }

  isDead() {
    return this.health <= 0;
  }
}

export default Enemy;
