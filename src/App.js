import "./App.css";
import React, { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonCard from './components/PokemonCard/PokemonCard';

function App() {
  const pokemonState = useSelector((state) => state.pokemon);
  const pokemonData = pokemonState.pokemon;
  const error = pokemonState.error;
  console.log(error);

  return (
    <div className="App">
      <SearchBar/>
      <div>
        {error && <p>{error}</p>}
        {pokemonData && <PokemonCard pokemonData={pokemonData} />}
      </div>
    </div>
  );
}

export default App;
