import Image from 'next/image';
import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss';

export  function Header(){
    //

    const currentDate = format(new Date, 'EEEEEE, d MMMM',{
        locale: ptBr,
    })

    return (
        <header className={styles.headerContainer}>
            <img src= "logo.png" alt="kd a logo? kk" /> 
            
            <p> Um tabaco bem massa pra nois ouvir e fuder mesmo</p>

            <span>{currentDate}</span>
        </header>

    );
}