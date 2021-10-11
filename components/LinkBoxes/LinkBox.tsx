import {
  StyledPlaceholder__Inner,
  StyledPlaceholder__Wrap,
} from './LinkBox__Styles';
import ExternalLinkButton from './ExternalLinkButton';
import React from 'react';
import { ExternalLink__Type } from 'types/Link__Types';

type LinkBox = {
  link: ExternalLink__Type;
  text?: string;
  prefix: any;
  children?: React.ReactNode;
};

const LinkBox = ({
  link,
  text = 'Join Us Now!',
  prefix,
  children,
}: LinkBox) => {
  return (
    <StyledPlaceholder__Wrap>
      <StyledPlaceholder__Inner style={{ backgroundColor: 'white' }}>
        {prefix}
        {children && children}
        <ExternalLinkButton link={link} text={text} />
      </StyledPlaceholder__Inner>
    </StyledPlaceholder__Wrap>
  );
};

export default LinkBox;
