//SPA
import { GetStaticProps } from 'next';
import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link'; //o componente vai em volta da ancora de link
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDutrationToTimeString';

import styles from './home.module.scss';
import { PlayerContext } from '../components/contexts/PlayerContext';

type Episode ={
  id: string;
  title: string;
  thumbnail: string;
  members:string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}


//ul = listagem, li = list item, a = ancora ou link clicavel, <p> = paragrafo
//span parece com bloco <div>, porem é em linha apenas para agrupar 
//foreach percorre e edita os valores de algo, MAP ela percorre e retorna

export default function Home({latestEpisodes,allEpisodes}: HomeProps) {
  const {play} = useContext(PlayerContext)

  return ( //id de episodio nunca repete, deve-se usar como key pro react recriar o html sem conflito
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>

          <h2>Últimos lançamento😲🤯</h2>
          <ul> 
            {latestEpisodes.map(episode => {
              return ( 
                <li key={episode.id}> 
                
                  <Image width={192} 
                  height={192} 
                  src = {episode.thumbnail} 
                  alt = {episode.title}
                  objectFit="cover"/>

                    <div className = {styles.episodeDetails}>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                      <p> {episode.members}</p>
                      <span>{episode.publishedAt}</span> 
                      <span>{episode.durationAsString}</span>

                    </div>

                    
                    <button type = "button" onClick={ () => play(episode)}>
                      <img src = "/play-green.svg" alt="Play"/> 
                    </button>
                    

                </li>
              )
            })}
          </ul>
        </section>

        <section className={styles.allEpisodes}>
          <h2>TODOS AUDIO PENSA NELA VAI 😎</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Porracast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode2 =>{
                return(
                <tr key = {episode2.id}>  
                  <td style={{width: 100}}>
                    <Image 
                      width={240}
                      height={240}
                      src={episode2.thumbnail}
                      alt={episode2.title}
                      objectFit="cover"
                    />

                  </td>
                  <td>
                  <Link href={`/episodes/${episode2.id}`}>
                        <a>{episode2.title}</a>
                      </Link>
                  </td>
                  <td>{episode2.members}</td>
                  <td style={{width: 100}}>{episode2.publishedAt}</td>
                  <td>{episode2.durationAsString}</td>
                  <td>
                  
                  <button type="button" onClick={ () => play(episode2)}>
                      <img src="/play-green.svg" alt="Toca umazinha" />
                    </button> 
                  </td>
                </tr> 
                )
              })}
            </tbody>
          </table>

        </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => { //chamada de API (funções que podre ser carregada varias vezes sao enviadas em uma unica chamada de render
  
  const {data} = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => { //formatação dos dados do json
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration), 
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,


    };
  })

  const latestEpisodes = episodes.slice(0,2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return  { 
    props: {
      latestEpisodes, 
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, 
  }
}