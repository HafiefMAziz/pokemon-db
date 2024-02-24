import React from "react";
import PokemonTyping from "../PokemonTyping/PokemonTyping";
import "./VerticalPokemonCard.css";

function VerticalPokemonCard({ pokemon }) {
  const { name, sprites, types, cries } = pokemon;
  function playCries(url){
    new Audio(url).play()
  }

  return (
    <div className="vertical-card">
      <img src={sprites.other.showdown.front_default} alt={name} className="pokemon-image" onClick={() => playCries(cries.latest)} />
      <div className="pokemon-details">
        <h3 className="pokemon-name">{name}</h3>
        <div className="pokemon-types">
          {types.map((type, index) => (
            <PokemonTyping key={index} typingName={type.type.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerticalPokemonCard;
