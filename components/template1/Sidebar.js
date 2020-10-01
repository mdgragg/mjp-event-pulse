import styled from 'styled-components'
import {Grid, Card, AppHeader, AppBar, Toolbar, Typography} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SimpleTabs from './Tabs'

const StyleSimpleTabs = styled.div`
height: ${props => props.theme.sidebarHeight};
width: 100%;
`;

const StyledAppBar = styled(AppBar)`

`

export default function Sidebar(props) {
    return(
        <Card > 
        <StyleSimpleTabs>
            <SimpleTabs/>
            </StyleSimpleTabs>       
        </Card>
    )
}

