import React from 'react';
import PropTypes from 'prop-types';

const _error = (props) => {
  return (
    <div>
      <h1>Error,</h1>
    </div>
  );
};

_error.propTypes = {};

export default _error;

export async function getInitialProps(ctx) {
  console.log(ctx);
}
