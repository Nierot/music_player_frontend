import React from 'react';
import SpotifyWebPlayback from '../spotify/SpotifyWebPlayback';
import './Player.css';
import Timer from './Timer';
import parseTime from '../lib/core';
import $ from 'jquery';
import io from 'socket.io-client';
import { ALT_COVER_ART, REST } from '../settings';
import MP3Player from '../mp3/MP3Player';

export default class Player extends React.Component {


  constructor(props) {
    super(props);
    this.state = {}
    if (!window.socket) {
      window.socket = io(REST, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttemps: 10,
        transports: ['websocket'],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false
      });
    }
  }

  componentDidMount() {

    window.playerEvents.on('stateChange', s => {
      this.setState(s);
      console.log(s);
    });

    window.socket.on('pause', () => window.playerEvents.emit('controllerPause'));
    window.socket.on('skip', () => window.playerEvents.emit('controllerSkip'));
    window.socket.on('previous', () => window.playerEvents.emit('controllerPrevious'));
    window.socket.on('code', code => this.setState({ playerCode: code }));

    $('.timeLeft').width($('.songLength').width());
    $('.playerCode').width($('.addedBy').width());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    //TODO auto scale cover art size with css vw (maybe)
    return (
      <div className="Player">
        <div className="PlayerContainer columns is-desktop is-vcentered">
          <div className="column">
            <center className="currentTrack">
              <h1>{this.state.title ? this.state.title : 'Song'}</h1>
              <h2>{this.state.artists ? this.state.artists : 'Artist'}</h2>
              <div className="container">
                <div className="timeLeft"> <h3><Timer/></h3> </div>
                <div className="coverArtBox"> <img className="coverArt" src={this.state.cover_art ? this.state.cover_art : ALT_COVER_ART} alt='cover art'></img> </div>
                <div className="songLength"> <h3>{this.state.length ? parseTime(Math.round(this.state.length/1000)) : '3:50'}</h3> </div>
              </div>
              <h2 className="albumTitle">{this.state.album ? this.state.album : 'Album'}</h2>
            </center>

            <div className="topInformation">
              <center className="playerCode">
                <h3>{this.state.playerCode}</h3>
              </center>
              <div className="addedBy">
                <h3>Added by: {this.state.addedBy ? this.state.addedBy : 'unknown'}</h3>
              </div>
            </div>

          </div>
          <div className="playbackHelpers">
            <SpotifyWebPlayback />
            <MP3Player />
          </div>
        </div>
      </div>
    )
  }
}