
import '../styles/global.scss'
import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';
import { PlayerContext } from '../components/contexts/PlayerContext';
import{ useState } from 'react';



function MyApp({ Component, pageProps }) { //template onde div recebe o player como 
  const [episodeList, setEpisodeList] = useState([]); //passa os valores tipados para os coisa selecionado
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const[isPlaying, setIsPlaying] = useState(false);

  function play (episode){ //joga o episodio selecionado em episodeLIST 
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(){ //se tiver tocando pausa, se tiver pausado da play
    setIsPlaying(!isPlaying);
  } 

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  } 

  return (
    <PlayerContext.Provider value = {{episodeList, currentEpisodeIndex, play, isPlaying, togglePlay,setPlayingState}}>
    <div className = {styles.wrapper}> 
      <main>
      <Header />
      <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContext.Provider>
  )
}

export default MyApp

