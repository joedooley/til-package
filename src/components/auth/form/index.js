import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import Form from '@components/core/form';
import { Flex, Text, Link, Heading } from '@components/core/html';
import LoginButtons from '../form/login-buttons';
import SubmitButton from '@components/core/form/submit-button';

export default function LoginForm({ auth, type, formProps, ...rest }) {
  const isLogin = type === 'login';
  const heading = isLogin ? 'Login to your account' : 'Create Account';

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
          auth={auth}
          css={theme => css`
            margin-bottom: ${theme.space[5]};
          `}
        />

        <Text
          css={theme => css`
            margin-bottom: ${theme.space[4]};
          `}
        >
          or use your email account
        </Text>

        <Form
          schema={formProps.schema}
          defaultValues={formProps.defaultValues}
          css={css`
            align-items: center;
            display: flex;
            flex-direction: column;
            width: 350px;
          `}
        >
          {!isLogin && <Form.Input name="username" label="Username" type="text" placeholder="Username" required />}
          <Form.Input name="email" label="Email" type="text" placeholder="Email" required />
          <Form.Input
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            required
            css={theme => css`
              margin-bottom: ${theme.space[4]};
            `}
          />

          {isLogin && (
            <Link
              href="/?forgot-password"
              title="Click to retrieve your password"
              onClick={e => {
                e.preventDefault();
              }}
              css={theme => css`
                color: ${theme.colors.text};
                margin-bottom: ${theme.space[5]};
                text-decoration: underline;
                text-underline-position: under;
              `}
            >
              Forgot your password?
            </Link>
          )}

          <Flex hAlign="center">
            <SubmitButton
              ariaLabel="Click button to submit form and login to your account"
              onSubmit={formProps.onSubmit}
              variant="outline"
              css={css`
                width: 200px;
              `}
            >
              Login
            </SubmitButton>
          </Flex>
        </Form>
      </Flex>
    </motion.div>
  );
}

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['login', 'signup']).isRequired,
  formProps: PropTypes.object.isRequired,
};
