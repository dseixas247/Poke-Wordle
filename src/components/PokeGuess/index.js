import styles from './styles.module.scss';
import GuessIcon from '../GuessIcon/index.js';

function PokeGuess({loaded, guessHistory}) {

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
                <thead className={styles.head}>
                    <tr>
                        <td>
                            Pokemon
                        </td>
                        <td>
                            Generation
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
                <tbody className={styles.body}>
                    {!loaded &&
                        <tr className={styles.message}>
                            <td>
                                Wait for the application to load all pokemon data
                            </td>
                        </tr>
                    }
                    {(content.length == 0 && loaded) && 
                        <tr className={styles.message}>
                            <td>
                                Start guessing the pokemon we're looking for
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