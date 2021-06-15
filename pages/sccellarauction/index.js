const Index = (props) => {
  return <></>;
};

export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
      permanant: false,
    },
  };
}

export default Index;
