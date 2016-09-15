import React from 'react';

const TowerMenuReact = ({ towerCosts })  => {
  return(
    <div className="button-bar">
      <div className="pause-button">Pause</div>
      <div className="tower-button" id="tower-1">
        Rifle Tower
        <div>{towerCosts.rifle} Gold</div>
      </div>
      <div className="tower-button" id="tower-2">
        Rapid Fire Tower
        <div>{towerCosts.rapid_fire} Gold</div>
      </div>
      <div className="tower-button" id="tower-3">
        Tower 3
      </div>
    </div>
  );
};

export default TowerMenuReact;
