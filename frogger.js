var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var requestId;
var restart = document.getElementById("restart");

var setupFrog = function() {
  var frog = new Image();
  frog.src = "images/frog.png";
  var alive = true;
  var rows = [];
  var lives = 2;
  var rowSetup = function() {
    var directions = ["left", "right"]
    var randomNum; 
    for (i = 0; i < 6; i++){
	randomNum = Math.round(Math.random());
	rows.push(new Row(60 + i * 30, false,Math.floor( Math.random() * 4 + 5), 120, directions[randomNum], "log",Math.floor(Math.random()*40 + 40)));
    }
    var size = [60,120];
    var car = ["car","truck"];
    for (i = 0; i < 8; i++){
	randomNum = Math.round(Math.random());
	console.log(randomNum);
	rows.push(new Row(300 + i * 30, true, Math.floor( Math.random() * 3 + 5), size[randomNum], directions[Math.round(Math.random())], car[randomNum], Math.floor(Math.random()*50 + 40)));
    }
   /* rows.push(new Row(90, false, 5, 120, "left", "log", 48));
    rows.push(new Row(120, false, 7, 120, "right", "log", 35));
    rows.push(new Row(150, false, 7, 120, "left", "log", 42));
    rows.push(new Row(180, false, 5, 120, "right", "log", 46));
    rows.push(new Row(210, false, 8, 120, "left", "log", 35));
    rows.push(new Row(300, true, 4, 60, "right", "car", 43));
    rows.push(new Row(330, true, 6, 120, "right", "truck", 50));
    rows.push(new Row(360, true, 4, 60, "left", "car", 48));
    rows.push(new Row(390, true, 5, 60, "left", "car", 41));
    rows.push(new Row(420, true, 5, 60, "right", "car", 42));
    rows.push(new Row(450, true, 7, 120, "left", "truck", 45));
    rows.push(new Row(480, true, 6, 60, "left", "car", 43));
    rows.push(new Row(510, true, 5, 120, "left", "truck", 48));*/
    var numObs;
    var distance;
    for (i = 0; i < rows.length; i++) {
      numObs = Math.ceil(420 / rows[i].velocity / rows[i].period);
      distance = rows[i].velocity * rows[i].period;
      for (j = 0; j < numObs; j++) {
        rows[i].createObject();
        if (rows[i].direction == "left") {
          rows[i].objects[j].x += j * distance;
        } else {
          rows[i].objects[j].x -= j * distance;
        }
      }
    }
  };
  rowSetup();
  var x = 180;
  var y = 570;

  var drawRows = function() {
    ctx.clearRect(0, 0, 420, 600);
    rows.forEach(function(row) {
      row.color(ctx);
      var confirmed = false;
      row.drawObjects(ctx);
      row.objects.forEach(function(obj) {
        if (row.direction == "left") {
          obj.x -= row.velocity / 30;
          if (obj.x <= 0 - (row.velocity * row.period) + row.lengthofobjects) {
            obj.x = 420;
          }
        }
        if (row.direction == "right") {
          obj.x += row.velocity / 30;
          if (obj.x >= 420 + (row.velocity * row.period) - row.lengthofobjects) {
            obj.x = 0 - row.lengthofobjects;
          }
        }
        if (y == obj.y) {
          if (!row.canwalk) {
            if (!confirmed) {
              if (obj.isOn(x)) {
                if (row.direction == "right") {
                  x += row.velocity / 30;
                }
                if (row.direction == "left") {
                  x -= row.velocity / 30;
                }
                alive = true;
                confirmed = true;
                if (x < 0) {
                  alive = false;
                }
                if (x > 420) {
                  alive = false;
                }
              }
              else {
                alive = false;
              }
            }
          }
          else {
            if (obj.isOn(x)) {
              alive = false;
            }
          }
        }
      });
    });
    requestID = requestAnimationFrame(drawRows);
  };

  function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
      case 68: //d
        if (x < 360) {
          x += 30;
          frog.src = "images/frogright.png";
        }
        break;
      case 83: //s
        if (y < 570) {
          y += 30;
          frog.src = "images/frog.png";
        }
        break;
      case 65: //a
        if (x > 0) {
          x -= 30;
          frog.src = "images/frogleft.png";
        }
        break;
      case 87: //w
        if (y > 0) {
          y -= 30;
          frog.src = "images/frog.png";
        }
        break;
    }
  }
  var resetGame = function() {
    alive = true;
    x = 180;
    y = 570;
    lives--;
    ctx.clearRect(0, 0, 420, 600);
  };
  window.addEventListener("keyup", onKeyUp, false);

  var drawFrog = function() {
    ctx.drawImage(frog, x, y, 30, 30);
    requestId = window.requestAnimationFrame(drawFrog);
    if (!alive) {
      resetGame();
    }
    if (lives < 0) {
      alert("you lost!");
      cancelAnimationFrame(requestID);
      window.removeEventListener("keyup", onKeyUp);
      lives = 1;
      ctx.clearRect(0, 0, 420, 600);
      return;
    }
    if (y == 30) {
      alert("you won!");
      y = 50;
      endgame();
      window.removeEventListener("keyup", onKeyUp);
      return;
    }
  };
  drawRows();
  drawFrog();
};

var setupBackground = function() {

};

var endgame = function() {
  ctx.clearRect(0, 0, 420, 600);
  cancelAnimationFrame(requestID);
};

restart.addEventListener("mousedown", function(e) {
  cancelAnimationFrame(requestID);
  ctx.clearRect(0, 0, 420, 600);
  setupFrog();
});
setupFrog();
