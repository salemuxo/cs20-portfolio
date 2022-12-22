// random library

// return random decimal between min (inclusive) and max (exclusive)
function randomDec(min, max) {
  return Math.random() * (max - min) + min;
}

// return random integer between min (inclusive) and max (exclusive)
function randomInt(min, max) {
  return Math.floor(randomDec(min, max));
}

// return random integer by interval (multiple of number)
function randomMul(min, max, interval) {
  return Math.round(randomDec(min, max) / interval) * interval;
}

// return random rgb colour 'rgb(__, __, __)'
function randomRGB() {
  return `rgb(${randomInt(0, 256)}. ${randomInt(0, 256)}. ${randomInt(
    0,
    256
  )})`;
}
