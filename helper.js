// CHECKFORPAUSE - Checks for whether pause button was clicked
function checkForPause() {
    //CALCULATE THE HOBO's movements:
    var mouseX = mouse().x;
    var mouseY = mouse().y;
    var mouseClicked = mouse().down;

    // Calculate what track the mouse is hovered over based on X coord
    if (mouseX > width - 50 && mouseX < width - 20 && mouseY > 0 && mouseY < 50 && mouseClicked && !mousePreviouslyClicked) {
        paused = !paused;
        mousePreviouslyClicked = true;
    } else if (!mouseClicked) {
        mousePreviouslyClicked = false;
    }
}

// DrawGUI - Initializes the GUI
function drawGUI() {
    //Show header
    rectFill(0, 0, width, 60, "#424250");
    //if(!checkDeath){
      // Show pause button
      var pauseButton, font, buttonY;
      if (paused) {
          buttonY = 39;
          pauseButton = "►"; //►
          pausedMsg = "GAME PAUSED";
          font = "50px monospace";
      } else {
          buttonY = 32;
          pauseButton = "▌▌"; //▌▌
          pausedMsg = "";
          font = "24px monospace";
      }
      text(pauseButton, width - 50, buttonY, font, "white");
      var pausedTextFont = "bold 40px monospace";
      text(pausedMsg, getCenteredX(pausedMsg, pausedTextFont), height / 2, pausedTextFont, "white");
    //}
}

function generateBackgroundPositions() {
    //Generate the positions for the deadly deadlyPlant
    plantPositions = [];
    for (var i = 0; i < 100; i++) {
        var x = width * Math.random() - 20;
        var y = height * Math.random();
        if (x < gameMargin - 50 || x > width - gameMargin - 50)
            plantPositions.push({
                x: x,
                y: y
            });
    }

    grassPositions = [];
    for (var i = 0; i < NUM_GRASS; i++) {
        var x = width * Math.random();
        var y = height * Math.random();
        grassPositions.push({
            x: x,
            y: y
        });
    }
}

function getCenteredX(text, font) {
    return (window.innerWidth / 2) - (getTextWidth(text, font) / 2);
}

// THIS FUNCTION WAS MODIFIED FROM AN EXAMPLE ON STACK OVERFLOW
// WE TAKE 0 CREDIT FOR ANY CODE WITHIN THE FOLLOWING FUNCTION
function lighten(x, y, radius) {
    c.save();
    c.globalCompositeOperation = 'lighter';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = c.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#666');
    //radialGradient.addColorStop(0.2 + rnd, '#555');
    radialGradient.addColorStop(0.7 + rnd, '#444');
    radialGradient.addColorStop(0.90, '#333');
    radialGradient.addColorStop(1, '#000');
    c.fillStyle = radialGradient;
    c.beginPath();
    c.globalAlpha = dayPercent();
    c.arc(x, y, radius, 0, 2 * Math.PI);
    c.fill();
    c.restore();
}

function dayPercent(value) {
    if (!DEBUG_MODE) {
        if (value == undefined)
            var value = true
        if (value)
            return Math.floor(1000 * (0.5 * Math.sin(1.1 * Date.now() / DAY_TIME) + 0.5)) / 1000;
        else
            return Math.floor(1000 * (-0.5 * Math.sin(1.1 * Date.now() / DAY_TIME) + 0.5)) / 1000;
    } else {
        if(DEBUG_NIGHT){
          return 1;
        } else {
          return 0; 
        }
    }
}

function weatherTimerPercent(value) {
  if (!DEBUG_MODE) {
    if (value == undefined)
        var value = true;
    if (value)
        return Math.max((Math.floor(1000 * (0.5 * Math.cos(1.1 * Date.now() / WEATHER_TIME) - 0.1)) / 1000)+0.25, 0);
    else
        return Math.max(Math.floor(1000 * (-0.5 * Math.cos(1.1 * Date.now() / WEATHER_TIME) - 0.1)) / 1000, 0);
  } else {
    if(DEBUG_WEATHER){
      return 1;
    } else {
      return 0;
    }
  }
}

function weatherTypePercent(value) {
  if (!DEBUG_MODE) {
    if (value == undefined)
        var value = true;
    if (value)
        return Math.floor(1000 * (0.5 * Math.cos(1.1 * Date.now() / WEATHER_TYPE_TIME))) / 1000;
    else
        return Math.floor(1000 * (-0.5 * Math.cos(1.1 * Date.now() / WEATHER_TYPE_TIME))) / 1000;
  } else {
    if(DEBUG_WEATHER_TYPE){
      return 1;
    } else {
      return 0;
    }
  }
}

function debugStats(){
    text("currentTime: " + dayPercent(), 25, 80,"12px monospace", "white");
    text("weatherAmount: " + (weatherTimerPercent(true)*WEATHER_MAX_PARTICLES), 25, 100,"12px monospace", "white");
    text("weatherType: " + weatherTypePercent(), 25, 120,"12px monospace", "white");
}

//Import all of the image and sound assets required
function importAssets() {
    tunnelTop = new Image();
    tunnelTop.src = "images/pipeTop.png";

    tunnelBottom = new Image();
    tunnelBottom.src = "images/pipeBottom2.png";

    lavaBackground = new Image();
    lavaBackground.src = "images/lava.gif";

    plantImage = new Image();
    plantImage.src = "images/deadlyPlant5.png";

    grassImage = new Image();
    grassImage.src = "images/grass2.png";

    woodTrack = new Image();
    woodTrack.src = "images/woodenPlank5.png";

    graval = new Image();
    graval.src = "images/graval.png";

    darknessImage = new Image();
    darknessImage.src = "images/darkness4.svg";

    rainSound = new Audio("sounds/rain.mp3");
    rainSound.loop = true;
    rainSound.play();
    rainSound.volume = 0;
}