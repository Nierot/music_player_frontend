import React from 'react';
import SpotifyWebPlayback from './SpotifyWebPlayback';
import './Player.css';
import Timer from './Timer';
import parseTime from '../core';

export default class Player extends React.Component {

  ALT_COVER_ART = 'https://cdn.nierot.com/memes/missing.jpg';

    //TODO Vertical centering!!!!!


  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {    
    window.playerEvents.on('stateChange', s => {
      this.setState(s);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    //TODO Vertical centering!!!!!
    //TODO Multiple Artists
    //TODO auto scale cover art size with css vw
    return (
      <div className="Player">
        <center className="currentTrack">
          <h1>{this.state.title ? this.state.title : 'Song'}</h1>
          <h2>{this.state.artist ? this.state.artist : 'Artist'}</h2>
          <div className="coverArtBox">
            <img className="coverArt" src={this.state.cover_art ? this.state.cover_art : this.ALT_COVER_ART} alt='cover art'></img>  
          </div>
          <h2 className="albumTitle">{this.state.album ? this.state.album : 'Album'}</h2>
        </center>
        <div className="topInformation">
          <div className="topLeft"></div>
          <div className="addedBy">
            <h3>Added by: {this.state.addedBy ? this.state.addedBy : 'unknown'}</h3>
          </div>
        </div>

        <div className="bottomInformation">
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="timeLeft">
            <h3><Timer /></h3>
          </div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="songLength">
            <h3>{this.state.length ? parseTime(Math.round(this.state.length/1000)) : '3:50'}</h3>
          </div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
          <div className="spacing"></div>
        </div>
        <div className="playbackHelpers">
          <SpotifyWebPlayback />
        </div>
      </div>
    )
  }
}