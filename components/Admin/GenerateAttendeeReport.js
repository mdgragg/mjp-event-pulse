import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { toast } from 'react-toastify';
import generate_attendee_report from 'lib/fetchCalls/generate_attendee_report';
import { makeDate } from 'lib/helpers';
import FormHelperText from '@material-ui/core/FormHelperText';

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
const GenerateAttendeeReport = ({ events }) => {
  const [selected_event, set_selected_event] = useState(events[0]);
  const [specific_date_time, set_specific_date_time] = useState({
    isSelected: false,
    from: makeDate(selected_event.eventStartEnd.StartDateTime),
    to: makeDate(selected_event.eventStartEnd.EndDateTime),
  });
  const [options, setOptions] = useState(null);

  const sesh = useSession();

  const handle_select = (slug) => {
    set_selected_event(events.find((ev) => ev.slug === slug));
  };

  useEffect(() => {
    set_specific_date_time((prev) => ({
      ...prev,
      from: makeDate(selected_event.eventStartEnd.StartDateTime),
      to: makeDate(selected_event.eventStartEnd.EndDateTime),
    }));
  }, [selected_event]);

  useEffect(() => {
    if (specific_date_time.isSelected) {
      setOptions({
        Date: { from: specific_date_time.from, to: specific_date_time.to },
      });
    } else {
      setOptions(null);
    }
  }, [specific_date_time.isSelected]);

  return (
    <div>
      <hr />
      <h3>Generate Attendee Report</h3>

      <FormControl>
        <InputLabel id="event-slug">Sub-Event</InputLabel>
        <Select
          labelId="event-slug"
          id="event-slug-select"
          value={selected_event.slug}
          onChange={(e) => handle_select(e.target.value)}
        >
          {events &&
            events.map((ev) => (
              <MenuItem value={ev.slug} key={ev.slug}>
                {ev.slug}
              </MenuItem>
            ))}
        </Select>
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
