import React from "react";

const MaxWeight = ({ maxWeight, setMaxWeight }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 5 && value <= 30) {
      setMaxWeight(value);
    } else {
      alert("Please enter a number between 5 and 30.");
    }
  };

  return (
    <div class="form-floating mb-3">
      <input
        type="number"
        class="form-control"
        id="floatingInput"
        value={maxWeight}
        onChange={handleChange}
        min="5"
        max="30"
        placeholder="10"
      ></input>
      <label>Enter Maximum weight of edges:   </label>
    </div>

  );
};

export default MaxWeight;

