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
const SponsorMap = ({ eventId }) => {
  const { err, loading, data } = useGetSponsors(parseInt(eventId));

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (err || !data) {
    return <div>{err}</div>;
  } else if (data) {
    return (
      <StyledMap>
        <SingleTier>
          <Tier>Title Sponsor</Tier>
          <hr />
          <SponsorWrap>
            {data['Title'].map((sponsor) => (
              <SingleSponsor sponsor={sponsor} key={sponsor.id} />
            ))}
          </SponsorWrap>
        </SingleTier>

        <SingleTier>
          <Tier>Series Presenting Sponsor</Tier>
          <hr />
          <SponsorWrap>
            {data['Series Presenting'].map((sponsor) => (
              <SingleSponsor sponsor={sponsor} key={sponsor.id} />
            ))}
          </SponsorWrap>
        </SingleTier>

        <SingleTier>
          <Tier>Presenting Sponsors</Tier>
          <hr />
          <SponsorWrap>
            {data['Presenting'].map((sponsor) => (
              <SingleSponsor sponsor={sponsor} key={sponsor.id} />
            ))}
          </SponsorWrap>
        </SingleTier>

        <SingleTier>
          <Tier>Gold Sponsors</Tier>
          <hr />
          <SponsorWrap>
            {data['Gold'].map((sponsor) => (
              <SingleSponsor sponsor={sponsor} key={sponsor.id} />
            ))}
          </SponsorWrap>
        </SingleTier>

        <SingleTier>
          <Tier>Silver Sponsors</Tier>
          <hr />
          <SponsorWrap>
            {data['Silver'].map((sponsor) => (
              <SingleSponsor sponsor={sponsor} key={sponsor.id} />
            ))}
          </SponsorWrap>
        </SingleTier>

        <SingleTier>
          <Tier>Bronze Sponsors</Tier>
          <hr />
          <SponsorWrap>
            {data['Bronze'].map((sponsor) => (
              <SingleSponsor sponsor={sponsor} key={sponsor.id} />
            ))}
          </SponsorWrap>
        </SingleTier>
      </StyledMap>
    );
  }
};

export default SponsorMap;
