import React from 'react';
import $ from 'jquery';
import { REST, SPOTIFY_SEARCH } from '../settings';
import './AddSpotify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getQueryParam, splitList } from '../lib/core';
import { BackButton } from '../lib/addToPlaylist';

export default class AddSpotify extends React.Component {

  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  onInput(e) {
    let input = e.target.value;
    if (input === '') return

    fetch(`${SPOTIFY_SEARCH}?query=${input}`)
      .then(data => data.json())
      .then(data => this.parseResults(data.body.tracks.items))
  }

  parseResults(res) {
    let results = [];
    res.forEach(item => results.push(<Result title={item.name}
                                             artist={item.artists.map(e => e.name).join(', ')} 
                                             cover={item.album.images[1].url} 
                                             key={item.uri} id={item.uri}
                                             length={item.duration_ms}
                                             />))
    this.setState({ results: splitList(results) });
  }

  render() {
    return (
      <div className="AddSpotify">
        <BackButton />
        <br/>
        <center><h2>Add a Spotify song</h2></center>
        <div className="columns is-mobile">
          <div className="column is-1"></div>
          <div className="column is-10">
            <input className="input spotifyInput" type="text" placeholder="Search Spotify" onInput={e => this.onInput(e)}/>
          </div>
          <div className="column is-1"></div>
        </div>
        <ResultList results={this.state.results}/>
      </div>
    )
  }
}

class ResultList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: 0
    }
    this.pages = []
    this.list = []
  }

  invis(className) {
    $(className).css('visibility', ' hidden');
  }

  vis(className) {
    $(className).css('visibility', 'visible');
  }

  checkButtons() {
    if (this.state.currentPage === 0) {
      this.vis('.nextButton');
      this.invis('.previousButton');
    } else if (this.state.currentPage === 9) {
      this.invis('.nextButton');
      this.vis('.previousButton');
    } else {
      this.vis('.nextButton');
      this.vis('.previousButton');
    }
  }

  componentDidMount() {
    this.checkButtons();
  }

  
  componentDidUpdate(prevProps) {
    this.checkButtons();
    if (prevProps !== this.props) this.setState({ currentPage: 0 })
  }


  nextPage() {
    if (this.state.currentPage === 8) {
      this.invis('.nextButton');
    } else {
      this.vis('.nextButton');
    }
    
    let next = this.state.currentPage + 1;
    this.setState({ currentPage: next });
  }

  previousPage() {
    if (this.state.currentPage === 1) {
      this.invis('.previousButton');
    } else {
      this.vis('.previousButton');
    }
    let prev = this.state.currentPage - 1;
    this.setState({ currentPage: prev });
  }

  render() {
    return (
      <div className="ResultList">
        {this.props.results[this.state.currentPage]}
        <div className="pageControls">
          <button className="previousButton button" onClick={() => this.previousPage()} >
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          &nbsp;&nbsp;&nbsp;
          <p>{this.state.currentPage}</p>
          &nbsp;&nbsp;&nbsp;
          <button className="nextButton button" onClick={() => this.nextPage()}>
            <FontAwesomeIcon icon={faArrowRight}/>
          </button>
        </div>
      </div>
    )
  }
}

class Result extends React.Component {

  addSongToDatabase() {
    fetch(`${REST}song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.props.title,
        artist: this.props.artist,
        type: 'spotify',
        length: this.props.length,
        typeData: {
          id: this.props.id
        }
      })
    })
    .then(data => data.text())
    .then(this.addSongToPlaylist)
  }

  addSongToPlaylist(songID) {
    fetch(`${REST}playlist/song`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playlistID: getQueryParam('p'),
        songID: songID,
        user: getQueryParam('n')
      })
    }).then(() => window.location.reload())
    .catch(console.error)
  }

  render() {
    return (
      <div className="Result box" data-id={this.props.id}>
        <article className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img src={this.props.cover} alt="Cover"></img>
            </figure>
          </div>

          <div className="media-content">
            <div className="content">
              <strong>{this.props.title}</strong>
              <br/>
              {this.props.artist}
            </div>
          </div>

          <div className="media-right">
            <button className="button" data-id={this.props.id} onClick={() => this.addSongToDatabase()}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </article>
      </div>
    )
  }
}