import Fluid__iFrame from 'components/iFrames/Fluid__iFrame';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { VideoBox } from 'components/VideoBoxes';
import Center from 'components/Center';

const Wrap = styled.div`
  margin: 2rem auto;
`;
const StyledVideoGallery = styled.div`
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
type VideoGallery = { links: any[]; title?: string };

const VideoGallery = ({ links, title = 'Past Videos' }: VideoGallery) => {
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
  if (!videoLinks || videoLinks.length === 0) {
    return null;
  }
  return (
    <Wrap>
      <Center>
        <h3>{title}</h3>
      </Center>
      <StyledVideoGallery>
        {videoLinks?.map((lnk) => (
          <div className="box">
            <VideoBox src={lnk.url} />
          </div>
        ))}
      </StyledVideoGallery>
    </Wrap>
  );
};

export default VideoGallery;
