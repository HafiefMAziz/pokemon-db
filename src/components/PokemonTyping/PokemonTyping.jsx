import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./PokemonTyping.css";

function PokemonTyping({ typingName }) {
  const pokemonState = useSelector((state) => state.pokemon);
  const { types } = pokemonState;
  const getTypeColor = (type) => {
    const color = Object.entries(types).filter(([key, value]) => key === type)[0][1];
    return color;
  };
  return (
    <>
      <Link to={`/?type=${typingName}`}>
        <button
          className="pokemon-type-button"
          key={typingName}
          style={{
            backgroundColor: getTypeColor(typingName),
          }}>
          {typingName}
        </button>
      </Link>
    </>
  );
}

export default PokemonTyping;
