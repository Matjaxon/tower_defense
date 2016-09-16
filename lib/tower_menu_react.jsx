import React from 'react';

const TowerMenuReact = ({ towerCosts, togglePause, ticker })  => {
  return(
    <div className="button-bar">
      <div className="pause-button"
        id="pause-button"
        onClick={togglePause}>
        Pause
      </div>
      <div className="tower-button" id="tower-1">
        Rifle Tower
        <div>{towerCosts.rifle} Gold</div>
      </div>
      <div className="tower-button" id="tower-2">
        Rapid Fire Tower
        <div>{towerCosts.rapid_fire} Gold</div>
      </div>
    </div>
  );
};

export default TowerMenuReact;
