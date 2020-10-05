/* eslint-disable no-use-before-define */
import React, {Fragment, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";

const Bigholder = styled.div`
  position: relative;
  width: 100%;
`
const CustomField = styled(TextField)`
  height: auto;
  width: 450px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50px);
`;

const Holder = styled.div`
  margin-bottom: 0px;
  left: 50%;
  transform: translate(-50%,50px);
  /* display: flex; */
  flex-direction: column;
  position: absolute;
  height: 300px;
  width: 100%;
  overflow-y: scroll;

`;

const Result = styled.li`
  border: 1px solid #cfcfcf;
  width: 450px;
  box-shadow: 0px 0px 4px 0px #cfcfcf;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f7f7f7;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  :hover {
    cursor: pointer;
    background-color: #f9f9f9;
    box-shadow:0px 0px 5px 1px #cfcfcf;
    transform: scale(1.01);
  }
  h3 {
    line-height: none;
    margin: 0;
  }
  hr{
    width: 50%;
    margin-left: 0;
  }
`;
export default function FreeSolo(props) {

  const [options, setOptions] = useState(false)
  const [value, filterValue] = useState('')
  const [eventFilter, updateFilter] = useState([])


  const handleChange = (e) => {
    filterValue(e.target.value)
    if(e.target.value !=""){ 
    updateFilter(props.events.filter((evs) => 
      evs.EventName.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      updateFilter([])
    }
  }
  return (
    <Bigholder>
      <CustomField
        label="Search Events"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
        onFocus={()=>{setOptions(true)}}
        onBlur={()=>{setOptions(false)}}
      />
      <Holder className={options ? "" : "hidden"}>
        <ul style={{ margin: 0, padding: 0 }}>
          {eventFilter.map((e) => {
            return (
              <Link href={`/${props.currenthref}/${e.slug}`}>
                <Result>
                  <Fragment>
                    <h3>{e.EventName}</h3>
                    <hr />
                    {e.EventName}
                  </Fragment>
                </Result>
              </Link>
            );
          })}
         
        </ul>
      </Holder>
    </Bigholder>
  );
}
