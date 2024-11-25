import React from "react";

const GenerateArrayButton = ({ fetchData }) => {
  return <button onClick={fetchData} type="button" class="btn btn-outline-primary">Generate New Array</button>;

};

export default GenerateArrayButton;
