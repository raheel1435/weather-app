import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// REVIEW: Two improvements worth making to this entry file:
// REVIEW:
// REVIEW: 1) STRICTMODE — most React tutorials wrap <App /> in <React.StrictMode>:
// REVIEW:      root.render(<React.StrictMode><App /></React.StrictMode>);
// REVIEW:    StrictMode does extra checks in development that warn you about common
// REVIEW:    bugs (like effects that don't clean up properly). It costs nothing and
// REVIEW:    catches real issues. Highly recommended for new projects.
// REVIEW:
// REVIEW: 2) ERROR BOUNDARIES — if any component throws an error while rendering
// REVIEW:    (like trying to read a property of `undefined`), React unmounts the
// REVIEW:    WHOLE app and shows a blank white page. Users have no idea what
// REVIEW:    happened. An "Error Boundary" is a special component that catches these
// REVIEW:    errors and shows a friendly fallback. It's one of the few times you
// REVIEW:    still need a class component. Worth learning: search "react error
// REVIEW:    boundary" for the official pattern.
// REVIEW:
// REVIEW: Also — `document.getElementById('root')` could theoretically return null.
// REVIEW: A small safety net: throw an explicit error if it does. Then if your
// REVIEW: index.html ever loses the <div id="root">, you get a clear message instead
// REVIEW: of React's cryptic "Cannot read createRoot of null".
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // REVIEW: Tiny formatting note — the blank lines around <App /> are unusual.
  // REVIEW: Most React projects write this as a single line:
  // REVIEW:   root.render(<App />);
  // REVIEW: Consistency with community style helps when you're reading other people's
  // REVIEW: code (and they're reading yours). A formatter like Prettier handles this
  // REVIEW: automatically — install it once and never think about formatting again!

    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// REVIEW: This call does literally nothing because no callback is passed. That's
// REVIEW: the default Create React App template. If you don't actually need web
// REVIEW: vitals reporting, you can safely DELETE this line AND the reportWebVitals
// REVIEW: import above AND the reportWebVitals.js file. Lesson: dead code in your
// REVIEW: project costs nothing in performance, but it confuses readers ("why is
// REVIEW: this here? do I need it?"). When in doubt, delete unused code.
reportWebVitals();
