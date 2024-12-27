import React from "react";

const GenerateGraph = ({ fetchGraph }) => {
  return <button onClick={fetchGraph} type="button" class="btn btn-outline-primary">Generate New Graph</button>;

};

export default GenerateGraph;
