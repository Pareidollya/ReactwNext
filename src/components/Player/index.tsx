import Image from 'next/image';
import { useContext, useRef, useEffect, useState} from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';
import { convertDurationToTimeString, convertDurationToTimeStringMin } from '../../utils/convertDutrationToTimeString';

export function Player(){
    const audioRef = useRef<HTMLAudioElement>(null); //criar referencias html, começa como null pq o episodio so vai em tela quando solecionar na playlist
    const [progress, setProgress] = useState(0); //progresso do audio 

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying,
        isLooping,
        isShuffling,
        toggleLoop,
        setPlayingState,
        togglePlay,
        toggleShuffle,
        playNext,
        hasNext,
        hasPrevorious,
        playPrevorious,
        clearPlayerState } = usePlayer();
        

    
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

    function setpuProgressListener(){ //contador de audio
         audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime)) //precisa arredondar 
         });
    }

    function handleSeek(amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount)
         
    }
    function handleEpisodeEnded(){
        if(hasNext){
            playNext();
        }else{
            clearPlayerState();
        }
    }
    
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
                <span>{convertDurationToTimeStringMin(progress)}</span>
                    <div className = {styles.slider}> 
                       {episode ? (
                           <Slider
                           max={episode.duration}
                           value={progress}
                           onChange={handleSeek}
                           trackStyle={{backgroundColor: ' #04d361 '}}
                           railStyle = {{backgroundColor: ' #9f75ff '}}
                           handleStyle = {{ borderColor: ' #04d361 ', borderTopWidth: 3 }}
                           />
                       ) : (
                        <div className = {styles.emptySlider}/>
                       )}
                    </div>
                
                <span>{convertDurationToTimeStringMin(episode?.duration ?? 0)}</span>

                {episode && (
                    <audio 
                    src={episode.url}
                    ref={audioRef}
                    autoPlay
                    onEnded={handleEpisodeEnded}
                    loop={isLooping}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    onLoadedMetadata={setpuProgressListener}
                    />
                
                )}

                </div>

                <div className = {styles.buttons}>
                <button type = "button" 
                disabled={!episode || episodeList.length === 1 }//caso episode list seja 1 fica desabilitado
                onClick = {toggleShuffle}
                className = {isShuffling ? styles.isActive : ''}>
                    <img src = "/shuffle.svg" alt="Aleatório" />
                </button>

                <button type = "button" 
                    disabled={!episode || hasPrevorious}
                    onClick = {playPrevorious}
                    >
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

                <button type = "button" 
                    disabled={!episode || !hasNext}
                    onClick = {playNext}
                    >
                    <img src = "/play-next.svg" alt="Próximo" />
                </button>

                <button type = "button" 
                disabled={!episode}
                onClick = {toggleLoop}
                className = {isLooping ? styles.isActive : ''}
                >
                    <img src = "/repeat.svg" alt="Repetir" /> 
                </button>
                </div>
            </footer>
        </div>

    );
}