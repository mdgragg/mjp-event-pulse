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
import { attendee_register } from 'lib/fetchCalls/attendee_register';
import { AuthModalProps } from '../AuthWrap__Types';
import {
  DialogErrorText,
  HeaderWrap,
  StyledDialogActions,
  StyledDialogTitle,
} from './AuthModal__Styles';
import { useStyles, StyledForm } from './AuthModal__Styles';
import Center from 'components/Center';
import { Button__Primary } from 'components/Buttons';
import { BoxedCounter } from 'components/Counters';
import { check_required } from '.';
import { Typography } from '@material-ui/core';
import { Email } from 'types/AttendeeCapture';

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

declare interface AuthModalRegisterProps extends AuthModalProps {
  emailOptions: Email;
}

export default function AuthModal__Register(props: AuthModalRegisterProps) {
  const {
    open,
    successCallback,
    eventToCheck,
    headerContent,
    signInText = null,
    otherFields = {},
    emailOptions,
  } = props;

  const handleClose = () => {
    if (formStatus.panel === 'register') {
      return toast.error('You must enter your information before joining.');
    } else {
      return toast.error("You are registered but the event hasn't started yet");
    }
  };

  const classes = useStyles();
  const init = { ...default_fields, ...otherFields };
  const [values, setValues] = React.useState(init);

  const [formStatus, setFormStatus] = React.useState({
    loading: false,
    panel: 'register',
  });

  const setFormLoading = (value) => {
    setFormStatus((prev) => ({ ...prev, loading: value }));
  };

  const setFormPanel = (value) => {
    setFormStatus((prev) => ({ ...prev, panel: value }));
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

  const handleSubmit = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    if (!check_required(values)) {
      setFormLoading(false);
      return toast.error('All fields are required!');
    }
    const send_values = {};

    Object.keys(values).map((v) => (send_values[v] = values[v].value));

    return await attendee_register(
      {
        ...send_values,
        ...emailOptions,
      },
      eventToCheck.id
    )
      .then((res) => {
        const { AttendeeFirst, AttendeeLast } = res.message.Attendee;
        setValues((prev) => ({ ...prev, AttendeeFirst, AttendeeLast }));
        setFormLoading(false);
        setFormPanel('registerConfirm');
      })
      .catch((err) => {
        toast.error(err);
        setFormLoading(false);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.modal}
    >
      {headerContent && headerContent}
      {
        {
          register: (
            <RegisterModal
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleRegister={handleSubmit}
              eventToCheck={eventToCheck}
            />
          ),
          registerConfirm: (
            <RegisterConfirm
              values={values}
              eventToCheck={eventToCheck}
              returnCallback={() => setFormPanel('register')}
            />
          ),
        }[formStatus.panel]
      }
    </Dialog>
  );
}

function RegisterModal({
  values,
  setValues,
  handleChange,
  handleRegister,
  eventToCheck,
}) {
  const classes = useStyles();
  return (
    <>
      <StyledDialogTitle id="form-dialog-title" className={classes.title}>
        Register For the Event <br />
        <Typography variant={`overline`}>{eventToCheck.EventName}</Typography>
      </StyledDialogTitle>
      <DialogContent>
        <Center>
          <StyledForm
            className={classes.form}
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
      <StyledDialogActions>
        <Button__Primary onClick={handleRegister}>Register</Button__Primary>
      </StyledDialogActions>
    </>
  );
}

function RegisterConfirm({ returnCallback, eventToCheck, values }) {
  const classes = useStyles();
  return (
    <>
      <StyledDialogTitle id="form-dialog-title" className={classes.title}>
        Registration Confirmed!
      </StyledDialogTitle>
      {values && (
        <Center>
          <Typography variant={`overline`}>
            Thank You{' '}
            <strong>
              {' '}
              {values.AttendeeFirst} {values.AttendeeLast}{' '}
            </strong>
          </Typography>
        </Center>
      )}
      <DialogContent>
        <Center>
          Please check your email inbox for a confirmation. <br /> When the
          event starts, you can return back to this page and log in.
          <div style={{ margin: '2rem 0' }}>
            <h3>Please Check Back In </h3>
            <BoxedCounter event={eventToCheck} />
          </div>
        </Center>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button__Primary onClick={returnCallback}>
          Return To Register
        </Button__Primary>
      </DialogActions>
    </>
  );
}
