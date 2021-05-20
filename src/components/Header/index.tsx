import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss';

export  function Header(){

    const currentDate = format(new Date, 'EEEEEE, d MMMM',{
        locale: ptBr,
    })

    return (
        <header className={styles.headerContainer}>
            <img src= "logo.svg" alt="NLW" /> 

            <p> Um tabaco bem massa pra nois ouvir</p>

            <span>{currentDate}</span>
        </header>

    );
}