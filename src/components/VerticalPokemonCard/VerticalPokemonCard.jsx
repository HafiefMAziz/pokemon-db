import React from "react";
import { Link } from "react-router-dom";
import PokemonTyping from "../PokemonTyping/PokemonTyping";
import "./VerticalPokemonCard.css";

function VerticalPokemonCard({ pokemon }) {
  const { name, sprites, types, cries } = pokemon;
  const playCries = (url) => {
    new Audio(url).play();
  };

  return (
    <div className="vertical-card">
      <img
        src={
          sprites.other.showdown.front_default
            ? sprites.other.showdown.front_default
            : "https://static.thenounproject.com/png/3674270-200.png"
        }
        alt={name}
        className="pokemon-image"
        onClick={() => playCries(cries.latest)}
      />
      <div className="pokemon-details">
        <Link to={`/pokemons/${name}`} style={{ textDecoration: "none" }}>
          <h3 className="pokemon-name">{name.split("-").join(" ")}</h3>
        </Link>
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
