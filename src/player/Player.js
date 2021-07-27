import React from 'react';
import SpotifyWebPlayback from '../spotify/SpotifyWebPlayback';
import './Player.css';
import Timer from './Timer';
import parseTime, { getQueryParam } from '../lib/core';
import io from 'socket.io-client';
import { ALT_COVER_ART, REST, SOCKETIO } from '../settings';
import MP3Player from '../mp3/MP3Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from 'events';
import AdtRadEvent from './events/AdtRadEvent';
import ShotsEvent from './events/ShotsEvent';
import WaterEvent from './events/WaterEvent';
import SpotifyAuthentication from '../spotify/SpotifyAuthentication';
import OpusEvent from './events/OpusEvent';
import BierEstafette from './events/BierEstafette';
import AdtWedstrijdEvent from './events/AdtWedstrijdEvent';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    if (!window.socket) {
      window.socket = io(SOCKETIO, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttemps: 10,
        transports: ['websocket'],
        agent: false,
        upgrade: true,
        path: '/music/socket.io',
        rejectUnauthorized: false
      });
    }
    this.startPlaying = this.startPlaying.bind(this);
    this.getNextSong = this.getNextSong.bind(this);
    this.songFinished = this.songFinished.bind(this);
    this.playerEvents = React.createRef();
    this.coverArt = React.createRef();
    if (!window.eventEvents) window.eventEvents = new EventEmitter();

    if (getQueryParam('eventTypes')) {
      this.EVENTS = getQueryParam('eventTypes').split(',')
      if (this.EVENTS.length === 0) {
        this.EVENTS = [ 'adtrad', 'opus', 'water', 'adtwedstrijd', 'bierestafette', 'leeg' ];
      }
    } 
  }

  async generateQueue() {
    fetch(`${REST}queue/generate?p=${getQueryParam('p')}&events=${getQueryParam('events')}&listOfPeople=${getQueryParam('listOfPeople')}&songsBetweenEvents=${getQueryParam('songsBetweenEvents')}`)
  }

  async startPlaying() {
    this.getNextSong()
      .then(() => {
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
            if (data.type === 'event') {
              data.song = {}
            }
            return data;
          }
        })
        .then(data => this.setState({ currentSong: data.song, playing: true, event: '' }))
        .then(resolve)
        .catch(reject)
    })

  }

  async songFinished() {
    await this.getNextSong()
      .then(() => {
        if (this.state.currentSong.type !== 'event') {
          window.playerEvents.emit('play', this.state.currentSong);
        } else {
          window.playerEvents.emit('stop');
          this.setState({ event: this.EVENTS[Math.floor(Math.random() * this.EVENTS.length)] })
        }
      })
  }

  async componentDidMount() {
    window.socket.on('pause', () => window.playerEvents.emit('controllerPause'));
    window.socket.on('skip', () => {
      this.getNextSong()
        .then(() => {
          if (this.state.currentSong.type !== 'event') {
            window.playerEvents.emit('play', this.state.currentSong);
          } else {
            window.playerEvents.emit('stop');
            this.setState({ event: this.EVENTS[Math.floor(Math.random() * this.EVENTS.length)] })
          }
        })
    });
    window.socket.on('previous', () => window.playerEvents.emit('controllerPrevious'));
    window.socket.on('code', code => this.setState({ playerCode: code }));

    window.socket.on('whatAreYouPlaying', (data, callback) => {
      if (this.state.currentSong && this.state.currentSong.type === 'event') {
        callback({
          title: this.state.event,
          artist: 'Event'
        })
      } else {
        callback(this.state.currentSong);
      }
    })

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
      this.playerEvents.current.classList.remove('hidden');
      switch(this.state.event) {
        //[ 'adtrad', 'opus', 'water', 'adtwedstrijd', 'bierestafette', 'leeg' ];
        case 'adtrad':
          this.coverArt.current.classList.add('hidden');
          return <AdtRadEvent people={getQueryParam('listOfPeople').split(',')}/>
        case 'shots':
          return <ShotsEvent />
        case 'opus':
          return <OpusEvent />
        case 'adtwedstrijd':
          return <AdtWedstrijdEvent people={getQueryParam('listOfPeople').split(',')} />
        case 'bierestafette':
          return <BierEstafette people={getQueryParam('listOfPeople').split(',') } />
        case 'water':
          return <WaterEvent />
        default:
          return null;
      }
    }
  }

  render() {
    //TODO
    if (!this.state.playing && window.location.hash.includes('error=true')) {
      window.location.hash = ''
      console.error('Something bad happend last time lol')
      this.startPlaying()
    }

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
        switch (this.state.event) {
          case 'adtrad':
            lengthString = '3:18'
            break;
          case 'shots':
            lengthString = '3:52';
            break;
          case 'Escalatie':
            lengthString = '3:24';
            break;
          case 'water':
            lengthString = '4:05';
            break;
          default:
            break;
        }
      }
      artist = this.state.currentSong.artist;
      songId = this.state.currentSong.songId;
    }
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
        <div className="spotifyAuthenticationHelper">
          <SpotifyAuthentication />
        </div>
      </div>
    )
  }
}