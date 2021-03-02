import * as React from 'react';

import isBrowser from 'utils/isBrowser';

export default function useLocalStorage(key, initialValue) {
  const isClient = isBrowser();

  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = isClient && window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);

      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
