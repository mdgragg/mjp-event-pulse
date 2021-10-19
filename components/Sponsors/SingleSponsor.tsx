import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button__Secondary } from '../../components/Buttons';

const SingleSponsorStyle = styled.div`
  box-shadow: 0px 0px 20px -18px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 350px;
  min-width: 250px;
  min-height: 120px;
  padding: 1rem;
  &&.withLink:hover .title {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    opacity: 1;
  }
  &&:hover .button {
    visibility: visible;
    opacity: 1;
  }
  &&:hover img {
    transform: scale(1.1);
  }
  &&.withLink:hover img {
    filter: blur(6px);
  }

  && p {
    font-weight: 600;
    transform: skew(-8deg, 0);
    text-align: center;
    padding: 1rem 0;
    width: 80%;
    margin: auto;
    color: ${(props) => props.theme.colors.secondary};
  }
`;
const Title = styled.div`
  font-size: 1.5rem;
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  &&.show {
    opacity: 1;
  }

  && .button {
    transition: all 0.2s ease;
    margin-top: 1rem;
    visibility: hidden;
    opacity: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 350px;
  background-color: white;
  padding: 20px;
  transition: all 0.2s ease;
`;

const MyButton = styled(Button__Secondary)`
  /* opacity: 0; */
`;
const SingleSponsor = ({ sponsor }) => {
  return (
    <SingleSponsorStyle className={sponsor.SponsorLink ? 'withLink' : ''}>
      {sponsor.Logo?.url ? (
        <Image src={sponsor.Logo.url} />
      ) : (
        <Title className="title show">{sponsor.SponsorName}</Title>
      )}
      <Title className="title">
        {sponsor.SponsorName}
        {sponsor.SponsorLink && (
          <div className="button">
            <a href={sponsor?.SponsorLink}>
              <MyButton className="btn">Visit</MyButton>
            </a>
          </div>
        )}
      </Title>
      {sponsor.Description && <p>{sponsor.Description}</p>}
    </SingleSponsorStyle>
  );
};

SingleSponsor.propTypes = {
  sponsor: PropTypes.shape({
    id: PropTypes.any.isRequired,
    SponsorName: PropTypes.string.isRequired,
    SponsorLink: PropTypes.string,
    SponsorTier: PropTypes.string,
    Description: PropTypes.string,
    Logo: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  }),
};
export default SingleSponsor;
