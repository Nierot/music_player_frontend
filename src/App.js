import React from 'react';
import 'bulma';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Player from './player/Player';
import { EventEmitter } from 'events';
import SpotifyAuthentication from './spotify/SpotifyAuthentication';
import PlaylistCreator from './playlist/PlaylistCreator';
import CreateNewPlaylist from './playlist/CreateNewPlaylist';


class App extends React.Component {

  constructor(props) {
    super(props);
    window.playerEvents = new EventEmitter();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/player"> <Player/> </Route>
            <Route path="/playlist/new"> <CreateNewPlaylist/> </Route>
            <Route path="/playlist"> <PlaylistCreator/> </Route>
            <Route path="/">
              <a href="/player">Player</a><p/>
              <a href="/playlist">Playlist</a><p/>
              <SpotifyAuthentication/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
