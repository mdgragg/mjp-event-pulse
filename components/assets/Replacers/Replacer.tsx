import React from 'react';

type Replacer__Types = {
  showIfTrue: React.ReactNode;
  showIfFalse: React.ReactNode;
  decider: boolean;
};

const Replacer = ({ showIfTrue, showIfFalse, decider }: Replacer__Types) => {
  return decider ? <> {showIfTrue}</> : <>{showIfFalse} </>;
};

export default Replacer;
