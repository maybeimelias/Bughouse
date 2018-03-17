var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

var border = 5;
var timeControl = 10;

var t1p1 = timeControl;
var t1p2 = timeControl;
var t2p1 = timeControl;
var t2p2 = timeControl;

drawClocks();

setInterval(updateClocks, 1000);

function updateClocks() {
  if (t1p1 > 0) t1p1--;
  if (t1p2 > 0) t1p2--;
  if (t2p1 > 0) t2p1--;
  if (t2p2 > 0) t2p2--;
  
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
 
  var minutes = parseInt(clock / 60, 10);
  var seconds = parseInt(clock % 60, 10);
  
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  var time = minutes + ":" + seconds;

  ctx.fillStyle = "#aaa";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "black";
  ctx.font = canvas.width * 0.10 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(time, x + w / 2, y + h / 2);
}
