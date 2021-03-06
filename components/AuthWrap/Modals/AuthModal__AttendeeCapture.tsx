import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Center from 'components/Center';

import { toast } from 'react-toastify';

import attendee_capture from 'lib/fetchCalls/attendee_capture';
import { AuthModalProps } from '../AuthWrap__Types';
import {
  HeaderWrap,
  StyledDialogTitle,
  StyledForm,
  ModalWrap,
  useStyles,
} from './AuthModal__Styles';
import { Button__Primary } from 'components/Buttons';
import { check_required } from '.';
import { Typography } from '@material-ui/core';

export default function AuthModal__AttendeeCapture({
  open,
  successCallback,
  title,
  eventToCheck,
  signInText = null,
  otherFields = {},
  headerContent,
}: AuthModalProps) {
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
      .then((res) => successCallback(res))
      .catch((err) => {
        toast.error(err);
        setFormLoading(false);
      });
  };

  return (
    <ModalWrap>
      <Dialog
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {headerContent && headerContent}
        <StyledDialogTitle id="form-dialog-title">
          {title ? (
            <HeaderWrap>{title}</HeaderWrap>
          ) : (
            <div>
              <div>Please Tell Us About Yourself</div>
              <Typography variant={`overline`}>
                {eventToCheck.EventName}
              </Typography>
            </div>
          )}
        </StyledDialogTitle>

        <DialogContent>
          <Center>
            <DialogContentText className={classes.contentText}>
              {signInText && signInText}
            </DialogContentText>
            <StyledForm
              className={`${classes.form} ${formLoading ? 'loading' : false}`}
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
                  onChange={handleChange}
                  required={values[v].required}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSumbit(e);
                    }
                  }}
                />
              ))}
            </StyledForm>
          </Center>
        </DialogContent>

        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button__Primary onClick={handleSumbit}>Submit</Button__Primary>
        </DialogActions>
      </Dialog>
    </ModalWrap>
  );
}
