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
        result = await axios.get(`https://pokeapi.co/api/v2/type/${type}`).then(async (response) => {
          response.data.count = response.data.pokemon.length;
          response.data.pokemon = await response.data.pokemon.slice(offset, offset + limitPage).map(async (pokemon) => {
            const { url } = pokemon.pokemon;
            pokemon = await axios.get(url).then((res) => res.data);
            return pokemon;
          });
          response.data.pokemons = response.data.pokemon;
          return response.data;
        });
      } else {
        result = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitPage}`)
          .then(async (response) => {
            response.data.results = await response.data.results.map(async (pokemon) => {
              pokemon = axios.get(pokemon.url).then((res) => res.data);
              return pokemon;
            });
            response.data.pokemons = response.data.results;
            return response.data;
          });
      }
      result.pokemons = await Promise.all(result.pokemons).then((resultData) => {
        return resultData;
      });
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
    const result = axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`).then(async (response) => {
      response.data.take_damages = [];
      response.data.types = response.data.types.map((type) => {
        type = axios.get(type.type.url).then((res) => {
          res.data.damage_relations.double_damage_from.forEach((type) => {
            const existingType = response.data.take_damages.find((item) => item.name === type.name);
            existingType ? (existingType.damage *= 2) : response.data.take_damages.push({ name: type.name, damage: 2 });
          });
          res.data.damage_relations.half_damage_from.forEach((type) => {
            const existingType = response.data.take_damages.find((item) => item.name === type.name);
            existingType ? (existingType.damage *= 0.5) : response.data.take_damages.push({ name: type.name, damage: 0.5 });
          });
          res.data.damage_relations.no_damage_from.forEach((type) => {
            const existingType = response.data.take_damages.find((item) => item.name === type.name);
            existingType ? (existingType.damage = 0) : response.data.take_damages.push({ name: type.name, damage: 0 });
          });
          return res.data;
        });
        return type;
      });
      // console.log(response.data.take_damages);
      response.data.types = await Promise.all(response.data.types).then((data) => data);
      return response.data;
    });
    return result;
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
