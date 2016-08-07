import React from 'react';

import store from '../store';
import Nav from './Nav';

const Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <Nav />
      </div>
    );
  }
});

export default Header;
