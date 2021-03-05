import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Flex from '@components/core/html/flex';
import Button from '@components/core/button';
import GitHubIcon from 'public/assets/icons/login/github.svg';
import GoogleIcon from 'public/assets/icons/login/google.svg';

export default function LoginButtons({ auth, ...rest }) {
  const router = useRouter();
  const buttonLabel = router.pathname === '/login' ? 'Login' : 'Sign up';

  return (
    <Flex
      className={rest.className}
      direction="column"
      vAlign="flex-start"
      css={css`
        button {
          padding-left: 40px;
          padding-right: 40px;
        }
      `}
    >
      <Button
        type="button"
        ariaLabel="Click button to login with a GitHub account"
        onClick={e => auth.signinWithGitHub()}
        css={theme => css`
          margin-bottom: ${theme.space[3]};
        `}
      >
        <GitHubIcon
          css={theme => css`
            height: 17px;
            margin-right: ${theme.space[1]};
            width: 17px;
          `}
        />
        {buttonLabel}
      </Button>

      <Button
        type="button"
        ariaLabel="Click button to login with a Google account"
        onClick={e => auth.signinWithGoogle()}
      >
        <GoogleIcon
          css={theme => css`
            height: 17px;
            margin-right: ${theme.space[1]};
            width: 17px;
          `}
        />
        {buttonLabel}
      </Button>
    </Flex>
  );
}

LoginButtons.propTypes = {
  auth: PropTypes.object.isRequired,
};
