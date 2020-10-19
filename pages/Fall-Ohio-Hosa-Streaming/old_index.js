import { useEffect, useState, Fragment } from "react";
import { Router, useRouter } from "next/router";
import Link from "next/link";
// var array = require('lodash/array');
// import _ from "lodash";
import { getEventMeta } from "../../lib/api";

import Admin from "./components/admin"
import Navbar from "../../components/template1/Navbar"


const testEvent1 = (props) => {
  const [isPreview, setPreview] = useState(props.meta.eventStatus.EventStatus === "Preview");
  const router = useRouter();

  let event_meta = props.meta;

  let isAuthenticated = props.context.previewData.isAuthenticatedTEST;

  const pushAdmin = () => {
    router.push(router.pathname + '/admin')
  }

  useEffect(() => {
    if (isAuthenticated || process.env.NODE_ENV==='development') {
      setPreview(false);
    }
  });

  if (!isPreview) {
    return (
      <Fragment> 
      <div className={`single-event-wrapper`}>
        <Navbar pages={props.meta}/>
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

        <h3>path: {router.pathname} </h3>
        <div className="all-events-wrapper">
          <h4>Events: </h4>

          <ul>
            {Object.keys(event_meta.events).map((event) => {
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
      </Fragment>
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
