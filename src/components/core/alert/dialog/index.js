import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Button from '@components/core/button';
import BaseDialog from '@components/core/dialog';

export default function AlertDialog({
  onClose,
  onRedirect,
  ariaLabel,
  heading = 'Any information you’ve entered will be lost.',
  children,
  ...rest
}) {
  const cancelButtonRef = React.useRef();

  return (
    <BaseDialog onClose={onClose} ariaLabel={ariaLabel} ref={cancelButtonRef} hasCloseButton={false} {...rest}>
      <div css={css({ display: 'flex', flexDirection: 'column', alignItems: 'center' })}>
        <h2
          css={theme => ({
            color: theme.colors.black.primary,
            fontSize: theme.fontSizes[4],
            fontWeight: theme.fontWeights.bold,
            lineHeight: theme.lineHeights.default,
            marginBottom: theme.space[4],
          })}
        >
          Are you sure?
        </h2>
        <p
          css={theme => ({
            marginBottom: theme.space[4],
          })}
        >
          {heading ?? 'Any information you’ve entered will be lost.'}
        </p>

        {children ?? (
          <div
            css={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            })}
          >
            <Button
              onClick={onRedirect}
              variant="outline"
              ariaLabel="Click to navigate to the class schedule page. All changes to this form will be lost"
              css={theme => ({
                marginRight: theme.gutters[4],
              })}
            >
              Go Back
            </Button>
            <Button
              ref={cancelButtonRef}
              onClick={onClose}
              variant="warning"
              ariaLabel="Click to close the alert dialog and continue editing the form"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </BaseDialog>
  );
}

AlertDialog.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onRedirect: PropTypes.func,
  initialFocusRef: PropTypes.object,
  heading: PropTypes.string,
  children: PropTypes.node,
};
