import React from 'react';
import { Button__Primary } from 'components/Buttons';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export default function ExternalLink({ open, setOpen, goToLink, link }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (link.allowed) {
      return goToLink();
    }
    toast.error(link.errorText || 'This link is not allowed');
    return handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        style={{ fontSize: '3rem', textAlign: 'center', fontWeight: '600' }}
      >
        External Event Link
      </DialogTitle>

      <DialogContent>
        <center>
          <DialogContentText>
            This will take you an external event.
            <br /> Please press enter to continue.
          </DialogContentText>
        </center>
      </DialogContent>

      <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button__Primary onClick={handleClose} color="primary">
          Cancel
        </Button__Primary>

        <Button__Primary onClick={handleSumbit} color="primary">
          Enter
        </Button__Primary>
      </DialogActions>
    </Dialog>
  );
}
