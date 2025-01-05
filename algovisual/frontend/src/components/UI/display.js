import React from "react";

const DFSControls = ({ stack, traversalOrder, onStart }) => {
  return (
    <div className="controls-container">
      <div className="stack-container">
        <h2>Stack</h2>
        <div id="stack">
          {stack.map((node, index) => (
            <div key={index} className="stack-item">
              {node}
            </div>
          ))}
        </div>
      </div>
      <div className="traversal-container">
        <h2>DFS Traversal</h2>
        <div id="traversal">{traversalOrder}</div>
      </div>
      <button onClick={onStart}>Start Visualization</button>
    </div>
  );
};

export default DFSControls;
