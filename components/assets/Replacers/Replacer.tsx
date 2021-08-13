import React from 'react';

type Replacer__Types = {
  showIfTrue: React.ReactNode;
  showIfFalse: React.ReactNode;
  decider: boolean;
};

const Replacer = ({
  showIfTrue,
  showIfFalse,
  decider,
}: Replacer__Types): any => {
  return decider ? <> {showIfTrue}</> : <>{showIfFalse} </>;
};

export default Replacer;
