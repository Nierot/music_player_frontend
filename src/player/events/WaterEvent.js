import React from 'react';
import ParticlesBackground from './Particles';
import './WaterEvent.css';

export default class WaterEvent extends React.Component {
  
  componentDidMount() {
    // Play In Flames - Only for the Weak
    window.playerEvents.emit('play', {
      type: 'spotify',
      typeId: 'spotify:track:0JBQnLKfLXmlkquabLtAgd'
    })
  }

  render() {
    return (
      <div className="WaterEvent">
        <ParticlesBackground image={[
          {
            src: 'https://cdn.nierot.com/memes/water3.svg',
            heigth: 20,
            width: 20
          },
        ]}
        particles={20}
        size={40}
        speed={10}
        opacity={0.6}
        />
        <div className="waterForeground">
          <img src="https://cdn.nierot.com/memes/brak_ha-ha.png" alt="ha-ha wat grappig" />
        </div>
      </div>
    )
  }
}