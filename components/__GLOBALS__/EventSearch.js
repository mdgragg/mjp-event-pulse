import FreeSolo from "./FreeSolo"
import  styled  from 'styled-components';
const EventSearchWrap = styled.div` 

    width: 100%;
    height: 350px;
    margin-top: 100px;
    justify-content: center;
    align-items: center;

`;


const EventResults = styled.div`
    background-color: black;
    color: black;
    height: 100%;
` 

const EventSearch = (props) => {
    return(
        <EventSearchWrap>
            <FreeSolo events={props.events}/>
        </EventSearchWrap>
    )
}

export default EventSearch;