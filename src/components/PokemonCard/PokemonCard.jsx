import React from "react";
import "./styles.css";

const PokemonCard = ({ pokemonData }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "normal":
        return "#A8A77A"; // Normal type color
      case "fire":
        return "#EE8130"; // Fire type color
      case "water":
        return "#6390F0"; // Water type color
      case "electric":
        return "#F7D02C"; // Electric type color
      case "grass":
        return "#7AC74C"; // Grass type color
      case "ice":
        return "#96D9D6"; // Ice type color
      case "fighting":
        return "#C22E28"; // Fighting type color
      case "poison":
        return "#A33EA1"; // Poison type color
      case "ground":
        return "#E2BF65"; // Ground type color
      case "flying":
        return "#A98FF3"; // Flying type color
      case "psychic":
        return "#F95587"; // Psychic type color
      case "bug":
        return "#A6B91A"; // Bug type color
      case "rock":
        return "#B6A136"; // Rock type color
      case "ghost":
        return "#735797"; // Ghost type color
      case "dragon":
        return "#6F35FC"; // Dragon type color
      case "dark":
        return "#705746"; // Dark type color
      case "steel":
        return "#B7B7CE"; // Steel type color
      case "fairy":
        return "#D685AD"; // Fairy type color
      default:
        return "#68A090"; // Default color for unknown types
    }
  };
  function capitalizeEachWord(str) {
    return str.toLowerCase().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
            <button
              className="pokemon-type-button"
              key={type.type.name}
              style={{
                backgroundColor: getTypeColor(type.type.name),
              }}>
              {type.type.name}
            </button>
          ))}
        </p>
        <p>
          <strong>Abilities:</strong> {pokemonData.abilities.map((ability) => capitalizeEachWord(ability.ability.name)).join(", ")}
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
