var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
canvas.addEventListener('click', clickHandler);

var ctx = canvas.getContext("2d");

var border = 5;
var timeControl = 10;

var width = canvas.width / 2 - 2 * border;
var height = canvas.height / 2 - 2 * border;

var t1p1 = { time: timeControl, x: border, y: border, width: width, height: height };
var t1p2 = { time: timeControl, x: canvas.width / 2 + border, y: border, width: width, height: height };
var t2p1 = { time: timeControl, x: border, y: canvas.height / 2 + border, width: width, height: height };
var t2p2 = { time: timeControl, x: canvas.width / 2 + border, y: canvas.height / 2 + border, width: width, height: height };

t1p1.active = true;

drawClocks();

setInterval(updateClocks, 1000);

function clickHandler(event) {
  console.log(event);
  
  var region
}

function updateClocks() {
  if (t1p1.time > 0 && t1p1.active) t1p1.time--;
  if (t1p2.time > 0 && t1p2.active) t1p2.time--;
  if (t2p1.time > 0 && t2p1.active) t2p1.time--;
  if (t2p2.time > 0 && t2p2.active) t2p2.time--;
  
  drawClocks();
}

function drawClocks() {
  drawClock(t1p1);
	drawClock(t1p2);
	drawClock(t2p1);
	drawClock(t2p2);
}
  
function drawClock(clock, x, y, w, h) {
  var minutes = parseInt(clock.time / 60, 10);
  var seconds = parseInt(clock.time % 60, 10);
  
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  var text = minutes + ":" + seconds;

  ctx.fillStyle = "lightgray";
  if (clock.active) ctx.fillStyle = "green";
  if (clock.time === 0) ctx.fillStyle = "red";
  ctx.fillRect(clock.x, clock.y, clock.width, clock.height);
  ctx.fillStyle = "black";
  ctx.font = canvas.width * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, clock.x + clock.width / 2, clock.y + clock.height / 2);
}
