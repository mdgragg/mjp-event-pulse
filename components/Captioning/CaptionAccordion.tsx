import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ClosedCaption, ExpandMore } from '@material-ui/icons';
import styled from 'styled-components';
import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import { Button__Primary } from 'components/Buttons';

const StyledAccordion = styled(Accordion)`
  background-color: ${(props) => props.theme.colors.black};
  && .MuiTypography-root {
    color: white;
    font-weight: 800;
  }
  && .MuiAccordionSummary-root {
    min-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  && .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }
  && .MuiSvgIcon-root {
    color: white;
    margin-right: 1rem;
    align-self: center;
  }
`;

const CaptionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: stretch;
`;

const CaptionAccordion = ({ captionId = '999999998' }) => {
  const capSrc = `https://captionedtext.com/client/Event.aspx?embed=true&EventID=${captionId}&showEmbedToolbar=true&FullView=true`;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (value) => (event, isExpanded) => {
    setExpanded(value);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleChange(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <ClosedCaption />
        <Typography variant={`overline`}>Closed Captioning</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CaptionDetails>
          {expanded && (
            <>
              <Fluid__iFrame
                iFrameStyle={{
                  '& div.content': {
                    background: 'none',
                  },
                }}
                minHeight="300px"
                src={capSrc}
              />
              <Button__Primary
                onClick={() => {
                  window.open(
                    capSrc,
                    '_blank',
                    'location=yes,height=600,width=500,scrollbars=yes,status=yes'
                  );
                  setExpanded(false);
                }}
              >
                Open In New Window
              </Button__Primary>
            </>
          )}
        </CaptionDetails>
      </AccordionDetails>
    </StyledAccordion>
  );
};

CaptionAccordion.propTypes = {};

export default CaptionAccordion;
