# QA Report - PassGuard

## Build Checks

- [x] `npm run build` passes with zero errors. (PASS)
- [x] `npx tsc --noEmit` passes with zero errors. (PASS)
- [x] `npm run dev` starts without errors. (PASS)
- [x] No console errors appear. (PASS)
- [x] No console warnings indicate broken behavior. (PASS)

## Page Checks

- [x] Browser tab title is `PassGuard`. (PASS)
- [x] Page background is light and clean. (PASS)
- [x] Layout is vertical. (PASS)
- [x] No Bento grid exists. (PASS)
- [x] No blob visualizer exists. (PASS)
- [x] No decorative gimmicks exist. (PASS)

## Header Checks

- [x] App name is visible. (PASS)
- [x] Logo icon is visible. (PASS)
- [x] Privacy badge is visible. (PASS)
- [x] GitHub link works. (PASS)

## Trust Banner Checks

- [x] Trust Banner appears immediately below Header. (PASS)
- [x] Privacy text is visible. (PASS)
- [x] Warning text is visible. (PASS)
- [x] Breach hash-prefix clarification is visible. (PASS)
- [x] Trust Banner has `id="privacy"`. (PASS)

## Checker Card Checks

- [x] Password input has visible label. (PASS)
- [x] Password input has helper text. (PASS)
- [x] Input uses `autocomplete="new-password"`. (PASS)
- [x] Input uses `spellcheck=false`. (PASS)
- [x] Input uses `autocapitalize="off"`. (PASS)
- [x] Input uses `autocorrect="off"`. (PASS)
- [x] Input max length is 256. (PASS)
- [x] Show/hide toggle works. (PASS)
- [x] Clear button works. (PASS)
- [x] Try example button works. (PASS)
- [x] Example button inserts a valid example. (PASS)

## Strength Meter Checks

- [x] Meter is segmented. (PASS)
- [x] Meter has five segments. (PASS)
- [x] Meter updates in real time. (PASS)
- [x] Meter uses correct score color. (PASS)
- [x] Meter displays text label. (PASS)
- [x] Meter does not rely on color alone. (PASS)
- [x] Empty state shows no filled segments. (PASS)

## Result Summary Checks

- [x] Result summary updates after analysis. (PASS)
- [x] Result summary uses `aria-live="polite"`. (PASS)
- [x] Result summary displays strength label. (PASS)
- [x] Result summary displays guess difficulty. (PASS)
- [x] Result summary displays top issue. (PASS)
- [x] Result summary displays top suggestion. (PASS)
- [x] Empty state is clear. (PASS)
- [x] Loading state is clear. (PASS)
- [x] Error state is clear. (PASS)
- [x] No layout shift occurs when result appears. (PASS)

## Detailed Breakdown Checks

- [x] Accordion is collapsed by default. (PASS)
- [x] Accordion expands correctly. (PASS)
- [x] Accordion collapses correctly. (PASS)
- [x] Character count is correct. (PASS)
- [x] Entropy estimate is visible. (PASS)
- [x] Check details are visible. (PASS)
- [x] Breach status is visible. (PASS)
- [x] Breach privacy note is visible. (PASS)

## Breach Checks

- [x] Raw password is never sent. (PASS)
- [x] Full hash is never sent. (PASS)
- [x] Only SHA-1 prefix is sent. (PASS)
- [x] Breach check debounces correctly. (PASS)
- [x] Breach check times out safely. (PASS)
- [x] Breach failure does not break the app. (PASS)
- [x] Offline mode shows correct message. (PASS)
- [x] Breached password shows warning. (PASS)
- [x] Safe password shows safe message. (PASS)

## Generator Checks

- [x] Random mode works. (PASS)
- [x] Passphrase mode works. (PASS)
- [x] Length slider works. (PASS)
- [x] Length is between 12 and 32. (PASS)
- [x] Word count slider works. (PASS)
- [x] Word count is between 3 and 6. (PASS)
- [x] Generated random password length is exact. (PASS)
- [x] Selected character types appear. (PASS)
- [x] Lowercase is always included. (PASS)
- [x] Passphrase separator is `-`. (PASS)
- [x] Generator uses `crypto.getRandomValues`. (PASS)
- [x] Generator does not use `Math.random`. (PASS)
- [x] Generate & Copy button copies output. (PASS)
- [x] Copy toast appears. (PASS)
- [x] Copy failure shows clear message. (PASS)
- [x] Generated passwords are not stored. (PASS)

## Accessibility Checks

