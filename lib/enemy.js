let Shape = window.createjs.Shape;

const squareSize = 40;
const startGateCoords = [0, 9];
const endGateCoords = [17, 0];

class Enemy extends Shape {
  constructor(options) {
    super(); //construct new moving object
    this.graphics.beginFill("orange").drawCircle(0, 0, options.size);
    this.x = options.x;
    this.y = options.y;
    this.direction = options.direction;
    this.speed = options.speed;
    this.move = this.move.bind(this);
    this.center = [this.x, this.y];
    this.damage = 10;
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
    }
    this.center = [this.x, this.y];
  }
}

export default Enemy;
