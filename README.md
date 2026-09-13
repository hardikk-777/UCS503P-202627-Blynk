# Blynk — Browser-Based Eye Strain and Posture Monitor

**UCS503P Software Engineering Project · Academic Year 2026–27**
Hardik Chandna · Roll No. 1024030442 · Solo project

Blynk is a privacy-first, browser-based application that tracks eye strain and screen distance in real time using on-device computer vision, with no video ever leaving the user's device. A break-enforcement feature verifies, through live gaze tracking, that a recovery exercise was genuinely completed — not just reminded and ignored.

📄 **Live project site:** https://hardikk-777.github.io/UCS503P-202627-Blynk/

## Repository structure

- **`code/`** — application source code (React + Vite, MediaPipe-based detection pipeline)
- **`docs/`** — GitHub Pages site source, including all formal diagrams and the progress presentation
- **`project-proposal/`** — initial project proposal (LaTeX + PDF)
- **`project-report-prototype-stage/`** — mid-semester evaluation report (LaTeX + PDF)
- **`project-report-final/`** — final report (added at project completion)
- **`journals/1024030442-hardik/`** — dated development journal

## Running the prototype locally

```
cd code/blynk-app
npm install
npm run dev
```

Open `http://localhost:5173` and allow camera access.

## Current status

Core detection pipeline (webcam capture, real-time facial landmark tracking, blink detection via eye aspect ratio) is working. Screen-distance calibration, the live dashboard, break-enforcement, and local history are in active development. Full details are on the [project site](https://hardikk-777.github.io/UCS503P-202627-Blynk/).