import { createGlobalStyle} from 'styled-components'
export const GlobalStyle = createGlobalStyle`
  
    html{
        box-sizing: border-box;
        font-size: 16px !important;
        margin: 0;
        padding: 0;
    }
    *, *:before, *:after{
        box-sizing: inherit;
    }
    body{
        padding: 0;
        margin: 0;
        line-height: 2;
        font-family: Roboto, sans-serif;
        /* font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */

    }
    h1{
      margin: 0;
      padding: 0;
    }

    /* p {
        font-family: 'Roboto' sans-serif;
        font-weight: light;
    } */
    .MuiTypography-body2{
        font-family: Roboto, sans-serif;
    }
    `;