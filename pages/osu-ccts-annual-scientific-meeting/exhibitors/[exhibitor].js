import React, { useEffect, useState } from 'react';
import { getExhibitorMeta, getEventMetaMain, getEventMeta } from 'lib/api/';
import styled from 'styled-components';

import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Section from 'components/template1/Section';
import Footer from 'components/template1/Footer';

import { event_theme } from '../index';
import { useRouter } from 'next/router';
import ExhibitorVideo from 'components/template1/ExhibitorVideo';
import { getKeyValue, calcHasStarted } from 'lib/helpers';

const SingleExhibitor = (props) => {
  const router = useRouter();
  const { exhibitor, eventData } = props;

  const { event_job } = props.exhibitor.event;

  const links = getKeyValue(exhibitor.KeyValue);

  const [eventStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (eventData.eventStartEnd) {
      timer = setInterval(() => {
        setHasStarted(calcHasStarted(eventData.eventStartEnd));
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);
  const InRoom = styled.div`
    width: 80px;
    text-align: center;
    font-weight: 800;

    &&.true {
      border: 2px solid #2bef83;
      color: #2bef83;
      width: 250px;
      cursor: pointer;
    }
    && > a {
      text-decoration: none;
      color: #2bef83;
    }
    &&.false {
      border: 2px solid #f2400f;
      color: #f2400f;
    }
  `;
  return (
    <Page theme={event_theme}>
      <Body>
        <Section minHeight={'100vh'}>
          <h1>{event_job.EventJobName}</h1>
          {exhibitor.KeyValue.length > 0 ? (
            <ExhibitorVideo
              src={links.videoLink || ''}
              caption={links.captionFile || ''}
            />
          ) : (
            <h2 style={{ color: 'red' }}>No Video File Yet </h2>
          )}

          <hr />
          <h1 style={{ margin: 'auto' }}>{exhibitor.ExhibitName}</h1>
          <hr />
          <h2>
            {exhibitor.FirstName} {exhibitor.LastName}
          </h2>
          <InRoom className={eventStarted ? 'true' : 'false '}>
            {eventStarted ? (
              <a href={exhibitor.Website}>Office Hours Open (Click Here)</a>
            ) : (
              'Absent'
            )}
          </InRoom>

          <p>
            {exhibitor.Company} |{' '}
            <a href={exhibitor.Email}>{exhibitor.Email}</a>
          </p>

          <p>
            <strong>Primary Author: </strong>{' '}
            {exhibitor.AdditionalDetails['Primary Author']} <br />
            <strong>Additional Authors: </strong>{' '}
            {exhibitor.AdditionalDetails['Additional Authors']} <br />
            <strong>Abstract Category: </strong>{' '}
            {exhibitor.AdditionalDetails['Abstract Category']}
            <br />
          </p>
          <hr />
          <h2>Abstract</h2>
          <p style={{ maxWidth: '800px' }}>{exhibitor.Bio}</p>
        </Section>
        <Footer>Back</Footer>
      </Body>
    </Page>
  );
};

export default SingleExhibitor;

export async function getServerSideProps(ctx) {
  const exhibitor = await getExhibitorMeta(ctx.query.exhibitor);
  let eventData = await getEventMeta(exhibitor.event.slug);

  eventData = eventData.events.filter((ev) => ev.isMainEvent === true)[0];
  // let { loggedIn } = cookies(ctx);
  // const { id } = cookies(ctx) || null;
  // id === 'undefined' ? (id = null) : '';
  // if (!loggedIn) {
  //   loggedIn = 'false';
  // }
  let id = '';
  let loggedIn = false;

  return { props: { exhibitor, loggedIn: loggedIn, id, eventData } };
}

// SingleExhibitor.getInitialProps = async (ctx) => {
//   let { loggedIn } = cookies(ctx);
//   const { id } = cookies(ctx);
//   if (!loggedIn) {
//     loggedIn = 'false';
//   }
//   console.log(loggedIn);

//   const data = await fetchAPI(
//     `query getExhibitorDetail($id: String!){
//         exhibitors(where: {
//             id: $id
//         }) {
//             FirstName
//             LastName
//             Company
//             Website
//             id
//             Website
//             Email
//             event {
//               EventName
//               slug
//               event_job{
//                 eventUrl
//                 jobId
//                 EventJobName

//               }
//             }
//             Attachments{
//               name
//               url
//               size
//               ext
//             }
//           }
//       }`,
//     {
//       variables: {
//         id: ctx.query.exhibitor,
//       },
//     }
//   );
//   // const login = loggedIn;

//   const exhibitor = await data.exhibitors[0];
//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return { exhibitor, loggedIn, id };
// };
