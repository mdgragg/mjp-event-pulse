import React from 'react';
import Page from 'components/template1/Page';
import UseServerSentEvents from '../../hooks/useServerSentEvents';
import Total from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/Total';
import { event_theme, EVENT_URL } from './index';
import CountUp from 'react-countup';
import LeaderBoards from '../../components/IndividualEventAssets/house-of-mercy-game-show-gala/LeaderBoards';
import { getEventMeta } from 'lib/api';
import { useEffect, useState } from 'react';

const pip062423 = ({ url }) => {
  const data = UseServerSentEvents(`${url}/auction`);
  const [sortedData, setSortedData] = useState(null);
  useEffect(() => {
    if (data) {
      const sorted = data.teamTotal.sort((a, b) => {
        let v;
        a.currentBid < b.currentBid ? (v = 1) : (v = -1);
        return v;
      });
      setSortedData(sorted);
    }
  }, [data]);
  return (
    <Page theme={event_theme}>
      {data && (
        <div style={{ fontSize: '3rem', margin: '4rem' }}>
          <div>
            <h2
              style={{
                backgroundColor: 'green',
                color: 'white',
                fontSize: '5rem',
                padding: '20px',
              }}
            >
              Total:{' '}
              <CountUp
                formattingFn={(value) =>
                  Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                  }).format(value)
                }
                prefix="$ "
                separator=","
                duration={2}
                start={10}
                end={data.total}
                preserveValue={true}
              />
            </h2>
          </div>
          <div>
            {sortedData &&
              sortedData.map((d) => (
                <h3>
                  {d.name}:{' '}
                  <CountUp
                    formattingFn={(value) =>
                      Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                      }).format(value)
                    }
                    prefix="$ "
                    separator=","
                    duration={2}
                    start={10}
                    end={d.currentBid}
                    preserveValue={true}
                  />
                </h3>
              ))}
          </div>
        </div>
      )}
    </Page>
  );
};

export default pip062423;

export async function getServerSideProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];
  const url = main_event.streamLinks[2].url;
  return {
    props: { url },
  };
}
