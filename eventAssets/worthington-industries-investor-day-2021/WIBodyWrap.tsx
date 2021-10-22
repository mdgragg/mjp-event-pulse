import React from 'react';
import PropTypes from 'prop-types';
import { FlexHero } from 'components/Heroes';
import Center from 'components/Center';
import { DateParse } from 'components/__Assets__';
import { BoxedCounter, Counter__JustNumbers } from 'components/Counters';
import BodyWrap from 'components/BodyTemplates/BodyWrap';
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates';
import { Banner__WithPicture } from 'components/Banners';
import { Typography } from '@material-ui/core';

const WIBodyWrap = ({ main_event }) => {
  return (
    <>
      <FlexHero>
        <div>
          <img
            style={{
              width: '100%',
              maxWidth: '350px',
              margin: '2rem auto',
            }}
            src={main_event.LogoLink[0]?.Media?.url || null}
          />
        </div>
        <div>
          <Center>
            <h1>{main_event.EventName}</h1>
            <Typography variant={`overline`}>
              <DateParse date={main_event.eventStartEnd.StartDateTime} />
            </Typography>
          </Center>
        </div>
        <div>
          <BoxedCounter event={main_event} prefix={`Join Us Live In`} />
        </div>
      </FlexHero>
      <BodyWrap>
        {main_event.streamLinks.length === 1 ? (
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CenteredPlayer
              showing={true}
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
            />
          </div>
        ) : (
          <div
            style={{
              minHeight: '60vh',
              backgroundColor: 'none',
              margin: '2rem',
            }}
          >
            <PlayerWithChat
              children={null}
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
              chatUrl={main_event.streamLinks[1].url}
            />
          </div>
        )}

        {main_event.Description && (
          <Banner__WithPicture
            imgUrl={main_event.LogoLink[0]?.Media?.url || null}
            color={'black'}
            secondary={`white`}
            headerText={`About This Event`}
            innerWidth={`650px`}
            buttonText={`Learn More`}
            buttonLink={main_event.LogoLink[0]?.Link || '#'}
          >
            {main_event.Description}
          </Banner__WithPicture>
        )}
      </BodyWrap>
    </>
  );
};

export default WIBodyWrap;
