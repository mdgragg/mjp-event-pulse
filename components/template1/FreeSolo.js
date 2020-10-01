/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Link from 'next/link'
import  styled  from 'styled-components';
export default function FreeSolo(props) {

const CustomField = styled(TextField)`
    height: auto;

`

const Holder = styled.div` 
  margin-bottom: 0px;
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  h1{
    margin-bottom: 20px;
  }
  
` 
  return (
    <Holder>
       <center> <h1>Search All Events:</h1></center>
      <Autocomplete
        freeSolo
        options={ Object.keys(props.events).map((event) => {
            const info = props.events[event];
            return info.slug
          })}
        renderInput={(params) => (
          <CustomField {...params} label="Search Events" margin="normal" variant="outlined" />
        )}
      />
     
    </Holder>
  );
}
