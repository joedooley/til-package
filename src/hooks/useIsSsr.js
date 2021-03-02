import * as React from 'react';

/**
 * Since useEffect does not run on the server. This hook allows us to render components that
 * use `window` fully on the server and avoid checksum client/server mismatch warnings.
 *
 * @returns {Boolean}
 */
export default function useIsSsr() {
  const [isSsr, setIsSsr] = React.useState(true);

  React.useEffect(() => {
    setIsSsr(false);
  }, []);

  return isSsr;
}
