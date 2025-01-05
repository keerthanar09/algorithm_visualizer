import React from "react";

const SearchInputNum = ({ numElements, setNumElements }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 2 && value <= 100) {
      setNumElements(value);
    } else {
      alert("Please enter a number between 2 and 100.");
    }
  };

  return (
    <div class="form-floating mb-3">
      <input
        type="number"
        class="form-control"
        id="floatingInput"
        value={numElements}
        onChange={handleChange}
        min="2"
        max="50"
        placeholder="10"
      ></input>
      <label for="floatingInput">Enter Number of Elements: </label>
    </div>

  );
};

export default SearchInputNum;
