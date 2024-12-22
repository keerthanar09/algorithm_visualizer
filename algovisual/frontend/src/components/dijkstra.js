import React, { useEffect, useRef, useState } from "react";


const DijkstraVisualizer = () => {
  const canvasRef = useRef(null);
  const [sourceNode, setSourceNode] = useState(0);
  const [nodeCount, setNodeCount] = useState(6);
  const [maxWeight, setMaxWeight] = useState(10);
  const [result, setResult] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      drawGraph();
    }
  }, [nodes, edges]);
  
  const fetchGraph = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get_graph_data/?node_count=${nodeCount}&max_weight=${maxWeight}`
      );
      const data = await response.json();
      console.log("Fetched Graph Data:", data);
      setNodes(Array.isArray(data.nodes) ? data.nodes : []);
      setEdges(Array.isArray(data.edges) ? data.edges : []);
      setGraph(data.graph || []);
    } catch (error) {
      console.error("Error fetching graph data:", error);
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
    const distances = Array(nodes.length).fill(Infinity);
    distances[source] = 0;
    const previous = Array(nodes.length).fill(null);
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
        for (let i = 0; i < nodes.length; i++) {
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

      for (let neighbor = 0; neighbor < nodes.length; neighbor++) {
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

    if (nodes.length === 0) {
      alert("Please generate a graph before starting.");
      return;
    }
    if (isNaN(sourceNode) || sourceNode < 0 || sourceNode >= nodes.length) {
      alert("Please enter a valid source node between 0 and 5.");
      return;
    }
    drawGraph(nodes, edges);
    visualizeDijkstra(sourceNode);
  };

  
  return (
    <div>
      <div>
        <label>Node Count: </label>
        <input
          type="number"
          value={nodeCount}
          onChange={(e) => setNodeCount(Number(e.target.value))}
          min="2"
        />
        <label> Max Weight: </label>
        <input
          type="number"
          value={maxWeight}
          onChange={(e) => setMaxWeight(Number(e.target.value))}
          min="1"
        />
        <button onClick={fetchGraph}>Generate Graph</button>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: "1px solid black" }}
      ></canvas>
      <div>
        <label>Source Node: </label>
        <input
          type="number"
          value={sourceNode}
          onChange={(e) => setSourceNode(Number(e.target.value))}
          min="0"
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
