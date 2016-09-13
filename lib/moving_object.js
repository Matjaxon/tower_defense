let Shape = window.createjs.Shape;

class MovingObject extends Shape {
  constructor(options) {
    super(); //construct new moving object
    this.graphics.beginFill("red").drawCircle(0, 0, options.squareSize);
    this.x = options.startX;
    this.y = options.startY;
    createjs.Tween.get(this, {loop: false})
      .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
      .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
      .to({alpha: 0, y: 125}, 100)
      .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
      .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
  }


}

export default MovingObject;
