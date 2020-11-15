import React from 'react';
import SpotifyWebPlayback from '../spotify/SpotifyWebPlayback';
import './Player.css';
import Timer from './Timer';
import parseTime, { getQueryParam } from '../lib/core';
import io from 'socket.io-client';
import { ALT_COVER_ART, REST } from '../settings';
import MP3Player from '../mp3/MP3Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from 'events';
import AdtRadEvent from './events/AdtRadEvent';

export default class Player extends React.Component {

  EVENTS = [ 'adtrad' ];

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
    this.getNextSong = this.getNextSong.bind(this);
    this.songFinished = this.songFinished.bind(this);
    this.playerEvents = React.createRef();
    this.coverArt = React.createRef();
    if (!window.eventEvents) window.eventEvents = new EventEmitter();
  }

  async generateQueue() {
    fetch(`${REST}queue/generate?p=${getQueryParam('p')}&events=${getQueryParam('events')}&listOfPeople=${getQueryParam('listOfPeople')}&songsBetweenEvents=${getQueryParam('songsBetweenEvents')}`)
  }

  async startPlaying() {
    this.getNextSong()
      .then(() => {
        console.log(this.state.currentSong)
        this.setState({ playing: true })
        window.playerEvents.emit('play', this.state.currentSong);
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
        .then(data => {
          if (!data.song) {
            console.error('For some reason this songId is nonsense, playing next song', data);
            this.songFinished();
          } else {
            return data;
          }
        })
        .then(data => this.setState({ currentSong: data.song, playing: true }))
        .then(resolve)
        .catch(reject)
    })

  }

  async songFinished() {
    console.log('song finished');
    await this.getNextSong()
      .then(() => {
        console.log(this.state.currentSong)
        window.playerEvents.emit('play', this.state.currentSong);
      })
  }

  async componentDidMount() {
    window.socket.on('pause', () => window.playerEvents.emit('controllerPause'));
    window.socket.on('skip', () => {
      console.log('skip');
      this.getNextSong()
        .then(() => {
          this.setState({ playing: true });
          if (this.state.currentSong.type !== 'event') {
            window.playerEvents.emit('play', this.state.currentSong);
          } else {
            console.log('event time');
            window.playerEvents.emit('stop');
            this.setState({ event: 'event' })
          }
        })
    });
    window.socket.on('previous', () => window.playerEvents.emit('controllerPrevious'));
    window.socket.on('code', code => this.setState({ playerCode: code }));

    window.playerEvents.on('finished', this.songFinished);

    await this.generateQueue();
  }

  renderEventField() {
    if (!this.state.currentSong || this.state.currentSong.type !== 'event') {
      if (this.playerEvents.current && !this.playerEvents.current.classList.contains('hidden')) {
        this.playerEvents.current.classList.add('hidden');
      }
      if (this.coverArt.current) {
        this.coverArt.current.classList.remove('hidden');
      }
      return null 
    } else {
      let event = this.EVENTS[Math.floor(Math.random() * this.EVENTS.length)]
      this.playerEvents.current.classList.remove('hidden');
      switch(event) {
        case 'adtrad':
          this.coverArt.current.classList.add('hidden');
          return <AdtRadEvent people={getQueryParam('listOfPeople').split(',')}/>
        case 'monsteralarm':
          return <h1>Monster alarm</h1>
        case 'cocktails':
          return <h1>cocktails</h1>
        case 'shots':
          return <h1>shots</h1>
        case 'escalatie':
          return <h1>escalatie</h1>
        default:
          return <h1>Events broken lol</h1>
      }
    }
  }

  render() {
    let coverArt;
    if (!this.state.currentSong || !this.state.currentSong.coverArt) coverArt = ALT_COVER_ART;
    else coverArt = this.state.currentSong.coverArt;
    let title = 'Song';
    let length = 0;
    let artist = 'Artist';
    let songId = 'none';
    let lengthString = '0:00';

    if (this.state.currentSong) {
      title = this.state.currentSong.title;
      length = Math.round(this.state.currentSong.length/1000);
      lengthString = parseTime(length);
      if (isNaN(length)) {
        lengthString = '3:18';
      }
      artist = this.state.currentSong.artist;
      songId = this.state.currentSong.songId;
    }
    console.log(songId);
    return (
      <div className="Player">
        {this.state.playing ? null : 
        <div className="playButton">
          <button onClick={this.startPlaying}>
            <FontAwesomeIcon icon={faPlay} size="6x" color="#ff0038"/>
          </button>
        </div>
        }
        <div className="playerContainer">
          <h3 id="playerCode">{this.state.playerCode}</h3>
          <h1 className="bold" id="songTitle">{title}</h1>
          <h3 id="addedBy">Added by: {this.state.addedBy || 'unknown'}</h3>
          <h2 className="bold" id="artist">{artist}</h2>
          <h2 id="timer"><Timer key={songId} songId={songId} length={length} playing={this.state.playing}/></h2>
          <img id="coverArt" src={coverArt} ref={this.coverArt} alt="cover art" />
          <h2 id="songLength">{lengthString}</h2>
        </div>

        <div className="playbackHelpers">
          <SpotifyWebPlayback />
          <MP3Player />
        </div>
        <div className="playerEvents hidden" ref={this.playerEvents}>
          {this.renderEventField()}
        </div>
      </div>
    )
  }
}