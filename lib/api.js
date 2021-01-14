export async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_AUTHENTICATED_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    return null;
  }
  return json.data;
}

export async function getEventByUrl(url) {
  const data = await fetchAPI(
    `
      query($where:JSON){
        eventJobs(where: $where){
         eventUrl
         id
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
    `query ($where: JSON)  {
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

export async function getExhibitorMeta(ex_id) {
  if (!ex_id) {
    return false;
  }
  const data = await fetchAPI(
    `query  ($id: String!){
        exhibitors(where: {
            id: $id 
        }) {
            FirstName
            LastName
            Company
            Website
            id
            Website
            ExhibitName
            Bio
            Email
            event {
              EventName
              slug
              event_job{
                eventUrl
                jobId
                EventJobName
              }
            }
            KeyValue{
              key
              value
            }
            AdditionalDetails
            Attachments{
              name
              url
              size
              ext
            }
          }
      }`,
    {
      variables: {
        id: ex_id,
      },
    }
  );
  if (!data.exhibitors[0]) return false;
  return data.exhibitors[0];
}

export async function getEventMeta(urlString) {
  const data = await fetchAPI(
    `
        query getEventMeta($where : JSON){
        eventJobs(where: $where){
        id
        EventJobName
        AuthRequired
        eventUrl
        client{
          ClientName
        }
        events(where: {
          isMainEvent: true
        }){
          EventName
          isMainEvent
          KeyValue{
            key
            value
          }
          exhibitors{
            Company
            Website
          }
          sponsors{
            Tier{
              TierChoice
            }
            Name
            SponsorDescription
          }
          streamLinks{
            url
            Service
          }
          eventStartEnd {
            StartDateTime
            EndDateTime
          }
          slug
          id
          isMainEvent
          eventStartEnd{
            StartDateTime
            EndDateTime
          }
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

export async function getEventMetaMain(urlString) {
  const data = await fetchAPI(
    `query getEventMeta($where : JSON){
        eventJobs(where: $where){
        id
        EventJobName
        AuthRequired
        eventUrl
        client{
          ClientName
        }
        events(where: {
          isMainEvent: true
        }){
          EventName
          KeyValue{
            key
            value
          }
          exhibitors{
            Company
            Website
          }
          sponsors{
            Tier{
              TierChoice
            }
            Name
            SponsorDescription
          }
          streamLinks{
            url
            Service
          }
          eventStartEnd {
            StartDateTime
            EndDateTime
          }
          slug
          id
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

export async function getMainEventMeta(id) {
  const data = await fetchAPI(
    `query getMainEvent($id: ID!){
      eventJob(id: $id) {
        events(where: {
          isMainEvent: true
        }){
          isMainEvent
          exhibitors{
            Company
            Website
          }
          EventName
          sponsors{
            Tier{
              TierChoice
            }
            Name
            SponsorDescription
          }
          streamLinks{
            url
            Service
          }
          eventStartEnd {
            StartDateTime
            EndDateTime
          }
          slug
        }
      }
    }
    `,
    {
      variables: {
        id: id,
      },
    }
  );
  return data.eventJob.events[0];
}
export async function getMetaForEvent(slug) {
  const data = await fetchAPI(
    `query getMetaForEvent($slug : String!){
        events(where :{
          slug : $slug
        }){
          id
          EventName
          isMainEvent
          client{
            ClientName
          }
        }
      }`,
    {
      variables: {
        slug: slug,
      },
    }
  );
  return data.events[0];
}
