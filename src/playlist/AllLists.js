import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AllLists.css';

export default class AllLists extends React.Component {

  back() {
    window.location.replace('/playlist');
  }

  render() {
    return (
      <div className="AllLists">
        <button className="button backButton" onClick={() => this.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="listGrid">
          <AllListsItem />
        </div>
      </div>
    )
  }
}

class AllListsItem extends React.Component {
  render() {
    return (
      <div className="AllListsItem">
        <div className="box">
          <article>
            <div className="media-content">
              <div class="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}