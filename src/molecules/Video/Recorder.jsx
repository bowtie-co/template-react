import React, { Fragment, useRef, useState, useEffect } from 'react';
import { ButtonBasic } from '../../atoms/Button';
import freddieCam from '../../images/filters/freddieCam.png';

export const VideoRecorder = () => {
  const videoDisplay = useRef(null);
  const videoDisplayAfter = useRef(null);
  const [ showFilter, setShowFilter ] = useState(false);
  const [ showCountdown, setShowCountdown ] = useState(false);
  const [ countdownSeconds, setCountdownSeconds ] = useState(5);
  const [ permissionGranted, setPermissionGranted ] = useState(false);
  const [ showRecordedVideo, setShowRecordedVideo ] = useState(false);
  const chunks = [];

  const getPermissionAndMedia = async () => {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      /* use the stream */
      setPermissionGranted(true);
      return stream;
    } catch(err) {
      /* handle the error */
      console.log('Rejected!', err);
      alert('You must allow audio/video for this feature to work. Please update your site settings');
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
  };

  const startCountdown = () => {
    let seconds = countdownSeconds;
    setShowCountdown(true);

    const countdown = setInterval(() => {
      seconds -= 1;
      setCountdownSeconds(seconds);
      if (seconds === 0) {
        clearInterval(countdown);
        setShowCountdown(false);
        record();
      }
    }, 1000);
  };

  const record = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoDisplay.current.srcObject = stream;
      const options = {mimeType: 'video/webm;codecs=vp9'};
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = handleDataAvailable;
      recorder.start();
      // recorder.start(5000);

      // 14-15 seconds
      setTimeout(() => {
        recorder.stop();
      }, 6000);
    });
  };

  useEffect(() => preview(), []);

  return (
    <Fragment>
      {!permissionGranted && <ButtonBasic onClick={() => preview()}>Preview Video</ButtonBasic>}
      {permissionGranted && (
        <Fragment>
          <ButtonBasic onClick={() => startCountdown()} className={'btn-danger'}>Record Video</ButtonBasic>
          <ButtonBasic onClick={() => setShowFilter(!showFilter)} className={'btn-info'}>Toggle Filter</ButtonBasic>
        </Fragment>
      )}
      <br /><br />
      <div style={{width: '240px', height: '135px'}}>
        {showCountdown && (
          <div style={{zIndex: 2, position: 'absolute', width: '240px', height: '135px', color: 'white', fontSize: '40px', textAlign: 'center', paddingTop: '35px', background: 'rgba(0, 0, 0, 0.5)', textShadow: 'black 0 0 12px'}}>
            <span>{countdownSeconds}</span>
          </div>
        )}
        {showFilter && <img src={freddieCam} width={'240px'} height={'135px'} style={{zIndex: 1, position: 'absolute'}} alt={'filter'} />}
        <video ref={videoDisplay} width={'240px'} height={'135px'} autoPlay style={{transform: 'scaleX(-1)'}}></video>
      </div>
      <br />
      <input type="file" name="video" accept="video/*" capture></input>
      {showRecordedVideo && (
        <video ref={videoDisplayAfter} width={'240px'} height={'135px'} controls></video>
      )}
    </Fragment>
  )
};
