import {ApolloProvider} from '@apollo/client'
import { useApollo, initializeApollo } from "../lib/apolloClient";



export const ApolloProviderComp = (props) => {
  const apolloClient = useApollo(props.initialApolloState);
    return (
        <ApolloProvider client={apolloClient}>
            {props.children}
        </ApolloProvider>
    )
}

async function getStaticProps(context) {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: ALL_URL_QUERY,
  });

  
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}