import React from "react";
import PokemonTyping from "../PokemonTyping/PokemonTyping";
import TypeChart from "../../components/TypeChart/TypeChart";

import "./PokemonCard.css";

const PokemonCard = ({ pokemonData }) => {
  const statCategories = [
    { color: "red", max: 40 },
    { color: "#ff7f0f", max: 60 },
    { color: "yellow", max: 80 },
    { color: "lightgreen", max: 100 },
    { color: "#a0e515", max: 200 },
    { color: "#00c2b8", max: 250 },
  ];
  return (
    <div className="pokemon-card">
      <div className="pokemon-details">
        <div className="pokemon-detail-top">
          <img
            src={pokemonData.sprites.other.showdown.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
          />
          <h2>{pokemonData.name.split("-").join(" ")}</h2>
            <div className="pokemon-types">
            <strong>Type:</strong>{" "}
              {pokemonData.types.map((type, index) => (
                <PokemonTyping key={index} typingName={type.name} style={{ marginLeft: 5 }} />
              ))}
            </div>
          <div>
            <strong>Type defenses:</strong>
            <TypeChart takesDamage={pokemonData.take_damages} />
          </div>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemonData.abilities.map((ability) => ability.ability.name.split("-").join(" ")).join(", ")}
          </p>
          <p>
            <strong>Height:</strong> {(pokemonData.height * 0.1).toFixed(1)} m
          </p>
          <p>
            <strong>Weight:</strong> {(pokemonData.weight * 0.1).toFixed(1)} kg
          </p>
        </div>
        <div className="stats">
          <strong>Base Stats:</strong>
          {pokemonData.stats.map((stat) => {
            const category = statCategories.find((cat) => stat.base_stat <= cat.max);
            const barWidth = (stat.base_stat / 200) * 100;
            return (
              <div key={stat.stat.name} className="stat">
                <div className="stat-name">{stat.stat.name.split("-").join(" ")}</div>
                <div
                  className="stat-bar"
                  style={{
                    width: `${barWidth > 100 ? "100" : barWidth}%`,
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
