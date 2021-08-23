import {
  StyledPlaceholder__Inner,
  StyledPlaceholder__Wrap,
} from './LinkBox__Styles';
import ExternalLinkButton from './ExternalLinkButton';
import React from 'react';

const LinkBox = ({ link, text = 'Join Us Now!', prefix }) => {
  return (
    <StyledPlaceholder__Wrap>
      <StyledPlaceholder__Inner style={{ backgroundColor: 'white' }}>
        {prefix}
        <ExternalLinkButton link={link} text={text} />
      </StyledPlaceholder__Inner>
    </StyledPlaceholder__Wrap>
  );
};

export default LinkBox;
