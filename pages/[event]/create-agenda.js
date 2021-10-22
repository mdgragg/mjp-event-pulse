import React from 'react';
import Page from '../../components/PageTemplates';
import { default_theme } from '../../components/Themes/default.theme';
import { AgendaCreator } from 'components/Admin/AgendaCreator';

const AgendaCreatorPage = () => {
  return (
    <Page theme={default_theme}>
      <AgendaCreator />
    </Page>
  );
};

export default AgendaCreatorPage;
