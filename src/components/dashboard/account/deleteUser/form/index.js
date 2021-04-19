import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { useUser } from '@hooks/useUser';
import { Box, Flex, Text, Button, Heading, Spacer } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';

export default function DeleteUserForm({ onCancel, ...rest }) {
  const { user, mutateUser } = useUser();
  const username = user?.username;
  const phrase = 'delete my personal account';

  const { methods, handleSubmit, errors, isDisabled } = useForm(user, phrase, mutateUser);

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
            Delete Personal Account
          </Heading>
          <Text>
            This will <b>delete all of your projects</b> and all other resources belonging to your Personal Account.
          </Text>

          <Text
            css={theme => css`
              background-color: ${theme.colors.error.primary};
              border-radius: 5px;
              color: ${theme.colors.white};
              font-size: ${theme.fontSizes[2]};
              margin-bottom: 20px;
              padding-bottom: ${theme.space[2]};
              padding-top: ${theme.space[2]};
            `}
          >
            This action is not reversible. Please be certain.
          </Text>
        </Box>

        <label htmlFor="username">
          Enter your username <b>{username}</b> to continue:
        </label>
        <Form.Input id="username" name="username" placeholder="Enter username" />
        <Form.ErrorMessage errors={errors} name="username" />

        <Spacer y="20px" />

        <label htmlFor="phrase">
          To verify, type <b>delete my personal account</b> below:
        </label>
        <Form.Input id="phrase" name="phrase" placeholder="Enter phrase" />
        <Form.ErrorMessage errors={errors} name="phrase" />

        <Flex
          as="footer"
          css={css`
            justify-content: center;
            margin-top: 30px;
            width: 100%;
          `}
        >
          <Button onClick={onCancel} variant="warning" ariaLabel="Click button to delete your account">
            Cancel
          </Button>

          <Spacer x={4} />

          <Button onClick={handleSubmit} ariaLabel="Click button to delete your account" disabled={isDisabled}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
}

DeleteUserForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
