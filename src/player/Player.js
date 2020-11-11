import React from 'react';
import SpotifyWebPlayback from '../spotify/SpotifyWebPlayback';
import './Player.css';
import Timer from './Timer';
import parseTime, { getQueryParam } from '../lib/core';
import $ from 'jquery';
import io from 'socket.io-client';
import { ALT_COVER_ART, REST } from '../settings';
import MP3Player from '../mp3/MP3Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default class Player extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
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
    this.startPlaying = this.startPlaying.bind(this);
  }

  async startPlaying() {
    this.getNextSong()
      .then(() => {
        console.log(this.state.currentSong)
        this.setState({ playing: true })
        window.playerEvents.emit('play', this.state.currentSong)
        switch(this.state.currentSong.type) {
          case 'spotify':
            // window.socket
            break;
          case 'youtube':
            break;
          case 'mp3':
            break;
          default:
            console.error('wtf', this.state);
            break;
        }
      })

  }

  async getNextSong() {
    return new Promise((resolve, reject) => {
      fetch(`${REST}queue/next?p=${getQueryParam('p')}`)
        .then(data => data.json())
        .then(data => this.setState({ songID: data.next.songID, addedBy: data.next.user }))
        .then(() => this.getSongInformation().then(resolve).catch(reject))
        .catch(console.error)
    })
  }

  getSongInformation() {
    return new Promise((resolve, reject) => {
      fetch(`${REST}song?song=${this.state.songID}`)
        .then(data => data.json())
        .then(data => this.setState({ currentSong: data.song }))
        .then(resolve)
        .catch(reject)
    })

  }

  componentDidMount() {
    window.socket.on('pause', () => window.playerEvents.emit('controllerPause'));
    window.socket.on('skip', () => window.playerEvents.emit('controllerSkip'));
    window.socket.on('previous', () => window.playerEvents.emit('controllerPrevious'));
    window.socket.on('code', code => this.setState({ playerCode: code }));
    // window.playerEvents.on('stateChange', s => {
      // this.setState(s);
      // console.log(s);
    // });
    $('.timeLeft').width($('.songLength').width());
    $('.playerCode').width($('.addedBy').width());
  
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let coverArt;
    if (!this.state.currentSong || !this.state.currentSong.coverArt) coverArt = ALT_COVER_ART;
    else coverArt = this.state.currentSong.coverArt;
    return (
      <div className="Player">
        {this.state.playing ? null : 
        <div className="playButton">
          <button onClick={this.startPlaying}>
            <FontAwesomeIcon icon={faPlay} size="6x" color="#ff0038"/>
          </button>
        </div>
        } 
        <div className="PlayerContainer columns is-desktop is-vcentered">
          <div className="column">
            <center className="currentTrack">
              <h1 className="bold">{this.state.currentSong ? this.state.currentSong.title : 'Song'}</h1>
              <h2 className="bold">{this.state.currentSong ? this.state.currentSong.artist : 'Artist'}</h2>
              <div className="container">
                <div className="timeLeft"> <h3><Timer /></h3> </div>
                <div className="coverArtBox"> <img className="coverArt" src={coverArt} alt="cover art"></img> </div>
                <div className="songLength"> <h3>{this.state.currentSong ? parseTime(Math.round(this.state.currentSong.length/1000)) : '3:50'}</h3> </div>
              </div>
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