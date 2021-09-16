import { useRouter } from 'next/router';
import Meta from 'components/__GLOBALS__/Meta';
import PreviewLoginPage from 'components/__GLOBALS__/Login/PreviewLoginPage';

const Preview = ({ EVENT_URL }) => {
  const router = useRouter();

  const MainPage = () => {
    return (
      <PreviewLoginPage EVENT_URL={EVENT_URL} redirect={`/${EVENT_URL}`}>
        <Meta title={'Login'}>
          <title>Login</title>
        </Meta>
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
  const EVENT_URL = ctx.query.event;
  console.log('dynamic url: ' + EVENT_URL);
  if (ctx.req.cookies[`preview_cookie__${EVENT_URL}`] === 'true') {
    return {
      redirect: {
        destination: './',
      },
    };
  }
  return {
    props: { EVENT_URL },
  };
}

export default Preview;
