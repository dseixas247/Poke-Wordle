import { useState, useEffect, useCallback } from 'react';
import './App.css';

import PokeInput from './components/PokeInput';

function App() {
  const [randomPokemon, setRandomPokemon] = useState(Math.floor(Math.random() * 898) + 1)

  const [pokemon, setPokemon] = useState({
    name: undefined,
    sprite: undefined,
    gen: undefined,
    evo: undefined,
    type1: undefined,
    type2: undefined,
    stats: undefined
  });

  const [inputPokemon, setInputPokemon] = useState('');

  const [guesses, setGuesses] = useState(0);

  const [guessHistory, setGuessHistory] = useState([]);

  const updatePokemon = useCallback((key, values) => {
    setPokemon( prevState => ({
      ...prevState,
      [key]: values
    }));
  }, [pokemon]);

  const updateInputPokemon = useCallback((pokemon) => {
    var str = pokemon.replace(/[013456789`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    setInputPokemon(str);
  }, [inputPokemon]);

  useEffect(() => {
    getPokemonData(randomPokemon);
  }, []);

  const axios = require('axios');

  const getPokemonData = (NationalDexNumber) => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + NationalDexNumber)
        .then(function (res) {
            updatePokemon('name', res.data.name);
            updatePokemon('sprite', res.data.sprites.front_default);

            updatePokemon('type1', res.data.types[0].type.name);
            if (res.data.types.length == 2){
              updatePokemon('type2', res.data.types[1].type.name);
            }
            
            updatePokemon('stats', {
                hp: res.data.stats[0].base_stat, 
                attack: res.data.stats[1].base_stat, 
                defense: res.data.stats[2].base_stat, 
                spattack: res.data.stats[3].base_stat, 
                spdefense: res.data.stats[4].base_stat, 
                speed: res.data.stats[5].base_stat
            });
        })
        .catch(function (e){
          console.log(e);
        });
    
    axios.get('https://pokeapi.co/api/v2/pokemon-species/' + NationalDexNumber)
        .then(function (res) {
            updatePokemon('gen', res.data.generation.name);
            if (res.data.evolves_from_species == null) {
              updatePokemon('evo', 'unevolved');
            }
            else {
              updatePokemon('evo', 'evolved');
            }
        })
        .catch(function (e){
          console.log(e);
        });
  }

  return (
    <div className="App">
      <PokeInput
        inputPokemon={inputPokemon}
        updateInputPokemon={updateInputPokemon}
      />
    </div>
  );
}

export default App;
