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
export default function FormDialog({ open, setOpen, password, goToLink }) {
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
    zeroForm();
    setOpen(false);
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
    e.preventDefault();
    if (values.password === password) {
      return goToLink();
    }
    return toast.error('wrong password!');
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
          Password Protected Event
        </DialogTitle>
        {formErrors.showing ? (
          <Error>Incorrect password, please try again.</Error>
        ) : (
          ''
        )}

        <DialogContent>
          <center>
            <DialogContentText>
              This event requires a password. Please enter the password to
              continue.
            </DialogContentText>
            <StyledForm
              className={`${classes.root} ${formLoading ? 'loading' : false}`}
              noValidate
              autoComplete="off"
            >
              <TextField
                autoFocus
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSumbit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
