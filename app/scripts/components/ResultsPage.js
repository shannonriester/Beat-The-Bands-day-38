import React from 'react';

import Search from './Search';
import Results from './Results';

const ResultsPage = React.createClass({
  // console.log(this.props);
  render: function() {
    return (
      <div className="ResultsPage">
        {this.props.children}
        <Search />
        <Results />
      </div>
    );
  }
});

export default ResultsPage;
