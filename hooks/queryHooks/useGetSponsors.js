import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SPONSOR_QUERY } from '../lib/queries';
import { transformByCommonAttr } from '../lib/helpers';
const useGetSponsors = (id) => {
  const [sortData, setSortData] = useState(null);
  let { error, loading, data } = useQuery(SPONSOR_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    if (!loading && data) {
      data = data.events[0].Sponsors;
      data = transformByCommonAttr(data, 'SponsorTier');
      setSortData(data);
    }
  }, [data]);

  return { error, loading, data: sortData };
};

export default useGetSponsors;
