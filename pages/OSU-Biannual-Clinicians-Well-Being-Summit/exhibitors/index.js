import React from "react";
import { event_theme } from "../index";
import { Router, useRouter } from "next/router";
import EventSearch from "../../../components/template1/EventSearch";
import Body from "../../../components/template1/Body";
import Section from "../../../components/template1/Section";
import Meta from "components/globals/Meta";
import { getEventExhibitors } from "lib/api";

import Link from "next/link";

import Page from "../../../components/template1/Page";
import { gql } from "apollo-boost";
import styled from "styled-components";

const ExhibitorLink = styled.div`
  && {
    color: blue;
    font-size: 18px;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
    height: 150px;
    padding: 20px;
    transition: all 0.15s;
  }
  span {
    color: black;
    font-weight: 800;
  }
  :hover {
    background-color: #e2e2e2;
  }
`;
const ExhibitorPage = (props) => {
  const router = useRouter();
  const event = props.meta;

  return (
    <Page theme={event_theme}>
      <Meta title="Exhibitors"> </Meta>
      <Body>
        <Section>
          <h1>Exhibitor Index</h1>
          {Object.keys(event).map((e) => (
            <ExhibitorLink
              key={event[e].id}
              onClick={() => router.push(`${router.pathname}/${event[e].id}`)}
            >
              <>
                <strong>
                  {event[e].FirstName} {event[e].LastName}
                </strong>
                <br /> <span> {event[e].ExhibitName?.replace(/_/g, " ")}</span>
                <br />
                {event[e].Email} <br />
              </>
            </ExhibitorLink>
          ))}
        </Section>
      </Body>
    </Page>
  );
};
export default ExhibitorPage;

export async function getServerSideProps(context) {
  // get the event job data from our api
  console.log(context.req.url.slice(1, -11));
  let url;
  !context.previewData
    ? (url = context.req.url.slice(1, -11))
    : (url = context.previewData.url);

  const data = await getEventExhibitors(url);
  const values = {
    props: {
      // context: context,
      //meta will be the props for the event
      meta: data,
    },
  };
  return values;
}