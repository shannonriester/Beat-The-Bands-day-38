import React from 'react';

import store from '../store';
import Nav from './Nav';

const Header = React.createClass({
  render: function() {
    return (
      <div id="header">
        <Nav/>
      </div>
    );
  }
});

export default Header;
