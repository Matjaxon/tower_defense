const createjs = window.createjs;
import MovingObject from './moving_object';
import Field from './field';

function inPivotRange(arr1, arr2) {
  return (Math.abs(arr1[0] - arr2[0]) <= 5 &&
    Math.abs(arr1[1] - arr2[1]) <= 5) ? true : false;
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = window.stage = new createjs.Stage(canvas);

  // 40 pixels for a "square"
  const squareSize = 40;
  const startGateCoords = [0, 9];
  const endGateCoords = [17, 0];

  let enemies = window.enemies = [];

  let field = new Field(stage);
  let pivotPoints = window.pivotPoints = field.pivotPoints;

  function spawnWaves(n) {
    let i = 0;
    let options = {
      x: field.startGate.center[0],
      y: field.startGate.center[1],
      size: 10,
      color: "black",
      direction: "E",
      speed: 1
    };
    console.log("spawning");
    let enemy = new MovingObject(options);
    enemies.push(enemy);
    stage.addChild(enemy);
    setTimeout( () => { i++; if (i < n) {spawnWaves(n - 1); } }, 2000);
  }
  spawnWaves(8);

  const pauseBtn = document.getElementById("pauseBtn");
  pauseBtn.addEventListener("click", () => togglePause());

  function togglePause() {
    let paused = !createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(paused);
    pauseBtn.value = paused ? "unpause" : "pause";
  }

  function handleTick() {
    if(!createjs.Ticker.getPaused()) {
      enemies.forEach(enemy => enemy.move());
      checkPivots(pivotPoints, enemies);
      console.log(enemies[0].x);
    }
    stage.update();
  }

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);

  function checkPivots(pivotPoints, enemies) {
    for (let i = 0; i < pivotPoints.length; i++) {
      for (let j = 0; j < enemies.length; j++) {
        if (inPivotRange(pivotPoints[i].center, enemies[j].center)) {
          enemies[j].direction = pivotPoints[i].directionChange;
        }
      }
    }
  }

  function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
  }
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  var context = canvas.getContext('2d');

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    writeMessage(canvas, message);
  }, false);
});
