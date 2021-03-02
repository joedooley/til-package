import * as React from 'react';

export default function useMemoCompare(next, compare) {
  const previousRef = React.useRef();
  const previous = previousRef.current;

  const isEqual = compare(previous, next);

  React.useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual ? previous : next;
}
