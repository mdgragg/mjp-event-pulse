import {Router, useRouter} from 'next/router'
import { useQuery, gql } from "@apollo/client";
import {fetchAPI, FetchAPI } from '../../queries/fetch'

import React, { Component } from 'react';
import { GET_ALL_EVENTS } from '../../queries/urlQueries';
  
import { theme } from "./style";
import Page from "../../components/template1/Page";

  //This page is rendered for every event belonging to Event Job
  const EventPage = ({meta}) => {
   
     const { events } = meta

     
          return (
            <Page theme={theme}> 
              {Object.keys(events).map(e => {
                return (
                  <div key={events[e].id}> 
                  <h1> {events[e].EventName}</h1>
                  <p>Client Name: {(events[e].client) ? events[e].client.ClientName : "No Clients!"}</p>
                </div>
                )
              })}
            
              </Page>
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

    const meta = await data
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {  meta  }
  }

  

