import { useState } from 'react'
import { useRouter } from 'next/router'
import { getEventMeta } from 'lib/api'
import useCalculateIfStarted from 'hooks/useCalculateIfStarted'
import AuthWrap from 'components/AuthWrap'
import Meta from 'components/__GLOBALS__/Meta'
import ThemedPage from 'components/__GLOBALS__/ThemedPage'
import Body from 'components/template1/Body'
import { Banner__WithPicture } from 'components/Banners'
import FlexHero from 'components/Heroes/FlexHero'
import DateParse from 'components/__Assets__/DateParse'
import Counter__JustNumbers from 'components/Counters/Counter__JustNumbers'
import { CenteredPlayer, PlayerWithChat } from 'components/BodyTemplates'
import { toast } from 'react-toastify'
import Center from 'components/Center'
import default_theme from 'eventAssets/osufintech/osufintech.theme'
import {
  GET_SERVERSIDE_PROPS_DEFAULT,
  GET_STATIC_PROPS_DEFAULT,
} from 'src/page_responses/default'
import BodyWrap from 'components/BodyTemplates/BodyWrap'
import { Typography } from '@material-ui/core'
import { BoxedCounter } from 'components/Counters'
import Agenda__MultiTab from 'components/Agenda/Agenda__MultiTab'
import ReactMarkdown from 'react-markdown'
export const EVENT_URL = `osufintech`
const PLACEHOLD = 'https://placehold.co/'

const Index = (props) => {
  const router = useRouter()
  const { event_meta, main_event } = props

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  }

  const hasStarted = useCalculateIfStarted(main_event)
  const [auth, setAuth] = useState(false)

  return (
    <ThemedPage theme={event_theme}>
      <AuthWrap
        eventToCheck={main_event}
        successCallback={({ message }) => {
          toast.success(
            `Hello ${
              message.Attendee.AttendeeFirst
                ? message.Attendee.AttendeeFirst
                : ''
            }, welcome to ${main_event.EventName}`
          )
        }}
      >
        <Meta title={main_event.EventName}>
          <title>{main_event.EventName}</title>
        </Meta>
        <FlexHero>
          <div>
            <img
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '5px',
                width: '100%',
                maxWidth: '350px',
                margin: '2rem auto',
              }}
              src={main_event.LogoLink[0]?.Media?.url || null}
            />
          </div>
          <div>
            <Center>
              <div style={{ maxWidth: '500px', margin: 'auto' }}>
                <h1>FinTech</h1>
                <Typography variant={`h4`}>{main_event.EventName}</Typography>
                <Typography
                  variant={`overline`}
                  style={{ color: 'tomato', fontWeight: 800 }}
                >
                  <DateParse date={main_event.eventStartEnd.StartDateTime} />
                </Typography>
              </div>
            </Center>
          </div>
          <div>
            <BoxedCounter event={main_event} prefix={'Join Us Live In'} />
          </div>
        </FlexHero>
        <BodyWrap>
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: 'none',
              margin: '2rem',
            }}
          >
            <PlayerWithChat
              children={null}
              hasStarted={true}
              videoUrl={main_event.streamLinks[0].url}
              chatUrl={null}
              chatComponent={<Agenda__MultiTab eventUrl={'osufintech'} />}
            />
          </div>

          {main_event.Description && (
            <Banner__WithPicture
              color={'black'}
              secondary={`white`}
              headerText={`About This Event`}
              innerWidth={`765px`}
              buttonText={`Learn More`}
              buttonLink={main_event.LogoLink[0]?.Link || '#'}
            >
              <ReactMarkdown children={main_event.Description} />
            </Banner__WithPicture>
          )}
        </BodyWrap>
      </AuthWrap>
    </ThemedPage>
  )
}

export async function getStaticProps(ctx) {
  return GET_STATIC_PROPS_DEFAULT(EVENT_URL)
}

export default Index
