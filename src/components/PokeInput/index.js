import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './styles.module.scss';

import Suggested from './Suggested';

function PokeInput({loaded, pokemonList, pokemon, inputPokemon, updateInputPokemon, updateGuessHistory}) {

    const input = useRef();

    const [validInput, setValidInput] = useState(false);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if(!/Mobi|Android/i.test(navigator.userAgent)) {
            input.current.focus();
        }
    });

    useEffect(() => {
        var newList = [];

        if(new RegExp("^gen:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.gen == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^type:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.type1 == inputPokemon.split(':')[1] || item.type2 == inputPokemon.split(':')[1]){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^hp:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.stats.hp == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^attack:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.stats.attack == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^defense:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.stats.defense == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^sp.atk:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.stats.spattack == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^sp.def:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.stats.spdefense == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        if(new RegExp("^speed:", 'i').test(inputPokemon)){
            pokemonList.map((item) => {
                if (item.stats.speed == parseInt(inputPokemon.split(':')[1])){
                    newList.push(item);
                }
            })
        }
        else{
            pokemonList.map((item) => {
                var regex = new RegExp("^" + inputPokemon.toLowerCase(), 'i');
                if (regex.test(item.name)){
                    newList.push(item);
                }
            })
        }
        
        setSuggestions(newList);

        if(pokemonList.findIndex((element) => element.name == inputPokemon) != -1){
            setValidInput(true);
        }
        else{
            setValidInput(false);
        }
    }, [inputPokemon, loaded]);
    
    return(
        <div className={styles.container}>
            <Suggested loaded={loaded} input={inputPokemon.length != 0} content={suggestions} updateInputPokemon={updateInputPokemon}/>
                
            <input ref={input} className={styles.input} type='text' value={inputPokemon} onChange={e => updateInputPokemon(e.target.value)}/>
            <div className={`${styles.button} ${!validInput || pokemon == undefined ? styles.inactive : ""}`} onClick={() => {if(validInput && pokemon != undefined){updateGuessHistory(suggestions[0], pokemon)}}}>Submit</div>
        </div>
        
    )
}

export default PokeInput;