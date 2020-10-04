import React from 'react';
import SpotifyWebPlayback from './SpotifyWebPlayback';
import EventEmitter from 'events'
import './Player.css';

export default class Player extends React.Component {

  ALT_COVER_ART = 'https://cdn.nierot.com/memes/missing.jpg';

  constructor(props) {
    super(props);
    this.artist = undefined;
    this.title = undefined;
    this.progress = 0;
    this.album = undefined;
    this.cover_art = undefined;
    this.state = {}
  }

  componentDidMount() {
    if (window.playerEvents === undefined) window.playerEvents = new EventEmitter();
    window.playerEvents.on('stateChange', state => this.setState(state)); 
    // this.interval = setInterval(() => {
    //   const s = window.getSpotifyState();
    //   if (s === null) { return }
    //   this.setState({
    //     artist: s.track_window.current_track.artists[0].name,
    //     title: s.track_window.current_track.name,
    //     album: s.track_window.current_track.album.name,
    //     cover_art: s.track_window.current_track.album.images[2].url
    //   })
    // }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Player">
        <center>
          <h1>{this.state.title}</h1>
          <h2>{this.state.artist}</h2>
          <div className="coverArtBox">
            <img className="coverArt" src={this.state.cover_art ? this.state.cover_art : this.ALT_COVER_ART} alt='cover art'></img>  
          </div>
          <h2>{this.state.album}</h2>
        </center>
        <SpotifyWebPlayback />
      </div>
    )
  }
}