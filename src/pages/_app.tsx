
import '../styles/global.scss'
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import styles from '../styles/app.module.scss';




function MyApp({ Component, pageProps }) { //template onde div recebe o player como 
  return (
    <div className = {styles.wrapper}> 
      <main>
      <Header />
      <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp

