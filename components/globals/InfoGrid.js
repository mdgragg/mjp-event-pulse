import { Grid } from '@material-ui/core';
import styled from 'styled-components';
const InfoGridDiv = styled.div`
  margin: auto;
  max-width: 500px;
`;
export function InfoGrid() {
  return (
    <InfoGridDiv>
      <h4>Streaming Support Information</h4>
      <p>
        Event pages work on most major browsers on Windows and macOS. We
        recommend using Google Chrome, Mozilla Firefox, or Safari when viewing a
        stream from your computer. It’s best to update your browser whenever
        possible.
      </p>
      <p>
        Live video streamed is also viewable on most iOS and Android mobile
        browsers. When you arrive at the event page, click the play button on
        the player in the browser to open the live player. The same applies to
        any event whose live player is embedded on a different website.
      </p>
      <p>
        <h4>System Requirements: </h4>
        <ul>
          <li>Windows 7 or higher</li>
          <li> Mac OS X 10.6 or higher </li>
        </ul>
        <h4> Supported desktop browsers: </h4>
        <ul>
          <li> Google Chrome 45+</li>
          <li> Mozilla Firefox 49+</li>
          <li> Safari 10+</li>
          <li> Microsoft Edge 15+</li>
          <li style={{ color: 'red' }}>
            {' '}
            We cannot guarantee performance on
            <strong> Internet Explorer</strong> we highly suggest you use a
            different browser.
          </li>
        </ul>
        <h4> Supported mobile browsers: </h4>
        <ul>
          <li>Chrome 45+ </li>
          <li> Safari 10+ (iOS) </li>
        </ul>
        Internet Connection: 5-10mbps download speed is recommended. Check your
        connection at <a href="https://www.speedtest.net">www.speedtest.net</a>.
      </p>
    </InfoGridDiv>
  );
}
