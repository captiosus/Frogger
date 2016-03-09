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
  var ent
  if(this.direction == 'left'){
    ent = new Entity( 420, this.y, this.lengthofobjects, this.objectloc, 'left');
  }else{
    ent = new Entity( 0 - this.lengthofobjects, this.y, this.lengthofobjects, this.objectloc, 'right');
  }
  this.objects.push(ent);
}
Row.prototype.drawObjects = function(ctx){
  this.objects.forEach(function(obj){
    obj.drawObj(ctx);
  });
}
Row.prototype.isDead = function(x, y, length){
  for(var i in this.objects){
    if(this.objects[i].isOn(x) || this.objects[i].isOn(x + length)){
      return this.canwalk;
    }
  }
  return !this.canwalk;
}

var Entity = function(x, y, length, imageloc, direction){
  this.x = x;
  this.y = y;
  this.length = length;
  this.direction = direction;
  this.imageloc = imageloc;
};
Entity.prototype.isOn = function(x){
  var dirmod = -1;
  if (this.direction == "left") dirmod *= -1;
  return Math.max(this.x + this.length, this.x) * dirmod > x && x > Math.min(this.x, this.x + this.length);
};
Entity.prototype.drawObj = function(ctx){
    ctx.drawImage(this.imageloc, this.x, this.y,this.length,60);
}
