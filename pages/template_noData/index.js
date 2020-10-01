import { useEffect, useState, useRef } from "react";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
// var array = require('lodash/array');
import _ from "lodash";
import { getEventMeta, getEventByUrl } from "../../lib/api";


import Page from "../../components/template1/Page";
import Navbar from "../../components/template1/Navbar";
import VideoBox from "../../components/template1/VideoBox";
import { theme } from './style'
const testEvent1 = (props) => {
  return (
    <Page theme={theme}>
      <Navbar/>
      <div className="single-event-wrapper">
        {/* {isPreview ? <p>This is a preview, it is not live</p> : ""} */}
        <div>
          <h1>This Is The Event Name</h1>
          <h2>Client: Mills James Event Production</h2>
        </div>
        <VideoBox/>
        <h3>A Brilliant Event </h3>
        <div className="all-events-wrapper">
          <h4>Events: </h4>
          <ul>
            <li>First Event</li>
            <li>Second Event</li>
          </ul>
        </div>
      </div>
    </Page>
  );
};

export default testEvent1;
