import React from 'react';
import { Page as GlobalPage } from 'components/__GLOBALS__/ThemedPage';

const Page = ({ theme, children, showFooter = true }) => {
  return (
    <GlobalPage theme={theme} showFooter={showFooter}>
      {children}
    </GlobalPage>
  );
};

export default Page;
