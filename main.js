var trains, hobos, numTracks, numTrains, width, height, gameWidth, gameMargin, trackWidth, checkDeath, trackGap, paused, mousePreviouslyClicked, trackMovement, plantPositions, grassPositions,  weatherInstance;

//Define assets such as images and audio
var rainSound, tunnelTop, tunnelBottom, lavaBackground, plantImage, grassImage, treeBackground, woodTrack, graval, darknessImage;

// SETUP FUNCTION - Resets all variables, can be called to reset the game
function setup() {
  // Define the number of tracks, this can be changed without breaking the code
  numTracks = NUM_TRACKS;
  numTrains = NUM_TRAINS;
  numOtherHobos = OTHER_HOBOS;

  // Determine values based on numtracks
  hoboTrack = Math.floor(Math.random() * numTracks);
  width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  gameWidth = Math.min(width * 0.8, MAX_WIDTH);
  gameMargin = (width - gameWidth) / 2;

  trackWidth = gameWidth / numTracks;
  trackGap = (trackWidth / 5);
  trackMovement = 0;

  // Define default values
  paused = false;
  mousePreviouslyClicked = false;
  checkDeath = false;

  // trains is an array to allow for possible, future expansion
  trains = [];
  for (var i = 0; i < numTrains; i++) {
    trains.push(new Train(gameMargin, trackWidth, height, numTracks));
  }

  hobos = [];
  hobos.push(new Hobo(true, hoboTrack, trackWidth, gameMargin, height, width));
  for (var i = 0; i < numOtherHobos; i++) {
    hobos.push(new Hobo(false, Math.floor(Math.random() * numTracks), trackWidth, gameMargin, height, width));
  }

  importAssets();
  generateBackgroundPositions();
  weatherInstance = new Weather(gameMargin, trackWidth, height, width);
}

// DRAW FUNCTION - Gets called by printer.js every 20 milliseconds,
// coordinates all animations and updates
function draw() {

  // Draw default base elements, clear previous animation frame
  clearCanvas();
  drawGround();
  drawTracks();

  // Check to see if the pause button is being pressed
  checkForPause();
  if (!paused) {
    drawTunnelBottom();
    //These attributes should only occur if NOT paused
    for (var i = 0; i < trains.length; i++) {
      trains[i].update();
      trains[i].show();
    }
    drawTunnelTop();
    for (var i = 0; i < hobos.length; i++) {
      hobos[i].update();
      hobos[i].show();
    }

    
  }
  

  

  // hobo.show also displays end screen if hobo is dead
  weatherInstance.show(hobos[0].getX()-35, hobos[0].getY()+35);
  
  weatherInstance.update();
  hobos[0].darkenHoboVision();

  drawGUI();
  hobos[0].showHoboGUI();

  if(DEBUG_STATS)
      debugStats();
}
