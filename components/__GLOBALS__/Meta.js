import Head from 'next/head';

const Meta = ({ title, children }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" href="/static/fonts/fonts.css" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <title> {title ? title : 'Mills James Virtual Events'} </title>
    {children}
  </Head>
);
export default Meta;
