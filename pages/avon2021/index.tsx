import { getEventMeta } from 'lib/api';

import Meta from 'components/__GLOBALS__/Meta';
import Page from 'components/PageTemplates';
import Body from 'components/template1/Body';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/avon2021/theme.theme.js';
import { Button__Big } from 'components/Buttons';
import FullPage__WithBackground from 'components/BodyTemplates/FullPage__WithBackground';
import Link from 'next/link';

const PLACEHOLD = 'https://placehold.co/';
const EVENT_URL = 'avon2021';

const Index = (props) => {
  const { event_meta, main_event } = props;

  var event_theme = {
    ...default_theme,
    header_image: main_event?.HeaderImage?.url || PLACEHOLD + '1920x1080',
  };

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>

      <FullPage__WithBackground
        imgSrc={`https://storage.googleapis.com/mjp-stream-public/avon2021/bg1920x1080.png`}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '900px',
            // marginBottom: 'calc(100vh - 900px)',
          }}
        >
          <img
            style={{ maxWidth: '300px', width: '50%', margin: '9vh auto' }}
            src={main_event.LogoLink[0].Media.url}
          />
          <Link href={'/avon2021/eng'}>
            <Button__Big>This Event Has Ended</Button__Big>
          </Link>
        </div>
      </FullPage__WithBackground>
    </Page>
  );
};

export async function getStaticProps(ctx) {
  let event_data = await getEventMeta(EVENT_URL);
  let main_event = event_data.events.filter((ev) => ev.isMainEvent === true)[0];

  const return_object = {
    props: { main_event, event_meta: event_data },
  };

  return return_object;
}

export default Index;
