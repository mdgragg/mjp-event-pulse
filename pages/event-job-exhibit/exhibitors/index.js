import React from 'react';
import { theme } from "../style";
import EventSearch from "../../../components/template1/EventSearch";
import Body from "../../../components/template1/Body";
import Section from "../../../components/template1/Section";
import Meta from "../../globals/Meta";

import Page from "../../../components/template1/Page";
import { gql } from 'apollo-boost';

const ExhibitorPage = () => {
    return (
        <Page theme={theme}>
        <Meta title="Exhibitors"> </Meta>
            <Body> 
            <Section>

            <Link href="/"></Link>
            </Section>
           
            </Body>
        </Page>
    );
};

export default ExhibitorPage;

const GET_EXHIBITORS = gql` 
    query exhibitorsEvent {
  events(where: { 
    event_job: { 
      eventUrl: "event-job-exhibit" } 
  }) {
    exhibitors {
      ExhibitName
      Company
      FirstName
      LastName
      Attachments{
        name
        url
        size
        
      }
    }
  }
}
`