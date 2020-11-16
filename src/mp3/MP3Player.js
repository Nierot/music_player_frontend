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
      if (!this.state.playing) {
        this.player.current.play();
        this.setState({ playing: true });
      } else {
        this.player.current.pause();
        this.setState({ playing: false })
      }

    })

    window.playerEvents.on('play', data => {
      if (data.type === 'mp3') {
        this.playSong(data.typeId);
        this.setState({ playing: true });
      } else if (data.type === 'youtube') {
        this.playSong(data.typeId);
        this.setState({ playing: true })
      } else {
        this.player.current.pause();
      }
    })

    window.playerEvents.on('stop', () => {
      this.player.current.pause();
    })

    this.player.current.addEventListener('ended', () => {
      this.player.current.currentTime = 0;
      window.playerEvents.emit('finished');
    });
  }

  render() {
    return (
      <div className="MP3Player" >
        <audio ref={this.player} />
      </div>
    )
  }
}