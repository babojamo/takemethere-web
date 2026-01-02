import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Load value only on client
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const item = window.localStorage.getItem(key);
      setStoredValue(item ? (JSON.parse(item) as T) : initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key]);

  // Save to localStorage when value changes, client only
  useEffect(() => {
    try {
      console.log('window', key);
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
