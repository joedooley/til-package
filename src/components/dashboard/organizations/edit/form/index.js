import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { useOrganizations } from '@hooks/useOrganizations';
import { Flex, Button, Spacer, Heading, Text } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';

const Container = styled(Flex)(
  ({ theme }) => css`
    background-color: ${theme.colors.black[400]};
    box-shadow: ${theme.shadows.modal};
    width: 100%;

    header {
      border-bottom: ${theme.borders.secondary};
      width: 100%;
    }

    h5 {
      color: ${theme.colors.black[900]};
      font-size: 11px;
      line-height: 17px;
      margin: 13px ${theme.space[3]};
      text-transform: uppercase;
    }

    .button-group {
      margin-right: ${theme.space[3]};
    }

    button {
      padding: 6px 10px;
      &:last-of-type {
        margin-left: ${theme.space[2]};
      }
    }

    form {
      padding: ${theme.space[3]};
      width: 100%;
    }

    .formgroup {
      align-items: center;
      flex-direction: row;
      margin-bottom: 0;

      input {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        color: ${theme.colors.black[800]};
      }
    }

    footer {
      background-color: ${theme.colors.black[500]};
      border-top: ${theme.borders.secondary};
      width: 100%;

      p {
        color: hsla(var(--base-text), 60%, 100%);
        margin: 13px ${theme.space[3]};
        text-align: left;
      }
    }
  `
);

export default function EditOrganizationForm(props) {
  const router = useRouter();
  const { data, loading } = useOrganizations(router.query?.id);

  const { methods, handleReset, handleSubmit, errors, isDirty } = useForm(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container {...props} direction="column" vAlign="flex-start">
      <Flex as="header" hAlign="space-between">
        <Heading level={5}>General</Heading>
      </Flex>

      <FormProvider {...methods}>
        <Flex as="form" noValidate autoComplete="off" direction="column" hAlign="flex-start" vAlign="flex-start">
          <label htmlFor="name">Organization name:</label>
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
        </Flex>
      </FormProvider>

      <Flex as="footer" hAlign="space-between">
        {errors?.server ? (
          <Form.ErrorMessage errors={errors} name="server" />
        ) : (
          <Text>Edits can only be made by organization owners.</Text>
        )}

        {isDirty && (
          <Flex className="button-group">
            <Button
              type="reset"
              variant="warning"
              onClick={handleReset}
              ariaLabel="Click button to update your organization"
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit} ariaLabel="Click button to update your organization">
              Save
            </Button>
          </Flex>
        )}
      </Flex>
    </Container>
  );
}

EditOrganizationForm.propTypes = {};
