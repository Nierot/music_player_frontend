import React from 'react';
import SpotifyWebPlayback from './SpotifyWebPlayback';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.artist = undefined;
    this.title = undefined;
    this.progress = 0;
    this.album = undefined;
    this.cover_art = 'https://cdn.nierot.com/memes/missing.jpg';
    this.state = {}
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const s = window.getSpotifyState();
      if (s === null) { return }
      this.setState({
        artist: s.track_window.current_track.artists[0].name,
        title: s.track_window.current_track.name,
        album: s.track_window.current_track.album.name,
        cover_art: s.track_window.current_track.album.images[2].url
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Player">
        <center>
          <h1>{this.state.title}</h1>
          <h1><small>{this.state.album}</small></h1>
          <h2>{this.state.artist}</h2>
          <img src={this.state.cover_art}></img>
        </center>
        <SpotifyWebPlayback />
      </div>
    )
  }
}