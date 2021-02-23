import React from 'react';
import { event_theme } from '../index';
import { Router, useRouter } from 'next/router';
import EventSearch from '../../../components/template1/EventSearch';
import Body from '../../../components/template1/Body';
import Section from '../../../components/template1/Section';
import Meta from 'components/globals/Meta';
import { getEventExhibitors } from '../../../lib/api';

import Link from 'next/link';

import Page from '../../../components/template1/Page';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

const ExhibitorLink = styled.div`
  && {
    color: blue;
    font-size: 18px;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
    height: 100px;
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
                {event[e].FirstName} {event[e].LastName} <br />{' '}
                <span> {event[e].ExhibitName.replace(/_/g, ' ')}</span>
              </>
            </ExhibitorLink>
          ))}
        </Section>
      </Body>
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  //console.log(ctx.req.cookies);
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  try {
    let eventData = await getEventMeta('mjp-default-event-job');

    let main_event = eventData.events.filter(
      (ev) => ev.isMainEvent === true
    )[0];

    //make breakout sessions array by category
    let breakoutObj = {};

    main_event.BreakoutSessions.forEach((sesh) => {
      let key = Object.keys(breakoutObj).find(
        (title) => title === sesh.Category
      );
      if (!key) {
        breakoutObj[sesh.Category] = [sesh];
      } else {
        breakoutObj[sesh.Category] = [...breakoutObj[sesh.Category], sesh];
      }
    });

    main_event.BreakoutSessions = breakoutObj;

    const values = {
      props: {
        //meta will be the props for the event
        event_meta: eventData,
        main_event,
      },
    };
    return values;
  } catch (error) {
    console.log('get static props error: ', error);
    return {
      redirect: {
        destination: '/',
      },
    };
  }
}

export default ExhibitorPage;
