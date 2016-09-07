import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.object,
};

function App({ children }) {
  return (
    <div>
      <h1>Hello World</h1>
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
