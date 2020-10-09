import React from 'react';
import { refreshToken } from '../lib/core';

export default class SpotifyWebPlayback extends React.Component {

  constructor(props) {
    super(props);
    this.state = undefined
  }

  initializeRefreshingToken() {

  }

  componentDidMount() {
    if (!window.spotifyAccessTokenInterval) {
      window.spotifyAccessTokenInterval = setInterval(() => refreshToken(), 3500000);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const Spotify = window.Spotify;
      const player = new Spotify.Player({
        name: 'Epic Web Player',
        getOAuthToken: cb => { cb(JSON.parse(localStorage.getItem('spotifyAccess')).access_token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', s => {
        window.playerEvents.emit('pause', {
          paused: s.paused,
          time: parseInt(s.position/1000)
        });

        window.playerEvents.emit('stateChange', {
          artists: s.track_window.current_track.artists.map(a => a.name).join(', '),
          title: s.track_window.current_track.name,
          album: s.track_window.current_track.album.name,
          cover_art: s.track_window.current_track.album.images[2].url,
          type: 'spotify',
          length: s.duration,
          typeId: s.track_window.current_track.uri,
          paused: s.paused
        });
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    }
  }

  render() {
    return (
      <div className="SpotifyWebPlayback"></div>
    )
  }
}