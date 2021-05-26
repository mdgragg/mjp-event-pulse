export async function fetchAPI(
  query,
  { variables } = {},
  key = process.env.STRAPI_AUTHENTICATED_API_KEY
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
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
        eventUrl
        events{
          EventName
          event_job{
            jobId
          }
          LogoLink{
            Media{
              name
              url
            }
            Link
            Title
            Description
          }
          isMainEvent
          AuthOptions {
            AuthorizationType
          }
          Description
          HeaderImage{
            url
          }
          BreakoutSessions{
            id
            Name
            DateTime
            Description
            Private
            Category
            Password
            Thumbnail{
              url
            }
            Link{
              url
              Service
            }
          }
          KeyValue{
            key
            value
          }
          exhibitors{
            Company
            Website
          }
          streamLinks{
            url
            Service
            isMain
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
          PreviewPassword
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
          BreakoutSessions{
            Name
            DateTime
            Description
            Category
            Link{
              url
              Service
            }
          }
          streamLinks{
            url
            Service
            IsMain
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
