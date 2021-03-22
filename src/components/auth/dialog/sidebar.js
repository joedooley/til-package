import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion, useSpring } from 'framer-motion';
import { Flex, Text, Button, Heading } from '@components/core/html';

const MotionContainer = styled(motion.div)(
  ({ theme }) => css`
    border-color: ${theme.colors.border.secondary};
    border-style: solid;
    border-width: 0;
  `
);

export default function Sidebar({ type, onSwitch, ...rest }) {
  const isLogin = type === 'login';
  const heading = isLogin ? 'Hello, Friend!' : 'Welcome Back!';
  const content = isLogin
    ? 'Dont have an account? Click the Signup button to create an account.'
    : 'Already have an account? Click the Login button to access your account.';

  const xPos = useSpring(0, { mass: 0.25, stiffness: 500, damping: 75 });

  const position = {
    initial: {
      x: isLogin ? 440 : 0,
      borderLeftWidth: isLogin ? 0 : 1,
      borderRightWidth: isLogin ? 1 : 0,
      transition: {
        duration: 1.5,
      },
    },
    animate: {
      x: isLogin ? 0 : 440,
      borderLeftWidth: isLogin ? 0 : 1,
      borderRightWidth: isLogin ? 1 : 0,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <MotionContainer
      key={`sidebar-${type}`}
      initial="initial"
      animate="animate"
      variants={position}
      style={{ x: xPos }}
    >
      <Flex
        className={rest.className}
        direction="column"
        css={theme => css`
          align-self: flex-start;
          border-color: ${theme.colors.border.secondary};
          border-style: solid;
          border-width: 0;
          flex-shrink: 0;
          max-width: 220px;
          min-height: 100%;
          & > a {
            align-self: flex-start;
          }
        `}
      >
        <Flex
          direction="column"
          css={css`
            margin: auto;
          `}
        >
          <Heading
            level={1}
            css={theme => css`
              color: ${theme.colors.brand.primary};
              font-weight: ${theme.fontWeights.bold};
              margin-bottom: ${theme.space[4]};
            `}
          >
            {heading}
          </Heading>

          <Text
            css={theme => css`
              margin-bottom: ${theme.space[5]};
              text-align: center;
            `}
          >
            {content}
          </Text>

          <Button
            inverted
            ariaLabel="Click button to submit the form"
            onClick={onSwitch}
            variant="outline"
            css={css`
              width: 200px;
            `}
          >
            {isLogin ? 'Signup' : 'Login'}
          </Button>
        </Flex>
      </Flex>
    </MotionContainer>
  );
}

Sidebar.propTypes = {
  type: PropTypes.oneOf(['login', 'signup']).isRequired,
  onSwitch: PropTypes.func.isRequired,
};
