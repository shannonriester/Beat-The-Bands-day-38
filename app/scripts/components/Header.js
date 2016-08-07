import React from 'react';

import store from '../store';
import Nav from './Nav';

const Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <h2>BEAT the Bands</h2>
        <Nav />
      </div>
    );
  }
});

export default Header;
