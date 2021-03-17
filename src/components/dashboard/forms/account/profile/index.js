import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Flex, Heading, Button } from '@components/core/html';
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

      label {
        color: ${theme.colors.black[800]};
        font-size: ${theme.fontSizes[1]};
        line-height: 22px;
        width: 33%;
        text-transform: uppercase;

        span {
          display: none;
        }
      }

      input {
        color: ${theme.colors.black[800]};
      }
    }
  `
);

export default function EditProfileForm({ onReset, onSubmit, isDirty, ...rest }) {
  return (
    <Container direction="column" vAlign="flex-start" className={rest.className}>
      <Flex as="header" hAlign="space-between">
        <Heading level={5}>Profile</Heading>

        {isDirty && (
          <Flex className="button-group">
            <Button type="reset" variant="warning" onClick={onReset} ariaLabel="Click button to update your profile">
              Cancel
            </Button>

            <Button onClick={onSubmit} ariaLabel="Click button to update your profile">
              Save
            </Button>
          </Flex>
        )}
      </Flex>

      <Flex
        as="form"
        noValidate
        autoComplete="off"
        direction="column"
        hAlign="flex-start"
        css={css`
          width: 100%;
        `}
      >
        <Form.Input className="formgroup" name="name" label="Name" type="text" placeholder="Name" required />
        <Form.Input className="formgroup" name="email" label="Email" type="text" placeholder="Email" required />
      </Flex>
    </Container>
  );
}

EditProfileForm.propTypes = {
  isDirty: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
