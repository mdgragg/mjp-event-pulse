import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import TwoPanel from 'components/TabPanels/TwoPanel';
import { ListAgenda, ListAgenda__Loading } from './ListAgenda';
import useGetAgenda from 'hooks/queryHooks/useGetAgenda';
// http://events.r20.constantcontact.com/register/event?llr=dmu7d7cab&oeidk=a07ehvrwj2ga36ae5cf&showPage=true
const TheAgenda = styled.div`
  min-height: 100%;
  font-size: 1rem;
  /* max-width: 550px; */
  margin: auto;
  background-color: ${(props) => props.theme.colors.primary};
`;

const makeTabData = (data) => {
  return data
    .filter((d) => {
      if (!d.options.displayOnPage) {
        return false;
      }
      return true;
    })
    .map((d) => {
      return {
        title: d.name,
        content: <ListAgenda data={d} />,
        options: d.options,
      };
    });
};
const Agenda__MultiTab = ({ eventId }) => {
  const { error, loading, data } = useGetAgenda(eventId);

  const [tabData, setTabData] = useState([]);

  useEffect(() => {
    if (data && !error) {
      const newTabData = makeTabData(data);
      console.log({ newTabData });
      setTabData(newTabData);
      const initialTab = newTabData.findIndex(
        (d) => d.options.defaultTab === true
      );
    }
  }, [data, error, loading]);

  return (
    <TheAgenda>
      {loading || !tabData ? (
        <TwoPanel
          data={[
            { title: 'Loading', content: <ListAgenda__Loading number={10} /> },
          ]}
        ></TwoPanel>
      ) : (
        <TwoPanel
          data={tabData}
          initialTab={tabData.findIndex((d) => d.options.defaultTab === true)}
        ></TwoPanel>
      )}
    </TheAgenda>
  );
};

export default Agenda__MultiTab;
