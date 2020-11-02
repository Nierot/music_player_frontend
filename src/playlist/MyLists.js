import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class MyLists extends React.Component {

  back() {
    window.location.replace('/playlist');
  }

  render() {
    return (
      <div className="MyLists">
        <button className="button backButton" onClick={() => this.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>MyLists</h1>
      </div>
    )
  }
}