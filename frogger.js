var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var requestId;


var setupFrog = function(){
  var frog = new Image();
  frog.src = "images/frog.png";

  var x = 180;
  var y = 540;

  var keyW = false;
  var keyA = false;
  var keyS = false;
  var keyD = false;

  function onKeyUp(event) {
    var keyCode = event.keyCode;

      switch(keyCode) {
    case 68: //d
	if (x < 360){
            x+= 60;
	}
        break;
    case 83: //s
	if (y < 540){
            y+=60;
	}
	break;
    case 65: //a
        if (x > 0){ 
	    x-= 60;
	}
        break;
      case 87: //w
        if (y > 0){
	    y-=60;
	}
	break;
    }
  }

  window.addEventListener("keyup", onKeyUp, false);

  var drawFrog = function(){
    ctx.clearRect(0, 0, 420, 600);
    if (keyD === true && x < 360) {
      x+=60;
    }
    if (keyS === true && y < 540) {
      y+= 60;
    }
    if (keyA === true && x > 0) {
      x -= 60;
    }
    if (keyW === true && y > 0) {
      y -= 60;
    }
    ctx.drawImage(frog, x, y, 60, 60);
    requestId = window.requestAnimationFrame(drawFrog);
  };
  drawFrog();
};
setupFrog();
