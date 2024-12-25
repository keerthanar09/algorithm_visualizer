let array = [];
const arrayContainer = document.getElementById("arrayContainer");
const messageDiv = document.getElementById("message");

function generateRandomArray() {
  array = [];
  arrayContainer.innerHTML = "";
  messageDiv.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    array.push(randomNumber);

    const box = document.createElement("div");
    box.className = "box";
    box.id = `box-${i}`;
    box.innerText = randomNumber;
    arrayContainer.appendChild(box);
  }
}

async function performSearch() {
  const key = parseInt(document.getElementById("key").value);
  if (isNaN(key)) {
    messageDiv.innerHTML = `<span style="color: red;">Please enter a valid number!</span>`;
    return;
  }
  messageDiv.innerHTML = "";
  let found = false;
  for (let i = 0; i < array.length; i++) {
    const box = document.getElementById(`box-${i}`);
    box.classList.add("highlight"); 
    await delay(500); 
    if (array[i] === key) {
      box.classList.remove("highlight");
      box.classList.add("found"); 
      found = true;
      messageDiv.innerHTML = `<span style="color: green;">Key ${key} found at position ${i + 1}!</span>`;
      break;
    } else {
      box.classList.remove("highlight");
    }
  }
  if (!found) {
    messageDiv.innerHTML = `<span style="color: red;">Key ${key} not found in the array!</span>`;
  }
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
window.onload = generateRandomArray;
