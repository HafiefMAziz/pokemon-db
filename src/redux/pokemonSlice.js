import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  pokemon: null,
  pokemons: null,
  types: {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  },
  limitPage: 54,
  error: null,
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({ offset, limitPage, type }, { getState }) => {
    console.log(`fetchPokemons ${type}`);
    console.log(`offset ${offset}, limit ${JSON.stringify(limitPage)}`);
    const types = getState().pokemon.types;
    try {
      let result = [];
      if (Object.keys(types).includes(type)) {
        result = await axios({
          method: "GET",
          url: `https://pokeapi.co/api/v2/type/${type}`,
        }).then(async (response) => {
          response.data.count = response.data.pokemon.length;
          response.data.pokemon = await response.data.pokemon.slice(offset, offset + limitPage).map(async (pokemon) => {
            const { url } = pokemon.pokemon;
            const pokemonData = await axios({
              method: "GET",
              url,
            });
            return pokemonData.data;
          });
          response.data.pokemon = await Promise.all(response.data.pokemon).then((data) => {
            return data;
          });
          response.data.pokemons = response.data.pokemon;
          return response.data;
        });
      } else {
        result = await axios({
          method: "GET",
          url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitPage}`,
        }).then(async (response) => {
          response.data.results = await response.data.results.map(async (pokemon) => {
            const pokemonData = await axios({
              method: "GET",
              url: pokemon.url,
            });
            return pokemonData.data;
          });
          response.data.results = await Promise.all(response.data.results).then((data) => {
            return data;
          });
          response.data.pokemons = response.data.results;
          return response.data;
        });
      }

      return { count: result.count, pokemons: result.pokemons };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async (searchTerm, { rejectWithValue }) => {
  console.log(`fetchPokemon`);
  try {
    const result = await axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${searchTerm}`,
    });
    return result.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemon = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPokemon.rejected, (state, action) => {
      state.loading = false;
      state.pokemon = null;
      state.error = action.payload + ": There is no pokemon with such a name";
    });

    builder.addCase(fetchPokemons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemons = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.loading = false;
      state.pokemons = null;
      state.error = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
