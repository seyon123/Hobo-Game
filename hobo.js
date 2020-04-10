function Hobo(isPlayable, trackNumber, trackWidth, gameMargin, windowHeight, windowWidth) {

  //Personal stats related to the hobo
  this.name = generateName();
  this.time = 0;
  this.health = MAX_HEALTH;
  this.cooldownDone = 0;
  this.cooldownStart = 0;
  this.jumpingX = 0;
  this.isJumping = false;

  //Keep track of values related to the global game
  this.isPlayable = isPlayable;
  this.track = trackNumber;
  this.trackWidth = trackWidth;
  this.gameMargin = gameMargin;
  this.windowHeight = windowHeight;
  this.windowWidth = windowWidth;

  //Keep track of where the hobo will be drawn
  //this is needed to determine when the train is hitting the hobo
  if (this.isPlayable)
    this.y = this.windowHeight - (this.windowHeight / 4);
  else
    this.y = (this.windowHeight / 2.5);

  if (this.isPlayable)
    this.displaySize = trackWidth * 0.7;
  else
    this.displaySize = trackWidth * 0.25;


  //Array for hobo animation sprite
  this.hoboSprites = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
  this.hoboSprites[0].src = "images/sprite1.png";
  this.hoboSprites[1].src = "images/sprite2.png";
  this.hoboSprites[2].src = "images/sprite3.png";
  this.hoboSprites[3].src = "images/sprite4.png";
  this.hoboSprites[4].src = "images/sprite5.png";
  this.hoboSprites[5].src = "images/head.png";

  //Set default frame number
  this.hoboSpriteFrame = 0;
  this.isHittingTrain = false;

  //Import the image to display when the hobo is being injured
  this.hoboHurt = new Image();
  this.hoboHurt.src = "images/pain.png";
}

Hobo.prototype.update = function () {

  //CHECK TO SEE IF THE HOBO IS DEAD
  if (this.health > 0) {

    //Keep track of how long the user has survived for.
    //Defined in printer.js, the screen is updated every 20ms, hense the 20 below
    this.time += 20;

    //Update cooldown status
    this.cooldownDone += 20;
    if (this.cooldownStart - this.cooldownDone < 25) {
      this.cooldownDone = this.cooldownStart;
    }

    //CALCULATE IF THE HOBO IS HITTING A TRAIN
    if (this.isJumping) {
      //If the hobo is moving across tracks (jumping), figure out which track the hobo
      //is currently positioned over based on its current x value.
      currentTrain = getTrainFromX(this.jumpingX);
    } else {
      //If the hobo is not jumping, get the train on the track that the hobo is set to be at currently
      currentTrain = getTrainFromTrack(this.track)
    }
    if (currentTrain != undefined) {
      if (currentTrain.y > this.y && currentTrain.y < this.y + currentTrain.length) {
        if (this.health > 0) {
          this.health -= DECREASE_HP;
          this.isHittingTrain = true;
        }
        if (this.isPlayable) {
          drawImage(0, 0, this.hoboHurt, this.windowWidth, this.windowHeight);
        }
      } else {
        this.isHittingTrain = false;
      }
    }

    //Calculate HOBO's movements
    if (this.isPlayable)
      this.calculateMovement();
  }
}

Hobo.prototype.show = function () {
  if (this.health > 0) {
    this.showHobo();
    this.showPreview();
    // checkDeath = false;
  } else {
    this.displayEndScreen();
    // if(this.isPlayable)
    //   checkDeath = true;
  }
}

