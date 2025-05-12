import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      if (!controller.signal.aborted) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value, delay]);

  return debouncedValue;
}
