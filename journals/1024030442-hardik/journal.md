# Journal — Hardik Chandna (1024030442)

## September 2026

**Week 1 — Project setup and requirements modelling**
Finalized the project idea (Blynk) after comparing it against an IoT/edge-AI alternative. Wrote the project proposal in LaTeX, merging the professor's required framework with the general proposal guide. Built the UML use case diagram, DFD (Level 0 through 2), and set up the GitHub repository following the course template.

**Week 2 — Core detection pipeline**
Set up the React + Vite project structure under `code/blynk-app`. Implemented live webcam capture using `getUserMedia` and integrated MediaPipe's Face Landmarker model for real-time facial landmark detection (468 points), running entirely in-browser via WebAssembly. Implemented blink detection using the eye aspect ratio (EAR) technique on eyelid landmark points, with a live blink counter. Tested the detection across different lighting conditions and made initial adjustments to improve the reliability of the detection.

**Week 3 — Additional diagrams and GitHub Pages**
Built the ER diagram and activity/swimlane diagram in draw.io, following the professor's example notation from the whiteboard session. Set up the GitHub Pages site using the template's MkDocs workflow. Initially encountered a source-configuration issue because the workflow deploys to a `gh-pages` branch rather than through native GitHub Actions deployment. Resolved the issue by switching the Pages source to deploy from the `gh-pages` branch directly.

**Week 4 — Improving blink detection and application interface**
Worked on improving the reliability of the blink detection pipeline. Tested the EAR-based detection with different eye movements and adjusted the threshold and timing conditions to reduce false blink counts. Added basic handling for cases where a face is not detected or the webcam is unavailable. Continued developing the React interface around the detection pipeline and organized the application into separate components for easier maintenance and further development.

**Week 5 — Real-time monitoring and testing**
Integrated the detection components into a more complete real-time monitoring workflow. Tested the application continuously using the webcam and checked whether blink detection remained stable during normal movement, changes in head position, and variations in lighting. Identified a few edge cases where rapid eye movements or temporary landmark detection issues could affect the counter and made corresponding adjustments. Also cleaned up the project structure and code to make the implementation easier to debug and extend.

**Week 6 — Documentation, debugging and project refinement**
Focused on debugging the current implementation and documenting the work completed so far. Reviewed the project requirements against the implemented features and identified areas that still need improvement. Fixed minor issues in the frontend and detection logic and tested the application again after the changes. Updated the project documentation and GitHub Pages content with the current implementation details. Planned the next stage of development, including further improving detection accuracy and completing the remaining project functionality.
