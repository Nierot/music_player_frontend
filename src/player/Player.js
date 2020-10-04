import React from 'react';
import SpotifyWebPlayback from './SpotifyWebPlayback';
import EventEmitter from 'events'
import './Player.css';

export default class Player extends React.Component {

  ALT_COVER_ART = 'https://cdn.nierot.com/memes/missing.jpg';

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    if (window.playerEvents === undefined) window.playerEvents = new EventEmitter();
    
    window.playerEvents.on('stateChange', state => this.setState(state)); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Player row">
        <center className="currentTrack col-xs">
          <h1>{this.state.title ? this.state.title : 'Song'}</h1>
          <h2>{this.state.artist ? this.state.artist : 'Artist'}</h2>
          <div className="coverArtBox">
            <img className="coverArt" src={this.state.cover_art ? this.state.cover_art : this.ALT_COVER_ART} alt='cover art'></img>  
          </div>
          <h2 className="albumTitle">{this.state.album ? this.state.album : 'Album'}</h2>
        </center>
        <div className="playbackHelpers">
          <SpotifyWebPlayback />
        </div>
      </div>
    )
  }
}