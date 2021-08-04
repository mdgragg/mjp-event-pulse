import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { toast } from 'react-toastify';
import generate_attendee_report from 'lib/fetchCalls/generate_attendee_report';
import { makeDate } from 'lib/helpers';
import styled from 'styled-components';
import GetAttendees from './GetAttendees';
const BigTitle = styled.div`
  font-weight: 200;
  font-family: Roboto;
  font-style: thin;
  font-size: 3rem;
  margin: 1rem auto;
  color: rgb(18, 223, 127); ;
`;

import {
  Button,
  TextField,
  Select,
  FormControl,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Checkbox,
} from '@material-ui/core';

const init_options = { Date: null, FilterMJP: false };

const GenerateAttendeeReport = ({ events, loading, selected_event }) => {
  if (loading || !selected_event) {
    return (
      <div>
        <BigTitle>Loading...</BigTitle>
      </div>
    );
  }

  const [specific_date_time, set_specific_date_time] = useState({
    isSelected: false,
    from: makeDate(selected_event.eventStartEnd.StartDateTime),
    to: makeDate(selected_event.eventStartEnd.EndDateTime),
  });
  const [options, setOptions] = useState(init_options);

  const sesh = useSession();

  useEffect(() => {
    set_specific_date_time((prev) => ({
      ...prev,
      from: makeDate(selected_event.eventStartEnd.StartDateTime),
      to: makeDate(selected_event.eventStartEnd.EndDateTime),
    }));
  }, [selected_event]);

  useEffect(() => {
    if (specific_date_time.isSelected) {
      setOptions((prev) => ({
        ...prev,
        Date: { from: specific_date_time.from, to: specific_date_time.to },
      }));
    } else {
      setOptions((prev) => ({
        ...prev,
        Date: null,
      }));
    }
  }, [specific_date_time.isSelected]);

  return (
    <div>
      <BigTitle>
        <GetAttendees ev={selected_event} />
      </BigTitle>
      <hr />
      <h3>Generate Attendee Report for {selected_event.EventName}</h3>

      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={options.FilterMJP}
              onChange={() =>
                setOptions((prev) => ({ ...prev, FilterMJP: !prev.FilterMJP }))
              }
              name="Filter MJP Emails"
            />
          }
          label="Filter Out @mjp emails"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={specific_date_time.isSelected}
              onChange={() =>
                set_specific_date_time((prev) => ({
                  ...prev,
                  isSelected: !prev.isSelected,
                }))
              }
              name="specific_date_time"
            />
          }
          label="Choose a Specific Window For Attendee Activity"
        />
        {specific_date_time.isSelected && (
          <>
            <TextField
              id="datetime-local"
              label="Login Time From:"
              type="datetime-local"
              value={specific_date_time.from}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => console.log(e.target.value)}
            />
            <TextField
              id="datetime-local"
              label="Login Time To: "
              type="datetime-local"
              value={specific_date_time.to}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}

        <Button
          variant="contained"
          style={{ display: 'block', margin: '2rem 0' }}
          onClick={async () => {
            toast('Generating Attendee Report...', {
              autoClose: 5000,
              closeOnClick: true,
            });
            if (!sesh[0]?.accessToken) {
              return toast.error('Not Authorized');
            }
            generate_attendee_report(
              selected_event.id,
              sesh[0].accessToken,
              options
            )
              .then((res) => {
                toast.success(
                  <center>
                    <p>
                      Report generated
                      <a href={`${res.link}`} target={`_blank`}>
                        <button>access the spreadsheet</button>
                      </a>
                    </p>
                  </center>,
                  { autoClose: false, closeOnClick: false }
                );
              })
              .catch((err) => toast.error('Error: ' + err));
          }}
        >
          Generate Report for {selected_event.EventName}
        </Button>
      </FormControl>
    </div>
  );
};

export default GenerateAttendeeReport;
