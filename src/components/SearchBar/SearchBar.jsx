import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon, fetchPokemons } from "../../redux/pokemonSlice";
import { redirect, useSearchParams, Link } from "react-router-dom";
import { Select, InputLabel, MenuItem, FormControl, Stack, Autocomplete, TextField } from "@mui/material";
import "./SearchBar.css";
import PokemonTyping from "../PokemonTyping/PokemonTyping";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const { loading, limitPage, pokemon, pokemons, types, error } = pokemonState;
  const [allPokemons, setAllPokemons] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams({ page: 1, type: "" });
  const [sugestedPokemons, setSugestedPokemons] = useState([]);
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const offset = limitPage * (page - 1);

  const fetchAllPokemons = async () => {
    const result = await axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/?limit=20000`,
    });
    setAllPokemons(result.data.results);
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);
  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if(value.length <=  0) {
      setSugestedPokemons([]);
    }else{
      const filteredPokemons = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase()));
      setSugestedPokemons(filteredPokemons.slice(0, 5));
    }
  };

  // const handleSelectPokemon = (pokemon) => {
  //   redirect(`/pokemons/${pokemon.name}`);
  //   console.log(pokemon.name);
  // }

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
        <div className="search-input">
          <input
            type="text"
            id="searchInput"
            placeholder="Search Pokemon..."
            // value={searchTerm}
            onChange={handleInputChange}
          />
          <ul className="suggestions">
            {sugestedPokemons.map((pokemon, index) => (
              <li
                key={index}
                // onClick={() => handleSelectPokemon(pokemon)}
              >
                <Link to={`/pokemons/${pokemon.name}`}>{pokemon.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <button onClick={searchPokemon}>Search</button> */}
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
                    <PokemonTyping typingName={type} />
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
