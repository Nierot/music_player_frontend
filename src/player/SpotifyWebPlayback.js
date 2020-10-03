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
            const token = 'BQDJpt9WJ4qnTwmtPNELGQhyhWNs04na1NNSB4wLCvwZllpfyjT9QARU9ZZSn_swy8Rvz1DoVvuHAIkfnc6fHJa1J-ZsaPgP-K7UqzFjFTsv2qoQUwGijqU0xzRzUr_3jhw1RH7HFrRTQnp3VoUZrOtoN5Cwk26kKrFKBosBNxLy7zQFXeB1gwMYpOEk';
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
            player.addListener('player_state_changed', state => {
              this.setState(state);
              localStorage.setItem('spotifyState', JSON.stringify(state));
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