import React from 'react';

const TowerMenuReact = props => {
  return(
    <div className="button-bar">
      <div className="pause-button">Pause</div>
      <div className="tower-button" id="tower-1">Tower 1</div>
      <div className="tower-button" id="tower-2">Tower 2</div>
      <div className="tower-button" id="tower-3">Tower 3</div>
    </div>
  );
};

export default TowerMenuReact;
