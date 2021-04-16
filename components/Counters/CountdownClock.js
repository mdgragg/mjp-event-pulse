import React from 'react';
import Spanner from './Spanner';
const CountdownClock = ({ countdown_object }) => {
  const obj = countdown_object;

  return (
    <div>
      <Spanner
        inner={
          obj.total_remaining < 0
            ? '00:00:00'
            : `${
                obj.days !== '00'
                  ? obj.days < 2
                    ? obj.days + ' Day'
                    : obj.days + ' Days'
                  : ''
              } ${
                obj.hours && obj.hours > 0
                  ? obj.hours < 2
                    ? obj.hours + ' Hour'
                    : obj.hours + ' Hours'
                  : ''
              } ${obj.minutes && obj.minutes + ':'}${obj.seconds}`
        }
      />
    </div>
  );
};

export default CountdownClock;
