import styles from './styles.module.scss';

function GuessIcon({value}) {
    switch(value){
        case 'equal': return <img className={styles.image} src='/RightSymbol.png'/>
        case 'right': return <img className={styles.image} src='/RightSymbol.png'/>
        case 'lower': return <img className={styles.image} src='/LowerSymbol.png'/>
        case 'higher': return <img className={styles.image} src='/HigherSymbol.png'/>
        case 'inside': return <img className={styles.image} src='/InsideSymbol.png'/>
        case 'false': return <img className={styles.image} src='/FalseSymbol.png'/>
    }

}

export default GuessIcon;