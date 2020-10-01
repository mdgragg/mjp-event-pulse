import { createGlobalStyle} from 'styled-components'
export const GlobalStyle = createGlobalStyle`
    html{
        box-sizing: border-box;
        font-size: 12px;
        margin: 0;
        padding: 0;
    }
    *, *:before, *:after{
        box-sizing: inherit;
    }
    body{
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        font-family: sans-serif;

    }
    h1{
      margin: 0;
      padding: 0;
    }
    `;