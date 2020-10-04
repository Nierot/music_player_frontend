import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Player from './player/Player';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/player">Player</Link>
              </li>
            </ul>
          </nav> */}

          <Switch>
            <Route path="/player">
              <Player/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
