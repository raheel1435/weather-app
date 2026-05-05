// REVIEW: This file is part of the default CRA template. A few things worth
// REVIEW: knowing about it:
// REVIEW:
// REVIEW: 1) WHAT IT DOES — "Web Vitals" are Google's official measurements of
// REVIEW:    user-perceived performance: how fast the page draws (FCP, LCP), how
// REVIEW:    much the layout shifts as it loads (CLS), and how snappy interactions
// REVIEW:    feel (FID). Real apps send these numbers to an analytics service to
// REVIEW:    track performance over time.
// REVIEW:
// REVIEW: 2) IT'S NOT DOING ANYTHING — your index.js calls `reportWebVitals()`
// REVIEW:    with no callback, and the `if` guard above means... nothing happens.
// REVIEW:    If you don't actually need this, you can delete the import in
// REVIEW:    index.js, the call below it, AND this whole file. Lesson: dead code
// REVIEW:    creates noise — when you finish the project, prune what you don't use.
// REVIEW:
// REVIEW: 3) IT'S ALSO OUTDATED — the `web-vitals` library renamed FID → INP.
// REVIEW:    The newer functions are `onCLS`, `onLCP`, `onINP`, `onFCP`, `onTTFB`.
// REVIEW:    Don't worry about updating it for this project; just be aware that
// REVIEW:    the `getFID` you see here is from an older version of the API.
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