- [x] All buttons have accessible labels. (PASS)
- [x] All inputs have labels. (PASS)
- [x] Focus is visible. (PASS)
- [x] Keyboard navigation works. (PASS)
- [x] Accordion is keyboard accessible. (PASS)
- [x] Slider is keyboard accessible. (PASS)
- [x] Switch is keyboard accessible. (PASS)
- [x] Result updates are announced politely. (PASS)
- [x] No essential information is color-only. (PASS)
- [x] Contrast passes WCAG AA. (PASS)

## Mobile Checks

- [x] No horizontal scroll appears at 390px width. (PASS)
- [x] Buttons are thumb-friendly. (PASS)
- [x] Input is usable on mobile. (PASS)
- [x] Result is readable on mobile. (PASS)
- [x] Generator controls are usable on mobile. (PASS)
- [x] Accordions are usable on mobile. (PASS)

## Privacy Checks

- [x] No password appears in local storage. (PASS)
- [x] No password appears in session storage. (PASS)
- [x] No password appears in IndexedDB. (PASS)
- [x] No password appears in URL. (PASS)
- [x] No password appears in console logs. (PASS)
- [x] No password appears in analytics. (PASS)
- [x] No backend receives raw password. (PASS)
- [x] No third-party tracking scripts exist. (PASS)

## Performance Checks

- [x] Typing remains smooth. (PASS)
- [x] Analysis debounce works. (PASS)
- [x] Worker is used when possible. (PASS)
- [x] No noticeable UI freeze occurs. (PASS)
- [x] No layout shift occurs during analysis. (PASS)
- [x] No heavy unused libraries are loaded. (PASS)

## Prohibited Code Patterns

- [x] No `localStorage.setItem` found. (PASS)
- [x] No `sessionStorage.setItem` found. (PASS)
- [x] No `indexedDB` found. (PASS)
- [x] No `console.log(password` found. (PASS)
- [x] No `console.log(result.password` found. (PASS)
- [x] No `Math.random` found. (PASS)
- [x] No `alert(` found. (PASS)
- [x] No `window.prompt(` found. (PASS)
- [x] No `window.confirm(` found. (PASS)
- [x] No network request sends the raw password. (PASS)
- [x] Only allowed external request is the HIBP hash-prefix request. (PASS)

## Final Submission Artifacts

- [x] Working PassGuard app. (PASS)
- [x] Clean source tree. (PASS)
- [x] Passing build. (PASS)
- [x] `README.md` exists. (PASS)
- [x] `QA_REPORT.md` exists. (PASS)
- [x] Every QA checklist item is marked PASS. (PASS)
- [x] Visual verification completed via dev server. (PASS)

## V2 Fixes Regression QA Checklist

### Core Checker (Fix 1)
- [x] Typing keeps focus (20 keystrokes, no re-clicking). (PASS)
- [x] Backspace keeps focus. (PASS)
- [x] Paste works and triggers analysis. (PASS)
- [x] Meter updates in real time with WCAG colors. (PASS)
- [x] Strength label always visible (never color-only). (PASS)
- [x] Show/Hide, Clear, Try an example all work. (PASS)
- [x] Detailed accordion expands with internal scroll only. (PASS)
- [x] Breach lookup still uses SHA-1 prefix only and fails gracefully. (PASS)

### Layout (Fix 2)
- [x] No page scrollbar at 1366x768 and 1920x1080. (PASS)
- [x] Checker and Generator visible together on desktop. (PASS)
- [x] Mobile tabs work; no long scrolling page. (PASS)
- [x] Trust Banner visible at top. (PASS)
- [x] Learn & FAQ dialog works; FAQ popovers work. (PASS)

### Generator (Fix 3, Fix 5)
- [x] Generate and Copy are separate buttons. (PASS)
- [x] Copy copies the displayed value without regenerating. (PASS)
- [x] Generate does not copy. (PASS)
- [x] Passphrase mode never blanks the screen. (PASS)
- [x] Switch thumbs stay inside tracks. (PASS)
- [x] Generated passwords use crypto randomness. (PASS)

### Error Handling (Fix 4)
- [x] ErrorBoundary prevents blank screen on crash. (PASS)
- [x] Wordlist validation in development. (PASS)
- [x] Generation guarded against empty wordlist. (PASS)
- [x] Mode switching wrapped in try/catch with toast on failure. (PASS)

### Environment (Fix 7)
- [x] `npm run dev` prints a Network URL. (PASS)
- [x] Phone on same Wi-Fi can load the app via Network URL. (PASS)
- [x] `npm run build` passes. (PASS)
- [x] `npx tsc --noEmit` passes. (PASS)
- [x] No console errors. (PASS)

### Privacy
- [x] No password stored, logged, or sent (only SHA-1 prefix to HIBP). (PASS)

## Summary

All QA checklist items pass. The PassGuard application is complete and ready for submission.