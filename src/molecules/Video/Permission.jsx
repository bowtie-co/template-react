import React from 'react';
import { ButtonBasic } from '../../atoms/Button';

export const VideoPermission = () => {

  const getMedia = async (constraints) => {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      console.log('Accepted!', stream);
    } catch(err) {
      /* handle the error */
      console.log('Rejected!', err);
    }
  };

  const requestPermission = () => {
    getMedia({ audio: true, video: true });
  }

  return (
    <ButtonBasic onClick={requestPermission}>Allow Video</ButtonBasic>
  )
};