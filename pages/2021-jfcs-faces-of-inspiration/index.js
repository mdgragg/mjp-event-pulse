import Meta from 'components/globals/Meta';
import Page from 'components/template1/Page';
import JCFS__PAGE from 'components/IndividualEventAssets/2021-jcfs-faces-of-inspiration/JCFS__PAGE';

export const EVENT_URL = '2021-jfcs-faces-of-inspiration';

export var event_theme = {
  heroHeight: 'auto',
  bg: '#f7f7f7',
  videoBreakPoint: null,
  maxSectionWidth: null,
  fontFamily: 'Avenir',
  headerOpacity: '0.5',
  white: null,
  green: '#4F854A',
  blue: '#005198',
  lightBlue: '#60A4D8',
  red: null,
  buttonColor: null,
  headerFont: null,
  headerBgColor: null,
};

const Index = (props) => {
  // const { error, loading, data } = useQuery(getMainEventMeta(50));
  const { speakers = [], event_meta, main_event } = props;

  event_theme = {
    ...event_theme,
    bgImage: main_event.HeaderImage?.url || 'https://placehold.co/1920x860',
  };

  return (
    <Page theme={event_theme}>
      <Meta title={event_meta.EventJobName}> </Meta>
      <JCFS__PAGE theme={event_theme} main_event={main_event} />
    </Page>
  );
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
      permanent: false,
    },
  };
}

export default Index;
