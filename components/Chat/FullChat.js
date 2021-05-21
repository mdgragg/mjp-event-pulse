import React from 'react';
import dynamic from 'next/dynamic';
const DynamicChat = dynamic(() => {
  import('./testco'), { ssr: true };
});

const FullChat = ({ slug }) => {
  return <DynamicChat slug={slug} />;
};

export default FullChat;
