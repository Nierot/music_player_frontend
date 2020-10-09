import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Player from './player/Player';
import { EventEmitter } from 'events';
import SpotifyAuthentication from './spotify/SpotifyAuthentication';

class App extends React.Component {

  constructor(props) {
    super(props);
    window.playerEvents = new EventEmitter();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route path="/player">
                <Player/>
              </Route>
              <Route path="/">
                <SpotifyAuthentication/>
                <Link to="/player">Player</Link>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
