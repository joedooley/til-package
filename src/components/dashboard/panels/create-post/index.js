import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { Heading } from '@components/core/html';
import Panel from '@components/core/panel';
import useForm from '../../forms/create-post/useForm';
import CreatePostForm from '../../forms/create-post';

export default function CreatePostPanel({ onCancel, ...rest }) {
  const panelRef = React.useRef();
  const { methods, handleSubmit } = useForm();

  return (
    <FormProvider {...methods}>
      <Panel
        {...rest}
        ref={panelRef}
        onCancel={onCancel}
        onSave={handleSubmit}
        aria-label="Panel with form to create new posts"
      >
        <Heading level={3}>Create New Post</Heading>

        <CreatePostForm />
      </Panel>
    </FormProvider>
  );
}

CreatePostPanel.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
