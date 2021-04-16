import React from 'react';

const Spanner = ({ inner }) => {
  const string = inner.split('');
  const newString = string.map((s, index) => {
    isNaN(parseInt(s, 10)) ? null : (s = parseInt(s, 10));
    if (s === null) return ' ';
    if (typeof s === 'string') return s;
    if (typeof s === 'number')
      return (
        <span className={'clock-digit'} key={`clock-digit--${s}--${index}`}>
          {s}
        </span>
      );
    if (s === ' ') return ' ';
  });
  return newString;
};

export default Spanner;
