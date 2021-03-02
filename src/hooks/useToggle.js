import * as React from 'react';

export default function useToggle(initialValue = false) {
  return React.useReducer(state => !state, initialValue);
}
