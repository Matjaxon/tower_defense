/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _moving_object = __webpack_require__(1);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  var stage = new createjs.Stage(canvas);
	
	  window.addEventListener('resize', resizeCanvas, false);
	
	  function resizeCanvas() {
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	
	    // let windowWidth = window.innerWidth;
	    // let windowHeight = window.innerHeight;
	    console.log('Canvas is ' + canvas.width + ' x ' + canvas.height);
	
	    //map is 20 x 12
	
	    var gridSize = Math.min(canvas.height / 12, canvas.width / 20);
	    console.log(gridSize);
	
	    createjs.Ticker.setFPS(60);
	    createjs.Ticker.addEventListener("tick", stage);
	  }
	
	  resizeCanvas();
	
	  function spawnWaves(n) {
	    var i = 0;
	    var options = {
	      stage: stage,
	      startX: canvas.width * 0.3,
	      startY: canvas.height * 0.3,
	      squareSize: Math.min(canvas.height / 12, canvas.width / 20)
	    };
	    console.log("spawning");
	    var enemy = new _moving_object2.default(options);
	    stage.addChild(enemy);
	    setTimeout(function () {
	      i++;if (i < n) {
	        spawnWaves(n - 1);
	      }
	    }, 2000);
	  }
	  spawnWaves(8);
	
	  var pauseBtn = document.getElementById("pauseBtn");
	  pauseBtn.addEventListener("click", function () {
	    return togglePause();
	  });
	
	  function togglePause() {
	    var paused = !createjs.Ticker.getPaused();
	    createjs.Ticker.setPaused(paused);
	    pauseBtn.value = paused ? "unpause" : "pause";
	  }
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Shape = window.createjs.Shape;
	
	var MovingObject = function (_Shape) {
	  _inherits(MovingObject, _Shape);
	
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    //construct new moving object
	    var _this = _possibleConstructorReturn(this, (MovingObject.__proto__ || Object.getPrototypeOf(MovingObject)).call(this));
	
	    _this.graphics.beginFill("red").drawCircle(0, 0, options.squareSize);
	    _this.x = options.startX;
	    _this.y = options.startY;
	    createjs.Tween.get(_this, { loop: false }).to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4)).to({ alpha: 0, y: 75 }, 500, createjs.Ease.getPowInOut(2)).to({ alpha: 0, y: 125 }, 100).to({ alpha: 1, y: 100 }, 500, createjs.Ease.getPowInOut(2)).to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
	    return _this;
	  }
	
	  return MovingObject;
	}(Shape);
	
	exports.default = MovingObject;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map