import { createContext } from 'react';

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
    isPlaying:boolean;
    setPlayingState: (state: boolean) => void;
    play: (episodes: Episode) => void;
    togglePlay: () => void;
};

export const PlayerContext = createContext({} as PlayerContext);