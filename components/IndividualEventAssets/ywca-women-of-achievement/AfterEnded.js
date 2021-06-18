import React from 'react';

const AfterEnded = () => {
  return (
    <div
      style={{
        width: '80%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
      }}
    >
      <div>
        <h3>Thanks for Attending!</h3>
        <p style={{ textAlign: 'center', margin: '2rem auto' }}>
          This event has ended, but we appreciate your input. <br /> please fill
          out the survey below to help us improve.
        </p>
        <button>Fill Out The Survey</button>
      </div>
    </div>
  );
};

export default AfterEnded;
