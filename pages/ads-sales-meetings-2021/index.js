const Index = (props) => {
  return <></>;
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
      permanent: true,
    },
  };
}

export default Index;