Hobo.prototype.getTime = function (timeMS) {
  //Show timer
  var minutes = Math.floor(timeMS / 60000);
  var seconds = Math.floor((timeMS - (minutes * 60 * 1000)) / 1000);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

//Shows preview of hobo upon track, used when hovered over
Hobo.prototype.showPreview = function () {
  //Tracks mouse movement
  var mouseX = mouse().x;
  mouseTrack = getTrack(mouseX);
  if (this.isPlayable && (mouseTrack >= 0) && (mouseTrack < numTracks)) {
    //Display the preview hobo over the currently hovered over track
    if ((mouseTrack != this.track)) {

      var trackCenter = getCenterOfTrack(mouseTrack);
      drawImage(trackCenter - (this.displaySize / 2), this.y, this.hoboSprites[4], this.displaySize, this.displaySize);
      c.globalAlpha = dayPercent(false);
      lighten(trackCenter, this.y + (this.displaySize / 2), 100)
      c.globalAlpha = 1;
    }
  }
}

Hobo.prototype.darkenHoboVision = function () {
  if (this.health > 0) {
    c.save();
    //Add Darkness to image
    var darknessSize = 2 * Math.max(this.windowWidth, this.windowHeight)
    var xPos = getCenterOfTrack(this.track);
    if (this.isJumping)
      xPos = this.jumpingX;

    c.globalAlpha = dayPercent(false);
    lighten(xPos, this.y + (this.displaySize / 2), 100);

    xPos -= darknessSize / 2;
    var yPos = this.y;
    yPos -= darknessSize / 2;
    c.globalCompositeOperation = 'multiply';
    c.globalAlpha = dayPercent();
    drawImage(xPos, yPos, darknessImage, darknessSize, darknessSize);
    c.restore();
  }
}

Hobo.prototype.darkenHoboVisionV2 = function () {
  if (this.health > 0) {
    c.save();
    var xPos = getCenterOfTrack(this.track);
    if (this.isJumping)
      xPos = this.jumpingX;
    lighten(xPos, this.y + (this.displaySize / 2), 100);
    c.globalCompositeOperation = 'multiply';
    rectFill(0, 0, this.windowWidth, this.windowHeight, "#444444");
    c.restore();
  }
}

Hobo.prototype.showHoboGUI = function () {

  if (this.health > 0) {
    //Show health bar
    rectFill(60, 10, 200, 30, "brown");
    rectFill(65, 15, 190 * (this.health / 100), 20, HEALTH_COLOURS[Math.round((HEALTH_COLOURS.length - 1) * (this.health / 100))]);
    text(Math.floor(this.health) + "%", 205, 30, "15px monospace", "white");
    text("HP: ", 20, 30, "20px monospace", "white");

    //Show Hobo's name
    text("Name: " + this.name, (this.windowWidth / 2) - ((this.name.length / 4) * 18) + 150, 30, "18px monospace", "white");

    //Show the time the hobo has been alive for
    var message = this.getTime(this.time);
    var messageFont = "28px monospace";
    text(message, getCenteredX(message, messageFont), 33, messageFont, "white");

    //MOVEMENT COOLDOWN
    var statBarPadding = 5;
    var statBarHeight = 10;
    var statBarOutline = 2.25;
    var cooldownYPos = 50;
    var coolColour = ["yellow", "orange", "blue"];
    var cooldownPercent = Math.max(0, (this.cooldownDone / this.cooldownStart) || 1)
    var coolColour = coolColour[Math.round((coolColour.length - 1) * cooldownPercent) || 0];
    if (cooldownPercent == 1) {
      coolColour = "#66ff00";
      c.globalAlpha = 1;
    } else {
      c.globalAlpha = 0.1;
    }
    var cooldownWidth = cooldownPercent * (this.windowWidth);

    rectFill(0, cooldownYPos, this.windowWidth, statBarHeight, "black");
    c.globalAlpha = 0.45;
    rectFill(0, cooldownYPos, cooldownWidth, statBarHeight, coolColour);
    c.globalAlpha = 1;
  }
}

//Shows Hobo
Hobo.prototype.showHobo = function () {

  var trackCenter = getCenterOfTrack(this.track);

  if (this.isPlayable)
    var currentHoboX = trackCenter - (this.displaySize / 2);
  else
    var currentHoboX = this.calcTrackX();

  currentImage = this.hoboSprites[Math.floor(this.hoboSpriteFrame)]

  if (this.isJumping) {
    drawImage(this.jumpingX - (this.displaySize / 2), this.y, currentImage, this.displaySize, this.displaySize);
    currentHoboX = this.jumpingX - (this.displaySize / 2);
  } else
    drawImage(currentHoboX, this.y, currentImage, this.displaySize, this.displaySize);

  if (this.isPlayable)
    rect(currentHoboX, this.y, this.displaySize, this.displaySize, "red", 4);

  //Animation for Hobo Sprite
  if (this.isPlayable)
    this.hoboSpriteFrame += PC_FRAME_SPEED;
  else {
    this.hoboSpriteFrame += NPC_FRAME_SPEED;
  }
  this.hoboSpriteFrame = this.hoboSpriteFrame % (this.hoboSprites.length - 2);

  this.displayStatusBar();
}

Hobo.prototype.displayStatusBar = function () {
  var currentHoboX = this.calcTrackX();

  if (this.isPlayable) {
    currentHoboX -= this.displaySize / 2;
    if (this.isJumping)
      currentHoboX = this.getX() - (this.displaySize / 2);
  }

  //Display hobo status
  var statBarPadding = 5;
  var statBarHeight = 10;
  var statBarOutline = 2.25;
  
  //HEALTH BAR HERE
  var healthYPos = this.y + this.displaySize + statBarPadding;
  var healthColour = HEALTH_COLOURS[Math.round((HEALTH_COLOURS.length - 1) * (this.health / 100)) || 0];
  var healthBarWidth = Math.max(0, (this.health / 100) * this.displaySize - (2 * statBarPadding));
  rectFill(currentHoboX + statBarPadding, healthYPos, this.displaySize - (2 * statBarPadding), statBarHeight, "white", statBarOutline);
  rectFill(currentHoboX + statBarPadding, healthYPos, healthBarWidth, statBarHeight, healthColour);

  //MOVEMENT COOLDOWN
  var cooldownYPos = this.y + this.displaySize + statBarHeight + (statBarPadding * 2);
  var coolColour = COOLDOWN_COLOURS[Math.round((COOLDOWN_COLOURS.length - 1) * ((this.cooldownDone / this.cooldownStart) || 1)) || 0];
  var cooldownPercent = Math.max(0, (this.cooldownDone / this.cooldownStart) || 1)
  var cooldownWidth = cooldownPercent * (this.displaySize - (2 * statBarPadding));
  rectFill(currentHoboX + statBarPadding, cooldownYPos, this.displaySize - (2 * statBarPadding), statBarHeight, "white", statBarOutline);
  rectFill(currentHoboX + statBarPadding, cooldownYPos, cooldownWidth, statBarHeight, coolColour);
}

Hobo.prototype.calcTrackX = function () {
  var trackCenter = getCenterOfTrack(this.track);

  if (!this.isPlayable) {
    var otherHobosOnTrack = getTrackHobos(this.track);
    var hobosTotalWidth = 0;

    var cntInFront = 0;
    var passedCurrent = false;
    for (var i = 0; i < otherHobosOnTrack.length; i++) {
      if (!(otherHobosOnTrack[i] == this) && !passedCurrent) {
        cntInFront++;
      } else {
        passedCurrent = true;
      }
      hobosTotalWidth += otherHobosOnTrack[i].displaySize;
    }
    var hobosOffset = hobosTotalWidth / 2;

    if (DEBUG_MODE)
      rect(trackCenter - hobosOffset, this.y, hobosTotalWidth, this.displaySize);

    var firstHoboX = trackCenter - hobosOffset;
    return firstHoboX + (cntInFront * this.displaySize);
  }
  else {
    return trackCenter;
  }
}

Hobo.prototype.calculateMovement = function () {
  if (this.isJumping) {
    //This code runs if the hobo is in the process of jumping
    this.jumpingMovementHandler();

  } else {
    //Calculate if the hobo needs to jump /
    var mouseClicked = mouse().down;

    //Calculate what track the mouse is hovered over based on X coord
    var mouseX = mouse().x;
    mouseTrack = getTrack(mouseX);

    if ((mouseTrack >= 0) && (mouseTrack < numTracks) && mouseTrack != this.track) {
      //If the mouse is being clicked, set the hobo to that track.
      if (mouseClicked && (this.cooldownDone == this.cooldownStart)) {
        this.jumpingX = getCenterOfTrack(this.track);
        this.track = mouseTrack;
        this.isJumping = true;

        this.cooldownStart = Math.abs(5 * (this.calcTrackX() - this.jumpingX));
        this.cooldownDone = 0;
      }
    }
  }
}

Hobo.prototype.jumpingMovementHandler = function () {

  //Calculate how far the hobo is from the desired track
  var distanceToNewTrack = this.calcTrackX() - this.jumpingX;

  if (Math.abs(distanceToNewTrack) < 10) {

    //If the hobo is almost at the track, snap the hobo to the center of the track
    //and reset values to be in a not-jumping state
    this.jumpingX = 0;
    this.isJumping = false;

  } else {

    //If the hobo is not close to the desired track, calculate how much to move towards it
    var toMove;
    if ((distanceToNewTrack / Math.abs(distanceToNewTrack)) > 0)
      toMove = Math.max(distanceToNewTrack * 0.1, (distanceToNewTrack / Math.abs(distanceToNewTrack)) * 9);
    else
      toMove = Math.min(distanceToNewTrack * 0.1, (distanceToNewTrack / Math.abs(distanceToNewTrack)) * 9);

    //Move the hobo the calculated amount
    this.jumpingX += toMove;
  }
}

Hobo.prototype.getX = function () {
  var xPos = getCenterOfTrack(this.track);
  if (this.isJumping)
    xPos = this.jumpingX;
  //console.log(xPos);
  return xPos;
}

Hobo.prototype.getY = function () {
  return this.y;
}

Hobo.prototype.getTrackNumber = function () {
  return this.track;
}

// Displays the game ending screen
Hobo.prototype.displayEndScreen = function () {
  if (this.isPlayable) {
    //Draw the red background
    rectFill(0, 0, this.windowWidth, this.windowHeight, "rgba(153, 0, 0, 0.85)");

    //Display that text to the screen
    var message = this.name + " died.";
    var messageFont = "40px monospace";
    text(message, getCenteredX(message, messageFont), this.windowHeight / 4, messageFont, "white");

    //Display that text to the screen
    var message = "Time Elapsed: " + this.getTime(this.time);
    var messageFont = "24px monospace";
    text(message, getCenteredX(message, messageFont), (this.windowHeight / 4) + 50, messageFont, "white");
    this.restartButtonHandler();
  }
}

//Coordinate the display and interation with the "PLAY AGAIN" button
Hobo.prototype.restartButtonHandler = function () {
  //Draw the replay button
  var message = "PLAY AGAIN";
  var messageFont = "bold 35px monospace";
  text(message, getCenteredX(message, messageFont), (this.windowHeight / 2) + 12, messageFont, "white");
  rect((this.windowWidth / 2) - 110, (this.windowHeight / 2) - 30, 220, 60, "white");
  //See if the user is pressing the restart button
  var mouseX = mouse().x;
  var mouseY = mouse().y;
  var mouseClicked = mouse().down;
  //Handle interaction with the 'Try Again' button
  if (mouseX > (this.windowWidth / 2) - 110 && mouseX < (this.windowWidth / 2) - 110 + 220 && mouseY > (this.windowHeight / 2) - 30 && mouseY < (this.windowHeight / 2) - 30 + 60) {
    if (mouseClicked && !mousePreviouslyClicked) {
      //If restart button has been pressed, reset the game
      setup();
      mousePreviouslyClicked = true;
    } else {
      //If you are just hovering over the button, invert the colours
      mousePreviouslyClicked = false;
      rectFill((this.windowWidth / 2) - 110, (this.windowHeight / 2) - 30, 220, 60, "white");
      var message = "PLAY AGAIN";
      var messageFont = "bold 35px monospace";
      text(message, getCenteredX(message, messageFont), (this.windowHeight / 2) + 12, messageFont, "#990000");
    }
  }
}

//Generate a random name for the hobo, return a string
function generateName() {
  return HOBO_NAMES[Math.floor(Math.random() * HOBO_NAMES.length)]
}