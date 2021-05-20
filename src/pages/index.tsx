//SPA

import { useEffect } from "react"

export default function Home() {
 //dispara algo semrpe q algo mudar na aplcialçao
  
  return (
    <h1>
    
    <div><img src="IMG-20210519-WA0067.png" alt="cu bosta mijo" /></div>

    </h1>
  )
}

export async function getStaticProps() {

  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return{ 
    props: {
      episodes: data, },
    revalidate: 60 * 60 * 8, 
  }
}