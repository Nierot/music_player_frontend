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
            const token = 'BQD46r-8tjkn_IjblmMS-IW3nLLoBh4eWiXAbUL4RQ5Et10OGZ9aj1uiLfs7QmpTWtkkGYFyA6hvLIYWyB8WzlPdw6RXW1VKXpYhIoGGOkJKZM0rF7y3HFG6TZY3-kxPvlHYLmd0hiSJRLouZ8kX9S4MraGiev0DhtvMLInGXxz1lYjTp6uwHeABBl8b';
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
        }</script>
      </div>
    )
  }
}