import React from 'react';
import Particles from './Particles';
import { randomValueFromArray } from '../../lib/core'; 
import './EscalatieEvent.css';

export default class EscalatieEvent extends React.Component {
  
  ESCALATIE_SONGS = [
    'spotify:track:0yrbQBBDM453xkKItntXnb',
    'spotify:track:72lQhFytmSrEVWBiYUWkcR'
  ]

  componentDidMount() {
    window.playerEvents.emit('play', {
      'type': 'spotify',
      'typeId': randomValueFromArray(this.ESCALATIE_SONGS)
    })
  }

  render() {
    return (
      <div className="EscalatieEvent">
        <Particles image={[
          {
            src: 'https://cdn.nierot.com/memes/barf.svg',
            height: 25,
            width: 25
          },
          {
            src: 'https://cdn.nierot.com/memes/stroh.svg',
            height: 50,
            width: 50
          }
        ]}
        size={50}
        speed={20}
        />
        <div className="escalatie">
          <img src="https://cdn.nierot.com/memes/escalatie.jpg" alt="escalatie" />
        </div>
      </div>
    )
  }
}