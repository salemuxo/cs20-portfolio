let tilesX = 9;
let tilesY = 9;
let tilesTotal = tilesX * tilesY;

let cnv = document.getElementById("gameCnv");
let ctx = cnv.getContext("2d");
cnv.width = 450;
cnv.height = 450;

const tiles = [];
for (let n = 1; n <= tilesTotal; n++) {
  let y = Math.ceil(n / tilesX);
  let x = n - (y - 1) * 9;
  tiles.push({ y, x });
}
console.log(tiles);

drawGame();
function drawGame() {
  for (let i = 0; i < tiles.length; i++) {
    drawTile(tiles[i].x, tiles[i].y);
  }
}

function fillCanvas(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
}

function drawTile(x, y) {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "gray";
  ctx.fillRect((x - 1) * 50, (y - 1) * 50, 50, 50);
  ctx.strokeRect((x - 1) * 50, (y - 1) * 50, 50, 50);
}
