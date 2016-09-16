import React from 'react';
import ReactDOM from 'react-dom';
import TowerMenuReact from './tower_menu_react';
import TopStats from './top_stats';
import LaunchScreen from './launch_screen';

const createjs = window.createjs;
import Enemy from './enemy';
import Field from './field';
import Game from './game';
import Util from './util';

const towerCosts = {
  rifle: 150,
  rapid_fire: 250
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = window.stage = new createjs.Stage(canvas);
  stage.enableMouseOver(20);

  const root = document.getElementById('root');
  const topStats = document.getElementById('top-stats');
  const launchScreen = document.getElementById('launch-screen');
  ReactDOM.render(<TowerMenuReact
    towerCosts={towerCosts}
    togglePause={togglePause}
    ticker={createjs.Ticker}/>, root);

  ReactDOM.render(<TopStats />, topStats);

  // 40 pixels for a "square"
  const squareSize = 40;
  const startGateCoords = [0, 9];
  const endGateCoords = [17, 0];

  let game = window.game = new Game(stage, togglePause);

  function togglePause() {
    let paused = !createjs.Ticker.getPaused();
    let pauseButton = document.getElementById("pause-button");
    pauseButton.innerHTML = (paused) ? "Unpause" : "Pause";
    createjs.Ticker.setPaused(paused);
  }

  function handleTick() {
    if(!createjs.Ticker.getPaused()) {
      game.move();
      tickSpawnTimer();
      checkGameOver();
    }
    stage.update();
  }

  function checkGameOver() {
    if(game.isGameOver()) {
      createjs.Ticker.setPaused(true);
      console.log("GAME OVER");
    }
  }

  function tickSpawnTimer() {
    const spawnTimer = document.getElementById("wave-timer");
    spawnTimer.innerHTML = parseInt(game.spawnTimer / 60);
  }

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);

  ReactDOM.render(<LaunchScreen game={game}/>, launchScreen);

  togglePause();
});
