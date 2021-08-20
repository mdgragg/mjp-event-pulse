import { useState, useEffect } from 'react';

const useDynamicBreakwidth = (
  initial: number,
  imgSrc: string
): { breakWidth: number; imageHeight: number } => {
  const [breakWidth, setBreakWidth] = useState(initial);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = imgSrc;

    bgImage.onload = function () {
      console.log(this);
      setBreakWidth(bgImage.width);
      setImageHeight(bgImage.height);
    };
  }, []);

  useEffect(() => {
    console.log({ breakWidth, imageHeight });
  }, [breakWidth, imageHeight]);

  return { breakWidth, imageHeight };
};

export default useDynamicBreakwidth;
