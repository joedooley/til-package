import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useAuth } from '@lib/firebase/auth';
import Flex from '@components/core/html/flex';
import Button from '@components/core/button';

export default function LoginButtons({ className }) {
  const auth = useAuth();

  return (
    <Flex className={className} vAlign="flex-start">
      <Button
        type="button"
        ariaLabel="Click button to login with a GitHub account"
        onClick={e => auth.signinWithGitHub()}
        css={theme => css`
          margin-right: ${theme.space[3]};
        `}
      >
        Sign In w/GitHub
      </Button>

      <Button
        type="button"
        ariaLabel="Click button to login with a Google account"
        onClick={e => auth.signinWithGoogle()}
      >
        Sign In w/Google
      </Button>
    </Flex>
  );
}

LoginButtons.propTypes = {
  className: PropTypes.string,
};
