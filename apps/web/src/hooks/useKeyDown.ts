import { useEffect } from 'react';

export default function useKeyDown(cb: (code: string) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => cb(e.code);
    window.addEventListener('keydown', handler, { passive: true });
    return () => window.removeEventListener('keydown', handler);
  }, [cb]);
}
