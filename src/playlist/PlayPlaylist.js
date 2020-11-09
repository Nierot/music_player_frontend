import React from 'react';
import { getQueryParam } from '../lib/core';
import './PlayPlaylist.css';

export default class PlayPlaylist extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};

    this.toPlayer = this.toPlayer.bind(this);
  }

  toPlayer() {
    if (!localStorage.getItem('spotifyAccess')) {
      alert('You are not logged into spotify! Sending you back to home to login');
      return window.location.replace('/');
    }
    window.location.replace(`/player?p=${getQueryParam('p')}`);
  }

  render() {

    return (
      <div className="PlayPlaylist">
        <h1>PlayPlaylist</h1>

        <select>
          <option>Shuffle</option>
        </select>

        <br />

        Events?:
        <input type="checkbox" />
        <button className="button" onClick={this.toPlayer}>Play!</button>
      </div>
    )
  }
}