import React from 'react';
import { Replacer } from 'components/Assets';
import useCalculateStartWithOffset from 'hooks/useCalculateStartWithOffset';
import LinkBox from './LinkBox';
import {
  StyledPlaceholder__Inner,
  StyledVideoPlaceholder__Wrap,
} from 'components/VideoBoxes/VideoBox__Styles';
import { ExternalLink__Type } from 'types/Link__Types';

export type LinkBox_StickyTop__WithCountdown__Types = {
  start: string;
  /* Number in minutes */
  offset: number;
  showBefore: React.ReactNode;
  prefix?: React.ReactNode;
  link: ExternalLink__Type;
};

const LinkBox__StickyTop__WithCountdown = ({
  start,
  offset,
  showBefore,
  link,
  prefix,
}: LinkBox_StickyTop__WithCountdown__Types) => {
  const started = useCalculateStartWithOffset(start, offset);

  if (started) {
    return <LinkBox link={link} prefix={prefix} />;
  }
  return (
    <StyledVideoPlaceholder__Wrap>
      <StyledPlaceholder__Inner style={{ backgroundColor: 'white' }}>
        {showBefore}
      </StyledPlaceholder__Inner>
    </StyledVideoPlaceholder__Wrap>
  );
};

export default LinkBox__StickyTop__WithCountdown;
