import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AllLists.css';
import { REST } from '../settings';
import PlaylistView from './PlaylistView';
import LoadingScreen from '../lib/LoadingScreen';

export default class AllLists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lists: undefined,
      page: 1
    }
  }
  
  fetchLists() {
    fetch(`${REST}playlist/all`)
      .then(data => data.json())
      .then(data => this.setState({ loading: false, lists: data }))
      .then(() => console.log(this.state))
  }


  back() {
    window.location.replace('/playlist');
  }

  render() {
    return (
      <div className="AllLists">
        {this.state.loading ? 
        <div className="loading">
          {this.fetchLists()}
          <LoadingScreen />
        </div> 
        :
        <div className="loaded">
          <button className="button backButton" onClick={() => this.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <br />
          <br />
          <center><h1>All Playlists</h1></center>
          <br />
          <div className="listGrid">
            <PlaylistView loading={this.state.loading} lists={this.state.lists}/>
          </div>
        </div>
        }
      </div>
    )
  }
}

// class AllListsPage extends React.Component {
//   render() {
//     return (
//       <div className="AllListsPage">
//         <AllListsItem list={this.props.lists[0][0]}/>
//         <div className="listSpacing">spacing</div>
//         <AllListsItem list={this.props.lists[0][1]}/>
//       </div>
//     )
//   }
// }

// class AllListsItem extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       info: undefined
//     }
//   }

//   getSongInfo() {
//     fetch(`${REST}/song`, { body: JSON.stringify({ id: this.props.songID }) })
//       .then(data => data.json())
//       .then(data => this.setState({ info: data }))
//   }

//   render() {
//     return (
//       <div className="AllListsItem">
//         <div className="box">
//           <article>
//             <div className="media-content">
//               <div className="content">
//                 <p>
//                   <strong>{this.props.list.name}</strong> <small>{this.props.list.user}</small> <small>{new Date(this.props.list.dateCreated).toDateString()}</small>
//                   <br />
//                 </p>
//               </div>
//             </div>
//           </article>
//         </div>
//       </div>
//     )
//   }
// }