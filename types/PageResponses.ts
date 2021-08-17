import { GetStaticProps, NextPageContext } from 'next';

export type ServerSideResponse = {
  props: any;
  redirect?: {
    destination: string;
    permanent: boolean;
  };
};
