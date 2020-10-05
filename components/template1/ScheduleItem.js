import React from 'react';
import styled from 'styled-components'
import {Card} from '@material-ui/core';


const MyHeader = styled.div` 
padding: 0.3em;
background-color: deepskyblue;

color: white;

h4{
    margin: 0;
}
`;

const ScheduleBody = styled.div` 
    .schedule-item--date{
        margin: 0;
        font-size: 0.85em;
        display: inline;
        ::after{
            content: " | ";
            margin-left: 5px;
            margin-right: 5px;
        }
    }
    .schedule-item--time{
        margin: 0;
        font-weight: lighter;
        font-size: 0.85em;
        display: inline;
    }
    p{
        margin: 0;
        margin-top: 0.5em;
        font-size: 0.75em;
    }
`;

const Hr = styled.hr` 
    width: 100%;
    margin: 0;
`

const ScheduleItem = (props) => {
    return (
        <Card style={{margin: "1em"}}>
            <MyHeader>
            <h4>Observation of the Second Event</h4>
            </MyHeader>
            
            <ScheduleBody style={{padding: "0.5em"}}> 
           
            <h4 className="schedule-item--date">Tue 10/6</h4>
            <h4 className="schedule-item--time">4:40am - 5:45pm</h4>
         
            <p>Observation of the Second Event will be covered here if we have details for the event.</p>
            </ScheduleBody>
        </Card>
    );
};


export default ScheduleItem;