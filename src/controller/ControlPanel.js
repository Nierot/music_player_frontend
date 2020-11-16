import React from 'react';
import { REST } from '../settings';
import './ControlPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faForward } from '@fortawesome/free-solid-svg-icons';

export default class ControlPanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentSong: {}
    }

    this.pause = this.pause.bind(this)
    this.skip = this.skip.bind(this)
    this.reqObj = this.reqObj.bind(this);
  }

  reqObj(method = 'POST') {
    return {
      method: method,
      body: JSON.stringify({
        playerCode: this.props.playerCode
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  }

  componentDidMount() {
    this.getCurrentSongInformation();
  }
  
  pause() { 
    setTimeout(() => this.getCurrentSongInformation(), 2000);
    fetch(REST + 'controller/pause', this.reqObj());
  }

  skip() {
    setTimeout(() => this.getCurrentSongInformation(), 2000);
    fetch(REST + 'controller/skip', this.reqObj());
  }

  getCurrentSongInformation() {
    fetch(REST + 'controller/playing', this.reqObj())
      .then(data => data.json())
      .then(data => this.setState({ currentSong: data.data || {} }))
  }
  
  render() {
    return (
      <div className="ControlPanel">
        <div id="img">
          <img src={this.state.currentSong.coverArt || 'https://cdn.nierot.com/memes/missing.jpg'} alt="Album Cover" />
        </div>
        <div id="title">
          <h2>{this.state.currentSong.title || 'Title'}</h2>
          <h3>{this.state.currentSong.artist || 'Artist' }</h3>
        </div>
        <div id="buttonPanel">
          <button className="button" id="pause" onClick={this.pause}>
            <FontAwesomeIcon icon={faPauseCircle} size="3x"/>
          </button>
          <button className="button" id="skip" onClick={this.skip}>
            <FontAwesomeIcon icon={faForward} size="3x"/>
          </button>
        </div>
      </div>
    )
  }
}