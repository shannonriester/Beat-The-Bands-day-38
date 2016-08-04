import React from 'react';

import store from '../store';

const ResultImage = React.createClass({
  render: function() {
    return (
      <li className="band-result">
        <img className="coverImg" src={this.props.band.imageUrl}/>
        <p className="band-name">{this.props.band.name}</p>
        <data className="popularity">{this.props.band.popularity}</data>
        <data className="followers">{this.props.band.followers}</data>
        <a className="spotifyUrl">{this.props.band.spotify_url}</a>
      </li>
    );
  }
});

export default ResultImage;
