import FreeSolo from "./subEventSearch/FreeSolo"
import  styled  from 'styled-components';
const EventSearchWrap = styled.div` 
    display: grid;
    width: 100%;
    height: 450px;
    grid-template-columns: 100%;
    column-gap: 2em;
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
            <FreeSolo currenthref={props.currenthref} events={props.events}/>
        </EventSearchWrap>
    )
}

export default EventSearch;