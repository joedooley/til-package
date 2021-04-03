import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FormProvider } from 'react-hook-form';
import { Flex, Text, Button, Heading, Link } from '@components/core/html';
import useForm from './useForm';
import Form from '@components/core/form';
import Logo from '@components/core/logo';

export default function LoginConfirmationForm(props) {
  const { methods, handleSubmit, errors } = useForm();

  return (
    <FormProvider {...methods}>
      <Flex
        as="form"
        noValidate
        autoComplete="off"
        direction="column"
        hAlign="flex-start"
        vAlign="flex-start"
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
        <Text align="left">Please re-enter your email address to finish logging in.</Text>
        <Form.Input className="formgroup" name="email" type="text" placeholder="Email address" required />
        <Form.ErrorMessage errors={errors} name="email" />

        <Flex className="button-group">
          <Button onClick={handleSubmit} ariaLabel="Click button to finish logging in">
            Login
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
}

LoginConfirmationForm.propTypes = {};
