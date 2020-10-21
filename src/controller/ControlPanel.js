import React from 'react';
import { REST } from '../settings';
import './ControlPanel.css';
export default class ControlPanel extends React.Component {

  constructor(props) {
    super(props)
    
    this.pause = this.pause.bind(this)
    this.skip = this.skip.bind(this)
    this.previous = this.previous.bind(this)

    this.reqObj = {
      method: 'POST',
      body: JSON.stringify({
        playerCode: this.props.playerCode
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  }
  
  pause() { 
    fetch(REST + 'controller/pause', this.reqObj);
  }

  skip() {
    fetch(REST + 'controller/skip', this.reqObj);
  }

  previous() {
    fetch(REST + 'controller/previous', this.reqObj);
  }

  volume() {

  }

  otherSong() {
    // Select a song to play...
  }
  
  render() {
    return (
      <div className="ControlPanel">
        <button className="previous button" onClick={this.previous}>Previous</button>
        <button className="pause button" onClick={this.pause}>Pause</button>
        <button className="skip button" onClick={this.skip}>Skip</button>
      </div>
    )
  }
}