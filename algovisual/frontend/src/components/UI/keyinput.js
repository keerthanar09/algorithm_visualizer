import React from "react";

const KeyInput = ({ searchkey, setKey }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= -1 && value <= 300) {
        setKey(value);
      }
  };

  return (
    <div class="form-floating mb-3">
      <input
        type="number"
        class="form-control"
        id="floatingInput"
        value={searchkey}
        onChange={handleChange}
        min="1"
        max="300"
        
      ></input>
      <label for="floatingInput">Enter Key Element to Search:  </label>
    </div>

  );
};

export default KeyInput;
