import React from 'react';

export default class PlayerController extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      spotify: undefined,
      mp3: undefined
    };
  }

  componentDidMount() {
    window.playerEvents.on('spotifyReady', s => this.setState({ spotify: s }))
  }

  render() {
    return <div className="PlayerController"></div>
  }
}