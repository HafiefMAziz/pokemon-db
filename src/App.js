import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./pages/Home/Home";
import DetailPokemon from "./pages/DetailPokemon/DetailPokemon";

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokemons/:pokemonName" element={<DetailPokemon />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
