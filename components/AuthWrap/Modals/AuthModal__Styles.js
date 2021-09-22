import styled from 'styled-components';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

export const ModalWrap = styled.div``;

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  margin: 0;
  padding: 1rem 0 0 0;
`;
const HeaderWrap = styled.div`
  width: 70%;
  height: auto;
  margin: auto;
  text-align: center;
  @media all and (max-width: 768px) {
    width: 95%;
  }
`;

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

const useStyles = makeStyles((theme) => ({
  modal: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '350px',
    },
    '& .MuiDialogContent-root div': {
      maxWidth: '350px',
    },
    '& .MuiDialogActions-root': {
      padding: '2rem 8px',
      [theme.breakpoints.down('md')]: {
        padding: '0.5rem 8px',
      },
    },
  },
  form: {
    '& > *': {
      margin: '1% 0',
      width: '100%',
    },
    '& .MuiTextField-root': {
      margin: '2% 0',

      [theme.breakpoints.down('md')]: {
        margin: '0.25rem 0',
      },
    },
    '& .MuiInput-root input': {
      textAlign: 'center',
      fontSize: '1.5rem',
    },
  },
  contentText: {
    margin: '2rem 2%',
    textAlign: 'left',
    maxWidth: '350px',
    [theme.breakpoints.down('md')]: {
      margin: '1% 0',
      fontSize: '0.85rem',
      '& p': {
        margin: '1% 0',
        fontSize: '0.85rem',
      },
    },
  },
}));

export { Error, useStyles, StyledForm, HeaderWrap, StyledDialogTitle };
