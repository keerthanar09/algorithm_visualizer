let values = [];
let i = 0;
let j = 0;
let swapped = false;
function setup() {
  createCanvas(400, 400);
  frameRate(1); 
  values = Array.from({ length: 5 }, () => random(height*0.6));
}
function draw() {
  background(220);

  for (let k = 0; k < values.length; k++) {
    stroke(0);
    if (k === j || k === j + 1) {
      fill(255, 0, 0); 
    } else {
      fill(100, 150, 255);
    }
    rect(k * (width / values.length), height - values[k], width / values.length - 5, values[k]);
  }
  if (i < values.length) {
    if (j < values.length - i - 1) {
      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        swapped = true;
      }
      j++;
    } else {
      if (!swapped) {
        noLoop(); 
      }
      j = 0;
      swapped = false;
      i++;
    }
  } else {
    noLoop(); 
  }
}