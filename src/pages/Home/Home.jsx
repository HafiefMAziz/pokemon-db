import "./Home.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../../redux/pokemonSlice";
import { useSearchParams } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import VerticalPokemonCard from "../../components/VerticalPokemonCard/VerticalPokemonCard";
import Loading from "../../components/Loading/Loading";

function Home() {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const { loading, limitPage, pokemon, pokemons, types, error } = pokemonState;
  let [searchParams, setSearchParams] = useSearchParams({ page: 1, type: "" });
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const offset = limitPage * (page - 1);
  const totalPages = pokemons && Math.ceil(pokemons.count / limitPage);
  
  const handlePage = (event, page) => {
    console.log(page);
    const offset = limitPage * (page - 1);
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
    dispatch(fetchPokemons({ offset, limitPage, type }));
  };

  useEffect(() => {
    dispatch(fetchPokemons({ offset, limitPage, type }));
  }, [type, page]);

  console.log(pokemons);

  return (
    <div className="Home">
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
    </div>
  );
}

export default Home;
