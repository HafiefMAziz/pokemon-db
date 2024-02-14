import "./App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { fetchPokemons } from "./redux/pokemonSlice";
import VerticalPokemonCard from "./components/VerticalPokemonCard/VerticalPokemonCard";

function App() {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const pokemonsState = useSelector((state) => state.pokemon);
  const pokemonData = pokemonState.pokemon;
  const searchError = pokemonState.error;
  const pokemonsData = pokemonsState.pokemons;

  useEffect(() => {
    return () => {
      dispatch(fetchPokemons("0"));
    };
  }, []);
  console.log(pokemonsData);

  return (
    <div className="App">
      <SearchBar />
      {pokemonsData.results.map((pokemon) => {
        <VerticalPokemonCard pokemon={pokemon} />;
      })}
      <div>
        {searchError && <p>{searchError}</p>}
        {pokemonData && <PokemonCard pokemonData={pokemonData} />}
      </div>
    </div>
  );
}

export default App;
