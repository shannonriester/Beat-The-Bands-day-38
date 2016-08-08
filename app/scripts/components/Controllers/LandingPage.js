import React from 'react';
import {Router, hashHistory} from 'react-router';
import $ from 'jquery';

import Header from '../Header';
import Search from '../Search';

const LandingPage = React.createClass({
  render: function() {
    return (
      <div className="landingPage search-container">
        <Header />
        <Search />
      </div>
    );
  }
});

export default LandingPage;
