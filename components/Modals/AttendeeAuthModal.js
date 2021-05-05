import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import { toast } from 'react-toastify';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask';
import { Checkbox, FormControl } from '@material-ui/core';
import attendee_capture from 'lib/fetchCalls/attendee_capture';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },

    '& .MuiTextField-root': {
      margin: '0.5rem',
      //   width: '25ch',
    },
  },
}));

const StyledForm = styled.form`
  &&.loading {
    opacity: 0.2;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  font-size: 1.25rem;
  text-align: center;
`;
export default function AttendeeAuthModal({
  open,
  callback,
  eventId,
  event_name,
  headerContent,
  otherFields = {},
}) {
  let init = {
    AttendeeFirst: {
      displayName: 'First Name',
      value: '',
      required: true,
    },
    AttendeeLast: {
      displayName: 'Last Name',
      value: '',
      required: true,
    },
    AttendeeEmail: {
      displayName: 'Email',
      value: '',
      required: true,
    },
    ...otherFields,
  };

  const classes = useStyles();
  const [formLoading, setFormLoading] = React.useState(false);

  const [formErrors, setFormErrors] = React.useState({
    showing: false,
    errors: [],
  });

  const [values, setValues] = React.useState(init);

  const handleClose = () => {
    toast.error('You must enter your information before joining.');
  };

  const zeroForm = () => {
    setValues(init);
  };

  const handleChange = (e) => {
    e.persist();
    const name = e.target.name;
    console.log(e.target);
    const prevValue = values[name];
    console.log(prevValue);
    setValues((prev) => ({
      ...prev,
      [name]: { ...prevValue, value: e.target.value },
    }));
  };

  const check_required = () => {
    let result = Object.keys(values).filter(
      (v) => values[v].value === '' && values[v].value.required
    );

    if (result.length > 0) {
      return false;
    }
    return true;
  };

  const handleSumbit = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    if (!check_required()) {
      setFormLoading(false);
      return toast.error('All fields are required!');
    }
    const send_values = {};

    Object.keys(values).map((v) => (send_values[v] = values[v].value));

    return await attendee_capture(send_values, eventId).then((res) => {
      if (res.error) {
        setFormLoading(false);
        return toast.error(res.error);
      } else {
        return callback(
          `Hello ${res.Attendee.AttendeeFirst}, welcome to ${
            event_name ? event_name : 'the event.'
          }`
        );
      }
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ fontSize: '3rem', textAlign: 'center', fontWeight: '600' }}
        >
          {headerContent && (
            <div
              style={{
                width: '70%',
                height: 'auto',
                margin: 'auto',
              }}
            >
              {headerContent}
            </div>
          )}
          Please Sign In To Enter
        </DialogTitle>
        {formErrors.showing
          ? formErrors.errors.map((err) => <Error>{err}</Error>)
          : ''}
        <DialogContent>
          <center>
            <DialogContentText>
              Please enter your information to proceed to the event.
            </DialogContentText>
            <StyledForm
              className={`${classes.root} ${formLoading ? 'loading' : false}`}
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {Object.keys(values).map((v) => (
                <TextField
                  key={`inputs--${v}`}
                  autoFocus
                  margin="normal"
                  id={v}
                  name={v}
                  label={values[v].displayName}
                  type="text"
                  // value={values[v].value}
                  onChange={handleChange}
                  required
                />
              ))}
            </StyledForm>
          </center>
        </DialogContent>

        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleSumbit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
