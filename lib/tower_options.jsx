import React from 'react';

const TowerOptions = ({ game, tower, clickEvent }) => {

  function upgradeTower(event) {
    event.preventDefault();
    if (game.gold > tower.upgradeCost) {
      tower.upgradeTower();
    }
  }

  function destroyTower(event) {
    event.preventDefault();
    tower.destroyTower();
  }

  let optionsPos = {
    top: (tower.y + 5) + "px",
    left: (tower.x + 25) + "px",
    display: "flex"
  };

  let upgradeButton;
  if (tower.level < 3) {
    upgradeButton = (
      <button className="options-button" onClick={upgradeTower}>
        {`Upgrade Tower - ${tower.upgradeCost}`}
      </button>
    );
  } else {
    upgradeButton = (
      <button className="options-button maxed-button">
        MAXED
      </button>
    );
  }

  return(
    <div style={optionsPos} id="tower-options" className="tower-options">
      { upgradeButton }
      <button className="options-button destroy-button"
        onClick={destroyTower}>
          Destroy Tower
      </button>
    </div>
  );
};

export default TowerOptions;
