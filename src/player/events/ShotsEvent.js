import React from 'react';
import Particles from './Particles';
import './ShotsEvent.css';

export default class ShotsEvent extends React.Component {

  SONGS_CALLED_SHOTS = [
    'spotify:track:0FQA22KGLQdDesHAJtrEEE', // Imagine Dragons - Shots
    'spotify:track:1V4jC0vJ5525lEF1bFgPX2', // LMFAO, Lil Jon
  ]
  
  componentDidMount() {
    // Start playing Shots
    window.playerEvents.emit('play', {
      type: 'spotify',
      typeId: this.getRandomSongCalledShots(),
    })
  }

  getRandomSongCalledShots() {
    return this.SONGS_CALLED_SHOTS[Math.floor(Math.random() * this.SONGS_CALLED_SHOTS.length)];
  }

  render() {
    return (
      <div className="ShotsEvent">
        <Particles image={[
          {
            src: "https://cdn.nierot.com/memes/shot.svg",
            height: 10,
            width: 10
          },
          {
            src: 'https://cdn.nierot.com/memes/shot2.svg',
            height: 10,
            width: 10
          },
          {
            src: 'https://cdn.nierot.com/memes/shot3.svg',
            height: 10,
            width: 10
          }
        ]}
        speed={6}
        particles={30}
        size={30}
        opacity={0.6}
        />
        <div className="shotsForeground">
          <img src="https://cdn.nierot.com/memes/shots_stupid_image.png" alt="shots" />
        </div>
      </div>
    )
  }
}