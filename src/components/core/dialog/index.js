import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import CloseIcon from 'public/assets/icons/close-icon.svg';
import { Button } from '@components/core/html';
import VisuallyHidden from '@components/core/visually-hidden';

const Dialog = React.forwardRef(
  ({ onClose, ariaLabel, children, hasCloseButton, height, width = '400px', ...rest }, ref) => {
    const variants = {
      hidden: { y: 0, opacity: 0 },
      visible: { y: 130, opacity: 1 },
    };

    return (
      <DialogOverlay
        {...rest}
        onDismiss={onClose}
        initialFocusRef={ref}
        css={css`
          background: transparent;
        `}
      >
        <motion.div initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5 }} variants={variants}>
          <DialogContent
            aria-label={ariaLabel}
            css={theme => css`
              background-color: ${theme.colors.black[400]};
              border-radius: ${theme.radii[2]};
              box-shadow: ${theme.shadows.modal};
              margin: auto;
              min-height: ${height ?? 'auto'};
              padding: 20px;
              position: relative;
              width: ${width};
            `}
          >
            {hasCloseButton && (
              <Button
                variant="unstyled"
                onClick={onClose}
                ariaLabel="Click button to close the login dialog"
                css={css`
                  margin: 0;
                  padding: 0;
                  position: absolute;
                  right: 20px;
                `}
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
  height: PropTypes.string,
  width: PropTypes.string,
};

Dialog.displayName = 'Dialog';

export default Dialog;
