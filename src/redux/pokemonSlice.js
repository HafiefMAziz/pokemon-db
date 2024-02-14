import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  pokemon: null,
  pokemons: null,
  error: null,
};

export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async (offset, { rejectWithValue }) => {
  console.log(`fetchPokemons`);
  console.log(offset);
  try {
    const result = await axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`,
    });
    // const pokemons = await result.data.results.map(async (pokemon) => {
    //   try {
    //     const result = await axios({
    //       method: "GET",
    //       url: pokemon.url,
    //     })
    //     // console.log(pokemon);
    //     // console.log(result.data);
    //     return result.data;
    //     // pokemons.push(result.data);
    //   } catch (error) {
    //     return rejectWithValue(error);
    //   }
    // });
    // console.log(result.data);
    // console.log(await pokemons[1]);
    return result.data;
  } catch (error) {
    return rejectWithValue(error);
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
      state.error = action.payload.message + ": There is no pokemon with such a name";
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
      state.error = action.payload.message;
    });
  },
});

export default pokemonSlice.reducer;
