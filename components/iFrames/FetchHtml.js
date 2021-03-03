import React from 'react';
import PropTypes from 'prop-types';

const FetchHtml = ({ endpoint }) => {
  const [text, setText] = React.useState(null);
  React.useEffect(() => {
    async function getData() {
      fetch(endpoint, {
        mode: 'no-cors',
      })
        .then((res) => {
          res.text();
          console.log(res);
        })
        .then((res) => {
          console.log(res);
          setText(res);
        });
    }
    getData();
  }, []);

  return text ? (
    <div dangerouslySetInnerHTML={{ __html: text }}></div>
  ) : (
    <> Nothing Here </>
  );
};

FetchHtml.propTypes = {};

export default FetchHtml;
