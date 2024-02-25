import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "./redux/pokemonSlice";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import VerticalPokemonCard from "./components/VerticalPokemonCard/VerticalPokemonCard";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const { loading, limitPage, pokemon, pokemons, types, error } = pokemonState;
  let [searchParams, setSearchParams] = useSearchParams({ page: 1, type: "" });
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const offset = limitPage * (page - 1);
  const totalPages = pokemons && Math.ceil(pokemons.count / limitPage);

  const handlePage = (event, page) => {
    const offset = limitPage * (page - 1);
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
    dispatch(fetchPokemons({ offset, limitPage, type }));
  };

  useEffect(() => {
    dispatch(fetchPokemons({ offset, limitPage, type }));
  }, [pokemon, page]);

  console.log(pokemons);

  return (
    <div className="App">
      <SearchBar />
      <div className="pokemons-display">
        {loading ? (
          <Loading />
        ) : (
          pokemons &&
          pokemons.pokemons.map((pokemon, index) => {
            return <VerticalPokemonCard key={index} pokemon={pokemon} />;
          })
        )}
      </div>
      <div className="pagination">
        {pokemons && (
          <Stack spacing={2}>
            <Pagination
              page={parseInt(page)}
              defaultPage={parseInt(page)}
              count={totalPages}
              color="primary"
              onChange={(event, page) => handlePage(event, page)}
            />
          </Stack>
        )}
      </div>
      <div>
        {error && <p>{error}</p>}
        {pokemon && <PokemonCard pokemonData={pokemon} />}
      </div>
    </div>
  );
}

export default App;
