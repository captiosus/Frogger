var Row = function(y, canwalk, period, lengthofobjects, direction, imagetype){
  this.y = y;
  this.canwalk = canwalk;
  this.period = period;
  this.lengthofobjects = lengthofobjects;
  this.objectloc = '../images/' + imagetype;
  this.objects = [];
  this.direction = direction;
};
Row.prototype.createObject = function(){
  var ent
  if(direction == 'left'){
    ent = new Entity( 400, this.y, this.lengthofobjects, this.objectloc, 'left');
  }else{
    ent = new Entity( 0, this.y, this.lengthofobjects, this.objectloc, 'right');
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
  this.imageloc = imageloc + direction + '.jpg';
};
Entity.prototype.isOn = function(x){
  var dirmod = -1;
  if (this.direction == "left") dirmod *= -1;
  return Math.max(this.x + this.length, this.x) * dirmod > x && x > Math.min(this.x, this.x + this.length);
};
Entity.prototype.drawObj = function(ctx){
  ctx.drawImage(this.imageloc, thix.x, this.y);
}
