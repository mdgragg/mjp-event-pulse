import SponsorMap from 'components/Sponsors/SponsorMap';
import React from 'react';

const YWCA_SponsorMap = ({ eventId }) => {
  return (
    <SponsorMap
      eventId={eventId}
      tiers={[
        'Transformational',
        'Presenting',
        'Program',
        'Community',
        'Ally',
        'Empowerment',
        'Event Host ',
      ]}
    />
  );
};

export default YWCA_SponsorMap;
