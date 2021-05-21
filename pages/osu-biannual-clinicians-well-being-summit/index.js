export const event_theme = {
  // bg: '#BADA55'
  fontFamily: 'Roboto',
};

const Template1 = (props) => {
  return <div></div>;
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: '/osu-biannual-clinicians-well-being-summit/exhibitors',
    },
  };
}

export default Template1;
