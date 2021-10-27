import AuthWrap from 'components/AuthWrap'
import Meta from 'components/__GLOBALS__/Meta'
import ThemedPage from 'components/__GLOBALS__/ThemedPage'

import { PlayerWithChat } from 'components/BodyTemplates'
import { toast } from 'react-toastify'
import default_theme from 'eventAssets/activistsandagitators/activistsandagitators.theme'
import { GET_STATIC_PROPS_DEFAULT } from 'src/page_responses/default'
import BodyWrap from 'components/BodyTemplates/BodyWrap'
import SplashHero from 'components/Heroes/SplashHero'
import HeaderContent from 'eventAssets/activistsandagitators/HeaderContent'
import { CaptionAccordion } from 'components/Captioning'
import AuthHeaderContent from '../../eventAssets/activistsandagitators/AuthHeaderContent'
import YWCA_SponsorMap from 'eventAssets/activistsandagitators/YWCA_SponsorMap'
import ButtonArea from 'eventAssets/activistsandagitators/ButtonArea'
import { Replacer } from 'components/__Assets__'
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown'
import LinkBox from 'components/LinkBoxes/LinkBox'
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame'
import PostEvent from 'eventAssets/activistsandagitators/PostEvent'

const PLACEHOLD = 'https://placehold.co/'
export const EVENT_URL = `activistsandagitators`
const Index = (props) => {
  const { event_meta, main_event } = props

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  }

  return (
    <ThemedPage theme={event_theme}>
      <AuthWrap
        headerContent={
          <AuthHeaderContent logo={main_event.LogoLink[0]?.Media?.url} />
        }
        otherFields={{
          Company: {
            required: false,
            value: '',
            displayName: 'Company',
          },
          NoAttendees: {
            required: true,
            value: '',
            displayName: 'Number of People Watching With You',
          },
        }}
        eventToCheck={main_event}
        successCallback={({ Attendee }) => {
          toast.success(
            `Hello ${
              Attendee.AttendeeFirst ? Attendee.AttendeeFirst : ''
            }, welcome to ${main_event.EventName}`
          )
        }}
      >
        <Meta title={main_event.EventName}>
          <title>{main_event.EventName}</title>
        </Meta>
        <SplashHero anchorLink={'#main'}>
          <HeaderContent main_event={main_event} />
        </SplashHero>
        <BodyWrap>
          <div
            id={'main'}
            style={{
              minHeight: '100vh',
              backgroundColor: 'none',
              margin: '2rem',
            }}
          >
            {
              <Replacer
                decider={true}
                showIfTrue={
                  <PlayerWithChat
                    hasStarted={true}
                    videoUrl={main_event.streamLinks[0].url}
                    chatUrl={main_event.streamLinks[1].url}
                  >
                    <div>
                      <CaptionAccordion captionId={'4926755'} />
                      <ButtonArea main_event={main_event} />
                    </div>
                  </PlayerWithChat>
                }
                showIfFalse={<PostEvent />}
              />
            }

            <YWCA_SponsorMap eventId={main_event.id} />
          </div>
        </BodyWrap>
      </AuthWrap>
    </ThemedPage>
  )
}

export async function getStaticProps() {
  try {
    return GET_STATIC_PROPS_DEFAULT(EVENT_URL)
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default Index
