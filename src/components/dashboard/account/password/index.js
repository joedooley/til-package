import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { Flex, Heading, Button, Text } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';

const ErrorMessage = styled(Text)(
  ({ theme }) => css`
    color: ${theme.colors.error.primary};
  `
);

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

    .fieldgroup {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: ${theme.space[3]};
      width: 100%;
      &:last-of-type {
        margin-bottom: 0;
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

      ${ErrorMessage} {
        color: ${theme.colors.error.primary};
        text-align: left;
      }
    }
  `
);

export default function EditPasswordForm(props) {
  const { methods, handleSubmit, handleReset, isDirty, errors } = useForm();

  return (
    <Container as="section" direction="column" vAlign="flex-start" className={props.className}>
      <Flex as="header">
        <Heading level={5}>Your Password</Heading>
      </Flex>

      <FormProvider {...methods}>
        <Flex
          as="form"
          noValidate
          autoComplete="off"
          direction="column"
          hAlign="flex-start"
          vAlign="flex-start"
          css={css`
            width: 100%;
          `}
        >
          <Text align="left">Please enter a new password to use when logging in to the app.</Text>

          <Flex className="fieldgroup">
            <Form.Input
              className="formgroup"
              name="currentPassword"
              type="password"
              placeholder="Current password"
              required
            />
            <Form.ErrorMessage errors={errors} name="currentPassword" />
          </Flex>

          <Flex className="fieldgroup">
            <Form.Input className="formgroup" name="newPassword" type="password" placeholder="New password" required />
            <Form.ErrorMessage errors={errors} name="newPassword" />
          </Flex>

          <Flex className="fieldgroup">
            <Form.Input
              className="formgroup"
              name="confirmNewPassword"
              type="password"
              placeholder="Re-enter new password"
              required
            />
            <Form.ErrorMessage errors={errors} name="confirmNewPassword" />
          </Flex>
        </Flex>
      </FormProvider>

      <Flex as="footer" hAlign="space-between">
        <Text>You will be logged out after updating your password.</Text>

        {isDirty && (
          <Flex className="button-group">
            <Button
              type="reset"
              variant="warning"
              onClick={handleReset}
              ariaLabel="Click button to update your profile"
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit} ariaLabel="Click button to update your profile">
              Save
            </Button>
          </Flex>
        )}
      </Flex>
    </Container>
  );
}

EditPasswordForm.propTypes = {
  className: PropTypes.string,
};
