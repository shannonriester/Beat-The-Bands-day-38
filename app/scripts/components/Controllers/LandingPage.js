import React from 'react';
import {Router, hashHistory} from 'react-router';
import $ from 'jquery';

import Search from '../Search';

const LandingPage = React.createClass({
  render: function() {
    return (
      <div className="landingPage search-container">
        <Search />
      </div>
    );
  }
});

export default LandingPage;
