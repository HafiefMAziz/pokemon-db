import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Loading from "../../components/Loading/Loading";
import { fetchPokemon } from "../../redux/pokemonSlice";

export default function DetailPokemon() {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.pokemon);
  const { pokemon, error } = pokemonState;
  const { pokemonName } = useParams();
  useEffect(() => {
    dispatch(fetchPokemon(pokemonName));
  }, [pokemonName]);

  return (
    <div>
      {error && <p>{error}</p>}
      {pokemon ? (
        <>
          {/* {console.log(pokemon)}  */}
          <PokemonCard pokemonData={pokemon} />{" "}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
