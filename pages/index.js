// import { gql, useQuery } from '@apollo/client';
// import withApollo from '../lib/withApollo';
import { useEffect, useState, useRef } from 'react';
import Header from 'components/__GLOBALS__/Header';
import Footer from 'components/Footers';
import Page from 'components/template1/Page';
import Section from 'components/template1/Section';
import { default_theme } from 'components/Themes/default.theme';

import { Grid, Button } from '@material-ui/core';

import styled from 'styled-components';
const InfoGridDiv = styled.div`
  margin: auto;
  max-width: 500px;
`;

const Home = (props) => {
  return (
    <Page theme={default_theme}>
      <Header
        title="MJP Events"
        height={headerHeight}
        image="https://storage.googleapis.com/mjp-stream-public/Screen%20Shot%202021-05-17%20at%2010.17.24%20AM.png"
      />
      <Section>
        <Grid container alignItems="flex-start">
          <Grid item md={12}>
            <InfoGridDiv>
              <h4>Streaming Support Information</h4>
              <p>
                Event pages work on most major browsers on Windows and macOS. We
                recommend using Google Chrome, Mozilla Firefox, or Safari when
                viewing a stream from your computer. It’s best to update your
                browser whenever possible.
              </p>
              <p>
                Live video streamed is also viewable on most iOS and Android
                mobile browsers. When you arrive at the event page, click the
                play button on the player in the browser to open the live
                player. The same applies to any event whose live player is
                embedded on a different website.
              </p>

              <h4>System Requirements: </h4>
              <ul>
                <li>Windows 7 or higher</li>
                <li> Mac OS X 10.6 or higher </li>
              </ul>
              <h4> Supported desktop browsers: </h4>
              <ul>
                <li> Google Chrome 45+</li>
                <li> Mozilla Firefox 49+</li>
                <li> Safari 10+</li>
                <li> Microsoft Edge 15+</li>
                <li style={{ color: 'red' }}>
                  {' '}
                  We cannot guarantee performance on
                  <strong> Internet Explorer</strong> we highly suggest you use
                  a different browser.
                </li>
              </ul>
              <h4> Supported mobile browsers: </h4>
              <ul>
                <li>Chrome 45+ </li>
                <li> Safari 10+ (iOS) </li>
              </ul>
              <p>
                Internet Connection: 5-10mbps download speed is recommended.
                Check your connection at{' '}
                <a href="https://www.speedtest.net">www.speedtest.net</a>.
              </p>
            </InfoGridDiv>
          </Grid>
        </Grid>
      </Section>
      <Footer />
    </Page>
  );
};

export default Home;
