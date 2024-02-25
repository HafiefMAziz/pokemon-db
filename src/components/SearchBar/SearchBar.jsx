import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon, fetchPokemons } from "../../redux/pokemonSlice";
import { useSearchParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./SearchBar.css";
import PokemonTyping from "../PokemonTyping/PokemonTyping";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const { loading, limitPage, pokemon, pokemons, types, error } = pokemonState;
  let [searchParams, setSearchParams] = useSearchParams({ page: 1, type: "" });
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const offset = limitPage * (page - 1);

  const searchPokemon = () => {
    dispatch(fetchPokemon(searchTerm));
  };

  const handleType = (event) => {
    setSearchParams((prev) => {
      prev.set("type", event.target.value);
      return prev;
    });
    dispatch(fetchPokemons({ offset, limitPage, type: event.target.value }));
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
      <div className="sort">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-type">Type</InputLabel>
          <Select
            className="select-type"
            labelId="select-type"
            id="select-type"
            value={type}
            label="Type"
            onChange={(event) => handleType(event)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {types &&
              Object.keys(types).map((type, index) => {
                return (
                  <MenuItem className="select-type" value={type} key={index}>
                    <PokemonTyping typingName={type}/>
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>
    </>
  );
}

export default SearchBar;
