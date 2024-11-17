let values = [];
let i = 0, j = 0, minIndex;

function setup() {
  createCanvas(600, 400);
  values = Array.from({ length: 5 }, () => random(height));
  minIndex = i;
  frameRate(2); 
}
function draw() {
  background(220);
  for (let k = 0; k < values.length; k++) {
    if (k === i) fill(255, 0, 0); 
    else if (k === minIndex) fill(0, 255, 0); 
    else fill(100);
    rect(k * (width / values.length), height - values[k], width / values.length - 2, values[k]);
  }

  if (i < values.length) {
    if (j < values.length) {
      if (values[j] < values[minIndex]) {
        minIndex = j; 
      }
      j++;
    } else {
      [values[i], values[minIndex]] = [values[minIndex], values[i]];
      i++;
      j = i;
      minIndex = i;
    }
  } else {
    noLoop(); 
  }
}