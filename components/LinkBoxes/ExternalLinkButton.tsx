import React, { useState } from 'react';
import { ExternalLink__Type } from 'types/Link__Types';
import ExternalLink from 'components/Modals/ExternalLink';
import { Button__Big, Button__Primary } from 'components/Buttons';

type LinkButton__Props = {
  link: ExternalLink__Type;
  text: string;
};

const ExternalLinkButton = ({ link, text }: LinkButton__Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ExternalLink open={modalOpen} setOpen={setModalOpen} link={link} />
      <Button__Primary onClick={() => setModalOpen(true)}>
        {text}
      </Button__Primary>
    </>
  );
};

export default ExternalLinkButton;
