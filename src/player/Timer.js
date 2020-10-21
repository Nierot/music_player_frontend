import React from 'react';
import parseTime from '../lib/core';

export default class Timer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      paused: true,
      timeString: '0'
    };
    this.interval = undefined;
  }

  tick() {
    this.setState({ time: this.state.time + 1 })
    this.setState({ timeString: parseTime(this.state.time) })
  }

  changeState() {
    if (this.state.paused === true) {
      clearInterval(this.interval);
    } else {
      if (!this.interval) {
        this.interval = setInterval(() => this.tick(), 1000);
      }
    }
  }

  componentDidMount() {
    window.playerEvents.on('pause', s => {
      this.setState({
        time: s.time,
        paused: s.paused,
      })
      this.changeState();
    });

    window.playerEvents.on('controllerSkip', () => {
      this.setState({
        time: 0,
        paused: false
      })
      this.changeState();
    })

    window.playerEvents.on('controllerPrevious', () => {
      this.setState({
        time: 0,
        paused: false
      })
      this.changeState();
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Timer">{this.state.timeString}</div>
    )
  }
}