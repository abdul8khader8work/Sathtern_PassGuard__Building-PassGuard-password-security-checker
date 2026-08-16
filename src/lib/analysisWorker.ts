import { analyzePassword } from './analysis';

self.onmessage = (e: MessageEvent) => {
  if (e.data && e.data.type === 'analyze') {
    try {
      const result = analyzePassword(e.data.password);
      self.postMessage({ type: 'result', result });
    } catch (err) {
      self.postMessage({ type: 'error', message: 'Analysis failed' });
    }
  }
};