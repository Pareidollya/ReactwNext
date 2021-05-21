//SPA

import { useEffect } from "react"

export default function Home(props) {
 //dispara algo semrpe q algo mudar na aplcialçao
  
  return (
    <div>
      <h1> <img src="XV_logo.svg" alt="sim"/></h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
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