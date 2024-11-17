let values = [];
let states = [];
let done = false;

function setup() {
  createCanvas(600, 400); 
  values = new Array(5).fill(0).map(() => random(height));
  states = new Array(values.length).fill(-1);
  
  mergeSort(values, 0, values.length - 1);
}

function draw() {
  background(255);
  for (let i = 0; i < values.length; i++) {
    if (states[i] === -1) fill(0);
    else if (states[i] === 0) fill(0, 0, 255); 
    else if (states[i] === 1) fill(0, 255, 0); 
    noStroke(); 
    rect(i * (width / values.length), height - values[i], width / values.length - 4, values[i]);
  }

  if (done) noLoop();
}

async function mergeSort(arr, start, end) {
  if (start >= end) {
    if (start >= 0) states[start] = 1; 
    return;
  }
  const mid = Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  
  let i = 0, j = 0, k = start;

  states[start] = 0; 

  while (i < left.length && j < right.length) {
    await sleep(1000); 
    if (left[i] < right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }

  while (i < left.length) {
    await sleep(1000);
    arr[k++] = left[i++];
  }

  while (j < right.length) {
    await sleep(1000);
    arr[k++] = right[j++];
  }

  if (start >= 0) {
    for (let l = start; l <= end; l++) states[l] = 1; 
  }

  if (start === 0 && end === arr.length - 1) done = true; 
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}