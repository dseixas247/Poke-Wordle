import styles from './styles.module.scss';
import GuessIcon from '../GuessIcon/index.js';

function PokeGuess({guessHistory}) {

    const content = guessHistory.map((item, key) =>{
        return(
            <tr key={key}>
                <td className={styles.pokemon}>
                    <img src={item.sprite}/>
                    {item.pokemon.charAt(0).toUpperCase() + item.pokemon.slice(1)}
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
                    {content}
                </tbody>
            </table>
        </div>
        
    );

} 

export default PokeGuess;