var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var requestId;


var setupFrog = function(){
  var frog = new Image();
  frog.src = "images/frog.png";

  var x = 178;
  var y = 536;

  var keyW = false;
  var keyA = false;
  var keyS = false;
  var keyD = false;

  function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        keyD = true;
        break;
      case 83: //s
        keyS = true;
        break;
      case 65: //a
        keyA = true;
        break;
      case 87: //w
        keyW = true;
        break;
    }
  }

  function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
      case 68: //d
        keyD = false;
        break;
      case 83: //s
        keyS = false;
        break;
      case 65: //a
        keyA = false;
        break;
      case 87: //w
        keyW = false;
        break;
    }
  }

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  var drawFrog = function(){
    ctx.clearRect(0, 0, 420, 600);
    if (keyD === true) {
      x++;
    }
    if (keyS === true) {
      y++;
    }
    if (keyA === true) {
      x--;
    }
    if (keyW === true) {
      y--;
    }
    ctx.drawImage(frog, x, y, 64, 64);
    requestId = window.requestAnimationFrame(drawFrog);
  };
  drawFrog();
};
setupFrog();
