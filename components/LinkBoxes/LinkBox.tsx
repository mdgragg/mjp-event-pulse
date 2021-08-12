import {
  StyledPlaceholder__Inner,
  StyledVideoPlaceholder__Wrap,
} from 'components/VideoBoxes/VideoBox__Styles';
import ExternalLinkButton from './ExternalLinkButton';
import React from 'react';

const LinkBox = ({ link, text = 'Join Us Now!', prefix }) => {
  return (
    <StyledVideoPlaceholder__Wrap>
      <StyledPlaceholder__Inner style={{ backgroundColor: 'white' }}>
        {prefix}
        <ExternalLinkButton link={link} text={text} />
      </StyledPlaceholder__Inner>
    </StyledVideoPlaceholder__Wrap>
  );
};

export default LinkBox;
