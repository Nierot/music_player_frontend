import React from 'react';
import './Particles.css';
import Particles from 'react-particles-js';

export default class ParticlesBackground extends React.Component {

  render() {
    return (
      <div className="Particles">
        <Particles 
        height={window.outerHeight}
        params={{
          particles: {
            number: {
              value: 20
            },
            line_linked: {
              enable: false
            },
            move: {
              speed: 10,
              out_mode: 'out'
            },
            shape: {
              type: [
                'image'
              ],
              image: [
                {
                  src: "https://cdn.nierot.com/memes/beugel.svg",
                  height: 40,
                  width: 20
                },
                {
                  src: 'https://cdn.nierot.com/memes/klok.svg',
                  height: 50,
                  width: 30
                },
                {
                  src: 'https://cdn.nierot.com/memes/hertog-jan.svg',
                  height: 30,
                  width: 25
                }
              ],
            },
            size: {
              value: 50,
              random: false,
              anim: {
                enable: false,
                speed: 4,
                size_min: 40,
                sync: true
              }
            },
            opacity: {
              anim: {
                enable: false
              },
              value: 0.7
            },
            retina_detect: true
          }
        }}
        />
      </div>
    )
  }
}