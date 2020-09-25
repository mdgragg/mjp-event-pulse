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
  }
  if(error){
    return <p> There was an error loading the content.  Please contact system provider. <br/>
    Error message: <strong> {error.message}</strong></p>

  } else { 
    return(
      <div> 
    <h1>All Event Jobs</h1>
   { data.eventJobs.map(j => (
     <div>
    Event:       <Link href={j.eventUrl}>{j.EventJobName}</Link>
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