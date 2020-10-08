import React from 'react';
import parseTime from '../core';

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

  componentDidMount() {
    window.playerEvents.on('pause', s => {
      this.setState({
        time: s.time,
        paused: s.paused,
      })
      if (s.paused === true) {
        clearInterval(this.interval);
      } else {
        if (!this.interval) {
          this.interval = setInterval(() => this.tick(), 1000);
        }
      }
    });
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