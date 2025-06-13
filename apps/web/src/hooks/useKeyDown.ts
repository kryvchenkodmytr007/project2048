import { useEffect } from 'react';

export default function useKeyDown(cb: (key: string) => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => cb(e.key);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cb]);
}
