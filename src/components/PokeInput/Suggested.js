import { useEffect } from "react";
import styles from './styles.module.scss';

import TypeIcon from '../TypeIcon/index.js';

function Suggested({loaded, input, focus, content, updateInputPokemon}) {

    const suggestedContent = content.map((item, key) => {
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

    useEffect(() => {
    }, [loaded, focus]);
    
    return(
        <div className={`${styles.suggested} ${focus ? styles.open : styles.closed}`}>
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
                        {!loaded && 
                            <tr className={styles.message}>
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