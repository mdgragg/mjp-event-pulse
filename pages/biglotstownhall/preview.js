import { Router, useRouter } from 'next/router';
import cookies from 'next-cookies';
import _ from 'lodash';

import PreviewLoginPage from 'components/globals/Login/PreviewLoginPage';
import { EVENT_URL } from './index';
export var event_theme = {
  heroHeight: '25vh',
  fontFamily: null,
  headerOpacity: null,
  videoBreakPoint: 700,
  white: null,
  blue: '#1e2c60',
  buttonInfoColor: null,
  buttonSuccessColor: null,
  buttonDangerColor: 'tomato',
  red: '#b71f39',
  buttonColor: null,
  headerFont: null,
  headerBgColor: 'white',
  maxSectionWidth: '1800px',
};
const Index = (props) => {
  const router = useRouter();

  const MainPage = () => {
    return (
      <PreviewLoginPage
        theme={event_theme}
        EVENT_URL={EVENT_URL}
        previewPassword={props.previewPassword}
      ></PreviewLoginPage>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
    return {
      redirect: {
        destination: `/${EVENT_URL}`,
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default Index;
