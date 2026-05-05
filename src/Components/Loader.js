import "./Loader.css";

// REVIEW: This loader works visually,but right now it's INVISIBLE to screen
// REVIEW: reader users. They'll experience the page as: "Search button"... [silence
// REVIEW: while the request is loading]... "Weather card with city name". They have
// REVIEW: no idea why the page paused.
// REVIEW:
// REVIEW: Two small attributes turn this from "a spinning circle" into something
// REVIEW: every user can experience:
// REVIEW:
// REVIEW:   <div className="loader" role="status" aria-live="polite">
// REVIEW:     <div className="spinner" aria-hidden="true"></div>
// REVIEW:     <span className="visually-hidden">Loading weather…</span>
// REVIEW:   </div>
// REVIEW:
// REVIEW: What each piece does:
// REVIEW:   - role="status"        → tells assistive tech "this is a status message"
// REVIEW:   - aria-live="polite"   → announces the message when it appears
// REVIEW:   - aria-hidden          → hides the visual spinner (it's not informative)
// REVIEW:   - visually-hidden span → the text "Loading weather…" is read aloud but
// REVIEW:                            invisible on screen
// REVIEW:
// REVIEW: This is what accessibility looks like when it's done right — invisible
// REVIEW: to most users, life-changing for those who need it.
function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;
