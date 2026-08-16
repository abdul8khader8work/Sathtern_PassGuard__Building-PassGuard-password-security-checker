# PassGuard

PassGuard is a local, privacy-focused password strength checker.

## Privacy

Your password is analyzed locally in your browser. It is never stored or sent to a server.

Breach lookup uses the Have I Been Pwned k-anonymity model and sends only the first 5 characters of a SHA-1 hash.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- zxcvbn

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```