import { useEffect } from "react";
import styles from './styles.module.scss';

import TypeIcon from '../TypeIcon/index.js';

function Suggested({loaded, input, content, updateInputPokemon}) {

    const suggestedContent = content.map((item, key) => {
        var name = "";
        var names = item.name.split('-');
        
        for(let i = 0; i < names.length; i++){
            names[i] = `${names[i][0].split(0).toString().toUpperCase() + names[i].slice(1)}${i == (names.length-1) ? '' : ' '}`
        };

        for(let i = 0; i < names.length; i++){
            name = name + names[i];
        };

        return(
            <tr key={key} onClick={() => updateInputPokemon(item.name)}>
                <td className={styles.pokemon}>
                    <img src={item.sprites.front_default}/>
                    {name}
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

    useEffect(() => {
    }, [loaded]);
    
    return(
        <div className={styles.suggested}>
                <table>
                    <thead className={styles.head}>
                        <tr>
                            <td>
                                Pokemon
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
                                Sp. Atk
                            </td>
                            <td>
                                Sp. Def
                            </td>
                            <td>
                                Speed
                            </td>
                        </tr>
                    </thead>
                    <tbody className={styles.body}>
                        {!loaded && 
                            <tr className={styles.loading}>
                                <td>
                                    <img src='./LoadingIcon.png'/>
                                </td>
                            </tr>
                        }
                        {(loaded && input && content.length == 0) && 
                            <tr className={styles.message}>
                                <td>
                                    no pokemon found with that name
                                </td>
                            </tr>
                        }
                        {suggestedContent}
                    </tbody>
                </table>
            </div>
    )
}

export default Suggested;