import { Router, useRouter } from 'next/router';
import Meta from 'components/globals/Meta';
import PreviewLoginPage from 'components/globals/Login/PreviewLoginPage';
import { EVENT_URL, event_theme } from './index';

const Index = (props) => {
  const router = useRouter();

  const MainPage = () => {
    return (
      <PreviewLoginPage
        theme={event_theme}
        redirect={`./`}
        EVENT_URL={EVENT_URL}
      >
        <Meta title={'Login'}></Meta>
      </PreviewLoginPage>
    );
  };

  return <MainPage />;
};

export async function getServerSideProps(ctx) {
  // If you request this page with the preview mode cookies set:
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.
  //   get the event job data from our api
  if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
    return {
      redirect: {
        destination: './',
      },
    };
  }
  return {
    props: {},
  };
}

export default Index;
