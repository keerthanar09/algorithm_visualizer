import React from "react";

const NodeCount = ({ nodeCount, setNodeCount }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 3 && value <= 15) {
      setNodeCount(value);
    } else {
      alert("Please enter a number between 3 and 15.");
    }
  };

  return (
    <div class="form-floating mb-3">
      <input
        type="number"
        class="form-control"
        id="floatingInput"
        value={nodeCount}
        onChange={handleChange}
        min="3"
        max="15"
        placeholder="6"
      ></input>
      <label for="floatingInput">Enter Number of Nodes for the Graph:  </label>
    </div>

  );
};

export default NodeCount;

