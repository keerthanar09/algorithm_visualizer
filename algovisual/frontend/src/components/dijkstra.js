import React, { useRef, useState } from "react";

const NODE_COUNT = 6;
const MAX_WEIGHT = 15;

const DijkstraVisualizer = () => {
  const canvasRef = useRef(null);
  const [sourceNode, setSourceNode] = useState(0);
  const [result, setResult] = useState("");
  let nodes = [];
  let edges = [];
  let graph = [];

  const generateRandomGraph = () => {
    nodes = [];
    edges = [];
    graph = Array.from({ length: NODE_COUNT }, () => Array(NODE_COUNT).fill(Infinity));

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i * 2 * Math.PI) / NODE_COUNT;
      nodes.push({
        id: i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (Math.random() > 0.5) {
          const weight = Math.ceil(Math.random() * MAX_WEIGHT);
          graph[i][j] = weight;
          graph[j][i] = weight;
          edges.push({ from: i, to: j, weight });
        }
      }
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach((edge) => {
      const fromNode = nodes[edge.from];
      const toNode = nodes[edge.to];

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      ctx.fillStyle = "black";
      ctx.fillText(edge.weight, midX, midY);
    });

    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(node.id, node.x - 5, node.y + 5);
    });
  };

  const visualizeDijkstra = (source) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const visited = new Set();
    const distances = Array(NODE_COUNT).fill(Infinity);
    distances[source] = 0;
    const previous = Array(NODE_COUNT).fill(null);
    const priorityQueue = new MinPriorityQueue();
    priorityQueue.enqueue(source, 0);

    const highlightNode = (nodeId, color) => {
      const node = nodes[nodeId];
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fillText(node.id, node.x - 5, node.y + 5);
    };

    const highlightEdge = (from, to, color) => {
      const fromNode = nodes[from];
      const toNode = nodes[to];
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.lineWidth = 1;
    };

    const interval = setInterval(() => {
      if (priorityQueue.isEmpty()) {
        clearInterval(interval);

        let resultText = `Shortest distances from Node ${source}:\n`;
        for (let i = 0; i < NODE_COUNT; i++) {
          if (i !== source) {
            resultText += `Node ${source} -> Node ${i} --> Distance: ${distances[i] === Infinity ? "Infinity" : distances[i]}\n`;
          }
        }
        setResult(resultText);
        return;
      }

      const { element: currentNode } = priorityQueue.dequeue();
      if (visited.has(currentNode)) return;
      visited.add(currentNode);
      highlightNode(currentNode, "yellow");

      for (let neighbor = 0; neighbor < NODE_COUNT; neighbor++) {
        if (graph[currentNode][neighbor] !== Infinity && !visited.has(neighbor)) {
          const newDist = distances[currentNode] + graph[currentNode][neighbor];
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            previous[neighbor] = currentNode;
            priorityQueue.enqueue(neighbor, newDist);
            highlightEdge(currentNode, neighbor, "blue");
          }
        }
      }

      highlightNode(currentNode, "green");
    }, 700);
  };

  const handleStart = () => {
    if (isNaN(sourceNode) || sourceNode < 0 || sourceNode >= NODE_COUNT) {
      alert("Please enter a valid source node between 0 and 5.");
      return;
    }
    generateRandomGraph();
    drawGraph();
    visualizeDijkstra(sourceNode);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400} style={{ border: "1px solid black" }}></canvas>
      <div>
        <label>Source Node: </label>
        <input
          type="number"
          value={sourceNode}
          onChange={(e) => setSourceNode(Number(e.target.value))}
        />
        <button onClick={handleStart}>Start</button>
      </div>
      <pre>{result}</pre>
    </div>
  );
};

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(element, priority) {
    this.heap.push({ element, priority });
    this.bubbleUp();
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element.priority >= parent.priority) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) swap = leftChildIndex;
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (!swap && rightChild.priority < element.priority) ||
          (swap && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (!swap) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

export default DijkstraVisualizer;
