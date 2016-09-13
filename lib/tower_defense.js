import MovingObject from './moving_object';

(function() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const stage = new createjs.Stage(canvas);

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    // let windowWidth = window.innerWidth;
    // let windowHeight = window.innerHeight;
    console.log(`Canvas is ${canvas.width} x ${canvas.height}`);

    //map is 20 x 12

    let gridSize = Math.min(canvas.height / 12, canvas.width / 20);
    console.log(gridSize);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

  }

  resizeCanvas();

  function spawnWaves(n) {
    let i = 0;
    let options = {
      stage,
      startX: canvas.width * 0.3,
      startY: canvas.height * 0.3,
      squareSize: Math.min(canvas.height / 12, canvas.width / 20)
    };
    console.log("spawning");
    let enemy = new MovingObject(options);
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
})();
