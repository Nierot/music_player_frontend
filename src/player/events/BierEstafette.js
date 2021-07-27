import React from 'react';
import './BierEstafette.css';
import { divideArrayInTwoRandomArrays, rand } from '../../lib/core'

export default class BierEstafette extends React.Component {

  state = {
    team1: [],
    team2: [],
    starter: {
      enabled: false,
      name: undefined
    }
  }

  componentDidMount() {
    this.generateTeams()

    window.playerEvents.emit('play', {
      type: 'spotify',
      artist: 'Rene Karst',
      title: 'Atje voor de sfeer',
      typeId: 'spotify:track:1YxLxQ8QCGsrtSLuQzpSUz',
    })
  }

  generateTeams() {
    let people = [...this.props.people]
    let starter = undefined
  
    if (people.length % 2 !== 0) {
      // two teams without starter
      let idx = rand(0, people.length - 1)
      starter = people[idx]
      people.splice(idx, 1)
    }

    const { fst, snd } = divideArrayInTwoRandomArrays(people)


    if (starter !== undefined) {
      this.setState({
        team1: fst,
        team2: snd,
        starter: {
          enabled: true,
          name: starter
        }
      })
    } else {
      this.setState({
        team1: fst,
        team2: snd
      })
    }
  }

  generateTeamTable() {
    let table = []
    for (let i = 0; i < this.state.team1.length; i++) {
      table.push(<tr>
        <td>{this.state.team1[i]}</td>
        <td>{this.state.team2[i]}</td>
      </tr>)
    }
    return table
  }

  render() {
    return (
      <div className="BierEstafette">
        <h1>Bier Estafette!</h1>
        <table>
          <tbody>
            <tr>
              <th>Team 1</th>
              <th>Team 2</th>
            </tr>
            <tr>
              <td id="beginner" colSpan="2">{this.state.starter.name}</td>
            </tr>
            {this.generateTeamTable()}
          </tbody>
        </table>
      </div>
    )
  }
}