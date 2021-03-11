import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Dialog from '@components/core/dialog';
import useForm from '../forms/create-post/useForm';
import CreatePostForm from '../forms/create-post';

export default function CreatePostDialog({ isOpen, onClose, ...rest }) {
  const formProps = useForm();

  return (
    isOpen && (
      <Dialog {...rest} onClose={onClose} ariaLabel="Dialog with form to create new posts" width="700px">
        <CreatePostForm formProps={formProps} />
      </Dialog>
    )
  );
}

CreatePostDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
