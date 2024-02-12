import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  pokemon: null,
  pokemons: null,
  error: null,
};

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async (searchTerm, { rejectWithValue }) => {
  console.log(`fetchPokemon`);
  try {
    const result = await axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${searchTerm}`,
    });
    return result.data;
  } catch (error) {
    return rejectWithValue(error)
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
  },
});

export default pokemonSlice.reducer;
