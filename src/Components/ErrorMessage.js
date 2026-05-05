import "./ErrorMessage.css";

// REVIEW: Nice clean component. Two ideas to take it further:
// REVIEW:
// REVIEW: 1) ANNOUNCE THE ERROR — for users with screen readers, errors that just
// REVIEW:    silently appear on screen are easy to miss. Add `role="alert"` to the
// REVIEW:    outer div: it tells assistive tech to announce the message immediately
// REVIEW:    when it appears. Test it with VoiceOver (Cmd+F5 on macOS): search for
// REVIEW:    a bad city, listen for the error to be read aloud — magic!
// REVIEW:
// REVIEW: 2) THE WARNING ICON — `&#9888;` is the ⚠ symbol. Same advice as the
// REVIEW:    cloud emoji in Header.js: wrap it in `aria-hidden="true"` so screen
// REVIEW:    readers don't say "warning sign" before reading the actual message
// REVIEW:    (which already conveys the warning).
// REVIEW:
// REVIEW: 3) GUARD AGAINST EMPTY MESSAGES — what happens if `<ErrorMessage />` is
// REVIEW:    rendered without a `message`? Or with `message=""`? Right now you'd see
// REVIEW:    an empty red box on the page. Quick fix at the top:
// REVIEW:      if (!message) return null;
// REVIEW:    Lesson: think about what your component should do for "boundary"
// REVIEW:    inputs (empty, missing, very long). It's part of writing robust code.
function ErrorMessage({ message }) {
  return (
    <div className="error-card">
      <span className="error-icon">&#9888;</span>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
