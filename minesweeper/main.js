// global variables
let game = {
  tilesX: 9,
  tilesY: 9,
  tilesTotal: 0,
  tileSize: 50,
  mineNum: 10,
  isStarted: false,
};

game.tilesTotal = game.tilesX * game.tilesY;

// create array with tiles
const tiles = [];
for (let n = 1; n <= game.tilesTotal; n++) {
  let y = Math.ceil(n / game.tilesX); // put tiles on correct row by finding number of tiles in row
  let x = n - (y - 1) * game.tilesX;
  let mine = false;
  let color = "grey";
  tiles.push({ x, y, mine, color });
}

// create canvas
let cnv = document.getElementById("gameCnv");
let ctx = cnv.getContext("2d");
// set size to number of tiles * size of tiles
cnv.width = game.tilesX * game.tileSize;
cnv.height = game.tilesY * game.tileSize;

// MAIN FUNCTIONS

drawGame();
function drawGame() {
  for (let i = 0; i < tiles.length; i++) {
    drawTile(tiles[i].x, tiles[i].y, tiles[i].color);
  }
}

// mouse click on playing field
cnv.onmousedown = function (ev) {
  let clickedTile = {
    x: Math.ceil(ev.layerX / game.tileSize),
    y: Math.ceil(ev.layerY / game.tileSize),
  };
  if (!game.isStarted) initCanvas(clickedTile);
  else tileClicked(clickedTile);
};

// HELPER FUNCTIONS

// fill full canvas with color
function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

// draw tile at (x, y) with color
function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "white";
  ctx.fillRect(
    (x - 1) * game.tileSize,
    (y - 1) * game.tileSize,
    game.tileSize,
    game.tileSize
  );
  ctx.strokeRect(
    (x - 1) * game.tileSize,
    (y - 1) * game.tileSize,
    game.tileSize,
    game.tileSize
  );
}

function initCanvas(firstTile) {
  for (let n = 1; n <= game.mineNum; n++) {
    generateMine(firstTile);
  }
  game.isStarted = true;
  tileClicked(firstTile);
}

function generateMine(tileExclusion) {
  let exclusionIndex = findTileIndexFromCoords(tileExclusion);
  let mineIndex = randomInt(0, tiles.length);
  if (mineIndex === exclusionIndex) {
    generateMine(tileExclusion);
  } else {
    tiles[mineIndex].mine = true;
  }
}

function tileClicked(tile) {
  if (findTileFromCoords(tile).mine === true) revealMines();
  else checkTile(tile);
}

function findTileFromCoords(tileToFind) {
  return tiles.find(
    (item) => item.x === tileToFind.x && item.y === tileToFind.y
  );
}

function findTileIndexFromCoords(tileToFind) {
  return tiles.findIndex(
    (item) => item.x === tileToFind.x && item.y === tileToFind.y
  );
}

function revealMines() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].mine === true) tiles[i].color = "red";
  }
  drawGame();
}

function checkTile(tile) {
  let borderX, borderY, corner;
  if (tile.x === 1 || tile.x === game.tilesX) borderX = true;
  if (tile.y === 1 || tile.y === game.tilesY) borderY = true;
  if (borderX === true && borderY === true) corner = true;

  let adjacentTiles = 8;
  if (corner) adjacentTiles -= 5;
  else if (borderX || borderY) adjacentTiles -= 3;
  console.log(adjacentTiles);

  for (n = 1; n <= adjacentTiles; n++) {}
}
