import { useState, useEffect, useCallback } from 'react';
import './App.css';

import PokeGuess from './components/PokeGuess';
import PokeInput from './components/PokeInput';

function App() {
  const [background, setBackground] = useState(Math.floor(Math.random() * 9)+55);

  const [loaded, setLoaded] = useState(false);

  const [pokemonList, setPokemonList] = useState([]);

  const [hiddenPokemon, setHiddenPokemon] = useState(undefined);

  const [inputPokemon, setInputPokemon] = useState('');

  const [guesses, setGuesses] = useState(0);

  const [guessHistory, setGuessHistory] = useState([]);

  const updateHiddenPokemon = useCallback((pokemon) => {
    setHiddenPokemon(pokemon);
  }, [hiddenPokemon]);

  const updateInputPokemon = useCallback((pokemon) => {
    var str = pokemon.replace(/[013456789`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
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
    if(loaded){
      getPokemonData(pokemonList[Math.floor(Math.random() * pokemonList.length)].name).then(res => {updateHiddenPokemon(res)});
    }
  }, [loaded]);

  useEffect(() => {
    const getAll = async() => {
        await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1126')
        .then(async function (res){
            await getData(res.data.results).then(res => {
                setPokemonList(res);
                setLoaded(true);
            });
        })
        .catch(function (e){
            console.log(e);
        });
    }

    const getData = async(all) => {
        var list = []
        if(all.length > 0){
            for (const item of all){
                if(
                    !item.name.includes("-") 
                    || item.name.endsWith("-alola")
                    || item.name.includes("-galar")
                    || item.name.includes("-mega")
                    || item.name.includes("-primal")
                    || item.name.includes("deoxys")
                    || item.name.includes("calyrex")
                    || item.name.includes("eiscue")
                    || item.name.includes("hoopa")
                    || item.name.includes("-complete")
                    || item.name.includes("-crowned")
                    || item.name.includes("darmanitan")
                    || item.name.includes("necrozma")
                    || item.name.includes("kyurem")
                    || item.name.includes("-average")
                    || item.name.includes("keldeo")
                    || item.name.includes("aegislash")
                    || item.name.includes("-therian")
                    || item.name.includes("-incarnate")
                    || item.name.includes("wormadam")
                    || item.name.includes("shaymin")
                    || item.name.includes("giratina")
                    || item.name.includes("rotom")
                    || item.name.includes("castform")
                    || item.name.includes("meloetta")
                    || item.name.includes("oricorio")
                    || item.name.includes("lycanroc")
                    || item.name.includes("wishiwashi")
                    || item.name.includes("eiscue")
                    || item.name.endsWith("-strike")
                    || item.name.endsWith("u-disguised")
                    || item.name.includes("nidoran")
                    || item.name.endsWith("-50")
                    || item.name.includes("-10-")
                    || item.name.endsWith("-amped")
                    || item.name.includes("indeedee")
                    || item.name.includes("-red")
                    || item.name.includes("tapu")
                    || item.name.includes("o-o")
                    || item.name.includes("mime")
                    || item.name.includes("mr-rime")
                    || item.name.includes("porygon")
                    || item.name.includes("-crowned")
                    || item.name.includes("meowstic-male")
                    || item.name.includes("type-null")
                    || item.name.endsWith("-belly")
                ){
                    await axios.get(item.url)
                    .then(function (res){
                        list.push(res.data);
                    })
                    .catch(function (e){
                        console.log(e);
                    });
                }
            };   
        }
        return(list);
    } 

    getAll()
    
}, [1]);

  const axios = require('axios');

  async function getPokemonData(Pokemon) {
    var error = false;

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
          error = true;
        });
    
    await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + Pokemon.split("-")[0])
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
          error = true;
        });

    if(!error){
      return Promise.resolve({
        name: name,
        sprite: sprite,
        gen: gen,
        type1: type1,
        type2: type2,
        stats: stats
      });
    }
    else{
      return Promise.resolve(undefined);
    }
    
  }

  const comparePokemon = (guessedPokemon, pokemon) => {   
    if(guessedPokemon.name == pokemon.name) {
      return({
        pokemon: guessedPokemon.name,
        sprite: guessedPokemon.sprite,
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
        case (guessedPokemon.type1 == pokemon.type1): type1 = 'right'; break; 
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
    <div className="App" style={{backgroundImage: `url('https://tcg.pokemon.com/assets/img/home/wallpapers/wallpaper-${background}.jpg')`}}>
      <div className='Content'>
        <PokeGuess
        guessHistory={guessHistory}
        />
        <PokeInput
          loaded={loaded}
          pokemonList={pokemonList}
          pokemon={hiddenPokemon}
          inputPokemon={inputPokemon}
          updateInputPokemon={updateInputPokemon}
          updateGuessHistory={updateGuessHistory}
        />
      </div>
    </div>
  );
}

export default App;
