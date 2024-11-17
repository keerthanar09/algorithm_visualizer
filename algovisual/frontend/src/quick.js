let values = [];
let states = [];
let w;

function setup() {
  createCanvas(600, 400);
  w = width / 5; 
  for (let i = 0; i < 5; i++) {
    values.push(floor(random(50, height))); 
    states.push(0); 
  }
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    if (start >= 0 && start < arr.length) states[start] = 2; 
    return;
  }
  let pivotIndex = await partition(arr, start, end);
  states[pivotIndex] = 2; 
  await Promise.all([
    quickSort(arr, start, pivotIndex - 1),
    quickSort(arr, pivotIndex + 1, end),
  ]);
}
async function partition(arr, start, end) {
  let pivotValue = arr[end];
  let pivotIndex = start;
  states[end] = 1; 
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(arr, pivotIndex, end);
  states[end] = 0; 
  return pivotIndex;
}
async function swap(arr, a, b) {
  await sleep(800); 
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function draw() {
  background(220);
  for (let i = 0; i < values.length; i++) {
    stroke(0);
    if (states[i] === 0) fill(128); 
    else if (states[i] === 1) fill(255, 0, 0); 
    else fill(0, 255, 0);
    rect(i * w, height - values[i], w - 2, values[i]);
  }
}