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
import attendee_capture from 'lib/fetchCalls/soft_auth';
import { AuthModalProps } from '../AuthWrap__Types';
import { HeaderWrap, StyledDialogTitle } from './AuthModal__Styles';
import { useStyles, StyledForm } from './AuthModal__Styles';
import Center from 'components/Center';
import { check_required } from '.';
import { Button__Primary } from 'components/Buttons';

const default_fields = {
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
};

export default function AuthModal__AttendeeList({
  open,
  successCallback,
  eventToCheck,
  headerContent,
  signInText = null,
  otherFields = {},
}: AuthModalProps) {
  let init = {
    ...default_fields,
    ...otherFields,
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

  const handleSumbit = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    if (!check_required(values)) {
      setFormLoading(false);
      return toast.error('All fields are required!');
    }
    const send_values = {};

    Object.keys(values).map((v) => (send_values[v] = values[v].value));

    return await attendee_capture(send_values, eventToCheck.id)
      .then((res) => {
        return successCallback(res);
      })
      .catch((err) => {
        setFormLoading(false);
        return toast.error(err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.modal}
    >
      <StyledDialogTitle id="form-dialog-title">
        {headerContent && <HeaderWrap>{headerContent}</HeaderWrap>}
        Please Sign In To Enter
      </StyledDialogTitle>
      <DialogContent className={classes.contentText}>
        <Center>
          <DialogContentText>
            {signInText
              ? signInText
              : 'Please enter your information to proceed to the event'}
          </DialogContentText>
          <StyledForm
            className={`${classes.form} ${formLoading ? 'loading' : false}`}
            noValidate
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
                value={values[v].value}
                type="text"
                onChange={handleChange}
                required={values[v].required}
              />
            ))}
          </StyledForm>
        </Center>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button__Primary onClick={handleSumbit} color="primary">
          Submit
        </Button__Primary>
      </DialogActions>
    </Dialog>
  );
}
