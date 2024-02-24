import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  pokemon: null,
  pokemons: null,
  limitPage: 50,
  error: null,
};

export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async ({offset, limitPage}) => {
  console.log(`fetchPokemons`);
  console.log(`offset ${offset}, limit ${JSON.stringify(limitPage)}`);
  try {
    const result = await axios({
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
      return response.data;
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
});

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
