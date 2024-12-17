const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
function generateRandomGraph() {
  const vertices = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, Math.floor(Math.random() * 2) + 5);
  const graph = {};

  vertices.forEach(vertex => {
    graph[vertex] = [];
  });

  vertices.forEach(vertex => {
    const numEdges = Math.floor(Math.random() * (vertices.length - 1)) + 1;
    const neighbors = new Set();

    while (neighbors.size < numEdges) {
      const neighbor = vertices[Math.floor(Math.random() * vertices.length)];
      if (neighbor !== vertex) neighbors.add(neighbor);
    }

    graph[vertex] = Array.from(neighbors);
  });

  return graph;
}

function generateNodePositions(vertices) {
  const positions = {};
  vertices.forEach((vertex, index) => {
    const angle = (2 * Math.PI * index) / vertices.length;
    const x = 300 + 200 * Math.cos(angle);
    const y = 200 + 150 * Math.sin(angle);
    positions[vertex] = { x, y };
  });
  return positions;
}
const graph = generateRandomGraph();
const nodePositions = generateNodePositions(Object.keys(graph));
function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const [node, neighbors] of Object.entries(graph)) {
    const { x: x1, y: y1 } = nodePositions[node];
    neighbors.forEach(neighbor => {
      const { x: x2, y: y2 } = nodePositions[neighbor];
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#aaa';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  for (const [node, { x, y }] of Object.entries(nodePositions)) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#007bff';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node, x, y);
  }
}
const queueContainer = document.getElementById('queue');
function updateQueueDisplay(queue, final = false) {
  queueContainer.innerHTML = '';
  if (final && queue.length === 0) {
    const li = document.createElement('li');
    li.textContent = "Queue is now empty (BFS complete)";
    li.style.color = 'green';
    li.style.fontWeight = 'bold';
    queueContainer.appendChild(li);
    return;
  }

  queue.forEach(node => {
    const li = document.createElement('li');
    li.textContent = node;
    queueContainer.appendChild(li);
  });
}
async function bestFirstSearch(start) {
  const queue = [start];
  const visited = new Set();

  updateQueueDisplay(queue);

  while (queue.length > 0) {
    const current = queue.shift();
    updateQueueDisplay(queue);

    if (!visited.has(current)) {
      visited.add(current);
      const { x, y } = nodePositions[current];
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5722';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(current, x, y);

      await new Promise(resolve => setTimeout(resolve, 1500)); 
      graph[current].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      });
      updateQueueDisplay(queue);
    }
  }
  updateQueueDisplay(queue, true);
}
document.getElementById('startButton').addEventListener('click', () => {
  drawGraph();
  bestFirstSearch(Object.keys(graph)[0]); 
});
drawGraph();