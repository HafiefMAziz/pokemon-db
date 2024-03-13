import React from "react";
import PokemonTyping from "../PokemonTyping/PokemonTyping";
import TypeChart from "../../components/TypeChart/TypeChart";
import { useSelector } from "react-redux";

import "./PokemonCard.css";
import MovesTable from "./MovesTable";

const PokemonCard = () => {
  const pokemonState = useSelector((state) => state.pokemon);
  const { pokemon } = pokemonState;
  const statCategories = [
    { color: "#f34444", max: 30 },
    { color: "#ff7f0f", max: 60 },
    { color: "#ffdd57", max: 90 },
    { color: "#a0e515", max: 120 },
    { color: "#23cd5e", max: 200 },
    { color: "#00c2b8", max: 250 },
  ];
  return (
    <div className="pokemon-card">
      <div id="pokecard-flex-item" className="pokemon-detail-img">
        <img src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} className="pokemon-image" />
      </div>
      <div id="pokecard-flex-item" className="pokemon-detail-pokedex">
        <h3 className="pokemon-name">{pokemon.name.split("-").join(" ")}</h3>
        <table className="pokedex-table">
          <tbody>
            <tr>
              <th>National №</th>
              <td className="flex-td-type">{pokemon.id}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td className="flex-td-type">
                {pokemon.types.map((type, index) => (
                  <PokemonTyping key={index} typingName={type.name} style={{ marginRight: 5 }} />
                ))}
              </td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>
                <ol>
                  {pokemon.abilities.map((ability) => {
                    return (
                      <li key={ability.ability.name}>
                        {ability.is_hidden
                          ? `${ability.ability.name.split("-").join(" ")} (hidden ability)`
                          : ability.ability.name.split("-").join(" ")}
                      </li>
                    );
                  })}
                </ol>
              </td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{(pokemon.height * 0.1).toFixed(1)} m</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{(pokemon.weight * 0.1).toFixed(1)} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="pokecard-flex-item" className="type-defenses">
        <h3>Type defenses</h3>
        <TypeChart takesDamage={pokemon.take_damages} />
      </div>
      <div id="pokecard-flex-item" className="stats">
        <h3>Base Stats</h3>
        <table className="pokedex-table stat-table">
          <tbody>
            {pokemon.stats.map((stat) => {
              const category = statCategories.find((cat) => stat.base_stat <= cat.max);
              const barWidth = (stat.base_stat / 200) * 100;
              return (
                <tr key={stat.stat.name}>
                  <th>
                    {" "}
                    <div className="stat-name">{stat.stat.name.split("-").join(" ")}</div>
                  </th>
                  <td id="stat-number">{stat.base_stat}</td>
                  <td>
                    <div
                      className="stat-bar"
                      style={{
                        width: `${barWidth > 100 ? "100" : barWidth}%`,
                        backgroundColor: category.color,
                      }}></div>
                  </td>
                </tr>
              );
            })}
            <tr>
              <th>Total Stat</th>
              <td id="stat-number">
                <strong>{pokemon.total_stat}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="pokecard-flex-item" className="moves">
        <h3>Moves learned by <span className="pokemon-name">{pokemon.name}</span></h3>
        <MovesTable/>
      </div>
    </div>
  );
};

export default PokemonCard;
