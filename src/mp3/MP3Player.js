import React from 'react';
import './MP3Player.css';

export default class MP3Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
      playing: false
    }
  }

  componentDidMount() {

    window.playerEvents.on('controllerPause', data => {
      if (!data.type === 'mp3') return;
      if (!this.state.playing) {
        this.player.play();
        this.setState({
          playing: true
        })
      } else {
        this.player.pause();
        this.setState({
          playing: false
        })
      }

    })
  }

  render() {
    return (
      <div className="MP3Player">
        <audio controls ref={ref => this.player = ref} />
      </div>
    )
  }
}