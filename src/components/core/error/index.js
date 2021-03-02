import * as React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import Dialog from '@components/base/Dialog/Component';
import * as Styles from './styles/index.styles';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const [isShowing, setIsShowing] = React.useState(false);

  React.useEffect(() => {
    setIsShowing(!!error);

    return () => setIsShowing(false);
  }, [error]);

  return (
    <Dialog name="ErrorFallback" ariaLabel="Error Dialog" isShowing={isShowing} onClose={resetErrorBoundary}>
      <Styles.Container role="alert">
        <Styles.Heading>Something Went Wrong</Styles.Heading>
        <Styles.Message>{error.message}</Styles.Message>
        <Styles.Button onClick={resetErrorBoundary} type="button" role="button">
          Try again
        </Styles.Button>
      </Styles.Container>
    </Dialog>
  );
};

export default function Error({ onReset, children }) {
  const handleReset = React.useCallback(() => {
    if (onReset) {
      return onReset();
    }

    window.location.reload();
  }, [onReset]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      {children}
    </ErrorBoundary>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
  resetErrorBoundary: PropTypes.func,
};

Error.propTypes = {
  onReset: PropTypes.func,
  children: PropTypes.node,
};
