const Shape = window.createjs.Shape;

class Projectile extends Shape {
  constructor(options) {
    super();
    this.enemy = options.enemy;
    this.damage = options.damage;
    this.tower = options.tower;
    this.game = options.game;
    this.x = this.tower.x;
    this.y = this.tower.y;
    this.trailLength = 1;
    this.velocity = 10;
    this.graphics.beginFill('red').drawCircle(0, 0, 5);
    this.game.stage.addChild(this);
  }

  move() {
    let attackRise = (this.enemy.y - this.y);
    let attackRun =  (this.enemy.x - this.x);
    let hyp = Math.sqrt(Math.pow(attackRise, 2) + Math.pow(attackRun, 2));
    let ratio = this.velocity / hyp;
    let xdist = attackRun * ratio;
    let ydist = attackRise * ratio;
    this.x += xdist;
    this.y += ydist;
    this.checkCollision();
  }

  checkCollision() {
    let dist = Math.sqrt(Math.pow(this.y - this.enemy.y, 2) +
      Math.pow(this.x - this.enemy.x, 2));
    if(dist < this.velocity) {
      this.game.stage.removeChild(this);
      this.enemy.health -= this.damage;
      this.removeBullet();
    }
  }

  removeBullet() {
    let bullets = this.game.bullets;
    let idxToRemove = bullets.indexOf(this);
    let newBullets = bullets.slice(0, idxToRemove)
      .concat(bullets.slice(idxToRemove + 1));
    this.game.bullets = newBullets;
  }
}

export default Projectile;
