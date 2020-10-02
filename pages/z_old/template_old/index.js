import { useEffect, useState, useRef } from "react";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
// var array = require('lodash/array');
import _ from "lodash";
import { getEventMeta, getEventByUrl } from "../../lib/api";
import {Grid, Card} from '@material-ui/core';

import Admin from "./components/admin"
import Page from "../../components/template1/Page";
import Navbar from "../../components/template1/Navbar";
import VideoBox from "../../components/template1/VideoBox";
import { theme } from './style'

const testEvent1 = (props) => {
  const [isPreview, setPreview] = useState(props.meta.eventStatus.EventStatus === "Preview");
  const router = useRouter();

  let event_meta = props.meta;

  let isAuthenticated = props.context.previewData.isAuthenticatedTEST;

  const pushAdmin = () => {
    router.push(router.pathname + '/admin')
  }

  useEffect(() => {
    if (isAuthenticated) {
      setPreview(false);
    }
  });

  if (!isPreview) {
    return (
      <Page theme={theme}>
        <Navbar/>
      <div className="single-event-wrapper">

        {/* {isPreview ? <p>This is a preview, it is not live</p> : ""} */}
        <div>
          <h1>{event_meta.EventJobName}</h1>
          <h2>
            Client:{" "}
            {!event_meta.client
              ? "No Client Yet"
              : event_meta.client.ClientName}
          </h2>
        </div>
        <Grid container={true}>
              <Grid item={true} md={6}>
              <VideoBox/>
              </Grid>
              <Grid item={true} md={6}>
                <Sidebar/>
              </Grid>
        </Grid>
             
        <h3>path: {router.pathname} </h3>
        <div className="all-events-wrapper">
          <h4>Events: </h4>

          <ul>
            {_.keys(event_meta.events).map((event) => {
              const info = event_meta.events[event];
              return (
                <li key={info.id}>
                  <Link href={`${router.pathname}/${info.slug}`}>
                    {info.EventName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </Page>
    );
  } else {
    return (
      <Admin/>
    );
  }
};

export async function getStaticProps(context) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  //get the event job data from our api
  let url;
  (!context.previewData) ?  url = Router.pathname : url = context.previewData.url

  const eventData = await getEventMeta(url);

  //this is what will load as the "context" if we haven't come here through
  //our preview link
  const noctx = {
    preview: eventData.eventStatus.EventStatus === "Preview",
    previewData: {
      isAuthenticatedTEST: false,
    },
  };
  //set the context object to whatever our api is saying

  if (!context.preview) {
    context = noctx;
  }
  const values = {
    props: {
      context: context,
      //meta will be the props for the event
      meta: eventData,
    },
  };
  return values;
}

export default testEvent1;
