import { useState, useEffect, useRef } from 'react';
import { analyzePassword } from '../lib/analysis';
import type { AnalysisResult, BreachStatus } from '../lib/types';

export function usePasswordAnalysis() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [breachStatus, setBreachStatus] = useState<BreachStatus>('idle');
  
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize Worker with Vite-specific syntax
  useEffect(() => {
    try {
      workerRef.current = new Worker(
        new URL('../lib/analysisWorker.ts', import.meta.url),
        { type: 'module' }
      );
      
      workerRef.current.onmessage = (e: MessageEvent) => {
        if (e.data?.type === 'result') {
          setResult(e.data.result);
        }
      };
      
      workerRef.current.onerror = (err) => {
        console.error('Worker error, falling back to main thread:', err);
        workerRef.current = null;
      };
    } catch (err) {
      console.warn('Worker init failed, using main thread:', err);
      workerRef.current = null;
    }

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // Debounced Analysis with Main-Thread Fallback
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!password) {
      setResult(null);
      setBreachStatus('idle');
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'analyze', password });
      } else {
        // Synchronous fallback if worker fails
        try {
          const res = analyzePassword(password);
          setResult(res);
        } catch (err) {
          console.error('Main thread analysis failed:', err);
        }
      }
    }, 200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [password]);

  return {
    password,
    setPassword,
    isVisible,
    setIsVisible,
    result,
    breachStatus,
    setBreachStatus,
    onClear: () => {
      setPassword('');
      setResult(null);
      setBreachStatus('idle');
    }
  };
}