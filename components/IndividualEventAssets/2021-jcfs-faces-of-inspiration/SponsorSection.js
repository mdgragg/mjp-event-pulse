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
  }
  && .sponsor--heading {
    display: flex;
    max-width: 800px;
    margin: auto;
  }
  && .single--sponsor {
    width: 100%;
    min-height: 300px;
  }
`;

const ScrollSection = styled.div`
  margin: 4rem auto;
`;
const SingleNameScroll = styled.div`
  background-color: ${(props) => props.theme.blue};
  margin: 0 2rem;
  min-height: 200px;

  color: white;
  font-size: 2rem;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 868px) {
    font-size: 1rem;
    min-height: 100px;
  }
`;
const ScrollSponsorMap = (names) => {
  const name_array = [];

  names.forEach((name, index) => {
    name_array.push(<SingleNameScroll>{name + index}</SingleNameScroll>);
  });

  return name_array;
};

const SponsorSection = () => {
  const names = [
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
    'Sponsor Number ',
  ];

  return (
    <>
      <TheSection>
        <h2>Presenting Sponsors</h2>
        <div className="sponsor--heading">
          <div className="single--sponsor">Sembler</div>
          <div className="single--sponsor">Jan & Craig Sher</div>
        </div>
        <h2>Platinum Sponsor</h2>
        <div className="sponsor--heading">
          <div className="single--sponsor">Duke Energy</div>
        </div>
        <h2>Other Sponsors</h2>
      </TheSection>
      <ScrollSection>
        <HorizontalCarousel data={ScrollSponsorMap(names)} />
      </ScrollSection>
    </>
  );
};

export default SponsorSection;
