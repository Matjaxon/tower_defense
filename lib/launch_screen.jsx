import React from 'react';

const LaunchScreen = ({ game }) => {
  return(
    <div className="launch-screen">
      <div>
        <div className="game-title">Tower Defense</div>
        <div className="directions-container">
          <ul className="directions">
            <li>Enemies attack in waves trying to reach the end gate.</li>
            <li>Add more towers to push back enemies.</li>
            <li>Upgrade existing towers to fortify your best locations.</li>
          </ul>
        </div>
        <div className="play-button" onClick={game.play}>
          Play
        </div>
      </div>
    </div>
  );
};

export default LaunchScreen;
