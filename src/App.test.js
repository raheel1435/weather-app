// REVIEW: This is the default Create React App test, and it's BROKEN your
// REVIEW: app doesn't have a "learn react" link anywhere, so `npm test` will fail
// REVIEW: as soon as you run it. Try it: `npm test` → expect a red error.
// REVIEW:
// REVIEW: This is a really useful learning moment! Tests are a programmer's best
// REVIEW: friend, but only if they describe what your app ACTUALLY does. Some
// REVIEW: ideas for tests that would actually exercise your code:
// REVIEW:
// REVIEW:   test('renders the SkyCast header', () => {
// REVIEW:     render(<App />);
// REVIEW:     expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SkyCast');
// REVIEW:   });
// REVIEW:
// REVIEW:   test('shows an error when search submitted empty', async () => {
// REVIEW:     render(<App />);
// REVIEW:     await userEvent.click(screen.getByRole('button', { name: /search/i }));
// REVIEW:     expect(screen.getByText(/please enter a city/i)).toBeInTheDocument();
// REVIEW:   });
// REVIEW:
// REVIEW: For testing the FETCH calls, look up "MSW" (Mock Service Worker) — it
// REVIEW: lets you intercept fetch() in tests and return fake API data. That way
// REVIEW: your tests don't depend on the real OpenWeatherMap API being up.
// REVIEW:
// REVIEW: Lesson: writing tests forces you to think about what your component is
// REVIEW: SUPPOSED to do. They're documentation that runs.
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
