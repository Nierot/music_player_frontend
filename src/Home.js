import React from 'react';
import SpotifyAuthentication from './spotify/SpotifyAuthentication';
import './Home.css';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

  render() {
    return(
      <div className="Home">
        <div className="bold" id="title"><h1>Music player</h1></div>
        <Link className="Link" id="playlistButton" to="/playlist">
          <button className="button is-info">Play/edit a playlist</button>
        </Link>
        <Link className="Link" id="controllerButton" to="/controller">
          <button className="button is-info">Remote control</button>
        </Link>
        <SpotifyAuthentication className="Link"/>
        <footer>

        </footer>
      </div>
    )
  }
}