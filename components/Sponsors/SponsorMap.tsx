import React from 'react';
import styled from 'styled-components';
import useGetSponsors from 'hooks/queryHooks/useGetSponsors';
import SingleSponsor from './SingleSponsor';

const StyledMap = styled.div`
  margin: 8rem auto;
  max-width: 900px;
`;

const Tier = styled.h3`
  font-size: 2.5rem;
  text-align: center;
  /* line-height: 1rem; */
`;

const SingleTier = styled.div`
  margin: 6rem auto;
  && hr {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const SponsorWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type SponsorMap = {
  eventId: number | string;
  tiers: string[];
};
const SponsorMap = ({ eventId, tiers }: SponsorMap) => {
  const { err, loading, data } = useGetSponsors(Number(eventId));

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (err || !data) {
    return <div>{err}</div>;
  } else if (data) {
    return (
      <StyledMap>
        {tiers.map((tier, index) => (
          <SingleTier key={`sponsor-${tier}--${index}`}>
            <Tier>{tier}</Tier>
            <hr />
            <SponsorWrap>
              {data[tier].map((sponsor) => (
                <SingleSponsor sponsor={sponsor} key={sponsor.id} />
              ))}
            </SponsorWrap>
          </SingleTier>
        ))}
      </StyledMap>
    );
  }
};

export default SponsorMap;
