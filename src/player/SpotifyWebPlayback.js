import React from 'react';

export default class SpotifyWebPlayback extends React.Component {

  constructor(props) {
    super(props);
    this.state = undefined
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const Spotify = window.Spotify;
      const token = 'BQAnGTYba6SBBo1nuLOYTTmF0Skl4yUX1xe9BM9BIb0Vyjb3fFYyOGg-bc9vz0ejtFU2B1ufiH1tLi04xab7o6qsyOj14yTXPdkVEXAzT5kUvw_SDQT2N1rXM4m5n41kaTaPHW93JVkIomPijYcB5J3tNtawrj_J5WM0VLYpRFoEJdNyfSajEOxVlYQ3';
      const player = new Spotify.Player({
        name: 'Epic Web Player',
        getOAuthToken: cb => { cb(token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', s => {
        console.log(s);
        window.playerEvents.emit('stateChange', {
          artist: s.track_window.current_track.artists[0].name,
          title: s.track_window.current_track.name,
          album: s.track_window.current_track.album.name,
          cover_art: s.track_window.current_track.album.images[2].url,
          type: 'spotify',
          typeId: s.track_window.current_track.uri
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