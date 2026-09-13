import { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const LEFT_EYE = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE = [362, 385, 387, 263, 373, 380];
const EAR_THRESHOLD = 0.21;

function distance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

function calculateEAR(landmarks, eyeIndices) {
  const [p1, p2, p3, p4, p5, p6] = eyeIndices.map(
    (i) => landmarks[i]
  );

  const vertical1 = distance(p2, p6);
  const vertical2 = distance(p3, p5);
  const horizontal = distance(p1, p4);

  return (vertical1 + vertical2) / (2 * horizontal);
}

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationIdRef = useRef(null);

  const [status, setStatus] = useState('Loading model...');
  const [blinkCount, setBlinkCount] = useState(0);

  const eyeClosedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function setup() {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        );

        const landmarker = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numFaces: 1,
          }
        );

        if (!mounted) {
          landmarker.close();
          return;
        }

        landmarkerRef.current = landmarker;

        setStatus('Requesting camera...');

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;

        videoRef.current.addEventListener(
          'loadeddata',
          () => {
            if (!mounted) return;

            setStatus('Tracking');
            predictLoop();
          },
          { once: true }
        );
      } catch (error) {
        console.error(error);
        setStatus('Error: Could not start camera/model');
      }
    }

    function predictLoop() {
      if (!mounted) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const landmarker = landmarkerRef.current;

      if (!video || !canvas || !landmarker) {
        return;
      }

      if (video.readyState < 2) {
        animationIdRef.current = requestAnimationFrame(predictLoop);
        return;
      }

      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const results = landmarker.detectForVideo(
        video,
        performance.now()
      );

      // Draw camera image
      ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (
        results.faceLandmarks &&
        results.faceLandmarks.length > 0
      ) {
        const landmarks = results.faceLandmarks[0];

        // Draw face landmarks
        ctx.fillStyle = '#00ff88';

        for (const point of landmarks) {
          const x = point.x * canvas.width;
          const y = point.y * canvas.height;

          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Calculate Eye Aspect Ratio
        const leftEAR = calculateEAR(
          landmarks,
          LEFT_EYE
        );

        const rightEAR = calculateEAR(
          landmarks,
          RIGHT_EYE
        );

        const avgEAR = (leftEAR + rightEAR) / 2;

        // Blink detection
        if (
          avgEAR < EAR_THRESHOLD &&
          !eyeClosedRef.current
        ) {
          eyeClosedRef.current = true;
        } else if (
          avgEAR >= EAR_THRESHOLD &&
          eyeClosedRef.current
        ) {
          eyeClosedRef.current = false;

          setBlinkCount((prev) => prev + 1);
        }
      }

      animationIdRef.current =
        requestAnimationFrame(predictLoop);
    }

    setup();

    // Cleanup when component is unmounted
    return () => {
      mounted = false;

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());

        videoRef.current.srcObject = null;
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <h1>Blink Detector</h1>

      <p>
        Status: <strong>{status}</strong>
      </p>

      <h2>
        Blink Count: {blinkCount}
      </h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          display: 'none',
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          width: '640px',
          maxWidth: '100%',
          borderRadius: '10px',
        }}
      />
    </div>
  );
}

export default App;