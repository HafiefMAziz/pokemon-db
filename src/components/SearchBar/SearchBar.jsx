import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon } from "../../redux/pokemonSlice";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  
  const searchPokemon = async () => {
    dispatch(fetchPokemon(searchTerm));
  };

  return (
    <>
      <div className="search-container">
        <h1>Pokemon Search</h1>
        <input
          type="text"
          id="searchInput"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>
    </>
  );
}

export default SearchBar;
