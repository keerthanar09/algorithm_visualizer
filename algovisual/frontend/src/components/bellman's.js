/* global p5 */

import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import SettingsPF from "./UI/settingsPF";

const BellmanVisualization = () => {
  const [sourceNode, setSourceNode] = useState(0);
  const [nodeCount, setNodeCount] = useState(6);
  const [maxWeight, setMaxWeight] = useState(10);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null);

  // Bellman-Ford visualization
  const visualizeBellmanFord = async (p, sourceNode) => {
    const distances = Array(nodes.length).fill(Infinity);
    distances[sourceNode] = 0;

    for (let i = 0; i < nodes.length - 1; i++) {
      for (const edge of edges) {
        const { from, to, weight } = edge;

        if (distances[from] + weight < distances[to]) {
          distances[to] = distances[from] + weight;

          // Highlight the edge
          p.highlightEdge(edge, "blue");
          await p.sleep(1000);
          p.drawGraph();
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
      alert("Graph contains a negative weight cycle!");
    } else {
      const message = distances
        .map((distance, index) => `Vertex ${index}: Distance = ${distance}`)
        .join("\n");
      alert(`Algorithm completed. Shortest distances:\n${message}`);
    }
  };

  // p5 sketch
  const Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
      p.frameRate(30);
      p.drawGraph();
    };

    p.drawGraph = () => {
      p.background(255);
      edges.forEach((edge) => {
        const fromVertex = nodes[edge.from];
        const toVertex = nodes[edge.to];

        p.stroke(0);
        p.line(fromVertex.x, fromVertex.y, toVertex.x, toVertex.y);

        // Draw edge weight
        const midX = (fromVertex.x + toVertex.x) / 2;
        const midY = (fromVertex.y + toVertex.y) / 2;
        p.fill(255, 0, 0);
        p.text(edge.weight, midX, midY);
      });

      nodes.forEach((vertex) => {
        p.fill(173, 216, 230);
        p.ellipse(vertex.x, vertex.y, 40, 40);
        p.fill(0);
        p.text(vertex.id, vertex.x - 5, vertex.y + 5);
      });
    };

    p.highlightEdge = (edge, color) => {
      const fromVertex = nodes[edge.from];
      const toVertex = nodes[edge.to];

      p.stroke(color);
      p.strokeWeight(3);
      p.line(fromVertex.x, fromVertex.y, toVertex.x, toVertex.y);
    };

    p.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (!p5InstanceRef.current) {
      p5InstanceRef.current = new p5(Sketch, sketchRef.current);
    }

    return () => {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    };
  }, [nodes, edges]);

  const handleStart = () => {
    if (nodes.length === 0) {
      alert("Please generate a graph using the settings panel.");
      return;
    }
    if (isNaN(sourceNode) || sourceNode < 0 || sourceNode >= nodes.length) {
      alert("Please enter a valid source node.");
      return;
    }
    visualizeBellmanFord(p5InstanceRef.current, sourceNode);
  };

  return (
    <div class="container">
      <SettingsPF
        nodeCount={nodeCount}
        setNodeCount={setNodeCount}
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
        setNodes={setNodes}
        setEdges={setEdges}
      />
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
      <div ref={sketchRef}></div>
    </div>
  );
};

export default BellmanVisualization;
