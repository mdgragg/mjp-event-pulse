import styled from 'styled-components';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';
const StyledDialogTitle = styled(DialogTitle)`
  font-size: 3rem;
  text-align: center;
  font-weight: 600;
`;
const HeaderWrap = styled.div`
  width: 70%;
  height: auto;
  margin: auto;
  text-align: center;
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
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '350px',
    },

    '& .MuiTextField-root': {
      margin: '0.5rem',

      //   width: '25ch',
    },
    '& .MuiInput-root input': {
      textAlign: 'center',
      fontSize: '2rem',
    },
  },
}));

export { Error, useStyles, StyledForm, HeaderWrap, StyledDialogTitle };
