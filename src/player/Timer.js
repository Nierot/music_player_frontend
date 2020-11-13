import React from 'react';
import parseTime from '../lib/core';

export default class Timer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      timeString: '0:00',
      time: 0
    }
    this.interval = undefined;
  }

  componentDidUpdate() {
    const { length, playing } = this.props;
    if (playing) {
      if (!this.interval) this.interval = setInterval(() => {
        if (length === this.state.time) return;
        this.setState({
          time: this.state.time + 1
        })
        this.generateTimeString();
      }, 1000);
    } else {
      this.interval = undefined;
    }
  }

  generateTimeString() {
    this.setState({
      timeString: parseTime(this.state.time)
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Timer" key={this.props.songId}>
        {this.state.timeString}
      </div>

    )
  }
}