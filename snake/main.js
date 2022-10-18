// GLOBAL VARIABLES

let cnv = document.getElementById("gameCnv");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 600;
ctx.font = "40px Helvetica";
ctx.textAlign = "center";
const fps = 10;
let scoreOut = document.getElementById("scoreOut");

// OBJECTS

let player = {
  w: 25,
  h: 25,
  xSpeed: 0,
  ySpeed: 0,
  speed: 25,
  alive: true,
  length: 1,
};

let segments = [
  { x: 300, y: 300 },
  { x: 275, y: 300 },
  { x: 250, y: 300 },
];

let storedCoords = [];

let nextPrize = {
  x: 0,
  y: 0,
};

let safeBounds = {
  xmin: 0,
  xmax: cnv.width - player.w,
  ymin: 0,
  ymax: cnv.height - player.h,
};

ranPrize();

// animate
requestAnimationFrame(animate);
function animate() {
  movePlr();
  segments.forEach(checkPrize);

  clearCnv("white");
  drawPlr();
  drawPrize();

  // set framerate to fps
  setTimeout(() => {
    if (player.alive) requestAnimationFrame(animate);
    else {
      clearCnv("red");
      ctx.fillStyle = "white";
      ctx.fillText("Game Over", cnv.width / 2, cnv.height / 2);
    }
  }, 1000 / fps);
}

// HELPER FUNCTIONS

// key listener
document.addEventListener("keydown", keyPressHandler);
function keyPressHandler(event) {
  if (player.alive && !event.repeat) {
    if (event.key == "w" || event.key == "ArrowUp")
      changeSpeed(0, -player.speed);
    else if (event.key == "a" || event.key == "ArrowLeft")
      changeSpeed(-player.speed, 0);
    else if (event.key == "s" || event.key == "ArrowDown")
      changeSpeed(0, player.speed);
    else if (event.key == "d" || event.key == "ArrowRight")
      changeSpeed(player.speed, 0);
    else if (event.key == "q") changeSpeed(0, 0);
  }
}

// change player speed to xs, ys
function changeSpeed(xs, ys) {
  player.xSpeed = xs;
  player.ySpeed = ys;
}

// randomize nextPrize location
function ranPrize() {
  nextPrize.x = randomMul(0, cnv.width - 25, 25);
  nextPrize.y = randomMul(0, cnv.height - 25, 25);
}

function killPlr() {
  player.alive = false;
}

// check if player is touching prize -> update length + score, randomize new prize
function checkPrize(segment) {
  if (segment.x === nextPrize.x && segment.y === nextPrize.y) {
    ranPrize();
    player.length++;
    scoreOut.innerHTML = player.length - 1;
  }
}

function newSegment(x, y) {
  return {
    x: x,
    y: y,
  };
}

// ANIMATE FUNCTIONS

// draw prize at nextPrize location
function drawPrize() {
  ctx.fillStyle = "lime";
  ctx.fillRect(nextPrize.x, nextPrize.y, 25, 25);
}

// clear canvas by drawing white over all
function clearCnv(clr) {
  ctx.fillStyle = clr;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

// draw player at player location
function drawPlr() {
  segments.forEach(function (segment) {
    ctx.fillStyle = "black";
    ctx.fillRect(segment.x, segment.y, player.w, player.h);
  });
}

// move player if within safeBounds + going correct direction if on edge
function movePlr() {
  if (
    segments[0].x > safeBounds.xmin &&
    segments[0].x < safeBounds.xmax &&
    player.xSpeed != 0
  )
    moveSeg();
  else if (segments[0].x >= safeBounds.xmax && player.xSpeed < 0) moveSeg();
  else if (segments[0].x <= safeBounds.xmin && player.xSpeed > 0) moveSeg();
  else if (player.xSpeed != 0) killPlr();

  if (
    segments[0].y > safeBounds.ymin &&
    segments[0].y < safeBounds.ymax &&
    player.ySpeed != 0
  )
    moveSeg();
  else if (segments[0].y >= safeBounds.ymax && player.ySpeed < 0) moveSeg();
  else if (segments[0].y <= safeBounds.ymin && player.ySpeed > 0) moveSeg();
  else if (player.ySpeed != 0) killPlr();
}

function moveSeg() {
  segments.unshift(
    newSegment(segments[0].x + player.xSpeed, segments[0].y + player.ySpeed)
  );
  segments.pop();
}
