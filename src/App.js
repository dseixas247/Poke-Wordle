import { useState, useEffect, useCallback } from 'react';
import './App.css';

import PokeGuess from './components/PokeGuess';
import PokeInput from './components/PokeInput';

function App() {
  const [background, setBackground] = useState(Math.floor(Math.random() * 9)+55);

  const [infoOpen, setInfoOpen] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const [pokemonList, setPokemonList] = useState([]);

  const [hiddenPokemon, setHiddenPokemon] = useState(undefined);

  const [inputPokemon, setInputPokemon] = useState('');

  const [guesses, setGuesses] = useState([]);

  const updateInputPokemon = useCallback((pokemon) => {
    var str = pokemon.replace(/[`~!@#$%^&*()_|+\=?;'",<>\{\}\[\]\\\/]/gi, '');
    setInputPokemon(str);
  }, [inputPokemon]);

  const updateGuesses = useCallback(async (guessedPokemon, pokemon) => {
    var history = guesses;
    history.push(comparePokemon(guessedPokemon, pokemon));
    setGuesses(history);
    updateInputPokemon("");
    localStorage.setItem("guesses", JSON.stringify(history));
  }, [guesses])

  useEffect(() => {
    getAll();
  }, [1]);

  useEffect(() => {
    
    getHiddenPokemon();
  }, [loaded]);

  const axios = require('axios');

  const getStorage = async() => {
    var storage = {
      pokemonList: JSON.parse(localStorage.getItem("pokemonList")),
      guesses: JSON.parse(localStorage.getItem("guesses")),
      hiddenPokemon: JSON.parse(localStorage.getItem("hiddenPokemon"))
    }
    
    return Promise.resolve(storage);
  }

  const getAll = async() => {
      await getStorage()
      .then(async function (res){
        if(res.pokemonList == null){
          await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1126')
          .then(async function (res){
              await getData(res.data.results)
              .then(res => {
                  setPokemonList(res);
                  setLoaded(true);
                  localStorage.setItem("pokemonList", JSON.stringify(res));
              });
          })
          .catch(function (e){
              console.log(e);
          });
        }
        else{
          setPokemonList(res.pokemonList);
          setTimeout(function (){
            setLoaded(true);
          }, 1000);
        }

        if(res.guesses != null){
          setTimeout(function (){
            setGuesses(res.guesses);
          }, 1000);
        }
      })
  }

  const getData = async(all) => {
      var list = []
      if(all.length > 0){
          for (const item of all){
              if(
                  !item.name.includes("-") 
                  || (item.name.endsWith("-alola") && !item.name.includes("-totem"))
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
                  || item.name.includes("Ho-oh")
                  || item.name.includes("mime")
                  || item.name.includes("mr-rime")
                  || item.name.includes("porygon")
                  || item.name.includes("-crowned")
                  || item.name.includes("meowstic-male")
                  || item.name.includes("type-null")
                  || item.name.endsWith("-belly")
              ){
                  await getPokemonData(item.name)
                  .then(function (res){
                      list.push(res);
                  })
                  .catch(function (e){
                      console.log(e);
                  });
              }
          };   
      }
      return Promise.resolve(list);
  } 

  const getHiddenPokemon = async() => {
    if(loaded){
      await getStorage()
      .then(function (res){
        if(res.hiddenPokemon != null){
          setHiddenPokemon(res.hiddenPokemon);
        }
        else{
          const pokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
          setHiddenPokemon(pokemon);
          localStorage.setItem("hiddenPokemon", JSON.stringify(pokemon));
        }
      })
    }
  }

  const getPokemonData = async(Pokemon) => {
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
    
    await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + `${Pokemon == 'mr-mime-galar' ? Pokemon.split('-galar')[0] : Pokemon.split("-")[0]}`)
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
        .catch(async function (e){
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
              error = true;
            });
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

  console.log(hiddenPokemon);

  return (
    <div className="App" style={{backgroundImage: `url('https://tcg.pokemon.com/assets/img/home/wallpapers/wallpaper-${background}.jpg')`}}>
      <div className='Content'>
        
        <div className="Title">Poké-Wordle</div>

        <div className={`InfoButton ${infoOpen ? "close" : ""}`} onClick={() => setInfoOpen(!infoOpen)}>{infoOpen ? 'x' : 'i'}</div>
        <div className={`${infoOpen ? "Info" : "hidden"}`}>
          <h1>How To Play</h1>
          <h2>Objective of the game</h2>
          <div className="InfoText">
            The objective of the game is to find out which Pokémon we're searching for by guessing. <br/>
            Each guess you get feedback and with it closer to the Pokémon we want. <br/>
            The searched Pokemon can be a regional form or a mega or even an alternate form. <br/>
            (alternate forms which don't change typing or stats from the original are not included)
          </div>
          <h2>Guessing a Pokémon</h2>
          <div className="InfoText">
            You can look for Pokémon in the list or by typing it's name. <br/>
            The list filters as you start writing a name and you can also filter the list <br/> by generation, type or a stat by typing: <br/><br/>
            gen:(number from 1 to 8) ex.: gen:1 <br/>
            type:(name of type) ex.: type:electric <br/>
            (name of stat):(positive number) ex.: sp.atk:50 <br/><br/>
            Once you have chosen a valid Pokémon just click submit. 
          </div>
          <h2>Interpreting your guesses</h2>
          <div className="InfoText">
            After submitting a Pokémon the game will give you hints depending on <br/> how the Pokémon you submitted compares to the Pokémon that is being searched. 
          </div>
          <div className="InfoText">
            <img src='/RightSymbol.png'/> <br/> the Pokémon searched for has the same value as the one submitted. 
          </div>
          <div className="InfoText">
            <img src='/HigherSymbol.png'/> <br/> the Pokémon searched for has a numerically higher value as the one submitted. 
          </div>
          <div className="InfoText">
            <img src='/LowerSymbol.png'/> <br/> the Pokémon searched for has a numerically lower value as the one submitted. 
          </div>
          <div className="InfoText">
            <img src='/FalseSymbol.png'/> <br/> the Pokémon searched for has a different type as the one submitted.
          </div>
          <div className='InfoTextEnd'>
            <img src='/InsideSymbol.png'/> <br/> the Pokémon searched for has the same typing <br/> but on a different position as the one submitted. <br/> (primary and secondary type)
          </div>
        </div>

        <PokeGuess
        loaded={loaded}
        guesses={guesses}
        />

        <PokeInput
          loaded={loaded}
          pokemonList={pokemonList}
          pokemon={hiddenPokemon}
          inputPokemon={inputPokemon}
          updateInputPokemon={updateInputPokemon}
          updateGuesses={updateGuesses}
        />

      </div>
    </div>
  );
}

export default App;
