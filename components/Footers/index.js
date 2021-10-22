import React from 'react';
import styled from 'styled-components';
import MJP__SVG from '../__GLOBALS__/MJP__SVG';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Typography } from '@material-ui/core';

const MyFooter = styled.footer`
  font-size: 0.75rem;
  font-family: Avenir;
  width: 100%;
  background-color: black;
  color: white;
  padding: 3rem 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  align-items: center;
  justify-content: center;
  && a {
    color: white;
    margin: 0;
    padding: 0;
  }
  && > div {
    text-align: center;
    margin: 0 auto;
  }

  && .icons-wrap {
    margin: 0;
  }
  && .icons {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    margin: auto;
  }

  && .icons svg {
    margin: 0 0.25rem;
    font-size: 1.25rem;
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 100%;
    && .virtual-experiences {
      font-size: 0.65rem;
    }
    && .tech-issues {
      display: none;
    }
    && .icons-wrap {
      margin: 0 auto;
    }
  }
`;

const LogoWrap = styled.div`
  max-width: 200px;
  height: 60%;
  text-align: center;
  margin: 0 auto;
  && svg {
    height: auto;
    width: 100%;
    margin: 10px auto;
  }
  @media all and (max-width: 1000px) {
    max-width: 130px;
  }
`;

const Footer = () => {
  return (
    <MyFooter>
      <div className="tech-issues">
        <a href="/">Having Tech Issues? </a>
      </div>
      <div className="virtual-experiences">
        <div>
          <Typography variant="overline">
            Virtual Experiences Brought To You By
          </Typography>
        </div>
        <a href="https://millsjames.com">
          <LogoWrap>
            <MJP__SVG />
          </LogoWrap>
        </a>
      </div>
      <div className="icons-wrap">
        <div className="icons">
          <a href="https://www.millsjames.com/contact-us/" target="_blank">
            <EmailIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/mills-james-productions"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
          <a href="https://www.youtube.com/user/millsjames1" target="_blank">
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </MyFooter>
  );
};

export default Footer;
