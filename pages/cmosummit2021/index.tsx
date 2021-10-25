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
import default_theme from 'eventAssets/cmosummit2021/cmosummit2021.theme'
import { GET_SERVERSIDE_PROPS_DEFAULT } from 'src/page_responses/default'
import BodyWrap from 'components/BodyTemplates/BodyWrap'
import { Typography } from '@material-ui/core'
import { BoxedCounter } from 'components/Counters'
import CmoWrap from 'eventAssets/cmosummit2021/CmoWrap'
export const EVENT_URL = 'cmosummit2021'

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
      {/* <AuthWrap
        eventToCheck={main_event}
        successCallback={({ message }) => {
          toast.success(
            `Hello ${
              message.Attendee.AttendeeFirst
                ? message.Attendee.AttendeeFirst
                : ''
            }, welcome to ${main_event.EventName}`
          );
        }}
      > */}
      <Meta title={main_event.EventName}>
        <title>{main_event.EventName}</title>
      </Meta>
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
            <Typography variant={`h5`}>
              <DateParse date={main_event.eventStartEnd.StartDateTime} />
            </Typography>
          </Center>
        </div>
        <div>
          <Center>
            <BoxedCounter
              event={main_event}
              styles={{ boxColor: 'rgba(0,0,0,0)' }}
            />
          </Center>
        </div>
      </FlexHero>
      <CmoWrap main_event={main_event} theme={event_theme} /> 
      {/* </AuthWrap> */}
    </ThemedPage>
  )
}

export async function getServerSideProps(ctx) {
  try {
    return GET_SERVERSIDE_PROPS_DEFAULT(ctx, EVENT_URL)
  } catch (error) {
    console.log('[event].js error: ', error)
    return {
      redirect: {
        destination: '/404',
      },
    }
  }
}

export default Index
