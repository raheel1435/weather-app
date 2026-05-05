import { useState } from "react";
import "./SearchBar.css";

// REVIEW: Nicely structured a controlled input with form-based submission. That's
// REVIEW: exactly the React pattern you want here. Good job!
// REVIEW:
// REVIEW: A few small upgrades worth learning about:
// REVIEW:
// REVIEW: 1) ACCESSIBILITY there's no <label> for this input. Screen reader users
// REVIEW:    will hear something like "edit text, blank" with no clue what to type.
// REVIEW:    Add a visually-hidden label:
// REVIEW:      <label htmlFor={inputId} className="visually-hidden">Search cities</label>
// REVIEW:    With a class that hides it from sighted users but keeps it for screen readers.
// REVIEW:
// REVIEW: 2) MOBILE-FRIENDLY ATTRIBUTES there are HTML attributes designed
// REVIEW:    specifically for search inputs that improve mobile UX:
// REVIEW:      type="search"          → many browsers show an "x" to clear the field
// REVIEW:      inputMode="search"     → mobile keyboards show a search-oriented layout
// REVIEW:      enterKeyHint="search"  → the Enter key on mobile says "Search"
// REVIEW:      autoComplete="off"     → stops the browser auto-filling old searches
// REVIEW:    Small details, but they noticeably improve the experience on phones.
// REVIEW:
// REVIEW: 3) PROPTYPES — try installing prop-types and adding:
// REVIEW:      SearchBar.propTypes = { onSearch: PropTypes.func.isRequired };
// REVIEW:    If a parent forgets to pass `onSearch`, the form silently does nothing
// REVIEW:    on submit. PropTypes warns you in the console — saves debugging time.
function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  // REVIEW: Two small thinking points here:
  // REVIEW:
  // REVIEW: 1) You trim before passing to onSearch good, but notice that the user
  // REVIEW:    can submit a string of just spaces ("   "), which becomes "" after
  // REVIEW:    trim. Your parent (App.js) checks for !cityName, so this works. But
  // REVIEW:    consider: should the button even be CLICKABLE when the input is empty
  // REVIEW:    or whitespace? Try `disabled={input.trim().length === 0}` on the
  // REVIEW:    button below — it gives users a visual cue that they need to type.
  // REVIEW:
  // REVIEW: 2) The function abbreviates `event` to `e`. Both styles are common, but
  // REVIEW:    pick one and use it everywhere in the project. Right now you have
  // REVIEW:    `e` here and `e` in App.js consistent, good!
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for a city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* REVIEW: Notice the button has no `disabled` state when the app is */}
      {/* REVIEW: already loading a request, users can hammer the button and queue */}
      {/* REVIEW: up multiple fetches. Pass an `isLoading` prop from App and use */}
      {/* REVIEW: `disabled={isLoading || input.trim() === ''}` to prevent both */}
      {/* REVIEW: empty submissions and double-fires. */}
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
