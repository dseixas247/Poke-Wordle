import { useEffect, useState } from "react";
import styles from './styles.module.scss';

function Suggested({content}) {
    const axios = require('axios');

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [content])

    async function getData() {
        var pokemons = []
        for (const item of content){
            await axios.get(item)
            .then(function (res){
                pokemons.push(res.data);
            })
            .catch(function (e){
                console.log(e);
            });
        };
        setData(pokemons);
    } 
    
    const suggestedContent = data.map((item, key) => {
        return(
            <tr key={key}>
                <td className={styles.right}>
                    <img src={item.sprites.front_default}/>
                </td>
                <td className={styles.right}>
                    {item.name}
                </td>
                <td className={styles.right}>
                    {`${item.types.length == 2 ? item.types[0].type.name + '' + item.types[1].type.name : item.types[0].type.name}`}
                </td>
                <td className={styles.right}>
                    {item.stats[0].base_stat}
                </td>
                <td>
                    {item.stats[1].base_stat}
                </td>
                <td className={styles.left}>
                    {item.stats[2].base_stat}
                </td>
                <td className={styles.left}>
                    {item.stats[3].base_stat}
                </td>
                <td className={styles.left}>
                    {item.stats[4].base_stat}
                </td>
                <td className={styles.left}>
                    {item.stats[5].base_stat}
                </td>
            </tr>
        );
    });

    return(
        <div className={styles.suggested}>
                <table>
                    <thead>
                        <tr>
                            <td className={styles.right}>
                                Sprite
                            </td>
                            <td className={styles.right}>
                                Name
                            </td>
                            <td className={styles.right}>
                                Type
                            </td>
                            <td className={styles.right}>
                                HP
                            </td>
                            <td>
                                Attack
                            </td>
                            <td className={styles.left}>
                                Defense
                            </td>
                            <td className={styles.left}>
                                Sp. Attack
                            </td>
                            <td className={styles.left}>
                                Sp. Defense
                            </td>
                            <td className={styles.left}>
                                Speed
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {suggestedContent}
                    </tbody>
                </table>
            </div>
    )
}

export default Suggested;