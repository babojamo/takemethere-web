import { useEffect, useState, useRef } from 'react';

export function useIdle(timeout = 300000) {
  // default 5 minutes
  const [isIdle, setIsIdle] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    setIsIdle(false);
    timer.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // start at mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [timeout]);

  return isIdle;
}
