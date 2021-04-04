import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import LoginVerificationForm from '../../forms/verification';
import Dialog from '@components/core/dialog';

export default function VerificationDialog({ isOpen, onClose, verificationId, ...rest }) {
  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with login options" width="400px">
        <LoginVerificationForm verificationId={verificationId} />
      </Dialog>
    )
  );
}

VerificationDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  verificationId: PropTypes.any.isRequired,
};
