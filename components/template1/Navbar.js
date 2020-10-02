import  styled  from "styled-components";
import { Button } from '@material-ui/core'


const StyledNav = styled.div` 
width: 100%;
background-color: '#FFFFFF';
display: flex;
z-index: 100;
padding: 2em;
Button:last-of-type{
  background-color: ${props => props.theme.cta};
  position: absolute;
  right: 2em;
}
`;

const MyButton = styled(Button)`
    background-color: rgba(255,255,255,0.05);
    color: white;
    text-align: center;
    &&:hover{
        background-color: ${props => props.theme.secondary};
    }
    /* margin-right: 2em; */
    min-width: 150px;
    max-width: 150px;
    /* overflow-x: hidden; */
    line-break: none;
    margin-left: 10px;
    margin-right: 10px;

    
`



const Navbar = (props) => {

    return(
        <StyledNav>
          
            <MyButton>
            {!props.info.client ? "No Client Yet" : props.info.client.ClientName}
            </MyButton>
            <MyButton>
                Another
            </MyButton>
            <MyButton>
                Third
            </MyButton>

        </StyledNav>
    )
}

export default Navbar;