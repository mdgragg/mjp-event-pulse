import Link from 'next/link';
import { getEventMeta } from 'lib/api';
import Meta from 'components/globals/Meta';
import Page from 'components/PageTemplates';
import { Button__Primary } from 'components/Buttons';
import { FullPage__WithBackground } from 'components/BodyTemplates';
import { CenteredPlayer } from 'components/BodyTemplates';
import Center from 'components/Center';
import { default_theme } from 'eventAssets/avon2021/theme.theme.js';

const EVENT_URL = 'avon2021';

const Index = (props) => {
  const { event_meta, main_event } = props;

  return (
    <Page theme={default_theme}>
      <Meta title={`${event_meta.EventJobName} | English Stream`}> </Meta>

      <FullPage__WithBackground
        imgSrc={`https://storage.googleapis.com/mjp-stream-public/avon2021/bg1920x1080.png`}
      >
        <div style={{ width: '96%', margin: 'auto', padding: '2rem 0' }}>
          <Center>
            <CenteredPlayer
              showing={true}
              hasStarted={true}
              videoUrl={
                main_event.streamLinks.find(
                  (link) => link.Service === 'Vimeo__Spanish'
                ).url
              }
            />
            <Link href={`/avon2021/espanol`}>
              <Button__Primary>WATCH IN ENGLISH</Button__Primary>
            </Link>
            <br />
            <Link href={`/avon2021`}>
              <Button__Primary>BACK</Button__Primary>
            </Link>
          </Center>
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
    revalidate: 300,
  };

  return return_object;
}

export default Index;
