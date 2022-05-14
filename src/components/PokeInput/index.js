import { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.scss';

import Suggested from './Suggested';

function PokeInput({pokemon, inputPokemon, updateInputPokemon, updateGuessHistory}) {
    const axios = require('axios');

    const [pokemonList, setPokemonList] = useState([]);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=898')
            .then(function (res){
                setPokemonList(res.data.results);
            })
            .catch(function (e){
                console.log(e);
            });
    }, [1]);

    useEffect(() => {
        var newList = [];

        if(inputPokemon.length >= 2){
            pokemonList.map((item) => {
                var regex = new RegExp("^" + inputPokemon.toLowerCase(), 'i');
                if (regex.test(item.name)){
                    newList.push(item.url);
                }
            })
        }
        
        setSuggestions(newList);
    }, [inputPokemon]);
    
    return(
        <div className={styles.container}>
            <Suggested content={suggestions} updateInputPokemon={updateInputPokemon}/>
                
            <input className={styles.input} type='text' value={inputPokemon} onChange={e => updateInputPokemon(e.target.value)}/>
            <button onClick={() => {if(inputPokemon != '') updateGuessHistory(inputPokemon, pokemon)}}>Submit</button>
        </div>
        
    )
}

export default PokeInput;