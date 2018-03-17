var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

var border = 5;
var timeControl = 10;

var t1p1 = { time: timeControl, active: true };
var t1p2 = { time: timeControl };
var t2p1 = { time: timeControl };
var t2p2 = { time: timeControl };

drawClocks();

setInterval(updateClocks, 1000);

function updateClocks() {
  if (t1p1.time > 0 && t1p1.active) t1p1.time--;
  if (t1p2.time > 0 && t1p2.active) t1p2.time--;
  if (t2p1.time > 0 && t2p1.active) t2p1.time--;
  if (t2p2.time > 0 && t2p2.active) t2p2.time--;
  
  drawClocks();
}

function drawClocks() {
	var width = canvas.width / 2 - 2 * border;
  var height = canvas.height / 2 - 2 * border;

  drawClock(t1p1, border, border, width, height, 180);
	drawClock(t1p2, canvas.width / 2 + border, border, width, height, 180);
	drawClock(t2p1, border, canvas.height / 2 + border, width, height, 0);
	drawClock(t2p2, canvas.width / 2 + border, canvas.height / 2 + border, width, height, 0);
}
  
function drawClock(clock, x, y, w, h, r) {
  var minutes = parseInt(clock.time / 60, 10);
  var seconds = parseInt(clock.time % 60, 10);
  
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  var text = minutes + ":" + seconds;

  ctx.fillStyle = "lightgray";
  if (clock.active) ctx.fillStyle = "green";
  if (clock.time === 0) ctx.fillStyle = "red";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "black";
  ctx.font = canvas.width * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, x + w / 2, y + h / 2);
}
