import React, { useState } from "react";
import PokemonTyping from "../PokemonTyping/PokemonTyping";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./MovesTable.css";

const MovesTable = () => {
  const pokemonState = useSelector((state) => state.pokemon);
  const { version_groups, pokemon } = pokemonState;
  const [selectedVersion, setSelectedVersion] = useState("sword-shield");
  const handleChangeVersion = (event, values) => {
    setSelectedVersion(values);
  };
  const movesVersion = (moves, method, game_version) => {
    return moves
      .map((move) => {
        const level_up = move.version_group_details.filter(
          (group) => group.move_learn_method.name === method && group.version_group.name === game_version
        );
        if (level_up.length > 0) {
          return { move: move.move, detail: level_up[0] };
        }
      })
      .filter((move) => move !== undefined);
  };
  return (
    <>
      <Tabs
        value={selectedVersion}
        onChange={handleChangeVersion}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{ width: "80%", margin: "15px auto" }}>
        {version_groups.map((v) =>
          movesVersion(pokemon.moves, "level-up", v.name).length > 0 ? (
            <Tab key={v.name} label={v.name} value={v.name} />
          ) : null
        )}
      </Tabs>
      <div className="flex-moves-table">
        <div className="moves-section">
          <h4>Moves learnt by level up</h4>
          <p>
            <span className="pokemon-name">{pokemon.name}</span>
            {` learns the following moves in Pokémon ${selectedVersion} at the levels specified.`}
          </p>
          <div className="moves-table-container">
            <table className="moves-table">
              <tbody>
                <tr>
                  <th>Level</th>
                  <th>Move</th>
                  <th>Type</th>
                  <th>Cat</th>
                  <th>Power</th>
                  <th>Acc.</th>
                </tr>
                {movesVersion(pokemon.moves, "level-up", selectedVersion)
                  .sort((a, b) => a.detail.level_learned_at - b.detail.level_learned_at)
                  .map((row) => {
                    return (
                      <tr key={row.move.name}>
                        <td className="cell-number">{row.detail.level_learned_at}</td>
                        <td className="moves-cell-name">{row.move.name.split("-").join(" ")}</td>
                        <td>
                          <PokemonTyping typingName={row.move.type.name} />
                        </td>
                        <td>
                          <img
                            src={`https://img.pokemondb.net/images/icons/move-${row.move.damage_class.name}.png`}
                            width="30"
                            height="20"
                          />
                        </td>
                        <td className="cell-number">{row.move.power ? row.move.power : "-"}</td>
                        <td className="cell-number">{row.move.accuracy ? row.move.accuracy : "-"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <h4>Move Tutor moves</h4>
          <p>
            <span className="pokemon-name">{pokemon.name}</span>
            {` can be taught these attacks in Pokémon ${selectedVersion} from move tutors.`}
          </p>
          <div className="moves-table-container">
            <table className="moves-table">
              <tbody>
                <tr>
                  <th>Move</th>
                  <th>Type</th>
                  <th>Cat</th>
                  <th>Power</th>
                  <th>Acc.</th>
                </tr>
                {movesVersion(pokemon.moves, "tutor", selectedVersion)
                  .sort((a, b) => a.move.name - b.move.name)
                  .map((row) => {
                    return (
                      <tr key={row.move.name}>
                        <td className="moves-cell-name">{row.move.name.split("-").join(" ")}</td>
                        <td>
                          <PokemonTyping typingName={row.move.type.name} />
                        </td>
                        <td>
                          <img
                            src={`https://img.pokemondb.net/images/icons/move-${row.move.damage_class.name}.png`}
                            width="30"
                            height="20"
                          />
                        </td>
                        <td className="cell-number">{row.move.power ? row.move.power : "-"}</td>
                        <td className="cell-number">{row.move.accuracy ? row.move.accuracy : "-"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="moves-section">
          <h4>Moves learnt by HM & TM</h4>
          <p>
            <span className="pokemon-name">{pokemon.name}</span>
            {` is compatible with these Machines in Pokémon ${selectedVersion}.`}
          </p>
          <div className="moves-table-container">
            <table className="moves-table">
              <tbody>
                <tr>
                  <th>Move</th>
                  <th>Type</th>
                  <th>Cat</th>
                  <th>Power</th>
                  <th>Acc.</th>
                </tr>
                {movesVersion(pokemon.moves, "machine", selectedVersion)
                  .sort((a, b) => a.move.name - b.move.name)
                  .map((row) => {
                    return (
                      <tr key={row.move.name}>
                        <td className="moves-cell-name">{row.move.name.split("-").join(" ")}</td>
                        <td>
                          <PokemonTyping typingName={row.move.type.name} />
                        </td>
                        <td>
                          <img
                            src={`https://img.pokemondb.net/images/icons/move-${row.move.damage_class.name}.png`}
                            width="30"
                            height="20"
                          />
                        </td>
                        <td className="cell-number">{row.move.power ? row.move.power : "-"}</td>
                        <td className="cell-number">{row.move.accuracy ? row.move.accuracy : "-"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovesTable;
