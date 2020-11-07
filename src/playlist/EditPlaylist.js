import React from 'react';
import { getQueryParam } from '../lib/core';
import './EditPlaylist.css';
import { REST } from '../settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import LoadingScreen from '../lib/LoadingScreen';

export default class EditPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playlist: false
    }
  }

  componentDidMount() {
    this.checkPlaylist()
    $('#nameWarning').css('visibility', 'hidden');
  }

  async checkPlaylist() {
    return await fetch(`${REST}playlist/exists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playlistID: getQueryParam('p') })
    })
    .then(data => data.json())
    .then(data => this.setState({
      playlist: !!data.exists,
      loading: false
    }))
    .catch(console.error)
  }

  relocate(type) {
    window.location.replace(`/playlist/edit/${type}?p=${getQueryParam('p')}&n=${getQueryParam('n')}`)
  }

  addSpotify() {
    this.relocate('spotify');
  }

  addYouTube() {
    this.relocate('youtube');
  }

  addMP3() {
    this.relocate('mp3');
  }

  noPlaylist() {
    return (
      <div className="noPlaylist">
        {this.state.loading ?
          <LoadingScreen />
          :
          <h1>Playlist not found</h1>
        }
      </div>
    )
  }

  checkNameInput() {
    let name = $('#nameInput');
    let warn = $('#nameWarning');
    console.log('oof')

    if (name.val() === '') {
      name.addClass('is-danger');
      warn.css('visibility', 'visible');
    } else {
      name.removeClass('is-danger');
      warn.css('visibility', 'hidden');
    }
  }

  addName() {
    this.checkNameInput();
    let name = $('#nameInput').val();
    const uS = new URLSearchParams(window.location.search);
    uS.set('n', name);
    window.location.search = uS;
  }

  
  shareLink() {
    const uS = new URLSearchParams(window.location.search);
    uS.delete('n');
    return window.location.href.split('?')[0] + '?' + uS;
  }

  copyLink() {
    let link = document.querySelector('#shareLinkInput');
    link.select();
    link.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  noName() {
    return (
      <div className="noName">
        <br />
        <br />
        <center><h1 className="title">What is your name?</h1></center>
        <br />
        <center>
          <small id="nameWarning">Please fill in a name</small>
        </center>
        <br />
        <div className="columns is-mobile">
          <div className="column is-1"></div>
          <input className="input column" id="nameInput" type="text" onChange={() => this.checkNameInput()}/>
          <div className="column is-1"></div>
        </div>
        <center>
          <br />
          <button className="button" onClick={() => this.addName()}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </center>
      </div>
    )
  }

  render() {
    return (
      <div className="EditPlaylist">
        {getQueryParam('n') === null ? this.noName() :
          !this.state.playlist ? this.noPlaylist() :
          <div className="editor">
            <h1 className="center">Add a song?</h1>
            <br />
            <div className="buttonColumn">
              <div className="buttonContainer">
                <button className="button is-link is-large" onClick={() => this.addSpotify()}>Spotify</button>            
              </div>
              <div className="buttonContainer">
                <button className="button is-link is-large" onClick={() => this.addYouTube()}>YouTube</button>
              </div>
              <div className="buttonContainer">
                <button className="button is-link is-large" onClick={() => this.addMP3()}>MP3</button>
              </div>
              <div className="buttonContainer sharePlaylist">
                <h3>Let others add to this playlist:</h3>
                <div/>
                <input type="text" className="input" id="shareLinkInput" defaultValue={this.shareLink()}></input>
                <button className="button is-primary" onClick={() => this.copyLink()}>Copy</button>
              </div>

            </div>
          </div>}
      </div>
    )
  }
}