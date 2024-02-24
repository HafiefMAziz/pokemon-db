import React from "react";
import PokemonTyping from "../PokemonTyping/PokemonTyping";
import "./PokemonCard.css";

const PokemonCard = ({ pokemonData }) => {
  function capitalizeEachWord(str) {
    return str
      .toLowerCase()
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const statCategories = [
    { color: "red", max: 40 },
    { color: "orange", max: 60 },
    { color: "yellow", max: 80 },
    { color: "lightgreen", max: 100 },
    { color: "green", max: 200 },
  ];
  return (
    <div className="pokemon-card">
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image" />
      <div className="pokemon-details">
        <h2>{capitalizeEachWord(pokemonData.name)}</h2>
        <p>
          <strong>Type:</strong>{" "}
          {pokemonData.types.map((type) => (
            <PokemonTyping typingName={type.type.name} />
          ))}
        </p>
        <p>
          <strong>Abilities:</strong>{" "}
          {pokemonData.abilities.map((ability) => capitalizeEachWord(ability.ability.name)).join(", ")}
        </p>
        <p>
          <strong>Height:</strong> {(pokemonData.height * 0.1).toFixed(1)} m
        </p>
        <p>
          <strong>Weight:</strong> {(pokemonData.weight * 0.1).toFixed(1)} kg
        </p>
        <div className="stats">
          <strong>Base Stats:</strong>
          {pokemonData.stats.map((stat) => {
            const category = statCategories.find((cat) => stat.base_stat <= cat.max);
            return (
              <div key={stat.stat.name} className="stat">
                <div className="stat-name">{capitalizeEachWord(stat.stat.name)}</div>
                <div
                  className="stat-bar"
                  style={{
                    width: `${(stat.base_stat / 200) * 100}%`,
                    backgroundColor: category.color,
                  }}>
                  {stat.base_stat}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
