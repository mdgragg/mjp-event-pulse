import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { VideoBox } from 'components/VideoBoxes';
import Center from 'components/Center';

const VideoGallery = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  gap: 2%;
  justify-content: center;
  margin: 3rem auto;
  width: 90%;
  max-width: 1200px;

  && div.box {
    margin: 0.5rem 0;
  }
`;
type props = { [x: string]: any };

const PreviousVideos = (props): props => {
  const { links } = props;

  const [videoLinks, setVideoLinks] = useState(null);

  useEffect(() => {
    if (links) {
      setVideoLinks(
        links.filter((lnk) => {
          return lnk.Service === 'Archive';
        })
      );
    }
  }, [links]);
  if (!videoLinks) {
    return null;
  }
  return (
    <>
      <Center>
        <h3>Past Videos</h3>
      </Center>
      <VideoGallery>
        {videoLinks?.map((lnk) => (
          <div className="box">
            <VideoBox src={lnk.url} />
          </div>
        ))}
      </VideoGallery>
    </>
  );
};

PreviousVideos.propTypes = {};

export default PreviousVideos;
