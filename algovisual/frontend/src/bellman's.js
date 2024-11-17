const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
if (!canvas) {
  console.error("Canvas not found!");
}
if (!ctx) {
  console.error("Context not found!");
}

// Graph Representation
const nodes = [
  { x: 100, y: 100, id: 0, edges: [{ to: 1, weight: 4 }, { to: 2, weight: 2 }] },
  { x: 300, y: 100, id: 1, edges: [{ to: 2, weight: 5 }, { to: 3, weight: 10 }] },
  { x: 200, y: 300, id: 2, edges: [{ to: 1, weight: 1 }, { to: 3, weight: 8 }, { to: 4, weight: 7 }] },
  { x: 400, y: 300, id: 3, edges: [{ to: 4, weight: 3 }] },
  { x: 600, y: 300, id: 4, edges: [] }
];  // <-- Make sure there is a closing bracket here.

let distances = [];
let predecessors = [];
let currentStep = 0;

function initializeGraph() {
  console.log("Initializing graph...");
  distances = Array(nodes.length).fill(Infinity);
  predecessors = Array(nodes.length).fill(null);
  distances[0] = 0; // Starting node (node 0)
}

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((node) => {
    // Draw edges
    node.edges.forEach((edge) => {
      const from = node;
      const to = nodes[edge.to];
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      // Draw edge weights
      ctx.fillStyle = '#000';
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      ctx.fillText(edge.weight.toString(), midX, midY);
    });

    // Draw nodes
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2, false);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Node IDs
    ctx.fillStyle = '#000';
    ctx.fillText(node.id.toString(), node.x - 5, node.y + 5);
  });
}

function updateStep() {
  if (currentStep < nodes.length - 1) {
    console.log('Updating step ${currentStep}');
    // Bellman-Ford Relaxation for one step
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].edges.forEach((edge) => {
        const u = i;
        const v = edge.to;
        const weight = edge.weight;
        if (distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          predecessors[v] = u;
        }
      });
    }
    currentStep++;
  }
  animateStep(); // <-- Ensure this line is not missing.
}

function animateStep() {
  console.log("Animating step...");
  initializeGraph();
  drawGraph();

  // Highlight visited nodes and edges for the current step
  ctx.fillStyle = 'red';
  nodes.forEach((node, i) => {
    if (distances[i] < Infinity) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2, false);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  });

  // Display current distances
  ctx.fillStyle = 'black';
  nodes.forEach((node, i) => {
    ctx.fillText('d[${i}] = ${distances[i]}', 10, 20 + i * 20);
  });
}

function startAlgorithm() {
  initializeGraph();
  drawGraph();
  updateStep();
  setInterval(updateStep, 1500); // <-- Ensure you call the interval function here correctly.
}
