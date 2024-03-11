import React from "react";
import "./TypeChart.css"; // Import CSS file for styling
import { useSelector } from "react-redux";
import PokemonTyping from "../PokemonTyping/PokemonTyping";

const TypeChart = ({ takesDamage }) => {
  const pokemonState = useSelector((state) => state.pokemon);
  const { types } = pokemonState;
  const damageColor = (damage) => {
    switch (damage) {
      case 2:
        return "#4e9a06";
      case 4:
        return "#73d216";
      case 0.5:
        return "#a40000";
      case 0.25:
        return "#7c0000";
      case 0:
        return "#2e3436";
    }
  };
  return (
    <div className="type-chart">
      <table>
        <thead>
          <tr>
            {Object.keys(types).slice(0,9).map((type, index) => {
              return (
                <th key={index}>
                  <PokemonTyping typingName={type} short={true} key={index} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(types).slice(0,9).map((type, index) => {
              let damageType = { color: "", damage: 1 };
              const ab = takesDamage.find((el) => type === el.name);
              if (ab) {
                damageType.damage = ab.damage;
                damageType.color = damageColor(ab.damage);
              }
              return (
                <td key={index} style={{ backgroundColor: damageType.color ? damageType.color : "" }}>
                  {damageType.damage === 1
                    ? ""
                    : damageType.damage === 0.5
                    ? "½"
                    : damageType.damage === 0.25
                    ? "¼"
                    : damageType.damage}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            {Object.keys(types).slice(9,18).map((type, index) => {
              return (
                <th key={index}>
                  <PokemonTyping typingName={type} short={true} key={index} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(types).slice(9,18).map((type, index) => {
              let damageType = { color: "", damage: 1 };
              const ab = takesDamage.find((el) => type === el.name);
              if (ab) {
                damageType.damage = ab.damage;
                damageType.color = damageColor(ab.damage);
              }
              return (
                <td key={index} style={{ backgroundColor: damageType.color ? damageType.color : "" }}>
                  {damageType.damage === 1
                    ? ""
                    : damageType.damage === 0.5
                    ? "½"
                    : damageType.damage === 0.25
                    ? "¼"
                    : damageType.damage}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TypeChart;
