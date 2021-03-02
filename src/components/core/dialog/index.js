import * as React from 'react';
import PropTypes from 'prop-types';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import CloseIcon from 'public/assets/icons/close-icon.svg';
import VisuallyHidden from '@components/core/visually-hidden';

const Dialog = React.forwardRef(
  ({ onClose, ariaLabel, children, hasCloseButton = true, width = '400px', ...rest }, ref) => {
    return (
      <DialogOverlay
        {...rest}
        onDismiss={onClose}
        initialFocusRef={ref}
        css={theme => ({
          background: theme.colors.black.backdrop,
        })}
      >
        <DialogContent
          aria-label={ariaLabel}
          css={theme => ({
            borderRadius: theme.radii[2],
            boxShadow: theme.shadows.modal,
            marginTop: '154px',
            padding: '20px',
            position: 'relative',
            width,
          })}
        >
          {hasCloseButton && (
            <button
              onClick={onClose}
              css={theme => ({
                background: theme.colors.white.primary,
                border: 0,
                cursor: 'pointer',
                display: 'flex',
                margin: 0,
                padding: 0,
                position: 'absolute',
                right: '20px',
              })}
            >
              <VisuallyHidden>Close</VisuallyHidden>
              <CloseIcon aria-hidden />
            </button>
          )}
          {children}
        </DialogContent>
      </DialogOverlay>
    );
  }
);

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
  hasCloseButton: PropTypes.bool,
  width: PropTypes.string,
};

Dialog.displayName = 'Dialog';

export default Dialog;
