// global variables
const game = {
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
  let adjacentMines = 0;
  tiles.push({ x, y, mine, color, adjacentMines });
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
  let exclusionIndex = findTileIndexFromCoords(
    tileExclusion.x,
    tileExclusion.y
  );
  let mineIndex = randomInt(0, tiles.length);
  if (mineIndex === exclusionIndex) {
    generateMine(tileExclusion);
  } else {
    tiles[mineIndex].mine = true;
  }
}

function tileClicked(clickedTile) {
  if (findTileFromCoords(clickedTile.x, clickedTile.y).mine === true)
    revealMines();
  else checkTile(clickedTile);
}

function findTileFromCoords(x, y) {
  return tiles.find((item) => item.x === x && item.y === y);
}

function findTileIndexFromCoords(x, y) {
  return tiles.findIndex((item) => item.x === x && item.y === y);
}

function revealMines() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].mine === true) tiles[i].color = "red";
  }
  drawGame();
}

function checkTile(tileToCheck) {
  const adjacentTiles = [];
  for (let n = 1; n <= 8; n++) {
    let thisTile = getAdjacent(tileToCheck, n);
    if (thisTile === "no tile") continue;
    else adjacentTiles.push(thisTile);
  }
  let adjacentMineCount = 0;
  for (let i = 0; i < adjacentTiles.length; i++) {
    if (adjacentTiles[i].mine == true) adjacentMineCount++;
  }
  tiles[findTileIndexFromCoords(tileToCheck.x, tileToCheck.y)].adjacentMines =
    adjacentMineCount;
  console.log(findTileFromCoords(tileToCheck.x, tileToCheck.y));
}

// return tile from direction -- direction numbers are like clock
function getAdjacent(tile, dir) {
  let adjacentTile = {
    x: tile.x,
    y: tile.y,
  };
  if (dir === 1) {
    // up
    adjacentTile.y--;
  } else if (dir === 2) {
    // up right
    adjacentTile.x++;
    adjacentTile.y--;
  } else if (dir === 3) {
    // right
    adjacentTile.x++;
  } else if (dir === 4) {
    // down right
    adjacentTile.x++;
    adjacentTile.y++;
  } else if (dir === 5) {
    // down
    adjacentTile.y++;
  } else if (dir === 6) {
    // down left
    adjacentTile.x--;
    adjacentTile.y++;
  } else if (dir === 7) {
    // left
    adjacentTile.x--;
  } else if (dir === 8) {
    // up left
    adjacentTile.x--;
    adjacentTile.y--;
  }
  if (
    adjacentTile.x < 1 ||
    adjacentTile.x > game.tilesX ||
    adjacentTile.y < 1 ||
    adjacentTile.y > game.tilesY
  )
    return "no tile";
  else return findTileFromCoords(adjacentTile.x, adjacentTile.y);
}
