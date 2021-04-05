import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { Flex, Heading, Button, Text } from '@components/core/html';
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

export default function EditDisplayNameForm(props) {
  const { methods, handleSubmit, handleReset, isDirty, errors } = useForm();

  return (
    <Container as="section" direction="column" vAlign="flex-start" className={props.className}>
      <Flex as="header" hAlign="space-between">
        <Heading level={5}>Your Name</Heading>
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
          <Text align="left">Please enter your full name, or a display name you are comfortable with.</Text>
          <Form.Input className="formgroup" name="displayName" type="text" placeholder="Display name" required />
        </Flex>
      </FormProvider>

      <Flex as="footer" hAlign="space-between">
        {errors?.displayName ? (
          <Form.ErrorMessage errors={errors} name="displayName" />
        ) : (
          <Text>Please use 32 characters at maximum.</Text>
        )}

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

EditDisplayNameForm.propTypes = {
  className: PropTypes.string,
};
