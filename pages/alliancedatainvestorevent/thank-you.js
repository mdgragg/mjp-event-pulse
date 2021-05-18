import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { getEventMeta } from 'lib/api';
import FullWrap from 'components/FullWrap';
import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import Body from 'components/template1/Body';
import VideoBox__StickyTop from 'components/VideoBoxes/Video__StickyTop';
import Section__WithBG from 'components/Sections/Section__WithBG';
import AttendeeAuthModal from '../../components/Modals/AttendeeAuthModal';
import { toast } from 'react-toastify';
import { EVENT_URL, event_theme } from './index';
const PLACEHOLD = 'https://placehold.co/';

const Index = (props) => {
  const session_token = EVENT_URL;
  const router = useRouter();

  const { event_meta, main_event } = props;

  return (
    <>
      <FullWrap>
        <Page theme={event_theme}>
          <Meta title={event_meta.EventJobName}> </Meta>

          <Body>
            <Section__WithBG imgSrc={main_event?.HeaderImage?.url}>
              <div
                style={{
                  width: '90%',
                  margin: 'auto',
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start',
                  }}
                >
                  <img
                    src={
                      'https://storage.googleapis.com/mjp-stream-public/alliancedatainvestorday/logo.png'
                    }
                    style={{
                      position: 'relative',
                      zIndex: '100',
                      height: '130px',
                      width: 'auto',
                    }}
                  />
                </div>
                <div
                  style={{
                    maxWidth: '600px',
                    height: 'calc(100vh - 450px)',
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    paddingTop: '3rem',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <p style={{ fontSize: '2rem' }}> Thank you for attending</p>
                  <h2
                    style={{
                      fontSize: '3rem',
                      color: event_theme.red,
                      backgroundColor: 'white',
                      lineHeight: '5rem',
                    }}
                  >
                    {' '}
                    <i> {main_event.EventName}</i>
                  </h2>
                </div>
              </div>
            </Section__WithBG>
          </Body>
        </Page>
      </FullWrap>
    </>
  );
};

export async function getStaticProps(ctx) {
  let eventData = await getEventMeta(EVENT_URL);

  let main_event = eventData.events.filter((ev) => ev.isMainEvent === true)[0];

  return {
    props: {
      //meta will be the props for the event
      event_meta: eventData,
      main_event,
    },
    revalidate: 60,
  };
}

export default Index;
