import "./Footer.css";

// REVIEW: Nice touches in this small component:
// REVIEW:   - Using `<footer>` (semantic HTML) instead of a plain <div> — screen
// REVIEW:     readers and search engines understand the structure better.
// REVIEW:   - Using `new Date().getFullYear()` so the year auto-updates each Jan 1.
// REVIEW:     A common trap is hardcoding "© 2024" — yours is future-proof. Smart!
// REVIEW:   - Using `&mdash;` and `&middot;` (proper typographical characters)
// REVIEW:     instead of plain hyphens. A small detail that polishes the look.
// REVIEW:
// REVIEW: One thought: `getFullYear()` runs on the user's clock. If their date is
// REVIEW: wrong, the copyright is wrong. Not worth fixing for a portfolio piece —
// REVIEW: just an interesting fact about how front-end "current time" works.
function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} SkyCast &mdash; Created by Raheel Shan
        &middot; All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
