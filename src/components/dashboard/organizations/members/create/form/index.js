import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { ROLES } from '@lib/db/models/organization/member';
import { map } from '@util/object';
import { Box, Flex, Text, Button, Heading, Spacer } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';

export default function CreateOrgMemberForm({ id, onCancel, ...rest }) {
  const { methods, handleSubmit, errors } = useForm(id, onCancel);

  return (
    <FormProvider {...methods}>
      <Flex
        as="form"
        noValidate
        autoComplete="off"
        direction="column"
        hAlign="flex-start"
        vAlign="flex-start"
        className={rest.className}
      >
        <Box as="header">
          <Heading
            level={3}
            css={css`
              margin-bottom: 25px;
            `}
          >
            New Organization Member
          </Heading>

          <Text>Invite users to create an account and join your organization.</Text>
        </Box>

        <label htmlFor="displayName">Name:</label>
        <Form.Input id="displayName" name="displayName" placeholder="Full name" />
        <Form.ErrorMessage errors={errors} name="displayName" />

        <Spacer y="20px" />

        <label htmlFor="email">Email Address:</label>
        <Form.Input id="email" name="email" placeholder="Email address" />
        <Form.ErrorMessage errors={errors} name="email" />

        <Spacer y="20px" />

        <label htmlFor="role">Role:</label>
        <Form.Select id="role" name="role" options={map(ROLES)} placeholder="Member role" />
        <Form.ErrorMessage errors={errors} name="role" />

        <Spacer y="20px" />

        <Flex
          as="footer"
          css={css`
            justify-content: center;
            margin-top: 30px;
            width: 100%;
          `}
        >
          <Button onClick={onCancel} variant="warning" ariaLabel="Click button to cancel">
            Cancel
          </Button>

          <Spacer x={4} />

          <Button onClick={handleSubmit} ariaLabel="Click button to invite a member to your organization">
            Save
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
}

CreateOrgMemberForm.propTypes = {
  id: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};
