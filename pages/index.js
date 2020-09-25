import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {  gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {


  const {loading, data = {}, error } = useQuery(ALL_URL_QUERY)

  // const eventJobs = data.eventJobs
  const [eventJobs, setFetchedData] = useState(  {eventJobs : {data}}  )

  useEffect(()=>{
    setFetchedData({eventJobs: data.eventJobs})
  })
  const event_meta  = {...eventJobs}
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



 {
 
 Object.keys(event_meta).map(j => (
     <div>
    Event:       <Link href={event_meta[j].eventUrl}>{j.EventJobName}</Link>
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