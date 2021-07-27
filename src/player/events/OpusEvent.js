import React from 'react';
import Particles from './Particles';
import './OpusEvent.css';
import { sleep } from '../../lib/core'

export default class OpusEvent extends React.Component {

  async componentDidMount() {
    await sleep(10000)

    window.playerEvents.emit('play', {
        type: 'spotify',
        artist: 'Erik Prydz',
        title: 'Opus',
        typeId: 'spotify:track:3v2oAQomhOcYCPPHafS3KV'
      })
  }

  render() {
    return (
      <div className="OpusEvent">
        <Particles image={[
          {
            src: 'https://cdn.nierot.com/memes/dice.svg',
            height: 50,
            width: 50
          },
        ]}
        size={50}
        speed={20}
        />
        <div className="opus">
          <img src="https://i.scdn.co/image/ab67616d0000b27324492f2ba3a1d995e1faf5d8" alt="opus" />
        </div>
      </div>
    )
  }
}