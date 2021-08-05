import HorizontalCarousel from 'components/ListItems/HorizontalCarousel';
import React from 'react';
import styled from 'styled-components';

const TheSection = styled.div`
  position: relative;
  margin: 2rem auto;
  width: 100%;
  min-height: 200px;
  color: black;
  z-index: 100;
  text-align: center;
  && h2 {
    font-size: 2.5rem;
    color: ${(props) => props.theme.blue};
  }
  && .sponsor--heading {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
  }
  && .single--sponsor {
    width: 100%;
    min-height: 300px;
  }
  @media all and (max-width: 500px) {
    && h2 {
      font-size: 2rem;
    }
  }
`;

const SingleSponsor = styled.div`
  margin: 0 auto;
  && img {
    height: 250px;
    width: auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0px 0px 12px -10px;
  }
  && h3 {
    color: ${(props) => props.theme.blue};
    font-size: 1.25rem;
  }
`;
const ScrollWrap = styled.div``;

const ScrollSection = styled.div`
  margin: 4rem auto;
  && h2 {
    text-align: center;
  }
`;
const SingleNameScroll = styled.div`
  background-color: ${(props) => props.theme.blue};
  margin: 0 1rem;
  min-height: 200px;
  padding: 0 1rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 20px -7px black;
  @media all and (max-width: 868px) {
    font-size: 1rem;
    min-height: 100px;
  }
  @media all and (max-width: 500px) {
    font-size: 0.75rem;
    width: 90%;
    margin: 0 auto;
  }
  &&.bronze {
    min-height: 165px;
    font-size: 1.25rem;
  }
`;
const ScrollSponsorMap = (names, the_class) => {
  const name_array = [];

  names.forEach((name, index) => {
    name_array.push(
      <SingleNameScroll className={the_class} key={name}>
        {name}
      </SingleNameScroll>
    );
  });

  return name_array;
};

const SponsorSection = ({ sponsors }) => {
  return (
    <>
      <TheSection>
        <h2>Presenting Sponsors</h2>
        <div className="sponsor--heading">
          {sponsors.presentingSponsors &&
            sponsors.presentingSponsors.map((sponsor) => (
              <SingleSponsor>
                <img src={sponsor.url} alt={sponsor.alt} />
                {/* <h3> {sponsor.alt}</h3> */}
              </SingleSponsor>
            ))}
        </div>
        <h2>Gold Sponsors</h2>
        <div className="sponsor--heading">
          {sponsors.platinumSponsors &&
            sponsors.platinumSponsors.map((sponsor) => (
              <SingleSponsor>
                <img src={sponsor.url} alt={sponsor.alt} />
                <h3> {sponsor.alt}</h3>
              </SingleSponsor>
            ))}
        </div>
      </TheSection>
      <ScrollWrap>
        <ScrollSection>
          <h2>Silver Sponsors</h2>
          {sponsors?.silver && (
            <HorizontalCarousel
              data={ScrollSponsorMap(sponsors.silver, 'silver')}
              interval={1600}
            />
          )}
        </ScrollSection>
        <ScrollSection>
          <h2>Bronze Sponsors</h2>

          {sponsors.bronze && (
            <HorizontalCarousel
              data={ScrollSponsorMap(sponsors.bronze, 'bronze')}
              interval={1600}
              centerSlidePercentage={20}
            />
          )}
        </ScrollSection>
      </ScrollWrap>
    </>
  );
};

export default SponsorSection;
