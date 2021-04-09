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
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '500px',
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
export default function AttendeeAuthModal({ open, callback, eventId }) {
  const init = {
    AttendeeFirst: '',
    AttendeeLast: '',
    AttendeeEmail: '',
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
    const name = e.target.name;
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const handleSumbit = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    if (
      values.AttendeeEmail === '' ||
      values.AttendeeFirst === '' ||
      values.AttendeeLast === ''
    ) {
      setFormLoading(false);
      return toast.error('All fields are required!');
    }
    return await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/attendee/capture/${eventId}`,
      {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(values),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          setFormLoading(false);
          return toast.error(res.error);
        } else {
          return callback(
            `Hello ${res.Attendee.AttendeeFirst}, welcome to ADS 2021 Sales Meeting!`
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
          Please Sign In To Enter
        </DialogTitle>
        {formErrors.showing
          ? formErrors.errors.map((err) => <Error>{err}</Error>)
          : ''}

        <DialogContent>
          <center>
            <DialogContentText>
              Please enter your information
              <br /> to proceed to the event.
            </DialogContentText>
            <StyledForm
              className={`${classes.root} ${formLoading ? 'loading' : false}`}
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextField
                autoFocus
                margin="normal"
                id="FirstName"
                name="AttendeeFirst"
                label="First Name"
                type="text"
                value={values.AttendeeFirst}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="normal"
                id="LastName"
                name="AttendeeLast"
                label="Last Name"
                type="text"
                value={values.AttendeeLast}
                onChange={handleChange}
                required
              />
              <TextField
                autoFocus
                margin="normal"
                id="email"
                name="AttendeeEmail"
                label="Email"
                type="text"
                value={values.AttendeeEmail}
                onChange={handleChange}
                required
              />
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
