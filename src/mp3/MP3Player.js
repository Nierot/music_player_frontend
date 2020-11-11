import React from 'react';
import './MP3Player.css';
import { CDN } from '../settings';

export default class MP3Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      playing: false
    }

    this.player = React.createRef();
  }

  playSong(songID) {
    this.player.current.src = CDN + songID + '.mp3';
    this.player.current.play();
  }

  componentDidMount() {

    window.playerEvents.on('controllerPause', () => {
      this.player.current.pause();
      this.setState({
        playing: false
      })
    })

    window.playerEvents.on('play', data => {
      if (data.type === 'mp3') {
        this.playSong(data.typeId);
      } else if (data.type === 'youtube') {
        this.playSong(data.typeId);
      } else {
        this.player.current.pause();
      }
    })
  }

  render() {
    return (
      <div className="MP3Player" >
        <audio ref={this.player} />
      </div>
    )
  }
}