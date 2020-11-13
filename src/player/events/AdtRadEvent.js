import React from 'react';
import ParticleExplosion from './ParticleExplosion';
import './AdtRadEvent.css';
import Winwheel from 'winwheel';
import { EventEmitter } from 'events';

export default class AdtRadEvent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      decided: false
    }
    this.adtRadWheel = {}
    this.drawPointer = this.drawPointer.bind(this);
  }

  generateSegments() {
    let colors = [ '#22aa22', '#ff2222', '#2222aa' ]
    let currentColor = -1;
    return this.props.people.map(person => {
      currentColor === 2 ? currentColor = 0 : currentColor++;
      let color = colors[currentColor];
      return this.generateSegment(person, color);
    })
  }

  generateSegment(name, color) {
    return {
      fillStyle: color,
      text: name
    }
  }

  componentDidMount() {
    if (!window.eventEvents) window.eventEvents = new EventEmitter();

    // Start playing Atje voor de sfeer
    window.playerEvents.emit('play', {
      type: 'spotify',
      artist: 'Rene Karst',
      title: 'Atje voor de sfeer',
      typeId: 'spotify:track:1YxLxQ8QCGsrtSLuQzpSUz',
    })

    setTimeout(() => this.adtRadWheel.startAnimation(), 10000);

    if (!this.props.people) return;
    window.drawPointer = this.drawPointer;

    this.adtRadWheel = new Winwheel({
      canvasId: 'adtRadCanvas',
      numSegments: this.props.people.length,
      segments: this.generateSegments(),
      rotationAngle: 3,
      pointerAngle: 40,
      animation: {
        type: 'spinToStop',
        duration: 5,
        spins: 8,
        clearTheCanvas: false,
        callbackFinished: `window.drawPointer()`,
      }
    })
    this.drawPointer();
  }

  drawPointer() {
    let pointer = new Image();
    pointer.onload = () => {
      let canvas = document.querySelector('#adtRadCanvas');
      let ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.save();
        ctx.translate(700, 138);
        ctx.rotate(this.adtRadWheel.degToRad(220));
        ctx.drawImage(pointer, 0, 0, 120, 120);
        ctx.restore();
      }
    }

    pointer.src = 'https://cdn.nierot.com/memes/beugel.png'
  }

  componentWillUnmount() {
    window.drawPointer = null;
  }

  render() {
    return (
      <div className="AdtRadEvent">
        <div className="adtRad">
          <canvas id="adtRadCanvas" width='800' height='800'></canvas>
        </div>
        <ParticleExplosion />
      </div>
    )
  }
}