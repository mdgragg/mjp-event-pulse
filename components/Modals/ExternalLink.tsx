import React from 'react';
import { Button__Primary, Button__Secondary } from 'components/Buttons';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { ExternalLink__Type } from 'types/Link__Types';
import Center from 'components/Center';

export declare type ExternalLink__Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  link: ExternalLink__Type;
};

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      padding: ' 2rem',
      minHeight: '350px',
    },
  },
});

export default function ExternalLink({
  open,
  setOpen,
  link,
}: ExternalLink__Props) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (link.allowed) {
      return (window.location.href = link.href);
    }
    toast.error(link.errorText || 'This link is not allowed');
    return handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle
        id="form-dialog-title"
        style={{ fontSize: '3rem', textAlign: 'center', fontWeight: 600 }}
      >
        External Event Link
      </DialogTitle>

      <DialogContent>
        <Center>
          <DialogContentText>
            This will take you an external event.
            <br /> Please press enter to continue.
          </DialogContentText>
        </Center>
      </DialogContent>

      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button__Secondary onClick={handleClose} color="primary">
          Cancel
        </Button__Secondary>

        <Button__Secondary onClick={handleSumbit} color="primary">
          Enter
        </Button__Secondary>
      </DialogActions>
    </Dialog>
  );
}
