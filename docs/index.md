# Blynk — Browser-Based Eye Strain and Posture Monitor

*Privacy-first, on-device wellness tracking · UCS503P Software Engineering*

[Repository](https://github.com/hardikk-777/UCS503P-202627-Blynk)

---

## 👤 Academic & project profile

| Contribution area | Team member | Roll No |
| --- | --- | --- |
| Full-stack development (solo project) | Hardik Chandna | 1024030442 |

## 📌 Executive overview

Long screen sessions quietly reduce blink rate and pull posture forward, leading to digital eye strain over time. Existing break-reminder tools are passive timers with no way to verify a user actually rested their eyes. Blynk addresses this with real-time, on-device blink and screen-distance tracking, and an eye-exercise break that is only unlocked once genuinely completed — all without a single video frame ever leaving the user's device.

## ✨ Key capabilities (planned and in progress)

**Live blink and distance tracking** — on-device facial landmark detection calculates blink rate and estimated screen distance from the webcam feed, using MediaPipe's Face Landmarker model running entirely in-browser via WebAssembly.

**Verified break enforcement** — a moving on-screen target must genuinely be followed, confirmed through live gaze tracking, before the screen unlocks again.

**Local history** — daily and weekly trends stored in the browser's own IndexedDB, with no external server involved.

## 🏗️ System architecture

```
Browser webcam (getUserMedia)
        ↓
MediaPipe Face Landmarker (WASM, on-device)
        ↓
Blink / distance analysis logic (React state)
        ↓
Dashboard (React + Framer Motion) · Ambient visual (Three.js) · History (IndexedDB + D3.js)
```

No backend server is used for any core feature — all inference and storage happen on the user's own device.

## 🚀 Prototype status

The current prototype demonstrates the foundational detection pipeline:

1. Live webcam feed processed in-browser through MediaPipe's pretrained Face Landmarker.
2. Real-time facial landmark tracking (468 points) rendered over the video feed.
3. Blink detection using the eye aspect ratio technique, with a running blink counter.

**To run locally:**
```
cd code/blynk-app
npm install
npm run dev
```
Open `http://localhost:5173` and allow camera access.

## 📐 Formal engineering deliverables

| Deliverable | Description | Access |
| --- | --- | --- |
| Project proposal | Problem definition, scope, and methodology | [View PDF](https://github.com/hardikk-777/UCS503P-202627-Blynk/blob/master/project-proposal/blynk_final_proposal.pdf) |
| UML use case diagram | Actor and use case modelling | [View diagram](diagrams/Use_Case_Diagram.pdf) |
| Data flow diagrams | Context, Level 1, and Level 2 process decomposition | [View diagram](diagrams/DFD_Levels_0_1_2.pdf) |
| Entity-relationship diagram | Local data model for metrics, break events, and history | [View diagram](diagrams/ER_Diagram.pdf) |
| Activity / swimlane diagram | User and System workflow through detection, break, and verification | [View diagram](diagrams/ActivityDiag.drawio.png) |
| Gantt chart | 8 week development schedule | [View chart](diagrams/Blynk_gant_chart.pdf) |
| Progress presentation | Introduction, background, methodology, and current results | [View PDF](BlynkPresentation.pdf) |
| Mid-semester report | Full prototype-stage evaluation report | [View PDF](https://github.com/hardikk-777/UCS503P-202627-Blynk/blob/master/project-report-prototype-stage/blynk_midsem_report.pdf) |

## 📅 Project roadmap

| Stage | Scope | Status |
| --- | --- | --- |
| Requirements & modelling | Proposal, UML, DFD, ER, activity diagrams, Gantt chart | Completed |
| Core detection pipeline | Webcam feed, landmark tracking, blink detection | Active |
| Prototype implementation | Distance calibration, dashboard, break enforcement, history | Upcoming |
| Final delivery | Testing, polish, posture stretch goal, final report | Upcoming |

---

**Blynk** · Software Engineering Project · Academic Year 2026–27
Thapar Institute of Engineering and Technology, Patiala
