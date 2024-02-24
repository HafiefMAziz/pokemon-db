import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "./redux/pokemonSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import VerticalPokemonCard from "./components/VerticalPokemonCard/VerticalPokemonCard";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const pokemonsState = useSelector((state) => state.pokemon);
  const loading = pokemonsState.loading;
  const limitPage = pokemonState.limitPage;
  const pokemonData = pokemonState.pokemon;
  const searchError = pokemonState.error;
  const pokemonsData = pokemonsState.pokemons;
  const totalPages = pokemonsData && Math.ceil(pokemonsData.count / limitPage);
  function handlePage(event, page) {
    const offset = limitPage * (page - 1);
    dispatch(fetchPokemons({ offset, limitPage }));
  }

  useEffect(() => {
    dispatch(fetchPokemons({ offset: 0, limitPage }));
  }, [pokemonData]);

  return (
    <div className="App">
      <SearchBar />
      <div className="pokemons-display">
        {loading ? (
          <Loading />
        ) : (
          pokemonsData &&
          pokemonsData.results.map((pokemon, index) => {
            return <VerticalPokemonCard key={index} pokemon={pokemon} />;
          })
        )}
      </div>
      <div className="pagination">
        {pokemonsData && (
          <Stack spacing={2}>
            <Pagination count={totalPages} color="primary" onChange={(event, page) => handlePage(event, page)} />
          </Stack>
        )}
      </div>
      <div>
        {searchError && <p>{searchError}</p>}
        {pokemonData && <PokemonCard pokemonData={pokemonData} />}
      </div>
    </div>
  );
}

export default App;
