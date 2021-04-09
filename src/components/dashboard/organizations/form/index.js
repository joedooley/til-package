import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { useUser } from '@hooks/useUser';
import { Box, Flex, Text, Button, Heading, Spacer } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';

export default function CreateOrganizationForm({ onCancel, ...rest }) {
  const { user, mutateUser } = useUser();

  const { methods, handleSubmit, errors } = useForm(user, mutateUser);

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
            New Organization
          </Heading>

          <Text>In order to use the app for professional purposes or work with a team, create an organization.</Text>
        </Box>

        <label htmlFor="name">Enter the name of your company or team:</label>
        <Form.Input id="name" name="name" placeholder="Enter company/team" />
        <Form.ErrorMessage errors={errors} name="name" />

        <Spacer y="20px" />

        <label htmlFor="billingEmail">Billing email:</label>
        <Form.Input id="billingEmail" name="billingEmail" placeholder="Billing email address" />
        <Form.ErrorMessage errors={errors} name="billingEmail" />

        <Spacer y="20px" />

        <label htmlFor="billingContact">Billing Contact:</label>
        <Form.Input id="billingContact" name="billingContact" placeholder="Billing contact name" />
        <Form.ErrorMessage errors={errors} name="billingContact" />

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

          <Button onClick={handleSubmit} ariaLabel="Click button to create your organization" >
            Save
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
}

CreateOrganizationForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
