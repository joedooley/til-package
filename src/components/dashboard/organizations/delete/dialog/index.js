import * as React from 'react';
import PropTypes from 'prop-types';
import DeleteOrganizationForm from '../form';
import Dialog from '@components/core/dialog';

export default function ConfirmationDialog({ isOpen, onClose, ...rest }) {
  return (
    isOpen && (
      <Dialog
        {...rest}
        onClose={onClose}
        ariaLabel="Dialog with confirmation form to delete organization"
        width="500px"
      >
        <DeleteOrganizationForm onCancel={onClose} />
      </Dialog>
    )
  );
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
