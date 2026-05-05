import { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import WeatherDisplay from './Components/WeatherDisplay';
import Loader from './Components/Loader';
import ErrorMessage from './Components/ErrorMessage';
import './App.css';

// REVIEW: Nice job structuring this app with clear, single-purpose components
// REVIEW: (Header, SearchBar, WeatherDisplay, Loader, ErrorMessage, Footer). Splitting
// REVIEW: things up like this is one of the most important React habits — it makes
// REVIEW: each piece small enough to understand at a glance. Keep doing this!
function App() {
  // REVIEW: Five `useState` calls in a row is fine for a small app, but as you grow
  // REVIEW: you'll notice that `loading`, `error`, and `weather` are really three sides
  // REVIEW: of one thing: "the state of the request". Look up the `useReducer` hook —
  // REVIEW: it lets you describe states like `idle | loading | success | error` so
  // REVIEW: that impossible combinations (loading AND error at the same time) can't
  // REVIEW: happen. Worth exploring once you're comfortable with `useState`.
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgImage, setBgImage] = useState('');

  // REVIEW: Subtle bug to watch for! `useEffect` only re-runs when `query` CHANGES.
  // REVIEW: Try this: search "London", then search "London" again. Nothing happens
  // REVIEW: the second time — because setQuery('London') when query is already
  // REVIEW: 'London' is a no-op. React skips re-rendering, so the effect never fires.
  // REVIEW: Two common fixes:
  // REVIEW:   (a) Just call fetchWeather() directly inside handleSearch — no effect
  // REVIEW:       needed. Effects are best for syncing with external systems; user
  // REVIEW:       clicks are events and belong in event handlers.
  // REVIEW:   (b) Keep a counter that increments every search, add it to the dep
  // REVIEW:       array. Each click counts as a "new" search.
  // REVIEW: Option (a) is simpler and is the modern React community recommendation.
  useEffect(() => {
    if (!query) return;

    // REVIEW: A common pitfall with fetch + useEffect: race conditions. If the user
    // REVIEW: types "London" then quickly "Paris", BOTH requests fly off and they may
    // REVIEW: come back in any order — the slower London response could overwrite the
    // REVIEW: newer Paris one. The fix is `AbortController`:
    // REVIEW:   const controller = new AbortController();
    // REVIEW:   fetch(url, { signal: controller.signal });
    // REVIEW:   return () => controller.abort();   // cleanup function
    // REVIEW: useEffect cleanup is one of the most powerful React features — worth
    // REVIEW: reading the React docs section on it. (Search: "react useEffect cleanup".)
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError('');
        setWeather(null);
        setBgImage('');

        // REVIEW: Two improvements to learn about for this fetch URL:
        // REVIEW:
        // REVIEW: 1) `query` here goes straight into a URL without encoding. A city
        // REVIEW:    like "São Paulo" or one with "&" in it could break the request.
        // REVIEW:    Use `encodeURIComponent(query)` (you already do this for the
        // REVIEW:    Unsplash call below — be consistent across the file!).
        // REVIEW:    Even cleaner: use the URL class:
        // REVIEW:      const url = new URL('https://api.openweathermap.org/data/2.5/weather');
        // REVIEW:      url.searchParams.set('q', query);
        // REVIEW:      url.searchParams.set('units', 'metric');
        // REVIEW:      url.searchParams.set('appid', process.env.REACT_APP_WEATHER_API_KEY);
        // REVIEW:    It encodes everything for you and reads more clearly.
        // REVIEW:
        // REVIEW: 2) Security note: any env var starting with REACT_APP_ gets bundled
        // REVIEW:    into the JS file your users download. Open DevTools on a deployed
        // REVIEW:    site and you can read the API key in plain text. For learning
        // REVIEW:    that's fine, but for real apps the pattern is to put a tiny
        // REVIEW:    server in between (Vercel/Netlify/Cloudflare make this very
        // REVIEW:    easy) so the key never reaches the browser. Lesson: anything in
        // REVIEW:    front-end code is PUBLIC.
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );

        if (!res.ok) {
          // REVIEW: Good thinking — pulling the message from the API is much better
          // REVIEW: than just saying "something went wrong". One careful step further:
          // REVIEW: `res.json()` itself can throw if the body isn't valid JSON (some
          // REVIEW: errors return HTML pages). To be safe, wrap it in try/catch and
          // REVIEW: fall back to a status-based message like `HTTP ${res.status}`.
          // REVIEW: Also: showing raw API messages directly to users can be confusing
          // REVIEW: ("city not found" is OK, but technical errors like "Invalid API
          // REVIEW: key" leak implementation details). Think about mapping known error
          // REVIEW: codes to friendly user-facing messages.
          const errorData = await res.json();
          throw new Error(errorData.message);
        }

        const data = await res.json();
        setWeather(data);
        // REVIEW: Subtle issue: this `await` is missing! `fetchBackground` is async,
        // REVIEW: so calling it without `await` means the catch block above won't see
        // REVIEW: any error it throws (it's a "fire-and-forget"). That's actually OK
        // REVIEW: HERE because the function has its own try/catch, but it's worth
        // REVIEW: knowing the rule: if you don't await an async function, errors from
        // REVIEW: it become "unhandled promise rejections" — invisible bugs.
        fetchBackground(query, data.weather[0].main);
      } catch (err) {
        // REVIEW: Heads up: `err.message` here could be anything — including scary
        // REVIEW: technical text like "Failed to construct 'URL'". A safer pattern:
        // REVIEW: show a friendly message to the user, and use `console.error(err)`
        // REVIEW: so YOU can still see the real error in DevTools when debugging.
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query]);

  // REVIEW: Two thoughts about this function:
  // REVIEW:
  // REVIEW: 1) Defining it INSIDE the App component means it's recreated on every
  // REVIEW:    render. That's fine for performance here (it's tiny), but it means
  // REVIEW:    `fetchBackground` could be moved OUTSIDE the component entirely
  // REVIEW:    (alongside imports) — it doesn't use any state directly, only takes
  // REVIEW:    args and calls setBgImage. To make that work, you'd pass setBgImage
  // REVIEW:    in. Pure functions outside components are easier to test and reason
  // REVIEW:    about.
  // REVIEW:
  // REVIEW: 2) Using `await` here for a fetch you don't really need to wait on works,
  // REVIEW:    but consider: what if the user searches a NEW city while the bg image
  // REVIEW:    is still loading? You'll get the OLD city's photo as background under
  // REVIEW:    the NEW city's data. Same race condition as the weather fetch — also
  // REVIEW:    fixable with AbortController.
  const fetchBackground = async (cityName, condition) => {
    try {
      const searchQuery = encodeURIComponent(`${cityName} ${condition}`);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setBgImage(data.results[0].urls.full);
      }
      // REVIEW: 👍 Good decision to fail silently here — the background image is
      // REVIEW: a "nice to have", and crashing the app because Unsplash is slow would
      // REVIEW: be a bad user experience. Lesson: not every error needs to be shown
      // REVIEW: to the user. Match the visibility of an error to its impact.
      // REVIEW: One small upgrade: still log it with `console.warn(err)` so YOU can
      // REVIEW: see it in DevTools while developing. Silent for users, visible for you.
    } catch {
      // background image is non-critical, fail silently
    }
  };

  // REVIEW: This handler does two things — validate, and update state. That's a
  // REVIEW: nice example of a wrapper that EARNS its name (compared to just passing
  // REVIEW: setQuery directly). Good thinking.
  // REVIEW: One small observation: `cityName` here has already been trimmed by
  // REVIEW: SearchBar before being passed in. So this `if (!cityName)` catches when
  // REVIEW: someone submits an entirely empty string. Be aware: trim happens once,
  // REVIEW: in the child. If you ever change SearchBar, this guard might silently
  // REVIEW: stop working. Defensive option: `if (!cityName?.trim()) ...` here too.
  const handleSearch = (cityName) => {
    if (!cityName) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    setQuery(cityName);
  };

  return (
    // REVIEW: Setting a CSS custom property via the `style` prop (`--bg-image: ...`)
    // REVIEW: is a clever, modern technique — well done! This is exactly how
    // REVIEW: production apps integrate JS-driven values with CSS.
    // REVIEW: Tiny watch-out: if `bgImage` ever contained a quote or a backslash
    // REVIEW: (rare for image URLs but possible), it could break the CSS. URL.encode
    // REVIEW: or wrapping in quotes (`url("${bgImage}")`) is a robust habit.
    <div
      className={`App${bgImage ? ' has-bg' : ''}`}
      style={bgImage ? { '--bg-image': `url(${bgImage})` } : {}}
    >
      <Header />
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        {/* REVIEW: Notice: when loading, you only show <Loader />, but the previous */}
        {/* REVIEW: weather display has already been cleared (you set weather to null */}
        {/* REVIEW: at the top of fetchWeather). That means the screen FLASHES — */}
        {/* REVIEW: results disappear, then a spinner, then new results. Many apps */}
        {/* REVIEW: keep the OLD result visible while the new one loads, just dimmed */}
        {/* REVIEW: out. Try it: don't clear `weather` at the start of fetchWeather, */}
        {/* REVIEW: and render: {loading ? <Loader /> : null} alongside {weather && ...}. */}
        {/* REVIEW: This is a small UX upgrade that makes apps feel much smoother. */}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherDisplay data={weather} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
