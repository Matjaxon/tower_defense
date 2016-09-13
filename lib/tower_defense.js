import MovingObject from './moving_object';


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);

  // 40 pixels for a "square"
  const squareSize = 40;
  const startGateCoords = [0, 9]
  const endGateCoords = [17, 0];

  let enemies = [];

  let circle = new createjs.Shape();
  circle.graphics.beginFill("red").drawCircle(0, 0, 40);
  circle.x = circle.y = 50;
  stage.addChild(circle);

  let startGate = new createjs.Shape();
  let startGatePos = [startGateCoords[0] * squareSize,
    startGateCoords[1] * squareSize];

  let startGateCenter = [startGatePos[0], startGatePos[1] + squareSize/2];
  startGate.graphics.beginFill("green").drawRect(startGatePos[0],
    startGatePos[1], 10, squareSize);
  stage.addChild(startGate);

  let endGate = new createjs.Shape();
  let endGatePos = [endGateCoords[0] * squareSize,
    endGateCoords[1] * squareSize];
  let endGateCenter = [endGatePos[0] + squareSize / 2, endGatePos[1]];
  endGate.graphics.beginFill("red").drawRect(endGatePos[0],
    endGatePos[1], squareSize, 10);
  stage.addChild(endGate);

  function spawnWaves(n) {
    let i = 0;
    let options = {
      x: startGateCenter[0],
      y: startGateCenter[1],
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
    }
    stage.update();
  }

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);
});
