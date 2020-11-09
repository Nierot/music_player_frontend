import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AllLists.css';
import { REST } from '../settings';
import PlaylistView from './PlaylistView';
import LoadingScreen from '../lib/LoadingScreen';

export default class AllLists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lists: undefined,
      page: 1
    }
  }
  
  fetchLists() {
    fetch(`${REST}playlist/all`)
      .then(data => data.json())
      .then(data => this.setState({ loading: false, lists: data }))
      .then(() => console.log(this.state))
  }


  back() {
    window.location.replace('/playlist');
  }

  render() {
    return (
      <div className="AllLists">
        {this.state.loading ? 
        <div className="loading">
          {this.fetchLists()}
          <LoadingScreen />
        </div> 
        :
        <div className="loaded">
          <button className="button backButton" onClick={() => this.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <br />
          <br />
          <center><h1>All Playlists</h1></center>
          <br />
          <div className="listGrid">
            <PlaylistView loading={this.state.loading} lists={this.state.lists}/>
          </div>
        </div>
        }
      </div>
    )
  }
}