// Michael
// Color Zones - Gallery Edition
// Instructions: Click to start. Hold mouse to paint.
//               Move mouse left/right to change colors.
//               Press UP arrow to increase brush size.
//               Press DOWN arrow to decrease brush size.
//               Press C for circle brush, B for rectangle brush, V for line brush.
//               Press S to save painting and go to gallery.
//               Press N in gallery to paint a new one.
//               Press R in gallery to restart from beginning.

let state = 0;
let brushSize = 40;
let brushShape = 'circle';
let c;
let strokes = [];
let savedPaintings = [];

class Brush {
  constructor(x, y, size, col, shape) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.shape = shape;
  }

  display() {
    fill(this.col);
    stroke(this.col);
    strokeWeight(this.size / 10);
    if (this.shape === 'circle') {
      noStroke();
      ellipse(this.x, this.y, this.size, this.size);
    } else if (this.shape === 'rectangle') {
      noStroke();
      rect(this.x, this.y, this.size, this.size);
    } else if (this.shape === 'line') {
      line(this.x, this.y, this.x + this.size, this.y + this.size);
      noStroke();
    }
  }

  displaySmall(offsetX, offsetY, scale) {
    fill(this.col);
    stroke(this.col);
    strokeWeight((this.size / 10) * scale);
    if (this.shape === 'circle') {
      noStroke();
      ellipse(
        offsetX + this.x * scale,
        offsetY + this.y * scale,
        this.size * scale,
        this.size * scale
      );
    } else if (this.shape === 'rectangle') {
      noStroke();
      rect(
        offsetX + this.x * scale,
        offsetY + this.y * scale,
        this.size * scale,
        this.size * scale
      );
    } else if (this.shape === 'line') {
      line(
        offsetX + this.x * scale,
        offsetY + this.y * scale,
        offsetX + (this.x + this.size) * scale,
        offsetY + (this.y + this.size) * scale
      );
      noStroke();
    }
  }
}

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
  text('Color Zones', 200, 150);
  textSize(14);
  text('click to start', 200, 200);
  text('UP/DOWN arrows change brush size', 200, 225);
  text('C = circle  B = rectangle  V = line', 200, 250);
  text('S = save to gallery', 200, 275);
}

function drawCanvas() {
  background(255);
  if (mouseX < 133) {
    c = color(255, 100, 100);
  } else if (mouseX < 266) {
    c = color(100, 255, 100);
  } else {
    c = color(100, 100, 255);
  }
  for (let i = 0; i < strokes.length; i++) {
    strokes[i].display();
  }
  fill(0);
  textSize(12);
  textAlign(LEFT);
  noStroke();
  text('saved: ' + savedPaintings.length + '/3', 10, 20);
  textAlign(CENTER);
  text('shape: ' + brushShape, 200, 15);
  text('press S to save', 200, 390);
}

function drawGallery() {
  background(220);
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text('Your Gallery', 200, 30);

  let thumbSize = 0.28;
  let positions = [
    { x: 10, y: 50 },
    { x: 145, y: 50 },
    { x: 280, y: 50 }
  ];

  for (let i = 0; i < savedPaintings.length; i++) {
    fill(255);
    noStroke();
    rect(positions[i].x, positions[i].y, 110, 110);
    for (let j = 0; j < savedPaintings[i].length; j++) {
      savedPaintings[i][j].displaySmall(
        positions[i].x,
        positions[i].y,
        thumbSize
      );
    }
    fill(0);
    noStroke();
    textSize(11);
    text('painting ' + (i + 1), positions[i].x + 55, positions[i].y + 125);
  }

  textSize(14);
  textAlign(CENTER);
  if (savedPaintings.length < 3) {
    text('press N to paint a new one', 200, 310);
  } else {
    text('gallery full!', 200, 310);
  }
  text('press R to restart from beginning', 200, 340);

  let i = 0;
  while (i < 3) {
    if (i < savedPaintings.length) {
      fill(0);
    } else {
      fill(180);
    }
    noStroke();
    ellipse(170 + i * 30, 370, 10, 10);
    i++;
  }
}

function mouseDragged() {
  if (state === 1) {
    let x = mouseX + random(-10, 10);
    let y = mouseY + random(-10, 10);
    let b = new Brush(x, y, brushSize, c, brushShape);
    strokes.push(b);
  }
}

function mousePressed() {
  if (state === 0) {
    state = 1;
    background(255);
  }
}

function keyPressed() {
  if (state === 1) {
    if (keyCode === UP_ARROW) {
      brushSize = brushSize + 5;
    } else if (keyCode === DOWN_ARROW) {
      if (brushSize > 5) {
        brushSize = brushSize - 5;
      }
    } else if (key === 's' || key === 'S') {
      if (savedPaintings.length < 3) {
        savedPaintings.push(strokes.slice());
      }
      strokes = [];
      brushShape = 'circle';
      state = 2;
    } else if (key === 'c' || key === 'C') {
      brushShape = 'circle';
    } else if (key === 'b' || key === 'B') {
      brushShape = 'rectangle';
    } else if (key === 'v' || key === 'V') {
      brushShape = 'line';
    }
  } else if (state === 2) {
    if (key === 'n' || key === 'N') {
      if (savedPaintings.length < 3) {
        strokes = [];
        brushSize = 40;
        brushShape = 'circle';
        state = 1;
      }
    } else if (key === 'r' || key === 'R') {
      strokes = [];
      savedPaintings = [];
      brushSize = 40;
      brushShape = 'circle';
      state = 0;
    }
  }
}
