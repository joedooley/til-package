import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { Flex, Text, Button, Spacer } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';
import Logo from '@components/core/logo';

export default function LoginVerificationForm({ onCancel, verificationId, ...rest }) {
  const { methods, handleSubmit, errors } = useForm(verificationId);

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
        css={theme => css`
          background-color: ${theme.colors.black[400]};
          margin-left: auto;
          margin-right: auto;
          padding: ${theme.space[3]};
          width: 350px;
        `}
      >
        <Logo
          css={css`
            margin: 40px auto 60px;
          `}
        />
        <Text align="left">Please enter the verification code that was sent to your mobile device.</Text>
        <Form.Input name="code" placeholder="Verification Code" required autoFocus />
        <Form.ErrorMessage errors={errors} name="code" />

        <Flex
          className="button-group"
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

          <Button onClick={handleSubmit} ariaLabel="Click button to finish logging in">
            Login
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
}

LoginVerificationForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  verificationId: PropTypes.any,
};
