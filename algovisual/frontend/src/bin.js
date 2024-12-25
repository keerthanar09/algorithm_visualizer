// Generate 10 random sorted numbers between 0 and 99
let array = [];
const arrayContainer = document.getElementById("arrayContainer");
const messageDiv = document.getElementById("message");

function generateRandomSortedArray() {
  array = [];
  arrayContainer.innerHTML = "";
  messageDiv.innerHTML = "";

  // Generate 10 random numbers, sort them, and display them
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

// Perform Binary Search with animation
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

    // Highlight current mid
    highlightBox(mid, "highlight");
    await delay(1200); // Pause for animation

    if (array[mid] === key) {
      highlightBox(mid, "found"); // Highlight as found
      found = true;
      messageDiv.innerHTML = `<span style="color: green;">Key ${key} found at position ${mid + 1}!</span>`;
      break;
    } else {
      highlightBox(mid, ""); // Remove highlight

      if (array[mid] < key) {
        // Narrow search to the right
        left = mid + 1;
      } else {
        // Narrow search to the left
        right = mid - 1;
      }
    }
  }

  if (!found) {
    messageDiv.innerHTML = `<span style="color: red;">Key ${key} not found in the array!</span>`;
  }
}

// Highlight a specific box by index and class
function highlightBox(index, className) {
  const box = document.getElementById(`box-${index}`);
  box.className = `box ${className}`;
}

// Utility function for delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generate a new random sorted array on page load
window.onload = generateRandomSortedArray;
