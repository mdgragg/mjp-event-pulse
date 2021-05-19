export const event_theme = {
  // bg: '#BADA55'
  fontFamily: 'Roboto',
};

const Template1 = (props) => {
  return <></>;
};
export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: '/osu-ccts-annual-scientific-meeting/exhibitors',
    },
  };
}

export default Template1;
