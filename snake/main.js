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

const player = {
  w: 25,
  h: 25,
  xSpeed: 25,
  ySpeed: 0,
  speed: 25,
  alive: true,
};

const snake = [{ x: 300, y: 300 }];

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
  moveSeg();
  if (isSnakeDead()) return;

  snake.forEach(checkPrize);

  clearCnv("white");
  drawPlr();
  drawPrize();

  // set framerate to fps
  setTimeout(() => {
    if (player.alive) requestAnimationFrame(animate);
  }, 1000 / fps);
}

// FUNCTIONS

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
  snake.forEach((segment) => {
    const snakeIsHere = segment.x == nextPrize.x && segment.y == nextPrize.y;
    if (snakeIsHere) ranPrize();
  });
}

// check if player is touching prize
function checkPrize(segment) {
  if (segment.x === nextPrize.x && segment.y === nextPrize.y) return true;
}

// return new object with x, y properties
function newSegment(x, y) {
  return {
    x: x,
    y: y,
  };
}

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
  snake.forEach(function (segment) {
    ctx.fillStyle = "black";
    ctx.fillRect(segment.x, segment.y, player.w, player.h);
  });
}

// check if snake has collided with itself or wall -> return false
function isSnakeDead() {
  for (let i = 4; i < snake.length; i++) {
    const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (collided) return true;
  }
  const hitLeft = snake[0].x < 0;
  const hitRight = snake[0].x > cnv.width - player.w;
  const hitTop = snake[0].y < 0;
  const hitBottom = snake[0].y > cnv.height - player.h;

  return hitLeft || hitRight || hitTop || hitBottom;
}

function moveSeg() {
  const head = newSegment(
    snake[0].x + player.xSpeed,
    snake[0].y + player.ySpeed
  );
  snake.unshift(head);
  if (checkPrize(head)) ranPrize();
  else snake.pop();
}

function addSeg() {
  snake.push(newSegment(snake[snake.length - 1].x));
}
