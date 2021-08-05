import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TheTable = styled.div`
  min-height: ${(props) => props.length * 10}vh;
  && .single-table-item {
    padding: 10px;
    font-size: 1.25rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  && .single-table-item:nth-child(odd) {
    background-color: lightgrey;
  }

  width: 75%;
  margin: auto;

  && .amount {
    text-align: right;
    margin-right: 20px;
    font-weight: 800;
  }
`;
const NameTable = ({ data }) => {
  return (
    <TheTable length={data.names?.length || 3}>
      {data.names.map((obj) => (
        <div className="single-table-item">
          <div>{obj['First Name']} </div>
          <div>{obj['Last Name']} </div>

          {/* <div className="amount">{obj.Amount} </div> */}
        </div>
      ))}{' '}
    </TheTable>
  );
};

NameTable.propTypes = {};

export default NameTable;
