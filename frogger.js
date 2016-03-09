var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var requestId;


var setupFrog = function() {
  var frog = new Image();
  frog.src = "images/frog.png";

  var rows = [];
  // rows.push(new Row(0,false, 6, 120, "left", "log", 40));
  rows.push(new Row(30, false, 4, 120, "right", "log", 48));
  rows.push(new Row(60, false, 7, 120, "right", "log", 35));
  rows.push(new Row(90, false, 5, 120, "left", "log", 48));
  rows.push(new Row(120, false, 7, 120, "left", "log", 35));
  rows.push(new Row(150, false, 6, 120, "left", "log", 42));
  rows.push(new Row(210, true, 4, 60, "right", "car", 43));
  rows.push(new Row(240, true, 6, 120, "right", "truck", 50));
  rows.push(new Row(270, true, 4, 60, "left", "car", 48));
  rows.push(new Row(300, true, 5, 60, "left", "car", 41));
  rows.push(new Row(330, true, 5, 60, "right", "car", 42));
  rows.push(new Row(360, true, 7, 120, "left", "truck", 45));
  // rows.push(new Row(540, true, 6, 60, "right", "car", 38));
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
  var x = 180;
  var y = 540;
  var drawRows = function() {
    ctx.clearRect(0, 0, 420, 600);
    rows.forEach(function(row) {
      row.drawObjects(ctx);
      row.objects.forEach(function(obj) {
        if (row.direction == "left") {
          obj.x -= row.velocity / 30;
          if (obj.x <= 0 - row.lengthofobjects) {
            obj.x = 420;
          }
        } else {
          obj.x += row.velocity / 30;
          if (obj.x >= 420) obj.x = 0 - row.lengthofobjects;
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
        }
        break;
      case 83: //s
        if (y < 540) {
          y += 30;
        }
        break;
      case 65: //a
        if (x > 0) {
          x -= 30;
        }
        break;
      case 87: //w
        if (y > 0) {
          y -= 30;
        }
        break;
    }
  }

  window.addEventListener("keyup", onKeyUp, false);

  var drawFrog = function() {
    ctx.drawImage(frog, x, y, 30, 30);
    requestId = window.requestAnimationFrame(drawFrog);
  };
  drawRows();
  drawFrog();
};

var setupBackground = function() {

};


setupFrog();
