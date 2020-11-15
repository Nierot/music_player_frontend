import React from 'react';
import './PlaylistCreator.css';

export default class PlaylistCreator extends React.Component {

  render() {
    return (
      <div className="PlaylistCreator">
        <div className="Link" id="title">
          <h1>Playlist editor</h1>
        </div>
        <div className="Link" id="new">
          <a className="button is-info" href="/playlist/new">Create new playlist</a>
        </div>
        <div className="Link" id="all">
          <a className="button is-info" href="/playlist/all">Play/edit playlists</a>
        </div>
        <div className="Link" id="my">
          <a className="button is-info" href="/playlist">My playlists</a>
        </div>
      </div>
    )
  }
}