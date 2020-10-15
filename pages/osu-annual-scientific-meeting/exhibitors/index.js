import React from "react";
import { theme } from "../style";
import { Router, useRouter } from "next/router";
import EventSearch from "../../../components/template1/EventSearch";
import Body from "../../../components/template1/Body";
import Section from "../../../components/template1/Section";
import Meta from "../../globals/Meta";
import { getEventExhibitors } from "../../../lib/api";

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
    margin-bottom: 50px;
  }
  span {
    color: black;
    font-weight: 800;
  }
`;
const ExhibitorPage = (props) => {
  const router = useRouter();
  const event = props.meta;

  return (
    <Page theme={theme}>
      <Meta title="Exhibitors"> </Meta>
      <Body>
        <Section>
          <h1>Exhibitor Index</h1>
          {Object.keys(event).map((e) => (
            <>
              <ExhibitorLink>
                <Link
                  key={event[e].id}
                  href={`${router.pathname}/${event[e].id}`}
                >
                  <>
                    {event[e].FirstName} {event[e].LastName} |{" "}
                    <span> {event[e].ExhibitName.replace(/_/g, " ")}</span>
                    <br />
                  </>
                </Link>
              </ExhibitorLink>
            </>
          ))}
        </Section>
      </Body>
    </Page>
  );
};

export async function getStaticProps(context) {
  //get the event job data from our api
  let url;
  !context.previewData
    ? (url = Router.pathname)
    : (url = context.previewData.url);

  const data = await getEventExhibitors(url);
  const values = {
    props: {
      context: context,
      //meta will be the props for the event
      meta: data,
    },
  };
  return values;
}

export default ExhibitorPage;
