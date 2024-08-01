import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon, fetchPokemons } from "../../redux/pokemonSlice";
import { redirect, useSearchParams, useNavigate, Link } from "react-router-dom";
import { Select, InputLabel, MenuItem, FormControl, Autocomplete, TextField } from "@mui/material";
import "./SearchBar.css";
import PokemonTyping from "../PokemonTyping/PokemonTyping";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pokemonState = useSelector((state) => state.pokemon);
  const { limitPage, types } = pokemonState;
  const [allPokemons, setAllPokemons] = useState([]);
  const [inputPokemon, setInputPokemon] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams({ page: 1, type: "" });
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
  const handleInputChange = (event, value) => {
    event.defaultMuiPrevented = true;
    if (event.type === "click" || event.type === "keydown") {
      navigate(`/pokemons/${value}`);
    }
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
        <div className="search-input">
          <Autocomplete
            id="free-solo-2-demo"
            noOptionsText={`No Pokemon with such a name`}
            disableClearable
            // value={inputPokemon}
            limitTags={2}
            options={allPokemons.map((option) => option.name.split("-").join(" "))}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search pokemon"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </div>
        <div className="sort-type">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-type">Type</InputLabel>
            <Select className="select-type" labelId="select-type" id="select-type" value={type} label="Type" onChange={(event) => handleType(event)}>
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
        <div className="img-icon">
          <Link to={"/"}>
            <img src={require(`../../public/images/pokemon-icon.png`)} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
