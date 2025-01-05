import React from "react";

const StartSearch = ({ performSearch }) => {
  return <button onClick={performSearch} type="button" class="btn btn-outline-primary">Start Search</button>;

};

export default StartSearch;
