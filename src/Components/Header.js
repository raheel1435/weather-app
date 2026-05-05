import './Header.css';

// REVIEW: A few thoughts on this small component:
// REVIEW:
// REVIEW: 1) NAMING CONSISTENCY — the page header says "SkyCast", but package.json
// REVIEW:    calls the project "weather-app", and the browser tab title (in
// REVIEW:    public/index.html) says "React App". Three different names! Pick one
// REVIEW:    name and search/replace it everywhere. Users notice these little
// REVIEW:    inconsistencies — they hurt the polish of an otherwise well-built app.
// REVIEW:
// REVIEW: 2) THE LOGO ICON — `&#9729;` is the cloud emoji ☁. Two improvements:
// REVIEW:    - Wrap it in `<span aria-hidden="true">` so screen readers don't read
// REVIEW:      it as "cloud" right before reading "SkyCast" (avoids duplication).
// REVIEW:    - Emojis render differently across operating systems and even fonts.
// REVIEW:      For a polished brand, look up SVG icons (e.g. Lucide, Heroicons,
// REVIEW:      Phosphor) — they're consistent everywhere.
// REVIEW:
// REVIEW: 3) `<h1>` is great here — every page should have exactly ONE h1 that
// REVIEW:    describes its main subject. Good job using semantic HTML.
function Header() {
  return (
    <header className="header">
      <span className="header-logo">&#9729;</span>
      <h1 className="header-title">SkyCast</h1>
    </header>
  );
}

export default Header;
