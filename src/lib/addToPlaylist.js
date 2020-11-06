import React from 'react';
import { getQueryParam } from './core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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