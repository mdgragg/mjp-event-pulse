import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import attendee_password from 'lib/fetchCalls/attendee_password';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '350px',
    },

    '& .MuiTextField-root': {
      margin: '0.5rem',

      //   width: '25ch',
    },
    '& .MuiInput-root input': {
      textAlign: 'center',
      fontSize: '2rem',
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
}) {
  const init = {
    password: '',
  };
  const classes = useStyles();
  const [formLoading, setFormLoading] = React.useState(false);

  const [formErrors, setFormErrors] = React.useState({
    showing: false,
    errors: [],
  });

  const [values, setValues] = React.useState(init);

  const handleClose = () => {
    toast.error('You must provide a password before joining.');
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
    if (values.password === '') {
      setFormLoading(false);
      return toast.error('You must provide a password!');
    }
    return await attendee_password(values, eventId).then((res) => {
      if (res.error) {
        setFormLoading(false);
        return toast.error(res.error);
      } else {
        return callback(
          `Hello, welcome to ${event_name ? event_name : 'the event.'}`
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
          Please Provide a Password
        </DialogTitle>
        {formErrors.showing
          ? formErrors.errors.map((err) => <Error>{err}</Error>)
          : ''}

        <DialogContent>
          <center>
            <DialogContentText>
              This event requires a
              <br /> password to enter.
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
                style={{ textAlign: 'center' }}
                margin="normal"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
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
