import React from 'react';

import store from '../store';

const ResultImage = React.createClass({

  render: function() {
    let image = this.props.band.imageUrl;
    let styles = {
    backgroundImage: 'url(' + image + ')',
    }
    return (
      <li className="band-result">
        <div className="coverImg" style={styles}></div>
        <p className="band-name">{this.props.band.name}</p>
        <data className="popularity">{this.props.band.popularity}</data>
        <data className="followers">{this.props.band.followers}</data>
        <a className="spotifyUrl">{this.props.band.spotify_url}</a>
      </li>
    );
  }
});

export default ResultImage;
