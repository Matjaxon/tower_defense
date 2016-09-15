import React from 'react';
import ReactDOM from 'react-dom';
import TowerMenuReact from './tower_menu_react';
import TopStats from './top_stats';

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
  ReactDOM.render(<TowerMenuReact towerCosts={towerCosts} />, root);
  ReactDOM.render(<TopStats />, topStats);

  // 40 pixels for a "square"
  const squareSize = 40;
  const startGateCoords = [0, 9];
  const endGateCoords = [17, 0];

  const game = window.game = new Game(stage);

  const pauseBtn = document.getElementById("pauseBtn");

  pauseBtn.addEventListener("click", () => togglePause());

  function togglePause() {
    let paused = !createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(paused);
    pauseBtn.value = paused ? "unpause" : "pause";
  }

  function handleTick() {
    if(!createjs.Ticker.getPaused()) {

      game.enemies.forEach(enemy => enemy.move());
      game.pendingEnemies.forEach(pendingEnemy => pendingEnemy.move());
      game.move();
      game.checkPivots(game.pivotSpaces, game.enemies);
      game.checkEndGateHit();
      game.towers.forEach(tower => tower.move());
      tickSpawnTimer();
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

  game.play();


  // Util.mouseOver(canvas);
});
