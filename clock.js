var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
canvas.addEventListener('mousedown', clickHandler);

var timeControl = parseInt(prompt("Time control", "5"), 10) * 60;
var increment = parseInt(prompt("Increment", "0"), 10);
var clocks = setupClocks(timeControl);

drawClocks();
setInterval(updateClocks, 1000);

function setupClocks(timeControl) {
  var border = 5;
  var width = canvas.width / 2 - 2 * border;
  var height = canvas.height / 2 - 2 * border;

  var team1_player1 = { team: 1, time: timeControl, active: false, moveCount: 0, x: border, y: border, width: width, height: height };
  var team1_player2 = { team: 1, time: timeControl, active: false, moveCount: 0, x: canvas.width / 2 + border, y: border, width: width, height: height };
  var team2_player1 = { team: 2, time: timeControl, active: false, moveCount: 0, x: border, y: canvas.height / 2 + border, width: width, height: height };
  var team2_player2 = { team: 2, time: timeControl, active: false, moveCount: 0, x: canvas.width / 2 + border, y: canvas.height / 2 + border, width: width, height: height };

  team1_player1.partner = team1_player2;
  team1_player2.partner = team1_player1;
  team2_player1.partner = team2_player2;
  team2_player2.partner = team2_player1;

  team1_player1.opponent = team2_player1;
  team2_player1.opponent = team1_player1;
  team1_player2.opponent = team2_player2;
  team2_player2.opponent = team1_player2;
  
  return [team1_player1, team1_player2, team2_player1, team2_player2];
}

function clickHandler(e) {
  if (gameOver()) return;
  
  var clock = getClickedClock(e);
  if (clock && clockCanBeClicked(clock)) {
    if (clock.active) clock.time += increment;
    
    clock.active = false;
    clock.opponent.active = true;
    
    clock.moveCount++;
    clock.partner.moveCount = 0;
      
    drawClocks();
    if (isPaused(clock)) beep(100);
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
  return (clock.active || (!clock.active && !clock.opponent.active)) && !isPaused(clock);
}

function updateClocks() {
  if (gameOver()) return;

  updateActiveClocks();
  drawClocks();
  if (gameOver()) {
    beep(200, function() { beep(200, function() { beep(200); }) });
  }
}

function updateActiveClocks() {
  clocks.forEach(function(clock) { if (isActive(clock)) clock.time--; });
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
  return clock.active && !isPaused(clock) && !gameOver();
}

function isPaused(clock) {
  return (clock.moveCount > 3 || clock.opponent.moveCount > 3) && !gameOver();
}

function isLost(clock) {
  return clock.time === 0 || clock.partner.time === 0;
}
  
function drawClock(clock, x, y, w, h) {
  ctx.fillStyle = "lightgray";
  if (isActive(clock)) ctx.fillStyle = "green";
  if (isPaused(clock)) ctx.fillStyle = "yellow";
  if (isLost(clock)) ctx.fillStyle = "red";
  ctx.fillRect(clock.x, clock.y, clock.width, clock.height);
  
  ctx.fillStyle = "black";
  ctx.font = canvas.width * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.setTransform(1,0,0,1,0,0);
  ctx.transform(1,0,0,1, clock.x + clock.width / 2, clock.y + clock.height / 2);
  
  if (clock.team === 1) ctx.rotate(Math.PI);
  ctx.fillText(getTimeText(clock.time), 0, 0);
  ctx.setTransform(1,0,0,1,0,0);
}

var audioClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
var audioCtx = new audioClass();

function beep(duration, finishedCallback) {
  if (typeof finishedCallback != "function") {
    finishedCallback = function () {};
  }

  var osc = audioCtx.createOscillator();

  osc.connect(audioCtx.destination);
  if (osc.noteOn) osc.noteOn(0);
  if (osc.start) osc.start();

  setTimeout(function () {
    if (osc.noteOff) osc.noteOff(0);
    if (osc.stop) osc.stop();
    finishedCallback();
  }, duration);
};
