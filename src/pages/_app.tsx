
import '../styles/global.scss'
import { Header } from '../components/Header';

import styles from '../styles/app.module.scss';
import { PlayerContextProvider } from '../components/contexts/PlayerContext';
import { Player } from '../components/Player';



function MyApp({ Component, pageProps }) { //template onde div recebe o player como 
  return(
    
    <PlayerContextProvider>
    <div className = {styles.wrapper}> 
      <main>
      <Header />
      <Component {...pageProps} />
      </main>
      <Player/>
    </div> 
    </PlayerContextProvider>

  )
}
 
export default MyApp

