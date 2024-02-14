import React from "react";
import "./styles.css";

function PokemonTyping({ typingName }) {
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
  return (
    <>
      <button
        className="pokemon-type-button"
        key={typingName}
        style={{
          backgroundColor: getTypeColor(typingName),
        }}>
        {typingName}
      </button>
    </>
  );
}

export default PokemonTyping;
