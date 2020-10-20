export async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getEventByUrl(url) {
  const data = await fetchAPI(
    `
      query($where:JSON){
        eventJobs(where: $where){
         eventUrl
         events(where : {
           isMainEvent: true
         })
         {
           eventStartEnd{
             StartDateTime
           }
         }
       }
       }
    `,
    {
      variables: {
        where: {
          eventUrl: url,
        },
      },
    }
  );
  return data?.eventJobs[0].eventUrl;
}

export async function getEventExhibitors(urlString) {
  const data = await fetchAPI(
    `
  query exhibitorsEvent ($where: JSON)  {
    events(where: { 
      event_job:  $where  
    }) {
      exhibitors {
        id
        ExhibitName
        Company
        FirstName
        LastName
        Email
        Attachments{
          name
          url
          size   
        }
      }
    }
  }`,
    {
      variables: {
        where: {
          eventUrl: urlString,
        },
      },
    }
  );
  return data.events[0].exhibitors;
}

export async function getEventMeta(urlString) {
  const data = await fetchAPI(
    `
        query getEventMeta($where : JSON){
        eventJobs(where: $where){
        id
        EventJobName
        eventUrl
        eventJobStartEnd{
          StartDateTime
        }
        client{
          ClientName
        }
        events{
          EventName
          slug
          isMainEvent
          eventStartEnd{
            StartDateTime
          }
      
        }
        sponsors{
          Name
          SponsorUrl
        }
        eventStatus{
          EventStatus
        }
            }
    }`,
    {
      variables: {
        where: {
          eventUrl: urlString,
        },
      },
    }
  );
  return data.eventJobs[0];
}
