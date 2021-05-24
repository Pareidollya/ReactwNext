import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';

export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null); //criar referencias html, começa como null pq o episodio so vai em tela quando solecionar na playlist

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying,
        setPlayingState,
        togglePlay } = useContext(PlayerContext)

    
    useEffect(() => {
        if (!audioRef.current){ //caso tenha nada
            return;
        }

        if (isPlaying){
            audioRef.current.play();
        } else{
            audioRef.current.pause();
        }
        

    }, [isPlaying]) //toda vez que isPlayng tiver o valor alterado, alguma coisa deve acontecer

    const episode = episodeList[currentEpisodeIndex] //determinar qual musica esta tocando

    return (
        <div className = {styles.playerContainer}>
            <header>
                <img src ="/playing.svg" alt="peidando" />
                <strong>Só o filé</strong> 
            </header>

            {episode? (
                <div className = {styles.currentEpisode}>
                <Image 
                width={592} 
                height={592}
                src={episode.thumbnail} 
                objectFit = "cover"
                 />
                 <strong>{episode.title}</strong>
                 <span>{episode.members}</span>

            </div>
                
            ) : (
                <div className = {styles.emptyPlayer}>
                <strong>Selecione um ngc pra ouvir</strong>
            </div>
                
            )}

            <footer className = {!episode ? styles.empty : ''}> 
                <div className = {styles.progress}>
                    <span>00:00</span>
                    <div className = {styles.slider}> 
                       {episode ? (
                           <Slider
                           trackStyle={{backgroundColor: '#04d361'}}
                           railStyle = {{backgroundColor: '#9f75ff'}}
                           handleStyle = {{ borderColor: '#04d361', borderTopWidth: 3 }}
                           />
                       ) : (
                        <div className = {styles.emptySlider}/>
                       )}
                    </div>
                
                <span>00:00</span>

                {episode && (
                    <audio 
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    />
                
                )}

                </div>

                <div className = {styles.buttons}>
                <button type = "button" disabled={!episode}>
                    <img src = "/shuffle.svg" alt="Aleatório" />
                </button>

                <button type = "button" disabled={!episode}>
                    <img src = "/play-previous.svg" alt="Anterior" />
                </button>

                <button type = "button" 
                className = {styles.playButton}
                disabled={!episode}
                onClick={togglePlay}
                >
                    {isPlaying 
                    ? <img src = "/pause.svg" alt="Tocar punheta" /> 
                    : <img src = "/play.svg" alt="Tocar punheta" />}
                </button>

                <button type = "button" disabled={!episode}>
                    <img src = "/play-next.svg" alt="Próximo" />
                </button>

                <button type = "button" disabled={!episode}>
                    <img src = "/repeat.svg" alt="Repetir" /> 
                </button>
                </div>
            </footer>
        </div>

    );
}