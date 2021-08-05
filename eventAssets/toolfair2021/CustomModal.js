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
  header: {
    '.MuiDialogContent-root  p': {
      maxWidth: '80%',
    },
  },
}));

const StyledForm = styled.form`
  &&.loading {
    opacity: 0.2;
  }
`;

export default function AttendeeAuthModal({
  open,
  callback,
  event_meta,
  headerContent,
  signInText = null,
  fields = {},
  overrideFields = {},
}) {
  let init = {
    ...fields,
  };

  const classes = useStyles();
  const [formLoading, setFormLoading] = React.useState(false);

  const [values, setValues] = React.useState(init);

  const handleClose = () => {
    toast.error('You must enter your information before joining.');
  };

  const handleChange = (e) => {
    e.persist();
    const name = e.target.name;

    const prevValue = values[name];

    setValues((prev) => ({
      ...prev,
      [name]: { ...prevValue, value: e.target.value },
    }));
  };

  const check_required = () => {
    let result = Object.keys(values).filter(
      (v) => values[v].value === '' && values[v].required
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
    send_values.AttendeeEmail =
      send_values.Company.replace(/\s/g, '__') + '@toolfair2021.com';
    return await attendee_capture(send_values, event_meta.id)
      .then((res) => {
        if (res.error) {
          setFormLoading(false);
          return toast.error(res.error);
        } else {
          return callback(res);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
        return toast.error(err);
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

        <DialogContent className={`${classes.header}`}>
          <center>
            {signInText ? (
              signInText
            ) : (
              <DialogContentText>
                Please enter your information to proceed to the event.
              </DialogContentText>
            )}

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
                  required={values[v].required}
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
