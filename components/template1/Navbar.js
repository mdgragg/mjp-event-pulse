import  styled  from "styled-components";
import { Button } from '@material-ui/core'


const StyledNav = styled.div` 
width: 50%;
background-color: '#FFFFFF';
display: flex;
z-index: 100;

`;

const MyButton = styled(Button)`
    background-color: red;
    &&:hover{
        background-color: blue;
    }
    margin-right: 2em;
    min-width: 100px;
    max-width: 100px;
    overflow-x: hidden;
    line-break: none;
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