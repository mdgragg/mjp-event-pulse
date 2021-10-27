import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import LinkBox from 'components/LinkBoxes/LinkBox'
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame'
import { useGridState } from '@material-ui/data-grid'
import { Button__Primary } from 'components/Buttons'

const StyledWrap = styled.div`
  max-width: 768px;
  margin: 5% auto;
  transition: all 0.2s ease;
`
const PostEvent = (props) => {
  const [state, setState] = useState({ boxPanel: 'fillout' })
  return (
    <StyledWrap>
      {
        {
          fillout: (
            <LinkBox
              showButton={false}
              link={{
                allowed: true,
                href: 'https://www.facebook.com',
                newWindow: true,
              }}
              text={`Fill out Survey`}
              prefix={``}
            >
              <div
                style={{
                  marginBottom: '1.5rem',
                  maxWidth: '500px',
                  width: '80%',
                  textAlign: 'center',
                  fontWeight: 800,
                }}
              >
                <h3>Thanks for Attending!</h3>
                <p
                  style={{
                    textAlign: 'center',
                    margin: '1rem auto',
                    color: 'black',
                  }}
                >
                  This event has ended, but we appreciate your input.
                </p>
                <Button__Primary onClick={() => setState({ boxPanel: 'form' })}>
                  Fill Out Our Survey
                </Button__Primary>
              </div>
            </LinkBox>
          ),
          form: (
            <Fluid__iFrame
              src={
                'https://docs.google.com/forms/d/e/1FAIpQLSc2Xpob9THyqB4PJ9BOSmQv0cTaRaLfNJIDwuDyFNL-RBqDhg/viewform?embedded=true'
              }
              minHeight={`800px`}
            />
          ),
        }[state.boxPanel]
      }
    </StyledWrap>
  )
}

PostEvent.propTypes = {}

export default PostEvent
