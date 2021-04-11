import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { useOrganizations } from '@hooks/useOrganizations';
import { Box, Flex, Text, Button, Heading, Spacer } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';

export default function DeleteOrganizationForm({ onCancel, ...rest }) {
  const router = useRouter();
  const { data, loading } = useOrganizations(router.query?.id);
  const orgName = data?.name;
  const phrase = 'delete my organization';

  const { methods, handleSubmit, errors, isDisabled } = useForm(data, phrase);

  if (loading) {
    return <p>Loading...</p>;
  }

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
            Delete Organization
          </Heading>
          <Text>
            This will <b>delete your organization</b> and all other resources belonging to your Organization.
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

        <label htmlFor="name">
          Enter the organizations <b>{orgName}</b> name to continue:
        </label>
        <Form.Input id="name" name="name" placeholder="Organization/Team name" />
        <Form.ErrorMessage errors={errors} name="name" />

        <Spacer y="20px" />

        <label htmlFor="phrase">
          To verify, type <b>delete my organization</b> below:
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

DeleteOrganizationForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
