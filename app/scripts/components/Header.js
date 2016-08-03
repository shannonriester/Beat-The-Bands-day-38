import React from 'react';

import Nav from './Nav';

const Header = React.createClass({
  render: function() {
    return (
      <div id="Header">
      Here's the header a-whahoooo
        <Nav/>

      </div>
    );
  }
});

export default Header;
