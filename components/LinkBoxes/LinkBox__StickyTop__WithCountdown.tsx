import React from 'react';
import LinkBox from './LinkBox';
import {
  StyledPlaceholder__Inner,
  StyledPlaceholder__Wrap,
} from './LinkBox__Styles';
import { ExternalLink__Type } from 'types/Link__Types';
import { Replacer } from 'components/__Assets__';
import { useCalculateIfStarted } from 'hooks';
import { PictureAsPdf } from '@material-ui/icons';

export type LinkBox_StickyTop__WithCountdown__Types = {
  start: string;
  /* Number in minutes */
  offset: number;
  showBefore: React.ReactNode;
  showAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  link: ExternalLink__Type;
};

const LinkBox__StickyTop__WithCountdown = ({
  start,
  offset,
  showBefore,
  showAfter,
  link,
  prefix,
}: LinkBox_StickyTop__WithCountdown__Types) => {
  const startEnd = useCalculateIfStarted(
    { eventStartEnd: { StartDateTime: start, EndDateTime: start } },
    offset
  );

  return (
    <Replacer
      showIfFalse={
        <StyledPlaceholder__Wrap>
          <StyledPlaceholder__Inner style={{ backgroundColor: 'white' }}>
            {showBefore}
          </StyledPlaceholder__Inner>
        </StyledPlaceholder__Wrap>
      }
      showIfTrue={
        startEnd.hasEnded ? showAfter : <LinkBox link={link} prefix={prefix} />
      }
      decider={startEnd.hasStarted}
    />
  );
};

export default LinkBox__StickyTop__WithCountdown;
