/*
  printer.js is a simple JavaScript library created by Trevor Clarke.
  this library was used with permission from Trevor Clarke and 
  was used to make drawing to the HTML5 canvas easier. 

  This library can be found at:
  https://github.com/trevor-clarke/printer.js
*/

window.onload = printerSetup;
var width, height, c, canvas, interval;
mouseX = 0;
mouseY = 0;
mouseDown = false;

function printerSetup() {
  canvas = document.createElement("CANVAS");
  c = canvas.getContext("2d");
  document.body.appendChild(canvas);

  canvas.onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  canvas.onmousedown = function () {
    mouseDown = true;
  }
  canvas.onmouseup = function () {
    mouseDown = false;
  }

  // mobile touches
  canvas.ontouchmove = function (event) {
    mouseX = event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX;
    mouseY = event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY;
  }
  canvas.ontouchstart = function() {
    mouseDown = true;
  }
  canvas.ontouchend = function () {
    mouseDown = false;
  }

  printerSizeCanvas();
  setupCSS();
  setup();
  draw();
  interval = setInterval(draw, 20);
}
function printerSizeCanvas() {
  width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  canvas.height = height;
  canvas.width = width;
}
function setupCSS() {
  document.body.style.overflow = "hidden";
  canvas.style.position = "absolute";
  canvas.style.height = "100%";
  canvas.style.width = "100%";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.float = "left";
}
window.onresize = function () {
  printerSizeCanvas();
  setup();
  draw();
};
// Helper functions
function random(a, b) {
  if (b == undefined) {
    b = a;
    a = 0;
  }
  return Math.random() * (b - a) + a;
}
function circle(x, y, s, w, colour) {
  c.strokeStyle = colour;
  c.lineWidth = w;
  c.beginPath();
  c.arc(x, y, s, 0, 2 * Math.PI);
  c.stroke();
}
function circleFill(x, y, s, colour) {
  c.fillStyle = colour;
  c.beginPath();
  c.arc(x, y, s, 0, 2 * Math.PI);
  c.fill();
}
function rect(x, y, h, w, colour, width) {
  if (colour == undefined)
    colour = "black"
  if (width == undefined)
      width = "2"
  c.strokeStyle = colour;
  c.lineWidth = width;
  c.beginPath();
  c.rect(x, y, h, w);
  c.stroke();
}
function rectFill(x, y, h, w, colour) {
  if (colour == undefined)
    colour = "black";
  c.strokeStyle = colour;
  c.fillStyle = colour;
  c.lineWidth = "4";
  c.beginPath();
  c.fillRect(x, y, h, w);
  c.stroke();
}
function line(x, y, x2, y2, w, colour) {
  if (w != undefined)
    c.lineWidth = w + "";
  if (colour != undefined)
    c.strokeStyle = colour + "";
  else {
    c.strokeStyle = "black";
  }
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x2, y2);
  c.stroke();
}
function text(text, x, y, f, colour) {
  if (x == undefined || y == undefined) {
    x = 0;
    y = 0;
  }
  if (f == undefined || c == undefined) {
    f = "10px monospace";
    colour = "black";
  }
  c.fillStyle = colour + "";
  c.font = f + "";
  c.fillText(text + "", x, y);
}
function clearCanvas() {
  c.clearRect(0, 0, width, height);
}
function mouse() {
  return { x: mouseX, y: mouseY, down: mouseDown };
}
function randomColour() {
  var r = Math.floor(Math.random() * 150) + 105;
  var g = Math.floor(Math.random() * 150) + 105;
  var b = Math.floor(Math.random() * 150) + 105;
  return "rgb(" + r + "," + g + "," + b + ")";
}
function screen() {
  height = window.innerHeight;
  width = window.innerWidth;
  return ({ height: height, width: width });
}
function log(msg) {
  console.log(msg);
}
function print(msg) {
  console.log(msg);
}
function crossVec(a, b) {
  var r1 = a[1] * b[2] - a[2] * b[1];
  var r2 = a[2] * b[0] - a[0] * b[2];
  var r3 = a[0] * b[1] - a[1] * b[0];
  return [r1, r2, r3];
}
function subVec(a, b) {
  return [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
}
function getDistance(a, b) {
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}
function lineAtAngle(x, y, angle, length, w, colour) {
  angle -= 90;
  x2 = x + Math.cos(radians(angle)) * length;
  y2 = y + Math.sin(radians(angle)) * length;
  this.line(x, y, x2, y2, w, colour);
}
function radians(deg) {
  return ((2 * Math.PI) / 360) * deg;
}
function drawImage(x, y, imageObj, width, height) {
  c.drawImage(imageObj, x, y, width, height);
}
function drawImageRepeat (imageObj, imgwidth, imgheight, ) {
  for (var i = 0; i < width; i += imgwidth) {
    for (var j = 0; j < height; j  += imgheight) {
        c.drawImage(imageObj, i, j,imgwidth,imgheight);
    }
  }
}
function getTextWidth(text, font) {
  c.font = font;
  return c.measureText(text).width;
}
