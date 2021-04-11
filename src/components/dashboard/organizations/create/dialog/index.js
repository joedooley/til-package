import * as React from 'react';
import PropTypes from 'prop-types';
import CreateOrganizationForm from '../form';
import Dialog from '@components/core/dialog';

export default function CreateOrganizationDialog({ isOpen, onClose, ...rest }) {
  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with form to create an organization">
        <CreateOrganizationForm onCancel={onClose} />
      </Dialog>
    )
  );
}

CreateOrganizationDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
