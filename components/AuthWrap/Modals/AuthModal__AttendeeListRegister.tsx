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
import softAuth from 'lib/fetchCalls/soft_auth';
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
import { check_required } from '.';

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

export default function AuthModal__AttendeeListRegister(props: AuthModalProps) {
  const {
    open,
    successCallback,
    eventToCheck,
    headerContent,
    signInText = null,
    otherFields = {},
  } = props;

  const handleClose = () => {
    toast.error('You must enter your information before joining.');
  };

  const classes = useStyles();
  const init = { ...default_fields, ...otherFields };
  const [values, setValues] = React.useState(init);

  const [formStatus, setFormStatus] = React.useState({
    loading: false,
    panel: 'signIn',
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.modal}
    >
      {
        {
          signIn: (
            <SignInModal
              eventToCheck={eventToCheck}
              headerContent={headerContent}
              handleChange={handleChange}
              signInText={signInText}
              classes={classes}
              formStatus={formStatus}
              setFormLoading={setFormLoading}
              successCallback={successCallback}
              notRegisteredCallback={() => {
                setFormPanel('register');
              }}
              values={values}
              setValues={setValues}
            />
          ),
          register: (
            <RegisterModal
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              onBack={() => setFormPanel('signIn')}
              handleRegister={() => setFormPanel('registerConfirm')}
            />
          ),
          registerConfirm: (
            <RegisterConfirm returnCallback={() => setFormPanel('signIn')} />
          ),
        }[formStatus.panel]
      }
    </Dialog>
  );
}

function SignInModal({
  setFormLoading,
  headerContent,
  handleChange,
  values,
  setValues,
  signInText,
  classes,
  formStatus,
  notRegisteredCallback,
  successCallback,
  eventToCheck,
}) {
  const handleSubmit = async (e) => {
    setFormLoading(true);
    e.preventDefault();
    if (!check_required(values)) {
      setFormLoading(false);
      return toast.error('All fields are required!');
    }
    const send_values = {};

    Object.keys(values).map((v) => (send_values[v] = values[v].value));

    return await softAuth(send_values, eventToCheck.id)
      .then((res) => {
        return successCallback(res);
      })
      .catch((err) => {
        if (err === 'You are not authorized for this event') {
          return notRegisteredCallback();
        } else {
          return toast.error(err);
        }
      })
      .finally(() => {
        setFormLoading(false);
      });
  };
  return (
    <>
      <StyledDialogTitle id="form-dialog-title" className={classes.title}>
        {headerContent && <HeaderWrap>{headerContent}</HeaderWrap>}
        Register For The Event
      </StyledDialogTitle>
      <DialogContent>
        <Center>
          <DialogContentText>
            {signInText
              ? signInText
              : 'Please enter your information register for the event'}
          </DialogContentText>
          <StyledForm
            className={`${classes.form} ${
              formStatus.loading ? 'loading' : false
            }`}
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
        <Button__Primary onClick={handleSubmit}> Submit </Button__Primary>
      </DialogActions>
    </>
  );
}

function RegisterModal({
  values,
  setValues,
  handleChange,
  handleRegister,
  onBack,
}) {
  const classes = useStyles();
  return (
    <>
      <StyledDialogTitle id="form-dialog-title" className={classes.title}>
        Register For the Event
      </StyledDialogTitle>
      <DialogContent>
        <Center>
          <DialogErrorText>
            Uh oh! It doesn't look like you aren't registered for this event.
            <br />
            Please register first.
          </DialogErrorText>
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
        <Button__Primary onClick={onBack}>Back</Button__Primary>
        <Button__Primary onClick={handleRegister}> Register</Button__Primary>
      </StyledDialogActions>
    </>
  );
}

function RegisterConfirm({ returnCallback }) {
  const classes = useStyles();
  return (
    <>
      <StyledDialogTitle id="form-dialog-title" className={classes.title}>
        Register For the Event
      </StyledDialogTitle>
      <DialogContent>
        <Center>
          An admin has been alerted that you'd like to register for the event!
          Please check your emails for a confirmation, then you can login again.
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
