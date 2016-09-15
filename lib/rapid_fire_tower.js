import Tower from './tower';

class RapidFireTower extends Tower {
  constructor(options) {
    options.attackRadius = 60;
    options.damage = 25;
    options.color = "#ee4395";
    options.attackTimer = 30;
    options.towerType = "rapid fire";
    options.towerCost = 250;
    options.refundValue = 150;
    super(options);
  }
}

export default RapidFireTower;
