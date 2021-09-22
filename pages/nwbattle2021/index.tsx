import { useState } from 'react';
import { useRouter } from 'next/router';
import { getEventMeta } from 'lib/api';
import useCalculateIfStarted from 'hooks/useCalculateIfStarted';
import AuthWrap from 'components/AuthWrap';
import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import { FullPage__SolidColor } from 'components/BodyTemplates';
import { Banner__WithPicture } from 'components/Banners';
import { FlexHero, SolidColorHero } from 'components/Heroes';
import DateParse from 'components/__Assets__/DateParse';
import { toast } from 'react-toastify';
import { default_theme } from 'eventAssets/nwbattle2021/theme.theme';
import { BoxedCounter } from 'components/Counters';
import { Box__XYCentered } from 'components/Boxes';
import { Video__StickyTop__WithCountdown } from 'components/VideoBoxes';
import { StaticResponse } from 'types/PageResponses';
import { GetStaticProps } from 'next';
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown';
import { PageBody } from 'eventAssets/nwbattle2021/PageBody';

export const EVENT_URL = `nwbattle2021`;

const Index = (props) => {
  const router = useRouter();

  const { event_meta, main_event, title } = props;

  var event_theme = {
    ...default_theme,
  };
  return (
    <Page theme={event_theme}>
      <AuthWrap
        headerContent={
          <div
            style={{
              width: '40%',
              margin: '1rem auto',
              padding: '4% 0',
              backgroundColor: event_theme.colors.primary,
            }}
          >
            <img
              style={{ position: 'relative' }}
              src={main_event?.LogoLink[0]?.Media?.url}
            />
          </div>
        }
        otherFields={{
          Company: {
            displayName: 'Company',
            value: '',
            required: true,
          },
        }}
        eventToCheck={main_event}
        successCallback={(res) => {
          toast.success(
            `Hello ${
              res.Attendee.AttendeeFirst ? res.Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      >
        <Meta title={event_meta.EventJobName}> </Meta>
        <SolidColorHero color={event_theme.colors.primary}>
          <FlexHero columns={`25% 50% 25%`}>
            <div>
              <img
                style={{
                  maxWidth: '100px',
                }}
                src={main_event.LogoLink[0]?.Media?.url || null}
              />
            </div>
            <div>
              <h1>{title ? title : main_event.EventName}</h1>
              <h3>
                <DateParse date={main_event.eventStartEnd.StartDateTime} />
              </h3>
            </div>

            <BoxedCounter
              styles={{
                textColor: event_theme.colors.primary,
                boxColor: event_theme.colors.white,
              }}
              event={main_event}
              prefix={`Join Us Live In`}
            />
          </FlexHero>
        </SolidColorHero>
        <FullPage__SolidColor color={'#f7f7f7'}>
          {props.children ? (
            props.children
          ) : (
            <PageBody
              event_meta={event_meta}
              main_event={main_event}
              event_theme={event_theme}
            />
          )}
          <Banner__WithPicture
            imgUrl={main_event.LogoLink[0]?.Media?.url || null}
            color={event_theme.colors.primary}
            secondary={`white`}
            headerText={null}
            innerWidth={`650px`}
            buttonText={null}
            buttonLink={main_event.LogoLink[0]?.Link || '#'}
            style={{ height: '400px' }}
          ></Banner__WithPicture>
        </FullPage__SolidColor>
      </AuthWrap>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const returnObj: StaticResponse = {
    props: {
      event_meta: event_data,
      main_event,
    },
    revalidate: 300,
  };

  return returnObj;
};

export default Index;
