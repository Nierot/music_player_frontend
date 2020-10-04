import React from 'react';

export default class SpotifyWebPlayback extends React.Component {

  constructor(props) {
    super(props);
    this.state = undefined
  }

  render() {
    return (
      <div className="SpotifyWebPlayback">
        <script>{
          window.onSpotifyWebPlaybackSDKReady = () => {
            const Spotify = window.Spotify;
            const token = 'BQDsaDQih0n_1D_GJKMZmHwRXyCM_mu-N-sQdSpa--Wy5CBDOsRean5KI2ap3GlNkW9HvJ6TCETezdeF6ANvnbNiQXRCL6JiSdpMKF8xmGF7TG-AbnClDL0wj4G1HYVmo0iwL1_lqSJTlcU3QMJgFDTFBDKa5cU663jft5TcfFP46SLxuPda-42E7Gt0';
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
              window.playerEvents.emit('stateChange', {
                artist: s.track_window.current_track.artists[0].name,
                title: s.track_window.current_track.name,
                album: s.track_window.current_track.album.name,
                cover_art: s.track_window.current_track.album.images[2].url
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
        }</script>
      </div>
    )
  }
}