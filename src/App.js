import { useState, useEffect, useCallback } from 'react';
import './App.css';

import PokeGuess from './components/PokeGuess';
import PokeInput from './components/PokeInput';

function App() {
  const [randomPokemon, setRandomPokemon] = useState(Math.floor(Math.random() * 898) + 1)

  const [pokemon, setPokemon] = useState(undefined);

  const [inputPokemon, setInputPokemon] = useState('');

  const [guesses, setGuesses] = useState(0);

  const [guessHistory, setGuessHistory] = useState([]);

  const updatePokemon = useCallback((pokemon) => {
    setPokemon(pokemon);
  }, [pokemon]);

  const updateInputPokemon = useCallback((pokemon) => {
    var str = pokemon.replace(/[013456789`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    setInputPokemon(str);
  }, [inputPokemon]);

  const updateGuesses = useCallback(() => {
    setGuesses(guesses + 1);
  }, [guesses]);

  const updateGuessHistory = useCallback((guessedPokemon, pokemon) => {
    var history = guessHistory;
    getPokemonData(guessedPokemon).then(res => {
      if(res != undefined){
        history.push(comparePokemon(res, pokemon));
        updateGuesses();
        setGuessHistory(history);
        updateInputPokemon("");
      }
    });
  }, [guessHistory])

  useEffect(() => {
    getPokemonData(randomPokemon).then(res => {updatePokemon(res)});
  }, []);

  const axios = require('axios');

  async function getPokemonData(Pokemon) {
    var name = '';
    var sprite = '';
    var type1 = '';
    var type2 = '';
    var stats = {};
    var gen = '';

    await axios.get('https://pokeapi.co/api/v2/pokemon/' + Pokemon)
        .then(function (res) {
            name = res.data.name;
            sprite = res.data.sprites.front_default;

            type1 = res.data.types[0].type.name;
            if (res.data.types.length == 2) {
              type2 = res.data.types[1].type.name;
            }
            else {
              type2 = res.data.types[0].type.name;
            }
            
            stats = {
                hp: res.data.stats[0].base_stat, 
                attack: res.data.stats[1].base_stat, 
                defense: res.data.stats[2].base_stat, 
                spattack: res.data.stats[3].base_stat, 
                spdefense: res.data.stats[4].base_stat, 
                speed: res.data.stats[5].base_stat
            };
        })
        .catch(function (e){
          console.log(e);
          return(undefined);
        });
    
    await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + Pokemon)
        .then(function (res) {
            gen = res.data.generation.name;
            switch(gen){
              case "generation-i": gen = 1; break;
              case "generation-ii": gen = 2; break;
              case "generation-iii": gen = 3; break;
              case "generation-iv": gen = 4; break;
              case "generation-v": gen = 5; break;
              case "generation-vi": gen = 6; break;
              case "generation-vii": gen = 7; break;
              case "generation-viii": gen = 8; break;
            }
        })
        .catch(function (e){
          console.log(e);
          return(undefined);
        });

    return Promise.resolve({
      name: name,
      sprite: sprite,
      gen: gen,
      type1: type1,
      type2: type2,
      stats: stats
    });
  }

  const comparePokemon = (guessedPokemon, pokemon) => {   
    if(guessedPokemon.name == pokemon.name) {
      return({
        pokemon: guessedPokemon.name,
        gen: 'equal',
        type1: 'equal',
        type2: 'equal',
        stats: {hp: 'equal', attack: 'equal', defense: 'equal', spattack: 'equal', spdefense: 'equal', speed: 'equal'}
      });
    }
    else {
      var gen;
      var type1;
      var type2;
      var hp;
      var attack;
      var defense;
      var spattack;
      var spdefense;
      var speed;

      switch(true){
        case (guessedPokemon.gen > pokemon.gen): gen = 'lower'; break;
        case (guessedPokemon.gen < pokemon.gen): gen = 'higher'; break; 
        case (guessedPokemon.gen == pokemon.gen): gen = 'equal'; break; 
      }
  
      switch(true){
        case (guessedPokemon == pokemon.type1): type1 = 'right'; break; 
        case (guessedPokemon.type1 != pokemon.type1 && guessedPokemon.type1 == pokemon.type2): type1 = 'inside'; break;  
        default: type1 = 'false'; break;
      }
  
      switch(true){
        case (guessedPokemon.type2 == pokemon.type2): type2 = 'right'; break; 
        case (guessedPokemon.type2 != pokemon.type2 && guessedPokemon.type2 == pokemon.type1): type2 = 'inside'; break;  
        default: type2 = 'false'; break;
      }
  
      switch(true){
        case (guessedPokemon.stats.hp > pokemon.stats.hp): hp = 'lower'; break; 
        case (guessedPokemon.stats.hp < pokemon.stats.hp): hp = 'higher'; break; 
        case (guessedPokemon.stats.hp == pokemon.stats.hp): hp = 'equal'; break; 
      }
  
      switch(true){
        case (guessedPokemon.stats.attack > pokemon.stats.attack): attack = 'lower'; break; 
        case (guessedPokemon.stats.attack < pokemon.stats.attack): attack = 'higher'; break; 
        case (guessedPokemon.stats.attack == pokemon.stats.attack): attack = 'equal'; break; 
      }
  
      switch(true){
        case (guessedPokemon.stats.defense > pokemon.stats.defense): defense = 'lower'; break; 
        case (guessedPokemon.stats.defense < pokemon.stats.defense): defense = 'higher'; break; 
        case (guessedPokemon.stats.defense == pokemon.stats.defense): defense = 'equal'; break; 
      }
  
      switch(true){
        case (guessedPokemon.stats.spattack > pokemon.stats.spattack): spattack = 'lower'; break; 
        case (guessedPokemon.stats.spattack < pokemon.stats.spattack): spattack = 'higher'; break; 
        case (guessedPokemon.stats.spattack == pokemon.stats.spattack): spattack = 'equal'; break; 
      }
  
      switch(true){
        case (guessedPokemon.stats.spdefense > pokemon.stats.spdefense): spdefense = 'lower'; break; 
        case (guessedPokemon.stats.spdefense < pokemon.stats.spdefense): spdefense = 'higher'; break; 
        case (guessedPokemon.stats.spdefense == pokemon.stats.spdefense): spdefense = 'equal'; break; 
      }
  
      switch(true){
        case (guessedPokemon.stats.speed > pokemon.stats.speed): speed = 'lower'; break; 
        case (guessedPokemon.stats.speed < pokemon.stats.speed): speed = 'higher'; break; 
        case (guessedPokemon.stats.speed == pokemon.stats.speed): speed = 'equal'; break; 
      }
  
      return({
        pokemon: guessedPokemon.name,
        sprite: guessedPokemon.sprite,
        gen: gen,
        type1: type1,
        type2: type2,
        stats: {hp: hp, attack: attack, defense: defense, spattack: spattack, spdefense: spdefense, speed: speed}
      });
    }
  }

  return (
    <div className="App">
      <PokeGuess
        guessHistory={guessHistory}
      />
      <PokeInput
        pokemon={pokemon}
        inputPokemon={inputPokemon}
        updateInputPokemon={updateInputPokemon}
        updateGuessHistory={updateGuessHistory}
      />
    </div>
  );
}

export default App;
