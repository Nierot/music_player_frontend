import React from 'react';
import './PlaylistCreator.css';

export default class PlaylistCreator extends React.Component {
  
  componentDidMount() {

  }

  render() {
    return (
      <div className="PlaylistCreator">
        <a className="button" href="/playlist/new">Create new playlist</a>
        {/* <a className="button" href="/playlist/me">My playlists</a> */}
        <a className="button" href="/playlist/all">Playlists</a>
      </div>
    )
  }
}