import React from 'react';
import './AdtWedstrijdEvent.css';
import Particles from './Particles';
import { rand } from '../../lib/core'

export default class AdtWedstrijdEvent extends React.Component {

  state = {
    playerOne: 'p1',
    playerTwo: 'p2'
  }

  componentDidMount() {
    this.findPlayers()
    window.playerEvents.emit('play', {
      type: 'spotify',
      artist: 'Rene Karst',
      title: 'Atje voor de sfeer',
      typeId: 'spotify:track:1YxLxQ8QCGsrtSLuQzpSUz',
    })
  }

  findPlayers() {
    let people = [...this.props.people]

    let idx = rand(0, people.length - 1)
    let p1  = people[idx]
    people.splice(idx, 1)

    let p2 = people[rand(0, people.length - 1)]

    this.setState({
      playerOne: p1,
      playerTwo: p2
    })
  }

  render() {
    return (
      <div className="AdtWedstrijdEvent">
        <h1>Adt Wedstrijd!</h1>

        <h2 id="p1">{this.state.playerOne}</h2>
        <h3>vs</h3>
        <h2 id="p2">{this.state.playerTwo}</h2>
        <Particles />
      </div>
    )
  }
}