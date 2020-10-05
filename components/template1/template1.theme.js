import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


const template1Theme = {
    pfont: "Roboto",
    cta: "tomato",
    fontColor: "#181818",
    headerBg: "rgba(0,0,0,1)",
    bg: "#F7F7F7",
    footerBg: "black",
    headerHeight: "65px",
    heroHeight: "600px",
    videoBoxHeight: "600px",
    primary: "#181818",
    secondary: "#006AC1",
    sidebarHeight: "600px",
    hover: "#BADA55",
    videoBreakPoint: 1330,
    ...createMuiTheme()
}


export { template1Theme }