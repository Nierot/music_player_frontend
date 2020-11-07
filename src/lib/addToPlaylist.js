import React from 'react';
import { getQueryParam } from './core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { REST } from '../settings';

export function back() {
  window.location.href = `/playlist/edit?p=${getQueryParam('p')}&n=${getQueryParam('n')}`
}

export function BackButton() {
  return (
    <button className="button backButton" onClick={back}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  )
};

/**
 * Adds a song to a playlist and to the database
 * @param {Object} song The song to add
 * @param {string} song.title - The song title
 * @param {string} song.artist - A comma separated string of all artists
 * @param {number} song.length - Amount of ms a song lasts
 * @param {Object} song.typeData Additional data for this type
 * @param {string=} song.typeData.id Spotify/YouTube ID 
 * @param {*} playlist Playlist ID to add the song to
 * @param {*} user The user that added this
 * @param {'spotify' | 'youtube' | 'mp3'} type The type of the song
 */

export function addSongToDatabase(song, playlist, user, type) {
  fetch(`${REST}song`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: song.title,
      artist: song.artist,
      type: type,
      length: song.length,
      typeData: {
        id: song.typeData.id
      }
    })
  })
  .then(data => data.text())
  .then(songID => addSongToPlaylist(songID, playlist, user))
}

function addSongToPlaylist(songID, playlist, user) {
  fetch(`${REST}playlist/song`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      playlistID: playlist,
      songID: songID,
      user: user
    })
  }).then(() => window.location.reload())
  .catch(console.error)
}