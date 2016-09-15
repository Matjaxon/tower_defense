import React from 'react';

const TowerOptions = ({ game, tower, clickEvent }) => {

  function upgradeTower(event) {
    event.preventDefault();
    console.log(`Upgrading tower ${tower.id}`);
  }

  function destroyTower(event) {
    event.preventDefault();
    console.log("Destroying Tower");
    tower.destroyTower();
  }

  let optionsPos = {
    top: (tower.y + 5) + "px",
    left: (tower.x + 25) + "px",
    display: "flex"
  };

  let upgradeButton = (
    <button className="options-button" onClick={upgradeTower}>
      Upgrade Tower
    </button>
  );

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
