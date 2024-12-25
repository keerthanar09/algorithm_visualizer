let array = [];
const arrayContainer = document.getElementById("arrayContainer");
const messageDiv = document.getElementById("message");
function generateRandomSortedArray() {
  array = [];
  arrayContainer.innerHTML = "";
  messageDiv.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    array.push(randomNumber);
  }
  array.sort((a, b) => a - b);

  array.forEach((num, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.id = `box-${index}`;
    box.innerText = num;
    arrayContainer.appendChild(box);
  });
}
async function performBinarySearch() {
  const key = parseInt(document.getElementById("key").value);
  if (isNaN(key)) {
    messageDiv.innerHTML = `<span style="color: red;">Please enter a valid number!</span>`;
    return;
  }
  messageDiv.innerHTML = "";
  let left = 0;
  let right = array.length - 1;
  let found = false;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    highlightBox(mid, "highlight");
    await delay(1200); 
    if (array[mid] === key) {
      highlightBox(mid, "found");
      found = true;
      messageDiv.innerHTML = `<span style="color: green;">Key ${key} found at position ${mid + 1}!</span>`;
      break;
    } else {
      highlightBox(mid, ""); 

      if (array[mid] < key) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  if (!found) {
    messageDiv.innerHTML = `<span style="color: red;">Key ${key} not found in the array!</span>`;
  }
}
function highlightBox(index, className) {
  const box = document.getElementById(`box-${index}`);
  box.className = `box ${className}`;
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
window.onload = generateRandomSortedArray;
