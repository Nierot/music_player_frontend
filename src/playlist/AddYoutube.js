import React from 'react';
import { addSongToDatabase, BackButton } from '../lib/addToPlaylist';
import './AddYoutube.css';
import { YOUTUBE_API } from '../settings';

export default class AddYoutube extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      input: '',
      preview: false,
      videoPreview: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removePreview = this.removePreview.bind(this);
    this.input = React.createRef();
  }

  handleChange(e) {
    e.preventDefault();
    let input = e.target.value;
    if (input.includes('youtube.com')) {
      input = input.split('?v=')[1].split('&')[0];
    } else if (input.includes('youtu.be')) {
      input = input.split('youtu.be/')[1].split('?')[0];
    }
    this.setState({ input: input });
  }

  handleSubmit(e) {
    this.getVideoInformation();
    e.preventDefault();
  }

  removePreview() {
    this.input.current.value = '';
    this.setState({
      preview: false,
      videoPreview: {}
    });
  }

  getVideoInformation() {
    fetch(YOUTUBE_API + '?id=' + this.state.input)
      .then(data => data.json())
      .then(video => this.setState({ videoPreview: video, preview: true }))
      .catch(() => {
        this.input.current.value = '';
        alert('That YouTube video does not exist');
      })
  }
  
  render() {
    return (
      <div className="AddYoutube">
        <BackButton />
        <h2 className="center">Add YouTube</h2>
        <div className="previewContainer">
          {this.state.preview ?
          <YoutubePreview video={this.state.videoPreview} remove={this.removePreview} />
          :
          <div className="noPreview content">
            Fill in a YouTube ID/link below. <br />
            Examples: <br />
            <ul>
              <li>dQw4w9WgXcQ</li>
              <li>https://youtu.be/M6XaSETNumM</li>
              <li>https://www.youtube.com/watch?v=75Mw8r5gW8E</li>
            </ul>
          </div>
          }
        </div>
        <form onSubmit={this.handleSubmit}>
          <input className="input is-info" type="text" value={this.state.value} placeholder="YouTube ID" onChange={this.handleChange} ref={this.input}/>
          <p className="hidden">spacing</p>
          <input className="button is-info" type="submit" value="Check" />  
        </form>
      </div>
    )
  }
}

class YoutubePreview extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddThis = this.handleAddThis.bind(this);
    this.handleDoNotAddThis = this.handleDoNotAddThis.bind(this);
  }

  handleDoNotAddThis() {
    this.props.remove();
  }

  handleAddThis() {
    addSongToDatabase()
  }

  render() {
    return (
      <div className="YoutubePreview">
        <p>{this.props.video.title}</p>
        <img src={this.props.video.thumbnails.maxres.url} alt="thumbnail" />
        <div className="buttonContainer">
          <button className="button is-success" onClick={this.handleAddThis}>Add this song?</button>
          &nbsp; &nbsp;
          <button className="button is-warning" onClick={this.handleDoNotAddThis}>Do not add this</button>
        </div>
      </div>
    )
  }
}