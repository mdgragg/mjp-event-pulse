import React from 'react'
import { Button__Primary, Button__Secondary } from 'components/Buttons'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'
import { ExternalLink__Type } from 'types/Link__Types'
import Center from 'components/Center'

export declare type ExternalLink__Props = {
  open: boolean
  setOpen: (value: boolean) => void
  link: ExternalLink__Type
}

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      minHeight: '350px',
    },
  },
  actions: {
    '&  > button': {
      width: '40%',
    },
  },
})

export default function ExternalLink({
  open,
  setOpen,
  link,
}: ExternalLink__Props) {
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (typeof link === 'string') {
      return window.open(
        link,
        '_blank',
        'menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes, height=350, width=350'
      )
    }
    if (link.allowed) {
      if (link.newWindow) {
        return window.open(
          link.href,
          '_blank',
          `menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes, height=400, width=350`
        )
      } else {
        return (window.location.href = link.href)
      }
    }
    toast.error(link.errorText || 'This link is not allowed')
    return handleClose()
  }

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

      <DialogActions
        style={{ display: 'flex', justifyContent: 'center' }}
        className={classes.actions}
      >
        <Button__Secondary onClick={handleClose}>Cancel</Button__Secondary>

        <Button__Secondary onClick={handleSubmit}>Enter</Button__Secondary>
      </DialogActions>
    </Dialog>
  )
}
