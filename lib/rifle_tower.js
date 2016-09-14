import Tower from './tower';

class RifleTower extends Tower {
  constructor(options) {
    options.attackRadius = 120;
    options.damage = 90;
    options.color = "purple";
    options.attackTimer = 90;
    options.towerType = "rifle";
    super(options);
  }
}

export default RifleTower;
