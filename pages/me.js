export async function getServerSideProps(ctx) {
  return {
    redirect: {
      destination: './',
    },
  };
}
