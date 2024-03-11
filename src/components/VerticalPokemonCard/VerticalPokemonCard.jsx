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
        className="pokemon-image-vertical"
        onClick={() => playCries(cries.latest)}
      />
      <div className="pokemon-details-vertical">
        <Link to={`/pokemons/${name}`} style={{ textDecoration: "none" }}>
          <h3 className="pokemon-name-vertical" style={{ fontSize: name.length >= 12 ? "15px" : "18px" }}>{name.split("-").join(" ")}</h3>
        </Link>
        <div className="pokemon-types-vertical">
          {types.map((type, index) => (
            <PokemonTyping key={index} typingName={type.type.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerticalPokemonCard;
