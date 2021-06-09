import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import { toast } from 'react-toastify';
import {
  Button,
  TextField,
  Select,
  FormControl,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Checkbox,
  LinearProgress,
} from '@material-ui/core';
import GenerateAttendeeReport from '../../components/Admin/GenerateAttendeeReport';
import Page from 'components/template1/Page';
import Section from 'components/Sections/Section';
const Admin = (props) => {
  const router = useRouter();

  const { err, loading, data } = useQuery(
    gql`
      query LoginView($where: String!) {
        eventJobs(where: { eventUrl: $where }) {
          EventJobName
          events {
            slug
            EventName
            id
            eventStartEnd {
              StartDateTime
              EndDateTime
            }
            attendees {
              id
            }
          }
        }
      }
    `,
    { variables: { where: router.query.event } }
  );
  let eventJobs = data && data.eventJobs[0];

  const [selected_event, set_selected_event] = useState(null);

  useEffect(() => {
    if (data?.eventJobs) {
      set_selected_event(data.eventJobs[0].events[0]);
    }
  }, [data]);

  const handle_select = (slug) => {
    const { events } = data.eventJobs[0];
    set_selected_event(events.find((ev) => ev.slug === slug));
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Page theme={{}}>
      <Section>
        <div style={{ maxWidth: '900px', margin: '5rem auto' }}>
          <h1 style={{ margin: '5rem auto', fontSize: '3rem' }}>
            {eventJobs && eventJobs.EventJobName}{' '}
            <span
              style={{
                backgroundColor: '#1c1c1c',
                color: 'white',
                padding: '0rem 1rem',
              }}
            >
              Admin
            </span>
          </h1>
          <div>
            {selected_event &&
              data?.eventJobs[0]?.events.map((ev) => (
                <Button
                  key={`button--event-${ev.id}`}
                  style={{ margin: '0 10px 0 0' }}
                  color={ev.slug === selected_event.slug ? 'secondary' : ''}
                  variant="contained"
                  onClick={() => handle_select(ev.slug)}
                >
                  {ev.EventName}
                </Button>
              ))}
          </div>
          <GenerateAttendeeReport
            events={eventJobs ? eventJobs.events : null}
            loading={loading}
            selected_event={selected_event}
          />

          <hr />
          <button
            onClick={() =>
              signIn().then((res) => {
                console.log(res);
                toast('Hello!');
              })
            }
          >
            Login
          </button>
          <button
            onClick={() =>
              signOut().then((res) => {
                console.log(res);
                toast('Hello!');
              })
            }
          >
            Logout
          </button>
        </div>
      </Section>
    </Page>
  );
};

export default Admin;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `./login`,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
