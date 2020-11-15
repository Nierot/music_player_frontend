import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PlaylistView from './PlaylistView';
import { REST } from '../settings'

export default class MyLists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    this.getLists()
  }

  getLists() {
    fetch(`${REST}playlist?user=${'oof'}`)
      .then(data => data.json())
      .then(data => this.setState({ lists: data }))
      .catch(console.error)
  }

  back() {
    window.location.replace('/playlist');
  }

  render() {
    return (
      <div className="MyLists">
        <button className="button backButton" onClick={() => this.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <br />
        <br />
        <br />
        <button onClick={() => this.getLists()}>oof</button>
        <PlaylistView lists={this.state.lists}/>
      </div>
    )
  }
}