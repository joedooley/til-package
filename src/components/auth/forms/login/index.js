import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Flex, Text, Heading } from '@components/core/html';
import Form from '@components/core/form';
import LoginButtons from './login-buttons';
import SubmitButton from '@components/core/form/submit-button';

export default function LoginForm({ type, onSubmit, ...rest }) {
  const isLogin = type === 'login';
  const heading = isLogin ? 'Login to your account' : 'Create Account';
  const submitBtnLabel = isLogin ? 'Login' : 'Signup';

  const position = {
    start: {
      x: isLogin ? -220 : 1,
      transition: {
        duration: 1,
      },
    },
    end: {
      x: isLogin ? 1 : -220,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div key={`form-${type}`} initial="start" animate="end" variants={position}>
      <Flex
        direction="column"
        className={rest.className}
        css={css`
          flex-grow: 1;
          padding-top: 50px;
          padding-bottom: 50px;
        `}
      >
        <Heading
          level={1}
          css={theme => css`
            color: ${theme.colors.brand.primary};
            font-size: ${theme.fontSizes[7]};
            font-weight: ${theme.fontWeights.bold};
            margin-bottom: ${theme.space[5]};
          `}
        >
          {heading}
        </Heading>

        <LoginButtons
          css={theme => css`
            margin-bottom: ${theme.space[5]};
          `}
        />

        <Text
          css={theme => css`
            margin-bottom: ${theme.space[4]};
          `}
        >
          or use your email address
        </Text>

        <Flex
          as="form"
          noValidate
          autoComplete="off"
          direction="column"
          hAlign="flex-start"
          css={css`
            width: 350px;
          `}
        >
          <Form.Input name="email" type="text" placeholder="Email" required />

          <Flex hAlign="center">
            <SubmitButton
              id="login-button"
              ariaLabel="Click button to submit form and login to your account"
              onSubmit={onSubmit}
              variant="outline"
              css={theme => css`
                margin-top: ${theme.space[5]};
                width: 200px;
              `}
            >
              {submitBtnLabel}
            </SubmitButton>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
}

LoginForm.propTypes = {
  type: PropTypes.oneOf(['login', 'signup']).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
