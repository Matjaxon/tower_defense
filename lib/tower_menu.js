const Shape = window.createjs.Shape;

class TowerMenu extends Shape {
  constructor(options) {
    super();
    this.stage = options.stage;
    this.x = 800;
    this.y = 0;
    this.graphics.beginFill("white").drawRect(0, 0, 200, 480);
    this.stage.addChild(this);
    console.log("MENU BUILT");
    this.makeRifleButton();

  }

  makeRifleButton() {
    let rifleButton = new Shape();
    rifleButton.x = 830;
    rifleButton.y = 30;
    rifleButton.graphics.beginFill("gray").drawRect(0, 0, 140, 80);
    this.stage.addChild(rifleButton);
  }

}

export default TowerMenu;
