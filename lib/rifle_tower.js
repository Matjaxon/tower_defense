import Tower from './tower';

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

export default RifleTower;
