var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
canvas.addEventListener('click', clickHandler);

var timeControl = 10;
var increment = 1;
var clocks = setupClocks(timeControl);

drawClocks();
setInterval(updateClocks, 1000);

function setupClocks(timeControl) {
  var border = 5;
  var width = canvas.width / 2 - 2 * border;
  var height = canvas.height / 2 - 2 * border;

  var t1p1 = { time: timeControl, x: border, y: border, width: width, height: height };
  var t1p2 = { time: timeControl, x: canvas.width / 2 + border, y: border, width: width, height: height };
  var t2p1 = { time: timeControl, x: border, y: canvas.height / 2 + border, width: width, height: height };
  var t2p2 = { time: timeControl, x: canvas.width / 2 + border, y: canvas.height / 2 + border, width: width, height: height };

  t1p1.partner = t1p2;
  t1p2.partner = t1p1;
  t2p1.partner = t2p2;
  t2p2.partner = t2p1;

  t1p1.opponent = t2p1;
  t2p1.opponent = t1p1;
  t1p2.opponent = t2p2;
  t2p2.opponent = t1p2;

  return [t1p1, t1p2, t2p1, t2p2];
}

function clickHandler(e) {
  if (gameOver()) return;
  
  var clock = getClickedClock(e);
  if (clock && clockCanBeClicked(clock)) {
    if (clock.active) clock.time += increment;
    
    clock.active = false;
    clock.opponent.active = true;
      
    drawClocks();
  }
}

function getClickedClock(e) {
  return clocks.find(function(clock) { return clockHit(clock, e); });
}

function clockHit(clock, e) {
  var hit =
      clock.x <= e.clientX && clock.x + clock.width >= e.clientX &&
      clock.y <= e.clientY && clock.y + clock.height >= e.clientY;

  return hit;
};

function clockCanBeClicked(clock) {
  return clock.active || (!clock.active && !clock.opponent.active);
}

function updateClocks() {
  if (gameOver()) return;

  updateActiveClocks();
  drawClocks();
}

function updateActiveClocks() {
  clocks.forEach(function(clock) { if (clock.active) clock.time--; });
}

function drawClocks() {
  clocks.forEach(function(clock) { drawClock(clock); });
}
  
function getTimeText(time) {
  var minutes = parseInt(time / 60, 10);
  var seconds = parseInt(time % 60, 10);
  
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  return minutes + ":" + seconds;
}

function gameOver() {
  return clocks.find(function(clock) { return isLost(clock); });
}

function isActive(clock) {
  return clock.active && !gameOver();
}

function isLost(clock) {
  return clock.time === 0 || clock.partner.time === 0;
}
  
function drawClock(clock, x, y, w, h) {
  ctx.fillStyle = "lightgray";
  if (isActive(clock)) ctx.fillStyle = "green";
  if (isLost(clock)) ctx.fillStyle = "red";
  ctx.fillRect(clock.x, clock.y, clock.width, clock.height);
  
  ctx.fillStyle = "black";
  ctx.font = canvas.width * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(getTimeText(clock.time), clock.x + clock.width / 2, clock.y + clock.height / 2);
}
