// Gets the track number closest to the given x coordinate
// Note: this function does not take the navbar into account

// GETTRACK - Using X coordinate, gets Train Track Number Mouse is hovered over
function getTrack(xCoor) {
  // Calculate what track the mouse is hovered over based on X coord
  return Math.floor((xCoor - gameMargin) / trackWidth);
}

// GETCENTEROFTRACK - Gets the center position of the track
function getCenterOfTrack(trackNumber) {
  return this.gameMargin + (trackNumber * this.trackWidth) + (0.5 * this.trackWidth);
}

// DRAWTRACKS - Generates 5 traintracks using printer.js functions
function drawTracks() {
  for (var i = 0; i < numTracks; i++) {
    rectFill((i * trackWidth) + trackGap + gameMargin, 0, trackWidth - (trackGap * 2), height, "gray");//#8B4513

    //drawImageRepeat (grassImage, (i * trackWidth) + trackGap + gameMargin, imgheight)
    //Draw the horizontal slats in the track

    var gravalWidth = trackWidth - (2 * trackGap);
    for (var j = 0; j < height; j += gravalWidth) {
      var xPos = (i * trackWidth) + trackGap + gameMargin;
      var yPos = j;
      drawImage(xPos, yPos, graval, gravalWidth / 2, gravalWidth / 2);
      drawImage(xPos + gravalWidth / 2, yPos, graval, gravalWidth / 2, gravalWidth / 2);
      drawImage(xPos, yPos + gravalWidth / 2, graval, gravalWidth / 2, gravalWidth / 2);
      drawImage(xPos + gravalWidth / 2, yPos + gravalWidth / 2, graval, gravalWidth / 2, gravalWidth / 2);

    }

    for (var j = 0; j < height; j += 45) {
      var xPos = (i * trackWidth) + trackGap / 2 + gameMargin;
      var yPos = (j + trackMovement) % height;
      //rectFill(xPos, yPos, trackWidth - trackGap, 10, "#8B4513");
      drawImage(xPos, yPos, woodTrack, trackWidth - trackGap, 25);
    }
    line((i * trackWidth) + trackGap + gameMargin, 0, (i * trackWidth) + trackGap + gameMargin, height, 4, "#B0B0B0");
    line(((i + 1) * trackWidth) - trackGap + gameMargin, 0, ((i + 1) * trackWidth) - trackGap + gameMargin, height, 4, "#B0B0B0");
  }
  // The following code give the illusion that the tracks are moving, not required, thus commented out
  // trackMovement+= 0.2;
}

// DRAWTUNNEL - Draws the grey tunnels at the start of the tracks
function drawTunnelTop() {
  for (var i = 0; i < numTracks; i++) {
    drawImage((i * trackWidth) + trackGap / 8 + gameMargin, 60, tunnelTop, trackWidth - trackGap / 4, 75);
  }
}

function drawTunnelBottom() {
  for (var i = 0; i < numTracks; i++) {
    drawImage((i * trackWidth) + trackGap / 8 + gameMargin, 60, tunnelBottom, trackWidth - trackGap / 4, 70);
  }
}

// DRAWGROUND - Draws the big green grassy background for the game
function drawGround() {
  rectFill(0, 0, window.innerWidth, window.innerHeight, "green");//#C19A6B

  // for(var i = 0; i< plantPositions.length; i++){
  //   drawImage(plantPositions[i].x, plantPositions[i].y, plantImage, 200, 200);
  // }
  for (var i = 0; i < grassPositions.length; i++) {
    drawImage(grassPositions[i].x, grassPositions[i].y, grassImage, 30, 30);
  }
}

function getTrackHobos(currentHoboTrack){
  var theHobos = [];
  for(var i = 0; i<hobos.length; i++){
    if(hobos[i].getTrackNumber() == currentHoboTrack && hobos[i].health > 0 && hobos[i].isPlayable == false){
      theHobos.push(hobos[i]);
    }
  }
  return theHobos;
}