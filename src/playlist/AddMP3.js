import React from 'react';
import { addSongToDatabase, BackButton } from '../lib/addToPlaylist';
import { getQueryParam } from '../lib/core';
import { CDN } from '../settings';
import './AddMP3.css';

export default class AddMP3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onUserStupid = this.onUserStupid.bind(this);
    this.addSong = this.addSong.bind(this);
  };

  onFileChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  onFileUpload() {
    
    let form = new FormData();

    form.append('file', this.state.selectedFile);

    fetch(`${CDN}`, {
      method: 'POST',
      body: form,
    })
    .then(data => data.json())
    .then(data => data.id)
    .then(this.addSong)
    .catch(console.error)
  }

  addSong(id) {
    let song = {
      title: this.state.selectedFile.name,
      artist: 'mp3',
      length: -1,
      coverArt: 'https://cdn.nierot.com/memes/missing.jpg',
      typeData: {
        id: id
      }
    }
    addSongToDatabase(song, getQueryParam('p'), getQueryParam('n'), 'mp3');
  }

  onUserStupid() {
    this.setState({ selectedFile: null });    
  }

  uploadBox() {
    if (this.state.selectedFile) {
      return (
        <div className="upload center">
          You want to upload: {this.state.selectedFile.name}
          <br />
          <br />
          Correct?
          <div className="buttonBox">
            <button className="button is-success" onClick={this.onFileUpload}>Yes</button>
            <button className="button is-danger" onClick={this.onUserStupid}>No</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="upload center">
          <input className="input is-info" id="mp3FileUpload" type="file" ref={this.fileInput} onChange={this.onFileChange}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="AddMP3">
        <BackButton />
        <div className="headerText center">
          <h1>Add MP3</h1>
          <p>Select below the MP3 file you want to add to the playlist.</p>
          <p>Proceed with caution, the files you upload are not stored securly.</p>
          <p>You also are responsible for any copyright issues that might crop up from the works you upload.</p>
        </div>
        {this.uploadBox()}
      </div>
    )
  }
}