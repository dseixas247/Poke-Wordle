import { useEffect, useState } from "react";
import styles from './styles.module.scss';

import TypeIcon from '../TypeIcon/index.js';

function Suggested({content, updateInputPokemon}) {
    const axios = require('axios');

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [content])

    async function getData() {
        var pokemons = []
        if(content.length > 0){
            for (const item of content){
                await axios.get(item)
                .then(function (res){
                    pokemons.push(res.data);
                })
                .catch(function (e){
                    console.log(e);
                });
            };   
        }
        setData(pokemons);
    } 

    const suggestedContent = data.map((item, key) => {
        return(
            <tr key={key} onClick={() => updateInputPokemon(item.name)}>
                <td>
                    <img src={item.sprites.front_default}/>
                </td>
                <td>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </td>
                <td>
                    <div className={styles.types}>
                        <TypeIcon type={item.types[0].type.name}/>
                        {item.types.length == 2 && <TypeIcon type={item.types[1].type.name}/>}
                    </div>
                </td>
                <td>
                    {item.stats[0].base_stat}
                </td>
                <td>
                    {item.stats[1].base_stat}
                </td>
                <td>
                    {item.stats[2].base_stat}
                </td>
                <td>
                    {item.stats[3].base_stat}
                </td>
                <td>
                    {item.stats[4].base_stat}
                </td>
                <td>
                    {item.stats[5].base_stat}
                </td>
            </tr>
        );
    });

    return(
        <div className={`${styles.suggested} ${data.length == 0 ? styles.closed : styles.open}`}>
                <table>
                    <thead className={styles.head}>
                        <tr>
                            <td>
                                Sprite
                            </td>
                            <td>
                                Name
                            </td>
                            <td>
                                Type
                            </td>
                            <td>
                                HP
                            </td>
                            <td>
                                Attack
                            </td>
                            <td>
                                Defense
                            </td>
                            <td>
                                Sp. Attack
                            </td>
                            <td>
                                Sp. Defense
                            </td>
                            <td>
                                Speed
                            </td>
                        </tr>
                    </thead>
                    <tbody className={styles.body}>
                        {suggestedContent}
                    </tbody>
                </table>
            </div>
    )
}

export default Suggested;