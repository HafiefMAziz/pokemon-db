import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  pokemon: null,
  pokemons: null,
  version_groups: [
    {
      name: "red-blue",
      url: "https://pokeapi.co/api/v2/version-group/1/",
    },
    {
      name: "yellow",
      url: "https://pokeapi.co/api/v2/version-group/2/",
    },
    {
      name: "gold-silver",
      url: "https://pokeapi.co/api/v2/version-group/3/",
    },
    {
      name: "crystal",
      url: "https://pokeapi.co/api/v2/version-group/4/",
    },
    {
      name: "ruby-sapphire",
      url: "https://pokeapi.co/api/v2/version-group/5/",
    },
    {
      name: "emerald",
      url: "https://pokeapi.co/api/v2/version-group/6/",
    },
    {
      name: "firered-leafgreen",
      url: "https://pokeapi.co/api/v2/version-group/7/",
    },
    {
      name: "diamond-pearl",
      url: "https://pokeapi.co/api/v2/version-group/8/",
    },
    {
      name: "platinum",
      url: "https://pokeapi.co/api/v2/version-group/9/",
    },
    {
      name: "heartgold-soulsilver",
      url: "https://pokeapi.co/api/v2/version-group/10/",
    },
    {
      name: "black-white",
      url: "https://pokeapi.co/api/v2/version-group/11/",
    },
    {
      name: "colosseum",
      url: "https://pokeapi.co/api/v2/version-group/12/",
    },
    {
      name: "xd",
      url: "https://pokeapi.co/api/v2/version-group/13/",
    },
    {
      name: "black-2-white-2",
      url: "https://pokeapi.co/api/v2/version-group/14/",
    },
    {
      name: "x-y",
      url: "https://pokeapi.co/api/v2/version-group/15/",
    },
    {
      name: "omega-ruby-alpha-sapphire",
      url: "https://pokeapi.co/api/v2/version-group/16/",
    },
    {
      name: "sun-moon",
      url: "https://pokeapi.co/api/v2/version-group/17/",
    },
    {
      name: "ultra-sun-ultra-moon",
      url: "https://pokeapi.co/api/v2/version-group/18/",
    },
    {
      name: "lets-go-pikachu-lets-go-eevee",
      url: "https://pokeapi.co/api/v2/version-group/19/",
    },
    {
      name: "sword-shield",
      url: "https://pokeapi.co/api/v2/version-group/20/",
    },
  ],
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
      response.data.total_stat = response.data.stats.map((stat) => stat.base_stat).reduce((prev, next) => prev + next);
      response.data.types = response.data.types.map((type) => {
        return (type = axios.get(type.type.url).then((res) => {
          res.data.damage_relations.double_damage_from.forEach((type) => {
            const existingType = response.data.take_damages.find((item) => item.name === type.name);
            existingType ? (existingType.damage *= 2) : response.data.take_damages.push({ name: type.name, damage: 2 });
          });
          res.data.damage_relations.half_damage_from.forEach((type) => {
            const existingType = response.data.take_damages.find((item) => item.name === type.name);
            existingType
              ? (existingType.damage *= 0.5)
              : response.data.take_damages.push({ name: type.name, damage: 0.5 });
          });
          res.data.damage_relations.no_damage_from.forEach((type) => {
            const existingType = response.data.take_damages.find((item) => item.name === type.name);
            existingType ? (existingType.damage = 0) : response.data.take_damages.push({ name: type.name, damage: 0 });
          });
          return res.data;
        }));
      });
      response.data.moves = response.data.moves.map(async (move) => {
        move.move = await axios.get(move.move.url).then((res) => {
          const { name, type, damage_class, power, accuracy, pp } = res.data;
          return { name, type, damage_class, power, accuracy, pp };
        });
        return move;
      });
      response.data.types = await Promise.all(response.data.types).then((data) => data);
      response.data.moves = await Promise.all(response.data.moves).then((data) => data);
      return response.data;
    });
    console.log(await result);
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
