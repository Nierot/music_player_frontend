import React from 'react';
import './PlaylistView.css';

export default class PlaylistView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    this.setState({
      lists: this.props.lists.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    })
  }

  render() {
    return (
      <div className="PlaylistView">
        {this.state.lists.map(list => <PlaylistItem key={list._id} id={list._id} name={list.name} user={list.user} lastUpdated={list.lastUpdated}/>)}
      </div>
    )
  }
}

class PlaylistItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  play() {
    window.location.replace(`/playlist/play?p=${this.props.id}`);
  }

  edit() {
    window.location.replace(`/playlist/edit?p=${this.props.id}`);
  }

  render() {
    return (
      <div className="PlaylistItem">
        <div className="box">
          <article>
            <div className="media-content">
              <div className="content">
                <div className="playlistTitle">
                  <span>{this.props.name}</span>
                  <span>{this.props.user}</span>
                  <span>{new Date(this.props.lastUpdated).toDateString()}</span>
                </div>
                <button className="button is-success" onClick={() => this.play()}>Play</button>
                &nbsp;
                <button className="button is-info" onClick={() => this.edit()}>Edit</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}