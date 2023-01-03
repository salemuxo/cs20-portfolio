// global variables
let tilesX = 9;
let tilesY = 9;
let tilesTotal = tilesX * tilesY;
let tileSize = 50;
let mineNum = 10;
let isGameStarted = false;

// create array with tiles
const tiles = [];
for (let n = 1; n <= tilesTotal; n++) {
  let y = Math.ceil(n / tilesX); // put tiles on correct row by finding number of tiles in row
  let x = n - (y - 1) * tilesX;
  let mine = false;
  tiles.push({ x, y, mine });
}

// create canvas
let cnv = document.getElementById("gameCnv");
let ctx = cnv.getContext("2d");
// set size to number of tiles * size of tiles
cnv.width = tilesX * tileSize;
cnv.height = tilesY * tileSize;

drawGame();
function drawGame() {
  for (let i = 0; i < tiles.length; i++) {
    drawTile(tiles[i].x, tiles[i].y);
  }
}

// fill full canvas with color
function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

// draw tile at (x, y) with color
function drawTile(x, y) {
  ctx.fillStyle = "grey";
  ctx.strokeStyle = "white";
  ctx.fillRect((x - 1) * tileSize, (y - 1) * tileSize, tileSize, tileSize);
  ctx.strokeRect((x - 1) * tileSize, (y - 1) * tileSize, tileSize, tileSize);
}

function initCanvas(firstTile) {
  for (let n = 1; n <= mineNum; n++) {
    generateMine(firstTile);
  }
}

function generateMine(tileExclusion) {
  let mineLocation = tiles[randomInt(0, tiles.length - 1)];
  if (
    mineLocation.x === tileExclusion.x &&
    mineLocation.y === tileExclusion.y
  ) {
    generateMine(tileExclusion);
  } else if (mineLocation.mine === true) {
    generateMine(tileExclusion);
  } else {
    mineLocation.mine = true;
  }
}

cnv.onmousedown = function (ev) {
  let tileClicked = {
    x: Math.ceil(ev.layerX / tileSize),
    y: Math.ceil(ev.layerY / tileSize),
  };
  if (!isGameStarted) initCanvas(tileClicked);
};
