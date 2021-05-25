import { createContext, useState, ReactNode, useContext } from 'react';

type Episode ={
    title:string;
    members: string;
    thumbnail:string;
    duration: number;
    url:string;

}

type PlayerContext ={
    episodeList: Episode[];
    currentEpisodeIndex:number; //qual posição da lista esta tocando
    hasNext: boolean;
    hasPrevorious:boolean;
    isPlaying:boolean;
    isLooping:boolean;
    isShuffling: boolean;

    setPlayingState: (state: boolean) => void;
    play: (episodes: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevorious: () => void;
    togglePlay: () => void;
    toggleShuffle: () => void;
    toggleLoop: () => void;
    clearPlayerState: () => void;
};
type PlayerContextProviderProps={
    children: ReactNode //reactNodesignifica que ele aceitaria qualquer conteudo do jsx, ou seja, html, js, qq coisa
}


export const PlayerContext = createContext({} as PlayerContext);

export function PlayerContextProvider({children}: PlayerContextProviderProps){ // novo componente, children permite que seja inserido componentes dentro dele em outra classe (propiedades)
    const [episodeList, setEpisodeList] = useState([]); //passa os valores tipados para os coisa selecionado
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const[isPlaying, setIsPlaying] = useState(false);
    const[isLooping, setIsLooping] = useState(false);
    const[isShuffling, setIsShuffling] = useState(false);

    function play (episode: Episode){ //joga o episodio selecionado em episodeLIST 
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){ //quando der play ele recebe uma playlist
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
         
    }
  
    function togglePlay(){ //se tiver tocando pausa, se tiver pausado da play
      setIsPlaying(!isPlaying);
    } 

    function toggleLoop(){ //se tiver tocando pausa, se tiver pausado da play
        setIsLooping(!isLooping);
      }

    function toggleShuffle(){ //se tiver tocando pausa, se tiver pausado da play
        setIsShuffling(!isShuffling);
      } 
    const hasPrevorious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length

    function playNext(){
        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() *episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)

        }else if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1); //incrementa o indice do episodio
        }
    }

    function playPrevorious(){
        if (hasPrevorious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1); 
        }
         
    }
  
    function setPlayingState(state: boolean){
        
      setIsPlaying(state); 
    } 
    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

  
    return (
      <PlayerContext.Provider value = {{
          episodeList, 
          currentEpisodeIndex, 
          play,
          playList,
          isPlaying, 
          isLooping,
          isShuffling,
          hasNext,
          hasPrevorious,
          playNext,
          playPrevorious,
          togglePlay,
          toggleLoop,
          toggleShuffle,
          setPlayingState,
          clearPlayerState
          }}
        >
         {children} 
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}