import React from 'react';
import { default_theme } from 'components/Themes/default.theme';
import { Router, useRouter } from 'next/router';
import Body from '../../../components/template1/Body';
import Section from '../../../components/template1/Section';
import Meta from 'components/__GLOBALS__/Meta';
import { useQuery } from '@apollo/client';
import { GET_EXHIBITORS } from 'lib/queries';
import Page from '../../../components/template1/Page';
import styled from 'styled-components';
import ClientOnly from 'components/__Assets__/ClientOnly';

const ExhibitorLink = styled.div`
  && {
    color: blue;
    font-size: 18px;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #c4c4c4;
    border-radius: 7px;
    height: 150px;
    padding: 20px;
    transition: all 0.15s;
  }
  span {
    color: black;
    font-weight: 800;
  }
  :hover {
    background-color: #e2e2e2;
  }
`;

const ExhibitorPage = (props) => {
  const { data, loading, error } = useQuery(GET_EXHIBITORS, {
    variables: { slug: 'osu-annual-scientific-meeting' },
  });
  const router = useRouter();

  const event = data;

  return (
    <Page theme={default_theme}>
      <Meta title="Exhibitors"> </Meta>
      <Body>
        <Section>
          <h1>Exhibitor Index</h1>
          <ClientOnly>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              data &&
              event.events[0].exhibitors.map((e) => (
                <ExhibitorLink
                  key={e.id}
                  onClick={() => router.push(`${router.pathname}/${e.id}`)}
                >
                  <>
                    <strong>
                      {e.FirstName} {e.LastName}
                    </strong>
                    <br /> <span> {e.ExhibitName?.replace(/_/g, ' ')}</span>
                    <br />
                    {e.Email} <br />
                  </>
                </ExhibitorLink>
              ))
            )}
          </ClientOnly>
        </Section>
      </Body>
    </Page>
  );
};
export default ExhibitorPage;
