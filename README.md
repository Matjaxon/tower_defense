# Tower Defense

A version of the classic real time strategy game.  Defend the exit point from ever growing swarms for enemies by constructing towers along their path.

![](/assets/game_screenshot.png)

## Design & Implementation
This app was predominately written with vanilla JavaScript.  ReactJS was also used for making interactive menus.  The game board is rendered on HTML5's `<canvas>` element.  Createjs was used to assist with rendering shapes on the `<canvas>`.

The game relies heavily on OOP principles.  For example, multiple tower types extend a core Tower class.  Unique properties for each tower are passed down to the base class upon creation.

```
//Rifle Tower
class RifleTower extends Tower {
  constructor(options) {
    options.attackRadius = 120;
    options.damage = 90;
    options.color = "#5465d6";
    options.attackTimer = 90;
    options.towerType = "rifle";
    options.towerCost = 150;
    options.refundValue = 90;
    super(options);
  }
}

// Rapid Fire Tower
class RapidFireTower extends Tower {
  constructor(options) {
    options.attackRadius = 60;
    options.damage = 15;
    options.color = "#ee4395";
    options.attackTimer = 10;
    options.towerType = "rapid fire";
    options.towerCost = 250;
    options.refundValue = 150;
    super(options);
  }
}

// Base Tower Class
class Tower extends Shape {
  constructor(options) {
    super();
    this.active = options.active || false;
    this.activeRadius = false;
    this.radiusShown = null;
    this.color = options.color;
    this.level = 1;

    this.coords = options.coords;
    this.game = options.game;

    this.towerType = options.towerType;
    this.attackRadius = options.attackRadius;
    this.damage = options.damage;
    this.attackTimer = options.attackTimer;
    this.towerCost = options.towerCost;
    this.upgradeCost = this.towerCost * 1.5;
    this.refundValue = options.refundValue;

    ...
  }
```

## Future Implementations
* Sprites for graphics
* Additional tower types with radiating attacks and debuffs
* Different enemy types
* Sound
* Player attacks such as bombardments
