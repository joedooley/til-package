import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';
import mockCategories from '@test/fixtures/categories.js';
import Form from '@components/core/form';

export default function CreateProjectForm({ className, ...rest }) {
  return (
    <Flex
      direction="column"
      vAlign="flex-start"
      className={className}
      css={css`
        width: 100%;
      `}
    >
      <form
        autoComplete="off"
        noValidate
        css={css`
          align-items: center;
          display: flex;
          flex-direction: column;
          width: 100%;
        `}
      >
        <Form.Input name="title" label="Title" type="text" placeholder="Post title" required />
        <Form.Textarea name="content" label="Content" type="text" placeholder="Post content" required />
        <Form.Select name="categories" label="Categories" placeholder="Categories" options={mockCategories} />
      </form>
    </Flex>
  );
}

CreateProjectForm.propTypes = {
  className: PropTypes.any,
};
