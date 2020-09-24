import {Router, useRouter} from 'next/router'
import { useQuery, gql } from "@apollo/client";
import {fetchAPI, FetchAPI } from '../../queries/fetch'

import React, { Component } from 'react';
import { GET_ALL_EVENTS } from '../../queries/urlQueries';
  

  //This page is rendered for every event belonging to Event Job
  const EventPage = ({meta}) => {
   
     const { events } = meta

     
          return (
              <div>
               { JSON.stringify(meta)}
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
EventPage.getInitialProps = async ( ctx ) => {
    const data = await fetchAPI(
        `query getMetaForEvent($slug : String!){
          events(where :{
            slug : $slug
          }){
            EventName
            isMainEvent
            client{
              ClientName
            }
          }
        }`,
            { 
            variables: {
                slug : ctx.query.slug
            }
         }
    )
    console.log(ctx)
    const meta = await data
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {  meta  }
  }

  

