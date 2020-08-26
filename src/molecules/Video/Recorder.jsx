/* eslint-disable no-useless-escape */

import React, { Fragment, useRef, useState, useEffect } from 'react';
import { ButtonBasic } from '../../atoms/Button';
import freddieCam from '../../images/filters/freddieCam.png';

export const VideoRecorder = () => {
  const videoDisplay = useRef(null);
  const videoDisplayAfter = useRef(null);
  const videoInput = useRef(null);
  const [ isMobile, setIsMobile ] = useState();
  const [ supportsMediaDevices, setSupportsMediaDevices ] = useState(true);
  const [ supportsMediaRecord, setSupportsMediaRecord ] = useState();
  const [ isLandscape, setIsLandscape ] = useState(window.innerWidth > window.innerHeight);
  const [ showPreview, setShowPreview ] = useState(false);
  const [ showFilter, setShowFilter ] = useState(false);
  const [ showCountdown, setShowCountdown ] = useState(false);
  const [ countdownSeconds, setCountdownSeconds ] = useState(5);
  const [ permissionGranted, setPermissionGranted ] = useState(false);
  const [ showRecordedVideo, setShowRecordedVideo ] = useState(false);

  // TODO: Do we also want to check for tablets?
  const checkMobile = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

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
      if (err.name === 'TypeError') {
        setSupportsMediaDevices(false);
      } else if (err.name === 'NotAllowedError') {
        alert('You must allow audio/video for this feature to work. Please update your site settings');
      }
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      play(event.data);
      // download();
    } else {
      // ...
    }
  };

  const play = (video) => {
    console.log('Video:', video);
    setShowRecordedVideo(true);
    setTimeout(() => {
      videoDisplayAfter.current.src = URL.createObjectURL(video);
    }, 100);
  };

  const preview = () => {
    getPermissionAndMedia().then((stream) => {
      setShowPreview(true);
      setTimeout(() => {
        videoDisplay.current.srcObject = stream;
      }, 100);
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
      // TODO: Determine preferred codec for stream capture
      const options = {mimeType: 'video/webm;codecs=vp9'};
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = handleDataAvailable;
      recorder.start();

      // 14-15 seconds
      setTimeout(() => {
        recorder.stop();
      }, 6000);
    });
  };

  const clickInput = () => {
    videoInput.current.click();
  };

  const handleInput = (e) => {
    setShowRecordedVideo(true);
    const video = e.target.files[0];
    video && play(video);
  };

  const handleResize = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };

  useEffect(() => {
    if (isMobile !== undefined) {
      preview();
    }
  }, [ isMobile ]);

  useEffect(() => {
    setIsMobile(checkMobile());
    setSupportsMediaRecord(typeof MediaRecorder !== 'undefined');
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Fragment>
      <h3>Is mobile? {isMobile?.toString()}</h3>
      <h3>Supports mediaDevices? {supportsMediaDevices?.toString()}</h3>
      <h3>Supports MediaRecord? {supportsMediaRecord?.toString()}</h3>
      <h3>User Agent: {navigator.userAgent}</h3>
      {isMobile === false && <h3>Please view this on your mobile device</h3>}
      {!isLandscape && <h3  className={'text-info'}>Please rotate your device to landscape mode</h3>}
      {supportsMediaDevices && !permissionGranted && <ButtonBasic onClick={() => preview()}>Preview Video</ButtonBasic>}
      {permissionGranted && (
        <Fragment>
          {supportsMediaRecord && <ButtonBasic onClick={() => startCountdown()} className={'btn-danger'}>Record Video</ButtonBasic>}
          <ButtonBasic onClick={() => setShowFilter(!showFilter)} className={'btn-info'}>Toggle Filter</ButtonBasic>
        </Fragment>
      )}
      {showPreview && (
        <Fragment>
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
        </Fragment>
      )}
      {!supportsMediaRecord && (
        <Fragment>
          <input ref={videoInput} type={'file'} name={'video'} accept={'video/*'} capture onChange={(e) => handleInput(e)} style={{display: 'none'}}></input>
          <ButtonBasic onClick={() => clickInput()} className={'btn-danger'}>Record Video</ButtonBasic>
          <br /><br />
        </Fragment>
      )}
      {showRecordedVideo && (
        <video ref={videoDisplayAfter} width={'240px'} height={'135px'} controls></video>
      )}
    </Fragment>
  )
};
