import React from 'react';
import 'bulma';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Player from './player/Player';
import { EventEmitter } from 'events';
import PlaylistCreator from './playlist/PlaylistCreator';
import CreateNewPlaylist from './playlist/CreateNewPlaylist';
import Controller from './controller/Controller';
import EditPlaylist from './playlist/EditPlaylist';
import AddYoutube from './playlist/AddYoutube';
import AddSpotify from './playlist/AddSpotify';
import AddMP3 from './playlist/AddMP3';
import MyLists from './playlist/MyLists';
import AllLists from './playlist/AllLists';
import LoadingScreen from './lib/LoadingScreen';
import PlayPlaylist from './playlist/PlayPlaylist';
import Home from './Home';
import WaterEvent from './player/events/WaterEvent';

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
            <Route path="/testComponent"> <WaterEvent /> </Route>
            <Route path="/loading"> <LoadingScreen /> </Route>
            <Route path="/player"> <Player/> </Route>
            <Route path="/controller"> <Controller/> </Route>
            <Route path="/playlist/new"> <CreateNewPlaylist/> </Route>
            <Route path="/playlist/edit/spotify"> <AddSpotify/> </Route>
            <Route path="/playlist/edit/youtube"> <AddYoutube/> </Route>
            <Route path="/playlist/edit/mp3"> <AddMP3/> </Route>
            <Route path="/playlist/edit"> <EditPlaylist/> </Route>
            <Route path="/playlist/me"> <MyLists/> </Route>
            <Route path="/playlist/all"> <AllLists/> </Route>
            <Route path="/playlist/play"> <PlayPlaylist /> </Route>
            <Route path="/playlist"> <PlaylistCreator/> </Route>
            <Route path="/"> <Home /> </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
