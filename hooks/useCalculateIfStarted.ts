import { useState, useEffect, useMemo, useCallback } from 'react';
import { calculate_remaining } from '../lib/helpers';
import useInterval from 'hooks/useInterval';
import _ from 'lodash';
const useCalculateIfStarted = (event: any, offset? : number) => {
  const {
    eventStartEnd: { StartDateTime, EndDateTime },
  } = event;

  const calculate = () => {
    if(!offset){
      offset = 0;
    }
    const calcOffset = offset * 60 * 1000
    const res = calculate_remaining(StartDateTime, EndDateTime);

    return {
      hasStarted: res.total_remaining - calcOffset <= 0 ,
      hasEnded: res.parsed_until_end <= 0,
    };
  };
  const [state, setState] = useState(calculate());

  useInterval(() => {
    let res = calculate();
    if (!_.isEqual(res, state)) {
      setState(res);
    }
  }, 1000);
  return state;
};

export default useCalculateIfStarted;

// calculate initially
// if the result changes only then change this.state.
// if the result is unchanged, do not update state
