var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var requestId;


var setupFrog = function(){
  var x = 210;
  var y = 600;
  var width = 60;

  var drawFrog = function(){

    requestId = window.requestAnimationFrame(drawFrog);
  };
};


var setupBackground = function(){
  
}
