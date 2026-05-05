// REVIEW: Quick explainer of what this file does and why it's there:
// REVIEW: Jest (the test runner CRA ships with) automatically runs this file
// REVIEW: BEFORE every test file. By importing `@testing-library/jest-dom` here,
// REVIEW: every test gets access to nice extra matchers like:
// REVIEW:   expect(button).toBeDisabled();
// REVIEW:   expect(input).toHaveValue('London');
// REVIEW:   expect(card).toBeVisible();
// REVIEW: These are MUCH more readable than the equivalents in raw Jest.
// REVIEW: Lesson: a "setup file" is a common pattern in test frameworks — it's
// REVIEW: where you put one-time configuration that should apply to every test.
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
