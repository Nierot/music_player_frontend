import React from 'react';
import 'bulma';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Player from './player/Player';
import { EventEmitter } from 'events';
import SpotifyAuthentication from './spotify/SpotifyAuthentication';
import PlaylistCreator from './playlist/PlaylistCreator';
import CreateNewPlaylist from './playlist/CreateNewPlaylist';
import Controller from './controller/Controller';


class App extends React.Component {

  constructor(props) {
    super(props);
    window.playerEvents = new EventEmitter();
    window.state = {
      playing: false,
      player: undefined,
      volume: 1.0
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/player"> <Player/> </Route>
            <Route path="/controller"> <Controller/> </Route>
            <Route path="/playlist/new"> <CreateNewPlaylist/> </Route>
            <Route path="/playlist"> <PlaylistCreator/> </Route>
            <Route path="/">
              <a href="/player">Player</a><br/>
              <a href="/controller">Controller</a><br/>
              <a href="/playlist">Playlist</a><br/>
              <SpotifyAuthentication/>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
