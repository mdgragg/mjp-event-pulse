import { useState, useEffect } from 'react';

const useDynamicBreakwidth = (initial: number, imgSrc: string): number => {
  const [breakwidth, setBreakwidth] = useState(initial);

  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = imgSrc;

    bgImage.onload = function (this: Element) {
      console.log(this);
      setBreakwidth(this.width);
    };
  }, []);

  return breakwidth;
};

export default useDynamicBreakwidth;
