import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/search_algorithms/?query=${searchQuery}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (path) => {
    navigate(path);
  };

  return (
    <div style={{ position: "relative" }}>
      <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Search for an algorithm!!!"
          aria-label="Search"
        ></input>
        {results.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              listStyleType: "none",
              padding: "10px",
              margin: 0,
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            {results.map((result) => (
              <li
                key={result.slno}
                onClick={() => handleSelect(result.path)}
                class="list-group-item"
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f5f5f5")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
              >
                <span style={{ color: "black", fontSize: "18px" }}>
                  {result.name || result.catID__name}
                </span>

              </li>
            ))}
          </ul>
        )}
        <button class="btn btn-outline-primary" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
