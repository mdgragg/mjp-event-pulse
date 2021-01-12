import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { get_ext } from 'lib/helpers';

const ExhibitorVideo = ({ source }) => {
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
  const key = Object.keys(source).find(
    (key) => source[key].key === 'videoLink'
  );

  const src = source[key].value;

  return (
    <div>
      <video width="100%" height="100%" controls autoPlay>
        <source src={src} type={`video/${get_ext(src)}`} ref={videoRef} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

ExhibitorVideo.propTypes = {};

export default ExhibitorVideo;
