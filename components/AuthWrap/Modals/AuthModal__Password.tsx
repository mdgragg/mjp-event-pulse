import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Center from 'components/Center';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import attendee_password from 'lib/fetchCalls/attendee_password';
import { AuthModalProps } from '../AuthWrap__Types';

import {
  Error,
  useStyles,
  StyledForm,
  HeaderWrap,
  StyledDialogTitle,
} from './AuthModal__Styles';
import { Button__Primary } from 'components/Buttons';

export default function AuthModal__Password({
  open,
  eventToCheck,
  successCallback,
  headerContent,
  signInText,
  otherFields,
}: AuthModalProps) {
  const init = {
    pw: '',
  };
  const classes = useStyles();
  const [formLoading, setFormLoading] = React.useState(false);

  const [formErrors, setFormErrors] = React.useState({
    showing: false,
    errors: [],
  });

  const [values, setValues] = React.useState({ ...init });

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

  const handleSumbit = async () => {
    setFormLoading(true);
    // e.preventDefault();
    if (values.pw === '') {
      setFormLoading(false);
      return toast.error('You must provide a password!');
    }
    return await attendee_password(values, eventToCheck.id)
      .then((res) => {
        return successCallback(res);
      })
      .catch((err) => {
        setFormLoading(false);
        zeroForm();
        toast.error(err);
        return console.log('err: ', err);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {headerContent && <HeaderWrap>{headerContent}</HeaderWrap>}
        <StyledDialogTitle id="form-dialog-title">
          Please Provide a Password
        </StyledDialogTitle>
        {formErrors.showing
          ? formErrors.errors.map((err) => <Error>{err}</Error>)
          : ''}

        <DialogContent>
          <Center>
            {signInText ? (
              signInText
            ) : (
              <DialogContentText>
                This event requires a
                <br /> password to enter.
              </DialogContentText>
            )}
            <StyledForm
              className={`${classes.form} ${formLoading ? 'loading' : false}`}
              noValidate
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSumbit();
                }
              }}
            >
              <TextField
                autoFocus
                style={{ textAlign: 'center' }}
                margin="normal"
                id="password"
                name="pw"
                label="Password"
                type="password"
                value={values.pw}
                onChange={handleChange}
                required
              />
            </StyledForm>
          </Center>
        </DialogContent>

        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button__Primary onClick={handleSumbit}>Submit</Button__Primary>
        </DialogActions>
      </Dialog>
    </div>
  );
}
