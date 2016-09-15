import React from 'react';

const TopStats = props => {
  return(
    <div className="game-stats">
      <div className="wave-counter">
        <div className="stats-label">Wave:</div>
        <div id="wave-count"></div>
      </div>
      <div className="wave-timer-container">
        <div className="stats-label">Next Wave In:</div>
        <div id="wave-timer"></div>
      </div>
      <div className="health-container">
        <div className="stats-label">Health:</div>
        <div id="health"></div>
      </div>
      <div className="gold-container">
        <div className="stats-label">Gold:</div>
        <div id="gold"></div>
      </div>
    </div>
  );
};

export default TopStats;
