import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
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

export default function FormDialog({ endpoint }) {
  const init = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    pledgeAmount: '',
    company: '',
    anonymous: false,
    message: '',
  };
  const classes = useStyles();
  const [formLoading, setFormLoading] = React.useState(false);
  const [values, setValues] = React.useState(init);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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

  const setAnonymous = (v) => {
    setValues({
      ...values,
      anonymous: v,
    });
  };

  const handleSumbit = async () => {
    setFormLoading(true);
    const submit_id = Date.now();
    console.log(values);

    const body = {
      sentAt: new Date(),
      event: 'Fund a Scientist',
      data: {
        id: submit_id,
        anonymous: values.anonymous,
        supporter: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phoneNumber,
        },
        companyMatch: {
          companyName: values.company,
        },
        transaction: {
          amount: parseFloat(values.pledgeAmount),
        },
        dedication: {
          message: values.message,
        },
        pledge: true,

        form: {
          id: 15124,
          name: 'Custom Pledge Form',
        },
      },
    };

    return await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        zeroForm();
        setFormLoading(false);
        handleClose();
      });
  };

  return (
    <div>
      <span
        style={{ display: 'inline', fontWeight: '600', cursor: 'pointer' }}
        onClick={handleClickOpen}
      >
        Click here.
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ fontSize: '3rem', textAlign: 'center', fontWeight: '600' }}
        >
          Make Your Pledge
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will contact you after the event for further details. Your email
            will not be made public.
          </DialogContentText>
          <StyledForm
            className={`${classes.root} ${formLoading ? 'loading' : false}`}
            noValidate
            autoComplete="off"
          >
            <TextField
              autoFocus
              margin="normal"
              id="name"
              name="firstName"
              label="First Name"
              type="text"
              value={values.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="lastName"
              label="Last Name"
              type="test"
              value={values.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="email"
              label="Email Address"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              name="company"
              label="Company"
              type="text"
              value={values.company}
              onChange={handleChange}
            />

            <FormControl>
              <InputLabel htmlFor="formatted-text-mask-input">
                Phone Number
              </InputLabel>
              <Input
                value={values.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
            <TextField
              value={values.pledgeAmount}
              onChange={handleChange}
              name="pledgeAmount"
              label="Pledge Amount"
              fullWidth
              style={{ width: '90%' }}
              id="pledgeAmount"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <InputLabel htmlFor="anonymous">
              I want my pledge to be anonymous
              <Checkbox
                label="Anonymous"
                id="anonymous"
                checked={values.anonymous}
                onChange={() => setAnonymous(!values.anonymous)}
              />
            </InputLabel>

            <TextField
              label="Message or Dedication: (not required)"
              multiline
              rows={4}
              value={values.message}
              name="message"
              onChange={handleChange}
              style={{ width: '90%' }}
            />
          </StyledForm>
          <DialogContentText style={{ textAlign: 'center', marginTop: '2rem' }}>
            Need help with making your gift or pledge? <br />
            Call or text Nancy at (323) 679-3797
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSumbit} color="primary">
            Pledge Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={null}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
