import React from 'react';
import './LoadingScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function LoadingScreen() {
  return (
    <div className="LoadingScreen">
      <h1 className="bold">Loading</h1>
      <FontAwesomeIcon icon={ faSpinner } size="3x" spin color="black"/>
    </div>
  )
}