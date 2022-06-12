import styles from './styles.module.scss';
import GuessIcon from '../GuessIcon/index.js';
import { useRef } from 'react';

function PokeGuess({loaded, guessHistory}) {

    const headerScroll = useRef();
    const tableScroll = useRef();

    const onTableScroll = e => {
        headerScroll.current.scrollLeft = e.target.scrollLeft;
    };

    const content = guessHistory.map((item, key) =>{
        var name = "";
        var names = item.pokemon.split('-');
        
        for(let i = 0; i < names.length; i++){
            names[i] = `${names[i][0].split(0).toString().toUpperCase() + names[i].slice(1)}${i == (names.length-1) ? '' : ' '}`
        };

        for(let i = 0; i < names.length; i++){
            name = name + names[i];
        };

        return(
            <tr key={key}>
                <td className={styles.pokemon}>
                    <img src={item.sprite}/>
                    {name}
                </td>
                <td>
                    <GuessIcon value={item.gen}/>
                </td>
                <td>
                    <GuessIcon value={item.type1}/>
                </td>
                <td>
                    <GuessIcon value={item.type2}/>
                </td>
                <td>
                    <GuessIcon value={item.stats.hp}/>
                </td>
                <td>
                    <GuessIcon value={item.stats.attack}/>
                </td>
                <td>
                    <GuessIcon value={item.stats.defense}/>
                </td>
                <td>
                    <GuessIcon value={item.stats.spattack}/>
                </td>
                <td>
                    <GuessIcon value={item.stats.spdefense}/>
                </td>
                <td>
                    <GuessIcon value={item.stats.speed}/>
                </td>
            </tr>
        );
    });

    return(
        <div className={styles.guessTable}>
            <table>
                <thead ref={headerScroll} className={styles.head}>
                    <tr>
                        <td>
                            Pokémon
                        </td>
                        <td>
                            Gen
                        </td>
                        <td>
                            Type 1
                        </td>
                        <td>
                            Type 2
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
                <tbody ref={tableScroll} className={styles.body} onScroll={e => onTableScroll(e)}>
                    {!loaded &&
                        <tr className={styles.message}>
                            <td>
                                Retrieving Pokémon Data. <br/> This can take up to a minute.
                            </td>
                        </tr>
                    }
                    {(content.length == 0 && loaded) && 
                        <tr className={styles.message}>
                            <td>
                                Start guessing for the Pokémon we're looking for.
                            </td>
                        </tr>
                    }
                    {content}
                </tbody>
            </table>
        </div>
        
    );

} 

export default PokeGuess;