const Util = {
  mouseOver(canvas) {
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
  },
  findTargetSquare(event, squareSize) {
    let x = event.stageX;
    let y = event.stageY;
    x = Math.floor( x / squareSize);
    y = Math.floor( y / squareSize);
    return {x, y};
  },
  isSameSquare(square1, square2) {
    return square1.x === square2.x && square1.y === square2.y;
  }
};

export default Util;
