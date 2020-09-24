import {Router, useRouter} from 'next/router'
import { useQuery, gql } from "@apollo/client";
import {fetchAPI, FetchAPI } from '../../queries/fetch'

import React, { Component } from 'react';
import { GET_ALL_EVENTS } from '../../queries/urlQueries';
  
  const EventPage = (props) => {
   
     const { events } = props.data

     
          return (
              <div>
              <h1> {events.EventName}</h1>
              {Object.keys(events).map(e => {
                return (
                  <p>{events[e].EventName}</p>
                )
              })}
              </div>
          );
  }
  
  export default EventPage


  // This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
    const data  = await fetchAPI(
        `query getAllEventsForJob($eventUrl: String!){
            events(where: {
                event_job : {
                eventUrl : $eventUrl
                }
            }){
                EventName
                event_job{
                eventUrl
                }
            }
            }`,
            { 
            variables: {
                eventUrl : context.pathname
            }
         }
    )
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
    }
  }

  export async function getStaticPaths() {

    const data  = await fetchAPI(
        `query getAllEventsForJob($eventUrl: String){
            events(where: {
                event_job : {
                eventUrl : $eventUrl
                }
            }){
                EventName
                id
                slug
                event_job{
                eventUrl
                }
            }
            }`,
            { 
            variables: {
                eventUrl : 'test-event-2'
            }
         }
    )
 
      
    const paths = await data.events.map(e => `/test-event-2/${e.slug}`)

        // const paths = [
        //     { params: { title: 'yed' } },
        //     { params: { title: '2' } }
        // ]
    return{
    paths, 
    fallback: false
    }
  }

