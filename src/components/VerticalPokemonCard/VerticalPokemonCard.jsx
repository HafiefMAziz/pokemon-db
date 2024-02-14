import React from "react";
import PokemonTyping from "../PokemonTyping/PokemonTyping";

function VerticalPokemonCard({ pokemon }) {
  const { name, sprite, types } = pokemon;

  return (
    <div className="vertical-card">
      <img src={sprite.front_default} alt={name} className="pokemon-image" />
      <div className="pokemon-details">
        <h3 className="pokemon-name">{name}</h3>
        <div className="pokemon-types">
          {types.map((type, index) => (
            <PokemonTyping key={index} typingName={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerticalPokemonCard;
