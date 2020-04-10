// Generates Train with width, length, speed etc.
function Train(gameMargin, trackWidth, windowHeight, numberOfTracks) {
  this.trackWidth = trackWidth;
  this.windowHeight = windowHeight;
  this.numberOfTracks = numberOfTracks;
  this.gameMargin = gameMargin;
  this.width = this.trackWidth * 0.8;
  this.length = TRAIN_LENGTH;
  this.trainImage = new Image();
  this.trainImage.src = "images/train1.png";
  this.regenerateTrain();
}

// Updates Train Sprite based on speed
Train.prototype.update = function () {

  //See if train is still on the screen
  if (this.y - this.length > this.windowHeight) {
    //If it is off the screen, regenerate a random new train
    this.regenerateTrain();
  } else {
    //Otherwise, move the train forward
    this.y += this.speed;
  }
}

// Display the train at its current position
Train.prototype.show = function () {
  //rectFill(this.x-(this.width/2), this.y-this.length, this.width, this.length, this.color);
  drawImage(this.x - (this.width / 2), this.y - this.length, this.trainImage, this.width, this.length)
  trainLight(this.x - (this.width / 3), this.y - 20);
  trainLight(this.x + (this.width / 3), this.y - 20)
}

Train.prototype.getTrack = function () {
  return this.track;
}

Train.prototype.regenerateTrain = function () {

  var trainOnTrack = true;
  var newTrack = 0;
  while(trainOnTrack){
    newTrack = Math.floor(Math.random() * this.numberOfTracks);
    trainOnTrack = false;
    for(var i = 0; i<trains.length; i++){
      if(trains[i] != this && trains[i].track == newTrack){
        trainOnTrack = true;
        break;
      }
    }
  }
  this.track = newTrack;
  this.x = this.gameMargin + (this.track * this.trackWidth) + (0.5 * this.trackWidth);
  this.y = -this.windowHeight*2 - (Math.random() * (this.windowHeight*3));
  this.speed = TRAIN_SPEED;
  this.length = TRAIN_LENGTH;
}

// GETTRAINFROMX - Gets the Train from the XCoord
function getTrainFromX(xCoor) {
  currentTrack = getTrack(xCoor);
  for (var i = 0; i < trains.length; i++) {
    if (trains[i].getTrack() == currentTrack) {
      return trains[i];
    }
  }
}

// GETTRAINFROMTRACK - Gets Train from track number
function getTrainFromTrack(trackNumber) {
  for (var i = 0; i < trains.length; i++) {
    if (trains[i].getTrack() == trackNumber) {
      return trains[i];
    }
  }
}

// THIS FUNCTION WAS MODIFIED FROM AN EXAMPLE ON STACKOVERFLOW
// WE TAKE 0 CREDIT FOR ANY CODE WITHIN THE FOLLOWING METHOD
function trainLight(x, y) {
  // init main canvas and background canvas
  var canvas_light = document.createElement("canvas");
  canvas_light.width = 200;
  canvas_light.height = 200;
  var ctx_light = canvas_light.getContext("2d");

  //create lightmap
  ctx_light.fillStyle = '#000000';
  ctx_light.fillRect(0, 0, 200, 200);

  // create a linear gradient
  var grd = ctx_light.createLinearGradient(100, 0, 100, 200);
  grd.addColorStop(0, '#aa9988'); // #ffdd88
  grd.addColorStop(1, '#000000');

  // create the light arc
  ctx_light.beginPath();
  ctx_light.moveTo(100, 0);
  ctx_light.arc(100, 0, 200, 0.35 * Math.PI, 0.65 * Math.PI, false);

  // fill arc with gradient
  ctx_light.fillStyle = grd;
  ctx_light.fill();

  //put it together
  c.save();
  c.globalCompositeOperation = "lighter";
  c.globalAlpha = dayPercent(false);
  c.drawImage(canvas_light, x - 100, y);
  c.restore(); // sets the composite operation back to default
}
