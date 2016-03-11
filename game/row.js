var Row = function(y, canwalk, period, lengthofobjects, direction, imagetype, velocity){
  this.y = y;
  this.canwalk = canwalk;
  this.period = period;
  this.lengthofobjects = lengthofobjects;
  this.objectloc = new Image();
  if (imagetype == "log"){
      this.objectloc.src = 'images/log.png';
  }
  else {
      this.objectloc.src = 'images/' + imagetype + direction + ".png";
  }
  this.objects = [];
  this.direction = direction;
  this.velocity = velocity;
};
Row.prototype.createObject = function(){
  var ent;
  if(this.direction == 'left'){
    ent = new Entity( 420, this.y, this.lengthofobjects, this.objectloc, 'left');
  }else{
    ent = new Entity( 0 - this.lengthofobjects, this.y, this.lengthofobjects, this.objectloc, 'right');
  }
  this.objects.push(ent);
};
Row.prototype.drawObjects = function(ctx){
  this.objects.forEach(function(obj){
    obj.drawObj(ctx);
  });
};
Row.prototype.isDead = function(x, y, length){
  for(var i in this.objects){
    if(this.objects[i].isOn(x) || this.objects[i].isOn(x + length)){
      return this.canwalk;
    }
  }
  return !this.canwalk;
};

Row.prototype.color = function(ctx){
    ctx.fillStyle = "#afaea7";
    ctx.fillRect(0,this.y,420,30);
    ctx.fillStyle = "black";
    for (y = 30; y < 60; y+=10){
	for(x = 0; x < 420; x+=20){
	    if (y == 40 && x == 0){
		x += 10;
	    }
	    
	    ctx.fillRect(x,y,10,10);
	}
    }
    if (this.canwalk){
	ctx.fillStyle = "#e5bb14";
	ctx.fillRect(0,this.y-2.5,420,5);
	ctx.fillRect(0,this.y+27.5,420,5);
	ctx.fillStyle = "white";
	for (i = 0 ; i < 420; i+= 60){
	    ctx.fillRect(i, this.y + 12.5, 30, 5);
	}
    }
    else {
	ctx.fillStyle = "#40a4df";
	ctx.fillRect(0,this.y,420,30);
    }
    
};
var Entity = function(x, y, length, imageloc, direction){
  this.x = x;
  this.y = y;
  this.length = length;
  this.direction = direction;
  this.imageloc = imageloc;
};
Entity.prototype.isOn = function(x){
  return (x+15 >= this.x && x+15 <=this.x + this.length);
};
Entity.prototype.drawObj = function(ctx){
  ctx.drawImage(this.imageloc, this.x, this.y,this.length,30);
};
