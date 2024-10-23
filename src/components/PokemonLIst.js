import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        const fetches = response.data.results.map((pokemon) =>
          axios.get(pokemon.url).then((res) => ({
            name: res.data.name,
            image: res.data.sprites.front_default,
          }))
        );
        Promise.all(fetches).then((pokemonDetails) => {
          setPokemons(pokemonDetails);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);

  // catch Pokémon
  const catchPokemon = (pokemon) => {
    if (Math.random() > 0.5) {
      setCaughtPokemons([...caughtPokemons, pokemon]);
    } else {
      alert(`${pokemon.name} ran away!`);
    }
  };

  return (
    <div>
      <h1>Pokémon Catching Game</h1>
      <h2>Pokémon List</h2>
      <div className="pokemon-grid">
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <button onClick={() => catchPokemon(pokemon)}>Catch</button>{" "}
          </div>
        ))}
      </div>
      <h2>Caught Pokémon</h2>
      <ul className="caught-pokemon-list">
        {caughtPokemons.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
