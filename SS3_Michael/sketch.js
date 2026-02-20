/* Michael
   Color Zones
   This sketch shows how location changes behavior. 
            The screen is split into three zones that change the 
            brush color and add random "noise" to the shape.
   Instructions: Move mouse to change colors. Hold mouse to jitter. 
                 Press any key to clear the screen.
*/

let brushSize = 40; // Variable 1
let c;              // Variable 2: will store the color

function setup() {
  createCanvas(600, 400);
  background(255);
  noStroke();
}

function draw() {
  if (mouseX < 200) {
    c = color(255, 100, 100); // Red zone
  } 
  else if (mouseX < 400) {
    c = color(100, 255, 100); // Green zone
  } 
  else {
    c = color(100, 100, 255); // Blue zone
  }

  if (mouseIsPressed) {
    fill(c);
    
    
    let x = mouseX + random(-10, 10);
    let y = mouseY + random(-10, 10);
    
    ellipse(x, y, brushSize, brushSize);
  }
}

function keyPressed() {
  background(255); 
}
