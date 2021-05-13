import React, { useEffect, useState } from 'react';

const useTestBool = () => {
  const [val, setVal] = useState(false);

  useEffect(() => {
    setVal(!val);
  }, []);
  return val;
};

export default useTestBool;
