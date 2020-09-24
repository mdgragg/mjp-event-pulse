import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {  gql, useQuery } from '@apollo/client'
import Link from 'next/link'

export default function Home() {


  const {loading, data, error } = useQuery(ALL_URL_QUERY)

  // const eventJobs = data.eventJobs

  if(loading){
    return ( 
    <h1>Loading...</h1>
    )
  }else { 
    return(
      <div> 
    <h1>Not Loading</h1>
   { data.eventJobs.map(j => (
     <div>
      <Link href={j.eventUrl}>{j.eventUrl}</Link>
      <br/>
      <br/>
      </div>
      
      )
      )}
    </div>
    )}
}

const ALL_URL_QUERY = gql`
 query jobs{
        eventJobs{
          id
          eventUrl
          EventJobName
        }
}
  `;