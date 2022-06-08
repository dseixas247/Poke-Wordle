import { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.scss';

import Suggested from './Suggested';

function PokeInput({loaded, pokemonList, pokemon, inputPokemon, updateInputPokemon, updateGuessHistory}) {

    const [focus, setFocus] = useState(false);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        var newList = [];

        pokemonList.map((item) => {
            var regex = new RegExp("^" + inputPokemon.toLowerCase(), 'i');
            if (regex.test(item.name)){
                newList.push(item);
            }
        })
        
        setSuggestions(newList);
    }, [inputPokemon, loaded]);
    
    return(
        <div className={styles.container}>
            <Suggested loaded={loaded} input={inputPokemon.length != 0} focus={focus} content={suggestions} updateInputPokemon={updateInputPokemon}/>
                
            <input className={styles.input} type='text' value={inputPokemon} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={e => updateInputPokemon(e.target.value)}/>
            <button onClick={() => {if(inputPokemon != '' && pokemon != undefined){updateGuessHistory(inputPokemon, pokemon)}}}>Submit</button>
        </div>
        
    )
}

export default PokeInput;