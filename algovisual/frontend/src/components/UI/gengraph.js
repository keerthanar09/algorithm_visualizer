import React from "react";

const GenerateGraph = ({ nodeCount, maxWeight, setNodes, setEdges, setGraph }) => {
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

  return (
    <button onClick={fetchGraph}>
      Generate Graph
    </button>
  );
};

export default GenerateGraph;
