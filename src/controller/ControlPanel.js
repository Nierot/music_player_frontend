import React from 'react';

export default class ControlPanel extends React.Component {
  
  pause() {

  }

  skip() {

  }

  previous() {

  }

  volume() {

  }

  otherSong() {
    // Select a song to play...
  }
  
  render() {
    return (
      <div className="ControlPanel">
        <button className="button" onClick={this.pause}>Pause</button>
        <button className="button" onClick={this.skip}>Skip</button>
        <button className="button" onClick={this.previous}>Previous</button>
      </div>
    )
  }
}