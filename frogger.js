var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var restart = document.getElementById("restart");

var setupFrog = function(restarted) {
  var requestId;
  var rowId;
  var time = 0;
  var frog = new Image();
  frog.src = "images/frog.png";
  var alive = true;
  var rows = [];
  restarted = false;
  var lives = 3;
  var endgame = function() {
    ctx.clearRect(0, 0, 420, 600);
    cancelAnimationFrame(requestID);
  };
  var rowSetup = function() {
    var directions = ["left", "right"];
    var randomNum;
    for (i = 0; i < 6; i++) {
      randomNum = Math.round(Math.random());
      rows.push(new Row(60 + i * 30, false, Math.floor(Math.random() * 3 + 4), 120, directions[randomNum], "log", Math.floor(Math.random() * 20 + 45)));
    }
    var size = [60, 120];
    var car = ["car", "truck"];
    for (i = 0; i < 8; i++) {
      randomNum = Math.round(Math.random());
      rows.push(new Row(300 + i * 30, true, Math.floor(Math.random() * 3 + 4), size[randomNum], directions[Math.round(Math.random())], car[randomNum], Math.floor(Math.random() * 30 + 60)));
    }
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
    setupBackground();
    rows.forEach(function(row) {
      row.color(ctx);
      var confirmed = false;
      row.drawObjects(ctx);
      row.objects.forEach(function(obj) {
        if (row.direction == "left") {
          obj.x -= row.velocity / 60;
          if (obj.x <= 0 - (row.velocity * row.period) + row.lengthofobjects) {
            obj.x = 420;
          }
        }
        if (row.direction == "right") {
          obj.x += row.velocity / 60;
          if (obj.x >= 420 + (row.velocity * row.period) - row.lengthofobjects) {
            obj.x = 0 - row.lengthofobjects;
          }
        }
        if (y == obj.y) {
          if (!row.canwalk) {
            if (!confirmed) {
              if (obj.isOn(x)) {
                if (row.direction == "right") {
                  x += row.velocity / 60;
                }
                if (row.direction == "left") {
                  x -= row.velocity / 60;
                }
                alive = true;
                confirmed = true;
                if (x < 0) {
                  alive = false;
                }
                if (x > 420) {
                  alive = false;
                }
              } else {
                alive = false;
              }
            }
          } else {
            if (obj.isOn(x)) {
              alive = false;
            }
          }
        }
      });
    });
    if (!restarted || lives != -1) {
      rowId = requestAnimationFrame(drawRows);
    }
  };

  function onKeyUp(event) {
    var keyCode = event.keyCode;
    if (!restarted) {
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
            console.log(y);
            frog.src = "images/frog.png";
          }
          break;
      }
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
    ctx.font = "20px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: " + lives, 20, 25);
    ctx.fillText("Time: " + Math.round(time), 320, 25);
    ctx.drawImage(frog, x, y, 30, 30);
    time += 1 / 60;
    if (!alive) {
      resetGame();
    }
    if (lives === 0) {
      cancelAnimationFrame(requestId);
      cancelAnimationFrame(rowId);
      window.removeEventListener("keyup", onKeyUp);
      lives = -1;
      ctx.clearRect(0, 0, 420, 600);
      ctx.fillText("You Lost!", 160, 30);
      ctx.fillText("Press Restart to Play Again", 100, 60);
      console.log("hello");
      return;
    }
    if (y == 30) {
      y = 50;
      cancelAnimationFrame(requestId);
      cancelAnimationFrame(rowId);
      window.removeEventListener("keyup", onKeyUp);
      ctx.clearRect(0, 0, 420, 600);
      ctx.fillText("You Won in " + Math.round(time) + " Seconds!", 80, 30);
      ctx.fillText("Press Restart to Play Again", 100, 60);
      return;
    }
    if (restarted || lives == -1) {
      window.removeEventListener("keyup", onKeyUp);
      x = 180;
      y = 570;
      return;
    }
    if (!restarted || lives != -1) {
      requestId = window.requestAnimationFrame(drawFrog);
    }

  };

  restart.addEventListener("mousedown", function(e) {
    ctx.clearRect(0, 0, 420, 600);
    restarted = true;
    cancelAnimationFrame(requestId);
    cancelAnimationFrame(rowId);
    setupFrog(false);
  });
  drawRows();
  drawFrog();
  return;
};

var setupBackground = function() {
  ctx.fillStyle = "#7CFC00";
  ctx.fillRect(0, 0, 420, 60);
  ctx.fillRect(0, 540, 420, 60);
  ctx.fillRect(0, 240, 420, 60);
};



setupFrog(false);
