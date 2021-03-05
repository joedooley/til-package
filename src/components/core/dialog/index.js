import * as React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import CloseIcon from 'public/assets/icons/close-icon.svg';
import Button from '@components/core/button';
import VisuallyHidden from '@components/core/visually-hidden';

const Dialog = React.forwardRef(
  ({ onClose, ariaLabel, children, hasCloseButton = true, width = '400px', ...rest }, ref) => {
    const variants = {
      visible: { y: 130, opacity: 1 },
      hidden: { y: 0, opacity: 0 },
    };

    return (
      <DialogOverlay
        {...rest}
        onDismiss={onClose}
        initialFocusRef={ref}
        css={{
          background: 'transparent',
        }}
      >
        <motion.div initial="hidden" animate="visible" transition={{ duration: 0.5 }} variants={variants}>
          <DialogContent
            aria-label={ariaLabel}
            css={theme => ({
              backgroundColor: theme.colors.black.primary,
              borderRadius: theme.radii[2],
              boxShadow: theme.shadows.modal,
              padding: '20px',
              position: 'relative',
              width,
            })}
          >
            {hasCloseButton && (
              <Button
                variant="unstyled"
                onClick={onClose}
                ariaLabel="Click button to close the login dialog"
                css={{
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  right: '20px',
                }}
              >
                <VisuallyHidden>Close</VisuallyHidden>
                <CloseIcon aria-hidden />
              </Button>
            )}
            {children}
          </DialogContent>
        </motion.div>
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
