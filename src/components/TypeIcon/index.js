import styles from "./styles.module.scss";

function TypeIcon({type}) {
    var style = undefined;
    switch(type){
        case 'normal': style = styles.normal; break;
        case 'grass': style = styles.grass; break;
        case 'fire': style = styles.fire; break;
        case 'water': style = styles.water; break;
        case 'electric': style = styles.electric; break;
        case 'ice': style = styles.ice; break;
        case 'ground': style = styles.ground; break;
        case 'rock': style = styles.rock; break;
        case 'steel': style = styles.steel; break;
        case 'fighting': style = styles.fighting; break;
        case 'poison': style = styles.poison; break;
        case 'psychic': style = styles.psychic; break;
        case 'flying': style = styles.flying; break;
        case 'dragon': style = styles.dragon; break;
        case 'dark': style = styles.dark; break;
        case 'fairy': style = styles.fairy; break;
        case 'bug': style = styles.bug; break;
        case 'ghost': style = styles.ghost; break;
    }

    if(style != undefined){
         return(
            <div className={`${style} ${styles.type}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
        )
    }
    else{
        return
    }
   

}

export default TypeIcon;