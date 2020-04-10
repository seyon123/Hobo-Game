// Generates Weather with width, length, speed etc.
function Weather(gameMargin, trackWidth, windowHeight, windowWidth) {

  //General how to on how to do this found here https://www.youtube.com/watch?v=66f6bI2uIdQ

  this.trackWidth = trackWidth;
  this.windowHeight = windowHeight;
  this.windowWidth = windowWidth;
  this.gameMargin = gameMargin;

  this.rainSpot = WEATHER_DEST_SIZE;
  this.maxDroplets = WEATHER_MAX_PARTICLES;
  this.droplets = [];

  this.weatherColour = "white";
  this.weatherWidth = 1;
  this.weatherHeight = 1;
  this.weatherOpacity = 1;
  this.weatherSpeed = 1;
}

// Updates Raindrop based on speed
Weather.prototype.update = function () {

  var maxWeather = weatherTimerPercent(true)*WEATHER_MAX_PARTICLES;
  if(weatherTypePercent() > 0){
    this.weatherColour = RAIN_COLOUR;
    this.weatherWidth = RAIN_WIDTH;
    this.weatherLength = RAIN_LENGTH;
    this.weatherOpacity = RAIN_OPACITY;
    this.weatherSpeed = RAIN_SPEED;
    rainSound.volume = 1;
  } else {
    this.weatherColour = SNOW_COLOUR;
    this.weatherWidth = SNOW_WIDTH;
    this.weatherLength = SNOW_LENGTH;
    this.weatherOpacity = SNOW_OPACITY;
    this.weatherSpeed = SNOW_SPEED;
    rainSound.volume = 0;
  }


  if(this.droplets.length < maxWeather){
    for (var i = 0; i < 5; i++) {
      var xa = this.windowWidth * Math.random();

      var ya = this.windowHeight * Math.random();
      this.droplets.push({ x: xa, y: ya, height: 100 });
    }
  }

  for(var i =0; i<this.droplets.length; i++){
    var height = this.droplets[i].height;
    this.droplets[i].height-=this.weatherSpeed;
    if(this.droplets[i].height<0){
      this.droplets[i].height = 40;
    }
  }
  for(var i =0; i<Math.max(0,this.droplets.length - maxWeather); i++){
   this.droplets.splice(Math.random*this.droplets.length, 1);
  }
}

// Shows Raindrop based on speed
Weather.prototype.show = function (desiredX, desiredY) {
  c.save()
  for(var i =0; i<this.droplets.length; i++){
    var x = this.droplets[i].x;
    var y = this.droplets[i].y;
    var height = this.droplets[i].height;

    c.globalAlpha = this.weatherOpacity;
    var length = this.weatherLength;

    var vx = (x-(desiredX)-(this.rainSpot/2))/(this.rainSpot/2);
    var vy = (y-(desiredY)-(this.rainSpot/2))/(this.rainSpot/2);

    x1 = x + vx*Math.pow(height,2);
    y1 = y + vy*Math.pow(height,2);

    x2 = x + vx*Math.pow(height+length,2);
    y2 = y + vy*Math.pow(height+length,2);

    line(x1, y1, x2, y2, this.weatherWidth, this.weatherColour);
  }
  c.restore();
}