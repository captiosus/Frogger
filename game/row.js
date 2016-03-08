"use strict";
class Row {
  constructor(y, canwalk, period, lengthofobjects, direction, imagetype){
    this.y = y;
    this.canwalk = canwalk;
    this.period = period;
    this.lengthofobjects = lengthofobjects;
    this.objectloc = '../images/' + imagetype;
    this.objects = [];
    this.direction = direction;
  }
  createObject(){
    var ent;
    if(this.direction == 'left'){
      ent = new Entity( 400, this.y, 60, this.objectloc, 'left');
    }else{
      ent = new Entity( 0, this.y, 60, this.objectloc, 'right');
    }
    this.objects.push(ent);
  }
  drawObjects(ctx){
    this.objects.forEach(function(obj){
      obj.drawObj(ctx);
    });
  }
  isDead(x, y, length){
    for(var i in this.objects){
      if(this.objects[i].isOn(x) || this.objects[i].isOn(x + length)){
        return this.canwalk;
      }
    }
    return !this.canwalk;
  }
}

class Entity{
  constructor(x, y, length, imageloc, direction){
    this.x = x;
    this.y = y;
    this.length = length;
    this.direction = direction;
    this.imageloc = imageloc + direction + '.jpg';
  }
  isOn(x){
    var dirmod = -1;
    if (this.direction == "left") dirmod *= -1;
    return Math.max(this.x + this.length, this.x) * dirmod > x && x > Math.min(this.x, this.x + this.length);
  }
  drawObj(ctx){
    ctx.drawImage(this.imageloc, this.x, this.y);
  }
}
