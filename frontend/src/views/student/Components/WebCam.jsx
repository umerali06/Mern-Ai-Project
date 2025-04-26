import React, { useRef, useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
// import { drawRect } from './utilities';

import { Box, Card } from '@mui/material';
import swal from 'sweetalert';

export default function Home({ updateCheatingLog }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runCoco = async () => {
      const net = await cocossd.load();
      console.log('AI models loaded.');

      setInterval(() => {
        detect(net);
      }, 1500);
    };

    const detect = async (net) => {
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const obj = await net.detect(video);

        let person_count = 0;
        if (obj.length < 1) {
          updateCheatingLog((prevLog) => ({
            ...prevLog,
            noFaceCount: prevLog.noFaceCount + 1,
          }));
          swal('Face Not Visible', 'Action has been Recorded', 'error');
        }
        obj.forEach((element) => {
          if (element.class === 'cell phone') {
            updateCheatingLog((prevLog) => ({
              ...prevLog,
              cellPhoneCount: prevLog.cellPhoneCount + 1,
            }));
            swal('Cell Phone Detected', 'Action has been Recorded', 'error');
          }
          if (element.class === 'book') {
            updateCheatingLog((prevLog) => ({
              ...prevLog,
              ProhibitedObjectCount: prevLog.ProhibitedObjectCount + 1,
            }));
            swal('Prohibited Object Detected', 'Action has been Recorded', 'error');
          }

          if (!element.class === 'person') {
            swal('Face Not Visible', 'Action has been Recorded', 'error');
          }
          if (element.class === 'person') {
            person_count++;
            if (person_count > 1) {
              updateCheatingLog((prevLog) => ({
                ...prevLog,
                multipleFaceCount: prevLog.multipleFaceCount + 1,
              }));
              swal('Multiple Faces Detected', 'Action has been Recorded', 'error');
              person_count = 0;
            }
          }
        });
      }
    };

    runCoco(); // Call the function
  }, [updateCheatingLog]); // Only re-run when updateCheatingLog changes

  return (
    <Box>
      <Card variant="outlined">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,

            width: '100%',
            height: '100%',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 8,
            width: 240,
            height: 240,
          }}
        />
      </Card>
    </Box>
  );
}
