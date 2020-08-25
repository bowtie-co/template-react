import React, { Fragment, useRef, useEffect, useState } from 'react';
import { ButtonBasic } from '../../atoms/Button';

export const VideoRecorder = () => {
  const videoDisplay = useRef(null)
  const videoDisplayAfter = useRef(null)
  const [ permissionGranted, setPermissionGranted ] = useState(false);
  const [ showRecordedVideo, setShowRecordedVideo ] = useState(false);
  const chunks = [];

  const getPermissionAndMedia = async () => {
    let stream = null;
    const constraints = { audio: true, video: true }

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      console.log('Accepted!', stream);
      setPermissionGranted(true);
      return stream;
    } catch(err) {
      /* handle the error */
      console.log('Rejected!', err);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
      play();
      // download();
    } else {
      // ...
    }
  };

  const play = () => {
    setShowRecordedVideo(true);
    const blob = new Blob(chunks, {
      type: 'video/webm'
    });
    videoDisplayAfter.current.src = URL.createObjectURL(blob);
  };

  // const download = () => {
  //   const blob = new Blob(chunks, {
  //     type: 'video/webm'
  //   });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   document.body.appendChild(a);
  //   a.style = 'display: none';
  //   a.href = url;
  //   a.download = 'test.webm';
  //   a.click();
  //   URL.revokeObjectURL(url);
  // }

  const preview = () => {
    getPermissionAndMedia().then((stream) => {
      videoDisplay.current.srcObject = stream;
    });
  }

  const record = () => {
    getPermissionAndMedia().then((stream) => {
      videoDisplay.current.srcObject = stream;
      const options = {mimeType: 'video/webm;codecs=vp9'};
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = handleDataAvailable;
      recorder.start();
      // recorder.start(5000);

      setTimeout(() => {
        recorder.stop();
      }, 6000);
    });
  }

  const checkPermissions = () => {
    navigator.permissions.query({ name: 'camera' }).then((result) => {
      switch (result.state) {
        case 'granted': setPermissionGranted(true); preview(); break;
        case 'prompt': preview(); break;
        case 'denied': getPermissionAndMedia().then(() => alert('Please update your site settings to allow audio/video')); break;
        default: preview();
      }
    });
  }

  useEffect(() => {
    navigator.permissions.query({ name: 'camera' }).then((result) => {
      if (result.state === 'granted') {
        setPermissionGranted(true);
        preview();
      }
    });
  }, [])

  return (
    <Fragment>
      {!permissionGranted && <ButtonBasic onClick={() => checkPermissions()}>Preview Video</ButtonBasic>}
      {permissionGranted && <ButtonBasic onClick={() => record()}>Record Video</ButtonBasic>}
      <br /><br />
      <video ref={videoDisplay} width={'240px'} height={'135px'} autoPlay style={{transform: 'scaleX(-1)'}}></video>
      {showRecordedVideo && <video ref={videoDisplayAfter} width={'240px'} height={'135px'} controls></video> }
    </Fragment>
  )
};
