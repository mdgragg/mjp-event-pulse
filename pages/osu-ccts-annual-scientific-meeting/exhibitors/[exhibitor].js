import React, { useEffect, setState, useRef } from 'react';
import { getExhibitorMeta } from 'lib/api/';
import styled from 'styled-components';

import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import Section from 'components/template1/Section';
import Footer from 'components/template1/Footer';

import { event_theme } from '../index';
import { useRouter } from 'next/router';
import ExhibitorVideo from 'components/template1/ExhibitorVideo';

const SingleExhibitor = (props) => {
  const router = useRouter();
  const { exhibitor } = props;

  const { event_job } = props.exhibitor.event;

  const now = new Date();
  const ident = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getUTCDate()}`;

  const base_url = `${event_job.eventUrl}/exhibitors/${exhibitor.id}-${exhibitor.FirstName}${exhibitor.LastName}`;
  const featured_url = `${event_job.eventUrl}/exhibitors/${exhibitor.id}-${exhibitor.FirstName}${exhibitor.LastName}/featured-message`;
  //get messages if they exist

  const [messages, addMessages] = React.useState({});

  // const [featuredMessage, changeFeaturedMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const [showLoggedIn, setShowLoggedIn] = React.useState(
    props.loggedIn || 'false'
  );

  const [question, changeQuestion] = React.useState('');

  const InRoom = styled.div`
    width: 80px;
    text-align: center;
    font-weight: 800;

    &&.true {
      border: 2px solid #2bef83;
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
            <ExhibitorVideo source={exhibitor.KeyValue} />
          ) : (
            <h2 style={{ color: 'red' }}>No Video File Yet </h2>
          )}

          <hr />

          <h1>{exhibitor.ExhibitName}</h1>

          <h2>
            {exhibitor.FirstName} {exhibitor.LastName}
          </h2>

          <p>
            {exhibitor.Company} |{' '}
            <a href={exhibitor.Email}>{exhibitor.Email}</a>
          </p>
          <p style={{ maxWidth: '800px' }}>{exhibitor.Bio}</p>
          <InRoom className={showLoggedIn === 'true' ? 'true' : 'false '}>
            {showLoggedIn === 'true' ? 'Office Hours' : 'Absent'}
          </InRoom>
        </Section>
        <Footer>Back</Footer>
      </Body>
    </Page>
  );
};

export default SingleExhibitor;

export async function getServerSideProps(ctx) {
  const exhibitor = await getExhibitorMeta(ctx.query.exhibitor);
  // let { loggedIn } = cookies(ctx);
  // const { id } = cookies(ctx) || null;
  // id === 'undefined' ? (id = null) : '';
  // if (!loggedIn) {
  //   loggedIn = 'false';
  // }
  let id = '';
  let loggedIn = false;

  return { props: { exhibitor, loggedIn: loggedIn, id } };
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
