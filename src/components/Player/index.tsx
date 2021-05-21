import format from 'date-fns/format';
import ptBr from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss';

export function Player(){
    return (
        <div className = {styles.playerContainer}>
            <header>
                <img src ="/playing.svg" alt="peidando" />
                <strong>SÓ O FILÉ</strong> 
            </header>

            <div className = {styles.emptyPlayer}>
                <strong>Selecione um ngc pra ouvir</strong>
            </div>
            
            <footer className = {styles.empty}>
                <div className = {styles.progress}>
                    <span>00:00</span>
                    <div className = {styles.slider}> 
                        <div className = {styles.emptySlider}/>
                    </div>
                
                <span>00:00</span>

                </div>

                <div className = {styles.buttons}>
                <button type = "button">
                    <img src = "/shuffle.svg" alt="Aleatório" />
                </button>

                <button type = "button">
                    <img src = "/play-previous.svg" alt="Anterior" />
                </button>

                <button type = "button" className = {styles.playButton}>
                    <img src = "/play.svg" alt="Tocar punheta" />
                </button>

                <button type = "button">
                    <img src = "/play-next.svg" alt="Próximo" />
                </button>

                <button type = "button">
                    <img src = "/repeat.svg" alt="Repetir" /> 
                </button>
                </div>
            </footer>
        </div>

    );
}