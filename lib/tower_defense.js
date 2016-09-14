const createjs = window.createjs;
import Enemy from './enemy';
import Field from './field';
import Game from './game';
import Util from './util';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = window.stage = new createjs.Stage(canvas);
  stage.enableMouseOver(20);

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
      game.checkPivots(game.pivotSpaces, game.enemies);
      game.checkEndGateHit();
      game.towers.forEach(tower => tower.move());
    }
    stage.update();
  }

  createjs.Ticker.setFPS(80);
  createjs.Ticker.addEventListener("tick", handleTick);

  game.play();

  // Util.mouseOver(canvas);
});
