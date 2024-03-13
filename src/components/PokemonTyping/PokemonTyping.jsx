import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./PokemonTyping.css";

function PokemonTyping({ typingName, short = false }) {
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
          className={ short ?"pokemon-type-button short-type" :"pokemon-type-button"}
          key={typingName}
          style={{
            backgroundColor: getTypeColor(typingName),
          }}>
          {short ? typingName.slice(0, 3) : typingName}
        </button>
      </Link>
    </>
  );
}

export default PokemonTyping;
