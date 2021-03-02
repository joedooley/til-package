import * as React from 'react';

export default function useMeasure(on = true) {
  const ref = React.useRef();
  const [bounds, set] = React.useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = React.useState(() => {
    if (typeof window !== 'undefined' && window?.ResizeObserver) {
      return new ResizeObserver(function ([entry]) {
        set({
          ...entry.contentRect.toJSON(),
          height: entry.borderBoxSize[0].blockSize,
          width: entry.borderBoxSize[0].inlineSize,
        });
      });
    }
  });

  React.useEffect(() => {
    if (on) {
      ro.observe(ref.current);
    }
    return () => ro.disconnect();
  }, [on, ro]);

  return [ref, bounds];
}
