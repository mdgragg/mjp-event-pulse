import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Header from 'components/__GLOBALS__/Header';
import Footer from 'components/__GLOBALS__/Footer';
import Page from '../components/__GLOBALS__/ThemedPage';
import Section from 'components/Sections/Section';
import default_theme from '../components/__GLOBALS__/mjx.theme';
import { Button__Primary } from 'components/Buttons';
import { Grid } from '@material-ui/core';
import { InfoGrid } from 'components/__GLOBALS__/InfoGrid';
import MJP__SVG from '../components/__GLOBALS__/MJP__SVG';

const Error_404 = (props) => {
  return (
    <Page theme={default_theme}>
      <Header
        height={'600px'}
        image="https://storage.googleapis.com/mjp-stream-public/Screen%20Shot%202021-05-17%20at%209.45.20%20AM.png"
      >
        <MJP__SVG />
      </Header>
      <Section>
        <Grid container alignItems="flex-start">
          <Grid item md={12}>
            <div
              style={{
                maxWidth: '500px',
                margin: 'auto',
                height: 'calc(100vh - 600px)',
                textAlign: 'left',
              }}
            >
              <h2>Oops... that page doesn't exist yet.</h2>
              <p style={{ paddingBottom: '4rem' }}>
                Mills James builds custom virtual event experiences. To get
                started building your own brand experience contact us.
              </p>
              <a href="https://www.millsjames.com/contact-us/">
                <Button__Primary>Contact Us</Button__Primary>
              </a>
            </div>
          </Grid>
        </Grid>
      </Section>
    </Page>
  );
};

export default Error_404;
