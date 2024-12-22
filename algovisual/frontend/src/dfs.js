const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const stackContainer = document.getElementById('stack');
const startButton = document.getElementById('startButton');

function generateRandomGraph() {
  const nodes = [];
  const numNodes = Math.floor(Math.random() * 2) + 5;
  for (let i = 0; i < numNodes; i++) {
    nodes.push(String.fromCharCode(65 + i));
  }

  const graph = {};
  nodes.forEach(node => {
    const edges = nodes.filter(
      target => target !== node && Math.random() > 0.3
    ); 
    graph[node] = edges;
  });

  return graph;
}
function generateRandomPositions(nodes) {
  const positions = {};
  nodes.forEach((node, index) => {
    positions[node] = {
      x: Math.random() * 400 + 50, 
      y: Math.random() * 200 + 50 
    };
  });
  return positions;
}
function drawGraph(graph, positions, highlightNode = null) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Object.keys(graph).forEach(node => {
    graph[node].forEach(neighbor => {
      ctx.beginPath();
      ctx.moveTo(positions[node].x, positions[node].y);
      ctx.lineTo(positions[neighbor].x, positions[neighbor].y);
      ctx.strokeStyle = '#ccc';
      ctx.stroke();
    });
  });
  Object.keys(positions).forEach(node => {
    const { x, y } = positions[node];
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = highlightNode === node ? 'orange' : 'lightblue';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node, x, y);
  });
}
function updateStack(stack, currentNode = null) {
  stackContainer.innerHTML = '';
  stack.forEach((node, index) => {
    const div = document.createElement('div');
    div.className = 'stack-item';
    if (node === currentNode) {
      div.classList.add('current');
    }
    if (index < stack.indexOf(currentNode)) {
      div.classList.add('visited');
    }
    div.textContent = node;
    stackContainer.appendChild(div);
  });
}
async function dfs(graph, startNode, positions) {
  const stack = [startNode];
  const visited = new Set();

  while (stack.length > 0) {
    const currentNode = stack.pop();
    drawGraph(graph, positions, currentNode);
    updateStack([...stack, currentNode], currentNode);

    if (!visited.has(currentNode)) {
      visited.add(currentNode);
      await new Promise(resolve => setTimeout(resolve, 1000));

      graph[currentNode].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      });
    }
  }
}

const randomGraph = generateRandomGraph();
const nodePositions = generateRandomPositions(Object.keys(randomGraph));
drawGraph(randomGraph, nodePositions);

startButton.addEventListener('click', () => {
  dfs(randomGraph, Object.keys(randomGraph)[0], nodePositions);
});