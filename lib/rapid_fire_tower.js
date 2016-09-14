import Tower from './tower';

class RapidFireTower extends Tower {
  constructor(options) {
    options.attackRadius = 60;
    options.damage = 20;
    options.color = "red";
    options.attackTimer = 30;
    options.towerType = "rapid fire";
    super(options);
  }
}

export default RapidFireTower;
