import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { get_ext } from 'lib/helpers';

const ExVid = styled.div`
  && > video::cue {
    font-family: sans-serif;
  }
  && > video::-webkit-media-text-track-container {
    // Style the container
    max-width: 300px;
  }

  && > video::-webkit-media-text-track-display {
    // Style the text itself
    font-size: 0.5em;
    font-family: sans-serif !important;
  }
`;

const ExhibitorVideo = ({ source, src, caption }) => {
  const videoRef = useRef();

  const handleVidLoad = (e) => {
    console.log('video');
    console.log(e);
  };
  useEffect(() => {
    videoRef.current.addEventListener('loadeddata', handleVidLoad);

    return () => {
      videoRef.current.removeEventListener('loadeddata', handleVidLoad);
    };
  }, []);

  return (
    <ExVid>
      <video
        width="100%"
        height="100%"
        controls
        autoPlay
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source src={src} type={`video/${get_ext(src)}`} ref={videoRef} />
        Your browser does not support the video tag.
        <track
          src={caption}
          label="English"
          kind="captions"
          srcLang="en-us"
          default
        />
      </video>
      <p>
        Trouble seeing this video? You may need to{' '}
        <a href={`${src}`}>download and view</a>.
      </p>
    </ExVid>
  );
};

ExhibitorVideo.propTypes = {};

export default ExhibitorVideo;
