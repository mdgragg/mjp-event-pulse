import styled from 'styled-components'
import { CenteredPlayer } from 'components/BodyTemplates'
import LinkBox from 'components/LinkBoxes/LinkBox'
import LinkBox__StickyTop__WithCountdown from 'components/LinkBoxes/LinkBox__StickyTop__WithCountdown'
import CmoBefore from './CmoBefore'
import CmoRegisterBanner from './CmoRegisterBanner'

const StyledWrap = styled.div`
  background-color: #f7f7f7;
  min-height: 80vh;
`

const StyledInner = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 5rem 0;
  @media all and (max-width: 1200px) {
    max-width: 95vw;
  }
`
const CmoWrap = ({ main_event, theme }) => {
  return (
    <>
      <StyledWrap>
        <StyledInner>
          <LinkBox__StickyTop__WithCountdown
            start={main_event.eventStartEnd.StartDateTime}
            end={main_event.eventStartEnd.EndDateTime}
            link={{
              allowed: false,
              href: 'http://www.google.com',
              errorText: 'Theres no links',
            }}
            offset={60}
            showBefore={<CmoBefore main_event={main_event} />}
          />
        </StyledInner>
        <CmoRegisterBanner main_event={main_event} theme={theme} />
      </StyledWrap>{' '}
    </>
  )
}

export default CmoWrap
