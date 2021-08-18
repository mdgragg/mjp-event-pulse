import { useState, useEffect } from 'react';

const useDynamicBreakwidth = (initial: number, imgSrc: string): number => {
  const [breakwidth, setBreakwidth] = useState(initial);

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = imgSrc;

    bgImage.onload = function () {
      console.log(this);
      setBreakwidth(bgImage.width);
    };
  }, []);

  return breakwidth;
};

export default useDynamicBreakwidth;
