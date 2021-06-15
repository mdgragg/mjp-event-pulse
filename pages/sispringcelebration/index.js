const Index = () => {
  return <></>;
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
