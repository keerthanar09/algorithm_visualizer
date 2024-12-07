const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

let vertices = [];
let edges = [];
function generateRandomGraph() {
    const vertexCount = Math.floor(Math.random() * 4) + 3; 
    vertices = [];
    edges = [];
    for (let i = 0; i < vertexCount; i++) {
        vertices.push({
            id: i,
            x: Math.floor(Math.random() * (canvas.width - 50)) + 25,
            y: Math.floor(Math.random() * (canvas.height - 50)) + 25
        });
    }
    for (let i = 0; i < vertexCount - 1; i++) {
        for (let j = i + 1; j < vertexCount; j++) {
            if (Math.random() > 0.5) { 
                edges.push({
                    from: i,
                    to: j,
                    weight: Math.floor(Math.random() * 10) + 1
                });
            }
        }
    }

    drawGraph();
}
function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    edges.forEach(edge => {
        const fromVertex = vertices[edge.from];
        const toVertex = vertices[edge.to];

        ctx.beginPath();
        ctx.moveTo(fromVertex.x, fromVertex.y);
        ctx.lineTo(toVertex.x, toVertex.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
        const midX = (fromVertex.x + toVertex.x) / 2;
        const midY = (fromVertex.y + toVertex.y) / 2;
        ctx.fillStyle = 'red';
        ctx.fillText(edge.weight, midX, midY);
    });
    vertices.forEach(vertex => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'lightblue';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(vertex.id, vertex.x - 5, vertex.y + 5);
    });
}
async function visualizeBellmanFord() {
    const distances = Array(vertices.length).fill(Infinity);
    distances[0] = 0;

    for (let i = 0; i < vertices.length - 1; i++) {
        for (const edge of edges) {
            const { from, to, weight } = edge;

            if (distances[from] + weight < distances[to]) {
                distances[to] = distances[from] + weight;
                highlightEdge(edge, 'blue');
                await sleep(1000); 
                drawGraph(); 
            }
        }
    }
    let hasNegativeCycle = false;
    for (const edge of edges) {
        const { from, to, weight } = edge;
        if (distances[from] + weight < distances[to]) {
            hasNegativeCycle = true;
            break;
        }
    }

    if (hasNegativeCycle) {
        alert('Graph contains a negative weight cycle!');
    } else {
        let message = 'Algorithm completed. Shortest distances:\n';
        distances.forEach((distance, index) => {
            message += `Vertex ${index}: Distance = ${distance}
`;
        });
        alert(message);
    }
    vertices.forEach((vertex, index) => {
        ctx.fillStyle = 'black';
        ctx.fillText('D: ${distances[index]}, vertex.x - 10, vertex.y + 35');
    });
}
function highlightEdge(edge, color) {
    const fromVertex = vertices[edge.from];
    const toVertex = vertices[edge.to];

    ctx.beginPath();
    ctx.moveTo(fromVertex.x, fromVertex.y);
    ctx.lineTo(toVertex.x, toVertex.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.getElementById('generateGraphButton').addEventListener('click', generateRandomGraph);
document.getElementById('startButton').addEventListener('click', visualizeBellmanFord);
generateRandomGraph();