// Michael
// Color Zones
// Instructions: Click to start. Hold mouse to paint.
//               Move mouse left/right to change colors.
//               Press any key when done to see your artwork.
//               Press any key on gallery screen to start over.

let state = 0;
let brushSize = 40;
let c;

function setup() {
  createCanvas(400, 400);
  background(255);
  noStroke();
}

function draw() {
  if (state === 0) {
    drawMenu();
  } else if (state === 1) {
    drawCanvas();
  } else if (state === 2) {
    drawGallery();
  }
}

function drawMenu() {
  background(220);
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text('Color Zones', 200, 200);
  textSize(16);
  text('click to start', 200, 250);
}

function drawCanvas() {
  if (mouseX < 133) {
    c = color(255, 100, 100);
  } else if (mouseX < 266) {
    c = color(100, 255, 100);
  } else {
    c = color(100, 100, 255);
  }
  if (mouseIsPressed) {
    fill(c);
    let x = mouseX + random(-10, 10);
    let y = mouseY + random(-10, 10);
    ellipse(x, y, brushSize, brushSize);
  }
}

function drawGallery() {
  fill(255);
  rect(75, 155, 250, 90);
  fill(0);
  textSize(32);
  textAlign(CENTER);
  text('Your Artwork!', 200, 190);
  textSize(16);
  text('press any key to start over', 200, 225);
}

function mousePressed() {
  if (state === 0) {
    state = state + 1;
    background(255);
  }
}

function keyPressed() {
  if (state === 1) {
    state = state + 1;
  } else if (state === 2) {
    state = 0;
    background(255);
  }
}